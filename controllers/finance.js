const { category, profile, transaction } = require('../models/finance')
const main = require('./main')

module.exports = {
    findAllCategory: main.findAll(category, ['name', 'ASC']),
    createCategory: main.create(category),
    updateCategory: main.update(category),
    deleteCategory: main.delete(category),
    findAllProfile: main.findAll(profile, ['id', 'ASC']),
    createProfile: main.create(profile),
    updateProfile: main.update(profile),
    deleteProfile: main.delete(profile),
    findAllTransaction: main.findAll(transaction, ['created', 'DESC'], [{model: category, required: true}]),
    findOneTransaction: main.findOne(transaction),
    createTransaction: main.create(transaction),
    createBulkTransaction: main.bulkCreate(transaction),
    updateTransaction: main.update(transaction),
    deleteTransaction: main.delete(transaction)
}