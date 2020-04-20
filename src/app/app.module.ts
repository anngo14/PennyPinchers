import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatListModule} from '@angular/material/list';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatChipsModule} from '@angular/material/chips';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { GoalsComponent } from './goals/goals.component';
import { ArchiveComponent } from './archive/archive.component';
import { SettingsComponent } from './settings/settings.component';
import { InitialComponent } from './initial/initial.component';
import { ExpenseDialogComponent } from './expense-dialog/expense-dialog.component';
import { NeedsDialogComponent } from './needs-dialog/needs-dialog.component';
import { WantsDialogComponent } from './wants-dialog/wants-dialog.component';
import { SavingDialogComponent } from './saving-dialog/saving-dialog.component';
import { UnategorizedDialogComponent } from './unategorized-dialog/unategorized-dialog.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { DetailedGoalComponent } from './detailed-goal/detailed-goal.component';
import { ErrorComponent } from './error/error.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    GoalsComponent,
    ArchiveComponent,
    SettingsComponent,
    InitialComponent,
    ExpenseDialogComponent,
    NeedsDialogComponent,
    WantsDialogComponent,
    SavingDialogComponent,
    UnategorizedDialogComponent,
    EditDialogComponent,
    DetailedGoalComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    MatSidenavModule,
    MatGridListModule,
    MatSelectModule,
    MatIconModule,
    MatDividerModule,
    MatTabsModule,
    MatProgressBarModule,
    MatListModule,
    MatStepperModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatChipsModule,
    MatDialogModule,
    MatCheckboxModule,
    FormsModule,
    BrowserAnimationsModule
  ],

  entryComponents: [
    ExpenseDialogComponent,
    NeedsDialogComponent,
    WantsDialogComponent,
    SavingDialogComponent,
    UnategorizedDialogComponent,
    EditDialogComponent,
    DetailedGoalComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
