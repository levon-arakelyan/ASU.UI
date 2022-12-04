import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AudienceDto } from "src/app/core/dto/audience-dto";
import { FacultyDto } from "src/app/core/dto/faculty-dto";
import { AddAudienceModel } from "src/app/core/models/add-audience-model";
import { AddFacultyModel } from "src/app/core/models/add-faculty-model";
import { PagedItemsList, PagedListOrder } from "src/app/core/models/paged-list-model";
import { ApiBaseService } from "src/app/core/services/api-base-service";
import { IAudienciesService } from "src/app/core/services/iaudiencies.service";
import { IFacultiesService } from "src/app/core/services/ifaculties.service";
import { AppSettingsService } from "src/app/shared/services/app-settings.service";

@Injectable()
export class AudienciesService extends ApiBaseService implements IAudienciesService {
  constructor(private http: HttpClient, private settings: AppSettingsService) {
    super();
    this.endpoint = `${this.settings.serverUrl}audiencies`
  }

  public getPaged(filter: string, page: number, pageSize: number, order: PagedListOrder): Observable<PagedItemsList<AudienceDto>> {
    return this.http.get<PagedItemsList<AudienceDto>>(`${this.endpoint}/get-paged`, { params: {
      page,
      pageSize,
      orderBy: order.orderBy,
      direction: order.direction,
      filter,
    }});
  }

  public getAll(): Observable<AudienceDto[]> {
    return this.http.get<AudienceDto[]>(`${this.endpoint}/all`);
  }

  public add(audience: AddAudienceModel): Observable<void> {
    return this.http.post<void>(`${this.endpoint}/add`, audience); 
  }
}