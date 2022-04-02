const db = require('../utils/db')

module.exports = {
    findAll: (model) => async (req, res, next) => {
        let code, result
        
        try{
            await db.authenticate()
            const dbModel = model(db)
            const dbRes = await dbModel.findAll()
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
    create: (model) => async (req, res, next) => {
        let code, result
        
        try{
            await db.authenticate()
            const dbModel = model(db)
            const dbRes = await dbModel.create(req.body)
            code = 200
            result = {message: 'Data berhasil dibuat'}
        }
        catch(err) {
            console.log(err)
            code = 500
            result = {message: 'Data gagal dibuat'}
        }
        res.status(code).json(result)
    },
    update: (model) => async (req, res, next) => {
        let code, result
        
        try{
            await db.authenticate()
            const dbModel = model(db)
            const dbRes = await dbModel.update(req.body, {
                where: {
                    id: req.params.id
                }
            })
            code = 200
            result = {message: 'Data berhasil diubah'}
        }
        catch(err) {
            console.log(err)
            code = 500
            result = {message: 'Data gagal diubah'}
        }
        res.status(code).json(result)
    },
    delete: (model) => async (req, res, next) => {
        let code, result
        
        try{
            await db.authenticate()
            const dbModel = model(db)
            const dbRes = await dbModel.destroy({
                where: {
                    id: req.params.id
                }
            })
            code = 200
            result = {message: 'Data berhasil dihapus'}
        }
        catch(err) {
            console.log(err)
            code = 500
            result = {message: 'Data gagal dihapus'}
        }
        res.status(code).json(result)
    }
}