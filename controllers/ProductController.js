import * as productService from '../services/ProductService';


export async function insertProduct(req, res) {
    //console.log(JSON.stringify(req.body))
    const result = await productService.insertProduct(req.body);
    res.status(201).json(result);
}


export async function getProducts(req, res) {
    const search = req.query.search || ""; // Get search query (default: empty)
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 3;
    const result = await productService.getProducts(search, page, pageSize);

    res.status(200).json(result);
}

export async function getProductById(req, res) {
    const { id } = req.params;
    const result = await productService.getProductById(id);
    if (result.status === 404) {
        return res.status(404).json({ message: result.message });
    }
    res.status(200).json({
        message: 'Lấy thông tin sản phẩm thành công',
        result
    });
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
