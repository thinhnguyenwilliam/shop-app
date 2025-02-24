import { Sequelize } from "sequelize"
const { Op } = Sequelize;
import db from "../models"

export const getBrands = async (req, res) => {
    const { search = '', page = 1 } = req.query; // Default to an empty search and first page if not specified
    const pageSize = 5; // Define the number of items per page
    const offset = (page - 1) * pageSize;

    // Build a search condition if a search query is provided
    let whereClause = {};
    if (search.trim() !== '') {
        whereClause = {
            [Op.or]: [
                { name: { [Op.like]: `%${search}%` } }, // Assuming brands can be searched by name                
            ]
        };
    }

    const [brands, totalBrands] = await Promise.all([
        db.Brand.findAll({
            where: whereClause,
            limit: pageSize,
            offset: offset,
            // Optionally add sorting or additional includes if needed
        }),
        db.Brand.count({
            where: whereClause
        })
    ]);

    // Respond with the paginated results
    return res.status(200).json({
        message: 'Lấy danh sách thương hiệu thành công',
        data: brands,
        currentPage: parseInt(page, 10),
        pageSize,
        totalPages: Math.ceil(totalBrands / pageSize),
        totalBrands
    });
}


export async function getBrandById(req, res) {
    const { id } = req.params;

    const brand = await db.Brand.findByPk(id);
    if (!brand) {
        // If no brand is found with the given ID, return a 404 Not Found response
        return res.status(404).json({
            message: 'Thương hiệu không tìm thấy'
        });
    }
    // If the brand is found, return it with a status of 200 OK
    res.status(200).json({
        message: 'Lấy thông tin thương hiệu thành công',
        data: brand
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
        console.error('Error during brand insertion:', error);

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
