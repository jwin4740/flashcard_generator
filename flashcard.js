// dependency for inquirer npm package
var inquirer = require("inquirer");
// NPM Package for reading and writing files
var fs = require("fs");

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
var partialString = "";
var textString = "";
var novoBasicCard;
var novoClozeCard;

function BasicCard(basicFront, basicBack) {
    this.basicFront = basicFront;
    this.basicBack = basicBack;
}

function ClozeCard(fullText, clozePart) {
    this.fullText = fullText;
    this.clozePart = clozePart;
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


            textString = novoClozeCard.fullText;
            partialString = textString.replace(novoClozeCard.clozePart, "__________");
            novoClozeCard.getPartial();
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
            readBank("clozebank.txt");
        } else {
            readBank("basicbank.txt");
        }

    });
}

function readBank(fileName) {

    fs.readFile(fileName, "utf8", function(error, data) {
        // the first parameter is always an error which gets sets to null if there is no error
        // We will then print the contents of data

var split = data.split(";");
var parsed = JSON.parse(split[5]);
        console.log(parsed);
    });
}
