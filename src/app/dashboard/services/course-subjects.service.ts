import { Injectable } from "@angular/core";
import { Operation } from "rfc6902";
import { Observable } from "rxjs";
import { CourseSubjectDto } from "src/app/core/dto/course-subject-dto";
import { AddCourseSubjectModel } from "src/app/core/models/add-course-subject-model";
import { ApiBaseService } from "src/app/core/services/api-base-service";
import { ICourseSubjectsService } from "src/app/core/services/interfaces/icourse-subjects.service";
import { AppSettingsService } from "src/app/shared/services/app-settings.service";
import { HttpService } from "src/app/shared/services/http.service";

@Injectable()
export class CourseSubjectsService extends ApiBaseService implements ICourseSubjectsService {
  constructor(
    private readonly http: HttpService,
    private readonly settings: AppSettingsService
  ) {
    super();
    this.endpoint = `${this.settings.serverUrl}course-subjects`
  }

  public add(courseSubjects: AddCourseSubjectModel[]): Observable<void> {
    return this.http.post<void>(`${this.endpoint}/add`, courseSubjects); 
  }

  public getForCourse(courseId: number): Observable<CourseSubjectDto[]> {
    return this.http.get<CourseSubjectDto[]>(`${this.endpoint}/get-for-course/${courseId}`); 
  }

  public save(ids: number[], courseSubjectsPatch: Operation[]): Observable<void> {
    return this.http.post<void>(`${this.endpoint}/save?ids=${ids.join(',')}`, courseSubjectsPatch); 
  }
}