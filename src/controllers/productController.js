const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
    try {
        const { limit = 10, page = 1, sort, query } = req.query;

        const filters = query ? { $or: [{ category: query }, { available: query === 'available' }] } : {};

        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: sort ? { price: sort === 'asc' ? 1 : -1 } : {}
        };

        const result = await Product.paginate(filters, options);

        res.json({
            status: 'success',
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.hasPrevPage ? page - 1 : null,
            nextPage: result.hasNextPage ? page + 1 : null,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage ? `/api/products?page=${page - 1}` : null,
            nextLink: result.hasNextPage ? `/api/products?page=${page + 1}` : null
        });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};
