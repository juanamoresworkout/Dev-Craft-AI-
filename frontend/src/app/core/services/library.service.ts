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
    return this.http.get<Book[]>(`${this.apiUrl}/libros`);
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/libros/${id}`);
  }

  createBook(request: CreateBookRequest): Observable<Book> {
    return this.http.post<Book>(`${this.apiUrl}/libros`, request);
  }

  getLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(`${this.apiUrl}/prestamos`);
  }

  rentBook(bookId: number, nombreLector: string): Observable<Loan> {
    const request: CreateLoanRequest = {
      nombreLector,
      libroIds: [bookId]
    };
    return this.http.post<Loan>(`${this.apiUrl}/prestamos`, request);
  }

  returnLoan(loanId: number): Observable<Loan> {
    return this.http.put<Loan>(`${this.apiUrl}/prestamos/${loanId}/devolver`, {});
  }
}
