import { Component } from '@angular/core';
import { MessageService } from 'src/app/service/message.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  recipient!: string;
  subject!: string;
  message!: string;

  constructor(private messageService: MessageService) { }

  sendMessage() {
    this.messageService.sendMessage(this.recipient, this.subject, this.message)
      .subscribe(
        response => {
          console.log('Message sent successfully');
          // Handle success
        },
        error => {
          console.error('Error sending message:', error);
          // Handle error
        }
      );
  }
}
