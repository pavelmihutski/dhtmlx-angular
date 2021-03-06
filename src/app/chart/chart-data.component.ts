import {Output, Component, ViewChild, OnDestroy, ElementRef, EventEmitter} from '@angular/core';
import {Chart as ChartDHX, DataCollection} from 'dhx-suite';

@Component({
  selector: 'app-chart-data',
  template: `
      <div class="container">
          <div class="btn-container">
              <button (click)="handleClick('reset')">Reset</button>
              <button (click)="handleClick('remove')">Remove first item</button>
          </div>
          <div #widget class='widget-box-wide'></div>
      </div>`,
  styleUrls: ['./chart.scss'],
})
export class ChartDataComponent implements OnDestroy {
  @ViewChild('widget', {static: true})
  container: ElementRef;
  chart: ChartDHX;
  wait: Promise<void>;

  data = new DataCollection();

  handleClick = (action) => {
    if (action === 'reset') {
      this.data.removeAll();
      this.data.load('https://dhtmlx.github.io/react-widgets/static/chart.json');
    } else if (action === 'remove') {
      this.data.remove(this.data.getId(0));
    }
  };

  ngOnInit() {
    this.chart = new ChartDHX(this.container.nativeElement, {
      type: 'bar',
      data: this.data,
      scales: {
        bottom: {
          text: 'month',
        },
        left: {
          maxTicks: 10,
          max: 100,
          min: 0,
        },
      },
      series: [
        {
          id: 'A',
          value: 'company C',
          color: '#5E83BA',
          pointType: 'circle',
          fill: '#5E83BA',
          barWidth: 35,
        },
      ],
    });

    this.data.load('https://dhtmlx.github.io/react-widgets/static/chart.json');
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destructor();
    }
  }
}
