import React from 'react';

class App extends React.Component {
  render() {
    return(
      <h1>Hello React.js</h1>
    );
  }
}

React.render(
  <App />,
  document.getElementById('container')
);
