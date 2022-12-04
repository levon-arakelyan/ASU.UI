import { Component, Input, OnInit } from "@angular/core";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { ScheduleDto } from "src/app/core/dto/schedule-dto";
import { SubjectDto } from "src/app/core/dto/subject-dto";
import { AudienceType } from "src/app/core/enums/audience-type";
import { AddScheduleModel } from "src/app/core/models/add-schedule-model";
import { SelectItemModel } from "src/app/core/models/select-item-model";
import { EnumHelper } from "../services/helpers/enum-helper";
import { SchedulesService } from "../services/schedules.service";
import { SubjectsService } from "../services/subjects.service";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  @Input() courseId: number;
  @Input() maxClassesPerDay: number = 4;
  @Input() maxDaysInRow: number = 3;
  @Input() weekDays: string[] = ['Երկուշաբթի', 'Երեքշաբթի', 'Չորեքշաբթի', 'Հինգշաբթի', 'Ուրբաթ'];

  public audienciesTypes: SelectItemModel[] = EnumHelper.parseToSelectItems(AudienceType);
  public classes: {subject: string, audience: number, teacher: string}[][][] = [];
  public subjects: SubjectDto[] = [];
  
  public weeklySubjects: any[] = [];
  public subjectsForScheduleGeneration: number[] = [];

  public schedule: ScheduleDto[] = [];

  public generationLoading: boolean = false;
  public savingLoading: boolean = false;
  public getLoading: boolean = false;
  public faSpinner = faSpinner;

  constructor(
    private readonly subjectsService: SubjectsService,
    private readonly schedulesService: SchedulesService
  ) {}

  public ngOnInit(): void {
    this.getScedule();
    this.getSubjects();
  }

  public onSubjectsIdsSelected(ids: number[]) {
    this.subjectsForScheduleGeneration = ids;
    this.weeklySubjects = this.subjectsForScheduleGeneration.map((id, i) => ({
      subjectId: id,
      repeat: this.weeklySubjects[i]?.repeat || 1,
      audienceType: this.weeklySubjects[i]?.audienceType
    }));
  }

  public getSubjectById(id: number) {
    return this.subjects.find(x => x.id == id)?.name;
  }

  public submit() {
    this.weeklySubjects.forEach(x => x.repeat = Number(x.repeat));

    this.generationLoading = true;
    this.schedulesService.generate(this.courseId, this.weeklySubjects).subscribe({
      next: res => {
        this.generationLoading = false;
        this.schedule = res;
        this.setClasses();
      },
      error: () => {
        this.generationLoading = false;
      }
    })
  }

  public saveSchedule() {
    const addSchedulesModel: AddScheduleModel[] = this.schedule.map(x => ({
      dayOfWeek: x.dayOfWeek,
      classNumber: x.classNumber,
      subjectId: x.subject.id,
      audienceId: x.audience.id,
      teacherId: x.teacher.id
    }));

    this.savingLoading = true;
    this.schedulesService.addForCourse(this.courseId, addSchedulesModel).subscribe({
      next: () => {
        this.savingLoading = false;
      },
      error: () => {
        this.savingLoading = false;
      }
    })
  }

  private setClasses(): void {
    this.classes = new Array(Math.ceil(this.weekDays.length / this.maxDaysInRow)).fill([]);
    for(let i = 0; i < this.classes.length; i++) {
      this.classes[i] = new Array((i + 1) * this.maxDaysInRow <= this.weekDays.length ? this.maxDaysInRow : this.maxDaysInRow - ((i + 1) * this.maxDaysInRow - this.weekDays.length)).fill([]);
      for(let j = 0; j < this.classes[i].length; j++) {
        this.classes[i][j] = [];
        for(let k = 0; k < this.maxClassesPerDay; k++) {
          const weekDay = i * this.maxDaysInRow + j;
          const classNumber = k;
          const dto = this.schedule.find(x => x.dayOfWeek == weekDay + 1 && x.classNumber == classNumber);
          if (dto == null) {
            continue
          }
          this.classes[i][j][k] = {
            teacher: dto.teacher.fullName,
            subject: dto.subject.name,
            audience: dto.audience.number
          };
        }
      }
    }
  }

  private getScedule(): void {
    this.getLoading = true;
    this.schedulesService.getForCourse(this.courseId).subscribe({
      next: res => {
        this.schedule = res;
        this.getLoading = false;
        this.setClasses();
      },
      error: () => {
        this.getLoading = false;
      }
    })
  }
  
  private getSubjects(): void {
    this.subjectsService.getAll().subscribe(res => {
      this.subjects = res;
    });
  }
  
}

//{"subjectId":9,"repeat":2,"audienceType":"1"},{"subjectId":15,"repeat":1,"audienceType":"1"},{"subjectId":7,"repeat":2,"audienceType":"1"},{"subjectId":6,"repeat":2,"audienceType":"1"},{"subjectId":17,"repeat":1,"audienceType":"1"},{"subjectId":39,"repeat":1,"audienceType":"1"},{"subjectId":25,"repeat":2,"audienceType":"1"},{"subjectId":8,"repeat":2,"audienceType":"1"},{"subjectId":41,"repeat":1,"audienceType":"0"},{"subjectId":40,"repeat":1,"audienceType":"0"}