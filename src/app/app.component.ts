import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BooleanInput } from '@angular/cdk/coercion';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  drawerOpened: BooleanInput = true;
  isMobleAndTablet$: Subject<Boolean> = new Subject();

  customAlert = alert;

  constructor(private responsive: BreakpointObserver) { }

  ngOnInit(): void {
    this.responsive.observe([
      Breakpoints.Large,
      Breakpoints.Medium,
      Breakpoints.Small])
      .subscribe(
        result => {
          if (result.breakpoints["(min-width: 960px) and (max-width: 1279.98px)"]) {
            this.drawerOpened = true;
            this.isMobleAndTablet$.next(false);
          }
          if (result.breakpoints["(min-width: 1280px) and (max-width: 1919.98px)"]) {
            this.drawerOpened = true;
            this.isMobleAndTablet$.next(false);
          }
          if (result.breakpoints["(min-width: 600px) and (max-width: 959.98px)"]) {
            this.drawerOpened = false;
            this.isMobleAndTablet$.next(true);
          }
        }
      );
  }
}
