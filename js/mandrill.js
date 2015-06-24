var mandrill = require("mandrill-api/mandrill");
var mandrill_client = new mandrill.Mandrill(process.env.MANDRILL_SECRET);

var emailAlert = {};
emailAlert.sendEmail = function(request) {
  var data = {
       'from_email': 'msmichellecatherine@gmail.com',
       'to': [
         {
           'email': 'msmichellegar@gmail.com',
           'name': 'michelle',
           'type': 'to'
         }
       ],
         'autotext': 'true',
         'subject': 'New MVP Lead',
         'html': 'Here are the deets.'
};
  mandrill_client.messages.send({"message": data, "async": false},function(result) {
  }, function(e) {
     console.log("Error " + e.message);
  });
};

module.exports = emailAlert;
