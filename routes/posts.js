const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchUser");
const User = require("../model/user");
const Post = require("../model/posts");
JWT_SECRET = "REUNION";

// Add a new post created by the authenticated user.
router.post("/posts", fetchuser, async (req, res) => {
  try {
    const { title, desc } = req.body;
    const createdBy = req.user.id;
    const post = await Post.create({ title, desc, createdBy });
    const data = {
      postId: post._id,
      title: post.title,
      desc: post.desc,
      created_at: post.created_at.toISOString(),
    };
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Delete post with {id} created by the authenticated user.
router.delete("/posts/:id", fetchuser, async (req, res) => {
  try {
    const post = await Post.findOne({
      _id: req.params.id,
      createdBy: req.user.id,
    });
    // console.log(post);
    if (!post) {
      return res.status(404).send("Post not found");
    }
    await post.deleteOne();
    res.status(200).send("Post deleted");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Like the post with {id} by the authenticated user.
router.post("/like/:id", fetchuser, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send("Post not found");
    }
    if (post.likes.includes(req.user.id)) {
      return res.status(400).send("Post already liked");
    } else {
      post.likes.push(req.user.id);
      await post.save();
      return res.status(200).send("Post liked successfully");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// Unlike the post with {id} by the authenticated user.
router.post("/unlike/:id", fetchuser, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send("Post not found");
    }
    if (!post.likes.includes(req.user.id)) {
      return res.status(400).send("Post not liked yet");
    }
    // Removing the user from likes array and arranging the array
    post.likes = post.likes.filter((like) => {
      // console.log(like)
      like !== req.user.id;
    });
    await post.save();
    return res.status(200).send("Post unliked successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// Add comment for post with {id} by the authenticated user.
router.post("/comment/:id", fetchuser, async (req, res) => {
  try {
    // Find the post by ID
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send("Post not found");
    }
    // Add the new comment to the post
    post.comments.push({
      comment: req.body.comment,
      createdBy: req.user.id,
    });
    await post.save();

    const data = {
      comment_id: post.comments[post.comments.length - 1]._id,
    };
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Return a single post with {id} populated with its number of likes and comments
router.get("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const { likes, comments } = post;

    if (!post) {
      return res.status(404).send("Post not found");
    }

    const result = {
      likes: likes.length,
      comments: comments.length,
    };

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// Return all posts created by authenticated user sorted by post time.
router.get("/all_posts", fetchuser, async (req, res) => {
  try {
    const posts = await Post.find({ createdBy: req.user.id })
      .sort({ created_at: -1 })
      .populate("createdBy", "name")
      .populate("likes", "name")
      .populate("comments.createdBy", "name")
      .exec();

    const result = posts.map((post) => ({
      id: post._id,
      title: post.title,
      desc: post.desc,
      created_at: post.created_at,
      comments: post.comments,
      likes: post.likes.length,
    }));

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
