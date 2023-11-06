import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { confirmPasswordValidator } from 'src/app/validators/confirm.password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  isError:boolean=false;
  imageUrl:string = '../../../assets/tp.png'
  private registerSubscription!:Subscription;

constructor(private _router:Router, private _form:FormBuilder, private _authService:AuthService){
  this.registerForm = this._form.group({
    name:this._form.control("",Validators.required),
    phone:this._form.control("",Validators.compose([ Validators.pattern(/^\d{10}$/),Validators.minLength(10),Validators.maxLength(10),Validators.required])),
    email:this._form.control("",Validators.compose([Validators.required,Validators.email])),
    password:this._form.control("",Validators.compose([ Validators.minLength(8),Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'),Validators.required])),
    confirm_password:this._form.control("",Validators.required)
  },{
    validators: [confirmPasswordValidator('password', 'confirm_password')]
  });
}

navigateToLogin(){
  this._router.navigate(['auth'])
}

passwordMatchValidator(group:FormGroup){
  console.log("in pass")
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confirm_password')?.value;
  console.log("pas",password !== confirmPassword );
  if(password !== confirmPassword ){
    return true
  }else{
    return false;
  }
}

  registerSubmit() {
    console.log("Register form",this.registerForm.value)
    if (this.registerForm.valid) {
      if (!this.passwordMatchValidator(this.registerForm)) {
        this.registerSubscription = this._authService.registerUser(this.registerForm.value).subscribe(
          (result: any) => {
            console.log(result);
            if (result === "success") {
              this._router.navigate(['auth']);
            }else{
              this.isError = true;
            }
          })
      }
    }
  }

  ngOnDestroy(): void {
    if(this.registerSubscription){
      this.registerSubscription.unsubscribe();
    }
  }
 
}
