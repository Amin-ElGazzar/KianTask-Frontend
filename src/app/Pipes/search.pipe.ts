import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../Interfaces/employee';


@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(employee: Employee[], searchText: string): Employee[] {
    return employee.filter((employee) =>
      employee.firstName.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
    );
  }
}
