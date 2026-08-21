const Comment = require("../models/Comment");
const Post = require("../models/Post");

const createComment = async (data) => {
    const post = await Post.findById(data.post);

    if (!post) {
        throw new Error("Post not found");
    }

    return await Comment.create(data);
};

const getCommentsByPost = async (postId) => {
    return await Comment.find({ post: postId })
        .populate("author", "name email")
        .sort({ createdAt: -1 });
};

const getCommentById = async (id) => {
    const comment = await Comment.findById(id)
        .populate("author", "name email")
        .populate("post", "title");

    if (!comment) {
        throw new Error("Comment not found");
    }

    return comment;
};

const updateComment = async (id, content) => {
    const comment = await Comment.findByIdAndUpdate(
        id,
        { content },
        {
            new: true,
            runValidators: true
        }
    );

    if (!comment) {
        throw new Error("Comment not found");
    }

    return comment;
};

const deleteComment = async (id) => {
    const comment = await Comment.findByIdAndDelete(id);

    if (!comment) {
        throw new Error("Comment not found");
    }

    return comment;
};

module.exports = {
    createComment,
    getCommentsByPost,
    getCommentById,
    updateComment,
    deleteComment
};
