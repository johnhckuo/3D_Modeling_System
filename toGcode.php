
<?php
$filename = 'model';
exec("/home/johnhckuo/Slic3r/slic3r.pl /var/www/three/stl/".$filename.".stl");
echo $filename;

exec("/usr/bin/wget -P ../.octoprint/uploads/ -N  http://140.127.233.248/three/stl/model.gcode ");
exec("./home/johnhckuo/Octoprint/run");

//$namePieces = explode(".", $_FILES["file"]["name"]);
//header("Location:http://140.127.218.238/gcode-viewer/web/index.php?file=".$namePieces[0].".gcode");

?>
