status="";
objects=[];
song="";

function preload(){
song = loadSound("alert3.mp3");
}

function setup(){
	canvas = createCanvas(380, 380);
	canvas.center();
	video = createCapture(VIDEO);
	video.size(380, 380);
	video.hide();
	objectDetector = ml5.objectDetector('cocossd', modelloaded);
	document.getElementById("status").innerHTML="status: detecting objects";
}

function modelloaded(){
	console.log("Model has been loaded.");
	status=true;
}

function gotResult(error, results){
	if(error){
		console.log(error);
	}
	else{
		console.log(results);
		objects=results;
	}
}

function draw(){
	image(video, 0 , 0, 380, 380);
	if(status!=""){
		objectDetector.detect(video, gotResult);
		random_r=random(255);
		random_g=random(255);
		random_b=random(255);
		for(i=0;i<objects.length;i++){
		document.getElementById("status").innerHTML="status:objects detected";
		document.getElementById("number_of_objects").innerHTML="Number of Objects Detected are:"+objects.length;
		fill(r, g, b);
		percent=floor(objects[i].confidence*100);
		text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
		noFill();
		stroke(r, g, b);
		rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
		if(objects[i]=="person"){
		document.getElementById("number_of_objects").innerHTML="Baby Found";
		song.stop();
		}
		else{
			document.getElementById("number_of_objects").innerHTML="Baby not Found!";
			song.play();
		}
	}
	}
}

function  start(){
	objectDetector = ml5.objectDetector('cocossd', modelloaded);
	document.getElementById("status").innerHTML="status: detecting objects";
}