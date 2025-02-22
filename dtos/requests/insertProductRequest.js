import Joi from "joi";

class InsertProductRequest {
    constructor(data) {
        this.name = data.name;
        this.price = data.price;
        this.oldprice = data.oldprice;
        this.image = data.image;
        this.description = data.description;
        this.specification = data.specification;
        this.buyturn = data.buyturn;
        this.quantity = data.quantity;
        this.brand_id = data.brand_id;
        this.category_id = data.category_id;
    }

    static validate(data) {
        const schema = Joi.object({
            name: Joi.string().trim().min(3).max(100).required(),
            price: Joi.number().positive().required(),
            oldprice: Joi.number().positive().greater(Joi.ref("price")).optional(),
            image: Joi.string().uri().allow(""),
            description: Joi.string().trim().allow(""),
            specification: Joi.string().trim().required(),
            buyturn: Joi.number().integer().min(0).default(0),
            quantity: Joi.number().integer().min(0).required(),
            brand_id: Joi.number().integer().positive().required(),
            category_id: Joi.number().integer().positive().required()
        });

        const { error, value } = schema.validate(data, { abortEarly: false });

        if (error) {
            return { error: error.details.map(err => err.message) };
        }
        return { value };
    }
}

export default InsertProductRequest;
