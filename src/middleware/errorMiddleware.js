const errorMiddleware = (err, req, res, next) => {
    console.error(err);

    let statusCode = res.statusCode === 200
        ? 500
        : res.statusCode;

    if (err.name === "CastError") {
        statusCode = 400;
        err.message = "Invalid ID format";
    }

    if (err.code === 11000) {
        statusCode = 400;
        err.message = "Duplicate field value";
    }

    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
};

module.exports = errorMiddleware;
