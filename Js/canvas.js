function MRotarX(grados)
{
	var cos = Math.cos(ConvertirARadianes(grados));
	var sen = Math.sin(ConvertirARadianes(grados));
	var result = [
        [1, 0, 0, 0],
        [0, cos, -sen, 0],
        [0, sen, cos, 0],
        [0, 0, 0, 1]];
	
	return result;	
};

function MRotarY(grados)
{
	var cos = Math.cos(ConvertirARadianes(grados));
	var sen = Math.sin(ConvertirARadianes(grados));
	var result = [
        [cos, 0, sen, 0],
        [0, 1, 0, 0],
        [-sen, 0, cos, 0],
        [0, 0, 0, 1]];
	
	return result;	
};

function MRotarZ(grados)
{
	var cos = Math.cos(ConvertirARadianes(grados));
	var sen = Math.sin(ConvertirARadianes(grados));
	var result = [[cos, -sen, 0, 0],
                  [sen, cos, 0, 0],
                  [0, 0, 1, 0],
                  [0, 0, 0, 1]];
	
	return result;	
};

function MP(y,x)
{
	var temp = [];
    
   
	
    for (var i = 0; i < x.DimensionHomogenea() ; i++)
	{
       
		temp[i] = []
		temp[i][0] = x.Get(i);
    }   
    
//    console.log('temp: ');
//      console.log( temp);
//   

	temp = MP1(y, temp);

	for (var i = 0; i < x.DimensionHomogenea() ; i++)
		x[i] = temp[i][0];

	return x;
};

function MP1(x,y)
{
//    console.log('y');
//    console.log(y);
    
	resultante = new Array(x.length);
	for(var j = 0;j < resultante.length;j++)
	     resultante[j] = new Array(y[0].length);
    
    //console.log('resultante');
    //console.log(resultante);
    
    for (var k = 0; k < y[0].length; k++)
		for (var i = 0; i < x.length; i++)
			for (var j = 0; j < x[0].length; j++)
				resultante[i][k] += x[i][j] * y[j][k];
    
    //console.log('resultante');
    //console.log(resultante);

	return resultante;
};

function Rotar(x,y,z, m)
{
    var result =  MP1(MRotarY(y), MRotarZ(z));
    
//       console.log('result');
//    console.log(result); 
    
//    console.log('m');
//    console.log(m); 
     
	var transformacion = MP1(MRotarX(x),result);

	newPoint = MP(transformacion, m);

	m.X = newPoint.X;
	m.Y = newPoint.Y;
	m.Z = newPoint.Z;

};