import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tablet',
  templateUrl: './tablet.component.html',
  styleUrls: ['./tablet.component.css']
})
export class TabletComponent implements OnInit {

  workSpace;
  constructor(public activatedRoute: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {

  }

  goBack() {
    this.router.navigate(['/sos']);
  }
}
