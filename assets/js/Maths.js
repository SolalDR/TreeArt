
//Renvoi un nombre aléatoire entre a et b; 
function randomBetween(a, b){
	if(b < a) { 
		var t = a;  a = b; b = t; // Réordonne a et b 
	} 
	var diff = b - a; 
	var result = Math.random()*diff+a;
	return result;
}

//Prend en paramètre un tableau de probabilité et renvoi le rang de celui sélectionner
function randomMatrice(array){
	var s = 0; 
	for(i=0; i<array.length; i++){
		s+=array[i]; 
	}
	var r = Math.random()*s;
	
	var i = 0; 
	s = array[i];
	
	while(r > s){ 
		i++; 
		s+=array[i]; 
	}
	return i;
}

function percentToPx(value, context){
	regPercent = /\d+?\.?\d*?%/; 
	if(isNaN(value) && value.match(regPercent)){
		let percent = parseFloat(value.replace(/(.+?)%/, "$1"));
		value = context/100*percent;
	}
	return value; 
}

Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};
 
// Converts from radians to degrees.
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};