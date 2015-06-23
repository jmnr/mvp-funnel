
console.log("hi");

$("#submit").click(function(){
  console.log("yo");
  var data = document.getElementById("userText").value;
	var xhr = new XMLHttpRequest();
  xhr.open("POST", "/submit");
  xhr.send(data);
});
