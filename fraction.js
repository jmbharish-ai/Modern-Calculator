import {Fraction} from './Fraction.js';

const maxWhole=999n;
const maxNumberInPlace=999n;
const maxPlaces=5;
const first=document.getElementById("first");
const operation=document.getElementById("operation");
const next=document.getElementById("next");
const answer=document.getElementById("answer");
const nextPlace=document.getElementById("nextPlace");
var firstFraction;
var nextFraction;
var whole;
var place;
var numberInPlace;
var typingOn="first";
var state="start";

function typeDigit(digit){
    if(typingOn=="first"){
        if(state=="start"){
            whole=BigInt(digit);
            first.innerHTML=comma(whole);
            state="whole";
        }else if(state=="whole"){
            if(whole!=0n){
                if(BigInt(String(whole)+digit)<=maxWhole){
                    whole=BigInt(String(whole)+digit);
                    first.innerHTML=comma(whole);
                }
            }
        }else if(state=="next place"){
            if(digit!="0"){
                numberInPlace=BigInt(digit);
                if(place%2==0) // opposite place
                    first.innerHTML=firstFraction+comma(numberInPlace)+"'";
                else // normal place
                    first.innerHTML=firstFraction+comma(numberInPlace);
                state="fraction";
            }
        }else if(state=="fraction"){
            if(BigInt(String(numberInPlace)+digit)<=maxNumberInPlace){
                numberInPlace=BigInt(String(numberInPlace)+digit);
                if(place%2==0) // opposite place
                    first.innerHTML=firstFraction+comma(numberInPlace)+"'";
                else // normal place
                    first.innerHTML=firstFraction+comma(numberInPlace);
            }
        }
    }else if(typingOn=="next"){
        if(state=="start"){
            whole=BigInt(digit);
            next.innerHTML=comma(whole);
            state="whole";
        }else if(state=="whole"){
            if(whole!=0n){
                if(BigInt(String(whole)+digit)<=maxWhole){
                    whole=BigInt(String(whole)+digit);
                    next.innerHTML=comma(whole);
                }
            }
        }else if(state=="next place"){
            if(digit!="0"){
                numberInPlace=BigInt(digit);
                if(place%2==0) // opposite place
                    next.innerHTML=nextFraction+comma(numberInPlace)+"'";
                else // normal place
                    next.innerHTML=nextFraction+comma(numberInPlace);
                state="fraction";
            }
        }else if(state=="fraction"){
            if(BigInt(String(numberInPlace)+digit)<=maxNumberInPlace){
                numberInPlace=BigInt(String(numberInPlace)+digit);
                if(place%2==0) // opposite place
                    next.innerHTML=nextFraction+comma(numberInPlace)+"'";
                else // normal place
                    next.innerHTML=nextFraction+comma(numberInPlace);
            }
        }
    }
}
window.typeDigit=typeDigit;

function goNext(){ // going to the next place
    if(typingOn=="first"){
        if(state=="whole"){
            firstFraction=comma(whole)+"|";
            whole=undefined;
            first.innerHTML=firstFraction;
            state="next place";
            place=0;
        }else if(state=="fraction"){
            if(place+1<maxPlaces){
                if(place%2==0) // opposite place
                    firstFraction+=comma(numberInPlace)+"'.";
                else // normal place
                    firstFraction+=comma(numberInPlace)+".";
                numberInPlace=undefined;
                first.innerHTML=firstFraction;
                state="next place";
                place++;
            }
        }
    }else if(typingOn=="next"){
        if(state=="whole"){
            nextFraction=comma(whole)+"|";
            whole=undefined;
            next.innerHTML=nextFraction;
            state="next place";
            place=0;
        }else if(state=="fraction"){
            if(place+1<maxPlaces){
                if(place%2==0) // opposite place
                    nextFraction+=comma(numberInPlace)+"'.";
                else // normal place
                    nextFraction+=comma(numberInPlace)+".";
                numberInPlace=undefined;
                next.innerHTML=nextFraction;
                state="next place";
                place++;
            }
        }
    }
}
window.goNext=goNext;

function typeOperation(theOperation){
    if(typingOn=="first"&&(state=="whole"||state=="fraction")){
        if(state=="whole"){
            firstFraction=comma(whole);
            whole=undefined;
        }else if(state=="fraction"){
            if(numberInPlace==1n)
                return;
            if(place%2==0) // opposite place
                firstFraction+=comma(numberInPlace)+"'";
            else
                firstFraction+=comma(numberInPlace);
            numberInPlace=undefined;
            place=undefined;
        }
        operation.innerHTML=theOperation;
        typingOn="next"
        state="start";
    }
}
window.typeOperation=typeOperation;

function calculate(){
    if(typingOn=="next"&&(state=="whole"||state=="fraction")){
        if(state=="whole"){
            nextFraction=comma(whole);
            whole=undefined;
        }else if(state=="fraction"){
            if(numberInPlace==1n)
                return;
            if(place%2==0) // opposite place
                nextFraction+=comma(numberInPlace)+"'";
            else // normal place
                nextFraction+=comma(numberInPlace);
            numberInPlace=undefined;
            place=undefined;
        }

        firstFraction=new Fraction(firstFraction);
        nextFraction=new Fraction(nextFraction);
        const theOperation=operation.innerHTML;
        if(theOperation=="+"){
            var theAnswer=firstFraction.addition(nextFraction);
            if(canDisplay(theAnswer))
                answer.innerHTML=theAnswer.display();
            else
                answer.innerHTML="Can't Display";
        }else if(theOperation=="-"){
            if(firstFraction.greaterEqual(nextFraction)){
                var theAnswer=firstFraction.subtraction(nextFraction);
                if(canDisplay(theAnswer))
                    answer.innerHTML=theAnswer.display();
                else
                    answer.innerHTML="Can't Display";
            }else
                answer.innerHTML="Error";
        }else if(theOperation=="×"){
            var theAnswer=firstFraction.multiplication(nextFraction);
            if(canDisplay(theAnswer))
                answer.innerHTML=theAnswer.display();
            else
                answer.innerHTML="Can't Display";
        }else if(theOperation=="÷"){
            if(nextFraction.equals(new Fraction("0")))
                answer.innerHTML="Error";
            else{
                var theAnswer=firstFraction.division(nextFraction);
                if(canDisplay(theAnswer))
                    answer.innerHTML=theAnswer.display();
                else
                    answer.innerHTML="Can't Display";
            }
        }

        function canDisplay(fraction){
            if(!(fraction.whole<=maxWhole))
                return false;
            if(!(fraction.fraction.length<=maxPlaces))
                return false;
            for(var i=0; i<fraction.fraction.length; i++)
                if(!(fraction.fraction[i]<=maxNumberInPlace))
                    return false;
            return true;
        }
    }
}
window.calculate=calculate;

function deleteAll(){
    first.innerHTML="";
    operation.innerHTML="";
    next.innerHTML="";
    answer.innerHTML="";
    firstFraction=undefined;
    nextFraction=undefined;
    whole=undefined;
    place=undefined;
    numberInPlace=undefined;
    typingOn="first";
    state="start";
}
window.deleteAll=deleteAll;

function comma(number){ // inserting commas into a number
    return String(number).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
window.comma=comma;
