import { Component, Input, OnInit } from "@angular/core";
import { faSpinner, faPlus, faTrash, faPencilAlt, faSave } from "@fortawesome/free-solid-svg-icons";
import { ToastrService } from "ngx-toastr";
import { SubjectDto } from "src/app/core/dto/subject-dto";
import { TeacherDto } from "src/app/core/dto/teacher-dto";
import { AudienceType } from "src/app/core/enums/audience-type";
import { ScheduleEditableClassModel } from "src/app/core/models/schedule-editable-class-model";
import { ScheduleEditableClassGroupModel } from "src/app/core/models/schedule-editable-class-group-model";
import { SelectItemModel } from "src/app/core/models/select-item-model";
import { ConfirmationModalService } from "src/app/shared/services/confirmation-modal.service";
import { AudienciesService } from "../../services/audiencies.service";
import { EnumHelper } from "../../services/helpers/enum-helper";
import { SchedulesService } from "../../services/schedules.service";
import { SubjectsService } from "../../services/subjects.service";
import { TeachersService } from "../../services/teachers.service";
import { ScheduleClassType } from "src/app/core/enums/schedule-class-type";
import { ScheduleClassGroupModel } from "src/app/core/models/schedule-class-group-model";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  @Input() courseId: number;
  @Input() maxDaysInRow: number = 3;
  @Input() maxClassesPerDay: number = 4;
  @Input() weekDays: string[] = ['Երկուշաբթի', 'Երեքշաբթի', 'Չորեքշաբթի', 'Հինգշաբթի', 'Ուրբաթ'];

  private scheduleRemovedMessage = 'Դասացուցակը հաջողությամբ ջնջվել է';
  private scheduleSavedMessage = 'Դասացուցակը հաջողությամբ պահպանվել է';

  public audienciesValues: string[] = EnumHelper.parseToValuesArray(AudienceType);
  public audienciesTypes: SelectItemModel[] = EnumHelper.parseToSelectItems(AudienceType);
  public studentGroups: string[] = ['ա','բ']
  public classNumbers = ['I', 'II', 'III', 'IV'];

  public editableClasses: ScheduleEditableClassGroupModel[][] = [];
  public classes: ScheduleClassGroupModel[][] = [];
  public subjects: SubjectDto[] = [];
  public teachers: TeacherDto[] = [];
  public teachersForSubject: SelectItemModel[] = [];
  public audiences: SelectItemModel[] = [];

  public weeklySubjects: any[] = [];
  public subjectsForScheduleGeneration: number[] = [];

  public isScheduleEditing: boolean = false;

  public generationLoading: boolean = false;
  public savingLoading: boolean = false;
  public getLoading: boolean = false;
  public scheduleDeletingLoading: boolean = false;

  public faSpinner = faSpinner;
  public faPlus = faPlus;
  public faDelete = faTrash;
  public faEdit = faPencilAlt;

  public scheduleClassType = ScheduleClassType;

  constructor(
    private readonly subjectsService: SubjectsService,
    private readonly schedulesService: SchedulesService,
    private readonly teachersService: TeachersService,
    private readonly audiencesService: AudienciesService,
    private readonly confirmationModalService: ConfirmationModalService,
    private readonly notificationsService: ToastrService
  ) {}

  public ngOnInit(): void {
    this.getTeachers();
    this.getAudiences();
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

  public saveSchedule() {
    this.savingLoading = true;
    this.schedulesService.saveScheduleForCourse(this.courseId, this.editableClasses).subscribe({
      next: () => {
        this.isScheduleEditing = false;
        this.notificationsService.success(this.scheduleSavedMessage);
        this.getScedule();
        this.savingLoading = false;
      },
      error: () => {
        this.savingLoading = false;
      }
    })
  }

  public openScheduleDeletingConfirmationModal() {
    this.confirmationModalService.open({
      action: 'ջնջել դասացուցակը',
      agreed: () => {
        this.removeSchedule()
      }
    });
  }

  public addGroupRow(group: ScheduleEditableClassGroupModel) {
    group.classType = ScheduleClassType.Group;
    group.classes.push(new ScheduleEditableClassModel());
  }

  public addFractionRow(group: ScheduleEditableClassGroupModel) {
    group.classType = ScheduleClassType.Fraction;
    group.classes.push(new ScheduleEditableClassModel());
  }

  public removeClassRow(index: number, group: ScheduleEditableClassGroupModel) {
    group.classType = ScheduleClassType.Normal;
    group.classes.splice(index, 1);
  }

  public removeClass(group: ScheduleEditableClassGroupModel) {
    group.classType = ScheduleClassType.Normal;
    group.classes = [new ScheduleEditableClassModel()];
  }

  public getTeachersForSubject(subjectId: number): SelectItemModel[] {
    if (subjectId == null) {
      return [];
    }
    return this.teachers
      .filter(x => x.teacherSubjects.some(y => y.subject.id == subjectId))
      .map(x => new SelectItemModel(x.fullName, x.id));
  }

  private getTeachers(): void {
    this.teachersService.getAll().subscribe(res => {
      this.teachers = res;
    })
  }

  private getScedule(): void {
    this.getLoading = true;
    this.schedulesService.getRegularScheduleForCourse(this.courseId).subscribe({
      next: res => {
        this.classes = res;
        this.getLoading = false;
      },
      error: () => {
        this.getLoading = false;
      }
    });
    this.schedulesService.getEditableScheduleForCourse(this.courseId).subscribe({
      next: editableSchedule => {
        this.editableClasses = editableSchedule;
      }
    });
  }
  
  private getSubjects(): void {
    this.subjectsService.getAll().subscribe(res => {
      this.subjects = res;
    });
  }

  private getAudiences(): void {
    this.audiencesService.getAll().subscribe(res => {
      this.audiences = res.map(x => new SelectItemModel(`${x.number} (${this.audienciesValues[parseInt(x.type)]})`, x.id));
    })
  }
  
  private removeSchedule() {
    this.scheduleDeletingLoading = true;
    this.schedulesService.deleteScheduleForCourse(this.courseId).subscribe({
      next: () => {
        this.notificationsService.success(this.scheduleRemovedMessage);
        this.getScedule();
        this.scheduleDeletingLoading = false;
      },
      error: () => {
        this.scheduleDeletingLoading = false;
      }
    });
  }
}
//[[{"classType":0,"classes":[{"subjectId":9,"audienceId":8,"teacherId":16}]},{"classType":0,"classes":[{"subjectId":15,"audienceId":8,"teacherId":20}]},{"classType":1,"classes":[{"subjectId":7,"audienceId":8,"teacherId":24},{"subjectId":6,"audienceId":11,"teacherId":21}]},{"classType":2,"classes":[{"subjectId":6,"audienceId":8,"teacherId":21},{"subjectId":0,"audienceId":0,"teacherId":0}]}],[{"classType":1,"classes":[{"subjectId":9,"audienceId":8,"teacherId":16},{"subjectId":39,"audienceId":11,"teacherId":22}]},{"classType":1,"classes":[{"subjectId":39,"audienceId":11,"teacherId":22},{"subjectId":9,"audienceId":8,"teacherId":16}]},{"classType":0,"classes":[{"subjectId":17,"audienceId":8,"teacherId":7}]},{"classType":0,"classes":[{"subjectId":0,"audienceId":0,"teacherId":0}]}],[{"classType":0,"classes":[{"subjectId":25,"audienceId":9,"teacherId":3}]},{"classType":0,"classes":[{"subjectId":8,"audienceId":8,"teacherId":16}]},{"classType":2,"classes":[{"subjectId":25,"audienceId":8,"teacherId":3},{"subjectId":0,"audienceId":0,"teacherId":0}]},{"classType":0,"classes":[{"subjectId":0,"audienceId":0,"teacherId":0}]}],[{"classType":0,"classes":[{"subjectId":0,"audienceId":0,"teacherId":0}]},{"classType":1,"classes":[{"subjectId":8,"audienceId":8,"teacherId":16},{"subjectId":7,"audienceId":11,"teacherId":24}]},{"classType":1,"classes":[{"subjectId":6,"audienceId":11,"teacherId":21},{"subjectId":8,"audienceId":8,"teacherId":16}]},{"classType":0,"classes":[{"subjectId":0,"audienceId":0,"teacherId":0}]}],[{"classType":0,"classes":[{"subjectId":7,"audienceId":8,"teacherId":24}]},{"classType":0,"classes":[{"subjectId":40,"audienceId":6,"teacherId":75}]},{"classType":0,"classes":[{"subjectId":41,"audienceId":12,"teacherId":76}]},{"classType":0,"classes":[{"subjectId":0,"audienceId":0,"teacherId":0}]}]]