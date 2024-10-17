import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: $localize`:{movies_path}:peliculas`,
    loadChildren: () =>
      import('./movies/movies.module').then((m) => m.MoviesModule),
    data: {
      menu: $localize`:{movies}:Películas`,
      menuOrder: 2,
    },
  },
  {
    path: 'actores',
    loadChildren: () =>
      import('./actors/actors.module').then((m) => m.ActorsModule),
    data: {
      menu: 'Actores',
      create: 'Crear actor',
      menuOrder: 3,
    },
  },
  {
    path: $localize`:{pathD}:directores`,
    loadChildren: () =>
      import('./directors/directors.module').then((m) => m.DirectorsModule),
    data: {
      menu: $localize`:{directors}:Directores`,
      menuOrder: 2,
    },
  },
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
