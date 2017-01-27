'use strict'

var createApp = function(svg) { 
	// common size for windows
	var windowSpacing = 2, floorSpacing = 3
	var windowHeight = 5, windowWidth = 3

	// colors of buildings
	var blgColors = [ 'red', 'blue', 'gray', 'orange'] 

	//build a building
	var build = function() {
		var floor = svg.clientHeight/2;
		var x0 = Math.random()*svg.clientWidth
		var blgWidth = (windowWidth+windowSpacing) * Math.floor(Math.random()*10)
		var blgHeight = Math.random()*svg.clientHeight

		var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
		newElement.setAttribute("x",x0);
		newElement.setAttribute("y",floor-blgHeight);
		newElement.setAttribute("width",blgWidth);
		newElement.setAttribute("height",blgHeight);
		newElement.setAttribute("style", "fill:"+blgColors[ Math.floor(Math.random()*blgColors.length)]);
		newElement.setAttribute("onclick", 'increaseHeight(evt)');
		svg.appendChild(newElement);
		
		for (var y = floor - floorSpacing; y > floor - blgHeight; y -= floorSpacing + windowHeight) {
			for (var x = windowSpacing; x < blgWidth - windowWidth; x += windowSpacing + windowWidth) {
				
				var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
				newElement.setAttribute("x",x0+x);
				newElement.setAttribute("y",y-windowHeight);
				newElement.setAttribute("width",windowWidth);
				newElement.setAttribute("height",windowHeight);	
				if(Math.floor(Math.random() * 2) == 0){
					newElement.setAttribute("style", "fill:yellow");
				}else{
					newElement.setAttribute("style", "fill:black");
				}
				svg.appendChild(newElement);
			}
		}
	}
	
	

	return {
		build: build
	}

}

function increaseHeight(evt) {
	var svgobj=evt.target;
	evt.target.setAttribute("height", parseInt(evt.target.getAttribute("height"))+5);
	evt.target.setAttribute("y", parseInt(evt.target.getAttribute("y"))-5);
	evt.target.setAttribute("style", evt.target.getAttribute("style"));
}

window.onload = function() {
	var svg = document.getElementsByTagName('svg')[0]; //Get svg element
	var app = createApp(svg);

	document.getElementById("build").onclick = app.build
}


