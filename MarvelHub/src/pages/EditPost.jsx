import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./EditPost.css";
import { supabase } from "../lib/supabase";
import { usePosts } from "./PostContext";

const EditPost = () => {
  const { id } = useParams();
  const { posts, fetchPosts } = usePosts();

  const post = posts.find((post) => post.id === parseInt(id)) || {};

  const [updatedPost, setUpdatedPost] = useState({
    title: post.title || "",
    content: post.content || "",
    imageURL: post.imageURL || "",
    videoURL: post.videoURL || "",
    upVotes: post.upVotes || 0,
    comments: post.comments || [],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdatedPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      const { data, error } = await supabase
        .from("hobbyhub")
        .update({
          title: updatedPost.title,
          content: updatedPost.content,
          imageURL: updatedPost.imageURL,
          videoURL: updatedPost.videoURL,
          upVotes: updatedPost.upVotes,
          comments: updatedPost.comments,
        })
        .eq("id", id);

      if (error) throw error;

      alert("Post updated successfully!");
      fetchPosts();
      window.location = "/";
    } catch (error) {
      console.error("Error updating post:", error.message);
      alert("Error updating post");
    }
  };

  return (
    <div className="main">
      <div className="edit-form">
        <h1>Edit your Hobby!</h1>
        <form onSubmit={handleUpdate}>
          <input
            className="input"
            type="text"
            name="title"
            placeholder="Title"
            value={updatedPost.title}
            onChange={handleChange}
            required
          />
          <br />
          <br />
          <textarea
            className="input"
            rows="10"
            cols="60"
            name="content"
            placeholder="Content (Optional)"
            value={updatedPost.content}
            onChange={handleChange}
          />
          <br />
          <input
            className="input"
            type="text"
            name="imageURL"
            placeholder="Image URL (Optional)"
            value={updatedPost.imageURL}
            onChange={handleChange}
          />
          <br />
          <input
            className="input"
            type="text"
            name="videoURL"
            placeholder="Video URL (Optional)"
            value={updatedPost.videoURL}
            onChange={handleChange}
          />
          <br />
          <button className="update-btn" type="submit">
            Update Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
