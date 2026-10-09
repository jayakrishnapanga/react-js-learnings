import React from "react";
class LifeCycleMethods extends React.Component {
  constructor(props) {
    super(props);
    this.state = { seconds: 0 };
  }

  componentDidMount() {
    console.log("Mounted!");
    this.interval = setInterval(() => {
      this.setState((prev) => ({ seconds: prev.seconds + 1 }));
    }, 1000);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("Updated!", prevState.seconds, "→", this.state.seconds);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    console.log("Unmounted!");
  }

  render() {
    return <p>Seconds: {this.state.seconds}</p>;
  }
}

export default LifeCycleMethods;
