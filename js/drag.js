			function onDocumentMouseDown( event ) {

				event.preventDefault();
				var vectorDrag = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
				projector.unprojectVector( vectorDrag, camera );

				var raycaster = new THREE.Raycaster( camera.position, vectorDrag.sub( camera.position ).normalize() );

				var intersects = raycaster.intersectObjects( objects );
				
				if ( intersects.length > 0 ) {
					controls.enabled = false;		
				//	SELECTED.currentHex = SELECTED.color.getHex();
					SELECTED = intersects[ 0 ].object;
					SELECTED.material.color.setHex( 0xff0000 );
					SELECTED.material.transparent =  true ;
					SELECTED.material.opacity =  0.5 ;
					
			//		var intersects = raycaster.intersectObject( plane );
			//		offset.copy( intersects[ 0 ].point ).sub( plane.position );
					container.style.cursor = 'move';
				}
			}
			
			function onDocumentMouseMove( event ) {
		
				event.preventDefault();
				mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
				mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
				var vectorDrag = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
				projector.unprojectVector( vectorDrag, camera );
				var raycaster = new THREE.Raycaster( camera.position, vectorDrag.sub( camera.position ).normalize() );
				if ( SELECTED ) {
					var intersects = raycaster.intersectObject( plane );
			//		SELECTED.position.copy( intersects[ 0 ].point.sub( offset ) );
					SELECTED.position.copy( intersects[ 0 ].point );
					
					var intersects = raycaster.intersectObjects(objects );
		//			alert(index);
					for (var index in objects){
						console.log(objectOffset[index]);
				
						if (SELECTED.name == objects[index].name){
							SELECTED.position.y += objectOffset[index];
							break;
						}
					}
					
		//			alert(SELECTED.position.y);
					return;    //improve efficiency

				}         
				
				
				
				

			//	var intersects = raycaster.intersectObjects( objects );

			//	if ( intersects.length > 0 ) {

			//		if ( INTERSECTED != intersects[ 0 ].object ) {

					//	if ( INTERSECTED ) INTERSECTED.material.color.setHex( INTERSECTED.currentHex );

			//			INTERSECTED = intersects[ 0 ].object;
					//	INTERSECTED.currentHex = INTERSECTED.material.color.getHex();

			//			plane.position.copy( INTERSECTED.position );
			//			plane.lookAt( camera.position );

			//		}

			//		container.style.cursor = 'pointer';

			//	} else {

				//	if ( INTERSECTED ) INTERSECTED.material.color.setHex( INTERSECTED.currentHex );

			//		INTERSECTED = null;

			//		container.style.cursor = 'auto';

			//	}

			}

			

			function onDocumentMouseUp( event ) {
			//	console.log(plane.position.x);
			//		console.log(plane.position.y);
			//		console.log(plane.position.z);
				event.preventDefault();

				controls.enabled = true;

				if ( SELECTED ) {
			//		plane.position.copy( INTERSECTED.position );
					SELECTED.material.color.setHex(0xffffff);
					SELECTED.material.transparent =  false ;
					SELECTED.material.opacity =  1 ;
					SELECTED = null;

				}

				container.style.cursor = 'auto';

			}
			
			function lockDown(event){
				event.preventDefault();			
				
				
				var vectorDrag = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
				projector.unprojectVector( vectorDrag, camera );

				var raycaster = new THREE.Raycaster( camera.position, vectorDrag.sub( camera.position ).normalize() );
				var intersects = raycaster.intersectObjects( objects );
			/*	if (intersects.length>0){
					controls.enabled = false;	
					var index = intersects[0].object.name.split('.')[1];
					objects.splice(index,1);
					objectOffset.splice(index,1);
					scene.remove(intersects[0].object);
				}  */
				var helper = document.getElementById('helper');
				var helperback = document.getElementById('helperback');
				var content2 = document.getElementById("helperContent2");
				var content = document.getElementById("helperContent");
				
				if (intersects.length>0){
					if (targetObject!=null){
						targetObject.material.color.setHex(0xffffff); // there is also setHSV and setRGB
					}
					targetObject = intersects[0].object;
					targetObject.material.color.setHex(0xff0000); // there is also setHSV and setRGB
	
					helper.style.opacity = 1;
					helperback.style.opacity = .7;
					helper.style.height = 200;
					if (content.className == 'show'){
						document.getElementById("helperContent2").innerHTML = "<h2>物件進階設定</h2>物件呈現紅色表示已被選取，可進行以下進階操作：<p>1. 使用鍵盤↑↓←→可控制物件移動。<p>2. 按下DELETE可刪除物件。<p>3. 按下右邊Advance面板可進行更多設定。<p>4. 按下左邊Attribute中的「觀看角度」，可從更多角度欣賞您的作品。";
						document.getElementById("helperContent2").style.opacity = 1;
						document.getElementById("helperContent").style.opacity = 0;
						content.className = 'hide';
						content2.className = 'show';
					}
					else{
						document.getElementById("helperContent").innerHTML = "<h2>物件進階設定</h2>物件呈現紅色表示已被選取，可進行以下進階操作：<p>1. 使用鍵盤↑↓←→可控制物件移動。<p>2. 按下DELETE可刪除物件。<p>3. 按下右邊Advance面板可進行更多設定。<p>4. 按下左邊Attribute中的「觀看角度」，可從更多角度欣賞您的作品。";
						document.getElementById("helperContent").style.opacity = 1;
						document.getElementById("helperContent2").style.opacity = 0;
						content.className = 'show';
						content2.className = 'hide';
					}
			//		helper.innerHTML="<h3>小提示</h3>選擇物件後，可針對該物件進行設定：<br/>
		//			<ul>
			//		<li>按下↑↓←→可進行移動，DELETE為刪除物件。</li>
		//			<li>點選右邊的進階控制面板，有更多選擇。</li>
		//			<li>點選Attribute中的「觀看角度」，可從精確的角度觀看物件。</li>
		//			</ul>";
				}
				else{
					var intersects = raycaster.intersectObjects( voxel );
					if (intersects.length>0){
						if (targetObject!=null){
							targetObject.material.color.setHex(0xffffff); // there is also setHSV and setRGB
						}
						targetObject = intersects[0].object;
						targetObject.material.color.setHex(0xff0000); // there is also setHSV and setRGB
					}
					else{
						if (targetObject!=null){
							targetObject.material.color.setHex(0xffffff); // there is also setHSV and setRGB
							targetObject = null;
						}
					}
				}
			
			}

			function voxelLock(event){
				event.preventDefault();			
				
				var vectorDrag = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
				projector.unprojectVector( vectorDrag, camera );

				var raycaster = new THREE.Raycaster( camera.position, vectorDrag.sub( camera.position ).normalize() );
				var intersects = raycaster.intersectObjects( voxel );
			/*	if (intersects.length>0){
					controls.enabled = false;	
					var index = intersects[0].object.name.split('.')[1];
					objects.splice(index,1);
					objectOffset.splice(index,1);
					scene.remove(intersects[0].object);
				}  */

				if (intersects.length>0){
					if (targetObject!=null){
						targetObject.material.color.setHex(0xffffff); // there is also setHSV and setRGB
					}
					targetObject = intersects[0].object;
					targetObject.material.color.setHex(0xff0000); // there is also setHSV and setRGB
				}
				else{
					if (targetObject!=null){
						targetObject.material.color.setHex(0xffffff); // there is also setHSV and setRGB
						targetObject = null;
					}
				}
			
			}
				