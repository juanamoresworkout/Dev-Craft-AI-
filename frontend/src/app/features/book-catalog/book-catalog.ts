import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';

import { LibraryService } from '../../core/services/library.service';
import { Book, Category } from '../../models/book';

@Component({
  selector: 'app-book-catalog',
  imports: [CommonModule, RouterLink],
  templateUrl: './book-catalog.html',
  styleUrl: './book-catalog.css'
})
export class BookCatalog implements OnInit {
  protected readonly books = signal<Book[]>([]);
  protected readonly categories = signal<Category[]>([]);
  protected readonly selectedCategoryId = signal<number | 'all'>('all');
  protected readonly searchText = signal('');
  protected readonly loading = signal(false);
  protected readonly message = signal('');

  protected readonly filteredBooks = computed(() => {
    const term = this.searchText().trim().toLowerCase();
    const categoryId = this.selectedCategoryId();
    return this.books().filter((book) => {
      const matchesCategory = categoryId === 'all' || book.categoriaId === categoryId;
      const matchesText = !term ||
        book.titulo.toLowerCase().includes(term) ||
        book.autor.toLowerCase().includes(term);
      return matchesCategory && matchesText;
    });
  });

  constructor(private readonly libraryService: LibraryService) {}

  ngOnInit(): void {
    this.loadData();
  }

  protected updateSearch(event: Event): void {
    this.searchText.set((event.target as HTMLInputElement).value);
  }

  protected updateCategory(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedCategoryId.set(value === 'all' ? 'all' : Number(value));
  }

  protected reserve(book: Book): void {
    this.libraryService.reserveBook(book.id).subscribe((updated) => {
      this.applyBookUpdate(updated, 'Libro reservado correctamente.');
    });
  }

  protected buy(book: Book): void {
    this.libraryService.buyBook(book.id).subscribe((updated) => {
      this.applyBookUpdate(updated, 'Compra registrada correctamente.');
    });
  }

  protected returnBook(book: Book): void {
    this.libraryService.returnBook(book.id).subscribe((updated) => {
      this.applyBookUpdate(updated, 'Devolucion registrada correctamente.');
    });
  }

  private loadData(): void {
    this.loading.set(true);
    this.libraryService.getCategories().subscribe((categories) => this.categories.set(categories));
    this.libraryService.getBooks()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe((books) => this.books.set(books));
  }

  private applyBookUpdate(updated: Book | undefined, message: string): void {
    if (!updated) {
      this.message.set('No se pudo actualizar el libro.');
      return;
    }
    this.books.update((books) => books.map((book) => book.id === updated.id ? updated : book));
    this.message.set(message);
  }
}
