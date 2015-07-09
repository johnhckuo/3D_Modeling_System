
<?php
if ($_FILES["file"]["error"] > 0) {
  echo "Error: " . $_FILES["file"]["error"] . "<br>";
} else {
  echo "Upload: " . $_FILES["file"]["name"] . "<br>";
  echo "Type: " . $_FILES["file"]["type"] . "<br>";
  echo "Size: " . ($_FILES["file"]["size"] / 1024) . " kB<br>";
  echo "Stored in: " . $_FILES["file"]["tmp_name"];
  move_uploaded_file($_FILES["file"]["tmp_name"], "uploads/" . $_FILES["file"]["name"]);
  //exec("/usr/bin/sudo /home/johnhckuo/Slic3r/test.sh ".$_FILES["file"]["name"]);
  exec("/home/johnhckuo/Slic3r/slic3r.pl /var/www/uploads/".$_FILES["file"]["name"]);
}

$namePieces = explode(".", $_FILES["file"]["name"]);
header("Location:http://140.127.233.248/three/STLConverter/gcode-viewer-master/web/index.php?file=".$namePieces[0].".gcode");

?>
