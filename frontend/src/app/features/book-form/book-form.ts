import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { LibraryService } from '../../core/services/library.service';
import { Category } from '../../models/book';

@Component({
  selector: 'app-book-form',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './book-form.html',
  styleUrl: './book-form.css'
})
export class BookForm implements OnInit {
  private readonly formBuilder = inject(FormBuilder);

  protected readonly categories = signal<Category[]>([]);
  protected readonly saving = signal(false);
  protected readonly error = signal('');

  protected readonly form = this.formBuilder.nonNullable.group({
    titulo: ['', [Validators.required, Validators.minLength(3)]],
    autor: ['', [Validators.required, Validators.minLength(3)]],
    descripcion: ['', [Validators.required, Validators.minLength(10)]],
    precio: [1, [Validators.required, Validators.min(0.01)]],
    stock: [1, [Validators.required, Validators.min(0)]],
    categoriaId: [1, [Validators.required]]
  });

  constructor(
    private readonly libraryService: LibraryService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.libraryService.getCategories().subscribe((categories) => {
      this.categories.set(categories);
      if (categories.length > 0) {
        this.form.controls.categoriaId.setValue(categories[0].id);
      }
    });
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.error.set('Revisa los campos obligatorios antes de guardar.');
      return;
    }

    this.saving.set(true);
    this.error.set('');
    this.libraryService.createBook(this.form.getRawValue()).subscribe({
      next: (book) => this.router.navigate(['/libros', book.id]),
      error: () => {
        this.saving.set(false);
        this.error.set('No se pudo crear el libro.');
      }
    });
  }
}
