import { Routes } from '@angular/router';
import { MapComponent } from './map/map.component';

export const routes: Routes = [
  { path: '', redirectTo: 'map', pathMatch: 'full' },  // default (D)
  { path: 'map', component: MapComponent },            
  { path: '**', redirectTo: 'map' } 
];
