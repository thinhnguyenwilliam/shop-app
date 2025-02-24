import db from "../models"
import { Op } from "sequelize"; // Import Sequelize operators

export async function insertProduct(productData) {
    const newProduct = await db.Product.create(productData);
    return {
        message: "Thêm mới sản phẩm thành công",
        data: newProduct
    };
}

export async function getProducts(search = "", page = 1, pageSize = 10) {
    const offset = (page - 1) * pageSize; // Calculate the starting index

    const whereCondition = search
        ? {
            [Op.or]: [
                { name: { [Op.like]: `%${search}%` } }, // Search in product name
                { description: { [Op.like]: `%${search}%` } }, // Search in description
            ],
        }
        : {};

    const { count, rows } = await db.Product.findAndCountAll({
        where: whereCondition, // Apply search filter
        limit: pageSize,
        offset,
    });

    return {
        message: "Lấy danh sách sản phẩm thành công",
        totalItems: count,
        totalPages: Math.ceil(count / pageSize),
        currentPage: page,
        pageSize,
        data: rows,
    };
}



export async function getProductById(id) {
    const product = await db.Product.findByPk(id);
    if (!product) {
        return { status: 404, message: `Không tìm thấy sản phẩm với ID: ${id}` };
    }

    return product;
}


export async function deleteProduct(id) {
    return { message: `Xoá sản phẩm có ID: ${id} thành công` };
}

export async function updateProduct(id, updatedData) {
    return { message: `Cập nhật sản phẩm có ID: ${id} thành công`, data: updatedData };
}
