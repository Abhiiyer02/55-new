import { Investment } from './../models/investment';
import { Component, Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-form',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './input-form.component.html',
  styleUrl: './input-form.component.css'
})
export class InputFormComponent {

  @Output() invest = new EventEmitter<Investment>();
  investment!: Investment ;
  // investment.initialInvestment = 0
  investmentForm! : FormGroup;
  constructor(private formBuilder :FormBuilder){
    this.investmentForm = this.formBuilder.group({
      initialInvestment : [11,[Validators.required,Validators.min(1)]],
      annualInvestment : [12,[Validators.required,Validators.min(1)]],
      expectedReturn: [110,[Validators.required,Validators.min(1)]],
      duration:[20,[Validators.required,Validators.min(1)]]
    })
  }
  onSubmit(){
    if (this.investmentForm.valid){
      this.investment = this.investmentForm.value
      this.invest.emit(this.investment)
      alert(JSON.stringify(this.investment))
    }else{
      alert("Invalid input")
    }
  }
} 
