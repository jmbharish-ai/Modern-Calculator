//Where you are typing
var typingOn="first start";

//Numbers inputted
var first=0n;
var next=0n;

//Typing a digit
function typeDigit(digit){
    if(typingOn=="first start"){
        first=BigInt(digit);
        document.getElementById("first").innerHTML=comma(first);
        typingOn="first";
    }else if(typingOn=="first"){
        if(first!=0n){
            if((first+digit).length<=15){
                first=BigInt(first+digit);
                document.getElementById("first").innerHTML=comma(first);
            }
        }
    }else if(typingOn=="next start"){
        next=BigInt(digit);
        document.getElementById("next").innerHTML=comma(next);
        typingOn="next";
    }else if(typingOn=="next"){
        if(next!=0n){
            if((next+digit).length<=15){
                next=BigInt(next+digit);
                document.getElementById("next").innerHTML=comma(next);
            }
        }
    }
}
//Typing an operation
function typeOperation(operation){
    if(typingOn=="first"){
        document.getElementById("operation").innerHTML=operation;
        typingOn="next start";
    }
}
//Calculating
function calculate(){
    if(typingOn=="next"){
        typingOn="answer";
        if(document.getElementById("operation").innerHTML=="+"){
            if(first+next<=999999999999999n){
                document.getElementById("answer").innerHTML=comma(first+next);
            }else{
                document.getElementById("answer").innerHTML="Above Range";
            }
        }else if(document.getElementById("operation").innerHTML=="-"){
            if(first>=next){
                document.getElementById("answer").innerHTML=comma(first-next);
            }else{
                document.getElementById("answer").innerHTML="Error";
            }
        }else if(document.getElementById("operation").innerHTML=="×"){
            if(first*next<=999999999999999n){
                document.getElementById("answer").innerHTML=comma(first*next);
            }else{
                document.getElementById("answer").innerHTML="Above Range";
            }
        }else if(document.getElementById("operation").innerHTML=="÷"){
            if(next!=0n){
                if(first%next==0n){
                    document.getElementById("answer").innerHTML=comma(first/next);
                }else{
                    document.getElementById("answer").style.fontSize="15px";
                    document.getElementById("answer").innerHTML="Quotient: "+comma(first/next)+"<br>Remainder: "+comma(first%next);
                }
            }else{
                document.getElementById("answer").innerHTML="Error";
            }
        }
    }
}

//Deleting all
function deleteAll(){
    first=0n;
    next=0n;
    document.getElementById("first").innerHTML="";
    document.getElementById("operation").innerHTML="";
    document.getElementById("next").innerHTML="";
    document.getElementById("answer").innerHTML="";
    document.getElementById("answer").style.fontSize="30px";
    typingOn="first start";
}

//Inserting commas in a number
function comma(number){
    var commadNumber="";
    var index=0;
    for(var i=String(number).length-1; i>=0; i--){
        commadNumber=String(number)[i]+commadNumber;
        index++;
        if(index==3){
            if(i!=0){
                commadNumber=","+commadNumber;
            }
            index=0;
        }
    }
    return commadNumber;
}