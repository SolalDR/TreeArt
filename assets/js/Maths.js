
//Renvoi un nombre aléatoire entre a et b; 
function randBetween(a, b){
	if(b < a) { 
		var t = a;  a = b; b = t; // Réordonne a et b 
	} 
	var diff = b - a; 
	var result = Math.random()*diff+a;
	return result;
}

function numSlice(value, nSlice, total) {
	var slicePas = total/(nSlice-1); 
	var rankSlice = 0; 
	var totalPas = slicePas; 
	while(value > totalPas) {
		rankSlice++; 
		totalPas+=slicePas;
	}
	if (value > total) {
		console.log("Rank may not exist because result > total")
	}
	return rankSlice; 
}

function colorBetween(progress, colorA, colorB){
	var splitA, splitB; 
	splitA = Math.colorSplit(colorA); 
	splitB = Math.colorSplit(colorB);

	var resultSplit = [];

	for(i=0; i<splitA.length; i++){
		splitA[i] = parseInt(splitA[i], 16);
		splitB[i] = parseInt(splitB[i], 16);
		if( splitA[i] > splitB[i] ){ var t = splitB[i];  splitB[i] = splitA[i]; splitA[i] = t; }// numA < numB; 
		resultSplit[i] = Math.round(progress*(splitB[i]-splitA[i])+splitA[i]); 
		resultSplit[i] = resultSplit[i].toString(16); 

	} 
	var result = "#"; 
	for(i=0; i<resultSplit.length; i++){
		result+=resultSplit[i]; 
	}
	return result; 
}

function progressBetween(progress, numA, numB) {
	if( numA > numB ){ var t = numB;  numB = numA; numA = t; }// numA < numB; 
	if( numA < progress && numB > progress ) {
		return (progress-numA)/(numB-numA);
		return;
	} 
	console.log("Value is not between the numbers");
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

//Prend un nombre 
Math.colorSplit = function(value){
	var hexReg = /(?:0x|#)([\da-f]{1,2})([\da-f]{1,2})([\da-f]{1,2})([\da-f]{1,2})?/i
	var a = value.match(hexReg); 
	var result = [];
	for(i=1; i<a.length; i++){
		if( a[i] ){
			result.push(a[i]); 
		}
	}
	return result; 
}

Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};
 
// Converts from radians to degrees.
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};