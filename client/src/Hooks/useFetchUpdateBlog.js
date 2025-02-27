import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useFetchUpdateBlog = (id, newData) => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const updateBlog = async () => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_ENDPOINT}/edit/${id}`,
        newData
      );
      setBlog(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateBlog();
    navigate(`/${id}`);
  };

  return { blog, loading, error, handleUpdate };
};

export default useFetchUpdateBlog;
