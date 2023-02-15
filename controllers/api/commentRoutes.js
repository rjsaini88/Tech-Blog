const router = require("express").Router();
const { Comment } = require("../../models/");
const withAuth = require("../../utils/auth");

// TODO - create a POST route for creating a new comment
router.post("/", withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body, //example from mini project if doesn't work try: body: req.body.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// This should be a protected route, so you'll need to use the withAuth middleware

module.exports = router;
