// Modelo que consume la interfaz para pintar libros recibidos desde la API.
export interface Book {
  id: number;
  titulo: string;
  autor: string;
  isbn: string;
  stock: number;
  prestamoId: number | null;
}

// Payload del formulario de alta de libro.
export interface CreateBookRequest {
  titulo: string;
  autor: string;
  isbn: string;
  stock: number;
}

// Payload usado para crear un prestamo; admite varios libros aunque la UI envie uno.
export interface CreateLoanRequest {
  nombreLector: string;
  libroIds: number[];
}

// Modelo de prestamo devuelto por el backend, incluyendo los libros asociados.
export interface Loan {
  id: number;
  nombreLector: string;
  fechaPrestamo: string;
  fechaDevolucion: string | null;
  estado: 'ACTIVO' | 'DEVUELTO';
  libros: Book[];
}
