var clientDataObj = {};

var clientDataUpdate = function() {
  clientDataObj[document.getElementById("question").textContent] = document.getElementById("answer").value;
};

window.onload = function () {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/divLoad?key=0", true);
  xhr.onreadystatechange = function(){
    if(xhr.readyState === 4){
      if(xhr.status === 200){
        $("#input").html(xhr.responseText);
      }
      else{
        alert("Error");
      }
    }
  };
  xhr.send();
};

$('body').on('click', '#settings', function(){
  window.location.replace("/settings");
});

$('body').on('click', '#submit', function(){
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/mvpSubmit");
  xhr.onreadystatechange = function(){
    if(xhr.readyState === 4){
      if(xhr.status === 200){
        alert("Sent!");
        window.location.replace("https://calendly.com/joshpitzalis-1");
      }
      else{
        alert("Error");
      }
    }
  };

  xhr.send(JSON.stringify(clientDataObj));
});

$('body').on('click', '#previous', function(){
  if(!document.getElementsByClassName("end")) {
    clientDataUpdate();
  }

  divNum = Number(document.getElementsByClassName("current")[0].id[3]) - 1;
  divNum = divNum === -1 ? 0 : divNum;
  console.log(divNum);
  var xhr = new XMLHttpRequest();

  xhr.open("GET", "/divLoad?key=" + divNum);

  xhr.onreadystatechange = function(){
    if(xhr.readyState === 4){
      if(xhr.status === 200){
        $("#input").html(xhr.responseText, function() {
          $("#answer").val(clientDataObj[document.getElementById("question").textContent]);
        });
      }
      else{
        alert("Error");
      }
    }
  };

  xhr.send();
});

$('body').on('click', '#next', function(){
  clientDataUpdate();

  var divNum = Number(document.getElementsByClassName("current")[0].id[3]) + 1;
  console.log(divNum);

  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/divLoad?key=" + divNum);

  xhr.onreadystatechange = function(){
    if(xhr.readyState === 4){
      if(xhr.status === 200){
        $("#input").html(xhr.responseText, function() {
          $("#answer").val(clientDataObj[document.getElementById("question").textContent]);
        });
      }
      else{
        alert("Error");
      }
    }
  };

  xhr.send();
});
