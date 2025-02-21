export async function getProducts() {
    return { message: "Lấy danh sách sản phẩm thành công" };
}

export async function getProductById(id) {
    return { message: `Lấy thông tin sản phẩm có ID: ${id}` };
}

export async function insertProduct(productData) {
    return { message: "Thêm mới sản phẩm thành công", data: productData };
}

export async function deleteProduct(id) {
    return { message: `Xoá sản phẩm có ID: ${id} thành công` };
}

export async function updateProduct(id, updatedData) {
    return { message: `Cập nhật sản phẩm có ID: ${id} thành công`, data: updatedData };
}
