const { category } = require('../models/finance')
const main = require('./main')

module.exports = {
    findAllCategory: main.findAll(category),
    createCategory: main.create(category),
    updateCategory: main.update(category),
    deleteCategory: main.delete(category)
}