import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ProfessionDto } from "src/app/core/dto/profession-dto";
import { AddProfessionModel } from "src/app/core/models/add-profession-model";
import { PagedItemsList, PagedListOrder } from "src/app/core/models/paged-list-model";
import { ApiBaseService } from "src/app/core/services/api-base-service";
import { IProfessionsService } from "src/app/core/services/interfaces/iprofessions.service";
import { AppSettingsService } from "src/app/shared/services/app-settings.service";
import { HttpService } from "src/app/shared/services/http.service";

@Injectable()
export class ProfessionsService extends ApiBaseService implements IProfessionsService {
  constructor(
    private readonly http: HttpService,
    private readonly settings: AppSettingsService
  ) {
    super();
    this.endpoint = `${this.settings.serverUrl}professions`
  }

  public getPaged(filter: string, page: number, pageSize: number, order: PagedListOrder): Observable<PagedItemsList<ProfessionDto>> {
    return this.http.get<PagedItemsList<ProfessionDto>>(`${this.endpoint}/get-paged?${this.createGetPagedQuery(filter, page, pageSize, order)}`);
  }

  public getAll(): Observable<ProfessionDto[]> {
    return this.http.get<ProfessionDto[]>(`${this.endpoint}/all`)
  }

  public add(faculty: AddProfessionModel): Observable<void> {
    return this.http.post<void>(`${this.endpoint}/add`, faculty); 
  }
}