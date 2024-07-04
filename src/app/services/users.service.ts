import { Injectable } from '@angular/core';
import { UserData } from '../models/auth.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { UserResponseData, UsersResponse } from '../models/users_response.model';
import { Observable } from 'rxjs';
import { ChatMessage } from '../models/api.models';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrl:string = environment.baseUrl;
  constructor(private _http:HttpClient) { }

    getChatRoomsChat(chatroom:any):Observable<ChatMessage[]>{
      return this._http.get<ChatMessage[]>(`${this.baseUrl}/auth/chatroom?room=${chatroom}`);
    }
 
    getLoggedInUser(){
      let userdata!:UsersResponse;
      const data:any =  localStorage.getItem('state');
      userdata = JSON.parse(data);
      return userdata;
    } 
}
