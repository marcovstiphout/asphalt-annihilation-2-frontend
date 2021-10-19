import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterselectComponent } from './characterselect/characterselect.component';
import { GamescreenComponent } from './gamescreen/gamescreen.component';

const routes: Routes = [{path: 'characterselect', component: CharacterselectComponent},{path:'game', component: GamescreenComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
