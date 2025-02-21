import { Sequelize } from "sequelize"
import db from "../models"

export async function getBrands(req, res) {
    res.status(200).json({
        message: 'Lấy danh sách thương hiệu thành công'
    });
}

export async function getBrandById(req, res) {
    res.status(200).json({
        message: 'Lấy thông tin thương hiệu'
    });
}

export async function insertBrand(req, res) {
    try {
        // If you need to debug or inspect the incoming request body, uncomment the next line:
        // console.log(JSON.stringify(req.body));

        // Assuming `db.Brand.create` is the method used to create a brand record in your ORM setup
        const brand = await db.Brand.create(req.body);

        res.status(201).json({
            message: 'Thêm mới thương hiệu thành công',
            data: brand
        });
    } catch (error) {
        // It's good practice to log errors on the server side.
        //console.error('Error during brand insertion:', error);

        // Respond with a 500 internal server error status code and an error message
        res.status(500).json({
            message: 'Lỗi khi thêm thương hiệu mới',
            error: error.message  // Including the error message can help with debugging but be cautious in production
        });
    }
}

export async function deleteBrand(req, res) {
    res.status(200).json({
        message: 'Xoá thương hiệu thành công'
    });
}

export async function updateBrand(req, res) {
    res.status(200).json({
        message: 'Cập nhật thương hiệu thành công'
    });
}
