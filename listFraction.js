//Where you are typing
var typingOn="first whole start";

//Max number of terms
var maxTerms=100;

//List fractions inputted
var firstWhole=0n;
var firstFraction=[];
var firstTerm=0n;
var nextWhole=0n;
var nextFraction=[];
var nextTerm=0n;

//High or low term (false = low, true = high)
var term=false;

//Text that already exists
var text="";

//Typing a digit
function typeDigit(digit){
    if(typingOn=="first whole start"){
        firstWhole=BigInt(digit);
        document.getElementById("first").innerHTML=comma(firstWhole);
        typingOn="first whole";
        document.getElementById("goNext").style.backgroundColor="rgb(255, 255, 255)";
    }else if(typingOn=="first whole"){
        if(firstWhole!=0n&&BigInt(firstWhole+digit)<=999999999999999n){
            firstWhole=BigInt(firstWhole+digit);
            document.getElementById("first").innerHTML=comma(firstWhole);
        }
    }else if(typingOn=="first start"){
        if(digit!="0"){
            document.getElementById("goNext").style.backgroundColor="rgb(255, 255, 255)";
            document.getElementById("goNext").style.color="rgb(0, 0, 0)";
            document.getElementById("first").style.height=(50+(firstFraction.length+1)*50)+"px";
            text=document.getElementById("first").innerHTML+"<br>";
            firstTerm=BigInt(digit);
            if(term) document.getElementById("first").innerHTML=text+String(firstTerm);
            else document.getElementById("first").innerHTML=text+"<span>"+String(firstTerm)+"</span>";
            typingOn="first fraction";
        }
    }else if(typingOn=="first fraction"){
        if(BigInt(firstTerm+digit)<=999999999999999n){
            firstTerm=BigInt(firstTerm+digit);
            if(term) document.getElementById("first").innerHTML=text+comma(firstTerm);
            else document.getElementById("first").innerHTML=text+"<span>"+comma(firstTerm)+"</span>";
        }
    }else if(typingOn=="next whole start"){
        nextWhole=BigInt(digit);
        document.getElementById("next").innerHTML=comma(nextWhole);
        typingOn="next whole";
        document.getElementById("goNext").style.backgroundColor="rgb(255, 255, 255)";
    }else if(typingOn=="next whole"){
        if(nextWhole!=0n&&BigInt(nextWhole+digit)<=999999999999999n){
            nextWhole=BigInt(nextWhole+digit);
            document.getElementById("next").innerHTML=comma(nextWhole);
        }
    }else if(typingOn=="next start"){
        if(digit!="0"){
            document.getElementById("goNext").style.backgroundColor="rgb(255, 255, 255)";
            document.getElementById("goNext").style.color="rgb(0, 0, 0)";
            document.getElementById("next").style.height=(50+(nextFraction.length+1)*50)+"px";
            text=document.getElementById("next").innerHTML+"<br>";
            nextTerm=BigInt(digit);
            if(term) document.getElementById("next").innerHTML=text+String(nextTerm);
            else document.getElementById("next").innerHTML=text+"<span>"+String(nextTerm)+"</span>";
            typingOn="next fraction";
        }
    }else if(typingOn=="next fraction"){
        if(BigInt(nextTerm+digit)<=999999999999999n){
            nextTerm=BigInt(nextTerm+digit);
            if(term) document.getElementById("next").innerHTML=text+comma(nextTerm);
            else document.getElementById("next").innerHTML=text+"<span>"+comma(nextTerm)+"</span>";
        }
    }
}
function termAfter(){
    if(typingOn=="first whole"){
        if(document.getElementById("goNext").style.backgroundColor=="rgb(255, 255, 255)"){
            document.getElementById("goNext").style.backgroundColor="rgb(0, 0, 0)";
            document.getElementById("goNext").style.color="rgb(255, 255, 255)";
            document.getElementById("first").innerHTML+="|";
            typingOn="first start";
        }
    }else if(typingOn=="first fraction"){
        if(document.getElementById("goNext").style.backgroundColor=="rgb(255, 255, 255)"){
            if(firstFraction.length+1+1<=maxTerms){
                document.getElementById("goNext").style.backgroundColor="rgb(0, 0, 0)";
                document.getElementById("goNext").style.color="rgb(255, 255, 255)";
                firstFraction.push(firstTerm);
                typingOn="first start";
                term=!term;
            }
        }
    }else if(typingOn=="next whole"){
        if(document.getElementById("goNext").style.backgroundColor=="rgb(255, 255, 255)"){
            document.getElementById("goNext").style.backgroundColor="rgb(0, 0, 0)";
            document.getElementById("goNext").style.color="rgb(255, 255, 255)";
            document.getElementById("next").innerHTML+="|";
            typingOn="next start";
        }
    }else if(typingOn=="next fraction"){
        if(document.getElementById("goNext").style.backgroundColor=="rgb(255, 255, 255)"){
            if(nextFraction.length+1+1<=maxTerms){
                document.getElementById("goNext").style.backgroundColor="rgb(0, 0, 0)";
                document.getElementById("goNext").style.color="rgb(255, 255, 255)";
                nextFraction.push(nextTerm);
                typingOn="next start";
                term=!term;
            }
        }
    }
}
//Typing an operation
function typeOperation(operation){
    if(typingOn=="first whole"||typingOn=="first fraction"){
        if(firstTerm!=1n){
            if(typingOn=="first fraction") firstFraction.push(firstTerm);
            document.getElementById("operation").innerHTML=operation;
            typingOn="next whole start";
            term=false;
        }
    }
}
//Calculating
function calculate(){
    if(typingOn=="next whole"||typingOn=="next fraction"){
        if(nextTerm!=1n){
            if(typingOn=="next fraction") nextFraction.push(nextTerm);
            typingOn="answer";
            var whole=-1n;
            if(document.getElementById("operation").innerHTML=="+"){
                var ans=answer(firstWhole, firstFraction, "+", nextWhole, nextFraction);
                display(ans);
            }else if(document.getElementById("operation").innerHTML=="-"){
                if(greaterEqual(firstWhole, firstFraction, nextWhole, nextFraction)){
                    var ans=subtract(firstWhole, firstFraction, nextWhole, nextFraction);
                    display(ans);
                }else document.getElementById("answer").innerHTML="Error";
            }else if(document.getElementById("operation").innerHTML=="×"){
                var ans=answer(firstWhole, firstFraction, "*", nextWhole, nextFraction);
                display(ans);
            }else if(document.getElementById("operation").innerHTML=="÷"){
                if(nextWhole==0n&&nextFraction.length==0) document.getElementById("answer").innerHTML="Error";
                else{
                    var ans=answer(firstWhole, firstFraction, "/", nextWhole, nextFraction);
                    display(ans);
                }
            }
        }
    }
    function answer(firstW, firstF, operation, nextW, nextF){
        var a=0n; var b=0n;
        var c=0n; var d=0n;

        var e=0n; var f=0n;
        var g=0n; var h=0n;
        if(operation=="+"){
            a=firstW+nextW; b=1n;
            c=1n; d=0n;

            e=1n; f=0n;
            g=0n; h=0n;
        }else if(operation=="*"){
            a=firstW*nextW; b=firstW;
            c=nextW; d=1n;

            e=1n; f=0n;
            g=0n; h=0n;
        }else if(operation=="/"){
            a=firstW; b=0n;
            c=1n; d=0n;

            e=nextW; f=1n;
            g=0n; h=0n;
        }
        var fraction=[];
        for(var i=0; i<Math.max(firstF.length, nextF.length); i++){
            if(i<firstF.length){
                var t=firstF[i]; //term
                var A=a*t+c; var B=b*t+d;
                var C=a; var D=b;

                var E=e*t+g; var F=f*t+h;
                var G=e; var H=f;
                a=A; b=B; c=C; d=D; e=E; f=F; g=G; h=H;
                var giveTerm=false;
                if(e==0n||f==0n||g==0n||h==0n) giveTerm=false;
                else{
                    if(b/f==a/e&&c/g==a/e&&d/h==a/e) giveTerm=true;
                    else giveTerm=false;
                }
                while(giveTerm){
                    if(whole==-1n) whole=a/e;
                    else fraction.push(a/e);
                    A=e; B=f;
                    C=g; D=h;

                    E=a%e; F=b%f;
                    G=c%g; H=d%h;
                    a=A; b=B; c=C; d=D; e=E; f=F; g=G; h=H;

                    var giveTerm=false;
                    if(e==0n||f==0n||g==0n||h==0n) giveTerm=false;
                    else{
                        if(b/f==a/e&&c/g==a/e&&d/h==a/e) giveTerm=true;
                        else giveTerm=false;
                    }
                }
            }
            if(i<nextF.length){
                var t=nextF[i]; //term
                var A=a*t+b; var B=a;
                var C=c*t+d; var D=c;

                var E=e*t+f; var F=e;
                var G=g*t+h; var H=g;
                a=A; b=B; c=C; d=D; e=E; f=F; g=G; h=H;
                var giveTerm=false;
                if(e==0n||f==0n||g==0n||h==0n) giveTerm=false;
                else{
                    if(b/f==a/e&&c/g==a/e&&d/h==a/e) giveTerm=true;
                    else giveTerm=false;
                }
                while(giveTerm){
                    if(whole==-1n) whole=a/e;
                    else fraction.push(a/e);
                    A=e; B=f;
                    C=g; D=h;

                    E=a%e; F=b%f;
                    G=c%g; H=d%h;
                    a=A; b=B; c=C; d=D; e=E; f=F; g=G; h=H;

                    var giveTerm=false;
                    if(e==0n||f==0n||g==0n||h==0n) giveTerm=false;
                    else{
                        if(b/f==a/e&&c/g==a/e&&d/h==a/e) giveTerm=true;
                        else giveTerm=false;
                    }
                }
            }
        }
        var rem=0n; //remainder
        do{
            if(whole==-1n) whole=a/e;
            else fraction.push(a/e);
            rem=a%e;
            var A=e;
            var E=rem;
            a=A; e=E;
        }while(rem!=0n);
        return fraction;
    }
    function subtract(firstW, firstF, nextW, nextF){
        var fraction=[];
        if(nextF.length==0){
            whole=firstW-nextW;
            for(var i=0; i<firstF.length; i++) fraction.push(firstF[i]);
            return fraction;
        }
        var wholeEqual = firstW==nextW;
        if(wholeEqual) firstW++;
        var T=nextF[0];
        var a=(firstW-nextW)*T-1n; var b=firstW-nextW;
        var c=T; var d=1n;

        var e=T; var f=1n;
        var g=0n; var h=0n;
        if(0<firstF.length){
            var t=firstF[0]; //term
            var A=a*t+c; var B=b*t+d;
            var C=a; var D=b;

            var E=e*t+g; var F=f*t+h;
            var G=e; var H=f;
            a=A; b=B; c=C; d=D; e=E; f=F; g=G; h=H;
            var giveTerm=false;
            if(e==0n||f==0n||g==0n||h==0n) giveTerm=false;
            else{
                if(b/f==a/e&&c/g==a/e&&d/h==a/e) giveTerm=true;
                else giveTerm=false;
            }
            while(giveTerm){
                if(whole==-1n) whole=a/e;
                else fraction.push(a/e);
                A=e; B=f;
                C=g; D=h;

                E=a%e; F=b%f;
                G=c%g; H=d%h;
                a=A; b=B; c=C; d=D; e=E; f=F; g=G; h=H;

                var giveTerm=false;
                if(e==0n||f==0n||g==0n||h==0n) giveTerm=false;
                else{
                    if(b/f==a/e&&c/g==a/e&&d/h==a/e) giveTerm=true;
                    else giveTerm=false;
                }
            }
        }
        for(var i=1; i<Math.max(firstF.length, nextF.length); i++){
            if(i<firstF.length){
                var t=firstF[i]; //term
                var A=a*t+c; var B=b*t+d;
                var C=a; var D=b;

                var E=e*t+g; var F=f*t+h;
                var G=e; var H=f;
                a=A; b=B; c=C; d=D; e=E; f=F; g=G; h=H;
                var giveTerm=false;
                if(e==0n||f==0n||g==0n||h==0n) giveTerm=false;
                else{
                    if(b/f==a/e&&c/g==a/e&&d/h==a/e) giveTerm=true;
                    else giveTerm=false;
                }
                while(giveTerm){
                    if(whole==-1n) whole=a/e;
                    else fraction.push(a/e);
                    A=e; B=f;
                    C=g; D=h;

                    E=a%e; F=b%f;
                    G=c%g; H=d%h;
                    a=A; b=B; c=C; d=D; e=E; f=F; g=G; h=H;

                    var giveTerm=false;
                    if(e==0n||f==0n||g==0n||h==0n) giveTerm=false;
                    else{
                        if(b/f==a/e&&c/g==a/e&&d/h==a/e) giveTerm=true;
                        else giveTerm=false;
                    }
                }
            }
            if(i<nextF.length){
                var t=nextF[i]; //term
                var A=a*t+b; var B=a;
                var C=c*t+d; var D=c;

                var E=e*t+f; var F=e;
                var G=g*t+h; var H=g;
                a=A; b=B; c=C; d=D; e=E; f=F; g=G; h=H;
                var giveTerm=false;
                if(e==0n||f==0n||g==0n||h==0n) giveTerm=false;
                else{
                    if(b/f==a/e&&c/g==a/e&&d/h==a/e) giveTerm=true;
                    else giveTerm=false;
                }
                while(giveTerm){
                    if(whole==-1n) whole=a/e;
                    else fraction.push(a/e);
                    A=e; B=f;
                    C=g; D=h;

                    E=a%e; F=b%f;
                    G=c%g; H=d%h;
                    a=A; b=B; c=C; d=D; e=E; f=F; g=G; h=H;

                    var giveTerm=false;
                    if(e==0n||f==0n||g==0n||h==0n) giveTerm=false;
                    else{
                        if(b/f==a/e&&c/g==a/e&&d/h==a/e) giveTerm=true;
                        else giveTerm=false;
                    }
                }
            }
        }
        var rem=0n; //remainder
        do{
            if(whole==-1n) whole=a/e;
            else fraction.push(a/e);
            rem=a%e;
            var A=e;
            var E=rem;
            a=A; e=E;
        }while(rem!=0n);
        if(wholeEqual) whole--;
        return fraction;
    }
    function greaterEqual(firstW, firstF, nextW, nextF){
        if(firstW>nextW) return true;
        else if(firstW<nextW) return false;
        else if(firstW==nextW){
            var i;
            for(i=0; i<Math.min(firstF.length, nextF.length); i++){
                if(i%2==0){ //low
                    if(firstF[i]>nextF[i]) return false;
                    else if(firstF[i]<nextF[i]) return true;
                }else{ //high
                    if(firstF[i]>nextF[i]) return true;
                    else if(firstF[i]<nextF[i]) return false;
                }
            }
            if(firstF.length==nextF.length) return true;
            if(i%2==0){ //low
                if(firstF.length>nextF.length) return true;
                else if(firstF.length<nextF.length) return false;
            }else{ //high
                if(firstF.length>nextF.length) return false;
                else if(firstF.length<nextF.length) return true;
            }
        }
    }
    function check(W, F){
        if(W>999999999999999) return false;
        if(F.length>maxTerms) return false;
        var inRange=true;
        for(var i=0; i<F.length; i++){
            if(F[i]>999999999999999) inRange=false;
        }
        return inRange;
    }
    function display(F){
        if(check(whole, F)){
            document.getElementById("answer").style.height=(50+F.length*50)+"px";
            document.getElementById("answer").innerHTML=comma(whole);
            if(F.length!=0) document.getElementById("answer").innerHTML+="|";
            for(var i=0; i<F.length; i++){
                document.getElementById("answer").innerHTML+="<br>";
                if(i%2==0) document.getElementById("answer").innerHTML+="<span>"+comma(F[i])+"</span>";
                else document.getElementById("answer").innerHTML+=comma(F[i]);
            }
        }else document.getElementById("answer").innerHTML="Not Within Range";
    }
}

//Deleting all
function deleteAll(){
    firstWhole=0n;
    firstFraction=[];
    firstTerm=0n;
    nextWhole=0n;
    nextFraction=[];
    nextTerm=0n;
    document.getElementById("first").style.height="50px";
    document.getElementById("next").style.height="50px";
    document.getElementById("answer").style.height="50px";
    document.getElementById("first").innerHTML="";
    document.getElementById("operation").innerHTML="";
    document.getElementById("next").innerHTML="";
    document.getElementById("answer").innerHTML="";
    document.getElementById("goNext").style.backgroundColor="rgb(255, 255, 255)";
    document.getElementById("goNext").style.color="rgb(0, 0, 0)";
    typingOn="first whole start";
    term=false;
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