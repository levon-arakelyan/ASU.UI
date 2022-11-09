import { UserRole } from "../enums/user-role";

export class AuthenticatedUser {
  public email: string;
  public firstName: string;
  public lastName: string;
  public role: UserRole;
  public isFacultyHead: boolean;
  public isDepartmentHead: boolean;
}