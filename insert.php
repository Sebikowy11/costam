<?php
$con = @new mysqli("localhost","root","","baza1");
if (!$con)
  {
  die('Nie mozna polaczyc: ' . mysql_error());
  }


  $sql="INSERT INTO event (start_date, start_date_time,end_date,end_date_time,description)
  VALUES
  ('$_POST[start_date]','$_POST[start_date_time]','$_POST[end_date]','$_POST[end_date_time]','$_POST[description]')";

$result = mysqli_query($con,$sql);
echo "Dodano wpis!";

?>
