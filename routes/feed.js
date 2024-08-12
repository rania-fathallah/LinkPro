const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const User = require('../models/user')
const PostService = require('../services/post');
const { GetPosts, GetPost, AddPost, UpdatePost } = require('../controllers/post');


router.post('/submit-post', upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'pdf', maxCount: 1 }, { name: 'video', maxCount: 1 }]), AddPost);
router.get('/', async (req, res) => {
    try {
        const currentUserId = req.session.userId;
        const currentUser = await User.findById(currentUserId);

        const posts = await PostService.getAll();
        const postsWithAuthors = await Promise.all(posts.map(async (post) => {
            const author = await User.findById(post.author);
            return { ...post.toObject(), author }; 
        }));
        console.log(posts);
        res.render('feeds', { posts : postsWithAuthors , user : currentUser});
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).send('Internal Server Error');
    }
});
router.post('/posts/:postId/like', async (req, res) => {
    try {
        const postId = req.params.postId;
        // Update the post likes and add the user ID to the post's likedBy array
        const updatedPost = await PostService.likePost(postId, req.session.userId);
        res.json({ likes: updatedPost.like.count });
    } catch (error) {
        console.error('Error liking the post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



module.exports = router;