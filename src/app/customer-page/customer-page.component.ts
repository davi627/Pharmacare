import { Component } from '@angular/core';
import { AppointmentsService } from '../appointments.service';
import { PrescriptionsService } from '../prescriptions.service';

@Component({
  selector: 'app-customer-page',
  templateUrl: './customer-page.component.html',
  styleUrls: ['./customer-page.component.css']
})
export class CustomerPageComponent {
  currentForm: string = 'booking';
  newMessage: string = '';
  messages: { type: string, text: string }[] = [];
  selectedFile: File | null = null; 

  appointment = {
    name: '',
    age: null,
    gender: '',
    date: '',
    reason: '',
  };

  prescription = {
    patientsName: '',
    doctorName: '',
    age:'',
    date: '',
    image: '', 
    notes: '',
  };

  constructor(
    private appointmentsService: AppointmentsService,
    private prescriptionsService: PrescriptionsService
  ) {}

  submitForm(): void {
    this.appointmentsService.createAppointment(this.appointment).subscribe({
      next: (response) => {
        console.log('Appointment created:', response);
        alert('Appointment created successfully!');
        this.resetForm();
      },
      error: (error) => {
        console.error('Error creating appointment:', error);
        alert('Failed to create appointment. Please try again.');
      },
    });
  }

  resetForm(): void {
    this.appointment = {
      name: '',
      age: null,
      gender: '',
      date: '',
      reason: '',
    };
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0]; // Here i am capturing the selected file
      console.log('File selected:', this.selectedFile);
    }
  }

  submitPrescription(): void {
    if (!this.selectedFile) {
      alert('Please select a file before submitting.');
      return;
    }

    const formData = new FormData();

    // Append the prescription details
    formData.append('patientsName', this.prescription.patientsName);
    formData.append('doctorName', this.prescription.doctorName);
    formData.append('age',this.prescription.age);
    formData.append('date', this.prescription.date);
    formData.append('notes', this.prescription.notes);

    // Append the file
    formData.append('image', this.selectedFile, this.selectedFile.name);

    // Calling the service with FormData
    this.prescriptionsService.addPrescription(formData).subscribe({
      next: (response) => {
        console.log('Prescription created:', response);
        alert('Prescription created successfully!');
        this.resetPrescriptionForm();
      },
      error: (error) => {
        console.error('Error creating prescription:', error);
        alert('Failed to create prescription. Please try again.');
      },
    });
  }

  resetPrescriptionForm(): void {
    this.prescription = {
      patientsName: '',
      doctorName: '',
      age: '',
      date: '',
      image: '',
      notes: '',
    };
    this.selectedFile = null; 
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.messages.push({ type: 'sent', text: this.newMessage });
      this.newMessage = '';

      setTimeout(() => {
        this.messages.push({
          type: 'received',
          text: 'This is a response from the system.',
        });
      }, 1000);
    }
  }

  showForm(formName: string): void {
    this.currentForm = formName;
  }
}
