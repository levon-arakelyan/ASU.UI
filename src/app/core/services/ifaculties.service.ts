import { Observable } from "rxjs";
import { FacultyDto } from "../dto/faculty-dto";
import { PagedItemsList, PagedListOrder } from "../models/paged-list-model";

export interface IFacultiesService {
  getPaged(filter: string, page: number, pageSize: number, order: PagedListOrder): Observable<PagedItemsList<FacultyDto>>
  getAll(): Observable<FacultyDto[]>;
  add(faculty: FacultyDto): Observable<void>;
}