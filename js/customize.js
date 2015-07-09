var check = 0 ;
var pioneerCube;
var targetObject;   //for setting in lockDown  :drag.js

var voxelNumber = 0 , voxelCoordinate = [] , voxel = [];
var voxelX , voxelY , voxelZ;
var currentObject = [] , objectOffset = [],voxelFlag = 0,paintFlag=0 , tubePosition = [];
var universalFlag=0;   //for 關閉模式 開啟模式
var layerLine,layerText,layerText2,paintObjects=[] ;
var layerOffset = 3;
var customeSize=20,customeHeight=20,customeFont;
var tubeThickness=3;
var cameraSphere;
var cameraAngle=Math.PI;
var cameraAmplitude = 100;
var newCameraPosition;
var cameraVector;
var designFlag=1;
var paintCubes = [];
var subtractObjects = [];
var subtract = false;
var treeFlag = false;
var house;
var window_bsp , windowPioneer ,houseFirstCheck=false;
var deleteHouse , intersectPoin , intersectObject;
var lastWindow;
var lastVoxel;
var cameraFlag = 0;
//---------------------

var actualMoveSpeed = 0;
	var heightSpeed = false;

	var target = new THREE.Vector3( 0, 0, 0 );



	var movementSpeed = 1.0;
	var lookSpeed = 0.005;

	var noFly = false;
	var lookVertical = true;
	var autoForward = false;

	var activeLook = true;

	var heightSpeed = false;
	var heightCoef = 1.0;
	var heightMin = 0.0;

	var constrainVertical = false;
	var verticalMin = 0;
	var verticalMax = Math.PI;

	var autoSpeedFactor = 0.0;

	var mouseX = 0;
	var mouseY = 0;

	var lat = 0;
	var lon = 0;
	var phi = 0;
	var theta = 0;

	var moveUp = false;
	var moveDown = false;
	var moveForward = false;
	var moveBackward = false;
	var moveLeft = false;
	var moveRight = false;
	var freeze = false;

	var mouseDragOn = false;
	
function customize() {
	
	var customGeom, material;
	

		
	custom = document.getElementById('custom').value;

	//var custom =  e.keyCode;
		
	var x = document.getElementById("font").selectedIndex;
	customeFont = document.getElementsByTagName("option")[x].value;
	customeSize = document.getElementById('textSize').value;
	customeHeight = document.getElementById('textHeight').value;
	
	scene.remove (textMesh);
	var material = new THREE.MeshPhongMaterial( {ambient: 0xff5533, color:0xffffff, specular: 0x111111, shininess: 200 } );
	customGeom = new THREE.TextGeometry( custom, {
			font: customeFont,
			size: customeSize,
			height: customeHeight
	});
		
	var j=objects.indexOf(textMesh);
		
	textMesh = new THREE.Mesh( customGeom, material );
	customGeom.computeBoundingBox();
	var textWidth = customGeom.boundingBox.max.x - customGeom.boundingBox.min.x;	
	textMesh.position.set( 0, 0, 0);  
	textMesh.rotation.x=Math.PI*1.5;
	sumCreator(textMesh,0);
	if (j!=-1)
		objects[j]=textMesh;
		

	
}


function stamp(){ 	
	
	var textSize = document.getElementById('stampTextSize').value;
	var text = document.getElementById('stampText').value;
	var length = cm(5);
	var textColor=0xdddddd, height=3 ,textFont='helvetiker';
	var textMaterial = new THREE.MeshPhongMaterial({
				color: textColor
	});
	var textGeom = new THREE.TextGeometry( text, {
				font: textFont,
				size: textSize,
				height: height,
				curveSegments: 2
	});
	var textMesh = new THREE.Mesh( textGeom, textMaterial );
	var textMeshFront = new THREE.Mesh( textGeom, textMaterial );
	textMesh.rotation.y = Math.PI;
	textMeshFront.rotation.y = Math.PI;
	
	textGeom.computeBoundingBox();
	var textWidth = textGeom.boundingBox.max.x - textGeom.boundingBox.min.x;	
	var textHeight = textGeom.boundingBox.max.y - textGeom.boundingBox.min.y;
	textMesh.position.set(textWidth/2,-textHeight/2,length/2+height);
	textMeshFront.position.set(textWidth/2,-textHeight/2,-length/2+height);
	var text_bsp = new ThreeBSP( textMesh );
	var textFront_bsp = new ThreeBSP( textMeshFront );
	
	
	
	
	var material = new THREE.MeshPhongMaterial( {ambient: 0xff5533, color:0xffffff, specular: 0x111111, shininess: 200 } );
	var cube = new THREE.CubeGeometry(textWidth+5, textHeight+5, length);     //here (textWidth+5, textHeight+5, length)
	var cube_mesh = new THREE.Mesh(cube,material);
	var cube_bsp = new ThreeBSP( cube_mesh );

	
	cube_bsp = logoCreator(cube_bsp,textHeight);
	
	console.time('operation');
	
	cube_bsp = cube_bsp.subtract( textFront_bsp );
	var union = cube_bsp.union( text_bsp );
	console.timeEnd('operation');
	console.time('mesh');
	var mesh = new THREE.Mesh( union.toGeometry(), material );
	
	sumCreator(mesh,(textHeight+5)/2);                                                //here textHeight+5/2
}

function logoCreator(cube_bsp,height){
	var textSize = 5;
	var textColor=0xdddddd, textHeight=5 ,textFont='helvetiker';
	
	var textGeom = new THREE.TextGeometry( "3Dink", {
				font: textFont,
				size: textSize,                                                      //here
				curveSegments: 2, 
				height: textHeight                                             //HERE TEXTHEIGHT                  
	});
	var textMaterial = new THREE.MeshPhongMaterial({
				color: textColor
	});
	textGeom.computeBoundingBox();
	var textWidth = textGeom.boundingBox.max.x - textGeom.boundingBox.min.x;	
	var textHeight = textGeom.boundingBox.max.y - textGeom.boundingBox.min.y;
	
	var textMesh = new THREE.Mesh( textGeom, textMaterial );
	textMesh.rotation.x = Math.PI*1.5;
	textMesh.position.set(-textWidth/2,height/2,0);
	var text_bsp = new ThreeBSP( textMesh );
	cube_bsp = cube_bsp.subtract( text_bsp );                                           //here
	
	
	
	var textMesh2 = new THREE.Mesh( textGeom, textMaterial );
	textMesh2.rotation.x = Math.PI/2;
	textMesh2.position.set(-textWidth/2,-height/2,0);
	var text_bsp2 = new ThreeBSP( textMesh2 );
	cube_bsp = cube_bsp.subtract( text_bsp2 );
	return cube_bsp;
}

function torusCreator(){
	var geometry = new THREE.TorusKnotGeometry( 25, 5, 100, 25 );
	var material = new THREE.MeshPhongMaterial( {ambient: 0xff5533, color:0xffffff, specular: 0x111111, shininess: 200 } );
	var torusKnot = new THREE.Mesh( geometry, material );
	torusKnot.position.set(0,0,0);
	sumCreator(torusKnot , 16);


}

function sphereCreator(){
	var material = new THREE.MeshPhongMaterial({ambient: 0xffff00, color: 0xffffff, specular: 0x555555, shininess: 200});

	var objectRadius = 25;
	var segments = 8;

	var sphereGeometry = new THREE.SphereGeometry( objectRadius, 32, 32 );		
	var sphere = new THREE.Mesh( sphereGeometry, material );
	
	sumCreator(sphere,objectRadius); 

	
//	currentOffset = objectRadius;
}

function cylinder(){
	var geometry = new THREE.CylinderGeometry( 25, 25, 75, 32 );
	var material = new THREE.MeshPhongMaterial({ambient: 0xffff00, color: 0xffffff, specular: 0x555555, shininess: 200});
	var cylinder = new THREE.Mesh( geometry, material );
	sumCreator(cylinder,75/2);
}

function shape(){

	var CustomSinCurve = THREE.Curve.create(
    function ( scale ) { //custom curve constructor
        this.scale = (scale === undefined) ? 1 : scale;
    },
    
    function ( t ) { //getPoint: t is between 0-1
        var tx = t * 3 - 1.5,
            ty = Math.sin( 2 * Math.PI * t ),
            tz = 0;
        
        return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
    }
	);

	var path = new CustomSinCurve( 10 );

	var geometry = new THREE.TubeGeometry(
		path,  //path
		20,    //segments
		5,     //radius
		50,     //radiusSegments
		false  //closed
	);
	var material = new THREE.MeshPhongMaterial({ambient: 0xffff00, color: 0xffffff, specular: 0x555555, shininess: 200});
	var mesh = new THREE.Mesh( geometry, material );
	sumCreator(mesh , 0); 
}

function torus(){

	var geometry = new THREE.TorusGeometry( 25, 3, 16, 100 );
	var material = new THREE.MeshPhongMaterial({ambient: 0xffff00, color: 0xffffff, specular: 0x555555, shininess: 200});
	var torus = new THREE.Mesh( geometry, material );
	sumCreator(torus , 0); 


}
function ringCreator(){
	var stl_bsp, text_bsp , STLGeometry;
	var loader = new THREE.STLLoader();
	var text = document.getElementById("ringText").value.split("");
	var textSize = 10 , radius=10 ,textMesh ;
//	var totalGeometry = new THREE.TorusGeometry( radius, 1,25,25);
//	var text = ['E','W','.','I','l','y','j','o','h','n'];
	text = text.reverse();
	var xPos,yPos,count = Math.floor(4*radius/text.length ), currentX=radius ,  currentY= 0 , averageDegree = (180/text.length)*(Math.PI/180) ,averageCharNumber = Math.ceil(text.length/4) , section=1 , charCount=0;
	var coordinateX = [],coordinateY = [];
	
	var material = new THREE.MeshPhongMaterial({
		color: 0xffffff,
		shininess: 30,
		specular: 0x555555
	});
	
	loader.addEventListener( 'load', function ( event ) {

		STLGeometry = event.content;	
	//	STLGeometry.computeBoundingBox();
		var mesh = new THREE.Mesh( STLGeometry, material ); 
		mesh.position.set( 0, 0, 0 );
		var csgMesh = THREE.CSG.toCSG(mesh);
		var boundingBox = mesh.geometry.boundingBox.clone();
			alert('bounding box coordinates: ' + 
			'(' + boundingBox.min.x + ', ' + boundingBox.min.y + ', ' + boundingBox.min.z + '), ' + 
			'(' + boundingBox.max.x + ', ' + boundingBox.max.y + ', ' + boundingBox.max.z + ')' );
		
		radius = Math.floor(mesh.geometry.boundingBox.max.x-mesh.geometry.boundingBox.min.x);
		stl_bsp = new ThreeBSP( mesh);
	
		
		
		for (var i=0 ; i < text.length ; i++){

		
		//	alert(text[i]);
			var textGeom = new THREE.TextGeometry( text[i], {
			font: 'optimer',
			size: textSize,
			height: 10
			
			});
			xPos = radius*Math.cos(averageDegree*i);
			yPos = radius*Math.sin(averageDegree*i);
			var tan = Math.atan2(xPos,yPos);
		//	alert(tan)
			textMesh  = new THREE.Mesh( textGeom, material );
			textMesh.position.set(xPos, yPos, 0); 
			textMesh.rotation.x = Math.PI/2
			textMesh.rotation.y = -tan;    		// modify character angle slightly
			
			var csgText = THREE.CSG.toCSG(textMesh);
			
			text_bsp = new ThreeBSP( textMesh);
		//	textMesh.rotation.x=Math.PI*1.5;
		//	THREE.GeometryUtils.merge(totalGeometry,textMesh);
			
			csgMesh = csgMesh.union( csgText);
			
			
		}
		
		var geometry = THREE.CSG.fromCSG(csgMesh);
		
		var mesh_union = new THREE.Mesh( stl_bsp.toGeometry() , material );
		
		
	
		
		
		mesh_union.rotation.x=Math.PI*0.5;
		mesh_union.position.set( 0, 0, 0 );
		mesh_union.rotation.set( Math.PI*1.5, 0, 0 );
		mesh_union.scale.set( 1, 1, 1 );

		mesh_union.castShadow = true;
		mesh_union.receiveShadow = true;
		
		
		
		sumCreator(mesh_union,0);

		
	} );
	
	
	
	
	
//	mesh.rotation.x=Math.PI*0.5;
//	mesh.rotation.z=Math.PI/2;


	

//	currentOffset = ;  
loader.load( 'stl/2.STL' );
}
function paintLayer(increment){
	

	if (increment == 1){
		line.position.y += layerOffset;          //tube radius
		plane.position.y +=layerOffset;
	}else{
		line.position.y -= layerOffset;
		plane.position.y -=layerOffset;
	}
	
	scene.remove(layerText);
	var material = new THREE.MeshPhongMaterial({
			color: 0xff0000 , transparent : true , opacity:0.5, side: THREE.DoubleSide
	});
	var textGeom = new THREE.TextGeometry("Tier"+line.position.y/layerOffset, {
			size: 10,
			height: 5
	});
	
	layerText = new THREE.Mesh( textGeom, material );
	layerText.position.set( 0,line.position.y, -100);  
	scene.add(layerText);
	document.getElementById("currentLayer").value= line.position.y/layerOffset;

}

function copyLayer(){
	var layer1 = document.getElementById("fromLayer").value;
	var layer2 = document.getElementById("toLayer").value;
	
	for (var i = 0; i < paintObjects.length ; i++){	

		if (paintObjects[i].position.y/layerOffset == layer1){
			var tube_Mesh = paintObjects[i].clone();
			tube_Mesh.position.y = layer2*layerOffset;
			scene.add(tube_Mesh);
			paintObjects.push(tube_Mesh);
			THREE.GeometryUtils.merge(geometryMerge, tube_Mesh);
			
		}

	}		
}

function copyLayers(){
	var layer1 = parseInt(document.getElementById("fromLayer").value);
	var layer2 = parseInt(document.getElementById("toLayer").value);
	for (var i = 0; i < paintObjects.length ; i++){	

		if (paintObjects[i].position.y/layerOffset == layer1){
			var boundary = Math.abs(layer2-layer1);
			for (var j = 1; j <= boundary ; j++){	
				var tube_Mesh = paintObjects[i].clone();
				if (layer2>layer1){
					tube_Mesh.position.y = (layer1+j)*layerOffset;
				}else 
					tube_Mesh.position.y = (layer1-j)*layerOffset;
				scene.add(tube_Mesh);
				paintObjects.push(tube_Mesh);
				THREE.GeometryUtils.merge(geometryMerge, tube_Mesh);
			}
		}

	}		
}

function painterCustomize(value){
	if (value == 1)
		document.getElementById("painter").innerHTML="小筆刷";
	else if (value == 3)
		document.getElementById("painter").innerHTML="中筆刷";
	else if (value == 5)
		document.getElementById("painter").innerHTML="大筆刷";
		
	tubeThickness = value;
}



function reStart(){
//	if (paintFlag){
//		geometryMerge = new THREE.Geometry();
//		clearObject();
//	}
	
	universalFlag = !universalFlag;
	var container = document.getElementById("div1");
	if (universalFlag){
		if (layerLine == null){
			
			var size = 200,step = 10;
			var geometry= new THREE.Geometry();
			var material = new THREE.LineBasicMaterial({color: 0x000000,side: THREE.DoubleSide,transparent:true , opacity:0});
			for (var i = -size ; i<=size ; i+=step){
				geometry.vertices.push(new THREE.Vector3(-size , -0.04 , i));
				geometry.vertices.push(new THREE.Vector3(size , -0.04 , i));
			
				geometry.vertices.push(new THREE.Vector3( i , -0.04 , -size ));
				geometry.vertices.push(new THREE.Vector3( i , -0.04 , size ));
			}
			layerLine = new THREE.Line ( geometry, material, THREE.LinePieces);
			scene.add(layerLine);
	/*		var geometry = new THREE.PlaneGeometry( 200, 200,100,100  );
			var material = new THREE.MeshBasicMaterial( {color: 0xff0000 , transparent : true , opacity:0.5, side: THREE.DoubleSide} );
			layerPlane = new THREE.Mesh( geometry, material );
			layerPlane.position.set(0,0,0);
			layerPlane.rotation.x=Math.PI/2;
			scene.add( layerPlane );  */
		}
		document.getElementById('3dpaint').value="關閉";
		container.addEventListener( 'mousemove', move, false );
		container.addEventListener( 'mousedown', down, false );
		container.addEventListener( 'mouseup', up, false );
		controls.enabled = false;
		document.getElementById('3dpaint').style.color="#ffffff";
		document.getElementById('3dpaint').style.background="red";
	}
	else{


		
		document.getElementById('3dpaint').value="開啟";
		check = 0;
		container.removeEventListener( 'mouseup', up, false );
		container.removeEventListener( 'mousemove', move, false );
		container.removeEventListener( 'mousedown', down, false );
		controls.enabled = true;
		layerLine.position.copy(line.position) ;
		
		
		scene.remove(layerText);
		var material = new THREE.MeshPhongMaterial({
				color: 0xff0000 , transparent : true , opacity:0.5, side: THREE.DoubleSide
		});
		var textGeom = new THREE.TextGeometry("Tier"+layerLine.position.y/layerOffset, {
				size: 10,
				height: 5
		});
		
		layerText2 = new THREE.Mesh( textGeom, material );
		layerText2.position.set( 0,layerLine.position.y, -100);  
		scene.add(layerText2);
		document.getElementById("currentLayer").value= layerLine.position.y/layerOffset;
		document.getElementById('3dpaint').style.color="#999999";
		document.getElementById('3dpaint').style.background="black";
	}
	paintFlag=0;
	
}
function intersectCheck(object,div){
	var container = document.getElementById(div);
	containerWidth = container.clientWidth;
	containerHeight = container.clientHeight;
	var projector = new THREE.Projector() , mouse = new THREE.Vector3();
	mouse.x = 2 * (event.clientX / containerWidth) - 1;
	mouse.y = 1 - 2 * ( event.clientY / containerHeight );
	var raycaster = projector.pickingRay( mouse.clone(), camera );
	var intersects = raycaster.intersectObject( object );
	return intersects;
}
	
	
function down(event){
	event.preventDefault();
	var intersects = intersectCheck( plane , "div1");
	if (intersects.length>0)
		check = 1;

}
function move(event){
	event.preventDefault();
	var length = 3;
	
	if (check && controls.enabled == false ){
		
		var intersects = intersectCheck( plane , "div1");
		
		if (intersects.length>0){
			var geometry = new THREE.CubeGeometry( length, length, length );
			var material = new THREE.MeshPhongMaterial({color: 0xff0000 , transparent : true , opacity:0.5 , side: THREE.DoubleSide});
			var cube = new THREE.Mesh( geometry, material );
			cube.position.copy( intersects[0].point );
			cube.position.y += length/2;
			scene.add( cube);
			paintCubes.push(cube); 	
			tubePosition.push(new THREE.Vector3(cube.position.x , 0 , cube.position.z));
		}else {
			return;
		}
		/*
		THREE.GeometryUtils.merge(geometryMerge, cube); */
		
		
	}
	
}
function up(event){
	event.preventDefault();
	
	var intersects = intersectCheck( plane , "div1");
	if (check && intersects.length>0){
		controls.enabled=false;
		
		if (paintCubes[0]){
			for (var i in paintCubes){
				scene.remove(paintCubes[i]);
			}
		}
		var pipeSpline = new THREE.SplineCurve3(tubePosition);
		var material = new THREE.MeshPhongMaterial( {ambient: 0xff5533, color:0xffffff, specular: 0x111111, shininess: 200 } );
		var tube = new THREE.TubeGeometry(pipeSpline, 50, tubeThickness, 6, false);
		
		var tube_Mesh = new THREE.Mesh( tube, material );
		tube_Mesh.position.y = plane.position.y;
		scene.add( tube_Mesh);
		paintObjects.push(tube_Mesh);
		THREE.GeometryUtils.merge(geometryMerge, tube_Mesh);
		tubePosition = [];	
		check = 0;
	//	geometryMerge.rotation.x=Math.PI/2;
	}
}



function voxelPainter(){
	if (voxelFlag)
		geometryMerge = new THREE.Geometry();
	
//	if (!voxel[0]){
//		clearObject();
//	}
	var container = document.getElementById("div1");
	if (controls.enabled){
		if (document.getElementById('voxelLength').value == 0){
			alert("方塊寬度尚未指定");
			return;
		}
		if (lastVoxel != null){
			if (document.getElementById('voxelLength').value != lastVoxel){
				alert("方塊不可同時存在兩種寬度，請先清除畫面");
				return;
			
			}
		}
		lastVoxel = document.getElementById('voxelLength').value;
		document.getElementById('minecraft').value="關閉MineCraft";
		controls.enabled = false;
		container.addEventListener( 'mousemove', voxelMove, false );
		container.addEventListener( 'mousedown', voxelDown, false );
		container.addEventListener( 'mouseup', voxelUp, false );
		document.getElementById('minecraft').style.color="#ffffff";
		document.getElementById('minecraft').style.background="red";
		
		window.removeEventListener( 'click', lockDown, false );
	//	renderer.domElement.removeEventListener( 'click', voxelLock, false );
	
	
	
	
		var helper = document.getElementById('helper');
		var helperback = document.getElementById('helperback');
		var content2 = document.getElementById("helperContent2");
		var content = document.getElementById("helperContent");
				
	
		helper.style.opacity = 1;
		helperback.style.opacity = .7;
		helper.style.height = 200;
		if (content.className == 'show'){
			document.getElementById("helperContent2").innerHTML = "<h2>MineCraft模式教學</h2>此模式可運用小方塊堆疊出任何模型，操作流程如下：<p>1. 輸入方塊的尺寸大小。<p> 2. 按下「MineCraft」便能開始創作。<p>3. 欲結束MineCraft模式，請務必點擊「關閉MineCraft模式」選項。";
			document.getElementById("helperContent2").style.opacity = 1;
			document.getElementById("helperContent").style.opacity = 0;
			content.className = 'hide';
			content2.className = 'show';
		}
		else{
			document.getElementById("helperContent").innerHTML = "<h2>MineCraft模式教學</h2>此模式可運用小方塊堆疊出任何模型，操作流程如下：<p>1. 輸入方塊的尺寸大小。<p> 2. 按下「MineCraft」便能開始創作。<p>3. 欲結束MineCraft模式，請務必點擊「關閉MineCraft模式」選項。";
			document.getElementById("helperContent").style.opacity = 1;
			document.getElementById("helperContent2").style.opacity = 0;
			content.className = 'show';
			content2.className = 'hide';
		}
	}else{
		controls.enabled = true;
		document.getElementById('minecraft').value="MineCraft";
		container.removeEventListener( 'mousemove', voxelMove, false );
		container.removeEventListener( 'mousedown', voxelDown, false );
		container.removeEventListener( 'mouseup', voxelUp, false );
		scene.remove(pioneerCube);
		document.getElementById('minecraft').style.color="#999999";
		document.getElementById('minecraft').style.background="black";
		window.addEventListener( 'click', lockDown, false );
	//	renderer.domElement.addEventListener( 'click', voxelLock, false );
	}
	voxelFlag=0;
}
function over(){
	
	if (!controls.enabled){
		container.removeEventListener( 'mousedown', voxelDown, false );
		scene.remove(pioneerCube);
	}
}
function out(){
	if (!controls.enabled){
		container.addEventListener( 'mousedown', voxelDown, false );
		scene.add(pioneerCube);
	}
}

function voxelMove(event){
	event.preventDefault();
	controls.enabled = false;
	updatePioneer();
	
}

/* function voxelPlacement(x , y ,z , length , point , index){
	
	if (x != 0){
		voxelX = voxelCoordinate[index].x + (x/2) + (length/2);
		voxelY = Math.ceil(point.y/length)*length;
		voxelZ = Math.ceil(point.z/length)*length;

	}
	else if (y != 0){
		voxelX = Math.ceil(point.x/length)*length;
		voxelY = voxelCoordinate[index].y + (y/2) + (length/2);
		voxelZ = Math.ceil(point.z/length)*length;
	}
	else if (z != 0){
		voxelX = Math.ceil(point.x/length)*length;
		voxelY = Math.ceil(point.y/length)*length;
		voxelZ = voxelCoordinate[index].z + (z/2) + (length/2);
		
		
	}
}
 */
function voxelPlacement(x , y ,z ,index){
	voxelX = voxelCoordinate[index].x + x;
	voxelY = voxelCoordinate[index].y + y;
	voxelZ = voxelCoordinate[index].z + z;
}

function voxelDown(event){
	event.preventDefault();
	controls.enabled = false;
	
	var length = document.getElementById('voxelLength').value*25;
	var materialArray = [];
/*	materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'img/grass.jpg' ) }));
	materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'img/grass.jpg' ) }));
	materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'img/grasstop.jpg' ) }));
	materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'img/dirt.jpg' ) }));
	materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'img/grass.jpg' ) }));
	materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'img/grass.jpg' ) }));   */     //minecraft style
		
/*	materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'img/crate.jpg' ) }));
	materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'img/crate.jpg' ) }));
	materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'img/crate.jpg' ) }));
	materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'img/crate.jpg' ) }));
	materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'img/crate.jpg' ) }));
	materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'img/crate.jpg' ) }));
*/	
	var intersects = intersectDetector(plane);
	var geometry = new THREE.CubeGeometry( length, length, length );
	//var material = new THREE.MeshFaceMaterial(materialArray);
	var material = new THREE.MeshPhongMaterial({ambient: 0xffff00, color: 0xffffff, specular: 0x555555, shininess: 200, side: THREE.DoubleSide});

	var cube = new THREE.Mesh( geometry, material );
	//for (var i in voxelCoordinate){
	//	if (voxelX == voxelCoordinate[i].x && voxelZ == voxelCoordinate[i].z && voxelY == voxelCoordinate[i].y)
	//		voxelY +=voxelY;
		
	//}
	
	cube.position.set( voxelX, voxelY , voxelZ );
	cube.name = "voxel."+voxelNumber;
	voxelNumber++;
	voxelCoordinate.push(cube.position);
	voxel.push(cube);
	scene.add ( cube );
	currentObject.push(cube);
	THREE.GeometryUtils.merge(geometryMerge, cube);
	
}
function voxelUp(event){
	event.preventDefault();
	
}

function updatePioneer(){
	scene.remove (pioneerCube);
	var length = document.getElementById('voxelLength').value*25;
	

	var intersects = intersectDetector(plane);
	var voxelIntersects;

	var geometry = new THREE.CubeGeometry( length, length, length );
	var material = new THREE.MeshBasicMaterial( {color: 0xff0000 , transparent : true , opacity:0.5} );
	pioneerCube = new THREE.Mesh( geometry, material );
	if (voxel.length>0){
		voxelIntersects = intersectsDetector(voxel);
		
		
		
		if (voxelIntersects.length > 0){
		
			var index = voxelIntersects[0].object.name.split('.')[1];
			if (voxelIntersects[0].point.x == (voxelCoordinate[index].x + length/2 )){
				voxelPlacement(length , 0 , 0  , index);
			}else if (voxelIntersects[0].point.x == (voxelCoordinate[index].x - length/2)){
				voxelPlacement(-length , 0 , 0  , index);
			}
			if (voxelIntersects[0].point.y == (voxelCoordinate[index].y + length/2 )){
				voxelPlacement(0 , length , 0  , index);
			}else if (voxelIntersects[0].point.y == (voxelCoordinate[index].y - length/2)){
				voxelPlacement(0 , -length , 0  , index);
			}
			if (voxelIntersects[0].point.z == (voxelCoordinate[index].z + length/2 )){
				voxelPlacement(0 , 0 , length  , index);
			}else if (voxelIntersects[0].point.z == (voxelCoordinate[index].z - length/2)){
				voxelPlacement(0 , 0 , -length  , index);
			}
		}else if (intersects.length > 0){
		
			voxelX = Math.ceil(intersects[0].point.x/length)*length;
			voxelY = length/2;
			voxelZ = Math.ceil(intersects[0].point.z/length)*length;
		}
	}else{
		voxelX = Math.ceil(intersects[0].point.x/length)*length;
		voxelY = length/2;
		voxelZ = Math.ceil(intersects[0].point.z/length)*length;
	}

	pioneerCube.position.set( voxelX, voxelY , voxelZ );
	scene.add ( pioneerCube );
}
function intersectDetector(object){
	var container = document.getElementById("div1");
	var containerWidth = container.clientWidth;
	var containerHeight = container.clientHeight;
	
	var projector = new THREE.Projector(), mouse = new THREE.Vector3();
	mouse.x = 2 * (event.clientX / containerWidth) - 1;
	mouse.y = 1 - 2 * ( event.clientY / containerHeight );
	var raycaster = projector.pickingRay( mouse.clone(), camera );
	var intersects = raycaster.intersectObject( object );
	return intersects;
}
function intersectsDetector(objects){
	var container = document.getElementById("div1");
	var containerWidth = container.clientWidth;
	var containerHeight = container.clientHeight;
	
	var projector = new THREE.Projector(), mouse = new THREE.Vector3();
	mouse.x = 2 * (event.clientX / containerWidth) - 1;
	mouse.y = 1 - 2 * ( event.clientY / containerHeight );
	var raycaster = projector.pickingRay( mouse.clone(), camera );
	var intersects = raycaster.intersectObjects( objects );
	return intersects;
}


function gCode(){

	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function(){
        if(xhr .readyState == 4){
            if (xhr.status === 200)
                Gbegin(xhr.responseText.trim());
				
        }
//	window.location = "http://140.127.220.81/exec.php";
	};
	xhr.open( 'GET', 'toGcode.php', true );
	xhr.send( null );

}
function designerOut(event){

	switch( event.keyCode ) {

		case 38: /*up*/
		case 87: /*W*/ moveForward = false; break;

		case 37: /*left*/
		case 65: /*A*/ moveLeft = false; break;

		case 40: /*down*/
		case 83: /*S*/ moveBackward = false; break;

		case 39: /*right*/
		case 68: /*D*/ moveRight = false; break;

		case 82: /*R*/ moveUp = false; break;
		case 70: /*F*/ moveDown = false; break;

	}

	
}
function designer(){
	var keys = { SP : 32, W : 87, A : 65, S : 83, D : 68, UP : 38, LT : 37, DN : 40, RT : 39 };
	var cosx = Math.atan2(camera.quaternion.x,0);
	var cosz = Math.atan2(camera.quaternion.z,0);
	var dist = 1;
	

//	this.domElement.addEventListener( 'contextmenu', function ( event ) { event.preventDefault(); }, false );

//	this.domElement.addEventListener( 'mousemove', bind( this, this.onMouseMove ), false );
//	this.domElement.addEventListener( 'mousedown', bind( this, this.onMouseDown ), false );
//	this.domElement.addEventListener( 'mouseup', bind( this, this.onMouseUp ), false );
	
	window.addEventListener( 'keydown', designerIn, false );
	//window.addEventListener( 'keyup', designerOut, false );
	
	camera.position.set(0,10,0);

	cameraSphere.position.set(0,10,-cameraAmplitude);
	
	
}

function designerIn(event){
	var translateStep = 0.05;
	var rotationStep = Math.PI / 180;
	
	switch( event.keyCode ) {
	
		
		case 38: /*up*/
		case 87: /*W*/ 
			moveForward = true; 
			
			var direction = new THREE.Vector3().subVectors(cameraSphere.position, camera.position);
			direction.multiplyScalar(translateStep);
			newCameraPosition =  new THREE.Vector3().addVectors(camera.position, direction);
			cameraVector = new THREE.Vector3().subVectors(newCameraPosition , camera.position);
			camera.position = newCameraPosition;
			cameraSphere.position =  new THREE.Vector3().addVectors(cameraSphere.position, direction);
			break;

		case 37: /*left*/
		case 65: /*A*/ 
			moveLeft = true; 
			cameraAngle += rotationStep; 
	
			cameraSphere.position.x = Math.sin(cameraAngle) * cameraAmplitude;
			cameraSphere.position.z = Math.cos(cameraAngle) * cameraAmplitude;
			break;

		case 40: /*down*/
		case 83: /*S*/
			moveBackward = true; 
			var direction = new THREE.Vector3().subVectors(cameraSphere.position, camera.position);
			direction.multiplyScalar(translateStep);
			camera.position =  new THREE.Vector3().subVectors(camera.position, direction);
			cameraSphere.position =  new THREE.Vector3().subVectors(cameraSphere.position, direction);
			break;

		case 39: /*right*/
		case 68: /*D*/ 
			moveRight = true; 
			cameraAngle -= rotationStep; 
	
			cameraSphere.position.x = Math.sin(cameraAngle) * cameraAmplitude;
			cameraSphere.position.z = Math.cos(cameraAngle) * cameraAmplitude;
			break;

//		case 82: /*R*/ moveUp = true; break;
//		case 70: /*F*/ moveDown = true; break;

//		case 81: /*Q*/ freeze = !freeze; break;

	}
	
	//camera.position.set(cameraSphere.position);
	
	controls = new THREE.TrackballControls( camera, renderer.domElement );
	controls.rotateSpeed = 1.0;
	 
	controls.noZoom = true;
	controls.noPan = true;
	 
	controls.staticMoving = false;
	controls.dynamicDampingFactor = 0.3;
	 
	controls.minDistance = 0.1;
	controls.maxDistance = 20000;
	 
	controls.keys = [16]; // [ rotateKey, zoomKey, panKey ]
	
//	designerRender();   

}
function fence(){
	

	var cubeSize = 1;
	var fenceHeight = 10;
	var fenceLength = document.getElementById("fenceLength").value;
	var interval = 10;
	fenceLength = fenceLength*interval;
	
	

	
	
	
	var material = new THREE.MeshPhongMaterial( {ambient: 0xffff00, color: 0xffffff, specular: 0x555555, shininess: 200} );
		
			
		
			
	var cube = new THREE.CubeGeometry(fenceLength, cubeSize, cubeSize);     //chair vertical stick(long)
	var temp_mesh = new THREE.Mesh(cube,material);
			
	var cube2 = new THREE.CubeGeometry(fenceLength, cubeSize, cubeSize);     //chair vertical stick(long)
	var temp_mesh2 = new THREE.Mesh(cube2,material);
		
		
			
	temp_mesh.position.set(fenceLength/2 , fenceHeight , 0);
	temp_mesh2.position.set(fenceLength/2 , fenceHeight*0.65 , 0);
		
		
	var temp = new ThreeBSP( temp_mesh );
	var temp2 = new ThreeBSP( temp_mesh2 );
			
		
	temp = temp.union( temp2 );
	
	for (var i=0 ; i <= fenceLength/interval ; i++){
		var cube3 = new THREE.CubeGeometry(cubeSize, fenceHeight, cubeSize);     //chair vertical stick(long)
		var temp_mesh3 = new THREE.Mesh(cube3,material);
		temp_mesh3.position.set(i*interval , fenceHeight/2 , 0);
		var temp3 = new ThreeBSP( temp_mesh3 );
		temp = temp.union( temp3 );
	}
	
	
		
		
	var mesh = new THREE.Mesh( temp.toGeometry(), material );
	mesh.position.set(0 , fenceHeight/2 , 0);
	furnitureCreator(mesh,fenceHeight);
	
}
	
function failDesigner(){



	var helper = document.getElementById('helper');
	var helperback = document.getElementById('helperback');
	var content2 = document.getElementById("helperContent2");
	var content = document.getElementById("helperContent");
					
	helper.style.opacity = 1;
	helperback.style.opacity = .7;
	helper.style.height = 180;
	if (content.className == 'show'){
		document.getElementById("helperContent2").innerHTML = "<h2>室內瀏覽模式</h2>此模式以第一人稱視角檢視物件，操作介紹如下：<p>1. 使用WASD控制移動方向。<p> 2. 使用滑鼠移動控制視角。<p>3. 開啟此模式後，點選滑鼠左鍵以正式開始瀏覽。<p>4. 欲恢復原瀏覽視角，請關閉此模式。";
		document.getElementById("helperContent2").style.opacity = 1;
		document.getElementById("helperContent").style.opacity = 0;
		content.className = 'hide';
		content2.className = 'show';
	}
	else{
		document.getElementById("helperContent").innerHTML = "<h2>室內瀏覽模式</h2>此模式以第一人稱視角檢視物件，操作介紹如下：<p>1. 使用WASD控制移動方向。<p> 2. 使用滑鼠移動控制視角。<p>3. 開啟此模式後，點選滑鼠左鍵以正式開始瀏覽。<p>4. 欲恢復原瀏覽視角，請關閉此模式。";
		document.getElementById("helperContent").style.opacity = 1;
		document.getElementById("helperContent2").style.opacity = 0;
		content.className = 'show';
		content2.className = 'hide';
	}
			
	var container = document.getElementById("div1");
		
	if (designFlag){
		document.getElementById('designer').style.color="#ffffff";
		document.getElementById('designer').style.background="red";
		camera.position.set(0,3,0);
		controls = new THREE.PointerLockControls( camera );
		scene.add( controls.getObject() );
		
		container.removeEventListener('keydown',keyboardMove,false); //zhen //清除移動圖檔，讓室內瀏覽移動	
		designFlag = !designFlag;
	}else{
		document.getElementById('designer').style.color="#999999";
		document.getElementById('designer').style.background="black";
		scene.remove(camera);
		var VIEW_ANGLE = 45, ASPECT = window.innerWidth/window.innerHeight, NEAR = 0.1, FAR = 20000;
		camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
		scene.add(camera);
		camera.position.set(0,50,200);
		// CONTROLS
		controls = new THREE.TrackballControls( camera, renderer.domElement );
		controls.rotateSpeed = 1.0;
		controls.zoomSpeed = 1.2;
		controls.panSpeed = 0.2;
		 
		controls.noZoom = false;
		controls.noPan = false;
		 
		controls.staticMoving = false;
		controls.dynamicDampingFactor = 0.3;
		 
		controls.minDistance = 0.1;
		controls.maxDistance = 20000;
		 
		controls.keys = [ 16, 17, 18 ]; // [ rotateKey, zoomKey, panKey ] 
		
		container.addEventListener('keydown',keyboardMove,false); //zhen 移動圖檔 
		designFlag = !designFlag;
	}
}

function chair(){
	

	var cubeSize = 2;
	var chairHeight = 20;
	
	var material = new THREE.MeshPhongMaterial( {ambient: 0xffff00, color: 0xffffff, specular: 0x555555, shininess: 200} );
	var cube = new THREE.CubeGeometry(cubeSize, cubeSize, cubeSize);     //here (textWidth+5, textHeight+5, length)
	var cube_mesh = new THREE.Mesh(cube,material);
	var cube_bsp = new ThreeBSP( cube_mesh );
		
	
		
	var cube = new THREE.CubeGeometry(cubeSize, cubeSize*chairHeight, cubeSize);     //chair vertical stick(long)
	var temp_mesh = new THREE.Mesh(cube,material);
		
	var cube2 = new THREE.CubeGeometry(cubeSize, cubeSize*chairHeight, cubeSize);     //chair vertical stick(long)
	var temp_mesh2 = new THREE.Mesh(cube2,material);
		
	var cube3 = new THREE.CubeGeometry(cubeSize, (cubeSize/2)*chairHeight, cubeSize);     //chair vertical stick(short)
	var temp_mesh3 = new THREE.Mesh(cube3,material);
		
	var cube4 = new THREE.CubeGeometry(cubeSize, (cubeSize/2)*chairHeight, cubeSize);     //chair vertical stick(short)
	var temp_mesh4 = new THREE.Mesh(cube4,material);
	
	var cube5 = new THREE.CubeGeometry(cubeSize*12, cubeSize*12, cubeSize/2);     //chair sit plane
	var temp_mesh5 = new THREE.Mesh(cube5,material);
		
	var cube6 = new THREE.CubeGeometry(cubeSize*10, cubeSize*5, cubeSize/2);     //chair back plane
	var temp_mesh6 = new THREE.Mesh(cube6,material);	
		
	var addon = new THREE.CubeGeometry(cubeSize*12, cubeSize, cubeSize);     //chair vertical stick(long)
	var addon_mesh = new THREE.Mesh(addon,material);
		
	var addon2 = new THREE.CubeGeometry(cubeSize, cubeSize, cubeSize*12);     //chair vertical stick(long)
	var addon_mesh2 = new THREE.Mesh(addon2,material);
		
	var addon3 = new THREE.CubeGeometry(cubeSize*12, cubeSize, cubeSize);     //chair vertical stick(short)
	var addon_mesh3 = new THREE.Mesh(addon3,material);
		
	var addon4 = new THREE.CubeGeometry(cubeSize, cubeSize, cubeSize*12);     //chair vertical stick(short)
	var addon_mesh4 = new THREE.Mesh(addon4,material);
		

		
	temp_mesh.position.set(0 , cubeSize*chairHeight/2 , 0);
	temp_mesh2.position.set(20 , cubeSize*chairHeight/2 , 0);
	temp_mesh3.position.set(0 , (cubeSize/2)*chairHeight/2 , 20);
	temp_mesh4.position.set(20 , (cubeSize/2)*chairHeight/2, 20);
		
	temp_mesh5.rotation.x = Math.PI/2;	
	temp_mesh5.position.set(10, (cubeSize/2)*chairHeight, 10);
		
	temp_mesh6.position.set(10, cubeSize*chairHeight*(4/5), 0);	
	
	addon_mesh.position.set(10, (cubeSize/4)*chairHeight, 20);	
	addon_mesh3.position.set(10, (cubeSize/4)*chairHeight, 0);	
	
	addon_mesh2.position.set(20, (cubeSize/4)*chairHeight, 10);	
	addon_mesh4.position.set(0, (cubeSize/4)*chairHeight, 10);	
	
	var temp = new ThreeBSP( temp_mesh );
	var temp2 = new ThreeBSP( temp_mesh2 );
	var temp3 = new ThreeBSP( temp_mesh3 );
	var temp4 = new ThreeBSP( temp_mesh4 );
	var temp5 = new ThreeBSP( temp_mesh5 );
	var temp6 = new ThreeBSP( temp_mesh6 );
	
	var temp7 = new ThreeBSP( addon_mesh );
	var temp8 = new ThreeBSP( addon_mesh2 );	
	var temp9 = new ThreeBSP( addon_mesh3 );
	var temp10 = new ThreeBSP( addon_mesh4 );	
		
	cube_bsp = cube_bsp.union( temp );
	cube_bsp = cube_bsp.union( temp2 );
	cube_bsp = cube_bsp.union( temp3 );
	cube_bsp = cube_bsp.union( temp4 );
	cube_bsp = cube_bsp.union( temp5 );
	cube_bsp = cube_bsp.union( temp6 );
	cube_bsp = cube_bsp.union( temp7 );
	cube_bsp = cube_bsp.union( temp8 );
	cube_bsp = cube_bsp.union( temp9 );
	cube_bsp = cube_bsp.union( temp10 );
	console.timeEnd('operation');
	console.time('mesh');
	

	var mesh = new THREE.Mesh( cube_bsp.toGeometry(), material );
	mesh.scale.set( 0.5, 0.5, 0.5 );
	furnitureCreator(mesh,0);
	

}


function desk(){
	var cubeSize = 2;
	var deskHeight = 10;
	
	var material = new THREE.MeshPhongMaterial( {ambient: 0xffff00, color: 0xffffff, specular: 0x555555, shininess: 200} );
	var cube = new THREE.CubeGeometry(cubeSize, cubeSize, cubeSize);     //here (textWidth+5, textHeight+5, length)
	var cube_mesh = new THREE.Mesh(cube,material);
	var cube_bsp = new ThreeBSP( cube_mesh );
		
	
		
	var cube = new THREE.CubeGeometry(cubeSize, cubeSize*deskHeight, cubeSize);     //desk vertical stick(long)
	var temp_mesh = new THREE.Mesh(cube,material);
		
	var cube2 = new THREE.CubeGeometry(cubeSize, cubeSize*deskHeight, cubeSize);     //desk vertical stick(long)
	var temp_mesh2 = new THREE.Mesh(cube2,material);
		
	var cube3 = new THREE.CubeGeometry(cubeSize, cubeSize*deskHeight, cubeSize);     //desk vertical stick(short)
	var temp_mesh3 = new THREE.Mesh(cube3,material);
		
	var cube4 = new THREE.CubeGeometry(cubeSize, cubeSize*deskHeight, cubeSize);     //desk vertical stick(short)
	var temp_mesh4 = new THREE.Mesh(cube4,material);
	
	var cube5 = new THREE.CubeGeometry(cubeSize*12, cubeSize*36, cubeSize/2);     //desk plane
	var temp_mesh5 = new THREE.Mesh(cube5,material);
		

		
	temp_mesh.position.set(0 , cubeSize*deskHeight/2 , 0);
	temp_mesh2.position.set(20 , cubeSize*deskHeight/2 , 0);
	temp_mesh3.position.set(0 , cubeSize*deskHeight/2 , 60);
	temp_mesh4.position.set(20 , cubeSize*deskHeight/2, 60);
		
	temp_mesh5.rotation.x = Math.PI/2;	
	temp_mesh5.position.set(10, cubeSize*deskHeight, 30);

	
	var temp = new ThreeBSP( temp_mesh );
	var temp2 = new ThreeBSP( temp_mesh2 );
	var temp3 = new ThreeBSP( temp_mesh3 );
	var temp4 = new ThreeBSP( temp_mesh4 );
	var temp5 = new ThreeBSP( temp_mesh5 );

		
	cube_bsp = cube_bsp.union( temp );
	cube_bsp = cube_bsp.union( temp2 );
	cube_bsp = cube_bsp.union( temp3 );
	cube_bsp = cube_bsp.union( temp4 );
	cube_bsp = cube_bsp.union( temp5 );

	console.timeEnd('operation');
	console.time('mesh');
	

	var mesh = new THREE.Mesh( cube_bsp.toGeometry(), material );
	mesh.scale.set( 0.5, 0.5, 0.5 );
	furnitureCreator(mesh,0)
}

function wall(){
	
	
	var cubeSize = 2;
	var size = 20;
	
	var material = new THREE.MeshPhongMaterial( {ambient: 0xffff00, color: 0xffffff, specular: 0x555555, shininess: 200} );	
	var cube = new THREE.CubeGeometry(size, size, cubeSize);     //here (textWidth+5, textHeight+5, length)
		
	var mesh = new THREE.Mesh(cube,material);

	furnitureCreator(mesh,size/2);
	subtractObjects.push(mesh);
}



function foundation(){
	
	var houseHeight = cm(document.getElementById("houseHeight").value);
	var houseWidth = cm(document.getElementById("houseWidth").value);
	var houseLength = cm(document.getElementById("houseLength").value);
	var houseThick = 2;
	
	
	var cubeSize = 10;
	var doorHeight = 25;
	var doorWidth = 15;
	
	
	//door
	var material = new THREE.MeshPhongMaterial( {color: 0xffffff} );             //Door
	var cube = new THREE.CubeGeometry(doorWidth, doorHeight, cubeSize);     //here (textWidth+5, textHeight+5, length)
	var cube_mesh = new THREE.Mesh(cube,material);
	cube_mesh.position.set(0 , doorHeight/2 , houseWidth/2);
	var door_bsp = new ThreeBSP( cube_mesh );
	
	
	//wall
	var material = new THREE.MeshPhongMaterial( {ambient: 0xffff00, color: 0xffffff, specular: 0x555555, shininess: 200, side: THREE.DoubleSide} );
	
		
	
		
	var cube = new THREE.CubeGeometry(houseLength, houseHeight, houseThick);     //desk vertical stick(long)
	var temp_mesh = new THREE.Mesh(cube,material);
		
	var cube2 = new THREE.CubeGeometry(houseWidth, houseHeight, houseThick);     //desk vertical stick(long)
	var temp_mesh2 = new THREE.Mesh(cube2,material);
		
	var cube3 = new THREE.CubeGeometry(houseLength, houseHeight, houseThick);     //desk vertical stick(long)
	var temp_mesh3 = new THREE.Mesh(cube3,material);
		
	var cube4 = new THREE.CubeGeometry(houseWidth, houseHeight , houseThick);     //desk vertical stick(long)
	var temp_mesh4 = new THREE.Mesh(cube4,material);
		

		
	temp_mesh.position.set(0 , houseHeight/2 , houseWidth/2);
	temp_mesh2.position.set(houseLength/2 , houseHeight/2 , 0);
	temp_mesh3.position.set(0 , houseHeight/2 , -houseWidth/2);
	temp_mesh4.position.set(-houseLength/2 , houseHeight/2 , 0);

	temp_mesh2.rotation.y = Math.PI/2;
	temp_mesh4.rotation.y = Math.PI/2;
	
	var temp = new ThreeBSP( temp_mesh );
	var temp2 = new ThreeBSP( temp_mesh2 );
	var temp3 = new ThreeBSP( temp_mesh3 );
	var temp4 = new ThreeBSP( temp_mesh4 );

		
	temp = temp.union( temp2 );
	temp = temp.union( temp3 );
	temp = temp.union( temp4 );
	temp = temp.subtract(door_bsp);
	//roof
	
	var geom = new THREE.Geometry();
	var v1 = new THREE.Vector3(houseLength/2 , houseHeight , houseWidth/2);
	var v2 = new THREE.Vector3(-houseLength/2 , houseHeight , houseWidth/2);
	var v3 = new THREE.Vector3(0 , houseHeight*1.5 , 0);
	geom.vertices.push( v1 );
	geom.vertices.push( v2 );
	geom.vertices.push( v3 );
	geom.faces.push( new THREE.Face3( 0, 1, 2 ) );
	geom.computeFaceNormals();
	

	
	
	var geom2 = new THREE.Geometry();
	
	var v1 = new THREE.Vector3(-houseLength/2 , houseHeight , houseWidth/2);
	var v2 = new THREE.Vector3(-houseLength/2 , houseHeight , -houseWidth/2);
	var v3 = new THREE.Vector3(0 , houseHeight*1.5 , 0);
	geom2.vertices.push( v1 );
	geom2.vertices.push( v2 );
	geom2.vertices.push( v3 );
	geom2.faces.push( new THREE.Face3( 0, 1, 2 ) );
	geom2.computeFaceNormals();
	
	var geom3 = new THREE.Geometry();
	var v1 = new THREE.Vector3(houseLength/2 , houseHeight , -houseWidth/2);
	var v2 = new THREE.Vector3(-houseLength/2 , houseHeight , -houseWidth/2);
	var v3 = new THREE.Vector3(0 , houseHeight*1.5 , 0);
	geom3.vertices.push( v1 );
	geom3.vertices.push( v2 );
	geom3.vertices.push( v3 );
	geom3.faces.push( new THREE.Face3( 0, 1, 2 ) );
	geom3.computeFaceNormals();
	
	
	
	var geom4 = new THREE.Geometry();
	var v1 = new THREE.Vector3(houseLength/2 , houseHeight , -houseWidth/2);
	var v2 = new THREE.Vector3(houseLength/2 , houseHeight , houseWidth/2);
	var v3 = new THREE.Vector3(0 , houseHeight*1.5 , 0);
	geom4.vertices.push( v1 );
	geom4.vertices.push( v2 );
	geom4.vertices.push( v3 );
	geom4.faces.push( new THREE.Face3( 0, 1, 2 ) );
	geom4.computeFaceNormals();
	
	THREE.GeometryUtils.merge(geom, geom2);
	THREE.GeometryUtils.merge(geom, geom3);
	THREE.GeometryUtils.merge(geom, geom4);
	var roof1 = new THREE.Mesh( geom, material );
	
	var temp5 = new ThreeBSP( roof1 );
	/*var temp6 = new ThreeBSP( roof2 );
	var temp7 = new ThreeBSP( roof3 );
	var temp8 = new ThreeBSP( roof4 ); */
	
	temp = temp.union( temp5 );
	
	
	var mesh = new THREE.Mesh( temp.toGeometry(), material );
	
	furnitureCreator(mesh,houseHeight/2);
	subtractObjects.push(mesh);
}

function roof(){
	var size = 30;
	var geom = new THREE.Geometry();
	var v1 = new THREE.Vector3(0,0,0);
	var v2 = new THREE.Vector3(30,0,0);
	var v3 = new THREE.Vector3(30,30,0);
	geom.vertices.push( v1 );
	geom.vertices.push( v2 );
	geom.vertices.push( v3 );
	geom.faces.push( new THREE.Face3( 0, 1, 2 ) );
	geom.computeFaceNormals();
	
	var material = new THREE.MeshPhongMaterial( {ambient: 0xffff00, color: 0xffffff, specular: 0x555555, shininess: 200, side: THREE.DoubleSide} );	
	var mesh= new THREE.Mesh( geom, material );
	furnitureCreator(mesh,size/2);
	subtractObjects.push(mesh);
}

function door(){

	
	if (!subtract){
		window.addEventListener('click', addDoor , false);
	}else{
		window.removeEventListener('click', addDoor , false);
	}
	subtract = !subtract;
}

function addDoor(event){
	var cubeSize = 10;
	var doorHeight = 20;
	var doorWidth = 5;
	event.preventDefault();			
				
				
	var vectorDrag = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
	projector.unprojectVector( vectorDrag, camera );

	var raycaster = new THREE.Raycaster( camera.position, vectorDrag.sub( camera.position ).normalize() );
	var intersects = raycaster.intersectObjects( subtractObjects );
	if (intersects.length>0){
		
		intersects[0].object.geometry.computeBoundingBox();
		var boundbox = intersects[0].object.geometry.boundingBox;

		var originX = boundbox.max.x-boundbox.min.x;
		var originY = boundbox.max.y-boundbox.min.y;
		var originZ = boundbox.max.z-boundbox.min.z;
		
		
		
		var box = new THREE.Box3();
		box.setFromObject( intersects[0].object );
		var offsetX = box.max.x - box.min.x;
		var offsetY = box.max.y - box.min.y;
		var offsetZ = box.max.z - box.min.z;
			
		var scaleX = offsetX/originX;
		var scaleY = offsetY/originY;
		var scaleZ = offsetX/originZ;
		
		var pos = intersects[0].point;                                             
		var material = new THREE.MeshPhongMaterial( {color: 0xffffff} );             //Door
		var cube = new THREE.CubeGeometry(doorWidth, doorHeight, cubeSize);     //here (textWidth+5, textHeight+5, length)
		var cube_mesh = new THREE.Mesh(cube,material);
		cube_mesh.position.set(pos.x ,intersects[0].object.position.y-(offsetY/2) , pos.z);
		var door_bsp = new ThreeBSP( cube_mesh );
		
		
		//-------------------------------  Target Object regenerate
		
		var wall = new THREE.CubeGeometry(offsetX, offsetY, offsetZ);     //here (textWidth+5, textHeight+5, length)
	//	var wall_mesh = new THREE.Mesh(wall,material);
		
		var wall_mesh = intersects[0].object.clone();
		
		wall_mesh.position.set(intersects[0].object.position.x , intersects[0].object.position.y , intersects[0].object.position.z);
		
		
		
		var wall_bsp = new ThreeBSP( wall_mesh );
		
		var wall_bsp = wall_bsp.subtract( door_bsp );
		

		var mesh = new THREE.Mesh( wall_bsp.toGeometry(), material );
		mesh.scale.set(scaleX,scaleY,1);
		doorCreator(mesh, intersects[0].object.position.x ,offsetY/2 , intersects[0].object.position.z); 
		subtractObjects.push(mesh);
		
		if (currentObject[0]){
		
			for (var i in subtractObjects){
				if (intersects[0].object.name == subtractObjects[i].name){
					subtractObjects.splice(i,1);
					
				}
			}
		}
	//	scene.remove(intersects[0].object);
		targetObject = intersects[0].object;
		movementProject("delete");
//		controls.enabled = false;	
		
		
		
	}  

	
			
} 	

function addTree(){
	if (!treeFlag){
		window.addEventListener("click",tree,false);
		document.getElementById('tree').style.color="#ffffff";
		document.getElementById('tree').style.background="red";
	}
	else{
		window.removeEventListener("click",tree,false);
		document.getElementById('tree').style.color="#999999";
		document.getElementById('tree').style.background="black";
	}
	treeFlag = !treeFlag;
}
function tree(){
	var treeHeight = 40;
	var treeRadius = 1;
	
	var vectorDrag = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
	projector.unprojectVector( vectorDrag, camera );

	var raycaster = new THREE.Raycaster( camera.position, vectorDrag.sub( camera.position ).normalize() );
	var intersects = raycaster.intersectObject( plane );
	if (intersects.length>0){
	
	
		var geometry = new THREE.CylinderGeometry( treeRadius, treeRadius, treeHeight, 16 );
		var material = new THREE.MeshPhongMaterial( {ambient: 0xffff00, color: 0xA42D00, specular: 0x555555, shininess: 30, side: THREE.DoubleSide} );	
		var cylinder = new THREE.Mesh( geometry, material );
		cylinder.position.set(intersects[0].point.x,treeHeight/2,intersects[0].point.z);
		scene.add( cylinder );

		var positionValue = 15;


		var particleCount = 2000,
		particles = new THREE.Geometry(),
		pMaterial = new THREE.ParticleBasicMaterial({
		  color: 0x668800,
		  size: 3
		});

		// now create the individual particles
		for (var p = 0; p < particleCount; p++) {

			  // create a particle with random
			  // position values, -250 -> 250
	//		  var pX = Math.random() * positionValue - positionValue/2,
	//			  pY = Math.random() * positionValue - positionValue/2,
	//			  pZ = Math.random() * positionValue - positionValue/2,
	//			  particle = new THREE.Vertex(
	//				new THREE.Vector3(pX, pY, pZ)
	//			  );
				  
			var x = -1 + Math.random() * 2;
			var y = -1 + Math.random() * 2;
			var z = -1 + Math.random() * 2;
			var d = 1 / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
			x *= d;
			y *= d;
			z *= d;
			 
			var particle = new THREE.Vector3(
				   x * positionValue,
				   y * positionValue,
				   z * positionValue
			);
	 



		  // add it to the geometry
		  particles.vertices.push(particle);
		}

		// create the particle system
		var particleSystem = new THREE.ParticleSystem(
			particles,
			pMaterial);
		particleSystem.position.set(intersects[0].point.x,treeHeight,intersects[0].point.z);
		// add it to the scene
		scene.add(particleSystem);
		
	

	//	furnitureCreator(particleSystem,treeHeight); 
	}else{
		alert("Range out of bound");
	}


}


function windowMaker(){

	
	if (!subtract){
		renderer.domElement.addEventListener('mousedown', addWindow , false);
		document.getElementById('window').style.color="#ffffff";
		document.getElementById('window').style.background="red";
		renderer.domElement.removeEventListener('click', lockDown , false);
		renderer.domElement.addEventListener( 'mousemove', previewWindow, false );
	
	
	}else{
		renderer.domElement.removeEventListener('mousedown', addWindow , false);
		document.getElementById('window').style.color="#999999";
		document.getElementById('window').style.background="black";
		renderer.domElement.removeEventListener( 'mousemove', previewWindow, false );
		renderer.domElement.addEventListener('click', lockDown , false);
		if (lastWindow != null){
			scene.remove(lastWindow);
		}
		
		
	}
	subtract = !subtract;
}
function windowCreator(pos,pioneerFlag){
		var cubeSize = 5;
		var windowHeight = 5;
		var windowWidth = 5;
		var windowInterval = 6;
		var material;
		if (pioneerFlag)
			material = new THREE.MeshPhongMaterial( {color: 0xff0000 , transparent : true , opacity:0.5} );             //window
		else
			material = new THREE.MeshPhongMaterial( {ambient: 0xffff00, color: 0xffffff, specular: 0x555555, shininess: 30, side: THREE.DoubleSide} );             //window
			
		var cube = new THREE.CubeGeometry(windowWidth, windowHeight, cubeSize);     //here (textWidth+5, textHeight+5, length)
		var cube_mesh = new THREE.Mesh(cube,material);
		cube_mesh.position.set(pos.x , pos.y , pos.z);
		var window_bsp = new ThreeBSP( cube_mesh );
		
		cube = new THREE.CubeGeometry(windowWidth, windowHeight, cubeSize);     //here (textWidth+5, textHeight+5, length)
		cube_mesh2 = new THREE.Mesh(cube,material);
		cube_mesh2.position.set(pos.x+windowInterval , pos.y , pos.z);
		window_bsp = window_bsp.union(new ThreeBSP( cube_mesh2 ));
		
		cube = new THREE.CubeGeometry(windowWidth, windowHeight, cubeSize);     //here (textWidth+5, textHeight+5, length)
		cube_mesh3 = new THREE.Mesh(cube,material);
		cube_mesh3.position.set(pos.x , pos.y+windowInterval , pos.z);
		window_bsp = window_bsp.union(new ThreeBSP( cube_mesh3 ));
		
		cube = new THREE.CubeGeometry(windowWidth, windowHeight, cubeSize);     //here (textWidth+5, textHeight+5, length)
		cube_mesh3 = new THREE.Mesh(cube,material);
		cube_mesh3.position.set(pos.x+windowInterval , pos.y+windowInterval , pos.z);
		window_bsp = window_bsp.union(new ThreeBSP( cube_mesh3 ));
		
		cube = new THREE.CubeGeometry(windowWidth, windowHeight, cubeSize);     //here (textWidth+5, textHeight+5, length)
		cube_mesh5 = new THREE.Mesh(cube,material);
		cube_mesh5.position.set(pos.x , pos.y , pos.z+windowInterval);
		window_bsp = window_bsp.union(new ThreeBSP( cube_mesh5 ));
		
		cube = new THREE.CubeGeometry(windowWidth, windowHeight, cubeSize);     //here (textWidth+5, textHeight+5, length)
		cube_mesh6 = new THREE.Mesh(cube,material);
		cube_mesh6.position.set(pos.x+windowInterval , pos.y , pos.z+windowInterval);
		window_bsp = window_bsp.union(new ThreeBSP( cube_mesh6 ));
		
		cube = new THREE.CubeGeometry(windowWidth, windowHeight, cubeSize);     //here (textWidth+5, textHeight+5, length)
		cube_mesh7 = new THREE.Mesh(cube,material);
		cube_mesh7.position.set(pos.x , pos.y+windowInterval , pos.z+windowInterval);
		window_bsp = window_bsp.union(new ThreeBSP( cube_mesh7 ));
		
		cube = new THREE.CubeGeometry(windowWidth, windowHeight, cubeSize);     //here (textWidth+5, textHeight+5, length)
		cube_mesh8 = new THREE.Mesh(cube,material);
		cube_mesh8.position.set(pos.x+windowInterval , pos.y+windowInterval , pos.z+windowInterval);
		window_bsp = window_bsp.union(new ThreeBSP( cube_mesh8 ));
		
		return window_bsp;
		
}
function previewWindow(){
	

	
	event.preventDefault();			
	
				
	var vectorDrag = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
	projector.unprojectVector( vectorDrag, camera );

	var raycaster = new THREE.Raycaster( camera.position, vectorDrag.sub( camera.position ).normalize() );
	var intersects = raycaster.intersectObjects( subtractObjects );
	if (intersects.length>0){
		if (lastWindow != null){
			scene.remove(lastWindow);
		}
		var material = new THREE.MeshPhongMaterial( {color: 0xff0000 , transparent : true , opacity:0.5} );             //window

	//	if (houseFirstCheck == false){
	//		house = intersects[0].object.clone();
	//		houseFirstCheck = true;
	//	}
		
		intersects[0].object.geometry.computeBoundingBox();
		var boundbox = intersects[0].object.geometry.boundingBox;

		var originX = boundbox.max.x-boundbox.min.x;
		var originY = boundbox.max.y-boundbox.min.y;
		var originZ = boundbox.max.z-boundbox.min.z;
		
		
		
		var box = new THREE.Box3();
		box.setFromObject( intersects[0].object );
		var offsetX = box.max.x - box.min.x;
		var offsetY = box.max.y - box.min.y;
		var offsetZ = box.max.z - box.min.z;
			
		var scaleX = offsetX/originX;
		var scaleY = offsetY/originY;
		var scaleZ = offsetX/originZ;
		
		pos = intersects[0].point;   
		
		
		window_bsp = windowCreator(pos,1);
		var windowMesh = new THREE.Mesh( window_bsp.toGeometry(), material );
		//-------------------------------  Target Object regenerate
		
		
	//	var wall_mesh = new THREE.Mesh(wall,material);
		
		
		windowMesh.position.set(pos.x , pos.y , pos.z);
		scene.add(windowMesh);
		
		
	//	var house_bsp = new ThreeBSP( house );
		
	//	house_bsp = house_bsp.subtract( window_bsp );
		

	//	var mesh = new THREE.Mesh( house_bsp.toGeometry(), material );
	//	mesh.scale.set(scaleX,scaleY,1);
		//doorCreator(windowMesh, intersects[0].object.position.x ,intersects[0].object.position.y , intersects[0].object.position.z); 
		lastWindow = windowMesh;
	//	subtractObjects.push(mesh);
		
	//	if (currentObject[0]){
		
	//		for (var i in subtractObjects){
	//			if (intersects[0].object.name == subtractObjects[i].name){
	//				subtractObjects.splice(i,1);
					
	//			}
	//		}
	//	}
	//	scene.remove(intersects[0].object);
	//	targetObject = intersects[0].object;
	//	deleteHouse = intersects[0].object.clone();
	//	movementProject("delete");
		
//		controls.enabled = false;	
		
	
		intersectPoint = intersects[0].point.clone();
		
	//	intersectObject = mesh.clone();
	}

			
} 	


function addWindow(event){
	var vectorDrag = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
	projector.unprojectVector( vectorDrag, camera );

	var raycaster = new THREE.Raycaster( camera.position, vectorDrag.sub( camera.position ).normalize() );
	var intersects = raycaster.intersectObjects( subtractObjects );
	if (intersects.length>0){
		var material = new THREE.MeshPhongMaterial( {ambient: 0xffff00, color: 0xffffff, specular: 0x555555, shininess: 30, side: THREE.DoubleSide} );             //window

		if (houseFirstCheck == false){
			house = intersects[0].object.clone();
			houseFirstCheck = true;
		}
		
		intersects[0].object.geometry.computeBoundingBox();
		var boundbox = intersects[0].object.geometry.boundingBox;

		var originX = boundbox.max.x-boundbox.min.x;
		var originY = boundbox.max.y-boundbox.min.y;
		var originZ = boundbox.max.z-boundbox.min.z;
		
		
		
		var box = new THREE.Box3();
		box.setFromObject( intersects[0].object );
		var offsetX = box.max.x - box.min.x;
		var offsetY = box.max.y - box.min.y;
		var offsetZ = box.max.z - box.min.z;
			
		var scaleX = offsetX/originX;
		var scaleY = offsetY/originY;
		var scaleZ = offsetX/originZ;
		
		pos = intersects[0].point;   
		
		
		window_bsp = windowCreator(pos,1);
		
		//-------------------------------  Target Object regenerate
		
		
	//	var wall_mesh = new THREE.Mesh(wall,material);
		
		var wmesh = intersects[0].object;
	
		
		
		
		var house_bsp = new ThreeBSP( wmesh );
		
		house_bsp = house_bsp.subtract( window_bsp );
		

		var mesh = new THREE.Mesh( house_bsp.toGeometry(), material );
		mesh.scale.set(scaleX,scaleY,1);
		doorCreator(mesh, intersects[0].object.position.x ,offsetY/2 , intersects[0].object.position.z); 
		subtractObjects.push(mesh);
		
		if (currentObject[0]){
		
			for (var i in subtractObjects){
				if (intersects[0].object.name == subtractObjects[i].name){
					subtractObjects.splice(i,1);
					
				}
			}
		}
	//	scene.remove(intersects[0].object);
		targetObject = intersects[0].object;
		deleteHouse = intersects[0].object.clone();
		movementProject("delete");
	}
}

function movementProject(movement){
	var rotateStep = Math.PI/4;
	var translateStep = 1;//zhen 5->1
	var scaleStep = 0.2;
	
	
	
	if (targetObject == null)
		alert("Target not specified");
	else{
		var index = targetObject.name.split(".")[1];
		var modifiedOffset = objectOffset[index];
		switch (movement){
			case 'rotatePX':
				targetObject.rotation.x += rotateStep; 
				break;
				
			case 'rotateNX':
				targetObject.rotation.x -= rotateStep; 
				break;
				
			case 'rotate0X':
				targetObject.rotation.x = 0; 
				break;
			
			case 'rotatePY':
				targetObject.rotation.y += rotateStep; 
				break;
				
			case 'rotateNY':
				targetObject.rotation.y -= rotateStep; 
				break;
			
			case 'rotate0Y':
				targetObject.rotation.y = 0; 
				break;
				
			case 'rotatePZ':
				targetObject.rotation.z += rotateStep; 
				break;
				
			case 'rotateNZ':
				targetObject.rotation.z -= rotateStep; 
				break;
			
			case 'rotate0Z':
				targetObject.rotation.z = 0; 
				break;
				
			case 'translatePX':
				targetObject.position.x += translateStep; 
				break;
				
			case 'translateNX':
				targetObject.position.x -= translateStep; 
				break;
				
			case 'translate0X':
				targetObject.position.x = 0; 
				break;
				
			case 'translatePY':
				targetObject.position.y += translateStep; 
				modifiedOffset += translateStep;
				break;
				
			case 'translateNY':
				targetObject.position.y -= translateStep; 
				modifiedOffset -= translateStep;
				break;
			
			case 'translate0Y':
				targetObject.position.y = 0; 
				modifiedOffset = 0;
				break;
				
			case 'translatePZ':
				targetObject.position.z += translateStep; 
				break;
				
			case 'translateNZ':
				targetObject.position.z -= translateStep; 
				break;
				
			case 'translate0Z':
				targetObject.position.z = 0; 
				break;
				
			case 'scalePX':
				targetObject.scale.x += scaleStep; 
				break;
				
			case 'scaleNX':
				targetObject.scale.x -= scaleStep; 
				break;
			
			case 'scale0X':
				targetObject.scale.x = 1; 
				break;
				
			case 'scalePY':
				targetObject.scale.y += scaleStep; 
				break;
				
			case 'scaleNY':
				targetObject.scale.y -= scaleStep; 
				break;
			
			case 'scale0Y':
				targetObject.scale.y = 1; 
				break;
				
			case 'scalePZ':
				targetObject.scale.z += scaleStep; 
				break;
				
			case 'scaleNZ':
				targetObject.scale.z -= scaleStep; 
				break;
			
			case 'scale0Z':
				targetObject.scale.z = 1; 
				break;
				
			case 'scaleP':
				targetObject.scale.x += scaleStep; 
				targetObject.scale.y += scaleStep; 
				targetObject.scale.z += scaleStep; 
				break;
				
			case 'scaleN':
				targetObject.scale.x -= scaleStep; 
				targetObject.scale.y -= scaleStep; 
				targetObject.scale.z -= scaleStep; 
				break;
				
				
			case 'delete':
				scene.remove(targetObject);
				if (currentObject[0]){
					for (var i in currentObject){
						if (targetObject.name == currentObject[i].name)
							currentObject.splice(i,1);
					}
					for (var i in objects){
						if (targetObject.name == objects[i].name){
							//objects.splice(i,1);
							//objectOffset.splice(i,1);
							objects[i] = '';
							objectOffset[i] = '';
						}
					}
					
					for (var i in voxel){
						if (targetObject.name == voxel[i].name){
							voxel.splice(i,1);
							voxelCoordinate.splice(i,1);
						}
					}
	
				}
				break;

	
		}
		objectOffset[index] = modifiedOffset;

	}
}
function clearObject(){
	geometryMerge = new THREE.Geometry();
	voxel = [];
	voxelCoordinate = [];
	voxelNumber = 0;
	lastVoxel = null;
	if (currentObject[0]){
		for (var i in currentObject){
			scene.remove(currentObject[i]);
		}
		objects=[];
		currentObject=[];
	}
	if (paintObjects[0]){
		for (var i in paintObjects){
			scene.remove(paintObjects[i]);
		}
		paintObjects=[];
	}
	
}

function sumCreator(object,offset){
	voxelFlag = 1;
	paintFlag = 1;

	
	object.geometry.computeBoundingBox();
	var boundbox = object.geometry.boundingBox;
	var offset = boundbox.max.y - boundbox.min.y;
	offset /= 2;
	object.position.set( 0,offset,0 );
	
	
	object.name = "obj."+objectCount++;         //dot for string exploit
	
	object.geometry.computeFaceNormals();
	currentObject.push(object);
	scene.add( object );
	objectOffset.push(offset);
	objects.push(object);
}

function furnitureCreator(object,offset){
	voxelFlag = 1;
	paintFlag = 1;
	
	object.position.set( 0,offset,0 );
	object.name = "obj."+objectCount++;         //dot for string exploit
	object.geometry.computeFaceNormals();
	currentObject.push(object);
	scene.add( object );
	objectOffset.push(offset);
	objects.push(object);
	
	
}

function doorCreator(object,x,y,z){
	voxelFlag = 1;
	paintFlag = 1;
	
	object.geometry.computeBoundingBox();
	var boundbox = object.geometry.boundingBox;
	var offset = boundbox.max.y;
	offset /= 2;
	object.position.set( x,offset,z );
	
	object.name = "obj."+objectCount++;         //dot for string exploit
	//object.geometry.computeFaceNormals();
	currentObject.push(object);
	scene.add( object );
	objectOffset.push(offset);
	objects.push(object);
	
	
}




function cameraLock(movement){
	event.preventDefault();		
	switch (movement){
		case "rotate":
			if (!targetObject){
				alert("請指定物件");
				return;
			}
			if (!cameraFlag){
				cameraFlag = 1;
				controls.target = targetObject.position;	
				targetObject.material.color.setHex(0xffffff); // there is also setHSV and setRGB
				document.getElementById("cameraRotate").value = "停止觀看物件";
			//	camera.position.addScalar(targetObject.position);
				document.getElementById('cameraRotate').style.color="#ffffff";
				document.getElementById('cameraRotate').style.background="red";
				controls.enabled = false;
				
			}else{
				cameraFlag = 0;
				targetObject = null;
				controls.target = plane.position;	
				document.getElementById("cameraRotate").value = "觀看物件";
				camera.position.set(0,300,700);
				rotation = 0;
				document.getElementById('cameraRotate').style.color="#999999";
				document.getElementById('cameraRotate').style.background="black";
				controls.enabled = true;
			}
			
		//camera.lookAt();
			break;
			
		case "X":
			controls.target = plane.position;
			camera.position.set(500,0,0);
			break;
		case "Y":
			controls.target = plane.position;
			camera.position.set(0,500,0);
			break;
		case "Z":
			controls.target = plane.position;
			camera.position.set(0,0,500);
			break;
	}
}


function cm(px){
	return px*25;
}
/*stl import*/
function stlCreator(object,offset){
	voxelFlag = 1;
	paintFlag = 1;
	object.name = "obj."+objectCount++;         //dot for string exploit
	object.position.set( 0,offset,0 );
	object.geometry.computeFaceNormals();
	currentObject.push(object);
	scene.add( object );
	objectOffset.push(offset);
	objects.push(object);
}
function stlcreat(path) {
		var loader = new THREE.STLLoader();
		loader.addEventListener( 'load', function ( event ) {
		//size = 5;	
		//Height=20;
		var geometry = event.content;
		var material = new THREE.MeshPhongMaterial( { ambient: 0xff5533, color: 0xffffff, specular: 0x111111, shininess: 200 } );
		var mesh = new THREE.Mesh( geometry, material );
		/*
		mesh.position.set( 0 , 0, 0 );
		mesh.rotation.set(  -Math.PI / 2, 0, - Math.PI / 2 );
		mesh.scale.set( 0.1, 0.1, 0.1 );
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		//console.log(mesh.prototype);
		scene.add( mesh );*/
		//mesh.position.set( 0 , 0, 0 );
		mesh.scale.set( 0.2, 0.2, 0.2 );
		console.log(mesh.scale);
		//mesh.rotation.set(  -Math.PI / 2, 0, - Math.PI / 2 );
		mesh.rotation.set(   - Math.PI / 2,0, - Math.PI / 2 );
		stlCreator(mesh,0);
		subtractObjects.push(mesh);
				
	
	} );
		loader.load( '../showMode/'+path);
		

}
var nameArr = new Array();
var link3DArr = new Array();
var linkArr = new Array();
var height = document.body.clientHeight;//獲得高瀏覽器度
function imageRequest(categoryNo){ //搜尋stl檔
	
	var xhr = new XMLHttpRequest;
	nameArr.length = 0;
	link3DArr.length = 0;
	linkArr.length = 0;
	var category=document.getElementById('category');
	var returnCategory=document.getElementById('return-category');
	var arrowleft=document.getElementById('arrowleft');
	var arrowright=document.getElementById('arrowright');

	

	category.style.display='none';
	returnCategory.style.display='block';
	arrowleft.style.display='block';
	arrowright.style.display='block';

	returnCategory.style.top=height-600+'px';
	arrowleft.style.top=height-600+'px';
	arrowright.style.top=height-600+'px';
	

	
	document.getElementById('clickfooter').style.display='none';
	
	console.log(categoryNo);
	xhr.onreadystatechange = function(){
		
		if (xhr.readyState == 4){
			var temp = xhr.responseText
			temp=temp.trim();
			var res = temp.split("+");
			console.log(res.length);
			for ( var i =0 ; i<res.length ; i++){
				if (i%3 == 0 )
					nameArr.push(res[i]);
					//nameArr[j]=res[i];
				else if (i%3 == 1)
					link3DArr.push(res[i]);
					//link3DArr[j]=res[i];
				else if (i%3 == 2)
					linkArr.push(res[i]);
					//linkArr[j]=res[i];
			}
			if(nameArr.length<10){
			 	document.getElementById('next').style.display='none';
			 	document.getElementById('pre').style.display='none';
			}
			if(nameArr.length>10){
			 	document.getElementById('next').style.display='block';
			 	document.getElementById('pre').style.display='block';
			}
			console.log(temp.split("+"));
			console.log(nameArr[0]);
			footerBuilder();
		}
	}
		
		xhr.open("GET","image.php?categoryNo="+categoryNo,true);
		//xhr.open("GET","info.php?pictureNo=5234574&folderNo=1&categoryNo=1",false);
		xhr.send(null);
	
}

function footerBuilder(){
	var categoryimg=document.getElementById('categoryimg');
	var ul= document.createElement("ul");
	console.log(linkArr.length);
	//categoryimg.addEventListener('onmosedown',moveimg,false);
	for(var i=0;i<linkArr.length ;i++){
		
		var li= document.createElement("li");
		var box=document.createElement("div");
		box.setAttribute("id","box");
		var img = document.createElement("img");
		img.src="../showMode/"+linkArr[i];
		var span = document.createElement("span");
		span.setAttribute("id","imageName");
		span.innerHTML = nameArr[i];
		box.appendChild(span);
		box.appendChild(img);
		li.appendChild(box)
		ul.appendChild(li);
		categoryimg.appendChild(ul);
		box.setAttribute("onclick","stlcreat('"+link3DArr[i]+"')"); 

		
		categoryimg.style.top=height-600+'px';
		
	}

}
function returnCategory(){
	document.getElementById('category').style.display='block';
	document.getElementById('return-category').style.display='none';
	document.getElementById('categoryimg').innerHTML="";
	document.getElementById('arrowleft').style.display='none';
	document.getElementById('arrowright').style.display='none';
	document.getElementById("count").value=0;
	document.getElementById('categoryimg').style.webkitTransform = "translateX(0px)";
	document.getElementById('clickfooter').style.display='block';
	
}
var count;

function next(){
		
			count =document.getElementById('count').value;
			count++;
			document.getElementById("count").value=count;

			var categoryimg=document.getElementById('categoryimg');	
		

			 categoryimg.style.webkitTransform = "translateX(-"+100*count+"px)";			
			 categoryimg.style.webkitTransition = " all 1s";

		
		 
		
		
	
		
}
//上一頁
function pre(){
	count=count-1;
	var categoryimg=document.getElementById('categoryimg');	
	 categoryimg.style.webkitTransform = "translateX(-"+100*count+"px)";			
	 categoryimg.style.webkitTransition = " all 1s";
		
	
}
/*end stl import*/
/*stl keybord move*/
function keyboardMove(e) 
{
　 
		
		var keycode = e.which;
	 	switch (keycode){
			case 46: //delete
				movementProject('delete');
				break;
				/*移動*/
			case 37: //X-左
				movementProject('translateNX');
				break;
			case 38: //Z-上
				movementProject('translateNZ');
				break;	
			case 39: //X+右
				movementProject('translatePX');
				break;
			case 40: //Z+下
				movementProject('translatePZ');
				break;	
			case 33: //Y+pageup
				movementProject('translatePY');
				break;
			case 34: //Y-pagedown
				movementProject('translateNY');
				break;
				/*旋轉*//*
				
			case 65: //Y+A
				movementProject('rotatePY');
				break;
			case 68: //Y-D
				movementProject('rotateNY');
				break;	
			case 87: //X+W
				movementProject('rotatePX');
				break;
			case 83: //X-S
				movementProject('rotateNX');
				break;	
			case 81: //Z+Q
				movementProject('rotatePZ');
				break;
			case 69: //Z-E
				movementProject('rotateNZ');
				break;		*/			
		}	
	
}
/*stl keyboard move end*/
/*move img*/
function moving(){
	var custom=document.getElementById('custom').value;
	//window.addEventListener('keydown',keyboardMove,false);
	console.log(custom++);

}
