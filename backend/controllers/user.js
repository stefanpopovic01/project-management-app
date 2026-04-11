const User = require("../models/User");
const Notification = require("../models/Notification");

async function getUsers(req, res) {
    try {
        const { search } = req.query;

        if (!search || search.length < 2) {
            return res.status(200).json({ users: [] });
        }

        const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape special characters to prevent Regex Injection attacks

        const query = {
            _id: { $ne: req.user.id }, // Exclude the logged-in user
            $or: [
                { email: { $regex: escapedSearch, $options: "i" } },
                { firstName: { $regex: escapedSearch, $options: "i" } },
                { lastName: { $regex: escapedSearch, $options: "i" } }
            ]
        };

        const users = await User.find(query)
            .select("email firstName lastName avatarUrl")
            .limit(15);

        res.status(200).json({ users });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getUser(req, res) {
    try {

        const user = await User.findById(req.params.id)
            .select("-password -refreshToken -__v");

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json(user);

    } catch (err) {
        res.status(500).json({ error: "Invalid User ID or Server Error" });
    }
}

async function editUser(req, res) {
  try {

    const { password, refreshToken, ...updateData } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id, 
      { $set: updateData },
      { new: true, runValidators: true }
    ).select("-password -refreshToken");

    if (!updatedUser) return res.status(404).json({ message: "User not found." });

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteUser(req, res) {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) return res.status(404).json({ message: "User not found." });
        res.json(user)

    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

async function follow(req, res) {
  try {
    const userToFollowId = req.params.id;
    const myId = req.user.id;

    if (myId === userToFollowId) return res.status(400).json({ message: "You cannot follow yourself" });

    const targetUser = await User.findByIdAndUpdate(
      userToFollowId,
      { $addToSet: { followers: myId } },
      { new: true }
    );

    if (!targetUser) return res.status(404).json({ message: "User not found" });

    const currentUser = await User.findByIdAndUpdate(
      myId,
      { $addToSet: { following: userToFollowId } },
      { new: true }
    );

    await Notification.create({
      recipient: userToFollowId,
      actor: myId,
      type: "user_followed",
      message: `${currentUser.firstName} ${currentUser.lastName} started following you!`
    });

    res.status(200).json({ message: "Followed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function unfollow(req, res) {
  try {
    const userToUnfollowId = req.params.id;
    const myId = req.user.id;

    await User.findByIdAndUpdate(myId, { 
      $pull: { following: userToUnfollowId } 
    });

    await User.findByIdAndUpdate(userToUnfollowId, { 
      $pull: { followers: myId } 
    });

    res.status(200).json({ message: "Unfollowed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getFollowers(req, res) {
  try {
    const user = await User.findById(req.params.id)
      .populate("followers", "firstName lastName avatarUrl bio");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      count: user.followers.length,
      followers: user.followers
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getFollowing(req, res) {
  try {
    const user = await User.findById(req.params.id)
      .populate("following", "firstName lastName avatarUrl bio");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      count: user.following.length,
      followers: user.following
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getUsers, getUser, editUser, deleteUser, follow, unfollow, getFollowers, getFollowing };