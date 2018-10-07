import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configure-app',
  templateUrl: './configure-app.component.html',
  styleUrls: ['./configure-app.component.css']
})
export class ConfigureAppComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  loadUsers() {
    this.router.navigate(['/userDetails']);
  }

}
