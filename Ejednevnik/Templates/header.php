<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel='stylesheet' href='./Static/Header/header.css'>
    <script
  src="https://code.jquery.com/jquery-3.6.0.min.js"
  integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
  crossorigin="anonymous"></script>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/gsap/3.7.1/gsap.min.js'></script>
  
    <title>Ежедневник</title>
</head>
<body>
  
  <div class='head'>

    <div class='row'>

      <div class='col-4'></div>
      <?php require_once('./Modules/clock.php')?>
      <div class='col-1'></div>
      <div class='col-3 MonthAndYear'>
        <h1></h1>
      </div>

    </div>

  </div>