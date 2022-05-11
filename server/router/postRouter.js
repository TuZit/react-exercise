const express = require('express');
const router = express.Router();
const PostRouter = require('../models/Post');
const verifyToken = require('../middleware/auth');

// @router GET api/v1/post/create
// @description GET Post
// @access Private
router.get('/all', verifyToken, async (req, res) => {
  try {
    console.log(req.userId);
    const post = await PostRouter.find({ user: req.userId }).populate('user', [
      'username',
    ]);
    res.json({ success: true, post });
  } catch (error) {
    console.log('api/v1/post/all :', error);
    res
      .status(500)
      .json({ success: false, message: 'Internal server error', error });
  }
});

// @router POST api/v1/post/create
// @description Create Post
// @access Private
router.post('/create', verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;
  // validator
  if (!title) {
    return res
      .status(400)
      .json({ success: false, message: 'title is require!' });
  } else {
    try {
      const newPost = new PostRouter({
        title,
        description,
        url,
        status: status || 'TO LEARN',
        user: req.userId,
      });
      await newPost.save();
      res.json({
        success: true,
        message: 'Create article new successfully',
        post: newPost,
      });
    } catch (error) {
      console.log('api/v1/post/create :', error);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error', error });
    }
  }
});

// @router PUT api/v1/post/Update
// @description Update Post
// @access Private

router.put('/update/:id', verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;

  if (!title) {
    return res
      .status(400)
      .json({ success: false, message: 'Title  is required' });
  }
  try {
    let updatePost = {
      title,
      description: description || '',
      url: url || '',
      status: status || 'TO LEARN',
    };

    const postUpdateCondition = { _id: req.params.id, user: req.userId };
    updatePost = await PostRouter.findOneAndUpdate(
      postUpdateCondition,
      updatePost,
      { new: true }
    );
    if (updatePost) {
      return res
        .status(401)
        .json({ success: false, message: 'Post not found or user authorised' });
    }

    res.json({ success: true, message: 'Update post successfully' });
  } catch (error) {
    console.log('api/v1/post/:id :', error);
    res
      .status(500)
      .json({ success: false, message: 'Internal server error', error });
  }
});

// @router DELETE api/v1/post/delete
// @description delete Post
// @access Private

router.delete('/delete/:id', verifyToken, async (req, res) => {
  const postDeleteCondition = { _id: req.params.id, user: req.userId };
  const postDelete = await PostRouter.findOneAndDelete(postDeleteCondition);
  console.log(postDelete);
  if (!postDelete) {
    return res
      .status(401)
      .json({ success: false, message: 'Post not found or user authorised' });
  }
  res.json({ success: true, message: 'Delete Post successfully' });
});
module.exports = router;
