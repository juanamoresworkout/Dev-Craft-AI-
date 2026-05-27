export type BookStatus = 'DISPONIBLE' | 'RESERVADO' | 'VENDIDO' | 'PRESTADO';

export interface Category {
  id: number;
  nombre: string;
  descripcion: string;
}

export interface Book {
  id: number;
  titulo: string;
  autor: string;
  descripcion: string;
  precio: number;
  stock: number;
  estado: BookStatus;
  categoriaId: number;
  categoriaNombre: string;
}

export interface CreateBookRequest {
  titulo: string;
  autor: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoriaId: number;
}

