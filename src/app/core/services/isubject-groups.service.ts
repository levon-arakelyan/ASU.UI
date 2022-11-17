import { Observable } from "rxjs";
import { SubjectGroupDto } from "../dto/subject-group-dto";
import { AddSubjectGroupModel } from "../models/add-subject-group-model";
import { PagedItemsList, PagedListOrder } from "../models/paged-list-model";

export interface ISubjectGroupsService {
  getPaged(filter: string, page: number, pageSize: number, order: PagedListOrder): Observable<PagedItemsList<SubjectGroupDto>>;
  add(subjectGroup: AddSubjectGroupModel): Observable<void>;
  getAll(): Observable<SubjectGroupDto[]>;
}