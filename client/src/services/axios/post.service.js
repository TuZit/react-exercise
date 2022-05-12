import axios from 'axios';
const POST_API = 'http://localhost:5000/api/v1/post';

const getAllPosts = () => {
  return axios.get(POST_API + '/all');
};

const createPost = (post) => {
  return axios
    .post(POST_API + '/create', post)
    .then((response) => response.data);
};

const updatePost = (id, post) => {
  return axios.put(POST_API + `/update/:${id}`, post).then((res) => res.data);
};

const deletePost = async (id) => {
  return axios.delete(POST_API + `/delete/${id}`).then((res) => res.data);
};

const postService = {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
};

export default postService;
