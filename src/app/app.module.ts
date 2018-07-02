import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { D3MatrixComponent } from './d3-matrix/d3-matrix.component';
import { BcvSearchComponent } from './bcv-search/bcv-search.component';
import { D3Service } from 'd3-ng2-service';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AlignerService } from './aligner.service';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {GlobalUrl} from './globalUrl';


@NgModule({
  declarations: [
    AppComponent,
    D3MatrixComponent,
    BcvSearchComponent
  ],
  imports: [
    BrowserModule,HttpModule,FormsModule,CommonModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot()
  ],
  providers: [AlignerService,D3Service,GlobalUrl],
  bootstrap: [AppComponent]
})
export class AppModule { }
