
	// standard global variables

var container, scene,sceneCube, camera, plane, line, renderer, controls , textMesh , textColor=0xdddddd,custom , textSize=10,textHeight=30 ,textFont='helvetiker';
//mouse move detect event
var projector = new THREE.Projector();
var mouseVector = new THREE.Vector3();
var objects = [],objectCount=0;;
var mouse = new THREE.Vector2(),offset = new THREE.Vector3(),INTERSECTED, SELECTED;
var geometryMerge = new THREE.Geometry();
var convertFlag=0;
var exportTarget;
var extended = false , lastTarget , controlExtended=false;
var checkPrint = 0;
var firstPersoncontrols;
var cameraSphere;
var rotation = 0;
function $(id){
	return document.getElementById(id);
}


function init() {
	if (!Modernizr.webgl) {
		alert('Sorry, you need a WebGL capable browser to use this.\n\nGet the latest Chrome or FireFox.');
		return;
	}

	if (!Modernizr.localstorage) {
		alert("Man, your browser is ancient. I can't work with this. Please upgrade.");
		return;
	 }
	 
	 
	
    // SCENE
    scene = new THREE.Scene();

    // CAMERA

    var VIEW_ANGLE = 45, ASPECT = window.innerWidth/window.innerHeight, NEAR = 0.1, FAR = 20000;
    camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
    scene.add(camera);
    camera.position.set(0,300,700);
	
	//var material = new THREE.MeshPhongMaterial({ambient: 0xffff00, color: 0xffffff, specular: 0x555555, shininess: 30,opacity:0, transparent:true});
	var material = new THREE.MeshPhongMaterial({ambient: 0xffff00, color: 0xffffff, specular: 0x555555, shininess: 30});
	
	var objectRadius = 10;
	var segments = 8;

/*	var sphereGeometry = new THREE.SphereGeometry( objectRadius, 32, 32 );		
	cameraSphere = new THREE.Mesh( sphereGeometry, material );
	cameraSphere.position.set(0,10,0);
	scene.add(cameraSphere);          */
	//renderer = new THREE.WebGLDeferredRenderer({width: window.innerWidth,height: window.innerHeight,scale: 1, antialias: true,tonemapping: THREE.FilmicOperator, brightness: 2.5 });

	
	
    renderer = new THREE.WebGLRenderer( {antialias:true, alpha: true } );
    renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor( 0x000000, 1 );  
    container = document.getElementById( 'div1' );
    container.appendChild( renderer.domElement );
	
	
	
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
	


	//stat
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.right= '10px';
    stats.domElement.style.top = '10px';
    container.appendChild(stats.domElement);

    // LIGHT
 //   var light = new THREE.PointLight(0xffffff,3);
//	light.position.set(100,1000,100);

 //  scene.add(light);
	// white spotlight shining from the side, casting shadow

	
	var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
	directionalLight.position.set( 200, 200, 200 );
	scene.add( directionalLight );
		 
		
	
	var directionalLight3 = new THREE.DirectionalLight( 0xffffff, 0.5 );
	directionalLight3.position.set( -200, 200, -200 );
	scene.add( directionalLight3 );

		
		var planeGeometry1 = new THREE.CubeGeometry(4, 10, 0);
        var planeGeometry1Mat = new THREE.MeshPhongMaterial({color: 0xff0000})
        var plane1 = new THREE.Mesh(planeGeometry1, planeGeometry1Mat);
        plane1.position = directionalLight.position;
        scene.add(plane1);
		

		
		var planeGeometry3 = new THREE.CubeGeometry(4, 10, 0);
        var planeGeometry3Mat = new THREE.MeshPhongMaterial({color: 0xff0000})
        var plane3 = new THREE.Mesh(planeGeometry3, planeGeometry3Mat);
        plane3.position = directionalLight3.position;
        scene.add(plane3);

    // add 3D text default

	
/*	for (var i = 0 ;i<3; i++){
		var material = new THREE.MeshPhongMaterial({
			color: textColor,
			shininess: 30,
			specular: 0x555555
		});
		var textGeom = new THREE.TextGeometry( custom[i], {
			font: textFont,
			size: textSize,
			height: textHeight,
			curveSegments: 10,
			bend:true
		});
	
		textMesh[i] = new THREE.Mesh( textGeom, material );
		textMesh[i].name = "obj."+objectCount++;;
		textGeom.computeBoundingBox();
		var textWidth = textGeom.boundingBox.max.x - textGeom.boundingBox.min.x;
		textMesh[i].rotation.x=Math.PI*1.5;
		textMesh[i].position.set( 0, 0, -50+i*10 );  
		scene.add( textMesh[i] );
		objects.push(textMesh[i]);                 //for checking mouseover usage
		objectOffset.push(0);
		
	}  */
//	THREE.GeometryUtils.merge(geometryMerge, textMesh[0]);                     // --------------------STL converter modified
	//plane create
	var size = 250,step = 25;
	
	var geometry = new THREE.PlaneGeometry(size*2,size*2 );
	var material = new THREE.MeshPhongMaterial({color: 0x000000,side: THREE.DoubleSide,transparent:true , opacity:0} );
	plane = new THREE.Mesh( geometry, material );
	plane.name = "plane";
	scene.add( plane );
	plane.position.set(0,0,-10);
	plane.rotation.x=Math.PI*1.5;     
	
	var geometry= new THREE.Geometry();
	//var material = new THREE.LineBasicMaterial({color:0x666666});
	var material = new THREE.LineBasicMaterial({color:0xffffff});
		for (var i = -size ; i<=size ; i+=step){
			geometry.vertices.push(new THREE.Vector3(-size , -0.04 , i));
			geometry.vertices.push(new THREE.Vector3(size , -0.04 , i));
			
			geometry.vertices.push(new THREE.Vector3( i , -0.04 , -size ));
			geometry.vertices.push(new THREE.Vector3( i , -0.04 , size ));
		}
	line = new THREE.Line ( geometry, material, THREE.LinePieces);
	scene.add(line);
	
	
	
	
	
	
	//fog 
	scene.fog = new THREE.Fog(0x000000,4000,10000);
	
	
	//skybox

	var skyGeometry = new THREE.CubeGeometry( 5000, 5000, 5000 );	
	
	
	var imagePrefix = "img/";
	var imageSuffix = ".png";
	var materialArray = [];
	
//	for (var i = 0; i < 6; i++)
//		materialArray.push( new THREE.MeshBasicMaterial({
//			map: THREE.ImageUtils.loadTexture( imagePrefix + 'back' + imageSuffix ),
//			side: THREE.BackSide
//		}));   
	

	var materialArray = [

					new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'img/skyTexture/px.jpg' ) ,side: THREE.BackSide } ), // right
					new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'img/skyTexture/nx.jpg' ) ,side: THREE.BackSide } ), // left
					new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'img/skyTexture/py.jpg' ) ,side: THREE.BackSide } ), // top
					new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'img/skyTexture/ny.jpg' ) ,side: THREE.BackSide } ), // bottom
					new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'img/skyTexture/pz.jpg' ) ,side: THREE.BackSide } ), // back
					new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'img/skyTexture/nz.jpg' ) ,side: THREE.BackSide } )  // front
				
				];			
	
	var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
	
	var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
	scene.add( skyBox );
	
	

	
	// create the particle variables
	
	/*
var particleCount = 1800,
    particles = new THREE.Geometry(),
    pMaterial = new THREE.ParticleBasicMaterial({
      color: 0xFFFFFF,
      size: 20
    });

// now create the individual particles
for (var p = 0; p < particleCount; p++) {

  // create a particle with random
  // position values, -250 -> 250
  var pX = Math.random() * 500 - 250,
      pY = Math.random() * 500 - 250,
      pZ = Math.random() * 500 - 250,
      particle = new THREE.Vertex(
        new THREE.Vector3(pX, pY, pZ)
      );

  // add it to the geometry
  particles.vertices.push(particle);
}

// create the particle system
var particleSystem = new THREE.ParticleSystem(
    particles,
    pMaterial);

// add it to the scene
scene.add(particleSystem);
	*/
	
	//particle system
	//axes
	axes = buildAxes( 2500 );
	scene.add(axes);
	
	// EventListener
	renderer.domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );
	renderer.domElement.addEventListener( 'mousedown', onDocumentMouseDown, false );
	renderer.domElement.addEventListener( 'mouseup', onDocumentMouseUp, false );
	
//	renderer.domElement.addEventListener('dblclick', lockDown , false);
	renderer.domElement.addEventListener('click', lockDown , false);
	window.addEventListener( 'resize', onWindowResize, false );
	window.addEventListener('keydown',keyboardMove,false); 
	document.getElementById("clickMe").addEventListener("click" , extendPanel , false);
//	document.getElementById("clickSTL").addEventListener("click" , extendPanel , false);
	document.getElementById("clickControl").addEventListener("click" , extendControl , false);
	document.getElementById("tutorial").setAttribute("style","-webkit-transform:translateY(100px)");
	
}


function stopTutorial(){
	var temp = document.getElementById("tutorial");
	temp.setAttribute("style","opacity:0");
	setTimeout(function(){ temp.style.display='none';},2000);
	
	var isInFullScreen = (document.fullScreenElement && document.fullScreenElement !==     null) ||    // alternative standard method  
            (document.mozFullScreen || document.webkitIsFullScreen);

    var docElm = document.documentElement;
    if (!isInFullScreen) {

        if (docElm.requestFullscreen) {
            docElm.requestFullscreen();
        }
        else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen();
        //    alert("Mozilla entering fullscreen!");
        }
        else if (docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      //      alert("Webkit entering fullscreen!");
        }
    }
	showHelp();
}

function showHelp(){
	document.getElementById('helper').style.opacity = 1;
}

function hideHelp(){
	document.getElementById('helper').style.opacity = 0;
	setTimeout(function(){document.getElementById('helper').style.display='none';} ,1000);
}

function showbasicHelp(){
	var helper = document.getElementById('helper');
	var helperback = document.getElementById('helperback');
	var content2 = document.getElementById("helperContent2");
	var content = document.getElementById("helperContent");
					
		
	helper.style.opacity = 1;
	helperback.style.opacity = .7;
	helper.style.height = 145;
	if (content.className == 'show'){
		document.getElementById("helperContent2").innerHTML = "<h2>歡迎來到3Dink繪圖系統</h2>1. 點選左邊的面板以生成3D模型。<p>2. 若右上角效能偵測指數低於50fps，請查看連線品質。<p>3. 本系統紅色軸線為X軸，黃色為Y軸，藍色為Z軸，虛線則為該軸負值區域。";
		document.getElementById("helperContent2").style.opacity = 1;
		document.getElementById("helperContent").style.opacity = 0;
		content.className = 'hide';
		content2.className = 'show';
	}
	else{
		document.getElementById("helperContent2").innerHTML = "<h2>歡迎來到3Dink繪圖系統</h2>1. 點選左邊的面板以生成3D模型。<p>2. 若右上角效能偵測指數低於50fps，請查看連線品質。<p>3. 本系統紅色軸線為X軸，黃色為Y軸，藍色為Z軸，虛線則為該軸負值區域。";
		document.getElementById("helperContent").style.opacity = 1;
		document.getElementById("helperContent2").style.opacity = 0;
		content.className = 'show';
		content2.className = 'hide';
	}
				
}

function extendPanel(event){
	if (event.target.parentNode.id == lastTarget && extended){
		document.getElementById("attribute").setAttribute("style","-webkit-transform:translateX(0px)");
	//	document.getElementById("stlViewer").setAttribute("style","-webkit-transform:translateX(0px)");
	}else{
		document.getElementById("attribute").setAttribute("style","-webkit-transform:translateX(-65px)");
	//	document.getElementById("stlViewer").setAttribute("style","-webkit-transform:translateX(-65px)");
		document.getElementById(event.target.parentNode.id).setAttribute("style","-webkit-transform:translateX(365px)");
	}
	extended = !extended;
	lastTarget = event.target.parentNode.id;
}

function extendControl(event){
	if (!controlExtended){
		document.getElementById("controlPanel").setAttribute("style","-webkit-transform:translateX(-305px)");
	}else{
		document.getElementById("controlPanel").setAttribute("style","-webkit-transform:translateX(0px)");
	}
	controlExtended = !controlExtended;
}

function extendSTL(){
	document.getElementById("attribute").setAttribute("style","-webkit-transform:translateX(-65px)");
	document.getElementById("stlViewer").setAttribute("style","-webkit-transform:translateX(365px)");
	extended = !extended;
	lastTarget = "stlViewer";
}
function loading(flag){
//	background.style.opacity = 0;
	var div = document.getElementById("loading");
	if (flag == 1){
		div.style.display='inline';
	}else if (flag == 0 ){
		div.style.display='none';
	}
	
}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );

}

function save() {

		if (currentObject[0] == null && paintObjects[0] == null){
			alert("No Object Created");
			return;
		}

		var filename = 'model.stl';
	//	var formData = new FormData();
		checkPrint = 1;
		
		loading(1);
		var stl = startExport();
		var blob = new Blob([stl], {type: 'text/plain'});
		saveAs(blob, filename);                                            //Download File?
/*		
		formData.append("file", blob ,filename);

		var xhr = new XMLHttpRequest();
		xhr.onload = function () {
		  if (xhr.status == 200) {
			STLviewer(filename);
			extendSTL();
		  } else {
			alert('An error occurred!');
		  }
		  gCode();
		};
		xhr.open("POST", "upload.php",true);
		xhr.send(formData);
		
*/		
		
		
}

function startExport(){
	geometryMerge = new THREE.Geometry();
	if (currentObject[0]){
		for (var i in currentObject){
			THREE.GeometryUtils.merge(geometryMerge, currentObject[i]);
		}
		
		
	}
	if (paintObjects[0]){
		for (var i in paintObjects){
			THREE.GeometryUtils.merge(geometryMerge, paintObjects[i]);
		}
		
		
	}

    exportGeo = removeDuplicateFaces( geometryMerge );
    //THREE.GeometryUtils.triangulateQuads( geometryMerge );

    var stl = generateSTL();
	if (convertFlag)
		loading(0);
    return stl;
}

	
function animate() {
	window.requestAnimationFrame( animate );
	stats.update();
	if (cameraFlag != null && cameraFlag == 1){
		rotation += 0.005;
		camera.position.x = targetObject.position.x + Math.sin(rotation) * 200;
		camera.position.z = targetObject.position.z + Math.cos(rotation) * 200;
	}
//	var clock = new THREE.Clock();
//	var delta = clock.getDelta();
	controls.update(); //for cameras
	renderer.render( scene, camera );
}
function hoverPrint(){
	if (checkPrint)
		document.getElementById("print").style.background="#ffffff";
	else
		document.getElementById("print").style.background="#ff0000";
	
	
}
function outPrint(){

	document.getElementById("print").style.background="#000000";
	
}
function printButton(){
	if (checkPrint)
		window.location = "http://140.127.220.81/exec.php";
	else
		alert("抱歉，您尚未點選「輸出3D圖檔」");
}