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
        "user-agent": "mvp-funnel-App" // GitHub is happy with a unique user agent
    }
});

github.authenticate({
    type: "oauth",
    token: "8a1d08c6126201302142c39078ab7d47c8eab2c1"
    // "d236c7523ec4b5b91b4689dfaf619a50206a9672"
});

github.authenticate({
    type: "oauth",
    key: "639ce8f90b60a61055ac",
    secret: "b22fe8aac0b12cdc53a7e54dc81f6c7b5f0685e1"
});

github.repos.createFile({

    // headers: Optional. Key/ value pair of request headers to pass along with the HTTP request.
    // Valid headers are: 'If-Modified-Since', 'If-None-Match', 'Cookie', 'User-Agent', 'Accept', 'X-GitHub-OTP'.
    // id: 37860032,
    user : "jmnr",
    repo : "mvp-funnel",
    content: "bW9ua2V5",
    message: "remote content write test",
    path : "test.md",
    branch : "github",
}, function(err, res) {
    console.log(res);
});
