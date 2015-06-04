
var button = document.getElementById("butInput");
button.onclick = work;


function work(){
	var first = document.getElementById("txtOne").value;
	var second = document.getElementById("txtTwo").value;

	if (first == "" && second == "") {
		return;
	}

	// make sure no HTML tags get through

	first = first.replace(/<|>/g, "");
	second = second.replace(/<|>/g, "");

	// get radio button value and mingle or mangle accordingly

	var mnglResult;


	if (document.getElementById('sentence').checked) {
	  mnglResult = mingle(first, second);
	}
	else if (document.getElementById('word').checked) {
		mnglResult = mangle(first, second, false);
	}
	else if (document.getElementById('ecksWords').checked) {
		mnglResult = mangle(first, second, true);
	}
	else {
		return;
	}

	// display results yay!

	displayIt(mnglResult);

}


/***************************
****************************
				do mangling
****************************
****************************/

// mangle breaks each text into words and builds a composite of both texts alternating words from each

function mangle(first, second, xWds) {

	var randomate = document.getElementById('randomise').checked;

	//prepare input text for keeping caps after punctuation and preserving paragraphs

	first = paragRepl(first, false);
	first = lowerChar(first);
	first = noSpacesStart(first);
	second = paragRepl(second, false);
	second = lowerChar(second);
	second = noSpacesStart(second);

	// lowercase first char of second text

	second = second.charAt(0).toLowerCase() + second.slice(1);


	if(randomate === true) {
		first = first.charAt(0).toLowerCase() + first.slice(1);
	}

	// split into arrays

	var arrFirst = first.split(" ");
	var arrSecond = second.split(" ");

	if (xWds === true) {

		// get the number of words

		var numWords = Math.round(document.getElementById("numWords").value);
		numWords > 10 ? numWords = 10: numWords < 1? numWords = 1: numWords = numWords;


		arrFirst = everyEcks(arrFirst, numWords);
		arrSecond = everyEcks(arrSecond, numWords);
	}

	var allTogether = togetherIt(arrFirst,arrSecond);

	if(randomate === true) {
		allTogether = shuffle(allTogether);
		allTogether[0] = noSpacesStart(allTogether[0]);
		allTogether[0] = allTogether[0].charAt(0).toUpperCase() + allTogether[0].slice(1);
	}

	var mangling = allTogether.join(" ");

	//correct caps after punctuation

	mangling = upperChar(mangling);

	// always punctuate at end

	mangling = noSpacesEnd(mangling);



	// do parags

	var mngParags = mangling.split("(grarg) ");

	return prepParags(mngParags);

};


/***************************
****************************
				do mingling
****************************
****************************/

// mingle breaks texts into sentences and builds a composite of both by alternating sentences from each

function mingle(first, second){

	var randomate = document.getElementById('randomise').checked;

	//prepare input for keeping paragraphs

	first = paragRepl(first, true);
	second = paragRepl(second, true);

	//split into arrays, mangle, join

	first = highlightPunct(first);
	second = highlightPunct(second);

	var arrFirst = first.split("(puup)");
	var arrSecond = second.split("(puup)");

	var allTogether = togetherIt(arrFirst,arrSecond);

	if(randomate === true){
		allTogether = shuffle(allTogether);

		if (allTogether[0].search(/\(grarg\)/) !== -1){
			allTogether[0] = " " + allTogether[0];
		}
	}

	var mangling = allTogether.join(" ");

	// do paragraphs

	var mngParags = mangling.split(" (grarg)");

	return prepParags(mngParags);

};


/***************************
****************************
 			display stuffs
****************************
****************************/

function displayIt(mngld) {

		// get the display element and add display classes

		var display = document.getElementById("output");
		display.className = "text-display";
		document.getElementById("ocontainer").className = "ocontainer";
		document.getElementById("butblock").className += " odd";

		// wrap the paragraphs in <p> tags and put them in a string

		var arrLen = mngld.length;
		var par ="";

		for (var k = 0; k < arrLen; k++) {
			par += "<p>" + mngld[k] + "</p>";
		}

		// throw it all in

		display.innerHTML = par;

};


/***************************
****************************
 			helper functs
****************************
****************************/

// replace paragraphs with a recognizable string and remove empty paragraphs

function paragRepl(str, spaceBefore){
	str = str.replace(/\s*\r*\n*[\r\n]/g, function(match){
		if (spaceBefore === true){
			return " (grarg)";
		}
		else {
			return "(grarg) ";
		}
	});
	// str = str.replace(/\(grarg\)\s(?![A-Z])/g, "");
	return str;
}

// remove spaces at start of string

function noSpacesStart(str){
	if(str[0] === " ") {
		str = str.slice(1);
		return noSpacesStart(str);
	}
	else {
		return str;
	}

}

// remove spaces at end of string

function noSpacesEnd(str){
	if(str[str.length-1] === " ") {
		str = str.slice(0,-1);
		return noSpacesEnd(str);
	}
	else {
		return str;
	}

}

// punctuate all the paragraphs!

function punctParags(str){
	if	(str[str.length-1] !== "." && str[str.length-1] !== "?" && str[str.length-1] !== "!") {
		if	(str[str.length-1] === "," || str[str.length-1] === ";" || str[str.length-1] === ":") {

			str = str.slice(0,-1) + ".";
		}
		else {
			str += ".";
		}
	}

	return str;
}

// prepare paragraphs for display

function prepParags(arr) {

	var mngLen = arr.length;

	for (var l = 0; l < mngLen; l++) {

		//remove any empty paragraphs

		if(!/\S/.test(arr[l])){
			var trash = arr.splice(l,1);

			mngLen--;
			l--;

			continue;
		}

		// remove any spaces at beginning of paragraphs

		arr[l] = noSpacesStart(arr[l]);

		// remove any spaces at end of paragraphs

		arr[l] = noSpacesEnd(arr[l]);

		// punctuate

		arr[l] = punctParags(arr[l]);

	}

	return arr;
}

// highlight punctuation

function highlightPunct(str) {
	return str.replace(/(\.|\?|\!)(\s)/g , function(match, p1, p2){
		return p1 + "(puup)";
	})
}

// lowercase words at beginning of sentences

function lowerChar(str){
	return str.replace(/(\.\s|\?\s|\!\s|\(grarg\)\s)([A-Z])/g, function(match,p1,p2){
		return p1 + p2.toLowerCase();
	});
}

// uppercase words at beginning of sentences

function upperChar(str){
	return str.replace(/(\.\s|\?\s|\!\s|\(grarg\)\s)([a-z])/g, function(match,p1,p2){
		return p1 + p2.toUpperCase();
	});
}

// join every x items in array

function everyEcks(array, num){

	var arrLen = array.length;
	var multiple = "";
	var newArr = [];

	for (var i = 0; i < arrLen; i++){
		multiple += array[i];
		if (i+1 !== arrLen && i % num !== num - 1) {
			multiple += " ";
		}
		else if (i % num == num - 1 || i+1 === arrLen) {
			newArr.push(multiple);
			multiple = "";
		}
	}

	return newArr;
};

// shuffle array

function shuffle(array) {
  var currentIndex = array.length,
			temporaryValue,
			randomIndex;

  while (0 !== currentIndex) {

    // pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // swap it with the current element
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// mix two arrays together

function togetherIt(frst,sec){

	//get length of arrays

	var firstLen = frst.length;
	var secLen = sec.length;

	var mingleLen,
			leftOverLen,
			leftOvArr;

	//determine bigger one

	if (firstLen > secLen) {

		mingleLen = secLen;
		leftOverLen = firstLen - mingleLen;
		leftOvArr = frst;
	}

	else {
		mingleLen = firstLen;
		leftOverLen = secLen - mingleLen;
		leftOvArr = sec;
	}

	// put everything together

	var together = [];

	for (var i = 0; i < mingleLen; i++) {
		together.push(frst[i]);
		together.push(sec[i]);
	}

	for (var j = 0; j < leftOverLen; j++) {
		together.push(leftOvArr[mingleLen+j]);
	}

	return together;
};
