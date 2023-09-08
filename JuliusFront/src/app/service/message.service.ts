import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = 'http://localhost:3000'; // Replace with your back-end API URL

  constructor(private http: HttpClient) { }

  sendMessage(recipient: string, subject: string, message: string): Observable<any> {
    const body = {
      recipient: recipient,
      subject: subject,
      message: message
    };

    // Send the message to the back-end API
    return this.http.post<any>(`${this.apiUrl}/messages/send-email`, body);
  }
}
