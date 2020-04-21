import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-denied',
  templateUrl: './denied.component.html',
  styleUrls: ['./denied.component.css']
})
export class DeniedComponent implements OnInit {

  constructor(private r: Router) { }

  ngOnInit() {
  }

  redirectToLogin(){
    this.r.navigate(['/login']);
  }
}
