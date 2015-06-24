module.exports = [

    {
    method : 'GET',
    path : '/',
        handler: function(request, reply){
          reply.file('authtml/index.html');
        }
    },

    {
    method :'GET',
    path : '/login',
    config: {
        auth:'github',
            handler : function(request, reply){
            var creds = request.auth.credentials;
            //console.log(creds);

            var ghProfile = {
                id: creds.profile.id,
                fullName: creds.profile.displayName,
                username: creds.profile.username,
                email: creds.profile.email,
            };

            console.log(creds.token);

            //console.log(ghProfile);
            var authToken = creds.token;
            request.auth.session.clear();
            request.auth.session.set(creds);
            reply.file('authtml/feed.html');
            }
        }
    },
    {
    method : 'GET',
    path : '/feed',
        handler: function(request, reply){
        reply.file('authtml/feed.html');
        }
    },
    {
    method :'GET',
    path : '/logout',
    config: {
        auth:{
        strategy:'session',
        },
            handler: function(request, reply){
                var creds = request.auth.credentials;
                request.auth.session.clear();
                //request.auth.session.set(request.auth.credentials.profile);
            return reply.redirect('/');
            }
        }
    },

];
