import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { D3MatrixComponent } from './d3-matrix/d3-matrix.component';
import { BcvSearchComponent } from './bcv-search/bcv-search.component';
import { D3Service } from 'd3-ng2-service';
import { HttpModule } from '@angular/http';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { AlignerService } from './aligner.service';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {GlobalUrl} from './globalUrl';
import { HorizontalCardComponent } from './horizontal-card/horizontal-card.component';
import { VerticalInterlinearComponent } from './vertical-interlinear/vertical-interlinear.component';
import {SelfBuildingSquareSpinnerModule, FulfillingSquareSpinnerModule, HalfCircleSpinnerModule,ScalingSquaresSpinnerModule,IntersectingCirclesSpinnerModule,RadarSpinnerModule} from 'angular-epic-spinners';
import { CsvToTableComponent } from './csv-to-table/csv-to-table.component';
import { RouterModule} from '@angular/router';
import { KeysPipePipe } from './keys-pipe.pipe';
import { LinearWidgetComponent } from './linear-widget/linear-widget.component';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    D3MatrixComponent,
    BcvSearchComponent,
    HorizontalCardComponent,
    VerticalInterlinearComponent,
    CsvToTableComponent,
    KeysPipePipe,
    LinearWidgetComponent
  ],
  imports: [
    BrowserModule,HttpModule,FormsModule,CommonModule,
    SelfBuildingSquareSpinnerModule,HalfCircleSpinnerModule,ScalingSquaresSpinnerModule,IntersectingCirclesSpinnerModule,RadarSpinnerModule,
    BrowserAnimationsModule, MatNativeDateModule,
    ReactiveFormsModule, CdkTableModule,
    CdkTreeModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: BcvSearchComponent },
      {
         path: 'csv-to-table',
         component: CsvToTableComponent
      },
      {
        path: 'app-bcv-search',
        component: BcvSearchComponent
     },
     {
      path: 'app-bcv-search/:BCV',
      component: BcvSearchComponent
   }
   ])
  ],
  providers: [AlignerService,D3Service,GlobalUrl],
  bootstrap: [AppComponent]
})
export class AppModule { }
