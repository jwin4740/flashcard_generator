// dependency for inquirer npm package
var inquirer = require("inquirer");

// basic card constructor function

function BasicCard(basicFront, basicBack) {
    this.basicFront = basicFront;
    this.basicBack = basicBack;
}


// Inquirer asks whether to post a bid or bid on one
var start = function() {
    inquirer.prompt([{
        name: "card",
        type: "list",
        message: "Which type of flashcard do you want to might?",
        choices: ["basic", "cloze", "I don't want to learn"]
    }]).then(function(answer) {

        switch (answer.card) {
            case "basic":
                makeBlankCard();
                break;

            case "cloze":
                makeClozeCard();
                break;

            case "I don't want to learn":
                lazy();
                break;
                // If Post, ask item_name, item_starting_bid
        }
    }); // End of post or bid inquirer prompt
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

        }

    ]).then(function(answer) {
        console.log(answer.blankquestion);
        console.log(answer.blankanswer);


        inquirer.prompt([{
                name: "confirmation",
                type: "confirm",
                message: "Would you like to add another notecard?"
            }

        ]).then(function(response) {

        	if (response.confirmation){
        		makeBlankCard()
        	}
            else {
            	return;
            }

        });
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
