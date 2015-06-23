var GitHubApi = require("github");
var Config = require('./tokens.json');

var github = new GitHubApi({
    // required
    version: "3.0.0",
    // optional
    debug: true,
    protocol: "https",
    host: "api.github.com", // should be api.github.com for GitHub
    // pathPrefix: "/api/v3", // for some GHEs; none for GitHub
    timeout: 5000,
    headers: {
        "user-agent": "mvp-funnel-App" // GitHub is happy with a unique user agent
    }
});

github.authenticate({
    type: "oauth",
    token: Config.auth.github.token,
    });

github.repos.createFile({

    // headers: Optional. Key/ value pair of request headers to pass along with the HTTP request.
    // Valid headers are: 'If-Modified-Since', 'If-None-Match', 'Cookie', 'User-Agent', 'Accept', 'X-GitHub-OTP'.
    // id: 37860032,
    user : "jmnr",
    repo : "mvp-funnel",
    content: "bW9ua2V5",
    message: "remote content write test6",
    path : "test6.md",
    branch : "github",
}, function(err, res) {
    console.log(res);
});
