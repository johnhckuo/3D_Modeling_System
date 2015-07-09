
<?php
if ($_FILES["file"]["error"] > 0) {
  echo "Error: " . $_FILES["file"]["error"] . "<br>";
} else {
  echo "Upload: " . $_FILES["file"]["name"] . "<br>";
  echo "Type: " . $_FILES["file"]["type"] . "<br>";
  echo "Size: " . ($_FILES["file"]["size"] / 1024) . " kB<br>";
  echo "Stored in: " . $_FILES["file"]["tmp_name"];
  move_uploaded_file($_FILES["file"]["tmp_name"], "stl/" . $_FILES["file"]["name"]);
  
  exec("/home/johnhckuo/Slic3r/slic3r.pl /var/www/three/stl/".$_FILES["file"]["name"]);
}

//$namePieces = explode(".", $_FILES["file"]["name"]);
//header("Location:http://140.127.218.238/gcode-viewer/web/index.php?file=".$namePieces[0].".gcode");

?>
