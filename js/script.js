let canvas,ctx; 
let workArea,divCanvas; 
let scrollCanvas;
var scale=-10; 
var width=3000; 
var height=3000; 
var visibleWeb=true; 
var fullScreen=false; 
var imgMouse = new Image();
var imgMaps=new Image(); 
var imgGhost=new Image(); 
var imgMapsPonton=new Image();
var imgMapsSkhodnya=new Image();
var imgMapsStairs=new Image();
var maps=new Array();
var direction=0;
var model=0;
var ponton = new Object();
var color='blue';
var mouseX=0;
var mouseY=0;
ponton.width = 1000;
ponton.height = 2000;
ponton.price = 16800;
ponton.col = 0;
var gangway = new Object();
gangway.width = 1000;
gangway.height = 2000;
gangway.price = 9460;
gangway.col = 0;
var stairs = new Object();
stairs.price = 18560;
stairs.col = 0;
var connector = new Object();
connector.price = 280;
connector.col = 0;
var stays = new Object();
stays.price = 890;
stays.col = 0;
var sitconnect = new Object();
sitconnect.price = 12500;
sitconnect.col = 0;
var duck = new Object();
duck.col = 0;
duck.price = 0;

function init(){ 
	workArea = document.getElementById('workArea'); 
	divCanvas=document.getElementById('divCanvas'); 
	scrollCanvas=document.getElementById('scrollCanvas');
	canvas = document.getElementById('main'); 
	ctx = canvas.getContext('2d'); 
	scale=-10; 
	ctx.lineWidth = 2;
	visibleWeb=true; 
	fullScreen=false; 
	ctx.strokeStyle = 'white';
	for(var i=0;i<200;i++){ 
        maps[i]=new Array(); 
        for(var j=0;j<200;j++){ 
        	maps[i][j]=0;
        }
    } 
	imgMapsPonton.src = 'img/pontoonbutton.png'; 
	imgMapsSkhodnya.src = 'img/photo-objects-png/skhodnya/skhodnya_blue.png'; 
	imgMapsStairs.src='img/photo-objects-png/stairs/stairs-blue.png';
	draw(); 
	canvas.onmousemove = function(evt) {canvasMoveMouse(evt)};
	canvas.onclick=function(evt){canvasClick(evt)};
	canvas.onmousewheel=function(evt){
		if(direction==3) direction=-1;
		direction++;
		canvasMoveMouse(evt);
	};
} 

function change_color(id, colors){
	adress = "img/pontoon-" + id + ".png";
	color=id;
	document.getElementById('red').src = adress;
	document.getElementById('ch_c').style.background = colors;
	document.getElementById('ch_c').style.color = colors;
}

function onScrollCanvas(){
	draw();
}

function sum(){
	var sum = ponton.price * ponton.col + gangway.price * gangway.col + stairs.price * stairs.col + connector.price * connector.col + stays.price * stays.col + sitconnect.price * sitconnect.col;
	document.getElementById('summ').innerHTML = sum ,'руб.';
}

function area(){
	var width = ponton.width * ponton.col;
	var height = ponton.height *ponton.col;
	document.getElementById('gabarites').innerHTML = width + ' x ' + height +' м.';
}

function quantity(){
	document.getElementById('shetpon').innerHTML = ponton.col;
	document.getElementById('connector').innerHTML = connector.col;
	document.getElementById('gangway').innerHTML = gangway.col;
	document.getElementById('stays').innerHTML = stays.col;
	document.getElementById('connector').innerHTML = sitconnect.col;
	document.getElementById('duck').innerHTML = duck.col;
	document.getElementById('stairs').innerHTML = stairs.col;
}


function clearCanvas(){
	for(var i=0;i<200;i++){ 
        for(var j=0;j<200;j++){ 
        	maps[i][j]=0;
        }
	} 
	document.getElementById('summ').innerHTML = '0 руб.';
	document.getElementById('gabarites').innerHTML =  '0,0 x 0,0 м.'; 
	document.getElementById('shetpon').innerHTML = 0 ;
	draw();
}

function isArrange(x,y,model,direction){
	var countX, countY;
	switch (model){
		case 1:
			switch (direction){
				case 0:case 2:x--;y-=2;countX=2;countY=4;break;
				case 1:case 3:x-=2;countX=4;countY=2;break;
			}
			break;
		case 2:
			switch (direction){
				case 0:case 2:x--;y-=2;countX=2;countY=4;break;
				case 1:x-=2;y--;countX=4;countY=2;break;
				case 3:x-=2;countX=4;countY=2;break;
			}
			console.log(x,y);
			break;
		case 3:
			switch (direction){
				case 0:case 2:countX=1;countY=2;break;
				case 1:case 3:countX=2;countY=1;break;
			}
			break;
		case 4:
			switch (direction){
				case 0:case 2:countX=1;countY=2;break;
				case 1:case 3:countX=2;countY=1;break;
			}
			break;
	}
	for(var i=y;i<countY+y;i++){
		for(var j=x;j<countX+x;j++){
			if(maps[i][j]!=0){ 
				return false;
			}
		}
	}
	return true;
}

function canvasClick(evt){
	var x,y;
	x=Math.trunc((evt.offsetX)/(45+scale));
	y=Math.trunc((evt.offsetY)/(45+scale));
	if((isArrange(x,y,model,direction))||(model==3)){
		console.log("past");
		switch (model){
			case 1:
				ponton.col++;
				switch (direction){
					case 0:
						x--;y-=2;
						for (var i=y;i<y+4;i++){
							for(var j=x;j<x+2;j++){
								maps[i][j]=11;
							}
						}
						switch (color){
							case 'red':maps[y][x]=12;break;
							case 'blue':maps[y][x]=1;break;
							case 'green':maps[y][x]=13;break;
							case 'white':maps[y][x]=14;break;
							case 'gray':maps[y][x]=15;break;
						}
						break;
					case 1:
						x-=2;
						for (var i=y;i<y+2;i++){
							for(var j=x;j<x+4;j++){
								maps[i][j]=11;
							}
						}
						switch (color){
							case 'red':maps[y][x]=-102;break;
							case 'blue':maps[y][x]=-10;break;
							case 'green':maps[y][x]=-103;break;
							case 'white':maps[y][x]=-104;break;
							case 'gray':maps[y][x]=-105;break;
						}
						break;
					case 2:
						x--;y-=2;
						for (var i=y;i<y+4;i++){
							for(var j=x;j<x+2;j++){
								maps[i][j]=11;
							}
						}
						switch (color){
							case 'red':maps[y][x]=-12;break;
							case 'blue':maps[y][x]=-1;break;
							case 'green':maps[y][x]=-13;break;
							case 'white':maps[y][x]=-14;break;
							case 'gray':maps[y][x]=-15;break;
						}
						break;
					case 3:
						x-=2;
						for (var i=y;i<y+2;i++){
							for(var j=x;j<x+4;j++){
								maps[i][j]=11;
							}
						}
						switch (color){
							case 'red':maps[y][x]=102;break;
							case 'blue':maps[y][x]=10;break;
							case 'green':maps[y][x]=103;break;
							case 'white':maps[y][x]=104;break;
							case 'gray':maps[y][x]=105;break;
						}
						break;
				}
				break;
			case 2:
				gangway.col++;
				switch (direction){
					case 0:
						x--;y-=2;
						for (var i=y;i<y+4;i++){
							for(var j=x;j<x+2;j++){
								maps[i][j]=22;
							}
						}
						maps[y][x]=2;
						maps[y][x+1]=1222;
						break;
					case 1:
						x-=2;y--;
						for (var i=y;i<y+2;i++){
							for(var j=x;j<x+4;j++){
								maps[i][j]=22;
							}
						}

						maps[y+1][x]=1222;
						maps[y][x]=-20;
						break;
					case 2:
						x--;y-=2;
						for (var i=y;i<y+4;i++){
							for(var j=x;j<x+2;j++){
								maps[i][j]=22;
							}
						}
						maps[y][x+1]=1222;
						maps[y][x]=-2;
						break;
					case 3:
						x-=2;
						for (var i=y;i<y+2;i++){
							for(var j=x;j<x+4;j++){
								maps[i][j]=22;
							}
						}
						maps[y+1][x]=1222;
						maps[y][x]=20;
						break;
				}
				break;
			case 3:
				stairs.col++;
				console.log(maps);
				isArrangeStairs(x,y,direction,evt.offsetX,evt.offsetY);
				
				break;
			case 4:
				connector.col++;
				switch (direction){
					case 0:
						for (var i=y;i<y+2;i++){
							for(var j=x;j<x+1;j++){
								maps[i][j]=11;
							}
						}
						maps[y][x]=4;
						break;
					case 1:
						for (var i=y;i<y+1;i++){
							for(var j=x;j<x+2;j++){
								maps[i][j]=11;
							}
						}
						maps[y][x]=-40;
						break;
					case 2:
						for (var i=y;i<y+2;i++){
							for(var j=x;j<x+1;j++){
								maps[i][j]=11;
							}
						}
						maps[y][x]=-4;
						break;
					case 3:
						for (var i=y;i<y+1;i++){
							for(var j=x;j<x+2;j++){
								maps[i][j]=11;
							}
						}
						maps[y][x]=40;
						break;
				}
				break;
			case 5:
				stays.col++;
				switch (direction){
					
					case 0:
						for (var i=y;i<y+2;i++){
							for(var j=x;j<x+1;j++){
								maps[i][j]=11;
							}
						}
						maps[y][x]=5;
						break;
					case 1:
						for (var i=y;i<y+1;i++){
							for(var j=x;j<x+2;j++){
								maps[i][j]=11;
							}
						}
						maps[y][x]=-50;
						break;
					case 2:
						for (var i=y;i<y+2;i++){
							for(var j=x;j<x+1;j++){
								maps[i][j]=11;
							}
						}
						maps[y][x]=-5;
						break;
					case 3:
						for (var i=y;i<y+1;i++){
							for(var j=x;j<x+2;j++){
								maps[i][j]=11;
							}
						}
						maps[y][x]=50;
						break;
				}
				break;
			case 6:
				sitconnect.col++;
				switch (direction){
					
					case 0:
						for (var i=y;i<y+2;i++){
							for(var j=x;j<x+1;j++){
								maps[i][j]=11;
							}
						}
						maps[y][x]=6;
						break;
					case 1:
						for (var i=y;i<y+1;i++){
							for(var j=x;j<x+2;j++){
								maps[i][j]=11;
							}
						}
						maps[y][x]=-60;
						break;
					case 2:
						for (var i=y;i<y+2;i++){
							for(var j=x;j<x+1;j++){
								maps[i][j]=11;
							}
						}
						maps[y][x]=-6;
						break;
					case 3:
						for (var i=y;i<y+1;i++){
							for(var j=x;j<x+2;j++){
								maps[i][j]=11;
							}
						}
						maps[y][x]=60;
						break;
				}
				break;
			case 7:
				duck.col++;
				switch (direction){
					case 0:
						for (var i=y;i<y+2;i++){
							for(var j=x;j<x+1;j++){
								maps[i][j]=11;
							}
						}
						maps[y][x]=7;
						break;
					case 1:
						for (var i=y;i<y+1;i++){
							for(var j=x;j<x+2;j++){
								maps[i][j]=11;
							}
						}
						maps[y][x]=-70;
						break;
					case 2:
						for (var i=y;i<y+2;i++){
							for(var j=x;j<x+1;j++){
								maps[i][j]=11;
							}
						}
						maps[y][x]=-7;
						break;
					case 3:
						for (var i=y;i<y+1;i++){
							for(var j=x;j<x+2;j++){
								maps[i][j]=11;
							}
						}
						maps[y][x]=70;
						break;
				}
				break;
		}
	}
	sum();
	area();
	draw();
	quantity()
}

function canvasMoveMouse(evt){
	draw();
	var x,y;
	x=Math.trunc((evt.offsetX)/(45+scale))*(45+scale);
	y=Math.trunc((evt.offsetY)/(45+scale))*(45+scale);
	switch (model){
		case 1:
			switch (color){
				case 'red':imgMouse.src = 'img/pontoon-redbutton.png';break;
				case 'blue':imgGhost.src='img/photo-objects-png/ponton/blue-opacity.png';imgMouse.src = 'img/pontoonbutton.png';break;
				case 'green':imgMouse.src = 'img/pontoon-green.png';break;
				case 'white':imgMouse.src = 'img/pontoonbutton.png';break;
				case 'gray':imgMouse.src = 'img/pontoon-gray.png';break;
			}
			switch (direction){
				case 0:case 2:
					if(isArrange(x/(45+scale),y/(45+scale),model,direction)){
						ctx.save();
						ctx.translate(x,y);
						ctx.rotate(180*Math.PI/180);
						ctx.drawImage(imgGhost, 0-(45+scale), 0-(45+scale)*2, (45+scale)*2, (45+scale)*4);
						ctx.restore();
					}
					ctx.save();
					ctx.translate(evt.offsetX+((45+scale)*4/2),evt.offsetY+((45+scale)*8/2));
					ctx.rotate(180*Math.PI/180);
					ctx.drawImage(imgMouse, 0+(45+scale), 0+(45+scale)*2, (45+scale)*2, (45+scale)*4);
					ctx.restore();
					break;
				case 1:case 3:
					if(isArrange(x/(45+scale),y/(45+scale),model,direction)){
						ctx.save();
						ctx.translate(x,y);
						ctx.rotate(90*Math.PI/180);
						ctx.drawImage(imgGhost, 0, 0-(45+scale)*2, (45+scale)*2, (45+scale)*4);
						ctx.restore();
					}
					ctx.save();
					ctx.translate(evt.offsetX+((45+scale)*4/2),evt.offsetY+((45+scale)*8/2));
					ctx.rotate(90*Math.PI/180);
					ctx.drawImage(imgMouse, 0-(45+scale)*5, 0, (45+scale)*2, (45+scale)*4);
					ctx.restore();
					break;
			} 
			break;
		case 2:
			
			switch (color){
				case 'red':imgMouse.src = 'img/pontoon-redbutton.png';break;
				case 'blue':imgGhost.src='img/photo-objects-png/skhodnya/skhodnya_blue_ghost.png';imgMouse.src = 'img/photo-objects-png/skhodnya/skhodnya_blue.png';break;
				case 'green':imgMouse.src = 'img/pontoon-green.png';break;
				case 'white':imgMouse.src = 'img/pontoonbutton.png';break;
				case 'gray':imgMouse.src = 'img/pontoon-gray.png';break;
			}
			switch (direction){
				case 0:
					if(isArrange(x/(45+scale),y/(45+scale),model,direction)){
						ctx.save();
						ctx.translate(x,y);
						ctx.rotate(0*Math.PI/180);
						ctx.drawImage(imgGhost, 0-(45+scale), 0-(45+scale)*2, (45+scale)*2, (45+scale)*4);
						ctx.restore();
					}
					ctx.save();
					ctx.translate(evt.offsetX+((45+scale)*4/2),evt.offsetY+((45+scale)*8/2));
					ctx.rotate(0*Math.PI/180);
					ctx.drawImage(imgMouse, 0-(45+scale)*3, 0-(45+scale)*6, (45+scale)*2, (45+scale)*4);
					ctx.restore();
					break;
				case 2:
					if(isArrange(x/(45+scale),y/(45+scale),model,direction)){
						ctx.save();
						ctx.translate(x,y);
						ctx.rotate(180*Math.PI/180);
						ctx.drawImage(imgGhost, 0-(45+scale), 0-(45+scale)*2, (45+scale)*2, (45+scale)*4);
						ctx.restore();
					}
					ctx.save();
					ctx.translate(evt.offsetX+((45+scale)*4/2),evt.offsetY+((45+scale)*8/2));
					ctx.rotate(180*Math.PI/180);
					ctx.drawImage(imgMouse, 0+(45+scale), 0+(45+scale)*2, (45+scale)*2, (45+scale)*4);
					ctx.restore();
					break;
				case 1:
					if(isArrange(x/(45+scale),y/(45+scale),model,direction)){
						ctx.save();
						ctx.translate(x,y);
						ctx.rotate(270*Math.PI/180);
						ctx.drawImage(imgGhost, 0-(45+scale), 0-(45+scale)*2, (45+scale)*2, (45+scale)*4);
						ctx.restore();
					}
					ctx.save();
					ctx.translate(evt.offsetX+((45+scale)*4/2),evt.offsetY+((45+scale)*8/2));
					ctx.rotate(270*Math.PI/180);
					ctx.drawImage(imgMouse, 0+(45+scale)*3,0-(45+scale)*4, (45+scale)*2, (45+scale)*4);
					ctx.restore();
					break;
				case 3:
					if(isArrange(x/(45+scale),y/(45+scale),model,direction)){
						ctx.save();
						ctx.translate(x,y);
						ctx.rotate(90*Math.PI/180);
						ctx.drawImage(imgGhost, 0, 0-(45+scale)*2, (45+scale)*2, (45+scale)*4);
						ctx.restore();
					}
					ctx.save();
					ctx.translate(evt.offsetX+((45+scale)*4/2),evt.offsetY+((45+scale)*8/2));
					ctx.rotate(90*Math.PI/180);
					ctx.drawImage(imgMouse, 0-(45+scale)*5, 0, (45+scale)*2, (45+scale)*4);
					ctx.restore();
					break;
			} 
			break;
		case 3:
			switch (color){
				case 'red':imgMouse.src = 'img/pontoon-redbutton.png';break;
				case 'blue':imgGhost.src='img/photo-objects-png/stairs/stairs-blue.png';imgMouse.src = 'img/photo-objects-png/stairs/stairs-blue.png';break;
				case 'green':imgMouse.src = 'img/pontoon-green.png';break;
				case 'white':imgMouse.src = 'img/pontoonbutton.png';break;
				case 'gray':imgMouse.src = 'img/pontoon-gray.png';break;
			}
			switch (direction){
				case 0:
					ctx.save();
					ctx.translate(evt.offsetX,evt.offsetY);
					ctx.rotate(0*Math.PI/180);
					ctx.drawImage(imgMouse, 0-(45+scale+15)/2, 0-(45+scale+15), (45+scale)+15, (45+scale)+15);
					ctx.restore();
					break;
				case 2:
					ctx.save();
					ctx.translate(evt.offsetX,evt.offsetY);
					ctx.rotate(180*Math.PI/180);
					ctx.drawImage(imgMouse, 0-(45+scale+15)+(45+scale)/2, 0-(45+scale+15), (45+scale)+15, (45+scale)+15);
					ctx.restore();
					break;
				case 1:
					ctx.save();
					ctx.translate(evt.offsetX,evt.offsetY);
					ctx.rotate(270*Math.PI/180);
					ctx.drawImage(imgMouse, 0-(45+scale),0-(45+scale), (45+scale)+15, (45+scale)+15);
					ctx.restore();
					break;
				case 3:
					ctx.save();
					ctx.translate(evt.offsetX,evt.offsetY);
					ctx.rotate(90*Math.PI/180);
					ctx.drawImage(imgMouse, 0-(45+scale)/2, 0-(45+scale+15), (45+scale)+15, (45+scale)+15);
					ctx.restore();
					break;
			} 
			break;
		case 4:
			switch (direction){
				case 0:imgMouse.src = 'img/test4.png'; ctx.drawImage(imgMouse, evt.offsetX, evt.offsetY, (45+scale), (45+scale)*2); break;
				case 2:imgMouse.src = 'img/test4Up.png'; ctx.drawImage(imgMouse, evt.offsetX, evt.offsetY, (45+scale), (45+scale)*2); break;
				case 1:imgMouse.src = 'img/test4Left.png'; ctx.drawImage(imgMouse, evt.offsetX, evt.offsetY, (45+scale)*2, (45+scale));break;
				case 3:imgMouse.src = 'img/test4Right.png'; ctx.drawImage(imgMouse, evt.offsetX, evt.offsetY, (45+scale)*2, (45+scale));break;
			}
			break;
		case 5:
			switch (direction){
				case 0:imgMouse.src = 'img/test5.png'; ctx.drawImage(imgMouse, evt.offsetX, evt.offsetY, (45+scale), (45+scale)*2); break;
				case 2:imgMouse.src = 'img/test5Up.png'; ctx.drawImage(imgMouse, evt.offsetX, evt.offsetY, (45+scale), (45+scale)*2); break;
				case 1:imgMouse.src = 'img/test5Left.png'; ctx.drawImage(imgMouse, evt.offsetX, evt.offsetY, (45+scale)*2, (45+scale));break;
				case 3:imgMouse.src = 'img/test5Right.png'; ctx.drawImage(imgMouse, evt.offsetX, evt.offsetY, (45+scale)*2, (45+scale));break;
			} 
			break;
		case 6:
			switch (direction){
				case 0:imgMouse.src = 'img/test6.png'; ctx.drawImage(imgMouse, evt.offsetX, evt.offsetY, (45+scale), (45+scale)*2); break;
				case 2:imgMouse.src = 'img/test6Up.png'; ctx.drawImage(imgMouse, evt.offsetX, evt.offsetY, (45+scale), (45+scale)*2); break;
				case 1:imgMouse.src = 'img/test6Left.png'; ctx.drawImage(imgMouse, evt.offsetX, evt.offsetY, (45+scale)*2, (45+scale));break;
				case 3:imgMouse.src = 'img/test6Right.png'; ctx.drawImage(imgMouse, evt.offsetX, evt.offsetY, (45+scale)*2, (45+scale));break;
			}
			break;
		case 7:
			switch (direction){
				case 0:imgMouse.src = 'img/test7.png'; ctx.drawImage(imgMouse, evt.offsetX, evt.offsetY, (45+scale), (45+scale)*2); break;
				case 2:imgMouse.src = 'img/test7Up.png'; ctx.drawImage(imgMouse, evt.offsetX, evt.offsetY, (45+scale), (45+scale)*2); break;
				case 1:imgMouse.src = 'img/test7Left.png'; ctx.drawImage(imgMouse, evt.offsetX, evt.offsetY, (45+scale)*2, (45+scale));break;
				case 3:imgMouse.src = 'img/test7Right.png'; ctx.drawImage(imgMouse, evt.offsetX, evt.offsetY, (45+scale)*2, (45+scale));break;
			}
			break;
	}
}

function isArrangeStairs(x,y,direction,mX,mY){
	if(((y<1)||(maps[y][x-2]==0))&&((y>198)||(maps[y][x+2]==0))){
		if((y>0)&&(maps[y-1][x]==0)&&(mY-y*(45+scale)<(45+scale)/2)){
			if((maps[y][x+1]==11)&&(maps[y+1][x]==11)&&(maps[y][x-1]!=555)&&(maps[y][x+2]!=556)){
				maps[y-1][x]=557;
				maps[y-1][x+1]=-557;
			}else{
				if((maps[y][x+1]==11)&&(maps[y+1][x]==11)&&(maps[y][x-1]==0)&&(maps[y+1][x-1]==0)&&((y==0)||(maps[y-1][x]!=557))&&(maps[y+2][x]!=558)){
					maps[y][x-1]=555;
					maps[y+1][x-1]=-555;
				}else{
					if(((maps[y][x-1]==1)||(maps[y][x-1]==-1)||(maps[y][x-1]==11))&&(maps[y+1][x]==11)&&(maps[y][x+1]==0)&&(maps[y+1][x+1]==0)&&(maps[y-1][x]!=-557)&&(maps[y+2][x]!=-558)){
						maps[y][x+1]=556;
						maps[y+1][x+1]=-556;
					}
				}
			}
		}else{
			if(((mY-y*(45+scale)>(45+scale)/2)||(maps[y-1][x]!=0)||(maps[y+1][x]!=0))&&(maps[y+1][x]!=0)){
				if(((maps[y][x+1]==11)||(maps[y-1][x]==1)||(maps[y][x-1]==-1))&&(maps[y+1][x]==11)&&(maps[y][x-1]==0)&&(maps[y+1][x-1]==0)&&((y==0)||(maps[y-1][x]!=557))&&((y==199)||(maps[y+2][x]!=558))){
					maps[y][x-1]=555;
					maps[y+1][x-1]=-555;
				}
				if(((maps[y][x-1]==1)||(maps[y][x-1]==-1)||(maps[y][x-1]==11))&&(maps[y+1][x]==11)&&(maps[y][x+1]==0)&&(maps[y+1][x+1]==0)&&((y==0)||(maps[y-1][x]!=-557))&&((y==199)||(maps[y+2][x]!=-558))){
					maps[y][x+1]=556;
					maps[y+1][x+1]=-556;
				}
			}else{
				if(((maps[y-4][x]==1)||(maps[y-4][x]==-1)||(maps[y][x+1]==11))&&(maps[y][x+1]==11)&&(maps[y+1][x+1]==0)&&(maps[y+1][x]==0)&&(maps[y][x-1]!=-555)&&(maps[y][x-1]!=-556)){
		 			maps[y+1][x]=558;
		 			maps[y+1][x+1]=-558;
		 		}
			}
		}	
	}else{
		if((y>0)&&(maps[y-1][x]==0)&&(mY-y*(45+scale)<(45+scale)/2)){
			if((maps[y][x+1]==11)&&(maps[y+1][x]==11)&&(maps[y][x-1]!=555)&&(maps[y][x+2]!=556)){
				maps[y-1][x]=557;
				maps[y-1][x+1]=-557;
			}else{
				if((maps[y][x+1]==11)&&(maps[y+1][x]==11)&&(maps[y][x-1]==0)&&(maps[y+1][x-1]==0)&&((y==0)||(maps[y-1][x]!=557))&&(maps[y+2][x]!=558)){
					maps[y][x-1]=555;
					maps[y+1][x-1]=-555;
				}else{
					if(((maps[y][x-1]==10)||(maps[y][x-1]==-10)||(maps[y][x-1]==11))&&(maps[y+1][x]==11)&&(maps[y][x+1]==0)&&(maps[y+1][x+1]==0)&&(maps[y-1][x]!=-557)&&(maps[y+2][x]!=-558)){
						maps[y][x+1]=556;
						maps[y+1][x+1]=-556;
					}
				}
			}
		}else{
			if(((mY-y*(45+scale)>(45+scale)/2)||(maps[y-1][x]!=0)||(maps[y+1][x]!=0))&&(maps[y+1][x]!=0)){
				if(((maps[y][x+1]==11)||(maps[y-1][x]==10)||(maps[y][x-1]==-10))&&(maps[y+1][x]==11)&&(maps[y][x-1]==0)&&(maps[y+1][x-1]==0)&&((y==0)||(maps[y-1][x]!=557))&&((y==199)||(maps[y+2][x]!=558))){
					maps[y][x-1]=555;
					maps[y+1][x-1]=-555;
				}
				if(((maps[y][x-1]==10)||(maps[y][x-1]==-10)||(maps[y][x-1]==11))&&(maps[y+1][x]==11)&&(maps[y][x+1]==0)&&(maps[y+1][x+1]==0)&&((y==0)||(maps[y-1][x]!=-557))&&((y==199)||(maps[y+2][x]!=-558))){
					maps[y][x+1]=556;
					maps[y+1][x+1]=-556;
				}
			}else{
				if(((maps[y-4][x]==10)||(maps[y-4][x]==-10)||(maps[y][x+1]==11))&&(maps[y][x+1]==11)&&(maps[y+1][x+1]==0)&&(maps[y+1][x]==0)&&(maps[y][x-1]!=-555)&&(maps[y][x-1]!=-556)){
		 			maps[y+1][x]=558;
		 			maps[y+1][x+1]=-558;
		 		}
			}
		}	
	}
}

function deleteObjectFromMouse(){
	model=0;
	draw();
}

function draw(){ 
	ctx.clearRect(0, 0, width, height); 
	var sizeX=45+scale; 
	var sizeY=45+scale; 
	var iStart=Math.trunc(scrollCanvas.scrollTop/(45+scale));
	var jStart=Math.trunc(scrollCanvas.scrollLeft/(45+scale));
	var iEnd=Math.trunc((scrollCanvas.clientHeight+scrollCanvas.scrollTop)/(45+scale));
	var jEnd=Math.trunc((scrollCanvas.clientWidth+scrollCanvas.scrollLeft)/(45+scale));
	sitconnect.col=0;
	for(var i=iStart-10;i<iEnd+10;i++){
		for(var j=jStart-10;j<jEnd+10;j++){
			if((i>=0)&&(j>=0)&&(i<200)&&(j<200)){
				if(maps[i][j]!=0){
					ctx.save();
					ctx.translate(sizeX*j+((45+scale)*4/2),sizeY*i+((45+scale)*8/2));
				}
				switch(maps[i][j]){
					case 11:break;
					case 0:
						if(visibleWeb){
							ctx.beginPath();
							ctx.strokeStyle = "#FFFFFF";
							ctx.strokeRect(sizeX*j, sizeY*i, sizeX, sizeY); 
							ctx.stroke(); 
						}
						break;
					case 1:case -1: 
						ctx.rotate(180*Math.PI/180);
						ctx.drawImage(imgMapsPonton, 0, 0, (45+scale)*2, (45+scale)*4);
						if((j>0)&&(maps[i][j-1]==555)){
							ctx.restore();
							ctx.save();
							ctx.translate(sizeX*j+((45+scale)*4/2),sizeY*i+((45+scale)*8/2));
							ctx.rotate(90*Math.PI/180);
							ctx.drawImage(imgMapsStairs, 0-(45+scale)*4, 0+(45+scale), (45+scale)+15, (45+scale)+15);
						}
						if((i>0)&&(maps[i-1][j]==557)){
							ctx.restore();
							ctx.save();
							ctx.translate(sizeX*j+((45+scale)*4/2),sizeY*i+((45+scale)*8/2));
							ctx.rotate(180*Math.PI/180);
							ctx.drawImage(imgMapsStairs, 0, 0+(45+scale)*3, (45+scale)+15, (45+scale)+15);
						}
						break;
					case 10:case -10: 
						ctx.rotate(90*Math.PI/180);
						ctx.drawImage(imgMapsPonton, 0-(45+scale)*4, 0-(45+scale)*2, (45+scale)*2, (45+scale)*4);
						if((j>0)&&(maps[i][j-1]==555)){
							ctx.restore();
							ctx.save();
							ctx.translate(sizeX*j+((45+scale)*4/2),sizeY*i+((45+scale)*8/2));
							ctx.rotate(90*Math.PI/180);
							ctx.drawImage(imgMapsStairs, 0-(45+scale)*4, 0+(45+scale), (45+scale)+15, (45+scale)+15);
						}
						if((i>0)&&(maps[i+1][j]==557)){
							ctx.restore();
							ctx.save();
							ctx.translate(sizeX*j+((45+scale)*4/2),sizeY*i+((45+scale)*8/2));
							ctx.rotate(180*Math.PI/180);
							ctx.drawImage(imgMapsStairs, 0, 0+(45+scale)*3, (45+scale)+15, (45+scale)+15);
						}
						break;
					case 12:case -12: imgMaps.src = 'img/pontoon-redbutton.png'; ctx.rotate(180*Math.PI/180);ctx.drawImage(imgMaps, 0-(45+scale)*2, 0-(45+scale)*4, (45+scale)*4, (45+scale)*8);break;
					case 102:case -102:imgMaps.src = 'img/pontoon-redbutton.png'; ctx.rotate(90*Math.PI/180);ctx.drawImage(imgMaps, 0-(45+scale)*4, 0-(45+scale)*6, (45+scale)*4, (45+scale)*8);break;
					case 13:case -13: imgMaps.src = 'img/pontoon-green.png'; ctx.rotate(180*Math.PI/180);ctx.drawImage(imgMaps, 0-(45+scale)*2, 0-(45+scale)*4, (45+scale)*4, (45+scale)*8);break;
					case 103:case -103:imgMaps.src = 'img/pontoon-green.png'; ctx.rotate(90*Math.PI/180);ctx.drawImage(imgMaps, 0-(45+scale)*4, 0-(45+scale)*6, (45+scale)*4, (45+scale)*8);break;
					case 14:case -14: imgMaps.src = 'img/pontoonbutton.png'; ctx.rotate(180*Math.PI/180);ctx.drawImage(imgMaps, 0-(45+scale)*2, 0-(45+scale)*4, (45+scale)*4, (45+scale)*8);break;
					case 104:case -104:imgMaps.src = 'img/pontoonbutton.png'; ctx.rotate(90*Math.PI/180);ctx.drawImage(imgMaps, 0-(45+scale)*4, 0-(45+scale)*6, (45+scale)*4, (45+scale)*8);break;
					case 15:case -15: imgMaps.src = 'img/pontoon-gray.png'; ctx.rotate(180*Math.PI/180);ctx.drawImage(imgMaps, 0-(45+scale)*2, 0-(45+scale)*4, (45+scale)*4, (45+scale)*8);break;
					case 105:case -105:imgMaps.src = 'img/pontoon-gray.png'; ctx.rotate(90*Math.PI/180);ctx.drawImage(imgMaps, 0-(45+scale)*4, 0-(45+scale)*6, (45+scale)*4, (45+scale)*8);break;
					case 2:   
						ctx.rotate(0*Math.PI/180);
						ctx.drawImage(imgMapsSkhodnya, 0-(45+scale)*2, 0-(45+scale)*4, (45+scale)*2, (45+scale)*4);
						break;
					case -2:  
						ctx.rotate(180*Math.PI/180);
						ctx.drawImage(imgMapsSkhodnya, 0, 0, (45+scale)*2, (45+scale)*4);
						break;
					case 20:   
						ctx.rotate(90*Math.PI/180);
						ctx.drawImage(imgMapsSkhodnya, 0-(45+scale)*4, 0-(45+scale)*2, (45+scale)*2, (45+scale)*4);
						break;
					case -20: 
						ctx.rotate(270*Math.PI/180);
						ctx.drawImage(imgMapsSkhodnya, 0+(45+scale)*2, 0-(45+scale)*2, (45+scale)*2, (45+scale)*4);
						break;	
					case 4:   imgMaps.src = 'img/test4.png'; ctx.drawImage(imgMaps, sizeX*j, sizeY*i, sizeX, sizeY*2);break;
					case -4:  imgMaps.src = 'img/test4Up.png'; ctx.drawImage(imgMaps, sizeX*j, sizeY*i, sizeX, sizeY*2);break;
					case 40:  imgMaps.src = 'img/test4Right.png'; ctx.drawImage(imgMaps, sizeX*j, sizeY*i, sizeX*2, sizeY);break;
					case -40: imgMaps.src = 'img/test4Left.png'; ctx.drawImage(imgMaps, sizeX*j, sizeY*i, sizeX*2, sizeY);break;
					case 5:   imgMaps.src = 'img/test5.png'; ctx.drawImage(imgMaps, sizeX*j, sizeY*i, sizeX, sizeY*2);break;
					case -5:  imgMaps.src = 'img/test5Up.png'; ctx.drawImage(imgMaps, sizeX*j, sizeY*i, sizeX, sizeY*2);break;
					case 50:  imgMaps.src = 'img/test5Right.png'; ctx.drawImage(imgMaps, sizeX*j, sizeY*i, sizeX*2, sizeY);break;
					case -50: imgMaps.src = 'img/test5Left.png'; ctx.drawImage(imgMaps, sizeX*j, sizeY*i, sizeX*2, sizeY);break;
					case 6:   imgMaps.src = 'img/test6.png'; ctx.drawImage(imgMaps, sizeX*j, sizeY*i, sizeX, sizeY*2);break;
					case -6:  imgMaps.src = 'img/test6Up.png'; ctx.drawImage(imgMaps, sizeX*j, sizeY*i, sizeX, sizeY*2);break;
					case 60:  imgMaps.src = 'img/test6Right.png'; ctx.drawImage(imgMaps, sizeX*j, sizeY*i, sizeX*2, sizeY);break;
					case -60: imgMaps.src = 'img/test6Left.png'; ctx.drawImage(imgMaps, sizeX*j, sizeY*i, sizeX*2, sizeY);break;
					case 7:   imgMaps.src = 'img/test7.png'; ctx.drawImage(imgMaps, sizeX*j, sizeY*i, sizeX, sizeY*2);break;
					case -7:  imgMaps.src = 'img/test7Up.png'; ctx.drawImage(imgMaps, sizeX*j, sizeY*i, sizeX, sizeY*2);break;
					case 70:  imgMaps.src = 'img/test7Right.png'; ctx.drawImage(imgMaps, sizeX*j, sizeY*i, sizeX*2, sizeY);break;
					case -70: imgMaps.src = 'img/test7Left.png'; ctx.drawImage(imgMaps, sizeX*j, sizeY*i, sizeX*2, sizeY);break;
				}
				if(maps[i][j]!=0){
					ctx.restore();
				}
			}
		}
	}
	for(var i=iStart-10;i<iEnd+10;i++){
		for(var j=jStart-10;j<jEnd+10;j++){
			if((i>=0)&&(j>=0)&&(i<200)&&(j<200)){
				if(maps[i][j]!=0){
					ctx.save();
					ctx.translate(sizeX*j+((45+scale)*4/2),sizeY*i+((45+scale)*8/2));
				}
				switch(maps[i][j]){
					case 1:case -1:
 						imgMaps.src = 'img/connector.png';
						for (var ii=i;ii<i+4;ii++){
							if((j>0)&&(maps[ii][j-1]==11)){
								ctx.restore();
								ctx.save();
								ctx.translate(sizeX*j,sizeY*(i+(ii-i)));
								ctx.rotate(90*Math.PI/180);
 								ctx.drawImage(imgMaps, 0, 0-sizeY/2, sizeX, sizeY);
								sitconnect.col++;
							}
							if((j>3)&&(((maps[ii][j-4]==20)||(maps[ii][j-4]==1222))&&((maps[ii+1][j-4]==20)||(maps[ii+1][j-4]==1222)||(maps[ii-1][j-4]==1222)||(maps[ii-1][j-4]==20)))){
								ctx.restore();
								ctx.save();
								ctx.translate(sizeX*j,sizeY*(i+(ii-i)));
								ctx.rotate(90*Math.PI/180);
 								ctx.drawImage(imgMaps, 0, 0-sizeY/2, sizeX, sizeY);
								sitconnect.col++;
							}
							if((j<199)&&(((maps[ii][j+2]==-20)||(maps[ii][j+2]==1222))&&((maps[ii+2][j+1]==-20)||(maps[ii+1][j+2]==1222)||(maps[ii-1][j+2]==1222)||(maps[ii-1][j+2]==-20)))){
								ctx.restore();
								ctx.save();
								ctx.translate(sizeX*(j+2),sizeY*(i+(ii-i)));
								ctx.rotate(90*Math.PI/180);
 								ctx.drawImage(imgMaps, 0, 0-sizeY/2, sizeX, sizeY);
								sitconnect.col++;
							}

						}
						for (var jj=j;jj<j+2;jj++){
							if((i>0)&&(maps[i-1][jj]==11)){
								ctx.restore();
								ctx.save();
								ctx.translate(sizeX*(j+(jj-j)+1),sizeY*i);
								ctx.rotate(180*Math.PI/180);
 								ctx.drawImage(imgMaps, 0, 0-sizeY/2, sizeX, sizeY);		
								sitconnect.col++;
							}
							if((i>3)&&(((maps[i-4][jj]==-2)||(maps[i-4][jj]==1222))&&((maps[i-4][jj-1]==-2)||(maps[i-4][jj-1]==1222)||(maps[i-4][jj+1]==1222)||(maps[i-4][jj+1]==-2)))){
								ctx.restore();
								ctx.save();
								ctx.translate(sizeX*(j+(jj-j)+1),sizeY*i);
								ctx.rotate(180*Math.PI/180);
 								ctx.drawImage(imgMaps, 0, 0-sizeY/2, sizeX, sizeY);		
								sitconnect.col++;
							}
							if((i<199)&&(((maps[i+4][jj]==2)||(maps[i+4][jj]==1222))&&((maps[i+4][jj-1]==2)||(maps[i+4][jj-1]==1222)||(maps[i+4][jj+1]==1222)||(maps[i+4][jj+1]==2)))){
								ctx.restore();
								ctx.save();
								ctx.translate(sizeX*(j+(jj-j)+1),sizeY*(i+4));
								ctx.rotate(180*Math.PI/180);
 								ctx.drawImage(imgMaps, 0, 0-sizeY/2, sizeX, sizeY);		
								sitconnect.col++;
							}
						}
						break;
					case 10:case -10: 
						imgMaps.src = 'img/connector.png';
						for (var ii=i;ii<i+2;ii++){
							if((j>0)&&(maps[ii][j-1]==11)){
								ctx.restore();
								ctx.save();
								ctx.translate(sizeX*j,sizeY*(i+(ii-i)));
								ctx.rotate(90*Math.PI/180);
 								ctx.drawImage(imgMaps, 0, 0-sizeY/2, sizeX, sizeY);		
								sitconnect.col++;
							}
							if((j<199)&&(((maps[ii][j+4]==-20)||(maps[ii][j+4]==1222))&&((maps[ii+2][j+4]==-20)||(maps[ii+1][j+4]==1222)||(maps[ii-1][j+4]==1222)||(maps[ii-1][j+4]==-20)))){
								ctx.restore();
								ctx.save();
								ctx.translate(sizeX*(j+4),sizeY*(i+(ii-i)));
								ctx.rotate(90*Math.PI/180);
 								ctx.drawImage(imgMaps, 0, 0-sizeY/2, sizeX, sizeY);	
								sitconnect.col++;
							}
							if((j<199)&&(((maps[ii][j-4]==20)||(maps[ii][j-4]==1222))&&((maps[ii+2][j-4]==20)||(maps[ii+1][j-4]==1222)||(maps[ii-1][j-4]==1222)||(maps[ii-1][j-4]==20)))){
								ctx.restore();
								ctx.save();
								ctx.translate(sizeX*j,sizeY*(i+(ii-i)));
								ctx.rotate(90*Math.PI/180);
 								ctx.drawImage(imgMaps, 0, 0-sizeY/2, sizeX, sizeY);	
								sitconnect.col++;
							}
						}
						for (var jj=j;jj<j+4;jj++){
							if((i>0)&&(maps[i-1][jj]==11)){
								ctx.restore();
								ctx.save();
								ctx.translate(sizeX*(j+(jj-j)+1),sizeY*i);
								ctx.rotate(180*Math.PI/180);
 								ctx.drawImage(imgMaps, 0, 0-sizeY/2, sizeX, sizeY);
								sitconnect.col++;
							}
							if((i<198)&&(((maps[i+2][jj]==2)||((maps[i+2][jj]==1222)&&(maps[i+2][jj-1]==2)))&&((maps[i+2][jj-1]==2)||(maps[i+2][jj-1]==1222)||(maps[i+2][jj+1]==1222)||(maps[i+2][jj+1]==2)))){
								ctx.restore();
								ctx.save();
								ctx.translate(sizeX*(j+(jj-j+1)),sizeY*(i+2));
								ctx.rotate(180*Math.PI/180);
 								ctx.drawImage(imgMaps, 0, 0-sizeY/2, sizeX, sizeY);		
								sitconnect.col++;
							}
							if((i<199)&&(i>3)&&(((maps[i-4][jj]==-2)||((maps[i-4][jj]==1222)&&(maps[i-4][jj-1]==-2)))&&((maps[i-4][jj-1]==-2)||(maps[i-4][jj-1]==1222)||(maps[i-4][jj+1]==1222)||(maps[i-4][jj+1]==-2)))){
								ctx.restore();
								ctx.save();
								ctx.translate(sizeX*(j+(jj-j)+1),sizeY*(i));
								ctx.rotate(180*Math.PI/180);
 								ctx.drawImage(imgMaps, 0, 0-sizeY/2, sizeX, sizeY);		
								sitconnect.col++;
							}
						}
						break;						
					case -2:
						imgMaps.src = 'img/connector.png';
						for (var jj=j;jj<j+2;jj++){
							if((i<195)&&((maps[i+4][jj]==2)||((maps[i+4][jj]==1222)&&(maps[i+4][jj-1]==2)))){
								ctx.restore();
								ctx.save();
								ctx.translate(sizeX*(j+(jj-j+1)),sizeY*(i+4));
								ctx.rotate(180*Math.PI/180);
 								ctx.drawImage(imgMaps, 0, 0-sizeY/2, sizeX, sizeY);		
								sitconnect.col++;
							}
						}
						break;						
					case 20:
						imgMaps.src = 'img/connector.png';
						for (var ii=i;ii<i+2;ii++){
							if((j<195)&&((maps[ii][j+4]==-20)||((maps[ii][j+4]==1222)&&(maps[ii-1][j+4]==-20)))){
								ctx.restore();
								ctx.save();
								ctx.translate(sizeX*(j+4),sizeY*(i+(ii-i)));
								ctx.rotate(90*Math.PI/180);
 								ctx.drawImage(imgMaps, 0, 0-sizeY/2, sizeX, sizeY);	
								sitconnect.col++;
							}
						}
						break;
						
					case 555:
						ctx.rotate(90*Math.PI/180);
						ctx.drawImage(imgMapsStairs, 0-(45+scale)*4, 0, (45+scale)+15, (45+scale)+15);
						break;
					case 556:
						ctx.rotate(270*Math.PI/180);
						ctx.drawImage(imgMapsStairs, 0+(45+scale)*2, 0-(45+scale)*3, (45+scale)+15, (45+scale)+15);
						break;
					case 558:
						ctx.rotate(0*Math.PI/180);
						ctx.drawImage(imgMapsStairs, 0-(45+scale)*2, 0-(45+scale)*5, (45+scale)+15, (45+scale)+15);
						break;
					case 557:
						ctx.rotate(180*Math.PI/180);
						ctx.drawImage(imgMapsStairs, 0, 0+(45+scale)*2, (45+scale)+15, (45+scale)+15);
						break;
				}
				if(maps[i][j]!=0){
					ctx.restore();
				}
			}
		}
	}
} 

function visibleWebClick(){ 
	visibleWeb=!visibleWeb; 
	draw(); 
} 

function scalePlusClick(){ 
	if(scale<20){ 
		scale+=10; 
		canvas.width=(30+scale)*200; 
		canvas.height=(30+scale)*200; 
		draw(); 
	} 
} 

function fullScreenStart(element) { 
	if(element.requestFullscreen) { 
		element.requestFullscreen(); 
	} else if(element.webkitrequestFullscreen) { 
		element.webkitRequestFullscreen(); 
	} else if(element.mozRequestFullscreen) { 
		element.mozRequestFullScreen(); 
	} 
} 

function fullScreenClick(){ 
	fullScreen=!fullScreen; 
	if(fullScreen){ 
		fullScreenStart(workArea); 
		workArea.style.backgroundColor="#FFF"; 
		scrollCanvas.style.maxHeight=screen.height-(document.getElementById('footer').clientHeight+document.getElementById('header').clientHeight)+'px';
	}else{ 
		document.exitFullscreen(); 
		scrollCanvas.style.maxHeight=450+'px';
	} 
	draw(); 
} 

function scaleMinusClick(){ 
	if(scale>-20){ 
		scale-=10; 
		canvas.width=(30+scale)*200; 
		canvas.height=(30+scale)*200; 
		draw(); 
	} 
} 

function model1onClick(){  
	imgMouse.src = 'img/test.png'; 
	model=1;
} 

function model2onClick(){
	imgMouse.src = 'img/test2.png'; 
	model=2;
} 

function model3onClick(){
	imgMouse.src = 'img/test3.png'; 
	model=3;
} 

function model4onClick(){
	imgMouse.src = 'img/test4.png'; 
	model=4;

} 

function model5onClick(){
	imgMouse.src = 'img/test5.png'; 
	model=5;
} 

function model6onClick(){
	imgMouse.src = 'img/test6.png'; 
	model=6;
} 

function model7onClick(){
	imgMouse.src = 'img/test7.png'; 
	model=7;
} 

document.addEventListener('DOMContentLoaded', init)