import * as productService from '../services/ProductService';
import InsertProductRequest from '../dtos/requests/insertProductRequest';

export async function insertProduct(req, res) {
    try {
        // Validate request data
        const { error, value } = InsertProductRequest.validate(req.body);

        if (error) {
            return res.status(400).json({
                message: "Validation failed",
                errors: error
            });
        }

        // Proceed with insertion if validation passes
        const result = await productService.insertProduct(value);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({
            message: "Lỗi khi thêm sản phẩm",
            error
        });
    }
}


export async function getProducts(req, res) {
    const result = await productService.getProducts();
    res.status(200).json(result);
}

export async function getProductById(req, res) {
    const { id } = req.params;
    const result = await productService.getProductById(id);
    res.status(200).json(result);
}



export async function deleteProduct(req, res) {
    const { id } = req.params;
    const result = await productService.deleteProduct(id);
    res.status(200).json(result);
}

export async function updateProduct(req, res) {
    const { id } = req.params;
    const updatedData = req.body;
    const result = await productService.updateProduct(id, updatedData);
    res.status(200).json(result);
}
