const slugify = require('slugify');
const uniqueSlug = require('unique-slug');
const Blogs = require("../db/models/blogs");

exports.getBlogsController = async (req, res) => {
   const blogs = await Blogs.find({ status: "published" }).sort({ createdAt: -1 });
   return res.json(blogs)
}

exports.getBlogById = async (req, res) => {
   const blog = await Blogs.findById(req.params.id);
   return res.json(blog);
}

exports.getBlogByUserId = async (req, res) => {
   const userId = req.user.sub;
   const blogs = await Blogs.find({ userId });
   return res.json(blogs);
}

exports.getBlogBySlug = async (req, res) => {
   const blog = await Blogs.findOne({ slug: req.params.slug });
   return res.json(blog);
}

exports.createBlog = async (req, res) => {
   const blog = new Blogs(req.body);
   //blog.userId = req.user.sub;
   blog.userId = 'google-oauth2|107720354280405656759'
   await blog.save();
   return res.json(blog);
}

const _saveBlog = async blog => {
   try {
     const createdBlog = await blog.save();
     return createdBlog;
   } catch(e) {
     if (e.code === 11000 && e.keyPattern && e.keyPattern.slug) {
       blog.slug += `-${uniqueSlug()}`;
       return _saveBlog(blog);
     }
 
     throw(e);
   }
 }

exports.updateBlog = async (req, res) => {
  try{
         Blogs.findById(req.params.id, async (err, blog) => {

         if(err){
            return res.status(err.status || 400).json(err.message);
         }
           
         if (req.body.status && req.body.status === 'published' && !blog.slug){
            blog.slug = slugify(blog.title, {
               replacement: '-',
               lower: true   
             })
         }

         blog.set(req.body);
         blog.updatedAt = Date.now();
         const updatedBlog = await _saveBlog(blog);
         return res.json(updatedBlog);
      });
  }catch(e){

   return res.status(e.status || 400).json(e.message);
  }
}

