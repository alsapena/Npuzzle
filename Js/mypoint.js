function MyPoint(x,y,z)
{
    this.punto = [];
	punto[0] = x;
	punto[1] = y;
	punto[2] = z;
	punto[3] = 1;
};

function MyPoint(x,y)
{
    this.punto = []
	this.punto[0] = x;
	this.punto[1] = y;
	this.punto[3] = 1;
};

MyPoint.prototype.getX = function()
{
     return this.punto[0];
};

MyPoint.prototype.setX = function(x)
{
     this.punto[0] = x;
};

MyPoint.prototype.getY = function()
{
     return this.punto[1];
};

MyPoint.prototype.setY = function(y)
{
     this.punto[1] = y;
};

MyPoint.prototype.getZ = function()
{
     return this.punto[2];
};

MyPoint.prototype.setZ = function(z)
{
     this.punto[2] = z;
};

MyPoint.prototype.Clone = function ()
{
	return new MyPoint(this.getX(), this.getY(), this.getZ());
};

MyPoint.prototype.CoordenadaHomogenea = function()
{
	return this.punto[3]; 
};

MyPoint.prototype.Get = function(pos)
{
    return this.punto[pos];
};

MyPoint.prototype.Set = function(pos,value)
{
   this.punto[pos] = value;
};
 
 MyPoint.prototype.Dimension = function()
{
	return 3;
};
 MyPoint.prototype.DimensionHomogenea = function()
{
	return 4;
};

function ConvertirARadianes(Sexagesimal)
{
	return (Sexagesimal / 180) * Math.PI;
};