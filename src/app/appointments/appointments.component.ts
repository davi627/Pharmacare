import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Appointment {
  _id?: string;
  name: string;
  age: number;
  gender: string;
  date: string;
  reason: string;
}

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  appointments: Appointment[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchAppointments();
  }

  fetchAppointments() {
    this.http.get<Appointment[]>('http://localhost:3000/appointments/appointments').subscribe({
      next: (data) => {
        this.appointments = data;
      },
      error: (error) => {
        console.error('Error fetching appointments', error);
      }
    });
  }

  approveAppointment(appointmentId: string | undefined) {
    // Implement approve logic here
    console.log('Approving appointment:', appointmentId);
  }
  rescheduleAppointment(appointmentId: string | undefined) {
    // Implement reschedule logic here
    console.log('Rescheduling appointment:', appointmentId);
  }
}