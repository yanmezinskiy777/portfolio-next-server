const express = require("express");
const router = express.Router();

const { authJwt, checkRole } = require("../middleware/auth");

const {
 getBlogsController,
 getBlogById,
 getBlogBySlug,
 createBlog,
 updateBlog,
 getBlogByUserId
} = require("../controllers/blogs");

router.get("/blogs", getBlogsController);
router.get("/blogs/me",  authJwt, checkRole('admin'), getBlogByUserId);
router.get("/blogs/:id", getBlogById);
router.get("/blogs/s/:slug", getBlogBySlug);

router.post("/blogs", authJwt, checkRole('admin'), createBlog);
router.patch("/blogs/:id", updateBlog)

module.exports = router;
