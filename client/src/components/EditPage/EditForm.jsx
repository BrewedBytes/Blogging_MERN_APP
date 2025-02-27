import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import CommonForm from "../CommonForm";
import useFetchSingleBlog from "../../Hooks/useFetchSingleBlog";
import useFetchUpdateBlog from "../../Hooks/useFetchUpdateBlog";

const EditForm = () => {
  const { id } = useParams();
  const { blog, isLoading } = useFetchSingleBlog(id);

  const [form, setForm] = useState({
    title: "",
    imgUrl: "",
    postFormat: "editor",
  });
  const [post, setPost] = useState("");
  const { handleUpdate } = useFetchUpdateBlog(id, { ...form, post: post });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    if (blog) {
      setForm({
        title: blog.title,
        imgUrl: blog.imgUrl,
        postFormat: blog.postFormat,
      });
      setPost(blog.post);
    }
  }, [blog]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <CommonForm
        handleChange={handleChange}
        form={form}
        post={post}
        setPost={setPost}
        handleSubmit={handleUpdate}
        parentComp="edit"
      />
    </div>
  );
};

export default EditForm;
