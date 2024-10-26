import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuotesApiService {

  private quotes = [
    "What is new in the world? Nothing. What is old in the world? Nothing.",
    "Change will not come if we wait for some other person or some other time",
    "Nearly all men can stand adversity, but if you want to test a man’s character, give him power",
    "Education is the most powerful weapon which you can use to change the world.",
    "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
    "Be who you are and say what you feel, because those who mind don't matter, and those who matter don't mind.",
    "You've gotta dance like there's nobody watching, Love like you'll never be hurt.",
    "Always forgive your enemies; nothing annoys them so much",
    "We accept the love we think we deserve",
    "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
    "It is better to be hated for what you are than to be loved for what you are not.",
    "In the end, we will remember not the words of our enemies, but the silence of our friends.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "Life is what happens when you're busy making other plans.",
    "The best way to predict the future is to create it.",
    "It does not matter how slowly you go as long as you do not stop.",
    "Act as if what you do makes a difference. It does."
  ]


  public getQuote(): string {
    const randomIndex = Math.floor(Math.random() * this.quotes.length);
    return this.quotes[randomIndex];
  }
}