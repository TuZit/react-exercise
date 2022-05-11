import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import postService from '../../services/axios/post.service.js';
import { useGetRoleQuery } from '../../services/RTKQuery/roleApi.js';

function PostDashboard() {
  const [post, setPost] = useState();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState('');
  const [ID, setPostID] = useState();

  const { data } = useGetRoleQuery();
  console.log(data);

  // Get access Token from LocalStorage
  const accessToken = JSON.parse(localStorage.getItem('login')).accessToken;

  // Config Header Authorization before doing request
  axios.interceptors.request.use(
    (config) => {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Get all Posts from API
  const getAllPosts = async () => {
    try {
      const res = await postService.getAllPosts();
      setPost(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Create new Post to save to API
  const createPost = async () => {
    const inputPost = {
      title,
      description,
      url,
      status,
    };

    try {
      const res = await postService.createPost(inputPost);
      toast.success(res.message);
      getAllPosts();
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  // Delete a Post
  const deletePost = async () => {
    if (post) {
      var expectPostID = post.post[ID]._id;
    }

    try {
      const res = await postService.deletePost(expectPostID);
      toast.success(res.message);
      getAllPosts();
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <>
      <div>
        <ToastContainer theme='colored' limit={1} />
        <h1>PostDashboard</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createPost();
          }}
        >
          <div>
            <label>Title</label>
            <input type='text' onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div>
            <label>Description</label>
            <input
              type='text'
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label>Url</label>
            <input type='text' onChange={(e) => setUrl(e.target.value)} />
          </div>

          <div>
            <label>Status</label>
            <input type='text' onChange={(e) => setStatus(e.target.value)} />
          </div>

          <button type='submit'>Send</button>
        </form>

        <div style={{ marginTop: '40px' }}>
          <label>Nhập số ID của Post muốn xoá</label>
          <br />
          <input
            type='text'
            onChange={(e) => {
              setPostID(e.target.value);
            }}
          />
          {/* <br /> */}
          <button onClick={deletePost}>DELETE POST</button>
        </div>
      </div>

      <div>
        {data.map((role, i) => (
          <p>{role.name}</p>
        ))}
      </div>
    </>
  );
}

export default PostDashboard;
