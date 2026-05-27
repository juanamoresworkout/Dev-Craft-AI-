export interface Book {
  id: number;
  titulo: string;
  autor: string;
  isbn: string;
  stock: number;
  prestamoId: number | null;
}

export interface CreateBookRequest {
  titulo: string;
  autor: string;
  isbn: string;
  stock: number;
}

export interface CreateLoanRequest {
  nombreLector: string;
  libroIds: number[];
}

export interface Loan {
  id: number;
  nombreLector: string;
  fechaPrestamo: string;
  fechaDevolucion: string | null;
  estado: 'ACTIVO' | 'DEVUELTO';
  libros: Book[];
}
