// Dashboard Routes
// This is a set of routes that will be used to render the dashboard pages.
// All of these routes will be protected by the withAuth middleware function.

const router = require("express").Router();
const { Post, User, Comment } = require("../models/");
const withAuth = require("../utils/auth");

// TODO - create logic for the GET route for / that renders the dashboard homepage
// It should display all of the posts created by the logged in user
router.get("/", withAuth, async (req, res) => {
  const postsData = await Post.findAll({
    where: { userId: req.session.userId },
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  });
  // TODO - retrieve all posts from the database for the logged in user
  // render the dashboard template with the posts retrieved from the database
  //default layout is set to main.handlebars, layout need to be changed to dashboard to use dashboard.handlebars
  // refer to admin-all-posts.handlebars write the code to display the posts
  const posts = postsData.map((post) => post.get({ plain: true }));
  res.render("admin-all-posts", { layout: "dashboard", posts });
});

router.get("/create", withAuth, async (req, res) => {
  res.render("admin-create-post", { laytout: "dashboard" });
});
// TODO - create logic for the GET route for /new that renders the new post page
// It should display a form for creating a new post

router.get("/new", withAuth, async (req, res) => {
  res.render("admin-create-post", { layout: "dashboard" });
});

// router.post("/create", withAuth, async (req, res) => {
//   try {
//     await Post.create({
//       title: req.body.title,
//       body: req.body.body,
//       userId: req.session.userId,
//     });
//     res.redirect("/dashboard");
//     // res.status(200).json({ message: "Post created successfully" });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// TODO - create logic for the GET route for /edit/:id that renders the edit post page
// It should display a form for editing an existing post
router.get("edit/:id", async (req, rest) => {
  try {
    const singlePost = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["id"],
        },
      ],
    });
    const editPost = singlePost.get({ plain: true });
    res.render("admin-create-post", { layout: "dashboard", singlePost });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
