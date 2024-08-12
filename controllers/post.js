const PostService = require('../services/post');
const multer = require('multer');   
const upload = multer({ dest: 'images/' }); 
const fs = require('fs'); 

const GetPosts = async (req, res) => {
    try {
        const posts = await PostService.getAll();
        res.json({ posts });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const GetPost = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await PostService.getOneByID(id);
        if (!post)
            return res.status(404).json({ error: 'Post not found' });

        res.status(200).json({ post });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const AddPost = async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.files);

        const postContent = req.body.postContent;
        const authorId = req.session.userId;
        console.log(req.session.userId);

        // Get file paths
        const photoFiles = req.files['photo'];
        const pdfFiles = req.files['pdf'];
        const videoFiles = req.files['video'];

        

        // Initialize file data as null
        let photoBase64 = null;
        let pdfBase64 = null;
        let videoBase64 = null;

        // Check if photo file is provided
        if (photoFiles && photoFiles[0]) {
            const photoPath = photoFiles[0].path;
            const photoData = await fs.promises.readFile(photoPath);
            photoBase64 = photoData.toString('base64');
            // Cleanup: Delete the temporary photo file
            await fs.promises.unlink(photoPath);
        }

        // Check if pdf file is provided
        if (pdfFiles && pdfFiles[0]) {
            const pdfPath = pdfFiles[0].path;
            const pdfData = await fs.promises.readFile(pdfPath);
            pdfBase64 = pdfData.toString('base64');
            // Cleanup: Delete the temporary pdf file
            await fs.promises.unlink(pdfPath);
        }

        // Check if video file is provided
        if (videoFiles && videoFiles[0]) {
            const videoPath = videoFiles[0].path;
            const videoData = await fs.promises.readFile(videoPath);
            videoBase64 = videoData.toString('base64');
            // Cleanup: Delete the temporary video file
            await fs.promises.unlink(videoPath);
        }
        
        // Construct the post object based on your model structure
        const post = {
            author: authorId,
            content: postContent,
            content_photo: photoBase64,
            content_pdf: pdfBase64,
            content_video: videoBase64,
            like: { count: 0, profiles: [] }, // Initialize likes
        };
        console.log(post);
        await PostService.add(post);

        // Redirect or send a response after processing the form
        res.redirect('/feed/');
    } catch (error) {
        console.error('Error processing form:', error);
        res.status(500).send('Internal Server Error');
    }
};

const UpdatePost = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await PostService.update(id, req.body);
        if (!post)
            return res.status(404).json({ error: 'Post not found' });

        res.status(200).json({ message: 'Post Updated Successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    GetPosts,
    GetPost,
    AddPost,
    UpdatePost,
};
