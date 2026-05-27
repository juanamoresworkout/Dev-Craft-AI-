import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { LibraryService } from '../../core/services/library.service';

@Component({
  selector: 'app-book-form',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './book-form.html',
  styleUrl: './book-form.css'
})
export class BookForm {
  private readonly formBuilder = inject(FormBuilder);

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
    private readonly router: Router
  ) {}

  protected submit(): void {
    // Fuerza la visualizacion de errores antes de enviar datos incompletos al backend.
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.error.set('Revisa los campos obligatorios antes de guardar.');
      return;
    }

    this.saving.set(true);
    this.error.set('');
    // Si la creacion funciona, lleva al usuario directamente al detalle del nuevo libro.
    this.libraryService.createBook(this.form.getRawValue()).subscribe({
      next: (book) => this.router.navigate(['/libros', book.id]),
      error: () => {
        this.saving.set(false);
        this.error.set('No se pudo crear el libro.');
      }
    });
  }
}
