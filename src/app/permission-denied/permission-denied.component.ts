import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-permission-denied',
  templateUrl: './permission-denied.component.html',
  styleUrls: ['./permission-denied.component.css']
})
export class PermissionDeniedComponent implements OnInit {

  constructor(public auth:AuthService) { }

  ngOnInit() {
  }

}
