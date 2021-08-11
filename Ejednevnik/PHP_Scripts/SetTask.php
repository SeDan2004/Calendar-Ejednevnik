<?php 

  $database = mysqli_connect('localhost', 'root', '', 'task_data');

  $str = "INSERT INTO `all_tasks` (`info_task`, `date_task`) VALUES ('%s', '%s')";
  $result = sprintf($str, $_POST['task'], $_POST['data_task']);
  mysqli_query($database, $result);
  

?>