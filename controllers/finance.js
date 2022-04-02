const { category, profile, transaction } = require('../models/finance')
const main = require('./main')

module.exports = {
    findAllCategory: main.findAll(category),
    createCategory: main.create(category),
    updateCategory: main.update(category),
    deleteCategory: main.delete(category),
    findAllProfile: main.findAll(profile),
    createProfile: main.create(profile),
    updateProfile: main.update(profile),
    deleteProfile: main.delete(profile),
    findAllTransaction: main.findAll(transaction, [{model: profile, required: true}, {model: category, required: true}]),
    findOneTransaction: main.findOne(transaction),
    createTransaction: main.create(transaction),
    updateTransaction: main.update(transaction),
    deleteTransaction: main.delete(transaction)
}