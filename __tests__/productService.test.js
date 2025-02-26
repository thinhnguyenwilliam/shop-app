import * as productService from "../services/ProductService";
import db from "../models";

jest.mock("../models", () => ({
    Product: {
        create: jest.fn(),
    },
}));

describe("Product Service", () => {
    test("getProducts should return a success message", async () => {
        const result = await productService.getProducts();
        expect(result).toEqual({ message: "Lấy danh sách sản phẩm thành công" });
    });

    test("getProductById should return product info", async () => {
        const result = await productService.getProductById(1);
        expect(result).toEqual({ message: "Lấy thông tin sản phẩm có ID: 1" });
    });

    test("insertProduct should create a product and return success message", async () => {
        const productData = { name: "Laptop", price: 1000 };
        db.Product.create.mockResolvedValue(productData);

        const result = await productService.insertProduct(productData);

        expect(result).toEqual({ message: "Thêm mới sản phẩm thành công", data: productData });
        expect(db.Product.create).toHaveBeenCalledWith(productData);
    });

    test("insertProduct should handle errors", async () => {
        db.Product.create.mockRejectedValue(new Error("Database error"));

        await expect(productService.insertProduct({ name: "Laptop" })).rejects.toThrow("Lỗi khi thêm sản phẩm: Database error");
    });

    test("deleteProduct should return a success message", async () => {
        const result = await productService.deleteProduct(1);
        expect(result).toEqual({ message: "Xoá sản phẩm có ID: 1 thành công" });
    });

    test("updateProduct should return a success message with updated data", async () => {
        const updatedData = { name: "Updated Laptop", price: 1200 };
        const result = await productService.updateProduct(1, updatedData);
        expect(result).toEqual({ message: "Cập nhật sản phẩm có ID: 1 thành công", data: updatedData });
    });
});
