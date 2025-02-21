import * as productService from '../services/ProductService';


export async function insertProduct(req, res) {
    try {
        const productData = req.body;
        const result = await productService.insertProduct(productData);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ 
            message: "Lỗi khi thêm sản phẩm", 
            error: error.message 
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
