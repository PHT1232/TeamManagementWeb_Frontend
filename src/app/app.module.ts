import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './sideBar/sidebar/sidebar.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { JwtModule } from '@auth0/angular-jwt';

//Material UI
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

//PrimeNg UI
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { DropdownModule } from 'primeng/dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TreeSelectModule } from 'primeng/treeselect';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { SpeedDialModule } from 'primeng/speeddial';
import { DialogModule } from 'primeng/dialog';
import { TabViewModule } from 'primeng/tabview';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { PasswordModule } from 'primeng/password';
import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TagModule } from 'primeng/tag';

//Ngx
import { NgxDropzoneModule } from 'ngx-dropzone';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

//My style component
import { ModalFooterComponent } from 'src/shared/modal-footer/modal-footer.component';

//Other component
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TeamsComponent } from './teams/teams.component';
import { CreateTeamsComponent } from './teams/create-teams/create-teams.component';
import { TestComponent } from './tests/test/test.component';
import { ChatComponent } from './chat/chat.component';
import { UserComponent } from './user/user.component';
import { AccountsComponent } from './accounts/accounts.component';
import { LoginComponent } from './accounts/login/login.component';
import { DashbroadComponent } from './dashbroad/dashbroad.component';
import { RoleComponent } from './tests/role/role.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';
import { LoadingInterceptor } from 'src/services/LoadingInterceptor';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { PersonalComponent } from './personal/personal.component';
import { JoinTeamsComponent } from './teams/join-teams/join-teams.component';
import { UploadComponent } from './tests/upload/upload.component';
import { JwtInterceptor } from 'src/authentication/jwt.interceptor';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EncryptionInterceptor } from 'src/services/EncryptionInterceptor';

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ModalFooterComponent,
    TeamsComponent,
    CreateTeamsComponent,
    TestComponent,
    ChatComponent,
    UserComponent,
    AccountsComponent,
    LoginComponent,
    DashbroadComponent,
    RoleComponent,
    CreateUserComponent,
    PersonalComponent,
    JoinTeamsComponent,
    UploadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatIconModule,
    DividerModule,
    CardModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    FormsModule,
    ScrollPanelModule,
    PaginatorModule,
    ButtonModule,
    NgbModule,
    BsDatepickerModule,
    DropdownModule,
    ReactiveFormsModule,
    MatSelectModule,
    DynamicDialogModule,
    TreeSelectModule,
    FontAwesomeModule,
    TableModule,
    DialogModule,
    HttpClientModule,
    SpeedDialModule,
    TabViewModule,
    InputMaskModule,
    InputTextModule,
    InputSwitchModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["192.168.1.15:7279"],
        disallowedRoutes: []
      }
    }),
    PasswordModule,
    PanelModule,
    SplitButtonModule,
    ToastModule,
    LoadingIndicatorComponent,
    ConfirmDialogModule,
    NgxDropzoneModule,
    TagModule,
    PickerModule,
  ],
  providers: [
    DialogService,
    ConfirmationService,
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: EncryptionInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
