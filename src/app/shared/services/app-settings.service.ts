import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { IPagedListSettings } from "src/app/core/interfaces/ipaged-list-settings";
import { AppSettings } from "src/app/core/models/app-settings-model";
import { IAppSettingsService } from "src/app/core/services/iapp-settings.service";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService implements IAppSettingsService {
  public serverUrl: string;
  public pagedList: IPagedListSettings;

  public onConfigLoaded: Subject<void> = new Subject();

  constructor(private http: HttpClient) {

  }

  public load(): void {
    this.http.get<AppSettings>(`${environment.settingsFile}`).subscribe({
      next: res => {
        this.serverUrl = res.serverUrl;
        this.pagedList = res.pagedList;

        this.onConfigLoaded.next();
        this.onConfigLoaded.complete();
      },
      error: err => {
        throw new Error(`Could not load file '${environment.settingsFile}': ${JSON.stringify(err)}`)
      }
    });
}
}