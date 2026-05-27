import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { finalize, forkJoin } from 'rxjs';

import { LibraryService } from '../../core/services/library.service';
import { Book, Loan } from '../../models/book';

@Component({
  selector: 'app-book-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.css'
})
export class BookDetail implements OnInit {
  protected readonly book = signal<Book | undefined>(undefined);
  protected readonly loans = signal<Loan[]>([]);
  protected readonly borrowerName = signal('');
  protected readonly saving = signal(false);
  protected readonly message = signal('');
  protected readonly error = signal('');

  protected readonly activeLoan = computed(() => {
    const current = this.book();
    if (!current) {
      return undefined;
    }
    return this.loans().find((loan) =>
      loan.estado === 'ACTIVO' && loan.libros.some((item) => item.id === current.id)
    );
  });

  private readonly id: number;

  constructor(
    route: ActivatedRoute,
    private readonly libraryService: LibraryService
  ) {
    this.id = Number(route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.loadData();
  }

  protected updateBorrowerName(event: Event): void {
    this.borrowerName.set((event.target as HTMLInputElement).value);
  }

  protected rent(): void {
    const nombreLector = this.borrowerName().trim();
    if (!nombreLector) {
      this.error.set('Escribe el nombre del lector antes de alquilar.');
      return;
    }

    this.saving.set(true);
    this.error.set('');
    this.libraryService.rentBook(this.id, nombreLector)
      .pipe(finalize(() => this.saving.set(false)))
      .subscribe({
        next: () => this.loadData('Prestamo registrado correctamente.'),
        error: () => this.error.set('No se pudo alquilar el libro. Comprueba que tiene stock disponible.')
      });
  }

  protected returnBook(): void {
    const loan = this.activeLoan();
    if (!loan) {
      return;
    }

    this.saving.set(true);
    this.error.set('');
    this.libraryService.returnLoan(loan.id)
      .pipe(finalize(() => this.saving.set(false)))
      .subscribe({
        next: () => this.loadData('Devolucion registrada correctamente.'),
        error: () => this.error.set('No se pudo devolver el prestamo.')
      });
  }

  private loadData(successMessage = ''): void {
    forkJoin({
      book: this.libraryService.getBook(this.id),
      loans: this.libraryService.getLoans()
    }).subscribe({
      next: ({ book, loans }) => {
        this.book.set(book);
        this.loans.set(loans);
        this.message.set(successMessage);
        this.error.set('');
      },
      error: () => this.error.set('No se ha encontrado el libro o el backend no esta disponible.')
    });
  }
}
