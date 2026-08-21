const Post = require("../models/Post");

const createPost = async (data) => {
    return await Post.create(data);
};

const getAllPosts = async (
    page = 1,
    limit = 10,
    search = "",
    author = ""
) => {
    const skip = (page - 1) * limit;

    const filter = {};

    // Search
    if (search) {
        filter.$or = [
            {
                title: {
                    $regex: search,
                    $options: "i"
                }
            },
            {
                content: {
                    $regex: search,
                    $options: "i"
                }
            }
        ];
    }

    // Filter by author
    if (author) {
        filter.author = author;
    }

    const posts = await Post.find(filter)
        .populate("author", "name email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    const totalPosts = await Post.countDocuments(filter);

    const totalPages = Math.ceil(totalPosts / limit);

    return {
        posts,
        pagination: {
            currentPage: page,
            limit,
            totalPosts,
            totalPages,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1
        }
    };
};

const getPostById = async (id) => {
    const post = await Post.findById(id)
        .populate("author", "name email");

    if (!post) {
        throw new Error("Post not found");
    }

    return post;
};

const updatePost = async (id, data, user) => {
    const post = await Post.findById(id);

    if (!post) {
        const error = new Error("Post not found");
        error.statusCode = 404;
        throw error;
    }

    console.log("POST AUTHOR:", post.author.toString());
    console.log("CURRENT USER:", user._id.toString());
    console.log("USER ROLE:", user.role);

    const isOwner =
        post.author.toString() === user._id.toString();

    const isAdmin =
        user.role === "admin";

    console.log("IS OWNER:", isOwner);
    console.log("IS ADMIN:", isAdmin);

    if (!isOwner && !isAdmin) {
        const error = new Error(
            "You are not authorized to update this post"
        );

        error.statusCode = 403;

        throw error;
    }

    Object.assign(post, data);

    await post.save();

    return await post.populate(
        "author",
        "name email"
    );
};

const deletePost = async (id, user) => {
    const post = await Post.findById(id);

    if (!post) {
        throw new Error("Post not found");
    }

    const isOwner = post.author.toString() === user._id.toString();
    const isAdmin = user.role === "admin";

    if (!isOwner && !isAdmin) {
        const error = new Error(
            "You are not authorized to delete this post"
        );

        error.statusCode = 403;
        throw error;
    }

    await Post.findByIdAndDelete(id);

    return post;
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
};
