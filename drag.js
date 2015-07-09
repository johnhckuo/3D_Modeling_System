
var DragUpload={};
function $(id){
  return document.getElementById(id);
}

function init(){


  $("div1").addEventListener("drop",drop,false);
  $("div1").addEventListener("dragenter",dragenter,false);
  $("div1").addEventListener("dragleave",dragleave,false);
  $("div1").addEventListener("dragover",dragover,false);


  /*$("physical").addEventListener("drop",drop,false);
  $("physical").addEventListener("dragenter",dragenter,false);
  $("physical").addEventListener("dragleave",dragleave,false);
  $("physical").addEventListener("dragover",dragover,false);*/

  //$("physicalnormData").onchange = function(){preview(this,event);};

  }

function dragenter(e){
  e.preventDefault();
  e.stopPropagation();
 // if (e.target.id == "second" || e.target.id == "physical"){
 //   $(e.target.id).style.opacity=1;
 // }
}

function dragover(e)
{
  e.preventDefault();
  e.stopPropagation();
 // if (e.target.id == "second" || e.target.id == "physical"){
 //   $(e.target.id).style.opacity=1;
 // }
}

function dragleave(e){
  e.preventDefault();
  e.stopPropagation();
 // if (e.target.id == "second" || e.target.id == "physical"){
  //  $(e.target.id).style.opacity=.4;
//  }
}

function drop(e){

  if (e.target.id == "div1" ){
    DragUpload.target = {id:e.target.id};
    e.preventDefault();
    e.stopPropagation();
    var files = e.dataTransfer.files;

    var xhr = new XMLHttpRequest();
    var fd = new FormData();

    xhr.open("POST","upload.php");
    xhr.onload=function(){
		
		var temp = DragUpload.target.id+"Progress";
		$(temp).style.opacity=0;
        
    };

    xhr.upload.onprogress=function(e){
      if (e.lengthComputable){
        var progress = (e.loaded/e.total)*100;
        if (progress == 100)
          progress = 99.9;
        var temp = DragUpload.target.id+"Progress";
        $(temp).style.height=progress*(360/100)+"px";                      // depend on the height of the progress height
      }
    };
    for (var i in files){
        if (files[i].type =="image/jpeg"){
          var fr = new FileReader();
          fr.onload=openfile;
          fr.readAsDataURL(files[i]);
		  fd.append("ff[]",files[i]);
        }
    }
    xhr.send(fd);

  }
}




window.addEventListener("DOMContentLoaded",init,false);