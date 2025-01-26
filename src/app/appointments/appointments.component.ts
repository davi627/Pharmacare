import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchAppointments();
  }

  fetchAppointments() {
    this.http.get<Appointment[]>('http://localhost:3000/appointments/appointments')
      .pipe(
        catchError(error => {
          this.errorMessage = 'Failed to fetch appointments';
          return throwError(() => error);
        })
      )
      .subscribe({
        next: (data) => {
          this.appointments = data.map(appointment => {
            // Retrieve saved states from localStorage
            const savedStates = JSON.parse(localStorage.getItem('appointmentsState') || '{}');
            
            if (appointment._id && savedStates[appointment._id]) {
              const savedState = savedStates[appointment._id];
              if (savedState.status) appointment.status = savedState.status;
              if (savedState.isRescheduled !== undefined) 
                appointment.isRescheduled = savedState.isRescheduled;
            }
            
            return appointment;
          });
        },
        error: (error) => {
          console.error('Error fetching appointments', error);
        }
      });
  }

  approveAppointment(appointmentId: string | undefined) {
    if (!appointmentId) return;

    this.http.post('http://localhost:3000/appointments/approve', { 
      id: appointmentId, 
      status: 'approved' 
    })
    .pipe(
      catchError(error => {
        this.errorMessage = 'Failed to approve appointment';
        return throwError(() => error);
      })
    )
    .subscribe({
      next: (updatedAppointment: any) => {
        const appointment = this.appointments.find(app => app._id === appointmentId);
        if (appointment) {
          appointment.status = 'approved';
          this.saveAppointmentState(appointmentId, { status: 'approved' });
        }
      },
      error: (error) => {
        console.error('Error approving appointment', error);
      }
    });
  }

  rescheduleAppointment(appointmentId: string | undefined) {
    if (!appointmentId || !this.newDate) return;

    this.http.post('http://localhost:3000/appointments/reschedule', { 
      id: appointmentId, 
      newDate: this.newDate 
    })
    .pipe(
      catchError(error => {
        this.errorMessage = 'Failed to reschedule appointment';
        return throwError(() => error);
      })
    )
    .subscribe({
      next: (updatedAppointment: any) => {
        const appointment = this.appointments.find(app => app._id === appointmentId);
        if (appointment) {
          appointment.date = this.newDate;
          appointment.isRescheduled = true;
          this.saveAppointmentState(appointmentId, { 
            isRescheduled: true, 
            date: this.newDate 
          });
        }
        this.newDate = ''; 
      },
      error: (error) => {
        console.error('Error rescheduling appointment', error);
      }
    });
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
    const savedStates = JSON.parse(localStorage.getItem('appointmentsState') || '{}');
    savedStates[appointmentId] = { ...savedStates[appointmentId], ...state };
    localStorage.setItem('appointmentsState', JSON.stringify(savedStates));
  }

  onDateChange(event: any) {
    this.newDate = event.target.value;
  }
}