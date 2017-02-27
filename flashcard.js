// dependency for inquirer npm package
var inquirer = require("inquirer");
// NPM Package for reading and writing files
var fs = require("fs");

var questionBankArray = [];
var randomNum = 0;
var n = 0; // will hold the questionBankArray length
var typeofCard = "";
var quizDisplayCount = 0;
var partialString = "";
var textString = "";
var novoBasicCard;
var novoClozeCard;
// basic card constructor function



// function CarPart(name) {
//   if(this instanceof CarPart) {
//     this.name = name;
//   } else {
//     return new CarPart(name);
//   }
// }

// Note: Wheel should be made new/scope safe as well.

// In the above example, within the Wheel constructor, CarPart.call is what invokes the parent constructor, known as constructor stealing. When CarPart's constructor is called, this instanceof CarPart will fail because this is an instance of Wheel.

// The solution to this problem lies within the Wheel's prototype. If we set the following after the declaration of Wheel, the inheritance chain is correctly established and this instanceof CarPart will return true if this is a Wheel. 
// function Wheel(radius) {
//   CarPart.call(this, 'Wheel');
//   this.radius = radius;
// }
// Wheel.prototype = new CarPart();


function BasicCard(basicFront, basicBack) {
    this.basicFront = basicFront;
    this.basicBack = basicBack;
}

function ClozeCard(clozeFront, clozeBack) {
    this.clozeFront = clozeFront;
    this.clozeBack = clozeBack;
}

ClozeCard.prototype.getPartial = function() {
    console.log(`Your formatted ClozeCard is:\n\n   ${partialString}`);
}
var start = function() {
    inquirer.prompt([{
        name: "card",
        type: "list",
        message: "Which type of flashcard do you want to might?",
        choices: ["basic", "cloze", "quizme", "I don't want to learn"]
    }]).then(function(answer) {

        switch (answer.card) {
            case "basic":
                makeBlankCard();
                break;

            case "cloze":
                makeClozeCard();
                break;

            case "quizme":
                quizMe();
                break;

            case "I don't want to learn":
                lazy();
                break;

        }
    });
}
start();

function makeBlankCard() {
    inquirer.prompt([{
            name: "blankquestion",
            type: "input",
            message: "Type a question"

        }, {
            name: "blankanswer",
            type: "input",
            message: "Type in an answer to your question"

        }, {
            name: "confirmation",
            type: "confirm",
            message: "Would you like to add another notecard?"
        }


    ]).then(function(answer) {

        var novoBasicCard = new BasicCard(answer.blankquestion, answer.blankanswer);
        // This block of code will create a file called "movies.txt".
        // It will then print "Inception, Die Hard" in the file
        fs.appendFile("basicbank.txt", ';' + JSON.stringify(novoBasicCard), function(err) {

            // If the code experiences any errors it will log the error to the console.
            if (err) {
                return console.log(err);
            }
        });

        if (answer.confirmation) {
            makeBlankCard()
        } else {
            return;
        }

    });
}

function makeClozeCard() {
    inquirer.prompt([{
            name: "fulltextq",
            type: "input",
            message: "Type in a question"

        }, {
            name: "clozeq",
            type: "input",
            message: "Type in the cloze"

        }, {
            name: "confirmation",
            type: "confirm",
            message: "Would you like to add another notecard?"
        }


    ]).then(function(answer) {

        novoClozeCard = new ClozeCard(answer.fulltextq, answer.clozeq);
        // This block of code will create a file called "movies.txt".
        // It will then print "Inception, Die Hard" in the file
        fs.appendFile("clozebank.txt", ';' + JSON.stringify(novoClozeCard), function(err) {

            // If the code experiences any errors it will log the error to the console.
            if (err) {
                return console.log(err);
            }


            textString = novoClozeCard.clozeFront;
            partialString = textString.replace(novoClozeCard.clozeBack, "__________");
            novoClozeCard.getPartial();
            if (answer.confirmation) {
                makeClozeCard();
            } else {
                return;
            }
        });
    });
}





var count = 0;
var time;

function lazy() {

    console.log("too bad, sucker");
    console.log("---------------\n");
    setTimeout(start, 1000);
}



function quizMe() {
    inquirer.prompt([{
            name: "cardtype",
            type: "list",
            message: "Which cardset would you like to review?",
            choices: ["cloze", "basic"]
        }

    ]).then(function(answer) {

        if (answer.cardtype === "cloze") {
            readBank("clozebank.txt", "cloze");
        } else {
            readBank("basicbank.txt", "basic");
        }

    });
}

function readBank(fileName, type) {
    typeofCard = type;
    console.log("type of card is: " + typeofCard);

    fs.readFile(fileName, "utf8", function(error, data) {

        var split = data.split(";");
        for (var i = 0; i < split.length; i++) {
            var parsed = JSON.parse(split[i]);
            questionBankArray.push(parsed);

        }

        shuffleBank();
    });


}

function shuffleBank() {
    n = questionBankArray.length;
    for (var i = 0; i < n; i++) {
        var randomNum = Math.floor(Math.random() * n);
        var temp = questionBankArray[i];
        questionBankArray[i] = questionBankArray[randomNum];
        questionBankArray[randomNum] = temp;
    }

    quizDisplayCount = questionBankArray.length;
    if (typeofCard === "cloze") {
        displayClozeCard();
    } else {
        displayBlankCard();
    }


}

function displayBlankCard() {

    var element = questionBankArray.pop();
    inquirer.prompt([{
            name: "question",
            type: "input",
            message: element.basicFront
        }

    ]).then(function(answer) {

        if (answer.question === element.basicBack) {
            console.log("YOU are correct");
        } else {
            console.log("Wrong-o");
        }
        quizDisplayCount--;
        console.log(quizDisplayCount);
        if (quizDisplayCount === 0) {
            console.log("You are done");
            return;
        } else {
            displayBlankCard();
        }
    });
}

function displayClozeCard() {

    var element = questionBankArray.pop();
    var temp = element.clozeBack;
    textString = element.clozeFront;

    partialString = textString.replace(temp, "__________");

    inquirer.prompt([{
            name: "question",
            type: "input",
            message: partialString + "\n ANSWER: "
        }

    ]).then(function(answer) {

        if (answer.question === temp) {
            console.log("YOU are correct");
        } else {
            console.log("Wrong-o");
        }
        quizDisplayCount--;
        console.log(quizDisplayCount);
        if (quizDisplayCount === 0) {
            console.log("You are done");
            return;
        } else {
            displayClozeCard();
        }
    });
}
