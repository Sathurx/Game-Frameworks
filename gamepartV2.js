var allText;
var numberOfCommas = 0;
var allTextArray;
var searchItem;
var addedItems = "";

var textFile = new XMLHttpRequest(); //Accessing the csv inventory file
textFile.onreadystatechange = function() {
	if (textFile.readyState == 4 && textFile.status == 200) {
		allText = textFile.responseText;
		// find number of commas
		for (var i = 0; i < allText.length; i++) {
			if (allText.charAt(i) == ",") {
				numberOfCommas++;
			}
		}
		// uses number of commas to determine number of rows in the 2-D array
		allTextArray = new Array(numberOfCommas / 2);
		// 2-D array is made at this point, where an array is being put into an array
		for (var i = 0; i < allTextArray.length; i++) {
			allTextArray[i] = new Array(3);
			var allTextLines = allText.split("\n");
			allTextArray[i] = allTextLines[i].split(",");
		}
	}
};
textFile.open("GET", "Levels Inventory.txt.csv", true); //Real File name is unknown
textFile.send();

function setChar(string, character, index) {
	return string.substr(0, index) + character + string.substr(index + 1);
}

function changetoLevels() {
  possibleDiv = ["Start_Screen","Tutorial","Level","Game_Over","Win"];
  for (x = 0; x < possibleDiv.length;x++) {
    document.getElementById(possibleDiv[x]).innerHTML = "";
  }

  for (i = 0; i < allTextArray.length;i++) { //setting images of the molecules
    for (j = 0; j < allTextArray[i].length;j++) {
      if(j != 2)  {
        document.getElementById("Level").innerHTML += allTextArray[i][j];//Displaying images
      } else { //Not working; using this to test for later uses
        addImage(allTextArray[i][j], "Level", "200px", "200px");
      }
    }
  }
}

var myGamePiece;

function startGame() {
    myGamePiece = new component(30, 30, "red", 10, 120);
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
}

function updateGameArea() {
    myGameArea.clear();
    myGamePiece.newPos();
    myGamePiece.update();
}

function moveup() {
    myGamePiece.speedY -= 1;
}

function movedown() {
    myGamePiece.speedY += 1;
}

function moveleft() {
    myGamePiece.speedX -= 1;
}

function moveright() {
    myGamePiece.speedX += 1;
}
