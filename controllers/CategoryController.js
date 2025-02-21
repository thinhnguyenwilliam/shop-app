// CategoryController.js
import { Sequelize } from "sequelize"
import db from "../models"

export async function getCategories(req, res) {
    res.status(200).json({
        message: 'Lấy danh sách danh mục thành công'
    });
}

export async function getCategoryById(req, res) {
    res.status(200).json({
        message: 'Lấy thông tin danh mục'
    });
}

export async function insertCategory(req, res) {    
    try {        
        // Assuming `db.Category.create` is the correct method based on your ORM setup
        const category = await db.Category.create(req.body);
        
        res.status(201).json({
            message: 'Thêm mới danh mục thành công',
            data: category
        });
    } catch (error) {
        // Send a response with a 500 internal server error status code and a message
        res.status(500).json({
            message: 'Lỗi khi thêm danh mục mới',
            error: error.message  // Optional: include error message for debugging (consider the security implications)
        });
    }
}


export async function deleteCategory(req, res) {
    res.status(200).json({
        message: 'Xoá danh mục thành công'
    });
}

export async function updateCategory(req, res) {
    res.status(200).json({
        message: 'Cập nhật danh mục thành công'
    });
}
