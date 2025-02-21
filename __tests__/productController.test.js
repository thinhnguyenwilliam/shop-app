import * as productController from "../controllers/ProductController.js";
import * as productService from "../services/ProductService.js";
import sinon from "sinon";

describe("Product Controller", () => {
    let req, res;

    beforeEach(() => {
        req = { params: { id: "1" }, body: {} };
        res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    });

    afterEach(() => {
        sinon.restore(); // Reset all stubs
    });

    test("getProducts should return products", async () => {
        sinon.stub(productService, "getProducts").resolves({ message: "Lấy danh sách sản phẩm thành công" });

        await productController.getProducts(req, res);

        expect(res.status.calledWith(200)).toBe(true);
        expect(res.json.calledWith({ message: "Lấy danh sách sản phẩm thành công" })).toBe(true);
    });

    test("getProductById should return product info", async () => {
        sinon.stub(productService, "getProductById").resolves({ message: "Lấy thông tin sản phẩm có ID: 1" });

        await productController.getProductById(req, res);

        expect(res.status.calledWith(200)).toBe(true);
        expect(res.json.calledWith({ message: "Lấy thông tin sản phẩm có ID: 1" })).toBe(true);
    });

    test("insertProduct should return success message", async () => {
        req.body = { name: "Laptop", price: 1000 };
        sinon.stub(productService, "insertProduct").resolves({ message: "Thêm mới sản phẩm thành công", data: req.body });

        await productController.insertProduct(req, res);

        expect(res.status.calledWith(200)).toBe(true);
        expect(res.json.calledWith({ message: "Thêm mới sản phẩm thành công", data: req.body })).toBe(true);
    });

    test("deleteProduct should return success message", async () => {
        sinon.stub(productService, "deleteProduct").resolves({ message: "Xoá sản phẩm có ID: 1 thành công" });

        await productController.deleteProduct(req, res);

        expect(res.status.calledWith(200)).toBe(true);
        expect(res.json.calledWith({ message: "Xoá sản phẩm có ID: 1 thành công" })).toBe(true);
    });

    test("updateProduct should return success message", async () => {
        req.body = { name: "Updated Laptop", price: 1200 };
        sinon.stub(productService, "updateProduct").resolves({ message: "Cập nhật sản phẩm có ID: 1 thành công", data: req.body });

        await productController.updateProduct(req, res);

        expect(res.status.calledWith(200)).toBe(true);
        expect(res.json.calledWith({ message: "Cập nhật sản phẩm có ID: 1 thành công", data: req.body })).toBe(true);
    });
});
