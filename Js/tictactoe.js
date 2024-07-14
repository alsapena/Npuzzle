function TicTacToe(rows,columns,InputManager,Actuator,StorageManager,path)
{
  // this.size = 3;
  // this.board = new Board();
  // this.inputManager.on("move", this.move.bind(this));
	
  //this.size = size; // Size of the board
  this.rows = rows;
  this.path = path;
  this.columns = columns;
  this.inputManager   = new InputManager;
  this.storageManager = new StorageManager;
  this.actuator       = new Actuator(this.rows,this.columns,this.path);
  
  this.inputManager.on("move", this.move.bind(this));
  this.inputManager.on("restart", this.restart.bind(this));
  this.inputManager.on("keepPlaying", this.keepPlaying.bind(this));

  //this.setup();
  this.restart();
}


TicTacToe.prototype.GetMove = function()
{
     return {X:0,Y:0};
};

TicTacToe.prototype.setup = function () {
  var previousState = this.storageManager.getGameState();

  // Reload the game from a previous game if present
  
  if (previousState) 
  {
	alert(previousState);
    this.board        = new Board(previousState.board.rows,previousState.board.columns,
                                previousState.board.cells); // Reload board
    this.score       = previousState.score;
    this.over        = previousState.over;
    this.won         = previousState.won;
    this.keepPlaying = previousState.keepPlaying;
	
  }
  else 
  {
    //alert('jejeSi');
    this.board        = new Board(this.rows,this.columns);
    this.score       = 0;
    this.over        = false;
    this.won         = false;
    this.keepPlaying = false;

    // Add the initial tiles
    //this.addTiles();
  }

  // Update the actuator
  this.actuate();
};

// TicTacToe.prototype.addTiles = function ()
// {
  // for (var i = 0; i < this.rows; i++)
  // {
    // for(var j = 0; j < this.rows; j++)
	// {
	    // var tile = new Tile({ x: i, y: j }, this.board.lugar(i,j));
	// }
  // }
// };

TicTacToe.prototype.actuate = function () {
  // if (this.storageManager.getBestScore() < this.score)
  // {
    // this.storageManager.setBestScore(this.score);
  // }

  // Clear the state when the game is over (game over only, not win)
  if (this.over)
  {
     this.storageManager.clearGameState();
  }
  else 
  {
     this.storageManager.setGameState(this.serialize());
  }

  this.actuator.actuate(this.board, {
    score:      this.score,
    over:       this.over,
    won:        this.won,
    bestScore:  this.storageManager.getBestScore(),
    terminated: this.isGameTerminated()
  });

};

TicTacToe.prototype.serialize = function () {
  return {
    board:        this.board.serialize(),
    score:       this.score,
    over:        this.over,
    won:         this.won,
    keepPlaying: this.keepPlaying
  };
};

TicTacToe.prototype.isGameTerminated = function () {
  if (this.over || (this.won && !this.keepPlaying)) {
    return true;
  } else {
    return false;
  }
};

TicTacToe.prototype.getVector = function (direction) {
  // Vectors representing tile movement
  var map = {
    0: { x: 0,  y: -1 }, // Up
    1: { x: 1,  y: 0 },  // Right
    2: { x: 0,  y: 1 },  // Down
    3: { x: -1, y: 0 }   // Left
  };

  return map[direction];
};

TicTacToe.prototype.moveTile = function (tile, cell) {
  this.grid.cells[tile.x][tile.y] = null;
  this.grid.cells[cell.x][cell.y] = tile;
  tile.updatePosition(cell);
};

// Restart the game
TicTacToe.prototype.restart = function () {
  this.storageManager.clearGameState();
  this.actuator.continueGame(); // Clear the game won/lost message
  this.setup();
};

// Keep playing after winning (allows going over 2048)
TicTacToe.prototype.keepPlaying = function () {
  this.keepPlaying = true;
  this.actuator.continueGame(); // Clear the game won/lost message
};

TicTacToe.prototype.prepareTiles = function () 
{
  this.board.eachCell(function (x, y, tile) 
  {
    if (tile) 
	{
      tile.mergedFrom = null;
      tile.savePosition();
    }
  });
};

TicTacToe.prototype.move = function (direction) 
{
  // 0: up, 1: right, 2: down, 3: left
  var self = this;

  if (this.isGameTerminated()) return; // Don't do anything if the game's over

  // var cell, tile;

  // var vector     = this.getVector(direction);
  // var traversals = this.buildTraversals(vector);
  // var moved      = false;

  //Save the current tile positions and remove merger information
	this.prepareTiles();
  
  //alert(direction);

    // // Traverse the grid in the right direction and move tiles
    // traversals.x.forEach(function (x) {
    // traversals.y.forEach(function (y) {
      // cell = { x: x, y: y };
      // tile = self.grid.cellContent(cell);
	
	//alert(direction);
	if (direction == 0)//moverse a la izquierda
		this.board.movimiento(2);
	else if (direction == 1)//moverse a  arriba
		this.board.movimiento(3);
	else if (direction == 2)//moverse a la derecha
		this.board.movimiento(0);
	else if (direction == 3)//moverse a  abajo
		this.board.movimiento(1);
		
	moved = true;

      // if (tile) {
        // var positions = self.findFarthestPosition(cell, vector);
        // var next      = self.grid.cellContent(positions.next);

        // // Only one merger per row traversal?
        // if (next && next.value === tile.value && !next.mergedFrom) {
          // var merged = new Tile(positions.next, tile.value * 2);
          // merged.mergedFrom = [tile, next];

          // self.grid.insertTile(merged);
          // self.grid.removeTile(tile);

          // // Converge the two tiles' positions
          // tile.updatePosition(positions.next);

          // // Update the score
          // self.score += merged.value;

          // // The mighty 2048 tile
          // if (merged.value === 2048) self.won = true;
        // } else {
          // self.moveTile(tile, positions.farthest);
        // }

        // if (!self.positionsEqual(cell, tile)) {
          // moved = true; // The tile moved from its original cell!
        // }
      // }
    // });
  // });

  if (moved) 
  {
    self.won = this.board.organized();
	this.actuate();
  }
};



