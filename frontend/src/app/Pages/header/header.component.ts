import { Component, OnInit, VERSION, ViewChild, ElementRef, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { ServiceToken } from 'src/app/service/service.token';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private titleService: Title, private activatedRoute: ActivatedRoute, public auth: ServiceToken) {}

  ngOnInit(): void {}

  name = "Angular " + VERSION.major;

  getId(): string {
  let profileLink:string = this.auth.idValue() || "";

  return profileLink;
  }

  getVisibility(): boolean {
    let currentTitle:string = this.titleService.getTitle();
    return !(currentTitle == 'Inscription' || currentTitle == 'Connection')
  }

  getTtl(): string{
    let currentTitle:string = this.titleService.getTitle();

    return currentTitle;
  }

  @ViewChild("menuDownContainer")
  menuDownContainer!: ElementRef;

  myFunction() {
    if (this.menuDownContainer.nativeElement.style.display === "block") {
      this.menuDownContainer.nativeElement.style.display = "none";
      } else {
        this.menuDownContainer.nativeElement.style.display = "block";
      }

  }

logout(){
    this.auth.seDeconnecter();
  }
}
