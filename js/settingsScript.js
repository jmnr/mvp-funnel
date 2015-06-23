$("#submit").click(function(){
  var dataObj = {};
  var dataArray = [].slice.call(document.getElementsByTagName("textarea"));
  dataArray.forEach(function(x) { 
    dataObj['div' + Object.keys(dataObj).length] = x.value;
  });
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
  xhr.send(JSON.stringify(dataObj));
});

$("#subtract").click(function(){
  $("#inputArea div:last-child").remove();
});

$("#add").click(function(){
  $("#inputArea").append(
    '<div>' +
      '<textarea>' +
      '</textarea>' +
    '</div>'
  );
});