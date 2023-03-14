import { CloudAssetuiComponent } from './cloudAssetui/cloudAssetui.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: './cloudAssetui' },
  { path: 'cloudAssetui', component: CloudAssetuiComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule ]
})
export class AppRoutingModule { }
