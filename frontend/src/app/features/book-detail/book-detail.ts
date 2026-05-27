import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { LibraryService } from '../../core/services/library.service';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.css'
})
export class BookDetail implements OnInit {
  protected readonly book = signal<Book | undefined>(undefined);
  protected readonly message = signal('');

  constructor(
    private readonly route: ActivatedRoute,
    private readonly libraryService: LibraryService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.libraryService.getBook(id).subscribe((book) => this.book.set(book));
  }

  protected reserve(): void {
    this.runAction('reserveBook', 'Libro reservado correctamente.');
  }

  protected buy(): void {
    this.runAction('buyBook', 'Compra registrada correctamente.');
  }

  protected returnBook(): void {
    this.runAction('returnBook', 'Devolucion registrada correctamente.');
  }

  private runAction(
    action: 'reserveBook' | 'buyBook' | 'returnBook',
    message: string
  ): void {
    const current = this.book();
    if (!current) {
      return;
    }
    this.libraryService[action](current.id).subscribe((updated) => {
      if (updated) {
        this.book.set(updated);
        this.message.set(message);
      }
    });
  }
}
