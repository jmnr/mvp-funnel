$("#submit").click(function(){
  var data = document.getElementById("textArea").value;
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/settingsSubmit");
  xhr.onreadystatechange = function(){
    if(xhr.readyState === 4){
      if(xhr.status === 200){
        alert("Updated!");
      }
      else{
        alert("Error");
      }
    }
  };
  xhr.send(data);
});