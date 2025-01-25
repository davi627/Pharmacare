import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Prescription {
  _id?: string;
  patientsName: string;
  doctorName: string;
  date: string;
  notes: string;
  image?: string;
}

@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.component.html',
  styleUrls: ['./prescriptions.component.css']
})
export class PrescriptionsComponent implements OnInit {
  prescriptions: Prescription[] = [];
  selectedPrescription: Prescription | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchPrescriptions();
  }

  fetchPrescriptions() {
    this.http.get<Prescription[]>('http://localhost:3000/prescriptions/prescriptions').subscribe({
      next: (data) => {
        this.prescriptions = data;
        // Log image paths for debugging
        console.log('Prescriptions:', this.prescriptions.map(p => p.image));
      },
      error: (error) => {
        console.error('Error fetching prescriptions', error);
      }
    });
  }

  openPrescriptionDetails(prescription: Prescription) {
    this.selectedPrescription = prescription;
  }

  closePrescriptionDetails() {
    this.selectedPrescription = null;
  }
}