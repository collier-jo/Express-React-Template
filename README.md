# Instructions on setting up simple Express-React app:

## Description:

This is a very simple set of instructions to set up a full intergration and unit tested Express app with React components in MVC pattern. 

I would advise running through the instructions yourself however you can copy this project repo by:

* Clone the repo
* Install locally
* Run npm install 
* Run npm start


## Step by step instructions: 

* Mkdir project 
* Cd project 
* npx express-generator projectname -e --hbs
* Npm install
* DEBUG=projectname:* npm start
* Go to bin/www and change the port number on line 15 from 3000 to 9000.

## Set up a test api for react comp: 
(https://www.freecodecamp.org/news/create-a-react-frontend-a-node-express-backend-and-connect-them-together-c5798926047c/)

* On api/routes, create a testAPI.js file and paste this code:

```
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('API is working properly');
});

module.exports = router;

```

* On the api/app.js file, insert a new route:

```
app.use("/testAPI", testAPIRouter);

```

* Ok, you are “telling” express to use this route but, you still have to require it.

```
var testAPIRouter = require("./routes/testAPI");

```

## Time to create react components 

* Cd public 
* Mkdir react 
* Touch app.js 
* In public/app.js: 

```
'use strict';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
}

  callAPI() {
      fetch("http://localhost:9000/testAPI")
          .then(res => res.text())
          .then(res => this.setState({ apiResponse: res }));
  }

  componentWillMount() {
      this.callAPI();
  }

  render() {
    return(
      <div id="full_newsfeed">
        <h1>Hello World</h1>
        <p className="App-intro">;{this.state.apiResponse}</p>
      </div>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.body
);

```

* Go to root folder 
* Cd views 
* Mkdir home 
* Touch index.hbs 
* Insert into index.hbs:

```
<script type="text/babel" src="react/app.js"></script>

```
* CD root folder
* Cd views 
* Go to layout.hbs and insert: 

```
<!DOCTYPE html>
<html>
  <head>
    <title>{{title}}</title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans&family=Orbitron&display=swap" rel="stylesheet">
    <link href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.css" rel="stylesheet"  type='text/css'>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
    <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    <script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react-router-dom/6.0.0-alpha.5/react-router-dom.development.js"></script>
  </head>
  <body>
    {{{body}}}
  </body>
</html>
```

* Add cors > root directory
* Run in terminal: 
```
npm install --save cors
```

* open rootdirectory/app.js
* Insert the following:

``` 
var cors = require("cors");
```
```
app.use(cors());

```

* Connect this React component to the routes via controller 
* Cd root 
* Cd routes 
* Open index.js 
* Insert:

```
var express = require('express');
var router = express.Router();
var HomeController = require('../controllers/home');


/* GET home page. */
router.get('/', HomeController.Index);

module.exports = router;

```
* Cd root 
* Mkdir controllers 
* Cd controllers 
* Touch home.js 
* Insert:

```
var HomeController = {

    Index: function(request, response) {
        response.render('home/index');  
    },
  };
  
  module.exports = HomeController;
  
```
* Npm start > Go to http://localhost:9000/
* Should see onscreen: 

```
Hello World 

;API is working properly

```
￼
* Close server 

## Install Tests and other dependancies

(via Terminal run the following)
```
npm install cypress --save-dev
node_modules/.bin/cypress open
npm install --save-dev jest
mkdir spec
npm install --save-dev nodemon
npm install eslint --save-dev
```

* Update scripts in package.json to:
```
  "scripts": {
    "start" : "DEBUG=PROJECT NAME:* npm run start:server",
    "start:server": "node ./bin/www",
    "test": "npm run test:unit && npm run test:integration",
    "test:unit": "jest",
    "test:integration": "cypress run"
  },
```

* Npm start:

```
> node ./bin/www

  test:server Listening on port 9000 +0ms
```

￼
