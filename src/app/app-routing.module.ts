import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterselectComponent } from './characterselect/characterselect.component';

const routes: Routes = [{path: 'characterselect', component: CharacterselectComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
