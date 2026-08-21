const express = require("express");

const {
    createComment,
    getCommentsByPost,
    getCommentById,
    updateComment,
    deleteComment
} = require("../controllers/commentController");

const {
    protect
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
    "/post/:postId",
    protect,
    createComment
);

router.get(
    "/post/:postId",
    getCommentsByPost
);

router.get(
    "/:id",
    getCommentById
);

router.put(
    "/:id",
    protect,
    updateComment
);

router.delete(
    "/:id",
    protect,
    deleteComment
);

module.exports = router;
