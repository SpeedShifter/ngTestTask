import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  public id;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');


    // this.hero$ = this.service.getHero(id);
  }

}
