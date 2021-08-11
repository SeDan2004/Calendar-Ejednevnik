<?php 

  $database = mysqli_connect('localhost', 'root', '', 'task_data');

  $str = "SELECT * FROM `all_tasks`";
  $res = mysqli_query($database, $str);
  $res = mysqli_fetch_all($res);

  echo count($res);

?>