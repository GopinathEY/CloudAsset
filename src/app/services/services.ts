import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiassetService {

  constructor(private http: HttpClient) {}

  PostRESTAPI(uiasset: any) {
    console.log(uiasset);
    return this.http.post(
      'https://dev.azure.com/SarathSasi0251/argocd/_apis/pipelines/28/runs?api-version=6.0-preview.1&branchName=Interactive_pipeline',
      uiasset
    );
  }

  getToolsList() {
    return this.http
      .get('./assets/k8Toolslist.json')
      .pipe(map((response: any) => response));
  }


}
