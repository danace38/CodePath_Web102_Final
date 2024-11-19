import React from "react";
import { Link } from "react-router-dom";
import "./EmptyPosts.css";

const EmptyPosts = () => {
  return (
    <div className="main" style={{ margin: "15% auto", color: "black", padding: "2%", textAlign: "center", maxWidth: "600px" }}>
      <h4>Looks like you don't have any posts!</h4>
      <Link to="/new" className="create-link-btn">
        Create one here!
      </Link>
    </div>
  );
};

export default EmptyPosts;
