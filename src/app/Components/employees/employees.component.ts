import { Component, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { EmployeeService } from 'src/app/Services/employee.service';
import { DialogComponent } from '../dialog/dialog.component';
import { ToastService } from 'src/app/Services/toast.service';
import { MatDialog } from '@angular/material/dialog';
import { Table } from 'primeng/table';
import { Employee } from 'src/app/Interfaces/employee';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent {
  @ViewChild('dt') table: Table | any;

  employees: Employee[] = [];
  dtoption: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  searchValue: string = ''
  constructor(private employeeService: EmployeeService,
    public dialog: MatDialog,
    private toastService: ToastService
  ) { }
  rows: number = 10;
  rowsPerPageOptions = [
    { label: '10', value: 10 },
    { label: '25', value: 25 },
    { label: '50', value: 50 }
  ];
  updateRows(event: any) {
    this.rows = event.value;
  }
  ngOnInit(): void {

    this.dtoption = {
      pagingType: 'full_numbers',
    };

    this.getEmployeesData()

  }

  getEmployeesData() {
    this.employeeService.getEmployees().subscribe({
      next: (Response: any) => {
        this.employees = Response.data;
        this.dtTrigger.next(null);
      },
    });
  }




  onSearch(value: any) {
    this.searchValue = value
  }

  deleteEmp(employeeId: number) {
    const dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log(result);
        this.employeeService.deleteEmployees(employeeId).subscribe({
          next: (res: any) => {
            console.log(res);
            this.toastService.showToast('warn', 'Delete', 'Delete Employee Successfully')
            
            this.getEmployeesData()

          },
          error: (error) => {
            console.error('Error:', error);
            this.toastService.showToast(
              'error', 'Error', 'Delete Employee failed'
            )
          }
        });
      }
    });
  }




  updateActiveStatus(employee: Employee) {
    let data = { "id": employee.id, "IsActive": employee.isActive }
    this.employeeService.activeEmployees(data).subscribe({
      next: (res) => {
        console.log(res);
        this.toastService.showToast('success', 'Done', 'Edit Employee Successfully');
        this.getEmployeesData()

      },
      error: (error) => {
        console.error('Error:', error);
        this.toastService.showToast(
          'error', 'Error', 'Edit Employee failed'
        )
      }
    })
  }

}
