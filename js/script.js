// JavaScript Document
onload=init;
var drop_array = new Array();
//vars to name the timers that make drops spawn and move every so often
var spawntimer;
var movetimer;
//creating a Bucket obj, instance of the Bucket class below. Not on stage yet.
var user_bucket = new Bucket(25,200);
function init(){
	//put that bucket on stage
		user_bucket.create();
		//when a key is pressed, do a function that responds depending on which key
		document.onkeydown = function(e){checkKey(e); };
	//set an interval to do the spawn function every 2 seconds
	spawntimer = setInterval(spawn,2000);
	//set an interval to move the drops 20 times a sec
	movetimer = setInterval(moveAllDrops,1000/20);
}

function checkKey(e){
	//set up the event again for certain browsers:
	e = e || window.event;
	//if it's the right arrow key...
	if(e.keyCode == '39'){
		//add to bucket's x (will move it a little to the right);
		user_bucket.x +=15;
		//change
		user_bucket.item_on_page.style.left = user_bucket.x + "px";
	}//close IF

//if it's the left arrow key...
		if(e.keyCode == '37'){
		//add to bucket's x (will move it a little to the right);
		user_bucket.x -=15;
		//change
		user_bucket.item_on_page.style.left = user_bucket.x + "px";
	}//close IF
}//close checkKey


function spawn() {
	//make an object based on the Drop Class:
	var anotherdrop = new Drop();
	anotherdrop.create();
	//add it to the array
	drop_array.push(anotherdrop);
}
function moveAllDrops(){
	//for each drop in the array
	for (var i=0; i < drop_array.length; i++){
		var currentdrop = drop_array[i];
		
		currentdrop.y +=5;
		//add to up-down position of drop (higher=lower on page)
		currentdrop.item_on_page.style.top = currentdrop.y + "px"
		
		//if the drop is low enough, destroy it
		if(currentdrop.y>250){
			currentdrop.destroy();
		}
	}//close FOR LOOP
}//end moveAllDrops
//let's make a Class (blueprint) for each Drop we generate

function Drop(){
	this.x; //starts empty, will keep track of each Drop's left-right position
	this.y; //starts empty, will keep track of each Drop's up-down position
	this.width = 50;
	this.height = 50;
	this.item_on_page;
	/** function does lots of things when a Drop gets created on the page
	*
	*/
	this.create = function(){
		//make a section element in the HTML, store it into the item-on-page we set up above.
		this.item_on_page = document.createElement("section");
		//store a random x and y position, different for each Drop. I'm using screen width or 500, height of 300:
		this.x = Math.floor(Math.random()*500);
		this.y = -25;//Math.floor(Math.random()*300);
		//use those x and y coordinates in the CSS to position the Drops:
		this.item_on_page.style.left = this.x + "px";
		this.item_on_page.style.top = this.y + "px";
		//attach the item to our HTML hierarchy, as a child of the body:
		document.getElementsByTagName("body")[0].appendChild(this.item_on_page);
	}
	/** function does lots of things when a Drop is removed from the page
	*
	*/
	this.destroy = function(){
		//create an animated splash GIF
		var newsplash = document.createElement("img");
		newsplash.src = "img/splash.gif?" +Math.random();
		//set its style: absolute, x & y
		newsplash.style.position = "absolute";
		newsplash.style.left = this.x + "px";
		newsplash.style.top = this.y + "px";
		//attach splash onto the page:
	document.getElementsByTagName("body")[0].appendChild(newsplash);
	document.getElementsByTagName("body")[0].removeChild(this.item_on_page);
		//figure out that coin's position in the array:
		var this_drops_index_num = drop_array.indexOf(this);
		//splice it out of the array
		drop_array.splice(this_drops_index_num,1);
		console.log(coin_array.length);
		
	}
} //close the Class

function Bucket(x, y){
	this.x = x; //starts empty, will keep track of each Drop's left-right position. Gets its value fram what was in () above.
	this.y = y;//starts empty, will keep track of each Drop's up-down position
	this.width = 100;
	this.height = 70;
	this.item_on_page;
	/** function does lots of things when a Drop gets created on the page
	*
	*/
	this.create = function(){
		//make a section element in the HTML, store it into the item-on-page we set up above.
		this.item_on_page = document.createElement("div");
		//use those x and y coordinates in the CSS to position the Bucket:
		this.item_on_page.style.left = this.x + "px";
		this.item_on_page.style.top = this.y + "px";
		//attach the item to our HTML hierarchy, as a child of the body:
		document.getElementsByTagName("body")[0].appendChild(this.item_on_page);
}
/** function does lots of things when a Drop gets created on the page
	*
	*/
	this.destroy = function(){
	}
}
