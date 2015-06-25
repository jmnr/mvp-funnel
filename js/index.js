var dataObj = {};

var dataUpdate = function() {
  dataObj[document.getElementById("question").textContent] = document.getElementById("answer").value;
};

window.onload = function () {
  // var div = document.getElementsByClassName("current")[0].id;

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
  // var questionArray = [].slice.call(document.getElementsByTagName("p")),
  //     contentArray = [].slice.call(document.getElementsByTagName("textarea"));

  // for(var i = 0; i < questionArray.length; i++ ) {
  //   dataObj.push(questionArray[i].textContent);
  //   dataObj.push(contentArray[i].value);
  // }
  // console.log(dataObj);

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/mvpSubmit");
  xhr.onreadystatechange = function(){
    if(xhr.readyState === 4){
      if(xhr.status === 200){
        alert("Sent!");
      }
      else{
        alert("Error");
      }
    }
  };
  console.log(dataObj);
  xhr.send(JSON.stringify(dataObj));
});

$('body').on('click', '#previous', function(){
  if(!document.getElementsByClassName("end")) {
    dataUpdate();
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
          $("#answer").val(dataObj[document.getElementById("question").textContent]);
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
  dataUpdate();

  var divNum = Number(document.getElementsByClassName("current")[0].id[3]) + 1;
  console.log(divNum);

  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/divLoad?key=" + divNum);

  xhr.onreadystatechange = function(){
    if(xhr.readyState === 4){
      if(xhr.status === 200){
        $("#input").html(xhr.responseText, function() {
          $("#answer").val(dataObj[document.getElementById("question").textContent]);
        });
      }
      else{
        alert("Error");
      }
    }
  };

  xhr.send();
});
