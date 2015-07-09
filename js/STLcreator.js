function generateSTL(){
  var vertices = geometryMerge.vertices;
  var tris     = geometryMerge.faces;


  stl = "solid model \n";
  for(var i = 0; i<tris.length; i++){
	
    stl += ("facet normal "+stringifyVector( tris[i].normal )+" \n");
    stl += ("outer loop \n");
    stl += stringifyVertex( vertices[ tris[i].a ] );
    stl += stringifyVertex( vertices[ tris[i].b ] );
    stl += stringifyVertex( vertices[ tris[i].c ] );
    stl += ("endloop \n");
    stl += ("endfacet \n");
	if (i==tris.length-1)
		convertFlag=1;
  }
  stl += ("endsolid pixel");
  return stl

}

function stringifyVector(vec){
  return ""+vec.x+" "+vec.y+" "+vec.z;
}

function stringifyVertex(vec){
  return "vertex "+stringifyVector(vec)+" \n";
}

function removeDuplicateFaces(geometry){
  for(var i=0; i<geometry.faces.length; i++){
    var tri = geometry.faces[i];
    var inds = [tri.a, tri.b, tri.c, tri.d].sort();
    for(var j=0; j<i; j++){
      var tri_2 = geometry.faces[j];
      if( tri_2 !== undefined ){
        var inds_2 = [tri_2.a, tri_2.b, tri_2.c, tri_2.d].sort();
        if( isSame( inds, inds_2 ) ){
          delete geometry.faces[i];
          delete geometry.faces[j];
        }
      }
    }
  }
  geometry.faces = geometry.faces.filter( function(a){ return a!==undefined });
  return geometry;
}

function isSame(a1, a2){
  return !(a1.sort() > a2.sort() || a1.sort() < a2.sort());
}