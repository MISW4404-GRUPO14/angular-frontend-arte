import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  routes: any[] = [];
  constructor(private router: Router) {}
  isExpanded: boolean = false;
  ngOnInit(): void {
    this.routes = this.router.config
      .filter((route) => route.data && route.data.menu && route.data.menuOrder)
      .sort((a, b) => a.data?.menuOrder - b.data?.menuOrder)
      .map((route) => {
        return {
          title: route.data?.menu,
          url: route.path,
        };
      });
  }

  toggleNavigation() {
    this.isExpanded = !this.isExpanded;
  }
}
