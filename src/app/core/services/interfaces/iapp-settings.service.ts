import { Subject } from "rxjs";

export interface IAppSettingsService {
  onConfigLoaded: Subject<void>
  load(): void;
}