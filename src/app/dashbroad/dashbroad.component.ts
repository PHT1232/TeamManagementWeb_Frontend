import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { SignalrService } from 'src/services/SignalrService';

@Component({
  selector: 'app-dashbroad',
  templateUrl: './dashbroad.component.html',
  styleUrls: ['./dashbroad.component.css']
})
export class DashbroadComponent {
  events: string[] = [];
  opened: boolean = true;
  title = 'FinancialManagementWeb_Frontend';
  currentRoute!: string;

  constructor(public location: Location, private contexts: ChildrenOutletContexts, public signalService: SignalrService)
  {
    this.signalService.startConnection();
    this.signalService.messageListener();
    this.signalService.addConnectedUserListener();
  }

  getCurrentUrl(): string {
    let currentUrl = this.location.path();
    if (currentUrl === "/user" || currentUrl === "/user/create") {
      this.currentRoute = "Người dùng";
      return "Người dùng";
    } else if (currentUrl === '/teams') {
      this.currentRoute = "Nhóm";
      return "Nhóm";
    } else {
      this.currentRoute = "Home";
      return "Home";
    }
  }
}
