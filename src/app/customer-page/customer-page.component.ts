import { Component } from '@angular/core';

@Component({
  selector: 'app-customer-page',
  templateUrl: './customer-page.component.html',
  styleUrls: ['./customer-page.component.css']
})
export class CustomerPageComponent {
  currentForm: string = 'chats'; // Initially show the chat form
  newMessage: string = '';
  messages: { type: string, text: string }[] = []; // Array to hold chat messages

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({ type: 'sent', text: this.newMessage });
      this.newMessage = ''; // Clear the input field

      // Simulate a received message (this could be dynamic based on backend response)
      setTimeout(() => {
        this.messages.push({ type: 'received', text: 'This is a response from the system.' });
      }, 1000);
    }
  }

  showForm(formName: string) {
    this.currentForm = formName;
  }
}
