import { Observable } from "rxjs";
import { SubjectDto } from "../../dto/subject-dto";
import { AddSubjectModel } from "../../models/add-subject-model";
import { PagedItemsList, PagedListOrder } from "../../models/paged-list-model";

export interface ISubjectsService {
  getPaged(filter: string, page: number, pageSize: number, order: PagedListOrder): Observable<PagedItemsList<SubjectDto>>;
  add(subject: AddSubjectModel): Observable<void>;
}