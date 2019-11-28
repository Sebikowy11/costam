

var evadd = document.getElementById("eventsDateAddbutton");
evadd.addEventListener("click", showpopup);

function showpopup(){
  var popup = document.getElementById("popup");
  popup.classList.add("showpopup");
  console.log("XDDDDDDD");

}
var $popup = $('#popup');

$('body').on('click', function(ev) {
  var popup = document.getElementById("popup");
  popup.classList.remove("showpopup"); // click anywhere to hide the popup; all click events will bubble up to the body if not prevented
});


$popup.on('click', function(ev) {
   ev.stopPropagation(); // prevent event from bubbling up to the body and closing the popup
});


function checkForm() {
// Fetching values from all input fields and storing them in variables.
var sd = document.forms["formdate"]["start_date"].value;
var sdt = document.forms["formdate"]["start_date_time"].value;
var ed = document.forms["formdate"]["end_date"].value;
var edt = document.forms["formdate"]["end_date_time"].value;
sd = new Date(sd);
ed = new Date(ed);
var hms1 = sdt;
var hms2 = edt;   // your input string
var a1 = hms1.split(':');
var a2 = hms2.split(':'); // split it at the colons
// minutes are worth 60 seconds. Hours are worth 60 minutes.
var sdt1 = (+a1[0]) * 60  + (+a1[1]);
var edt1 = (+a2[0]) * 60  + (+a2[1]);




console.log("12121212");
console.log(sd);
console.log(sdt1);
console.log(ed);
console.log(edt1);
console.log(edt1-sdt1);

if(sd-ed>0){
  console.log("podaj poprawne");
  return false;

}
if(sd == ed){
  if((edt1-sdt1)<30){
    console.log("podaj poprawne");
    return false;
  }
  else {
    console.log("podaj poprawne11111");
    // document.getElementById("myForm").submit();
    $.ajax({
  type: "POST",
  url: "insert.php",
  data: $("#myForm").serialize(),
  success: function(data) {
     alert("dodano");
     var popup = document.getElementById("popup");
     popup.classList.remove("showpopup");
     return true;
  }
});

  }
}
if(sd-ed<0){
  alert("GITUWA11");
  // document.getElementById("myForm").submit();
  $.ajax({
type: "POST",
url: "insert.php",
data: $("#myForm").serialize(),
success: function(data) {
   alert("dodano");
   var popup = document.getElementById("popup");
   popup.classList.remove("showpopup");

}
});
  return false;


}
//Check All Values/Informations Filled by User are Valid Or Not.If All Fields Are invalid Then Generate alert.


}
