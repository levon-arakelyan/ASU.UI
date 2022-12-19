import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SubjectGroupDto } from "src/app/core/dto/subject-group-dto";
import { AddSubjectGroupModel } from "src/app/core/models/add-subject-group-model";
import { PagedItemsList, PagedListOrder } from "src/app/core/models/paged-list-model";
import { ApiBaseService } from "src/app/core/services/api-base-service";
import { ISubjectGroupsService } from "src/app/core/services/interfaces/isubject-groups.service";
import { AppSettingsService } from "src/app/shared/services/app-settings.service";
import { HttpService } from "src/app/shared/services/http.service";

@Injectable()
export class SubjectGroupsService extends ApiBaseService implements ISubjectGroupsService {
  constructor(
    private readonly http: HttpService,
    private readonly settings: AppSettingsService
  ) {
    super();
    this.endpoint = `${this.settings.serverUrl}subject-groups`
  }

  public getPaged(filter: string, page: number, pageSize: number, order: PagedListOrder): Observable<PagedItemsList<SubjectGroupDto>> {
    return this.http.get<PagedItemsList<SubjectGroupDto>>(`${this.endpoint}/get-paged?${this.createGetPagedQuery(filter, page, pageSize, order)}`);
  }

  public getAll(): Observable<SubjectGroupDto[]> {
    return this.http.get<SubjectGroupDto[]>(`${this.endpoint}/all`)
  }

  public add(subject: AddSubjectGroupModel): Observable<void> {
    return this.http.post<void>(`${this.endpoint}/add`, subject); 
  }
}