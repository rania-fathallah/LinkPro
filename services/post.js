const PostModel = require('../models/post');

const likePost = async (postId, userId) => {
    // Fetch the post
    const post = await Post.findById(postId);

    // Check if the user has already liked the post
    const isLiked = post.like.profiles.includes(userId);

    if (!isLiked) {
        // Update the post likes count
        post.like.count += 1;
        // Add the user ID to the likedBy array
        post.like.profiles.push(userId);
        // Save the updated post
        await post.save();
    }

    return post;
};

module.exports = {
    getAll: () => PostModel.find(),
    getOneByID: (id) => PostModel.findById(id),
    add: (post) => {
        const newPost = new PostModel(post);
        return newPost.save();
    },
    likePost,

};