const express = require("express");
const router = express.Router();
var jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchUser");
const User = require("../model/user");
JWT_SECRET = "REUNION";

router.post("/authenticate", async (req, res) => {
  let success = false;
  // If there are errors, return Bad request and the errors
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      success = false;
      return res
        .status(400)
        .json({ error: "Please try to login with correct credentials" });
    }
    let passwordCompare = password === user.password;
    if (!passwordCompare) {
      success = false;
      return res.status(400).json({
        success,
        error: "Please try to login with correct credentials",
      });
    }

    const data = {
      user: {
        id: user.id,
      },
    };

    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.status(200).json({ success, authtoken });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to follow the user with {id}, the user must be authenticated
router.post("/follow/:id", fetchuser, async (req, res) => {
  try {
    const currUser = req.user.id;
    const followUser = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(
      currUser,
      { $addToSet: { following: followUser } },
      { new: true }
    );
    await User.findByIdAndUpdate(followUser, {
      $addToSet: { followers: currUser },
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

// Route to unfollow the user with {id}, the user must be authentcated
router.post("/unfollow/:id", fetchuser, async (req, res) => {
  try {
    const currUser = req.user.id;
    const unfollowUser = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(
      currUser,
      { $pull: { following: unfollowUser } },
      { new: true }
    );
    await User.findByIdAndUpdate(unfollowUser, {
      $pull: { followers: currUser },
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

// Should return the user name, number of followers & followings
router.get("/user", fetchuser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    // console.log(user);
    const { name, followers, following } = user;
    const result = {
      name,
      followers: followers.length,
      following: following.length,
    };
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
