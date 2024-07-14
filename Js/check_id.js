//chequea si tiene 11 caracteres
function checkLength(text)
{
    if(text.length==11)
		return true;
	return false;
};

//chequea si todos los caracteres son numeros
//en la mayoria de los codigos los numeros estan entre el 48(0) y el 57(9)
function checkNumber(text)
{
    if(text.length==0)
		return false;
	
	for(var i = 0; i < text.length; i++)
	{
	    var characterCode = text.charCodeAt(i);
			
		if(characterCode < 48 || characterCode > 57)
		  return false;
	}
	
	return true;
};

//devuelve el ano
//busca desde el ano actual hacia atras cual coincide con los ultimos 2 digitos
//solo tiene en cuenta 100 anos
//(O J O)si se quiere tener en cuanto solo los que pueden ser mayor de edad se resta 16 a year 
function getYear(text)
{
    var yearId = text.substr(0,2);
	
	var year  = new Date().getFullYear();
		
	var yearStr = year.toString();	 
	while(yearStr.substr(yearStr.length - 2,2) !=  yearId)
	{
		year--;
		yearStr = year.toString();	 
	}
	
	return year; 
};

//devuelve  el mes
function getMonth(text)
{
    var tex = text.substr(2,2);
		
	return tex;
};

//devuelve el dia
function getDay(text)
{
    var tex = text.substr(4,2);
		
	return tex;
};

//dice si un ano es bisiesto
//p: Es divisible entre 4
//q: Es divisible entre 100
//r: Es divisible entre 400
//p && ('q || r)
function isALeapYear(year)
{
	return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
};

//devuelve los dias desl mes segun el mes y el ano (tiene en cuenta los anos bisiestos)
function daysOfMonth(month, year)
{
	if (month > 12 && month < 1)
	{
		return -1;
	}
	
	//month es un string, lo forzo a un entero,
	//estaba vago y no queria usar parseInt
	
	var realMonth = month/1;
	
	switch(realMonth)
	{
	    case 1:
		case 3:
		case 5:
		case 7:
		case 8:
		case 10:
		case 12:
			return 31; 
		case 2:
			{
				if(isALeapYear(year))
					return 29;
				else
				    return 28;
			}
		default:
			return 30;
		
	}
	
	return -1;
}

// chequea si los primeros 6 digitos forman una fecha 
function checkDate(text)
{
	if(text.length < 6)
		return false;
	
	var year  = getYear(text);
	var month = getMonth(text);
	var day   = getDay(text);
	
	return (month >= 1) && (month <= 12) && (day <= daysOfMonth(month, year)) && (day > 0) && (year > 0);
		
};

function checkId(text)
{
  if(!checkLength(text))
	return false;
  
  if(!checkNumber(text))
	return false;
  
  if(!checkDate(text))
    return false;
	
  var numbers = new Array();
  numbers[0] = 2;
  numbers[1] = 1;
  numbers[2] = 9;
  numbers[3] = 8;
  numbers[4] = 7;
  numbers[5] = 6;
  numbers[6] = 5;
  numbers[7] = 4;
  numbers[8] = 3;
  numbers[9] = 2;
    
  var suma = 0;
  for(var i = 0; i < numbers.length;i++)
  {
	suma += (numbers[i]*text[i]);
  }
  
  //alert(suma);
  
  var rest = suma%10;
  return (rest != 0)? (10 - rest) == text[10]: 0 == text[10];
	
};

//retorna el sexo 
//si el penultimo caracter no es una letra devuelve -1
//devuleve 0 si es hembra, 1 si es varon
function getSex(text)
{
   var characterCode = text.charCodeAt(9);
			
   if(characterCode < 48 || characterCode > 57)
	  return -1;
	  
   var number = characterCode - 48;
   
   return ( number%2 == 0)? 1: 0;   
}

//retorna la edad
function getAge(text)
{
	if(!checkId(text))
	   return -1;
   
	var year  = getYear(text);
	var month = getMonth(text);
	var day   = getDay(text);
	
	var ageDate = new Date(year,month,day);

	var nowDateY = new Date(); 
	
	nowDateY.setMonth(month - 1);
	nowDateY.setDate(day);
	
	var nowDate = new Date();
	
	var age = nowDate.getFullYear() - year;
	
	return (nowDate >= nowDateY)? age : age - 1; 
	
	
	
	
	
}




