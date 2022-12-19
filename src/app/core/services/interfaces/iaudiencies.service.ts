import { Observable } from "rxjs";
import { AudienceDto } from "../../dto/audience-dto";
import { AddAudienceModel } from "../../models/add-audience-model";
import { PagedItemsList, PagedListOrder } from "../../models/paged-list-model";

export interface IAudienciesService {
  getPaged(filter: string, page: number, pageSize: number, order: PagedListOrder): Observable<PagedItemsList<AudienceDto>>
  getAll(): Observable<AudienceDto[]>;
  add(audience: AddAudienceModel): Observable<void>;
}