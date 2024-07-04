import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { io } from 'socket.io-client';
import { ChatMessage } from '../models/api.models';
import { environment } from 'src/environments/environments';
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  baseUrl = environment.baseUrl;
  private socket = io(this.baseUrl)

  constructor() { }
  joinRoom(data: { user: any; room: any; }) {
    console.log("room",data);
    this.socket.emit('join', data);
  }

  sendMessage(data: any) {
    this.socket.emit('message', data);
  }
  
  newMessageReceived(){
    const observable = new Observable<ChatMessage>(observer => {
      this.socket.on('new message', (data:ChatMessage) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  typing(data: any) {
    this.socket.emit('typing', data);
  }
  
  receivedTyping() {
    const observable = new Observable<{ isTyping: boolean}>(observer => {
      this.socket.on('typing', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
}
