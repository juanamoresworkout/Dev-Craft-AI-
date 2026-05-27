import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Book, CreateBookRequest, CreateLoanRequest, Loan } from '../../models/book';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  private readonly apiUrl = '/api';

  constructor(private readonly http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    // Obtiene el catalogo completo desde el backend usando el proxy /api de Angular.
    return this.http.get<Book[]>(`${this.apiUrl}/libros`);
  }

  getBook(id: number): Observable<Book> {
    // Carga un libro concreto para la pantalla de detalle.
    return this.http.get<Book>(`${this.apiUrl}/libros/${id}`);
  }

  createBook(request: CreateBookRequest): Observable<Book> {
    // Envia los datos validados por el formulario para crear un nuevo libro.
    return this.http.post<Book>(`${this.apiUrl}/libros`, request);
  }

  getLoans(): Observable<Loan[]> {
    // Consulta los prestamos para saber que libros estan prestados y a quien.
    return this.http.get<Loan[]>(`${this.apiUrl}/prestamos`);
  }

  rentBook(bookId: number, nombreLector: string): Observable<Loan> {
    // La API acepta una lista de libros; la UI actual presta uno cada vez.
    const request: CreateLoanRequest = {
      nombreLector,
      libroIds: [bookId]
    };
    return this.http.post<Loan>(`${this.apiUrl}/prestamos`, request);
  }

  returnLoan(loanId: number): Observable<Loan> {
    // Marca el prestamo como devuelto y permite que el backend recupere el stock.
    return this.http.put<Loan>(`${this.apiUrl}/prestamos/${loanId}/devolver`, {});
  }
}
