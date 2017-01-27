
//This dictionary attaches to each image-card its interval.
var intervalDict = {};

//A list of images that the image cards can display
var images1 = [
		'images/image1.png',
		'images/image2.png',
		'images/image3.png',
		'images/image4.png',
];
var images2 = [
		'images/image5.png',
		'images/image6.png',
		'images/image7.png',
		'images/image8.png',
];
var images3 = [
		'images/image9.png',
		'images/image10.png',
		'images/image11.png',
		'images/image12.png',
		'images/image13.png',
];
var images4 = [
		'images/image14.png',
		'images/image15.png',
		'images/image16.png',
		'images/image17.png',
		'images/image18.png',
];

//Attaches to each image-card, a list of potential images.
var imageBank = {};

window.onLoad = function(){
	intervalFactory("image1");
	intervalFactory("image2");
	intervalFactory("image3");
	intervalFactory("image4");
	
	imageBank["image1"] = images1;
	imageBank["image2"] = images2;
	imageBank["image3"] = images3;
	imageBank["image4"] = images4;
}(); 

//Create an interval for the designated image card.
function intervalFactory(id){
	
	//image number.
	var img = 0;
	
	//Add created interval to dictionary so that we can find it later using the id to turn the interval on or off.
	intervalDict[id] = setInterval(function(){
		img = (img+1) % imageBank[id].length;
		document.getElementById(id).src = imageBank[id][img];		
	}, (4.0+Math.random()+1) * 1000);
}

//Run when the start/stop button for any image card is pressed.
function imagePause(id, pressed){
	if(id in intervalDict){
		pressed.innerHTML = "Start!";
		clearInterval(intervalDict[id]);
		
		//In addition to ending the interval, we remove it from the dictionary to easier identify whether the interval is running or not.
		delete intervalDict[id];
	}else{
		pressed.innerHTML = "Stop!";
		intervalFactory(id);
	}
}
