import request from "supertest";
import express from "express";
import { insertBrand } from "../controllers/BrandController";
import db from "../models";

jest.mock("../models", () => ({
    Brand: {
        create: jest.fn(),
    },
}));

const app = express();
app.use(express.json()); // Middleware to parse JSON
app.post("/api/brands", insertBrand); // Simulate the API route

describe("Brand Controller - insertBrand", () => {
    afterEach(() => {
        jest.restoreAllMocks(); // Reset mocks after each test
    });

    test("should insert a brand and return success response", async () => {
        const brandData = { name: "Nike" };
        db.Brand.create.mockResolvedValue(brandData);

        const res = await request(app).post("/api/brands").send(brandData);

        expect(res.status).toBe(201);
        expect(res.body).toEqual({
            message: "Thêm mới thương hiệu thành công",
            data: brandData,
        });
        expect(db.Brand.create).toHaveBeenCalledWith(brandData);
    });

    test("should return 500 on error", async () => {
        db.Brand.create.mockRejectedValue(new Error("Database error"));

        const res = await request(app).post("/api/brands").send({ name: "Nike" });

        expect(res.status).toBe(500);
        expect(res.body).toEqual({
            message: "Lỗi khi thêm thương hiệu mới",
            error: "Database error",
        });
    });
});
