var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

var breeds = ["Abyssinian","Aegean","American Curl","American Bobtail","American Shorthair","American Wirehair","Aphrodite Giant","Arabian Mau","Australian Mist","Asian","Asian Semi-longhair","Balinese","Bambino","Bengal","Birman","Bombay","Brazilian Shorthair","British Semi-longhair","British Shorthair","British Longhair","Burmese","Burmilla","California Spangled","Chantilly-Tiffany","Chartreux","Chausie","Colorpoint Shorthair","Cornish Rex","Cymric","Manx Longhair","Longhaired Manx","Cyprus","Devon Rex","Donskoy","Don Sphynx","Dragon Li","Chinese Li Hua","Dwelf","Egyptian Mau","European Shorthair","Exotic Shorthair","Foldex","German Rex","Havana Brown","Highlander","Himalayan","Colorpoint Persian","Japanese Bobtail","Javanese","Colorpoint Longhair","Karelian Bobtail","Khao Manee","Korat","Korean Bobtail","Korn Ja","Kurilian Bobtail","Kuril Islands Bobtail","LaPerm","Lykoi","Maine Coon","Manx","Mekong Bobtail","Minskin","Munchkin","Nebelung","Napoleon","Norwegian Forest Cat","Ocicat","Ojos Azules","Oregon Rex","Oriental Bicolor","Oriental Shorthair","Oriental Longhair","Foreign Longhair","Mandarin","British Angora","Persian","Peterbald","Pixie-bob","Raas","Ragamuffin","Liebling","Ragdoll","Russian Blue","Russian White","Sam Sawet","Savannah","Scottish Fold","Selkirk Rex","Serengeti","Serrade petit","Siberian","Siberian Forest Cat","Neva Masquerade","Singapura","Snowshoe","Sokoke","Somali","Sphynx","Suphalak","Thai","Siamese","Wichien Maat","Thai Lilac","Tonkinese","Toyger","Turkish Angora","Turkish Van","Ukrainian Levkoy","Wila Krungthep","York Chocolate",
];

var gameStarted = false;
var currentWord;
var wordAsDashes;
var guessesLeft;
var lettersGuessed;
var numWins = 0;
var numLosses = 0;
var getNewWord;
var wordPlace; //place in breeds array
var correctGuesses;
var wordAsArr = [];
var dashesArray = [];

function initialize() {
	gameStarted = true;
	lettersGuessed = [];
	correctGuesses = 0;
	wordPlace = Math.floor(Math.random() * 36);
	currentWord = breeds[wordPlace];			//string
	guessesLeft = 17 - currentWord.length;		//longer words get less guesses
	wordAsDashes = makeIntoDashes(currentWord);	//string of dashes
	wordAsArr = currentWord.split('');			//array with letters
	dashesArray = wordAsDashes.split('');		//array with dashes
	document.getElementById("currentWord").innerHTML = wordAsDashes;
	document.getElementById("lettersGuessed").innerHTML = "--";
	document.getElementById("guessesLeft").innerHTML = guessesLeft;
}

// Make each word into underscores, visually like hangman
function makeIntoDashes(word) {
	var dashes = "";
	for (i = 0; i < word.length - 1; i++) {
		dashes += "_ ";
	}
	dashes += "_";
	return dashes;
}

// Main function that controls what to do with each keystroke
function playGame(letter) {
	var letter = letter.toLowerCase();

	// Checks if key is a letter
	if (alphabet.indexOf(letter) > -1) {
		if (wordAsArr.indexOf(letter) > -1) {
			correctGuesses++;
			displayLetter(letter);
		}
		else {
			if (lettersGuessed.indexOf(letter) > -1) {
				return;
			}
			else {
				guessesLeft--;
				document.getElementById("guessesLeft").innerHTML = guessesLeft;
				lettersGuessed.push(letter);
				document.getElementById("lettersGuessed").innerHTML = lettersGuessed.join(' ');
				if (guessesLeft == 0) {
					alert("Sorry! The correct answer is " + currentWord);
					initialize();
					numLosses++;
					document.getElementById("losses").innerHTML = numLosses;
				}
			}
		}
	}
}

// Displays letter if it's in word
function displayLetter(letter) {
	// for each char in wordAsDashes, if matches currentWord --> display
	for (i = 0; i < currentWord.length; i++) {
		if (letter == wordAsArr[i]) {
			dashesArray[i * 2] = letter;
			console.log(dashesArray);
		}
	}
	document.getElementById("currentWord").innerHTML = dashesArray.join("");
	checkForWin();
}

// Checks for win by looking for "_"
function checkForWin() {
	if (dashesArray.indexOf("_") === -1) {
		alert("You got it! The correct answer is " + currentWord);
		numWins++;
		document.getElementById("wins").innerHTML = numWins;
		initialize();
	}
}

document.onkeyup = function (event) {
	if (!gameStarted) {
		document.getElementById("letsPlay").innerHTML = "";
		initialize();
		document.getElementById("currentWord").innerHTML = wordAsDashes.split(",");
		console.log(currentWord);
		gameStarted = true;
	}
	else {
		playGame(event.key);
	}
}