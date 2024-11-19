import React, { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "../lib/supabase";

const PostContext = createContext();

// Custom hook to consume the PostContext
export const usePosts = () => useContext(PostContext);

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  // Fetch posts from the database
  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase.from("hobbyhub").select("*");
      if (error) throw error;
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error.message);
    }
  };

  // Fetch posts on initial mount
  useEffect(() => {
    fetchPosts();
  }, []);

  const value = {
    posts,
    setPosts,
    fetchPosts,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};
