<html>
<head>
	<script src="//code.angularjs.org/snapshot/angular.min.js"></script>
    <script src="https://code.jquery.com/jquery-1.9.1.min.js"></script>
  <link rel="stylesheet" type="text/css" href="style.css">

</head>
<body>
	<div id="popup" class="popup">
	  <form  id="myForm" name="formdate" action="insert.php"  method="post">
	    <div>
	      <h3>Podaj date rozpoczęcia wydarzenia: </h3>
	        <input type="date" name="start_date" required/>
	      <h3>Podaj godzine rozpoczęcia wydarzenia: </h3>
	          <input type="time" name="start_date_time" required/>
	      <h3>Podaj date zakończenia wydarzenia: </h3>
	          <input type="date" name="end_date" required/>
	      <h3>Podaj godzine zakończenia wydarzenia: </h3>
	          <input type="time" name="end_date_time" required/>
	      <h3>Podaj opis wydarzenia: </h3>
	          <input type="text" name="description" required/>
	    </div>
	  <input id="submitbutton" onclick="checkForm()" type='button' value='continue'>
	  </form>
	</div>


  <div id="container" class="container">
    <div class="card">
      <div class="front">

				<div id="month" class="">

				</div>


      </div>
      <div class="back">
        <!---<div class="contentback">
          <div class="backcontainer">
            hhh
          </div>
        </div>--->
      </div>
    </div>
  </div>


	<script src="script.js">startTime() cal.init()</script>
	<script src="script2.js"></script>
	<script>
        
	var d2 = document.getElementById('events');
	if(d2.value != null){
		var d3 = d2.value;
	}</script>
	<?php       
        
	$con = @new mysqli("localhost","root","","baza1");
	$sql="select * from event where '2019-11-21' between start_date and end_date";
	$result = $con->query($sql);

	if ($result->num_rows > 0) {
		// output data of each row
		while($row = $result->fetch_assoc()) {?><script>
			d2.innerHTML = "<?php
			echo "<div> Start:" . $row["start_date"]. " godz: " . $row["start_date_time"]. "</br> Koniec: ". $row["end_date"]." Godz: ". $row["end_date_time"]."</br> OPIS:". $row["description"]."<button id='updateevent'>U</button><button id='removeevent'>X</button></div>";
		}
	} else {
		echo "0 results";
	}


	 ?>";</script>
	
	


	
</body>
</html>
