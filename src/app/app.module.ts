import { CloudAssetuiComponent } from './cloudAssetui/cloudAssetui.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/auth-interceptor.interceptor';

@NgModule({
  declarations: [
    AppComponent,CloudAssetuiComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule, NgSelectModule, FormsModule, RouterModule,AppRoutingModule, HttpClientModule
  ],
  providers: [    {
    provide: HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

