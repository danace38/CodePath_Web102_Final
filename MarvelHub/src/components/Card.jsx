import React from "react";
import "./Card.css";

const Card = ({ created_at, title, upVotes }) => {
  const timeSince = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) return `${Math.floor(interval)} years ago`;

    interval = seconds / 2592000;
    if (interval > 1) return `${Math.floor(interval)} months ago`;

    interval = seconds / 86400;
    if (interval > 1) return `${Math.floor(interval)} days ago`;

    interval = seconds / 3600;
    if (interval > 1) return `${Math.floor(interval)} hours ago`;

    interval = seconds / 60;
    if (interval > 1) return `${Math.floor(interval)} minutes ago`;

    return `${Math.floor(seconds)} seconds ago`;
  };

  return (
    <div className="card">
      <p className="posted-ago">Posted {timeSince(created_at)}</p>
      <h3 className="title">{title}</h3>
      <p>{upVotes} upvotes</p>
    </div>
  );
};

export default Card;
