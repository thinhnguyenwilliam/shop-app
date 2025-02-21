import * as productService from '../services/ProductService';

export async function getProducts(req, res) {
    const result = await productService.getProducts();
    res.status(200).json(result);
}

export async function getProductById(req, res) {
    const { id } = req.params;
    const result = await productService.getProductById(id);
    res.status(200).json(result);
}

export async function insertProduct(req, res) {
    const productData = req.body;
    const result = await productService.insertProduct(productData);
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
