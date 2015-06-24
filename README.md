# MVP Funnel

This project is a proposed sales funnel for the [Founders & Coders](foundersandcoders.com) website. It functions like a guided, conversational survey, taking customers through a series of questions one at a time.

We are developing this with a view towards it becoming a plugin/package. We are building an easy-to-use interface so non-developers can customise the survey without writing any code.

### Goals
* [ ] Create a place for the prospective MVP clients to provide information and clarify their goals.
* [ ] Create a backend so FAC admins can easily change the questions/content expected without changing code.
* [ ] When data is being submitted, create a repo and README based on the content provided.

### Stretch Goals
* [ ] File upload
* [ ] Admin authentication
* [ ] Email support

### How can you run this project?

This project is currently live on Heroku. You can find it [here](mvpfunnel.herokuapp.com). If you wish to run the project yourself, follow these steps.

You will need to have node.js installed on your system, plus basic knowledge of git and the command line.

**Step One**  
Clone this repo ```git clone https://github.com/jmnr/dark.git```

**Step Two**  
Run ```npm install``` in your terminal to install dependencies

**Step Three**  
Run our tests using ```npm test```

**Step Four**  
Run ```node server.js``` in your terminal

**Step Six**  
You'll need to use your own environment variables for Redis, Mandrill, and any authentication services you use.

**Step Seven**  
Point your browser to localhost:8000
