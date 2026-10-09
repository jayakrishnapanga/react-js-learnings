import React from 'react';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // your initial state
    };
  }

  componentDidMount() {
    // runs once after first render
  }

  componentDidUpdate(prevProps, prevState) {
    // runs after every update
  }

  componentWillUnmount() {
    // cleanup before removal
  }

  myHandler = () => {
    // arrow function binds `this` correctly
  };

  render() {
    return (
      <div>
        {/* your JSX */}
      </div>
    );
  }
}

export default MyComponent;
