export async function getOrders(req, res) {
    res.status(200).json({
        message: 'Lấy danh sách đơn hàng thành công'
    });
}

export async function getOrderById(req, res) {
    res.status(200).json({
        message: 'Lấy thông tin đơn hàng'
    });
}

export async function insertOrder(req, res) {
    res.status(200).json({
        message: 'Thêm mới đơn hàng thành công'
    });
}

export async function deleteOrder(req, res) {
    res.status(200).json({
        message: 'Xoá đơn hàng thành công'
    });
}

export async function updateOrder(req, res) {
    res.status(200).json({
        message: 'Cập nhật đơn hàng thành công'
    });
}
