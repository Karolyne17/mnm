import { Component, OnInit, VERSION, ViewChild, ElementRef, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private titleService: Title, private activatedRoute: ActivatedRoute,) {}

getTtl(): string{
  return this.titleService.getTitle();
}

  ngOnInit(): void {}

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
