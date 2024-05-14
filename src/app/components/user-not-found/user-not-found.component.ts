import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-not-found',
  templateUrl: './user-not-found.component.html',
  styleUrls: ['./user-not-found.component.scss']
})
export class UserNotFoundComponent {
  constructor(private router:Router){
    this.router.navigateByUrl('');
  }
}
