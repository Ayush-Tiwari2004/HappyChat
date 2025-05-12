const postModel = require('../models/post');

const createPost = async (req, res) => {
    try{
        const newPost = new postModel(req.body);
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    }
    catch (error){
        res.status(500).json({
            message: `error creating post ${error}`,
            success: false
        })
    }
}

const showPost = async (req, res) =>{
    try{
        const posts = await postModel.find();
        res.status(200).json(posts);
    }
    catch(error) {
        res.status(500).json({
            message: `error show new user list`,
            success: false
        })
    }
}

const updateActiveTime = async (req, res) => {
    try {
        const { userId, lastActive } = req.body;
        await postModel.findByIdAndUpdate(userId, { lastActive });
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({
            message: `Error updating active time: ${error}`,
            success: false
        });
    }
};

module.exports = {
    createPost,
    showPost,
    updateActiveTime
}