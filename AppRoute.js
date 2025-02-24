import express from 'express';
import * as ProductController from './controllers/ProductController';
import * as CategoryController from './controllers/CategoryController';
import * as BrandController from './controllers/BrandController';
import * as OrderController from './controllers/OrderController';
import * as OrderDetailController from './controllers/OrderDetailController';
import rateLimit from 'express-rate-limit';
import asyncHandler from './middlewares/asyncHandler';
import validate from './middlewares/validate';
import InsertProductRequest from './dtos/requests/InsertProductRequest';

const router = express.Router();

// Apply rate limiting only for write operations (POST, PUT, DELETE)
const writeLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // Limit write operations to 50 requests per 15 minutes
    message: 'Too many requests from this IP, please try again later.',
});

export function AppRoute(app) {
    // Apply rate limiting for all API endpoints
    app.use('/api', router);

    // Product Routes
    router.get('/products', asyncHandler(ProductController.getProducts));
    router.get('/products/:id', asyncHandler(ProductController.getProductById));
    router.post('/products', 
        writeLimiter,
        validate(InsertProductRequest), 
        asyncHandler(ProductController.insertProduct)
    );
    router.put('/products/:id', writeLimiter, asyncHandler(ProductController.updateProduct));
    router.delete('/products/:id', writeLimiter, asyncHandler(ProductController.deleteProduct));

    // Category Routes
    router.get('/categories', asyncHandler(CategoryController.getCategories));
    router.get('/categories/:id', asyncHandler(CategoryController.getCategoryById));
    router.post('/categories', writeLimiter, asyncHandler(CategoryController.insertCategory));
    router.put('/categories/:id', writeLimiter, asyncHandler(CategoryController.updateCategory));
    router.delete('/categories/:id', writeLimiter, asyncHandler(CategoryController.deleteCategory));

    // Brand Routes
    router.get('/brands', asyncHandler(BrandController.getBrands));
    router.get('/brands/:id', asyncHandler(BrandController.getBrandById));
    router.post('/brands', writeLimiter, asyncHandler(BrandController.insertBrand));
    router.put('/brands/:id', writeLimiter, asyncHandler(BrandController.updateBrand));
    router.delete('/brands/:id', writeLimiter, asyncHandler(BrandController.deleteBrand));

    // Order Routes
    router.get('/orders', asyncHandler(OrderController.getOrders));
    router.get('/orders/:id', asyncHandler(OrderController.getOrderById));
    router.post('/orders', writeLimiter, asyncHandler(OrderController.insertOrder));
    router.put('/orders/:id', writeLimiter, asyncHandler(OrderController.updateOrder));
    router.delete('/orders/:id', writeLimiter, asyncHandler(OrderController.deleteOrder));

    // Order Detail Routes
    router.get('/order-details', asyncHandler(OrderDetailController.getOrderDetails));
    router.get('/order-details/:id', asyncHandler(OrderDetailController.getOrderDetailById));
    router.post('/order-details', writeLimiter, asyncHandler(OrderDetailController.insertOrderDetail));
    router.put('/order-details/:id', writeLimiter, asyncHandler(OrderDetailController.updateOrderDetail));
    router.delete('/order-details/:id', writeLimiter, asyncHandler(OrderDetailController.deleteOrderDetail));
}
