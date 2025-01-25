import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Appointment {
  _id?: string;
  name: string;
  age: number;
  gender: string;
  date: string;
  reason: string;
  email: string;
  status?: string;
  isRescheduled?: boolean;
}

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  appointments: Appointment[] = [];
  newDate: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchAppointments();
  }

  fetchAppointments() {
    this.http.get<Appointment[]>('http://localhost:3000/appointments/appointments').subscribe({
      next: (data) => {
        this.appointments = data;

        // Retrieve saved states from localStorage
        const savedStates = JSON.parse(localStorage.getItem('appointmentsState') || '{}');

        // Apply saved states to the appointments
        this.appointments.forEach((appointment) => {
          if (appointment._id && savedStates[appointment._id]) {
            const savedState = savedStates[appointment._id];
            if (savedState.status) appointment.status = savedState.status;
            if (savedState.isRescheduled !== undefined) appointment.isRescheduled = savedState.isRescheduled;
          }
        });
      },
      error: (error) => {
        console.error('Error fetching appointments', error);
      }
    });
  }

  approveAppointment(appointmentId: string | undefined) {
    if (!appointmentId) return;

    // Update appointment status
    const appointment = this.appointments.find(app => app._id === appointmentId);
    if (appointment) {
      appointment.status = 'approved';
      // Save state to localStorage
      this.saveAppointmentState(appointmentId, { status: 'approved' });
    }
  }

  rescheduleAppointment(appointmentId: string | undefined) {
    if (!appointmentId || !this.newDate) return;

    // Update appointment date and status
    const appointment = this.appointments.find(app => app._id === appointmentId);
    if (appointment) {
      appointment.date = this.newDate;
      appointment.isRescheduled = true;
      // Save state to localStorage
      this.saveAppointmentState(appointmentId, { isRescheduled: true, date: this.newDate });
    }

    this.newDate = ''; 
  }

  isApproved(appointment: Appointment): boolean {
    return appointment.status === 'approved';
  }

  isRescheduled(appointment: Appointment): boolean {
    return appointment.isRescheduled === true;
  }

  isRescheduleButton(appointment: Appointment): boolean {
    return !this.isRescheduled(appointment);
  }

  saveAppointmentState(appointmentId: string, state: any) {
    // Retrieve the current saved states from localStorage
    const savedStates = JSON.parse(localStorage.getItem('appointmentsState') || '{}');
    savedStates[appointmentId] = { ...savedStates[appointmentId], ...state };
    // Save the updated states back to localStorage
    localStorage.setItem('appointmentsState', JSON.stringify(savedStates));
  }

  onDateChange(event: any) {
    this.newDate = event.target.value;
  }
}
