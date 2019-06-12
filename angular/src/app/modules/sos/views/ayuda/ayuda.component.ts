import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.css']
})
export class AyudaComponent implements OnInit {

  workSpace;
  constructor(public activatedRoute: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {

  }

  goBack() {
    this.router.navigate(['/sos']);
  }
}
