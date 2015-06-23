$("#submit").click(function(){
  var dataArray = document.getElementsByTagName("textarea");
  console.log(dataArray);
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
  // xhr.send(dataArray);
});