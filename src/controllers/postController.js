const postService = require("../services/postService");

const createPost = async (req, res, next) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({
                success: false,
                message: "Title and content are required"
            });
        }

        const post = await postService.createPost({
            title,
            content,
            author: req.user._id
        });

        res.status(201).json({
            success: true,
            message: "Post created successfully",
            data: post
        });

    } catch (error) {
        next(error);
    }
};

const getAllPosts = async (req, res, next) => {
    try {
        let page = Number.parseInt(req.query.page, 10) || 1;
        let limit = Number.parseInt(req.query.limit, 10) || 10;

        if (page < 1) {
            page = 1;
        }

        if (limit < 1) {
            limit = 10;
        }

        if (limit > 100) {
            limit = 100;
        }

        const search = req.query.search || "";
        const author = req.query.author || "";

        const result = await postService.getAllPosts(
            page,
            limit,
            search,
            author
        );

        res.status(200).json({
            success: true,
            data: result.posts,
            pagination: result.pagination
        });

    } catch (error) {
        next(error);
    }
};

const getPostById = async (req, res, next) => {
    try {
        const post = await postService.getPostById(
            req.params.id
        );

        res.status(200).json({
            success: true,
            data: post
        });

    } catch (error) {
        next(error);
    }
};

const updatePost = async (req, res, next) => {
    try {
        const post = await postService.updatePost(
            req.params.id,
            req.body,
            req.user
        );

        res.status(200).json({
            success: true,
            message: "Post updated successfully",
            data: post
        });

    } catch (error) {
        next(error);
    }
};

const deletePost = async (req, res, next) => {
    try {
        await postService.deletePost(
            req.params.id,
            req.user
        );

        res.status(200).json({
            success: true,
            message: "Post deleted successfully"
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
};
