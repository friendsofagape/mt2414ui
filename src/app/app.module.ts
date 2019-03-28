import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { D3MatrixComponent } from './d3-matrix/d3-matrix.component';
import { BcvSearchComponent } from './bcv-search/bcv-search.component';
import { D3Service } from 'd3-ng2-service';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlignerService } from './aligner.service';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { GlobalUrl } from './globalUrl';
import { HorizontalCardComponent } from './horizontal-card/horizontal-card.component';
import { VerticalInterlinearComponent } from './vertical-interlinear/vertical-interlinear.component';
import { SelfBuildingSquareSpinnerModule, FulfillingSquareSpinnerModule, HalfCircleSpinnerModule, ScalingSquaresSpinnerModule, IntersectingCirclesSpinnerModule, RadarSpinnerModule } from 'angular-epic-spinners';
import { CsvToTableComponent } from './csv-to-table/csv-to-table.component';
import { RouterModule } from '@angular/router';
import { KeysPipePipe } from './keys-pipe.pipe';
import { LinearWidgetComponent } from './linear-widget/linear-widget.component';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import {
  MAT_DIALOG_DEFAULT_OPTIONS,
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
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ComboEditorComponent } from './combo-editor/combo-editor.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DummyAppComponentComponent } from './dummy-app-component/dummy-app-component.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { WordViewEditorComponent } from './word-view-editor/word-view-editor.component';
import { StrongpageComponent } from './strongpage/strongpage.component';
import { ComboComponent } from './combo/combo.component';
import { NumberToStringPipe } from './number-to-string.pipe';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { DialogOverviewExampleDialog } from './admin-panel/admin-panel.component';
import { AssignTaskDialog } from './admin-panel/admin-panel.component';
import { LoginDialog } from './navigation/navigation.component';
import { SignupDialog } from './navigation/navigation.component';
import { resetDialog } from './navigation/navigation.component';
import { forgotDialog } from './navigation/navigation.component';
import { NavigationComponent } from './navigation/navigation.component';
import { OrganizationComponent } from './organization/organization.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { RequestorganisationComponent } from './requestorganisation/requestorganisation.component';
import { ReportsComponent } from './reports/reports.component';
import { CarouselComponent } from './carousel/carousel.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { OwlModule } from 'ngx-owl-carousel';
import { WordViewAlignerComponent } from './word-view-aligner/word-view-aligner.component';


@NgModule({
  declarations: [
    AppComponent,
    D3MatrixComponent,
    BcvSearchComponent,
    HorizontalCardComponent,
    VerticalInterlinearComponent,
    CsvToTableComponent,
    KeysPipePipe,
    LinearWidgetComponent,
    ComboEditorComponent,
    LoginComponent,
    RegisterComponent,
    DummyAppComponentComponent,
    ResetpasswordComponent,
    ForgotpasswordComponent,
    WordViewEditorComponent,
    StrongpageComponent,
    ComboComponent,
    NumberToStringPipe,
    AdminPanelComponent,
    DialogOverviewExampleDialog,
    AssignTaskDialog,
    LoginDialog,
    SignupDialog,
    resetDialog,
    forgotDialog,
    NavigationComponent,
    OrganizationComponent,
    UserManagementComponent,
    DashboardComponent,
    FeedbackComponent,
    RequestorganisationComponent,
    ReportsComponent,
    CarouselComponent,
    WordViewAlignerComponent
  ],
  imports: [
    BrowserModule, HttpModule, FormsModule, CommonModule,
    SelfBuildingSquareSpinnerModule, HalfCircleSpinnerModule, ScalingSquaresSpinnerModule, IntersectingCirclesSpinnerModule, RadarSpinnerModule,
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
    NgxChartsModule,
    SlickCarouselModule,
    OwlModule,
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
      },
      {
        path: 'app-bcv-search/:BCV/:AssignOrganisation',
        component: BcvSearchComponent
      },
      {
        path: 'app-bcv-search/:AssignLang/:AssignBook/:AssignOrganisation',
        component: BcvSearchComponent
      },
      {
        path: 'ComboEditor/:BCV/:Strong/:Hindi',
        component: ComboEditorComponent
      },
      // {
      //   path: 'app-register',
      //   component: RegisterComponent
      // },
      // {
      //   path: 'app-login',
      //   component: LoginComponent
      // },
      // {
      //   path: 'resetpassword',
      //   component: ResetpasswordComponent
      // },
      // {
      //   path: 'forgotpassword',
      //   component: ForgotpasswordComponent
      // },
      {
        path: 'wordview',
        component: WordViewEditorComponent
      },
      {
        path: 'strong/:Strong/:Lang/:TrgLang',
        component: StrongpageComponent
      },
      {
        path: 'combo/:BCV/:Lang/:TrgLang/:Pos',
        component: ComboComponent
      },
      {
        path: 'UserDashboard',
        component: DashboardComponent
      },
      { path: 'Organization', component: OrganizationComponent },
      { path: 'UserManagement', component: UserManagementComponent },
      { path: 'feedback', component: FeedbackComponent },
      { path: 'requestorg', component: RequestorganisationComponent },
      { path: 'AdminDashboard', component: AdminPanelComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'carousel', component: CarouselComponent },
      { path: 'WordViewAligner', component: WordViewAlignerComponent }
    ])
  ],
  providers: [AlignerService, D3Service, GlobalUrl],
  bootstrap: [AppComponent],
  entryComponents: [DialogOverviewExampleDialog, AssignTaskDialog, LoginDialog, SignupDialog, resetDialog, forgotDialog]
})
export class AppModule { }
