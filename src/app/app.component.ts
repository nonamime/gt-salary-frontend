import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BooleanInput } from '@angular/cdk/coercion';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  drawerOpened: BooleanInput = true;
  isMobleAndTablet$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private responsive: BreakpointObserver) { }

  ngOnInit(): void {
    this.responsive.observe([Breakpoints.Handset, Breakpoints.Tablet])
      .subscribe(
        result => {
          if (result.matches) {
            this.drawerOpened = false;
            this.isMobleAndTablet$.next(true);
          } else {
            this.drawerOpened = true;
            this.isMobleAndTablet$.next(false);
          }
        }
      );
  }
}
