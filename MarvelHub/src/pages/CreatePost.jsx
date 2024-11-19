import React, { useState } from "react";
import "./CreatePost.css";
import { supabase } from "../lib/supabase";
import { usePosts } from "./PostContext";

const CreatePost = () => {
  const [post, setPost] = useState({
    title: "",
    content: "",
    imageURL: "",
    videoURL: "",
    upVotes: 0,
    comments: [],
  });
  const { posts, setPosts } = usePosts();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    const { title, content, imageURL, videoURL, upVotes } = post;

    if (!title) {
      alert("Title is required");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("hobbyhub")
        .insert([{ title, content, imageURL, upVotes }]);

      if (error) throw error;

      alert("Post created successfully");
      setPosts((prevPosts) => [...prevPosts, ...data]);
      window.location = "/";
    } catch (error) {
      console.error("Error creating post:", error.message);
    }
  };

  return (
    <div className="main">
      <div className="create-form">
        <h1>Create a Hobby!</h1>
        <form onSubmit={handleCreate}>
          <input
            className="input"
            type="text"
            name="title"
            placeholder="Title"
            value={post.title}
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
            value={post.content}
            onChange={handleChange}
          />
          <br />
          <input
            className="input"
            type="text"
            name="imageURL"
            placeholder="Image URL (Optional)"
            value={post.imageURL}
            onChange={handleChange}
          />
          <br />
          <br />
          <input
            className="input"
            type="text"
            name="videoURL"
            placeholder="Video URL (Optional)"
            value={post.videoURL}
            onChange={handleChange}
          />
          <br />
          <br />
          <button className="create-btn" type="submit">
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
