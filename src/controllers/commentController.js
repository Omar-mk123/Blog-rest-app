const commentService = require("../services/commentService");

const createComment = async (req, res, next) => {
    try {
        const { content } = req.body;

        const { postId } = req.params;

        if (!content) {
            return res.status(400).json({
                success: false,
                message: "Comment content is required"
            });
        }

        const comment = await commentService.createComment({
            content,
            author: req.user._id,
            post: postId
        });

        res.status(201).json({
            success: true,
            message: "Comment created successfully",
            data: comment
        });

    } catch (error) {
        next(error);
    }
};

const getCommentsByPost = async (req, res, next) => {
    try {
        const comments =
            await commentService.getCommentsByPost(
                req.params.postId
            );

        res.status(200).json({
            success: true,
            count: comments.length,
            data: comments
        });

    } catch (error) {
        next(error);
    }
};

const getCommentById = async (req, res, next) => {
    try {
        const comment =
            await commentService.getCommentById(
                req.params.id
            );

        res.status(200).json({
            success: true,
            data: comment
        });

    } catch (error) {
        next(error);
    }
};

const updateComment = async (req, res, next) => {
    try {
        const comment =
            await commentService.getCommentById(
                req.params.id
            );

        if (
            comment.author._id.toString() !==
                req.user._id.toString() &&
            req.user.role !== "admin"
        ) {
            return res.status(403).json({
                success: false,
                message: "You can only update your own comments"
            });
        }

        const updatedComment =
            await commentService.updateComment(
                req.params.id,
                req.body.content
            );

        res.status(200).json({
            success: true,
            message: "Comment updated successfully",
            data: updatedComment
        });

    } catch (error) {
        next(error);
    }
};

const deleteComment = async (req, res, next) => {
    try {
        const comment =
            await commentService.getCommentById(
                req.params.id
            );

        if (
            comment.author._id.toString() !==
                req.user._id.toString() &&
            req.user.role !== "admin"
        ) {
            return res.status(403).json({
                success: false,
                message: "You can only delete your own comments"
            });
        }

        await commentService.deleteComment(req.params.id);

        res.status(200).json({
            success: true,
            message: "Comment deleted successfully"
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    createComment,
    getCommentsByPost,
    getCommentById,
    updateComment,
    deleteComment
};
