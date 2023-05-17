import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GithubTableComponent } from './github-table/github-table.component';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzTableModule } from 'ng-zorro-antd/table';
import { HttpClientModule } from '@angular/common/http';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [
    AppComponent,
    GithubTableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NzPageHeaderModule,
    NzTableModule,
    NzAvatarModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
