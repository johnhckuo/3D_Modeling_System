var STLmesh,STLstats,STLrenderer,STLscene,STLcamera;
var STLflag = 0 ;
function STLreader(filename){	
	// ASCII file
	
	var loader = new THREE.STLLoader();
	loader.addEventListener( 'load', function ( event ) {

		var geometry = event.content;
		var material = new THREE.MeshPhongMaterial( { ambient: 0xff5533, color: 0xff5533, specular: 0x111111, shininess: 200 } );
		var mesh = new THREE.Mesh( geometry, material );

		mesh.position.set( 0, 0, 0 );


		mesh.castShadow = true;
		mesh.receiveShadow = true;
		scene.add( mesh );
		objects.push(mesh);
		sumCreator(mesh,0);
	} );
	loader.load( 'stl/'+filename+'.STL' );

	

/*

	// Binary files

	var material = new THREE.MeshPhongMaterial( { ambient: 0x555555, color: 0xAAAAAA, specular: 0x111111, shininess: 200 } );

	var loader = new THREE.STLLoader();
	loader.load( 'stl/'+filename+'.STL'  );
	loader.addEventListener( 'load', function ( event ) {

		var geometry = event.content;
		var mesh = new THREE.Mesh( geometry, material );

		mesh.position.set( 0, - 0.37, - 0.6 );
		mesh.rotation.set( - Math.PI / 2, 0, 0 );
		mesh.scale.set( 2, 2, 2 );

		mesh.castShadow = true;
		mesh.receiveShadow = true;
		startExport(mesh);
		scene.add( mesh );
		
	} );
*/

}

function STLviewer(filename){	
	// ASCII file
	
	if (STLflag)
		STLscene.remove(STLmesh);
	
	var loader = new THREE.STLLoader();
	loader.addEventListener( 'load', function ( event ) {
		
		var geometry = event.content;
		var material = new THREE.MeshPhongMaterial( { ambient: 0xff5533, color: 0xff5533, specular: 0x111111, shininess: 200 } );
		STLmesh = new THREE.Mesh( geometry, material );

		STLmesh.position.set( 0, 0, 0 );
	//	STLmesh.rotation.set( Math.PI*1.5, 0, 0 );
	//	STLmesh.scale.set( 10, 10, 10 );

		STLmesh.castShadow = true;
		STLmesh.receiveShadow = true;
		STLinit();
		if (STLflag == 1)
			STLanimate();
		
	} );
	loader.load( 'stl/'+filename );
}


function STLinit(){

	if (!STLflag){
		// SCENE
		STLscene = new THREE.Scene();

		// CAMERA

		var VIEW_ANGLE = 90, ASPECT = 300/300, NEAR = 0.1, FAR = 20000;
		STLcamera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
		STLscene.add(STLcamera);
		STLcamera.position.set(0,50,100);
		
		camera.lookAt(0,0,0);
		STLrenderer = new THREE.WebGLRenderer( {antialias:true, alpha: true } );
		STLrenderer.setSize(300, 400);
		STLrenderer.setClearColor( 0x000000, 1 );
		
		
		var container = document.getElementById( 'stlRenderer' );
		container.appendChild( STLrenderer.domElement );
		

		//stat
		STLstats = new Stats();
		STLstats.domElement.style.position = 'absolute';
		STLstats.domElement.style.right = '0px';
		STLstats.domElement.style.top = '0px';
		container.appendChild(STLstats.domElement);

		// LIGHT
		var light = new THREE.PointLight(0xffffff,2);
		light.position.set(0,300,300);

		STLscene.add(light);
		
		
		//STLObject
		
		
	}
	STLflag++;
	STLscene.add(STLmesh);
}

function STLanimate() {

	// note: three.js includes requestAnimationFrame shim
	requestAnimationFrame( STLanimate );
	STLstats.update();
	STLrender();
}

function STLrender() {
    //mesh.rotation.x += 0.01;
    if (STLmesh) {
		STLmesh.rotation.y += 0.02;
    }
	//light1.position.z -= 1;

	STLrenderer.render( STLscene, STLcamera );
	document.getElementById("stlRenderer").addEventListener( 'mousewheel' ,  zoom , false);

}
	function zoom(event){
		if (event.wheelDelta >=120){
			STLmesh.scale.x +=0.05;
			STLmesh.scale.y +=0.05;
			STLmesh.scale.z +=0.05;
		}
		else if(event.wheelDelta <=-120){
			STLmesh.scale.x -=0.05;
			STLmesh.scale.y -=0.05;
			STLmesh.scale.z -=0.05	;
					
		}

		return false;
	}