  import { Component } from '@angular/core';
  import { RouterOutlet } from '@angular/router';
  import { Subscription } from 'rxjs';
  import { RateLimiterService } from '../services/rate-limiter-service';
  import { HttpClientModule } from '@angular/common/http';
  import { FormsModule } from '@angular/forms';

  @Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, HttpClientModule, FormsModule],
    providers: [RateLimiterService],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
  })
  export class AppComponent {
    title = 'sms-ratelimiter-client';
    subscriptionCa: Subscription | null = null;
    subscriptionCp: Subscription | null = null;
    intervalCA: any;
    intervalCP: any;

    currentAccountRate: Number = 0;
    phoneNumber: string = '';
    currentPhoneNumberRate: Number = 0;
    fromDate: string = "";
    toDate: string = "";
    PhoneNumberRate: Number = 0;

    constructor(private rService: RateLimiterService) { }

    ngOnInit() {
      this.loadCurrentRateOfAccount();
    }

    loadCurrentRateOfAccount() {
      this.intervalCA = setInterval(() => {
        if (this.subscriptionCa) {
          this.subscriptionCa.unsubscribe();
        }
        this.subscriptionCa = this.rService.getAccountLogsPerTime().subscribe({
          next: (data) => {
            this.currentAccountRate = data;
          },
          error: (err) => console.error('Error fetching logs', err)
        });
      }, 1000);
    }

    loadCurrentRateOfPhone(phone: string): void {
      if (this.subscriptionCp)
        this.subscriptionCp.unsubscribe();

      if (this.intervalCP)
        clearInterval(this.intervalCP);
      if (phone != this.phoneNumber)
      {
        this.fromDate = "";
        this.toDate = "";
        this.PhoneNumberRate = 0;
      }
      if (phone) {
        this.phoneNumber = phone;
        this.intervalCP = setInterval(() => {        
          this.rService.getPhoneLogsPerTime(this.phoneNumber).subscribe({
            next: (data) => {
              this.currentPhoneNumberRate = data;
            },
            error: (err) => console.error('Error fetching logs', err)
          });
        }, 1000);
      }
    }

    loadRateByDate() {    
      if (!this.phoneNumber) {
        alert("Pleae Enter Phone number");
        return;
      }
      if (!this.fromDate) {
        alert("Pleae Enter From");
        return;
      }
      if (!this.toDate) {
        alert("Pleae Enter To");
        return;
      }
      const fromDatelocal = new Date(this.fromDate);
      const toDatelocal = new Date(this.toDate);
      this.rService.GetPhoneLogsByDate(this.phoneNumber, fromDatelocal.toISOString(), toDatelocal.toISOString()).subscribe({
        next: (data) => {
          this.PhoneNumberRate = data;
        },
        error: (err) => console.error('Error fetching logs', err)
      });
    }

    ngOnDestroy() {
      if (this.intervalCA) {
        clearInterval(this.intervalCA);
      }
      if (this.intervalCP) {
        clearInterval(this.intervalCP);
      }
      if (this.subscriptionCa) {
        this.subscriptionCa.unsubscribe();
      }
      if (this.subscriptionCp) {
        this.subscriptionCp.unsubscribe();
      }
    }
  }
