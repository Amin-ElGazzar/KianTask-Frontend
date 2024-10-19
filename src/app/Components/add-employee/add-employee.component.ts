import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/Services/employee.service';
import { ToastService } from 'src/app/Services/toast.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  employeeId: any;
  isLoading: boolean = false;
  backendError: string = '';
  employee: any;
  constructor(private _router: Router, private _employeeService: EmployeeService, private activatedRoute: ActivatedRoute, private toastService: ToastService) { }
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.employeeId = res.get('id?')
        if (this.employeeId != undefined || this.employeeId != '') {
          this._employeeService.getEmployeesById(this.employeeId).subscribe({
            next: (Response) => {
              this.employee = Response.data;
              this.employeeForm.controls['firstName'].setValue(this.employee.firstName);
              this.employeeForm.controls['lastName'].setValue(this.employee.lastName);
              this.employeeForm.controls['address'].setValue(this.employee.address);
              this.employeeForm.controls['salary'].setValue(this.employee.salary);
              this.employeeForm.controls['isActive'].setValue(this.employee.isActive);
            }
          }

          )
        }
      }
    })
  }

  employeeForm: FormGroup = new FormGroup({
    firstName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    lastName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    address: new FormControl(null, [Validators.required, Validators.maxLength(200)]),
    salary: new FormControl(null, [Validators.required, Validators.min(0)]),
    isActive: new FormControl(false),
    id: new FormControl(null),
  })

  handleEmployee(employeeForm: FormGroup) {
    this.isLoading = true;
    if (employeeForm.valid) {

      if (this.employeeId == undefined || this.employeeId == '') {
        this._employeeService.createEmployees(employeeForm.value).subscribe({
          next: (res) => {
            this.toastService.showToast('success', 'Done', ' Employee Created Successfully');
            if (res.message === 'Created') {
              this._router.navigate(['/employees']);
            }
          },
          error: (err) => {
            this.toastService.showToast(
              'error', 'Error', 'Created Employee failed'
            )
            this.backendError = err.error.message;

          },
        });
      } else {
        console.log("ddd");
        this.employeeForm.get('id')?.setValue(this.employeeId)
        this._employeeService.updateEmployees(employeeForm.value).subscribe({
          next: (res) => {
            console.log(res);
            this.toastService.showToast('success', 'Done', 'Edit Employee Successfully');
            if (res.message === 'Updated') {
              this._router.navigate(['/employees']);
            }
          },
          error: (err) => {
            this.toastService.showToast(
              'error', 'Error', 'Edit Employee failed'
            )
            this.backendError = err.error.message;
            console.log(err);
          },
        });
      }
    }
  }
}
