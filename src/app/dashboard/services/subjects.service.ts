import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SubjectDto } from "src/app/core/dto/subject-dto";
import { AddSubjectModel } from "src/app/core/models/add-subject-model";
import { PagedItemsList, PagedListOrder } from "src/app/core/models/paged-list-model";
import { ApiBaseService } from "src/app/core/services/api-base-service";
import { ISubjectsService } from "src/app/core/services/isubjects.service";
import { AppSettingsService } from "src/app/shared/services/app-settings.service";

@Injectable()
export class SubjectsService extends ApiBaseService implements ISubjectsService {
  constructor(private http: HttpClient, private settings: AppSettingsService) {
    super();
    this.endpoint = `${this.settings.serverUrl}subjects`
  }

  public getPaged(filter: string, page: number, pageSize: number, order: PagedListOrder): Observable<PagedItemsList<SubjectDto>> {
    return this.http.get<PagedItemsList<SubjectDto>>(`${this.endpoint}/get-paged`, { params: {
      page,
      pageSize,
      orderBy: order.orderBy,
      direction: order.direction,
      filter,
    }});
  }

  public getAll(): Observable<SubjectDto[]> {
    return this.http.get<SubjectDto[]>(`${this.endpoint}/all`)
  }

  public add(subject: AddSubjectModel): Observable<void> {
    return this.http.post<void>(`${this.endpoint}/add`, subject); 
  }
}