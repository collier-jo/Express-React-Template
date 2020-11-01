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

ReactDOM.render(<App />, document.body);
