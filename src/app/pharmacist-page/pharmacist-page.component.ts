import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pharmacist-page',
  templateUrl: './pharmacist-page.component.html',
  styleUrls: ['./pharmacist-page.component.css']
})
export class PharmacistPageComponent {
  notifications=0;
  constructor(
    private router:Router,
    private http: HttpClient
    
  ){}

  navigateToProduct(){
    this.router.navigateByUrl('/products');
  }
  navigateToAppointments(){
    this.router.navigateByUrl('/appointments');
  }
  navigateToPrescriptions(){
    this.router.navigateByUrl('/prescriptions');
  }
  navigateToReports(){
    this.router.navigateByUrl('/reports');
  }

  approveAppointment(appointmentId: string | undefined) {
    if (!appointmentId) return;
  
    this.http.post('http://localhost:3000/appointments/approve', { id: appointmentId, status: 'approved' })
      .subscribe({
        next: () => {
          console.log(`Appointment ${appointmentId} approved successfully`);
         
        },
        error: (error) => {
          console.error(`Error approving appointment ${appointmentId}`, error);
        }
      });
  }
  
  rescheduleAppointment(appointmentId: string | undefined) {
    if (!appointmentId) return;
  
    const newDate = prompt('Enter the new date for the appointment (YYYY-MM-DD):');
    if (!newDate) {
      console.warn('Rescheduling canceled or invalid date entered.');
      return;
    }
  
    this.http.post('http://localhost:3000/appointments/reschedule', { id: appointmentId, newDate })
      .subscribe({
        next: () => {
          console.log(`Appointment ${appointmentId} rescheduled to ${newDate}`);
          
        },
        error: (error) => {
          console.error(`Error rescheduling appointment ${appointmentId}`, error);
        }
      });
  }
  
  

}
