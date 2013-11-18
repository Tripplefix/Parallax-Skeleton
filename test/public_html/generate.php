<!DOCTYPE html>
<html>


<head>
<title>Parallax Skeleton Generator</title>
<link rel="stylesheet" type="text/css" href="css/generator.css">
</head>

<body>

<div id="work">

<?php

	echo "<h1>Parallax Skeleton Generator</h1>";




	$blub = $_POST['anzahl'];

    if($blub == null || $blub == 0){
        $anzahl = null;
    }else{
	$anzahl = intval($blub);
    }

	if (isset($_POST['anzahl']) && $anzahl<=10 && is_int($anzahl)){

	$random = rand(1000,10000);
			$content =
'<!DOCTYPE html>
<html>
	<head>
		<title>Sitetitle</title>
		<!--Parallax CSS-->
		<link rel="stylesheet" type="text/css" href="css/parallax'.$random.'.css">
		<!--Custom Scrollbar CSS -->
		<link href="css/jquery.mCustomScrollbar.css" rel="stylesheet" type="text/css" />
		<!--jQuery-->
		<script src="js/jquery-1.9.1.min.js"></script>
		<!--Navigation CLick -> Scroll to Element JS-->
		<script src="js/jquery.localscroll-1.2.7-min.js"></script>
		<script src="js/jquery.scrollTo-1.4.3.1-min.js"></script>
		<!--Custom Scrollbar JS -->
		<script src="js/jquery.mCustomScrollbar.min.js"></script>
		<!--Parallax JS -->
		<script src="js/parallax'.$random.'.js"></script>
	</head>
    <body>
		<!--Navigation href="#+id" -->
		<ul id="nav">';
		for($i=1;$i<=$anzahl;$i++)
		{
			$content .= '<li><a href="#parallax'.$i.'" title="Next Section"><img src="media/dot.png" alt="Link" /></a></li>';
		}
		$content .= '
		</ul>';
		for($i=1;$i<=$anzahl;$i++){
			$content .= '
		<div id="parallax'.$i.'"></div>
		<div class="bigstory">
			<h1>Titel</h1>
			<p>Text</p>
		</div>';
		}
		$content .= '
	</body>
</html>';

		



	//Generate HTML
	$file = "./generated/parallax$random.html";

			

			

			
			
if(file_put_contents($file,$content)!=false){
    echo "HTML File created<br>";
}else{
    echo "Cannot create HTML<br>";
}


/*CSS*/
		$content = 'body,html{
	padding:0;
	margin:0;
	font-size: 16px;
	font-family: "Prosto One", cursive;
	overflow: auto;
}

#nav{
	position: fixed;
	top:10px;
	left:10px;
	list-style: none;
	z-index: 999;
}
div.bigstory{
    margin: 0 auto;
    /*min-width: 980px;*/
    width: 100%;
    z-index: 999;
    background:url("../media/bigstory.jpg");
    color:#38373D;
    display: block;
	overflow: auto;
height:350px;
text-align: center;

}
.bigstory p{
	font-size: 1.25em;
	width:50%;
	position:relative;
	margin:0 auto;
	margin-top:50px;
}
.bigstory h1{
	margin-top:50px;
}';

for($i=1;$i<=$anzahl;$i++){

	$content .= '#parallax'.$i.'{

	background:url(../media/hip'.$i.'.jpg)0 0 no-repeat fixed;
	background-color: black;
	background-size: 100% 100%;
	height: 600px;
	width:100%;
	margin:0;
	padding:0;
	/*z-index: 3;*/
	position:relative
}';
}
	//Generate CSS

	$file = "./generated/css/parallax$random.css";

if(file_put_contents($file,$content)!=false){
    echo "CSS File created<br>";
}else{
    echo "Cannot create CSS File<br>";
}

$content = '
$(window).load(function(){
$.localScroll();
$(".bigstory").mCustomScrollbar();

/*parallax Scrolling*/
(function($){
    $.fn.parallax = function(options){
        var $$ = $(this);
        offset = $$.offset();
        var defaults = {
            "start": 0,
            "stop": offset.top + $$.height(),
            "coeff": 0.95,
            "margin":0, //added
            "rotate":0
        };
        var opts = $.extend(defaults, options);
        return this.each(function(){
            $(window).bind("scroll", function() {
                windowTop = $(window).scrollTop();
                if((windowTop >= opts.start) && (windowTop <= opts.stop)) {
                    newCoord = opts.margin + windowTop * opts.coeff; //added
                    $$.css({
                        "background-position": "0 "+ newCoord + "px"
                    });
                }
            });
        });
    };
})(jQuery);';
$margin = -200;
for($i=1;$i<=$anzahl;$i++){
	$content .= '$("#parallax'.$i.'").parallax({"margin":'.$margin.',"coeff":-0.4});';
	$margin = $margin + 400;
}
$content .= '});';

	//Generate JS

	$file = "./generated/js/parallax$random.js";

if(file_put_contents($file,$content)!=false){
    echo "JS File created<br>";
}else{
    echo "Cannot create JS File<br>";
}

//Zip Class
class FixedZipArchive extends ZipArchive {
        private $mMode; 
        private $mFilename; 
        private $mFDCount; 

        const FD_MAX=250; 

        public function open($file, $mode){ 
                $ret = parent::open($file, $mode); 
                if ($ret === true){ 
                        $this->mFDCount=0; 
                        $this->mMode=$mode; 
                        $this->mFilename=$file; 
                } 
                return $ret; 
        } 

        public function addFile($file, $localName=null){ 
                $ret=parent::addFile($file, $localName); 
                if ($ret === true){ 
                        if ($this->mFDCount++ >= self::FD_MAX){ 
                                $this->close(); 
                                $ret = $this->open($this->mFilename, ($this->mMode & ~self::OVERWRITE)); 
                                if ($ret !== true){ 
                                        $ret=false; 
                                } 
                                $this->mFDCount=0; 
                        } 
                } 
                return $ret; 
        } 
} 
//END Zipper Class


//Create ZIP Function
function zip_write ($type, $name, $src){ 
    $zip = new FixedZipArchive(); 
    if (($ret=$zip->open($name, ZipArchive::CREATE|ZIPARCHIVE::OVERWRITE)) !== true){ 
    } 

    if ($type == "SQL"){ 
        foreach ($src as $value) { 
            exec ("mysqldump --opt -h'xxx' -u'yyy' -p'zzz' db_name $value > $value.sql"); 
            $zip->addFile("./".$value.".sql", $value.".sql"); 
            unlink ($value.".sql"); 
        } 
    } 
    elseif ($type == "DIR") { 
        foreach ($src as $path => $newdir) { 
            $dirContents = glob($path.'/*'); 
            $zip->addEmptyDir($newdir); 
            foreach ($dirContents as $file) { 
                    if (is_file($file)){ 
                        $zip->addFile($file, $newdir.'/'.basename($file)); 
                    } 
            } 
        } 
    } 
    $zip->close(); 
} //End create Zip Function

zip_write('DIR', './zips/parallax'.$random.'.zip', array('./generated/css'=>'css', './generated/js' => 'js', './generated/media' => 'media', './generated' => ''));


while(file_exists("./zips/parallax".$random.".zip") == false){
    echo "Creating Zip";
    sleep(1000);
}
$unlinkhtml = './generated/parallax'.$random.'.html';
$unlinkcss = './generated/css/parallax'.$random.'.css';
$unlinkjs = './generated/js/parallax'.$random.'.js';
unlink($unlinkhtml);
unlink($unlinkcss);
unlink($unlinkjs);
echo 'Parallax mit '.$anzahl.' Layer created<br>';
echo '<h3><a style="color:white;" href="zips/parallax'.$random.'.zip">Parallax Skeleton ready to Download</a></h3>';
$content = null;
$anzahl = null;
$random = null;


}else{
    if(isset($_POST['anzahl'])){
        echo '<span style="color:red">Number of Layers invalid</span>';
    }else{
    echo 'Input number of Layer';
}
}

?>



<form action="<?php echo $_SERVER["PHP_SELF"] ?>" method="post">
		
	<input type="text" width="200px" name="anzahl" placeholder="Number of Layers <=10" value=""/>

    <input type="submit" value="Los"> 

</form>

<h1>Short Info</h1>
<p>- The generator creates 3 individual files for you: 1 HTML, 1 CSS and 1 JS file.<br>
- The generated files become ziped together with the needed libraries and base style file<br><br>
Of course you don't want a Parallax site with 10 identical images, so you have to replace the
example image with your own images. The files must be called "hip[layernumber].jpg". Example: <br>
If you have generated a Parallax site with 4 layers, your images must be named
- hip1.jpg
- hip2.jpg
- hip3.jpg
- hip4.jpg<br>
If you dont want to use .jpg files or you dont like the filename, you have to edit the CSS file only.
Just replace the lines "background:url(../media/hip[layernumber].jpg);" with your own code.
<br><br>
<h3>!You need to use Images with a minimum height of 600 pixels, to make your Parallax looks good!</h3>
</p>




</div>




</body>


</html>
