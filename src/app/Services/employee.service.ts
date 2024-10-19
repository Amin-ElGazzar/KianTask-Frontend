import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUrl } from '../Environment/Environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private _httpClient: HttpClient) { }

  getEmployees(): Observable<any> {
    return this._httpClient.get(`${BaseUrl}/api/Employees/Get`)
  }

  getEmployeesById(employeeId: number): Observable<any> {
    return this._httpClient.get(`${BaseUrl}/api/Employees/Get/${employeeId}`)
  }
  createEmployees(employee: object): Observable<any> {
    return this._httpClient.post(`${BaseUrl}/api/Employees/Create`, employee)
  }

  updateEmployees(employee: object): Observable<any> {
    return this._httpClient.put(`${BaseUrl}/api/Employees/Update`, employee)
  }

  activeEmployees(employee: object): Observable<any> {
    return this._httpClient.put(`${BaseUrl}/api/Employees/ActiveEmployee`, employee)
  }

  deleteEmployees(employeeId: number): Observable<any> {
    return this._httpClient.delete(`${BaseUrl}/api/Employees/Delete/${employeeId}`)
  }
}
