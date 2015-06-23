// IMPORTANT: run 'npm install github' or none of this will work

var GitHubApi = require("github");

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
        "user-agent": "My-Cool-GitHub-App" // GitHub is happy with a unique user agent
    }
});

github.authenticate({
    type: "oauth",
    key: "clientID",
    secret: "b22fe8aac0b12cdc53a7e54dc81f6c7b5f0685e1"
})

github.repos.getContent({

    // headers: Optional. Key/ value pair of request headers to pass along with the HTTP request.
    // Valid headers are: 'If-Modified-Since', 'If-None-Match', 'Cookie', 'User-Agent', 'Accept', 'X-GitHub-OTP'.
    // id: 37860032,
    user : "jmnr",
    repo : "mvp-funnel",
    // content: "monkey",
    // message: "remote content write test",
    path : "README.md",
    ref : "github"
}, function(err, res) {
    console.log(res);
});
