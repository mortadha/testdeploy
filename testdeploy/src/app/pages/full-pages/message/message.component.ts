import { Component, ViewChild, ElementRef, OnInit, ChangeDetectionStrategy } from '@angular/core';
import{UserService} from "../../../shared/services/user.service";


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  ChatArray :Array<string>=[];
  mesMessages:Array<string>=[];
  constructor(private userService :UserService) {}
  @ViewChild('messageInput') messageInputRef: ElementRef;

  ngOnInit() {
    this.userService.getMessage().subscribe(
      result =>{
        this.ChatArray.push(result.result[0].message);
      }
    )
  }

  //send button function calls
  onAddMessage() {
    if (this.messageInputRef.nativeElement.value != "") {
      let data ;
      data ={}
      data.idfflok = "5b2bccc1059064793096c47e";
      data.message= this.messageInputRef.nativeElement.value;
      
      this.userService.sendMessage(data).subscribe(
        result =>{
          console.log(result);
        }
      )
      this.mesMessages.push(this.messageInputRef.nativeElement.value);
    }
    this.messageInputRef.nativeElement.value = "";
    this.messageInputRef.nativeElement.focus();
  }
}
