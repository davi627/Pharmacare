import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartConfiguration, ChartType } from 'chart.js';
import { AnalyticsService } from '../analytics.service';
import { TransactionsService } from '../transactions.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  @ViewChild(BaseChartDirective) baseChart: BaseChartDirective | undefined;

  // Transactions
  transactions: any[] = [];

  // Payment Method Chart
  public paymentMethodChartData: ChartConfiguration['data'] = {
    datasets: [],
    labels: []
  };
  public paymentMethodChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      title: { display: true, text: 'Payment Method Comparison' }
    }
  };
  public paymentMethodChartType: ChartType = 'bar';

  // Weekly Sales Chart
  public weeklySalesChartData: ChartConfiguration['data'] = {
    datasets: [],
    labels: []
  };
  public weeklySalesChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      title: { display: true, text: 'Weekly Sales' }
    }
  };
  public weeklySalesChartType: ChartType = 'line';

  // Monthly Sales Chart
  public monthlySalesChartData: ChartConfiguration['data'] = {
    datasets: [],
    labels: []
  };
  public monthlySalesChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      title: { display: true, text: 'Monthly Sales' }
    }
  };
  public monthlySalesChartType: ChartType = 'bar';

  // Yearly Sales Chart
  public yearlySalesChartData: ChartConfiguration['data'] = {
    datasets: [],
    labels: []
  };
  public yearlySalesChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      title: { display: true, text: 'Yearly Sales' }
    }
  };
  public yearlySalesChartType: ChartType = 'line';

  constructor(
    private analyticsService: AnalyticsService,
    private transactionsService: TransactionsService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.fetchTransactions();
    this.loadPaymentMethodAnalytics();
    this.loadSalesAnalytics();
  }

  fetchTransactions() {
    this.transactionsService.getTransactions().subscribe(data => {
      this.transactions = data;
    });
  }

  loadPaymentMethodAnalytics() {
    this.analyticsService.getPaymentMethodAnalytics().subscribe(data => {
      const cashData = data.filter(item => item._id.method === 'cash');
      const mpesaData = data.filter(item => item._id.method === 'mpesa');

      this.paymentMethodChartData = {
        labels: cashData.map(item => `${item._id.month}/${item._id.year}`),
        datasets: [
          {
            label: 'Cash Payments',
            data: cashData.map(item => item.totalAmount),
            backgroundColor: 'rgba(75, 192, 192, 0.6)'
          },
          {
            label: 'M-Pesa Payments',
            data: mpesaData.map(item => item.totalAmount),
            backgroundColor: 'rgba(255, 99, 132, 0.6)'
          }
        ]
      };
      
      // Trigger chart update
      this.baseChart?.update();
    });
  }

  loadSalesAnalytics() {
    this.analyticsService.getSalesAnalytics().subscribe(data => {
      // Weekly Sales
      this.weeklySalesChartData = {
        labels: data.weekly.map(item => `Week ${item._id.week}/${item._id.year}`),
        datasets: [{
          label: 'Weekly Sales',
          data: data.weekly.map(item => item.totalAmount),
          backgroundColor: 'rgba(54, 162, 235, 0.6)'
        }]
      };

      // Monthly Sales
      this.monthlySalesChartData = {
        labels: data.monthly.map(item => `${item._id.month}/${item._id.year}`),
        datasets: [{
          label: 'Monthly Sales',
          data: data.monthly.map(item => item.totalAmount),
          backgroundColor: 'rgba(255, 206, 86, 0.6)'
        }]
      };

      // Yearly Sales
      this.yearlySalesChartData = {
        labels: data.yearly.map(item => `${item._id}`),
        datasets: [{
          label: 'Yearly Sales',
          data: data.yearly.map(item => item.totalAmount),
          backgroundColor: 'rgba(75, 192, 192, 0.6)'
        }]
      };
    });
  }
}
