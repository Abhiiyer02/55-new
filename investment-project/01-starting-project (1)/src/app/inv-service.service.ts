import { AnnualData } from './models/annualData';
import { Investment } from './models/investment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InvServiceService {

  constructor() { 
    let storedInvestments = localStorage.getItem('investments') ;
    this.investments = storedInvestments?JSON.parse(storedInvestments) :[]
  }
  investments : Investment[] = []
  getInvestments(){
    return this.investments
  }
  
  addInvestment(investment:Investment){
    this.investments.unshift(investment)
  }
  calculateInvestmentResults(investment:Investment) {
    const annualData : AnnualData[]= [];
    let investmentValue = investment.initialInvestment;
  
    for (let i = 0; i < investment.duration; i++) {
      const year = i + 1;
      const interestEarnedInYear = investmentValue * (investment.expectedReturn / 100);
      investmentValue += interestEarnedInYear + investment.annualInvestment;
      const totalInterest =
        investmentValue - investment.annualInvestment * year - investment.initialInvestment;
      annualData.push({
        year: year,
        interest: interestEarnedInYear,
        valueEndOfYear: investmentValue,
        annualInvestment: investment.annualInvestment,
        totalInterest: totalInterest,
        totalAmountInvested: investment.initialInvestment + investment.annualInvestment * year,
      });
    }
  
    return annualData;
  }
}
