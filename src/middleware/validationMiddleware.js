const validate = (schema) => {
    return (req, res, next) => {

        console.log("REQUEST BODY:", req.body);

        const { error, value } = schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        });

        if (error) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: error.details.map((detail) => ({
                    field: detail.path.join("."),
                    message: detail.message
                }))
            });
        }

        req.body = value;

        next();
    };
};

module.exports = validate;
