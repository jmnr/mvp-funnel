var mandrill = require("mandrill-api/mandrill"),
    mandrillClient = new mandrill.Mandrill(process.env.MANDRILL_API);

var emailAlert = {
  sendEmail: function(request) {
    var data = {
     'from_email': 'ronan_mccabe@hotmail.com',
     'to': [{
         'email': 'ronan_mccabe@hotmail.com',
         'name': 'Ronan',
         'type': 'to'
      }],
     'autotext': 'true',
     'subject': 'New MVP Lead',
     'html': "Here are the deets."
    };

    mandrillClient.messages.send({"message": data, "async": false}, function(result) {
    }, function(e) {
       console.log("Error " + e.message);
    });
  }
};

module.exports = emailAlert;
