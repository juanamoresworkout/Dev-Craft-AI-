import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { LibraryService } from '../../core/services/library.service';

@Component({
  selector: 'app-book-form',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './book-form.html',
  styleUrl: './book-form.css'
})
export class BookForm implements OnInit {
  private readonly formBuilder = inject(FormBuilder);

  protected readonly editing = signal(false);
  protected readonly saving = signal(false);
  protected readonly error = signal('');

  protected readonly form = this.formBuilder.nonNullable.group({
    titulo: ['', [Validators.required, Validators.minLength(3)]],
    autor: ['', [Validators.required, Validators.minLength(3)]],
    isbn: ['', [Validators.required, Validators.minLength(10)]],
    stock: [1, [Validators.required, Validators.min(0)]]
  });

  constructor(
    private readonly libraryService: LibraryService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const id = this.currentBookId();
    if (!id) {
      return;
    }

    this.editing.set(true);
    this.libraryService.getBook(id).subscribe({
      next: (book) => this.form.setValue({
        titulo: book.titulo,
        autor: book.autor,
        isbn: book.isbn,
        stock: book.stock
      }),
      error: () => this.error.set('No se pudo cargar el libro para editar.')
    });
  }

  protected submit(): void {
    // Fuerza la visualizacion de errores antes de enviar datos incompletos al backend.
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.error.set('Revisa los campos obligatorios antes de guardar.');
      return;
    }

    this.saving.set(true);
    this.error.set('');
    const id = this.currentBookId();
    const request = this.form.getRawValue();
    const saveRequest = id
      ? this.libraryService.updateBook(id, request)
      : this.libraryService.createBook(request);

    // Si el guardado funciona, lleva al usuario directamente al detalle del libro.
    saveRequest.subscribe({
      next: (book) => this.router.navigate(['/libros', book.id]),
      error: () => {
        this.saving.set(false);
        this.error.set('No se pudo guardar el libro.');
      }
    });
  }

  private currentBookId(): number | null {
    const value = this.route.snapshot.paramMap.get('id');
    return value ? Number(value) : null;
  }
}
