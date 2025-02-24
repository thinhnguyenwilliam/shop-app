const validate = (requestType) => {
    return (req, res, next) => {
        const { error } = requestType.validate(req.body); // Validate request body
        if (error) {
            return res.status(400).json({ // Return validation error response
                message: 'Validation error',
                error: error
            });
        }
        next(); // If no error, proceed to the next middleware/controller
    };
};
export default validate;    
