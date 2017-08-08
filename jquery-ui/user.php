<?php 
/*  
    //账号被占用
    if($_GET['user'] == 'Echo'){
    	echo "false";
    }else{
    	echo "true";
    }


 if($_GET['user'] == 'Echo' && $_GET['pass'] == '123456'){
    	echo "true";
    }else{
    	echo "false";
    }
 */ 
   
    if($_POST['user'] == 'Echo' && $_POST['pass'] == '123456'){
    	echo "true";
    }else{
    	echo "false";
    }
   

?>