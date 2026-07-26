export class Fraction{
    constructor(fraction){
        if(fraction.includes("|")){
            this.whole=removeComma(fraction.split("|")[0]);
            const fractionPart=fraction.split("|")[1].split(".");
            this.fraction=[];
            for(var i=0; i<fractionPart.length; i++){
                var theNumber=fractionPart[i];
                if(i%2==0) // opposite place
                    theNumber=theNumber.replaceAll("'", "");
                this.fraction.push(removeComma(theNumber));
            }
        }else{
            this.whole=removeComma(fraction);
            this.fraction=[];
        }
        function removeComma(number){ // removing commas from a number
            return BigInt(number.replaceAll(",", ""));
        }
    }

    display(){
        if(this.fraction.length==0)
            return comma(this.whole);
        else{
            var string=comma(this.whole)+"|";
            for(var i=0; i<this.fraction.length; i++){
                if(i!=0)
                    string+=".";
                string+=comma(this.fraction[i]);
                if(i%2==0) // opposite place
                    string+="'";
            }
            return string;
        }
        function comma(number){ // inserting commas into a number
            return String(number).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
    }

    compare(next){
        if(this.whole>next.whole)
            return ">";
        else if(this.whole<next.whole)
            return "<";
        else if(this.whole==next.whole){
            for(var i=0; i<Math.min(this.fraction.length, next.fraction.length); i++){
                if(i%2==0){ // opposite place
                    if(this.fraction[i]>next.fraction[i])
                        return "<";
                    else if(this.fraction[i]<next.fraction[i])
                        return ">";
                }else{ // normal place
                    if(this.fraction[i]>next.fraction[i])
                        return ">";
                    else if(this.fraction[i]<next.fraction[i])
                        return "<";
                }
            }
            if(this.fraction.length==next.fraction.length)
                return "=";
            else{
                if(this.fraction.length>next.fraction.length){ // first fraction has an extra place
                    var place=next.fraction.length;
                    if(place%2==0) // opposite place
                        return ">";
                    else // normal place
                        return "<";
                }else if(next.fraction.length>this.fraction.length){ // next fraction has an extra place
                    var place=this.fraction.length;
                    if(place%2==0) // opposite place
                        return "<";
                    else // normal place
                        return ">";
                }
            }
        }
    }
    equals(next){return this.compare(next)=="=";}
    greater(next){return this.compare(next)==">";}
    less(next){return this.compare(next)=="<";}
    greaterEqual(next){return this.compare(next)==">"||this.compare(next)=="=";}
    lessEqual(next){return this.compare(next)=="<"||this.compare(next)=="=";}

    calculate(operation, next){
        var firstUp=0n;
        var firstDown=1n;
        for(var i=this.fraction.length-1; i>=0; i--){
            firstUp=firstDown*this.fraction[i]+firstUp;

            var up=firstDown;
            var down=firstUp;
            firstUp=up;
            firstDown=down;
        }
        firstUp=firstDown*this.whole+firstUp;

        var nextUp=0n;
        var nextDown=1n;
        for(var i=next.fraction.length-1; i>=0; i--){
            nextUp=nextDown*next.fraction[i]+nextUp;

            var up=nextDown;
            var down=nextUp;
            nextUp=up;
            nextDown=down;
        }
        nextUp=nextDown*next.whole+nextUp;

        var answerUp;
        var answerDown;
        if(operation=="+"){
            answerUp=firstUp*nextDown+nextUp*firstDown;
            answerDown=firstDown*nextDown;
        }else if(operation=="-"){
            answerUp=firstUp*nextDown-nextUp*firstDown;
            answerDown=firstDown*nextDown;
        }else if(operation=="×"){
            answerUp=firstUp*nextUp;
            answerDown=firstDown*nextDown;
        }else if(operation=="÷"){
            answerUp=firstUp*nextDown;
            answerDown=firstDown*nextUp;
        }

        const whole=answerUp/answerDown;
        answerUp=answerUp%answerDown;
        var fractionPart=[];
        while(answerUp!=0n){
            var up=answerDown;
            var down=answerUp;
            answerUp=up;
            answerDown=down;

            fractionPart.push(answerUp/answerDown);
            answerUp=answerUp%answerDown;
        }

        var fraction=new Fraction(String(whole));
        fraction.fraction=fractionPart;
        return fraction;
    }
    addition(next){return this.calculate("+", next)}
    subtraction(next){return this.calculate("-", next)}
    multiplication(next){return this.calculate("×", next)}
    division(next){return this.calculate("÷", next)}
}
