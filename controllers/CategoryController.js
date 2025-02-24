// CategoryController.js
import db from "../models"
import { Sequelize } from "sequelize"
const { Op } = Sequelize;

export const getCategories = async (req, res) => {
    const { search = '', page = 1 } = req.query; // Default to an empty search and first page if not specified
    const pageSize = 5; // Define the number of items per page
    const offset = (page - 1) * pageSize;

    // Build a search condition if a search query is provided
    let whereClause = {};
    if (search.trim() !== '') {
        whereClause = {
            [Op.or]: [
                { name: { [Op.like]: `%${search}%` } },
                // { description: { [Op.like]: `%${search}%` } }
            ]
        };
    }

    const [categories, totalCategories] = await Promise.all([
        db.Category.findAll({
            where: whereClause,
            limit: pageSize,
            offset: offset,
            // Optionally add sorting or additional includes if needed
        }),
        db.Category.count({
            where: whereClause
        })
    ]);
    // Respond with the paginated results
    return res.status(200).json({
        message: 'Lấy danh sách danh mục thành công',
        data: categories,
        currentPage: parseInt(page, 10),
        totalPages: Math.ceil(totalCategories / pageSize),
        totalCategories
    });
};


export async function getCategoryById(req, res) {
    const { id } = req.params;
    const category = await db.Category.findByPk(id);

    if (!category) {
        // If no category is found with the given ID, return a 404 Not Found response
        return res.status(404).json({
            message: 'Danh mục không tìm thấy'
        });
    }
    res.status(200).json({
        message: 'Lấy thông tin danh mục thành công',
        data: category
    });
}

export async function insertCategory(req, res) {
    const category = await db.Category.create(req.body);

    res.status(201).json({
        message: 'Thêm mới danh mục thành công',
        data: category
    });
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
