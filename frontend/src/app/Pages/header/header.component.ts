import { Component, OnInit, VERSION, ViewChild, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  name = "Angular " + VERSION.major;
  @ViewChild("menuDownContainer")
  menuDownContainer!: ElementRef;
  myFunction() {
    if (this.menuDownContainer.nativeElement.style.display === "block") {
      this.menuDownContainer.nativeElement.style.display = "none";
      } else {
        this.menuDownContainer.nativeElement.style.display = "block";
      }

  }


}
