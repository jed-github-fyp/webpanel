import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './table/table.component';
import { Table2Component } from './table2/table2.component';
import { Table3Component } from './table3/table3.component';
import { Table4Component } from './table4/table4.component';


const routes: Routes = [
  {
    path: '', component: TableComponent
  },
  {
    path: 'studentlist', component: TableComponent
  },
  {
    path: 'classlist', component: Table2Component
  },
  {
    path: 'attendancelist', component: Table3Component
  },
  {
    path: 'homeworklist', component: Table4Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
