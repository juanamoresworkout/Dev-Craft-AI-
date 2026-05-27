import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'libros'
  },
  {
    path: 'libros',
    loadComponent: () =>
      import('./features/book-catalog/book-catalog').then((m) => m.BookCatalog)
  },
  {
    path: 'libros/nuevo',
    loadComponent: () =>
      import('./features/book-form/book-form').then((m) => m.BookForm)
  },
  {
    path: 'libros/:id',
    loadComponent: () =>
      import('./features/book-detail/book-detail').then((m) => m.BookDetail)
  },
  {
    path: '**',
    redirectTo: 'libros'
  }
];
