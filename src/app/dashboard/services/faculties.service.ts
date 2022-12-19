import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FacultyDto } from "src/app/core/dto/faculty-dto";
import { AddFacultyModel } from "src/app/core/models/add-faculty-model";
import { PagedItemsList, PagedListOrder } from "src/app/core/models/paged-list-model";
import { ApiBaseService } from "src/app/core/services/api-base-service";
import { IFacultiesService } from "src/app/core/services/interfaces/ifaculties.service";
import { AppSettingsService } from "src/app/shared/services/app-settings.service";
import { HttpService } from "src/app/shared/services/http.service";

@Injectable()
export class FacultiesService extends ApiBaseService implements IFacultiesService {
  constructor(
    private readonly http: HttpService,
    private readonly settings: AppSettingsService
  ) {
    super();
    this.endpoint = `${this.settings.serverUrl}faculties`
  }

  public getPaged(filter: string, page: number, pageSize: number, order: PagedListOrder): Observable<PagedItemsList<FacultyDto>> {
    return this.http.get<PagedItemsList<FacultyDto>>(`${this.endpoint}/get-paged?${this.createGetPagedQuery(filter, page, pageSize, order)}`);
  }

  public getAll(): Observable<FacultyDto[]> {
    return this.http.get<FacultyDto[]>(`${this.endpoint}/all`);
  }

  public add(faculty: AddFacultyModel): Observable<void> {
    return this.http.post<void>(`${this.endpoint}/add`, faculty); 
  }
}