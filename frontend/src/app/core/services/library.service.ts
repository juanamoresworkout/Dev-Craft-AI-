import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';

import { Book, BookStatus, Category, CreateBookRequest } from '../../models/book';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  private readonly apiUrl = '/api';
  private categories: Category[] = [
    { id: 1, nombre: 'Novela', descripcion: 'Narrativa y ficcion contemporanea.' },
    { id: 2, nombre: 'Programacion', descripcion: 'Libros tecnicos para aprender desarrollo.' },
    { id: 3, nombre: 'Historia', descripcion: 'Ensayos y divulgacion historica.' }
  ];
  private books: Book[] = [
    {
      id: 1,
      titulo: 'Angular paso a paso',
      autor: 'Laura Martin',
      descripcion: 'Guia practica para crear interfaces con componentes standalone.',
      precio: 29.9,
      stock: 4,
      estado: 'DISPONIBLE',
      categoriaId: 2,
      categoriaNombre: 'Programacion'
    },
    {
      id: 2,
      titulo: 'La biblioteca escondida',
      autor: 'Carlos Nieto',
      descripcion: 'Una novela ligera ambientada entre estanterias y secretos.',
      precio: 18.5,
      stock: 2,
      estado: 'DISPONIBLE',
      categoriaId: 1,
      categoriaNombre: 'Novela'
    },
    {
      id: 3,
      titulo: 'Mapas de la antiguedad',
      autor: 'Elena Ruiz',
      descripcion: 'Recorrido visual por rutas, imperios y ciudades antiguas.',
      precio: 24,
      stock: 0,
      estado: 'PRESTADO',
      categoriaId: 3,
      categoriaNombre: 'Historia'
    }
  ];

  constructor(private readonly http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categorias`).pipe(
      catchError(() => of(this.categories))
    );
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/libros`).pipe(
      tap((books) => {
        this.books = books;
      }),
      catchError(() => of(this.books))
    );
  }

  getBook(id: number): Observable<Book | undefined> {
    return this.http.get<Book>(`${this.apiUrl}/libros/${id}`).pipe(
      catchError(() => of(this.books.find((book) => book.id === id)))
    );
  }

  createBook(request: CreateBookRequest): Observable<Book> {
    return this.http.post<Book>(`${this.apiUrl}/libros`, request).pipe(
      tap((book) => {
        this.books = [book, ...this.books];
      }),
      catchError(() => of(this.createLocalBook(request)))
    );
  }

  reserveBook(id: number): Observable<Book | undefined> {
    return this.updateStatus(id, 'RESERVADO', 'reservar');
  }

  buyBook(id: number): Observable<Book | undefined> {
    return this.http.post<Book>(`${this.apiUrl}/libros/${id}/comprar`, {}).pipe(
      tap((book) => this.replaceBook(book)),
      catchError(() => of(this.buyLocalBook(id)))
    );
  }

  returnBook(id: number): Observable<Book | undefined> {
    return this.updateStatus(id, 'DISPONIBLE', 'devolver');
  }

  getBooksByCategory(categoryId: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/categorias/${categoryId}/libros`).pipe(
      catchError(() => of(this.books.filter((book) => book.categoriaId === categoryId)))
    );
  }

  private updateStatus(id: number, estado: BookStatus, action: string): Observable<Book | undefined> {
    return this.http.post<Book>(`${this.apiUrl}/libros/${id}/${action}`, {}).pipe(
      tap((book) => this.replaceBook(book)),
      catchError(() => of(this.updateLocalBook(id, { estado })))
    );
  }

  private createLocalBook(request: CreateBookRequest): Book {
    const category = this.categories.find((item) => item.id === request.categoriaId);
    const book: Book = {
      ...request,
      id: Math.max(0, ...this.books.map((item) => item.id)) + 1,
      estado: 'DISPONIBLE',
      categoriaNombre: category?.nombre ?? 'Sin categoria'
    };
    this.books = [book, ...this.books];
    return book;
  }

  private buyLocalBook(id: number): Book | undefined {
    const book = this.books.find((item) => item.id === id);
    if (!book || book.stock <= 0) {
      return book;
    }
    const nextStock = book.stock - 1;
    return this.updateLocalBook(id, {
      stock: nextStock,
      estado: nextStock === 0 ? 'VENDIDO' : 'DISPONIBLE'
    });
  }

  private updateLocalBook(id: number, changes: Partial<Book>): Book | undefined {
    let updated: Book | undefined;
    this.books = this.books.map((book) => {
      if (book.id !== id) {
        return book;
      }
      updated = { ...book, ...changes };
      return updated;
    });
    return updated;
  }

  private replaceBook(book: Book): void {
    this.books = this.books.some((item) => item.id === book.id)
      ? this.books.map((item) => item.id === book.id ? book : item)
      : [book, ...this.books];
  }
}
