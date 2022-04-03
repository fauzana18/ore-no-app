const db = require('../utils/db')
const { relation } = require('../models/finance')
const { Op } = require('sequelize')

module.exports = {
    findAll: (model, include = []) => async (req, res, next) => {
        let code, result, where = {}

        if(Object.keys(req.query).length) where = module.exports.queryHandler(req.query)
        
        try{
            await db.authenticate()
            let dbModel = model(db)
            if(include.length) dbModel = relation(dbModel, db, include)
            const dbRes = await dbModel.findAll({
                include: include.map(each => {return {model: each.model(db), required: each.required}}),
                where
            })
            code = 200
            result = {result: dbRes}
        }
        catch(err) {
            code = 500
            result = {message: err}
        }
        res.status(code).json(result)
    },
    findOne: (model, include = []) => async (req, res, next) => {
        let code, result
        
        try{
            await db.authenticate()
            let dbModel = model(db)
            if(include.length) dbModel = relation(dbModel, db, include)
            const dbRes = await dbModel.findOne({
                where: {
                    id: req.params.id
                },
                include
            })
            code = 200
            result = {result: dbRes}
        }
        catch(err) {
            code = 500
            result = {message: err}
        }
        res.status(code).json(result)
    },
    create: (model) => async (req, res, next) => {
        let code, result, transaction
        
        try{
            await db.authenticate()
            transaction = await db.transaction()
            const dbModel = model(db)
            const dbRes = await dbModel.create(req.body, {
                transaction
            })
            await transaction.commit()
            code = 200
            result = {message: 'Data berhasil dibuat'}
        }
        catch(err) {
            await transaction.rollback()
            code = 500
            result = {message: 'Data gagal dibuat'}
        }
        res.status(code).json(result)
    },
    update: (model) => async (req, res, next) => {
        let code, result, transaction
        
        try{
            await db.authenticate()
            transaction = await db.transaction()
            const dbModel = model(db)
            const dbRes = await dbModel.update(req.body, {
                where: {
                    id: req.params.id
                },
                transaction
            })
            await transaction.commit()
            code = 200
            result = {message: 'Data berhasil diubah'}
        }
        catch(err) {
            await transaction.rollback()
            code = 500
            result = {message: 'Data gagal diubah'}
        }
        res.status(code).json(result)
    },
    delete: (model) => async (req, res, next) => {
        let code, result, transaction
        
        try{
            await db.authenticate()
            transaction = await db.transaction()
            const dbModel = model(db)
            const dbRes = await dbModel.destroy({
                where: {
                    id: req.params.id
                },
                transaction
            })
            await transaction.commit()
            code = 200
            result = {message: 'Data berhasil dihapus'}
        }
        catch(err) {
            await transaction.rollback()
            code = 500
            result = {message: 'Data gagal dihapus'}
        }
        res.status(code).json(result)
    },
    queryHandler: (query) => {
        let obj = {}
        Object.keys(query).forEach(each => {
            if(typeof query[each] != 'object') {
                obj[each] = query[each]
            }
            else {
                obj[each] = {
                    [Op[Object.keys(query[each])[0]]]: Object.values(query[each])[0]
                }
            }
        })
        return (obj)
    }
}