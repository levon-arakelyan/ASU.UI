import { Observable } from "rxjs";
import { DepartmentDto } from "../../dto/department-dto";
import { AddDepartmentModel } from "../../models/add-department-model";
import { PagedItemsList, PagedListOrder } from "../../models/paged-list-model";

export interface IDepartmentsService {
  getPaged(filter: string, page: number, pageSize: number, order: PagedListOrder): Observable<PagedItemsList<DepartmentDto>>
  getAll(): Observable<DepartmentDto[]>;
  add(department: AddDepartmentModel): Observable<void>;
}