import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './sideBar/sidebar/sidebar.component';
import { CreateTagComponent } from './recipt/tag/create-tag/create-tag.component';
import { TagComponent } from './recipt/tag/tag.component';

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
import { ReciptComponent } from './recipt/recipt.component';
import { ReceiptCreateComponent } from './recipt/receipt-create/receipt-create.component';
import { PanelModule } from 'primeng/panel';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TreeSelectModule } from 'primeng/treeselect';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';

//Ngx
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

//My style component
import { ModalFooterComponent } from 'src/shared/modal-footer/modal-footer.component';
import { MenuComponent } from 'src/shared/menu-select/menu-component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ReciptComponent,
    ReceiptCreateComponent,
    ModalFooterComponent,
    CreateTagComponent,
    TagComponent,
    MenuComponent
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
    PanelModule,
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
    TableModule
  ],
  providers: [
    DialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
