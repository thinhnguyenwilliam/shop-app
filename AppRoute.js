import express from 'express';
import * as ProductController from './controllers/ProductController';
import * as CategoryController from './controllers/CategoryController';
import * as BrandController from './controllers/BrandController';
import * as OrderController from './controllers/OrderController';
import * as OrderDetailController from './controllers/OrderDetailController';
import rateLimit from 'express-rate-limit';

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

    // Routes
    router.get('/products', ProductController.getProducts);
    router.get('/products/:id', ProductController.getProductById);

    // Apply rate limiter only to write operations
    router.post('/products', writeLimiter, ProductController.insertProduct);
    router.put('/products/:id', writeLimiter, ProductController.updateProduct);
    router.delete('/products/:id', writeLimiter, ProductController.deleteProduct);

    // Category Routes
    router.get('/categories', CategoryController.getCategories);
    router.get('/categories/:id', CategoryController.getCategoryById);
    router.post('/categories', CategoryController.insertCategory);
    router.delete('/categories/:id', CategoryController.deleteCategory);
    router.put('/categories/:id', CategoryController.updateCategory);

    // Brand Routes
    router.get('/brands', BrandController.getBrands);
    router.get('/brands/:id', BrandController.getBrandById);
    router.post('/brands', BrandController.insertBrand);
    router.delete('/brands/:id', BrandController.deleteBrand);
    router.put('/brands/:id', BrandController.updateBrand);

    // Order Routes
    router.get('/orders', OrderController.getOrders);
    router.get('/orders/:id', OrderController.getOrderById);
    router.post('/orders', OrderController.insertOrder);
    router.delete('/orders/:id', OrderController.deleteOrder);
    router.put('/orders/:id', OrderController.updateOrder);

    // Order Detail Routes
    router.get('/order-details', OrderDetailController.getOrderDetails);
    router.get('/order-details/:id', OrderDetailController.getOrderDetailById);
    router.post('/order-details', OrderDetailController.insertOrderDetail);
    router.delete('/order-details/:id', OrderDetailController.deleteOrderDetail);
    router.put('/order-details/:id', OrderDetailController.updateOrderDetail);
}
