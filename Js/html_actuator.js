function HTMLActuator(rows,columns,path) {
  this.tileContainer    = document.querySelector(".tile-container");
  // this.scoreContainer   = document.querySelector(".score-container");
  //this.size = size;
  this.rows = rows;
  this.columns = columns;
  this.path = path;
  // this.bestContainer    = document.querySelector(".best-container");
  this.messageContainer = document.querySelector(".game-message");
  // this.sharingContainer = document.querySelector(".score-sharing");
  this.imageObj = new Image();
  this.imageObj.src = this.path;
  // this.score = 0;
  
  this.paintBoard();
}

HTMLActuator.prototype.paintBoard = function()
{
	
	
	var gridContainer   = document.querySelector(".grid-container");
	
    this.clearContainer(gridContainer);
	
	for (var x = 0; x < this.rows; x++) 
	{
		var row  = document.createElement("div");
		row.classList.add("grid-row");
		for (var y = 0; y < this.columns; y++) 
		{
			var cell = document.createElement("div");
			cell.classList.add("grid-cell");
			row.appendChild(cell);
		}
		
		gridContainer.appendChild(row);
	}
	
	var gameContainer   = document.querySelector(".game-container");
	
	//gridContainer.setAttribute('style','width:1000px')
	gameContainer.setAttribute('style','width:' + (107*this.columns + 14.4*(this.columns + 1) ) +'px;'+'height:' + (107*this.rows + 14.4*(this.rows + 1) ) +'px');
	//gameContainer.setAttribute('style',);
	//alert(gridContainer.style.width);
	//gameContainer.width = gridContainer.width;
	//gameContainer.height = gridContainer.height;
}

HTMLActuator.prototype.actuate = function (grid, metadata) {
  var self = this;

  window.requestAnimationFrame(function () {
    self.clearContainer(self.tileContainer);
    
	grid.cells.forEach(function (column) {
      column.forEach(function (cell) {
        if (cell) {
          self.addTile(cell);
        }
      });
    });

    //self.updateScore(metadata.score);
    //self.updateBestScore(metadata.bestScore);

    if (metadata.terminated) {
      if (metadata.over) {
        self.message(false); // You lose
      } else if (metadata.won) {
        self.message(true); // You win!
      }
    }

  });
};

// Continues the game (both restart and keep playing)
HTMLActuator.prototype.continueGame = function () {
  if (typeof ga !== "undefined") {
    ga("send", "event", "game", "restart");
  }

  this.clearMessage();
};

HTMLActuator.prototype.clearContainer = function (container) 
{
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
};

HTMLActuator.prototype.posPiezaOrigFil = function (pieza) //Entrado un valor devuelve la posicion de la fila en el this.cells original.
{
	//metodo que recibe un int que sera la posicion de las rows de una Pieza
	//y devuelve la posicion inicial de las rows de dicha Pieza
	if (pieza == 0) return this.rows - 1;
	return Math.floor((pieza - 1) / this.rows);
};

HTMLActuator.prototype.posPiezaOrigCol = function (pieza) //Entrado un valor devuelve la posicion de la fila en el this.cells original.
{ 
	//metodo que recibe un int que sera la posicion de las columns de una Pieza
	//y devuelve la posicion inicial de las columns de dicha Pieza
	if (pieza == 0) return this.columns - 1;
	return Math.floor((pieza - 1) % this.columns);
};

HTMLActuator.prototype.addTile = function (tile) 
{
  var self = this;
  
  //alert('hasta aqui');
  if(tile.value == 0)
	return;
  
  var wrapper   = document.createElement("div");
  var inner     = document.createElement("div");
  var position  = tile.previousPosition || { x: tile.x, y: tile.y };
  var positionClass = this.positionClass(position);

  // We can't use classlist because it somehow glitches when replacing classes
  var classes = ["tile", "tile-" + 27, positionClass];//tile.value

  //if (tile.value > 2048) classes.push("tile-super");

  this.applyClasses(wrapper, classes);
  
  

  inner.classList.add("tile-inner");
  //inner.textContent = tile.value;
  
  if(this.path != "none")
  {
		//alert('de madre');
		var canvas = document.createElement("canvas");
		
		canvas.setAttribute("style", 'width:107px;height:107px');
		
		context = canvas.getContext( '2d' );
		
		//alert(imageObj.width);
		var sourceWidth = this.imageObj.width/this.columns;
		var sourceHeight = this.imageObj.height/this.rows;
		
		//alert(tile.value);
		//alert(sourceWidth.toString() + " " + sourceHeight.toString() );
		
		var sourceX =  this.posPiezaOrigCol(tile.value) * sourceWidth;
		var sourceY =  this.posPiezaOrigFil(tile.value) * sourceHeight; 
		
		//alert(sourceX.toString() + " " +sourceY.toString() );
		
		var destWidth = sourceWidth;
		var destHeight = sourceHeight;
		var destX = canvas.width / 2 - destWidth / 2;
		var destY = canvas.height / 2 - destHeight / 2;
		
		
	 
		//imageObj.onload = function () 
		//{
			context.drawImage( this.imageObj,sourceX, sourceY, sourceWidth,sourceHeight, 0, 0, canvas.width, canvas.height);
			//alert(canvas.width);
			//context.fill();
		//	};
		
		
		inner.appendChild(canvas);
  }
  

  if (tile.previousPosition) 
  {
    // Make sure that the tile gets rendered in the previous position first
	//alert('previos');
    window.requestAnimationFrame(function () {
      classes[2] = self.positionClass({ x: tile.x, y: tile.y });
      self.applyClasses(wrapper, classes); // Update the position
    });
	//alert('je');
  } 
  else if (tile.mergedFrom) 
  {
    classes.push("tile-merged");
    this.applyClasses(wrapper, classes);

    // Render the tiles that merged
    tile.mergedFrom.forEach(function (merged) {
      self.addTile(merged);
    });
  } 
  else 
  {
	//alert('je');
    classes.push("tile-new");
    this.applyClasses(wrapper, classes);
  }

  // Add the inner part of the tile to the wrapper
  wrapper.appendChild(inner);
  
  // -webkit-transform: translate(202px, 202px);
    // -moz-transform: translate(202px, 202px);
    // transform: translate(202px, 202px); }
	
  wrapper.setAttribute("style", 'transform:translate(' + (tile.x*107 + 14.4*(tile.x) ) + 'px,' + (tile.y*107 + 14.4*(tile.y)) +'px)');

  // Put the tile on the board
  this.tileContainer.appendChild(wrapper);
};

HTMLActuator.prototype.applyClasses = function (element, classes) {
  element.setAttribute("class", classes.join(" "));
};

HTMLActuator.prototype.normalizePosition = function (position) {
  return { x: position.x + 1, y: position.y + 1 };
};

HTMLActuator.prototype.positionClass = function (position) {
  position = this.normalizePosition(position);
  return "tile-position-" + position.x + "-" + position.y;
};

HTMLActuator.prototype.updateScore = function (score) {
  this.clearContainer(this.scoreContainer);

  var difference = score - this.score;
  this.score = score;

  this.scoreContainer.textContent = this.score;

  if (difference > 0) {
    var addition = document.createElement("div");
    addition.classList.add("score-addition");
    addition.textContent = "+" + difference;

    this.scoreContainer.appendChild(addition);
  }
};

HTMLActuator.prototype.updateBestScore = function (bestScore) {
  this.bestContainer.textContent = bestScore;
};

HTMLActuator.prototype.message = function (won) {
  var type    = won ? "game-won" : "game-over";
  var message = won ? "You win!" : "Game over!";

  if (typeof ga !== "undefined") {
    ga("send", "event", "game", "end", type, this.score);
  }

  this.messageContainer.classList.add(type);
  this.messageContainer.getElementsByTagName("p")[0].textContent = message;

  this.clearContainer(this.sharingContainer);
  this.sharingContainer.appendChild(this.scoreTweetButton());
  twttr.widgets.load();
};

HTMLActuator.prototype.clearMessage = function () {
  // IE only takes one value to remove at a time.
  this.messageContainer.classList.remove("game-won");
  this.messageContainer.classList.remove("game-over");
};

HTMLActuator.prototype.scoreTweetButton = function () {
  var tweet = document.createElement("a");
  tweet.classList.add("twitter-share-button");
  tweet.setAttribute("href", "https://twitter.com/share");
  tweet.setAttribute("data-url", "http://2048.waxoo.com");
  tweet.setAttribute("data-counturl", "http://gabrielecirulli.github.io/2048/");
  tweet.textContent = "Tweet";

  var text = "Hice " + this.score + " puntos! en el juego de 2048, te ves " +
             "capaz de superarme?! #2048game";
  tweet.setAttribute("data-text", text);

  return tweet;
};
