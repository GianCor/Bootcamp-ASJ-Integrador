import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import { Stats } from 'src/app/models/statsModel';
import { BridgeService } from 'src/app/services/bridge.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent {

  constructor(private bridgeService: BridgeService){}

  stats: Stats = {
    categories: {
        total: 0,
        deleted: 0,
        active: 0
    },
    orders: {
        total: 0,
        canceled: 0,
        pending: 0,
        completed: 0
    },
    products: {
        total: 0,
        deleted: 0,
        active: 0
    },
    suppliers: {
        total: 0,
        deleted: 0,
        active: 0
    },
    taxes: {
        total: 0,
        deleted: 0,
        active: 0
    },
    fields: {
        total: 0,
        deleted: 0,
        active: 0
    }
};

ngOnInit(): void {
  this.bridgeService.getStats().subscribe(response => {
    this.stats = response;
    this.initDoughnutChart('doughnutChartCategories', this.stats.categories.active, this.stats.categories.deleted);
    this.initDoughnutChartOrders('doughnutChartOrders', this.stats.orders.pending, this.stats.orders.canceled, this.stats.orders.completed,);
    this.initDoughnutChart('doughnutChartProducts', this.stats.products.active, this.stats.products.deleted);
    this.initDoughnutChart('doughnutChartSuppliers', this.stats.suppliers.active, this.stats.suppliers.deleted);
    this.initDoughnutChart('doughnutChartTaxes', this.stats.taxes.active, this.stats.taxes.deleted);
    this.initDoughnutChart('doughnutChartFields', this.stats.fields.active, this.stats.fields.deleted);
  });
}

initDoughnutChart(canvasId: string, active: number, deleted: number): void {
  const ctx = document.getElementById(canvasId) as HTMLCanvasElement;
  const doughnutChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Activos', 'Eliminados'],
      datasets: [{
        label: 'Estadísticas',
        data: [active, deleted],
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 99, 132, 0.2)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true
    }
  });
}

initDoughnutChartOrders(canvasId: string, pending: number, canceled: number, completed: number): void {
  const ctx = document.getElementById(canvasId) as HTMLCanvasElement;
  const doughnutChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Pendientes', 'Canceladas', 'Completadas'],
      datasets: [{
        label: 'Estadísticas de órdenes',
        data: [pending, canceled, completed],
        backgroundColor: [
          'rgba(255, 206, 86, 0.2)', // Amarillo para pendientes
          'rgba(255, 99, 132, 0.2)',  // Rojo para canceladas
          'rgba(54, 162, 235, 0.2)'   // Azul para completadas
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true
    }
  });
}


}
