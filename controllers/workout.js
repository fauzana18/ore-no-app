const main = require('./main')
const { movement, workset, workout } = require('../models/workout')
const db = require('../utils/db')
const convertTZ = require('../utils/date')

module.exports = {
    findAll: main.findAll(workout, ['id', 'ASC'], [{model: movement, required: true}]),
    update: main.update(workout),
    create: async (req, res, next) => {
        let code, result, transaction
        
        try{
            await db.authenticate()
            transaction = await db.transaction()
            let worksetModel = workset(db)
            let workoutModel = workout(db)

            const workingset = await worksetModel.findOne({
                attributes: ['movements'],
                where: {
                    id: req.body.workset
                }
            })
            const movements = workingset.movements.split(',')

            const data = movements.map(element => {
                const date = new Date()
                return {
                    movement_id: element,
                    set1: 0,
                    set2: 0,
                    set3: 0,
                    note: '',
                    date: convertTZ(date, "Asia/Jakarta")
                }
            })

            await workoutModel.bulkCreate(data, {
                transaction
            })
            await transaction.commit()
            code = 200
            result = {message: 'Data berhasil disimpan'}
        }
        catch(err) {
            await transaction.rollback()
            code = 500
            result = {message: 'Data gagal disimpan'}
        }
        res.status(code).json(result)
    },
    delete: async (req, res, next) => {
        let code, result, transaction
        
        try{
            await db.authenticate()
            transaction = await db.transaction()
            let workoutModel = workout(db)
            const dbRes = await workoutModel.destroy({
                where: { id: req.body.ids },
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