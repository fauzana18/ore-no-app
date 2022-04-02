const db = require('../utils/db')
const { relation } = require('../models/finance')

module.exports = {
    findAll: (model, include = []) => async (req, res, next) => {
        let code, result
        
        try{
            await db.authenticate()
            let dbModel = model(db)
            if(include.length) dbModel = relation(dbModel, db, include)
            const dbRes = await dbModel.findAll({
                include: include.map(each => {return {model: each.model(db), required: each.required}})
            })
            code = 200
            result = {result: dbRes}
        }
        catch(err) {
            console.log(err)
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
    }
}