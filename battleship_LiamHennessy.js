function shipInfo() {
        this.boardSize = 7;
	this.numShips = 3;
	this.shipLength = 3;
	this.shipsSunk = 0;

        // When you randonly generate ships you can initialize them here
        
	this.ships = [
		{ locations: [0, 0, 0], hits: ["", "", ""] },
		{ locations: [0, 0, 0], hits: ["", "", ""] },
		{ locations: [0, 0, 0], hits: ["", "", ""] }
	],
    

// original hard-coded values for ship locations

	/*ships: [
		{ locations: ["06", "16", "26"], hits: ["", "", ""] },
		{ locations: ["24", "34", "44"], hits: ["", "", ""] },
		{ locations: ["10", "11", "12"], hits: ["", "", ""] }
	],*/


	this.fire = function(guess) {
		for (var i = 0; i < this.numShips; i++) {
			var ship = this.ships[i];
			var index = ship.locations.indexOf(guess);

			// here's an improvement! Check to see if the ship
			// has already been hit, message the user, and return true.
			if (ship.hits[index] === "hit") {
				boardInfo(this.displayMessage("Oops, you already hit that location!"));
				return true;
			} else if (index >= 0) {
				ship.hits[index] = "hit";
				boardInfo(this.displayHit(guess));
				boardInfo(this.displayMessage("HIT!"));

				if (this.isSunk(ship)) {
					boardInfo(this.displayMessage("You sank my battleship!"));
					this.shipsSunk++;
				}
				return true;
			}
		};
		boardInfo(this.displayMiss(guess));
		boardInfo(this.displayMessage("You missed."));
		return false;
	},

	this.isSunk = function(ship) {
		for (var i = 0; i < this.shipLength; i++)  {
			if (ship.hits[i] !== "hit") {
				return false;
			}
		}
	    return true;
	},

        /*
         * Loads the ship locations into the "objects" in 'ships'
         */
	this.generateShipLocations = function() {
		var locations;
		for (var i = 0; i < this.numShips; i++) {
			do {
				locations = this.generateShip();
			} while (this.collision(locations));
			this.ships[i].locations = locations;
		}
		console.log("Ships array: ");
		console.log(this.ships);
	},
        /*
         * Returns an array of ship locations.  The array should be the length
         * of the ship.
         * 
         * Ex. [14, 24, 34] for a ship of length 3
         */
	this.generateShip = function() {
		var direction = Math.floor(Math.random() * 2);
		var row, col;

		if (direction === 1) { // horizontal
			row = Math.floor(Math.random() * this.boardSize);
			col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
		} else { // vertical
			row = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
			col = Math.floor(Math.random() * this.boardSize);
		}

		var newShipLocations = [];
		for (var i = 0; i < this.shipLength; i++) {
			if (direction === 1) {
				newShipLocations.push(row + "" + (col + i));
			} else {
				newShipLocations.push((row + i) + "" + col);
			}
		}
		return newShipLocations;
	},

/*
 * Returns true if there is a collision between the ships, false otherwise
 * Accepts the array 'location' of a ship, and checks the existing ships in "ships"
 * for collisions.
 */
	this.collision = function(locations) {
			for (var i = 0; i < this.numShips; i++) {
			var ship = this.ships[i];
			for (var j = 0; j < locations.length; j++) {
				if (ship.locations.indexOf(locations[j]) >= 0) {
					return true;
				}
			}
		}
		return false;
	};
        
}

function boardInfo(){
        this.displayMessage = function(msg) {
		var messageArea = document.getElementById("messageArea");
		messageArea.innerHTML = msg;
	},

	this.displayHit = function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute("class", "hit");
	},

	this.displayMiss = function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute("class", "miss");
	};
        this.parseGuess = function(guess) {
                var alphabet = ["A", "B", "C", "D", "E", "F", "G"];

                if (guess === null || guess.length !== 2) {
                        alert("Oops, please enter a letter and a number on the board.");
                } else {
                        var firstChar = guess.charAt(0);
                        var row = alphabet.indexOf(firstChar);
                        var column = guess.charAt(1);

                        if (isNaN(row) || isNaN(column)) {
                                alert("Oops, that isn't on the board.");
                        } else if (row < 0 || row >= shipInfo(this.boardSize) ||
                                   column < 0 || column >= shipInfo(this.boardSize)) {
                                alert("Oops, that's off the board!");
                        } else {
                                return row + column;
                        }
                }
                return null;
        };

}


function gameInfo(){
    	this.guesses = 0;

        this.processGuess = function(guess) {
		var location = boardInfo(this.parseGuess(guess));
		if (location) {
			this.guesses++;
			var hit = shipInfo(this.fire(location));
			if (hit && shipInfo(this.shipsSunk) === ShipInfo(this.numShips)) {
					boardInfo(this.displayMessage("You sank all my battleships, in " + this.guesses + " guesses"));
			}
		}
	};
        this.handleFireButton = function() {
            var guessInput = document.getElementById("guessInput");
            var guess = guessInput.value.toUpperCase();

            this.processGuess(guess);

            guessInput.value = "";
        };
        

        
        this.handleKeyPress = function(e) {
            var fireButton = document.getElementById("fireButton");

            // in IE9 and earlier, the event object doesn't get passed
            // to the event handler correctly, so we use window.event instead.
            e = e || window.event;

            if (e.keyCode === 13) {
                    fireButton.click();
                    return false;
            }
        };
        

}





var model = {
	
}; 	


var view = {
	
}; 

var controller = {

};


// helper function to parse a guess from the user
window.onload = init;

function init() {   
// Fire! button onclick handler
var fireButton = document.getElementById("fireButton");
fireButton.onclick = gameInfo(this.handleFireButton);

// handle "return" key press
var guessInput = document.getElementById("guessInput");
guessInput.onkeypress = gameInfo(this.handleKeyPress());

// place the ships on the game board
shipInfo(this.generateShipLocations());
};     




// event handlers






// init - called when the page has completed loading







