import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { finalize, forkJoin } from 'rxjs';

import { LibraryService } from '../../core/services/library.service';
import { Book, Loan } from '../../models/book';

@Component({
  selector: 'app-book-catalog',
  imports: [CommonModule, RouterLink],
  templateUrl: './book-catalog.html',
  styleUrl: './book-catalog.css'
})
export class BookCatalog implements OnInit {
  protected readonly books = signal<Book[]>([]);
  protected readonly loans = signal<Loan[]>([]);
  protected readonly searchText = signal('');
  protected readonly borrowerName = signal('');
  protected readonly loading = signal(false);
  protected readonly actionBookId = signal<number | null>(null);
  protected readonly message = signal('');
  protected readonly error = signal('');

  protected readonly filteredBooks = computed(() => {
    const term = this.searchText().trim().toLowerCase();
    return this.books().filter((book) =>
      !term ||
      book.titulo.toLowerCase().includes(term) ||
      book.autor.toLowerCase().includes(term) ||
      book.isbn.toLowerCase().includes(term)
    );
  });

  constructor(private readonly libraryService: LibraryService) {}

  ngOnInit(): void {
    this.loadData();
  }

  protected updateSearch(event: Event): void {
    this.searchText.set((event.target as HTMLInputElement).value);
  }

  protected updateBorrowerName(event: Event): void {
    this.borrowerName.set((event.target as HTMLInputElement).value);
  }

  protected activeLoanFor(book: Book): Loan | undefined {
    return this.loans().find((loan) =>
      loan.estado === 'ACTIVO' && loan.libros.some((item) => item.id === book.id)
    );
  }

  protected rent(book: Book): void {
    const nombreLector = this.borrowerName().trim();
    if (!nombreLector) {
      this.error.set('Escribe el nombre del lector antes de alquilar.');
      return;
    }

    this.actionBookId.set(book.id);
    this.error.set('');
    this.libraryService.rentBook(book.id, nombreLector)
      .pipe(finalize(() => this.actionBookId.set(null)))
      .subscribe({
        next: () => this.loadData('Prestamo registrado correctamente.'),
        error: () => this.error.set('No se pudo alquilar el libro. Comprueba que tiene stock disponible.')
      });
  }

  protected returnBook(book: Book): void {
    const loan = this.activeLoanFor(book);
    if (!loan) {
      return;
    }

    this.actionBookId.set(book.id);
    this.error.set('');
    this.libraryService.returnLoan(loan.id)
      .pipe(finalize(() => this.actionBookId.set(null)))
      .subscribe({
        next: () => this.loadData('Devolucion registrada correctamente.'),
        error: () => this.error.set('No se pudo devolver el prestamo.')
      });
  }

  private loadData(successMessage = ''): void {
    this.loading.set(true);
    forkJoin({
      books: this.libraryService.getBooks(),
      loans: this.libraryService.getLoans()
    })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: ({ books, loans }) => {
          this.books.set(books);
          this.loans.set(loans);
          this.message.set(successMessage);
          this.error.set('');
        },
        error: () => this.error.set('No se ha podido conectar con el backend.')
      });
  }
}
