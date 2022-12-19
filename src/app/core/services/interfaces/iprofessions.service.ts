import { Observable } from "rxjs";
import { ProfessionDto } from "../../dto/profession-dto";
import { AddProfessionModel } from "../../models/add-profession-model";
import { PagedItemsList, PagedListOrder } from "../../models/paged-list-model";

export interface IProfessionsService {
  getPaged(filter: string, page: number, pageSize: number, order: PagedListOrder): Observable<PagedItemsList<ProfessionDto>>;
  add(department: AddProfessionModel): Observable<void>;
  getAll(): Observable<ProfessionDto[]>;
}