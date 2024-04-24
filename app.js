const mongoose = require('mongoose');

mongoose
    .connect('mongodb://localhost:27017/blogApp')
    .then(()=>console.log('connected to database'))
    .catch((err)=>console.log(err));

const blogSchema = new mongoose.Schema({
    title : String,
    author : String,
    body : String
});

const blog = new mongoose.model('blog', blogSchema);

const newBlog = new blog({
    title : "favorite places in rabat",
    author : "oumaima",
    body : "my fav places are ..."
});

function addBlog(newBlog){
    newBlog
    .save()
    .then(()=> console.log('blog created successfuly'))
    .catch((err)=>console.log(err));
}

function findBlog(title){
    blog.findOne({ title: title })
        .then((blog) => {
            if (blog) console.log(blog);
            else console.log("blog not found");
        })
        .catch((error) => console.log("Error fetching blogs: ", error));
}

function deleteBlog(title){
    blog.findOneAndDelete({ title : title })
        .then((blog) => {
            if (blog) console.log("User deleted successfully: ", blog);
            else console.log("blog not found");
        })
        .catch((error) => console.log("Error deleting blog: ", error));
}

function updateBlog(title, newAuthor){
    blog.findOneAndUpdate(
        { title: title },
        { $set: { author: newAuthor} }
        )
        .then((blog) => {
          if (blog) console.log("blog updated successfully: ", blog);
          else console.log("blog not found");
        })
        .catch((error) => console.log("Error fetching blog: ", error));
}

updateBlog("favorite places in rabat", "kadir");
