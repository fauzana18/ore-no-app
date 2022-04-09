const moment = require('moment')
const { category, profile, transaction } = require('../models/finance')
const main = require('./main')
const db = require('../utils/db')

module.exports = {
    findAllCategory: main.findAll(category, ['name', 'ASC']),
    createCategory: main.create(category),
    updateCategory: main.update(category),
    deleteCategory: main.delete(category, [{model: transaction, required: false}]),
    findAllProfile: main.findAll(profile, ['id', 'ASC']),
    createProfile: main.create(profile),
    updateProfile: main.update(profile),
    deleteProfile: main.delete(profile, [{model: transaction, required: false}]),
    findAllTransaction: main.findAll(transaction, ['created', 'DESC'], [{model: category, required: true}]),
    findOneTransaction: main.findOne(transaction),
    createTransaction: main.create(transaction),
    createBulkTransaction: main.bulkCreate(transaction),
    updateTransaction: main.update(transaction),
    deleteTransaction: main.delete(transaction),
    getSaldo: async (req, res, next) => {
        let code, result, saldo = { pengeluaran: 0, pemasukan: 0, monthly: {}, categorized: {} }
        try{
            await db.authenticate()
            let transactionModel = transaction(db)
            let categoryModel = category(db)
            transactionModel.hasOne(categoryModel, {
                sourceKey: `category_id`,
                foreignKey: 'id'
            })
            const dbRes = await transactionModel.findAll({
                include: [{model: categoryModel, attributes: ['type', 'name'], required: true}],
                attributes: ['amount', 'created' ],
                where: {
                    profile_id: req.query.profile_id
                }
            })

            dbRes.forEach(element => {
                const month = moment(element.created).format("M") - 1
                const year = moment(element.created).format("YYYY")
                saldo[element.category.type.toLowerCase()] += element.amount
                
                if(saldo.monthly[`${month}_${year}`] == undefined) {
                    saldo.monthly[`${month}_${year}`] = {pengeluaran: 0, pemasukan: 0, count: 0}
                }
                saldo.monthly[`${month}_${year}`][element.category.type.toLowerCase()] += element.amount
                saldo.monthly[`${month}_${year}`].count++

                if(saldo.categorized[element.category.name.replace(' ', '_')] == undefined) {
                    saldo.categorized[element.category.name.replace(' ', '_')] = {pengeluaran: 0, pemasukan: 0}
                }
                saldo.categorized[element.category.name.replace(' ', '_')][element.category.type.toLowerCase()] += element.amount
            });

            code = 200
            result = saldo
        }
        catch(err) {
            code = 500
            result = {message: err}
        }
        res.status(code).json(result)
    }
}