import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ReadPosts.css";
import Card from "../components/Card";
import EmptyPosts from "./EmptyPosts";

const ReadPosts = ({ posts, searchTitle }) => {
  const [sortedPosts, setSortedPosts] = useState(posts);

  // Update sorted posts when `posts` changes
  useEffect(() => {
    setSortedPosts(posts);
  }, [posts]);

  // Filter posts based on the search term
  useEffect(() => {
    const filteredPosts = posts.filter((post) =>
      post.title.toLowerCase().includes(searchTitle.toLowerCase())
    );
    setSortedPosts(filteredPosts);
  }, [searchTitle, posts]);

  // Sort posts by newest
  const handleNewest = () => {
    const sortedByNewest = [...posts].sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
    setSortedPosts(sortedByNewest);
  };

  // Sort posts by most popular
  const handleMostPopular = () => {
    const sortedByMostPopular = [...posts].sort(
      (a, b) => b.upVotes - a.upVotes
    );
    setSortedPosts(sortedByMostPopular);
  };

  return (
    <div className="read-posts">
      <div className="order-by">
        <h3>Order by:</h3>
        <button className="order-by-btn" onClick={handleNewest}>
          Newest
        </button>
        <button className="order-by-btn" onClick={handleMostPopular}>
          Most Popular
        </button>
      </div>
      <div className="posts">
        {sortedPosts && sortedPosts.length > 0 ? (
          sortedPosts.map((post) => (
            <Link key={post.id} to={`/detail/${post.id}`}>
              <Card
                id={post.id}
                title={post.title}
                content={post.content}
                imageURL={post.imageURL}
                videoURL={post.videoURL}
                upVotes={post.upVotes}
                comments={post.comments}
                created_at={post.created_at}
              />
            </Link>
          ))
        ) : (
          <EmptyPosts />
        )}
      </div>
    </div>
  );
};

export default ReadPosts;
