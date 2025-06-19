import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { fromLanding } from '../../store/selectors';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  public selectLandingState$ = this.store.select(
    fromLanding.selectLandingState
  );

  private unsubscribe$ = new Subject<void>();

  constructor(public router: Router, private store: Store) {}

  ngOnInit(): void {
    this.selectLandingState$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((state) => {
        console.log('state', state);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  showMobileMenu = false;
  sections = [
    { name: 'Tech', link: '/tech' },
    { name: 'Reviews', link: '/reviews' },
    { name: 'Science', link: '/science' },
    { name: 'Entertainment', link: '/entertainment' },
    { name: 'AI', link: '/ai' },
    { name: 'Cars', link: '/cars' },
    { name: 'Features', link: '/features' },
    { name: 'Videos', link: '/videos' },
    { name: 'Podcasts', link: '/podcasts' },
    { name: 'Newsletters', link: '/newsletters' },
    { name: 'Store', link: '/store' },
  ];

  goToLogin() {
    this.router.navigate(['inicia-sesion']);
  }
}
