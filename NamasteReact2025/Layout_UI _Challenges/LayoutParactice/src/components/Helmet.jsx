import React from "react";
import { Helmet } from "react-helmet";

function ReactHelmet() {
  return (
    <>
      <Helmet>
        <title>About Us | MyWebsite</title>
        <meta
          name="description"
          content="Learn more about our company and team."
        />
        <meta property="og:title" content="About Us | MyWebsite" />
      </Helmet>

      <h1>About Us</h1>
      <p>Welcome to the about page of our website!</p>
    </>
  );
}

export default ReactHelmet;
