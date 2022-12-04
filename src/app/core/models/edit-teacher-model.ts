import { Operation } from "rfc6902";
import { TeacherDto } from "../dto/teacher-dto";
import { TeacherShortInfoModel } from "./teacher-short-info-model";

export class EditTeacherModel {
  public teacherShortInfoPatch: Operation[] = [];
  public isFacultyHead: boolean;
  public isDepartmentHead: boolean;
  public subjectIds: number[] = [];

  constructor(dto: TeacherDto) {
    this.isFacultyHead = !!dto.facultyHead;
    this.isDepartmentHead = !!dto.departmentHead;
    this.subjectIds = dto.teacherSubjects.map(x => x.subject.id);
  }
}