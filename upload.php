<?php
// var_dump($_POST);
// var_dump($_FILES);

move_uploaded_file($_FILES['file']['tmp_name'],'upload/'. $_FILES['file']['name']);

$array = ['filename' => $_FILES['file']['name']];
header('Content-type: application/json');
echo json_encode($array);