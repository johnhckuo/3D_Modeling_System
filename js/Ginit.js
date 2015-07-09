var Gscene = null;
var Gobject = null;
var Gcamera = null;
var Gstats = null;
var Grenderer = null;
var Gobject = null;
var gFlag = 0;
function loadFile(path, callback /* function(contents) */) {
  $.get(path, null, callback, 'text')
    .error(function() { error() });
}

function error(msg) {
  alert(msg);
}

function openGCodeFromPath(path) {
	
  if (Gobject) {
    Gscene.remove(Gobject);
  }
  loadFile(path, function(gcode) {
    Gobject = createObjectFromGCode(gcode);
	Gobject.position.y += 400;
	Gobject.position.z -= 350;
	Gobject.rotation.x = Math.PI*2.5;
    Gscene.add(Gobject);
  });
}

/*function openGCodeFromText(gcode) {
  $('#openModal').modal('hide');
  if (Gobject) {
    Gscene.remove(Gobject);
  }
  Gobject = createObjectFromGCode(gcode);
  Gscene.add(Gobject);
  localStorage.setItem('last-imported', gcode);
  localStorage.removeItem('last-loaded');
}   */


function Gbegin(filename) {

  if (!gFlag){
	Gscene = gCodeinit();
	gFlag++;
  }
  Gobject = openGCodeFromPath('stl/'+filename+'.gcode');
  Ganimate();
}



function gCodeinit(){
	// SCENE
    Gscene = new THREE.Scene();

    // CAMERA

    var VIEW_ANGLE = 45, ASPECT = 300/300, NEAR = 0.1, FAR = 20000;
    Gcamera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
    Gscene.add(Gcamera);
    Gcamera.position.set(0,0,300);

	
	Grenderer = new THREE.WebGLRenderer( {antialias:true, alpha: true } );
	Grenderer.setSize(300, 300);
	Grenderer.setClearColor( 0x000000, 1 );
    var container = document.getElementById( 'gRenderer' );
    container.appendChild( Grenderer.domElement );
	
/*	// CONTROLS
	Gcontrols = new THREE.TrackballControls( Gcamera, Grenderer.domElement );
	Gcontrols.rotateSpeed = 1.0;
	Gcontrols.zoomSpeed = 1.2;
	Gcontrols.panSpeed = 0.2;
	 
	Gcontrols.noZoom = false;
	Gcontrols.noPan = false;
	 
	Gcontrols.staticMoving = false;
	Gcontrols.dynamicDampingFactor = 0.3;
	 
	Gcontrols.minDistance = 0.1;
	Gcontrols.maxDistance = 20000;
	 
	Gcontrols.keys = [ 16, 17, 18 ]; // [ rotateKey, zoomKey, panKey ]  */
	
	
	//stat
    Gstats = new Stats();
    Gstats.domElement.style.position = 'absolute';
    Gstats.domElement.style.right = '0px';
    Gstats.domElement.style.top = '0px';
    container.appendChild(Gstats.domElement);

    // LIGHT
    var light = new THREE.PointLight(0xffffff,2);
	light.position.set(0,100,100);
    Gscene.add(light);

	return Gscene;

}

function Ganimate() {

    // note: three.js includes requestAnimationFrame shim
    requestAnimationFrame( Ganimate );
	Gstats.update();
    Grender();

}

function Grender() {
    //mesh.rotation.x += 0.01;
//	if (Gobject) {
//		Gobject.rotation.z += 0.02;
//	}
	//light1.position.z -= 1;

	Grenderer.render( Gscene, Gcamera );
}