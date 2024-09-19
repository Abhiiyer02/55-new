import { Component, DestroyRef, inject, OnInit, } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { debounceTime } from 'rxjs';

let initEmail = ''

const savedForm = window.localStorage.getItem('saved-signup-form')
if(savedForm){
  const loadedFormData = JSON.parse(savedForm)
  initEmail = loadedFormData.email

}

function EqualPasswords(control : AbstractControl){
  const password : control.get('password')?.value
  const confirmPassword : control.get('confirmPassword')?.value
}
@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  imports: [ReactiveFormsModule]
})

  

export class SignupComponent implements OnInit {

  private destroyRef = inject(DestroyRef)
  ngOnInit(): void {
    const subscription = this.form.valueChanges.pipe(debounceTime(500)).subscribe({
      next: (value) => window.localStorage.setItem('saved-signup-form',JSON.stringify({email:value.email}))
    })   
    this.destroyRef.onDestroy(()=>{subscription.unsubscribe});
  }
  public form = new FormGroup({
    email : new FormControl(initEmail,{
      validators : [Validators.required,Validators.email]
    }),
    passwords : new FormGroup({
      password : new FormControl('',{
        validators : [Validators.required,Validators.minLength(5)]
      }),
      confirmPassword : new FormControl('',{
        validators : [Validators.required]
      })
    })
    ,
    firstName : new FormControl('',{
      validators : [Validators.required]
    }),
    laststName : new FormControl('',{
      validators : [Validators.required]
    }),
    address: new FormGroup({
      street : new FormControl('',{
        validators : [Validators.required]
      }),
      number : new FormControl('',{
        validators : [Validators.required]
      }),
      postalCode : new FormControl('',{
        validators : [Validators.required]
      }),
      city: new FormControl('',{
        validators : [Validators.required]
      })  
    }),
    role: new FormControl<'student' | 'teacher' | 'employee' | 'founder' | 'other'>('student',{
      validators : [Validators.required]
    }),
    source : new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false)
    ]),
    agree : new FormControl(false,{validators: [Validators.required]})
  });

  onReset(){
    this.form.reset()
  }
  onSubmit(){
    console.log(this.form.value.email , this.form.value.passwords?.password)
    if(this.form.invalid){
      // alert('invalid data, please check your data')
      console.log("INVALID DATA")
    }
    this.form.patchValue({
      email: '',
      passwords :{
        password : ''
      } 
    })
  }
}
