const router = require("express").Router();
const { Post } = require("../../models/");
const withAuth = require("../../utils/auth");

// TODO - create a POST route for creating a new post
// This should be a protected route, so you'll need to use the withAuth middleware
router.post("/", withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      body: req.body.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// TODO - create a PUT route for updating a post's title or body
// This should be a protected route, so you'll need to use the withAuth middleware
router.put("/update/:id", withAuth, async (req, res) => {
  try {
    const updatePost = await Post.update(
      {
        title: req.body.title,
        body: req.body.body,
      },
      {
        where: { id: req.params.id },
      }
    );

    if (!updatePost) {
      res.status(404).json({ message: "Invalid post id!!!" });
    }
    res.status(200).json("Your post have been updated", updatePost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// TODO - create a DELETE route for deleting a post with a specific id
// This should be a protected route, so you'll need to use the withAuth middleware
router.delete("/delete/:id", withAuth, async (req, res) => {
  try {
    const deletePost = await Post.destroy({
      where: { id: req.params.id },
    });
    if (!deletePost) {
      res.status(404).json({ message: "Invalid post id!!!" });
    }
    res.status(200).json("Your post have been deleted", deletePost);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
