import {Component, ElementRef, viewChild} from '@angular/core';
import Chart from 'chart.js/auto';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-analitycs',
  imports: [
    MatButton
  ],
  template: `
    <div class="chart-container">
      <canvas #chart></canvas>
    </div>
    <button mat-raised-button class="mt-16">Go to channel analytics</button>
  `,
  styles: `
    .chart-container {
      height: calc(100% - 100px);
      width: 100%;
    }
  `
})
export class AnalitycsComponent {

  chart = viewChild.required<ElementRef>('chart');

  ngOnInit() {
    new Chart(this.chart().nativeElement,{
      type: 'line',
      data: {
        labels: ['Aug','Sep','Oct','Nov','Dec','Jan'],
        datasets: [{
          label: 'Views',
          data: [100,102,105,110,115,120],
          borderColor: 'rgb(255,99,132,0.5)',
          fill: 'start',
        }]
      },
      options: {
        maintainAspectRatio: false,
        elements:{
          line: {
            tension: 0.4,
          }
        }
      }
    })
  }
}
