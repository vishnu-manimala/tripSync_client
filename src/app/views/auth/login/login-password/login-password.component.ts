import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRole } from 'src/app/models/auth.model';
import { AuthService } from 'src/app/services/auth.service';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-login-password',
  templateUrl: './login-password.component.html',
  styleUrls: ['./login-password.component.css']
})
export class LoginPasswordComponent {
  loginData: FormGroup;
  error_message: string = "";
  imageUrl:string = '../../../assets/tp.png'
constructor(private _router:Router,private _loginForm: FormBuilder, private _authService:AuthService, private _jwt:JwtService){

  this.loginData = this._loginForm.group({
    username: this._loginForm.control("", Validators.compose([Validators.required, Validators.email])),
    password: this._loginForm.control("", Validators.compose([Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'), Validators.required]))
  })
}

login() {
  console.log(this.loginData.value);
  if (this.loginData.valid) {

    this._authService.passwordLogin(this.loginData.value).subscribe((response: any) => {
      if (response.status === "Success") {
        console.log(response)
       let role: UserRole = response.data.isAdmin ? UserRole.Admin : UserRole.User;
       this._jwt.setToken(response.token);
       this._jwt.setRole(role);
       this._jwt.setLocal(response.data);
       console.log("success");
       this._router.navigate(['user'])
      }else {
        this.error_message = "something went wrong"
        this._router.navigate(['auth/login.password']);
      }
    })
  } else {
    console.log("not valid form");
    this.error_message = "invalid credentials"
  }
}





navigateToRegister(){
    this._router.navigate(['auth/register']);
  }

}
