$("#settings").click(function(){
  window.location.replace("/settings");
});

$("#submit").click(function(){
  var dataObj = {};
  var dataArray = [].slice.call(document.getElementsByTagName("textarea"));
  var questionArray = [].slice.call(document.getElementsByTagName("p"));
  for(var i = 0; i < dataArray.length; i++) {
    dataObj['data' + i] = {
      question: dataArray[i].value,
      content: questionArray[i].value
    };
  }
  console.log(dataObj);
  // dataArray.forEach(function(x) {
  //   dataObj['data' + Object.keys(dataObj).length] = x.value;
  // });
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
  // xhr.send(JSON.stringify(dataObj));
});

$("#next").click(function(){
  $.get('/next', function(data) {
    console.log(data);
  });
});
//
// var serverGrab = function() {
//   $.get('/loadImages', function(data) {
//     var files = JSON.parse(data).sort(sortFiles);
//     var accessDOM = '';
//     var fileLoad = files.length > 50 ? 50 : files.length;
//     for(var i = 0 ; i < fileLoad; i++) {
//       accessDOM += addDivs(files[i]);
//     }
//     $("#imageContainer").html(accessDOM);
//     loveClick();
//   });
