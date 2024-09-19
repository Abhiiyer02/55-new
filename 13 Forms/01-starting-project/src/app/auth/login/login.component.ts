import { afterNextRender, Component, DestroyRef, inject, OnInit, viewChild, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, of } from 'rxjs';

function mustHaveQuestionMark(control : AbstractControl) {
  if (control.value.includes("?")){
    return null
  }
  return {doesContainQuestionMark : false}
}
function emailAlreadyExists(control : AbstractControl) {
  if (control.value !== "test1@email.com"){
    return of(null) //returns observable
  }
  return of({doesContainQuestionMark : false})
}
let initEmail = ''
const savedForm = window.localStorage.getItem('saved-login-form'); 
if(savedForm){
    const loadedFormData = JSON.parse(savedForm)
    // this.form.controls.email.setValue(loadedFormData.email)
    initEmail = loadedFormData.email
}    

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports:[ReactiveFormsModule]
})
export class LoginComponent implements OnInit {
  private destroyRef = inject(DestroyRef)
  ngOnInit(): void {
    //this willcause issues because, when the costructor is called, it sets email to  ''
    // const savedForm = window.localStorage.getItem('saved-login-form'); 
    // if(savedForm){
    //   const loadedFormData = JSON.parse(savedForm)
    //   this.form.controls.email.setValue(loadedFormData.email)
    //   //or
    //   // this.form.patchValue({
    //   //   email: loadedFormData.email
    //   // })
    // }
    const subscription = this.form.valueChanges.pipe(debounceTime(500)).subscribe({
      next:(value)=> window.localStorage.setItem('saved-login-form',JSON.stringify({email:value.email}))
    })
    this.destroyRef.onDestroy(()=> subscription.unsubscribe)
  }

  public form = new FormGroup({
    email :  new FormControl(initEmail,
      {
        validators: [Validators.required, Validators.email],
        asyncValidators: [emailAlreadyExists]
      }
    ),
    password : new FormControl('',{
      validators: [Validators.required, Validators.minLength(6), mustHaveQuestionMark],
    })
  })
  
  get emailIsValid(){
    return this.form.controls.email.touched && this.form.controls.email.dirty && this.form.controls.email.invalid
  }
  get passwordIsValid(){
    return this.form.controls.password.touched && this.form.controls.password.dirty && this.form.controls.password.invalid
  }
  onSubmit(){
      console.log(this.form)
      // for reactive FormsModule, you can easily access formControl elelemts
      const email = this.form.value.email
      const password = this.form.value.password
      console.log(email, password)
      this.form.value.email = ''
      this.form.value.password = ''
      
      //to add validators somehwere later in the code, you can use:
      // this.form.addValidators()
    }
}

  

//template driven
// import { afterNextRender, Component, DestroyRef, inject, viewChild, ViewChild } from '@angular/core';
// import { FormsModule, NgForm, Validators } from '@angular/forms';
// import { debounceTime } from 'rxjs';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.css',
//   imports:[FormsModule]
// })
// export class LoginComponent {

//   private form = viewChild.required<NgForm>('form');
//   private destroyRef = inject(DestroyRef)

//   constructor(){
//     afterNextRender(() =>{
//       const savedForm = window.localStorage.getItem('saved-login-form');
//       if(savedForm){
//         const loadedFormData = JSON.parse(savedForm)
//         const savedEmail = loadedFormData.email

//         //without setTimeout, this will fail only in template driven forms as it needs a tick of time to initializet the form
//         setTimeout(() =>{
//           this.form().controls['email'].setValue(savedEmail)
//         },1)
        
        
//         // this.form().setValue(
//         //   {
//         //     email:savedEmail
//         //   }
//         // )
//       }


//       const subscription = this.form().valueChanges?.pipe(debounceTime(500)).subscribe({
//         next : (value) => 
//           window.localStorage.setItem(
//             'saved-login-form',
//              JSON.stringify({email:value.email})
//           )
//       })
//       this.destroyRef.onDestroy(()=>subscription?.unsubscribe)
//     })
//   }


//   onSubmit(formData:NgForm){

//     // Validators.
//     const enteredEmail = formData.form.value.email;
//     const enteredPassword = formData.form.value.password;
//     console.log(enteredEmail+ " "+ enteredPassword)
//   }
// }
