import {computed, effect, Injectable, signal} from '@angular/core';
import {Widget} from '../model/Widget';
import {SubscribersComponent} from '../pages/dashboard/widgets/subscribers.component';
import {ViewsComponent} from '../pages/dashboard/widgets/views.component';
import {WatchTimeComponent} from '../pages/dashboard/widgets/watch-time.component';
import {RevenueComponent} from '../pages/dashboard/widgets/revenue.component';
import {AnalitycsComponent} from '../pages/dashboard/widgets/analitycs.component';

@Injectable()
export class DashboardService {

  widgets = signal<Widget[]>([
    {
      id: 1,
      label: 'Subscribers',
      content: SubscribersComponent,
      rows: 1,
      columns: 1,
      backgroundColor: '#003ffc',
      color: 'whitesmoke'
    },
    {
      id: 2,
      label: 'Views',
      content: ViewsComponent,
      backgroundColor: '#003ffc',
      color: 'whitesmoke'
    },
    {
      id: 3,
      label: 'Watch time',
      content: WatchTimeComponent,
      backgroundColor: '#003ffc',
      color: 'whitesmoke'
    },
    {
      id: 4,
      label: 'Revenue',
      content: RevenueComponent,
      backgroundColor: '#003ffc',
      color: 'whitesmoke'
    },
    {
      id: 5,
      label: 'Channel Analytics',
      content: AnalitycsComponent,
      rows: 2,
      columns: 2,
    }
  ]);


  addedWidgets = signal<Widget[]>([]);

  widgetsToAdd = computed(() => {
    const addedIds = this.addedWidgets().map((widget) => widget.id);
    return this.widgets().filter(w => !addedIds.includes(w.id));
  });

  fetchWidgets(): void {
    const widgetsAsString = localStorage.getItem('dashboardWidgets');
    if (widgetsAsString) {
      const widgets = JSON.parse(widgetsAsString) as Widget[];
      widgets.forEach((widget) => {
        const content = this.widgets().find(w => w.id === widget.id)?.content;
        if (content) {
          widget.content = content;
        }
      })
      this.addedWidgets.set(widgets);
    }
  }

  addWidget(w: Widget) {
    this.addedWidgets.set([...this.addedWidgets(), {...w}])
  }

  updateWidget(id: number, widget: Partial<Widget>) {
    const index = this.addedWidgets().findIndex(w => w.id === id);
    if (index >= 0) {
      const newWidgets = [...this.addedWidgets()];
      newWidgets[index] = {...newWidgets[index], ...widget};
      this.addedWidgets.set(newWidgets)
    }
  }

  moveWidgetToRight(id: number) {
    const index = this.addedWidgets().findIndex(w => w.id === id);
    if (index === this.addedWidgets().length - 1) {
      return;
    }
    const newWidgets = [...this.addedWidgets()];
    [newWidgets[index], newWidgets[index + 1]] = [{...newWidgets[index + 1]}, {...newWidgets[index]}];

    this.addedWidgets.set(newWidgets)
  }

  moveWidgetToLeft(id: number) {
    const index = this.addedWidgets().findIndex(w => w.id === id);
    if (index === 0) {
      return;
    }
    const newWidgets = [...this.addedWidgets()];
    [newWidgets[index], newWidgets[index - 1]] = [{...newWidgets[index - 1]}, {...newWidgets[index]}];

    this.addedWidgets.set(newWidgets)
  }

  removeWidget(id: number) {
    this.addedWidgets.set(this.addedWidgets().filter(w => w.id !== id));
  }

  saveWidget = effect(()=> {
    const widgetWithOutContent:Partial<Widget>[] = this.addedWidgets().map((widget) => ({...widget}));
    widgetWithOutContent.forEach((widget) => { delete widget.content})
    localStorage.setItem('dashboardWidgets', JSON.stringify(widgetWithOutContent));
  })

  constructor() {
    this.fetchWidgets();
  }
}
