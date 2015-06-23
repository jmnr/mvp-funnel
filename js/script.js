console.log("hi");


$("#submit").click(function(){
  var data = document.getElementById("userText").value;
	var xhr = new XMLHttpRequest();
  xhr.open("POST", "/submit");
  xhr.send(data);
  $("#question").html("{{questionTwo}}");
});
