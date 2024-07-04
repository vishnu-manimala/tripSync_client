import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatMessage } from 'src/app/models/api.models';
import { UsersResponse } from 'src/app/models/users_response.model';
import { UsersService } from 'src/app/services/users.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  picUrl:string = environment.picUrl;
  username: string | null = "";
  email: String | null = "";
  chatroom: any;
  message: String = "";
  image:string | null="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Favatar&psig=AOvVaw370XiM5wgGVpNEOZ3nQ3pK&ust=1702965487586000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMC2zI2nmIMDFQAAAAAdAAAAABAD";
  userID:string | null="";
  messageArray: ChatMessage[] = [];
  isTyping = false;
  currentUser!:UsersResponse;
  constructor(
    private route: ActivatedRoute,
    private webSocketService: WebsocketService,
    public userService: UsersService,
    private router: Router
  ) {
    this.webSocketService.newMessageReceived().subscribe(data => {
      this.messageArray.push(data);
      this.isTyping = false;
    });
    this.webSocketService.receivedTyping().subscribe((bool: { isTyping: boolean }) => {
      this.isTyping = bool.isTyping;
    });
  }

  ngOnInit(): void {
    this.username = this.route.snapshot.queryParamMap.get('name');
    this.email = this.route.snapshot.queryParamMap.get('email');
    this.image = this.route.snapshot.queryParamMap.get('image');
    this.userID = this.route.snapshot.queryParamMap.get('userId');
    this.currentUser = this.userService.getLoggedInUser();
    if (this.currentUser && this.username && this.currentUser.name < this.username) {
      this.chatroom = this.currentUser.name.concat(this.username);
    } else if (this.username) {
      this.chatroom = this.username.concat(this.currentUser.name);
    }
    if (this.username) {
      this.webSocketService.joinRoom({ user: this.userService.getLoggedInUser().name, room: this.chatroom });
      this.userService.getChatRoomsChat(this.chatroom).subscribe((messages:ChatMessage[]) => {
        this.messageArray = messages;
      });
    }
  }

  sendMessage() {
    this.webSocketService.sendMessage({room: this.chatroom, user: this.userService.getLoggedInUser().name, message: this.message});
    this.message = '';
  }

  typing() {
    this.webSocketService.typing({room: this.chatroom, user: this.userService.getLoggedInUser().name});
  }
  navigator(id:string|null){
    this.router.navigate(['/user/profile'],{ queryParams: { id: id } })
  }
}
