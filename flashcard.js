// dependency for inquirer npm package
var inquirer = require("inquirer");
// NPM Package for reading and writing files
var fs = require("fs");

// basic card constructor function

function BasicCard(basicFront, basicBack) {
    this.basicFront = basicFront;
    this.basicBack = basicBack;
}

function ClozeCard(fullText, clozePart) {
	this.fullText = fullText;
    this.clozePart = clozePart;
}

ClozeCard.prototype.getPartial = function () {
	console.log(this.fullText);

}



var novoCloze = new ClozeCard("George Washington is the first president of the United States", "George Washington");
var textString = novoCloze.fullText;
var partialString = textString.replace(novoCloze.clozePart, "__________");
console.log("Your formatted ClozeCard is:\n\n" + partialString);







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
// start();

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
        fs.appendFile("basicbank.txt", JSON.stringify(novoBasicCard) + ';', function(err) {

            // If the code experiences any errors it will log the error to the console.
            if (err) {
                return console.log(err);
            }

            // Otherwise, it will print: "movies.txt was updated!"
            console.log("movies.txt was updated!");

        });

        if (answer.confirmation) {
            makeBlankCard()
        } else {
            return;
        }

    });
}


function makeClozeCard() {
    console.log("cooler");
}
var count = 0;
var time;

function lazy() {

    console.log("too bad, sucker");
    console.log("---------------\n");
    setTimeout(start, 1000);
}



function quizMe() {

    fs.readFile("basicbank.txt", "utf8", function(error, data) {
        // the first parameter is always an error which gets sets to null if there is no error
        // We will then print the contents of data
   
        // Then split it by commas (to make it more readable)
        var dataArr = data.split(";");

        // We will then re-display the content as an array for later use.
        var object = JSON.parse(dataArr[1]);
        console.log(object.basicFront);

    });
}
