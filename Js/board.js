function Board(rows,columns, previousState) 
{
  //this.size = size;
  
  this.rows = rows;
  this.columns = columns;
  
  this.cells = previousState ? this.fromState(previousState) : this.Initialize();
  this.shuffleTiles();
}

Board.prototype.fromState = function (state) 
{
  var cells = [];

  for (var x = 0; x < this.rows; x++) 
  {
     var row = cells[x] = [];

    for (var y = 0; y < this.columns; y++) 
	{
      var tile = state[x][y];
      row.push(tile ? new Tile(tile.position, tile.value) : null);
    }
  }

  return cells;
};

// Build a grid of the specified size
Board.prototype.Initialize = function ()
{
  var tablero = [];
     
  var tablero = [];
  var posX, posY;
  
  //alert('hshs');

  // la clase se iniciara con 2 int que seran las dimensiones del juego
  var nombre = 1;//este int asignara un No. a cada elemento del int[,] dela clase (o juego)
  
  for (var i = 0; i < this.rows; i++)// con este ciclo se aisigna a cada elemento un valor 
  {
      var row = tablero[i] = [];
      for (var j = 0; j < this.columns ; j++,nombre++)
      {
	     //if (nombre == rows * columns)
		 //  break;
         row.push(new Tile({ x: j, y: i },nombre));
         if (nombre == this.rows * this.columns)
            row[this.columns - 1] = new Tile({ x: j , y: i  },0);
      }

   }
   
   this.posX = this.rows - 1;//se asigna un valor a los ints del constructor que sera la posicion 
   this.posY = this.columns - 1; //inicial de casilla vacia  
            

   return tablero;
  
};

Board.prototype.availableCells = function ()
{
  var cells = [];
  this.eachCell(function (x, y, tile)
  {
    if (!tile)
	{
      cells.push({ x: x, y: y });
    }
  });

  return cells;
};

// Call callback for every cell
Board.prototype.eachCell = function (callback)
{
  for (var x = 0; x < this.rows; x++) 
  {
    for (var y = 0; y < this.columns; y++) 
	{
      callback(x, y, this.cells[x][y]);
    }
  }
};

Board.prototype.serialize = function () {
	  var cellState = [];

	  for (var x = 0; x < this.size; x++) 
	  {
		var row = cellState[x] = [];

		for (var y = 0; y < this.size; y++) 
		{
		  row.push(this.cells[x][y] ? this.cells[x][y].serialize() : null);
		}
	  }

	  return { size: this.size, cells: cellState  };
};


        // //constructor de la clase
        // int[,] tablero;
        // int posX, posY;

		// public Puzzles(int rows, int columns)
        // {
            // // la clase se iniciara con 2 int que seran las dimensiones del juego
            // int nombre = 1;//este int asignara un No. a cada elemento del int[,] dela clase (o juego)
            // tablero=new int[rows,columns];//se inicia la clase con los parametros fijados
            // for (int i = 0; i < rows; i++)// con este ciclo se aisigna a cada elemento un valor 
            // {
                // for (int j = 0; j <columns ; j++,nombre++)
                // {
                    // tablero[i, j] = nombre;
                    // if (nombre == rows * columns)
                        // tablero[rows - 1, columns - 1] = 0;
                // }

            // } posX = rows - 1;//se asigna un valor a los ints del constructor que sera la posicion 
              // posY = columns - 1; //inicial de casilla vacia  
            

        // }
Board.prototype.movimiento = function(dir)
{
	//este metodo permite mover valores en el int[,] dela clase
	var dirF = new Array( 0, 1,  0, -1 ); //int[] da la posicion a mover en la fila.
	var dirC = new Array( 1, 0, -1, 0 ); //  int[] da la posicion a  mover en la columna.
	

	if ((this.posX + dirF[dir] < this.rows && this.posX + dirF[dir] >= 0) && (this.posY + dirC[dir] < this.columns && this.posY + dirC[dir] >= 0))
	{   
	   
	    //alert(this.posX.toString() + " " +  this.posY.toString());
		var tempX = this.cells[this.posX][ this.posY].x;		 
		var tempY = this.cells[this.posX][ this.posY].y;
		
		this.cells[this.posX][ this.posY].x = this.cells[this.posX + dirF[dir]][ this.posY + dirC[dir]].x;
		this.cells[this.posX][ this.posY].y = this.cells[this.posX + dirF[dir]][ this.posY + dirC[dir]].y;
		
		//alert(this.cells[this.posX][ this.posY].value.toString() + " " +  this.cells[this.posX + dirF[dir]][ this.posY + dirC[dir]].value.toString());
		
		this.cells[this.posX + dirF[dir]][this.posY  + dirC[dir]].x = tempX;
		this.cells[this.posX + dirF[dir]][this.posY  + dirC[dir]].y = tempY;

		// Cambia la posicion a mover a la posicion del cero y se le asigna el 0 a 
		// esa posicion.
		var temp = this.cells[this.posX][ this.posY];
		this.cells[this.posX][ this.posY] = this.cells[this.posX + dirF[dir]][ this.posY + dirC[dir]];
		this.cells[this.posX + dirF[dir]][this.posY   + dirC[dir]] = temp;		

        // var temp = this.cells[this.posX][ this.posY].value;
		// this.cells[this.posX][ this.posY].value = this.cells[this.posX + dirF[dir]][ this.posY + dirC[dir]].value;
		// this.cells[this.posX + dirF[dir]][this.posY   + dirC[dir]].value = temp;		
		
		
		//Se asignan los nuevos valores de posicion del 0.
		this.posX = this.posX + dirF[dir];
		this.posY = this.posY + dirC[dir];
		//alert(this.posX.toString() + " " +  this.posY.toString());
	}
}

    
Board.prototype.shuffleTiles = function()
{ 
    //alert('shu');
    //este metodo aprobecha el metodo Movimiento(int dir) y con una entrada de valores aleatorios 
    //la casilla vacia se mueve con una entrada de valores aleatorios hasta un No. fijado
    //que dedende de las dimensiones
    var s = this.rows * this.columns * 100;
	var	aux = 0;
    var aux1 = 1000;
    for (var i = 0; i < s ; i++)
    {
        aux = Math.floor(Math.random() * 4);
		//alert(aux);
        if (aux != aux1)
        {
             this.movimiento(aux);
             aux1 = aux;
        }
    }
};
Board.prototype.organized = function()
{
	//este comprueba recorriendo el int[,] dela clase si cada elemnto esta en la posicion inicial
	// y devuelve un  valor bool en dependencia de la situacion de los elementos en el int[,] dela clase 
	var comp = 1;
		
	for (var i = 0; i < this.rows ; i++)				
		for (var j = 0; j < this.columns; j++, comp++)
		{
			if (comp == this.rows  * this.columns )
				break;
			else if (comp != this.cells[i][j].value)
				return false;
		}			
	 return true;
}
Board.prototype.lugar = function (f, c)
{
	//este metodo  decuelve el elemento del int[,] entrandole la posicion de las rows y las columns en forma de ints
	return this.cells[f][c];
};
		// public void MoverSeccion(int x, int y)
		// {
            // //aprobecha el metodo Movimiento(int dir)ve la posicion de la casilla 
            // // a mover con los parametros de entrada 
            // //ve si la casilla vacia esta en la misma fila o columna que la casilla  a mover
            // // en caso de ser posible la casilla vacia se mueve la cantidad de  veces necesarias
            // //para mover una fila o una columna sin necesidad de mover casilla por casilla
            // //notese que una casilla se considera como una seccion
			// if (x == posX && y < posY)
			// {
				// int cant = posY - y;
				// for (int i = 0; i < cant; i++)
					// Movimiento(2);
			// }
			// else if (x == posX && y > posY)
			// {
				// int cant = y - posY;
				// for (int i = 0; i < cant; i++)
					// Movimiento(0);
			// }
			// else if (y == posY && x > posX)
			// {
				// int cant = x - posX;
				// for (int i = 0; i < cant; i++)
					// Movimiento(1);
			// }
			// else if (y == posY && x < posX)
			// {
				// int cant = posX - x;
				// for (int i = 0; i < cant; i++)
					// Movimiento(3);
			// }
		// }
		// public int  PosicionCeroX
		// {
            // //Propiedad que devuelve la fila en la que se encuentra la casilla vacia
			// get { return posX; }

		// }
		// public int PosicionCeroY
        // {
            // //Propiedad que devuelve la columna en la que se encuentra la casilla vacia
			// get { return posY; }

		// }
		// public int Cantrows
		// {
            // //Propiedad que devuelve la  cantidad de  rows que se estan usando en el juego
			// get { return this.cells.GetLength(0); }
		// }
		// public int Cantcolumns
        // {
            // //Propiedad que devuelve la  cantidad de  columns que se estan usando en eljuego
			// get { return this.cells.GetLength(1); }
		// }
		// public bool AceptaMovimiento(int x, int y)
		// {
            // //comprueba si la casilla que tiene como coordenadas los valores que se entran
            // //se puede mover
			// return (posX == x || posY == y);
        // }

    // }

