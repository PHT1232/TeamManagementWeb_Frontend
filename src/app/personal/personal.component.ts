import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { UserDisplay } from 'src/services/models/Users/UserDisplay';
import { UserChatService } from 'src/services/UserChatService';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {
  tooltipItems!: MenuItem[];
  loading = false;
  users: UserDisplay[] = [];
  currentUser!: string | null;

  value: string = '';

  height: number = 95;

  userSeleted: UserDisplay = new UserDisplay();
  chatSessionSelected: number = 0;

  @ViewChild('searchInput') searchInput!: ElementRef;

  constructor(private userChatService: UserChatService) {}

  ngOnInit(): void {
    if (window.innerHeight >= 1200) {
      this.height = 95;
    } else {
      this.height = 90;
    }

    this.tooltipItems = [
      {
          tooltipOptions: {
              tooltipLabel: 'Tạo'
          },
          icon: 'pi pi-pencil',
          command: () => {
          }
      },
      {
          tooltipOptions: {
              tooltipLabel: 'Tham gia'
          },
          icon: 'pi pi-users',
          command: () => {
          }
      },
    ];

    this.currentUser = localStorage.getItem('userId');

    if (this.currentUser !== null) {
      this.userChatService.getRecentChatUser(this.currentUser, 0).subscribe({
        next: (data) => {
          console.log(data);
          this.users = data.users;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      })
    }
  }

  async searchUsers(event: Event) {
    if (this.value !== '' && this.currentUser !== null) {
      this.loading = true;
      this.userChatService.searchUsers(this.value, this.currentUser).subscribe({
        next: (data) => {
          console.log(data);
          this.users = data;          
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      })
      await delay(100);
      this.searchInput.nativeElement.focus();   
    } 
  }
  
  clickUser(user: UserDisplay) {
    this.userSeleted = user;
  }
}

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}