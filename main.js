const max=999999999999999n;
const first=document.getElementById("first");
const operation=document.getElementById("operation");
const next=document.getElementById("next");
const answer=document.getElementById("answer");
var firstNumber;
var nextNumber;
var typingOn="first";
var state="start";

function typeDigit(digit){
    if(typingOn=="first"){
        if(state=="start"){
            firstNumber=BigInt(digit);
            first.innerHTML=comma(firstNumber);
            state="continue";
        }else if(state=="continue"){
            if(firstNumber!=0n){
                if(BigInt(String(firstNumber)+digit)<=max){
                    firstNumber=BigInt(String(firstNumber)+digit);
                    first.innerHTML=comma(firstNumber);
                }
            }
        }
    }else if(typingOn=="next"){
        if(state=="start"){
            nextNumber=BigInt(digit);
            next.innerHTML=comma(nextNumber);
            state="continue";
        }else if(state=="continue"){
            if(nextNumber!=0n){
                if(BigInt(String(nextNumber)+digit)<=max){
                    nextNumber=BigInt(String(nextNumber)+digit);
                    next.innerHTML=comma(nextNumber);
                }
            }
        }
    }
}

function typeOperation(theOperation){
    if(typingOn=="first"&&state=="continue"){
        operation.innerHTML=theOperation;
        typingOn="next";
        state="start";
    }
}

function calculate(){
    if(typingOn=="next"&&state=="continue"){
        typingOn="";
        state="";

        const theOperation=operation.innerHTML;
        if(theOperation=="+"){
            if(firstNumber+nextNumber<=max)
                answer.innerHTML=comma(firstNumber+nextNumber);
            else
                answer.innerHTML="Can't Display";
        }else if(theOperation=="-"){
            if(firstNumber>=nextNumber)
                answer.innerHTML=comma(firstNumber-nextNumber);
            else
                answer.innerHTML="Error";
        }else if(theOperation=="×"){
            if(firstNumber*nextNumber<max)
                answer.innerHTML=comma(firstNumber*nextNumber);
            else
                answer.innerHTML="Can't Display";
        }else if(theOperation=="÷"){
            if(nextNumber==0n)
                answer.innerHTML="Error";
            else{
                if(firstNumber%nextNumber==0n)
                    answer.innerHTML=comma(firstNumber/nextNumber);
                else{
                    answer.style.fontSize="15px";
                    answer.style.lineHeight="25px";
                    answer.innerHTML=
                    "Quotient: "+comma(firstNumber/nextNumber)+"<br>"+
                    "Remainder: "+comma(firstNumber%nextNumber);
                }
            }
        }
    }
}

function deleteAll(){
    first.innerHTML="";
    operation.innerHTML="";
    next.innerHTML="";
    answer.innerHTML="";
    answer.style.fontSize="30px";
    answer.style.lineHeight="50px";
    firstNumber=undefined;
    nextNumber=undefined;
    typingOn="first";
    state="start";
}

function comma(number){ // inserting commas into a number
    return String(number).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}