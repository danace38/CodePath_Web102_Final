import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./DetailPost.css";
import { supabase } from "../lib/supabase";
import { usePosts } from "./PostContext";
import likeButton from "../components/like-button.png";
import editButton from "../components/edit-button.png";
import deleteButton from "../components/delete-button.png";

const DetailPost = () => {
  const { id } = useParams();
  const { posts, fetchPosts } = usePosts();
  const [commentInput, setCommentInput] = useState("");

  const post = posts.find((post) => post.id === parseInt(id)) || {};

  const handleLike = async () => {
    const updatedPost = {
      ...post,
      upVotes: post.upVotes + 1,
    };

    try {
      const { data, error } = await supabase
        .from("hobbyhub")
        .update(updatedPost)
        .eq("id", id);

      if (error) throw error;

      console.log("Like updated:", data);
      fetchPosts();
    } catch (error) {
      console.error("Error updating likes:", error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const { data, error } = await supabase
        .from("hobbyhub")
        .delete()
        .eq("id", id);

      if (error) throw error;

      console.log("Post deleted:", data);
      alert("Post deleted successfully!");
      fetchPosts();
      window.location = "/";
    } catch (error) {
      console.error("Error deleting post:", error.message);
    }
  };

  const handleCommentChange = (event) => {
    setCommentInput(event.target.value);
  };

  const handleComment = async (e) => {
    e.preventDefault();
    const updatedComments = [...(post.comments || []), commentInput];

    try {
      const { data, error } = await supabase
        .from("hobbyhub")
        .update({ comments: updatedComments })
        .eq("id", id);

      if (error) throw error;

      console.log("Comment added:", data);
      fetchPosts();
      setCommentInput("");
    } catch (error) {
      console.error("Error adding comment:", error.message);
    }
  };

  const timeSince = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
    ];
    for (const { label, seconds: interval } of intervals) {
      const count = Math.floor(seconds / interval);
      if (count > 1) return `${count} ${label}s ago`;
      if (count === 1) return `${count} ${label} ago`;
    }
    return `${seconds} seconds ago`;
  };

  return (
    <div className="main">
      <div className="post-detail">
        {post.created_at && <p>Posted {timeSince(post.created_at)}</p>}
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        {post.imageURL && <img className="post-img" src={post.imageURL} alt={post.title} />}
        {post.videoURL && (
          <iframe
            className="post-video"
            src={post.videoURL}
            title={post.title}
            frameBorder="0"
            allowFullScreen
          />
        )}
        <div className="updates">
          <img
            className="updates-btn-left"
            src={likeButton}
            onClick={handleLike}
            alt="Like button"
          />{" "}
          {post.upVotes || 0} upvotes
          <Link to={`/edit/${post.id}`}>
            <img className="updates-btn-right1" src={editButton} alt="Edit button" />
          </Link>
          <img
            className="updates-btn-right2"
            src={deleteButton}
            onClick={handleDelete}
            alt="Delete button"
          />
        </div>
        <div className="comment-section">
          <h3>Comments</h3>
          {(post.comments || []).map((comment, index) => (
            <div className="comment" key={index}>
              <p>- {comment}</p>
            </div>
          ))}
          <input
            className="comment-input"
            type="text"
            placeholder="Leave a comment..."
            value={commentInput}
            onChange={handleCommentChange}
          />
          <button className="update-btn" onClick={handleComment}>
            Add Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailPost;
