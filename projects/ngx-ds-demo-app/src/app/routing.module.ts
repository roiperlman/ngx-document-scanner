import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DemoComponent} from './components/demo/demo.component';

const routes: Routes = [
  {
    path: '',
    component: DemoComponent
  },
  {
    path: 'demo',
    component: DemoComponent
  },
  {
    path: 'docs',
    component: DemoComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
