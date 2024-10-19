import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SliderComponent } from './Components/slider/slider.component';
import { EmployeesComponent } from './Components/employees/employees.component';
import { NotfoundComponent } from './Components/notfound/notfound.component';
import { AddEmployeeComponent } from './Components/add-employee/add-employee.component';

const routes: Routes = [
  { path: '', redirectTo: 'slider', pathMatch: 'full' },
  { path: 'slider', component: SliderComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'addEmployee/:id?', component: AddEmployeeComponent },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
