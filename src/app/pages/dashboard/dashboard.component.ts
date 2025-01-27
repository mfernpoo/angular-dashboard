import {Component, ElementRef, inject, OnInit, viewChild} from '@angular/core';
import {WidgetComponent} from '../../components/widget/widget.component';
import {DashboardService} from '../../services/dashboard.service';
import {MatButton} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {wrapGrid} from 'animate-css-grid'

@Component({
  selector: 'app-dashboard',
  providers: [DashboardService],
  imports: [
    WidgetComponent,
    MatButton,
    MatIconModule,
    MatMenuModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  store: DashboardService = inject(DashboardService)
  dashboard = viewChild.required<ElementRef>('dashboard');

  ngOnInit(): void {
    wrapGrid(this.dashboard().nativeElement, {duration: 300})
  }
}
