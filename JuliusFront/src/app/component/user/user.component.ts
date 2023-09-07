import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  constructor(private userService: UserService) { }

     createUser() {
       const user: User = {
         username: 'julius',
         email: 'julius@htoamil.fr',
         password: 'vebeyu55',
       };

       this.userService.createUser(user).subscribe(response => {
         console.log(response);
       });
     }

}
