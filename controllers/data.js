const main = require('./main')
const { vault, vault_item, notes } = require('../models/data')
const db = require('../utils/db')
const convertTZ = require('../utils/date')
const { col } = require('sequelize')

module.exports = {
    findAllVault: async (req, res, next) => {
        let code, result
        
        try{
            await db.authenticate()
            const vaultModel = vault(db)
            const vaultItemModel = vault_item(db)

            vaultModel.hasMany(vaultItemModel, {
                sourceKey: `id`,
                foreignKey: 'vault_id'
            })
            const dbRes = await vaultModel.findAll({
                include: [{model: vaultItemModel, where: {active: true}, attributes: [], required: true}],
                attributes: ['id', 'webapp', [col('vault_items.nonce'), 'nonce'], [col('vault_items.ciphertext'), 'ciphertext']],
                order: [['webapp', 'ASC']],
                raw: true
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
    createVault: async (req, res, next) => {
        let code, result, transaction
        
        try{
            await db.authenticate()
            transaction = await db.transaction()
            const vaultModel = vault(db)
            const vaultItemModel = vault_item(db)

            const dbRes = await vaultModel.create({webapp: req.body.webapp}, {
                transaction
            })

            const dbRes2 = await vaultItemModel.create({vault_id: dbRes.id, ...req.body}, {
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
    updateVault: async (req, res, next) => {
        let code, result, transaction
        
        try{
            await db.authenticate()
            transaction = await db.transaction()
            const vaultModel = vault(db)
            const vaultItemModel = vault_item(db)

            const dbUpdateVault = await vaultModel.update({webapp: req.body.webapp}, {
                where: {id: req.params.id},
                transaction
            })

            if(req.body.changed) {
                const dbUpdateItem = await vaultItemModel.update({active: false}, {
                    where: {vault_id: req.params.id, active: true},
                    transaction
                })
                
                const {nonce, ciphertext} = req.body
                const dbCreateItem = await vaultItemModel.create({nonce, ciphertext, vault_id: req.params.id}, {transaction})
            }
            
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
    deleteVault: async (req, res, next) => {
        let code, result, transaction
        
        try{
            await db.authenticate()
            transaction = await db.transaction()
            let vaultModel = vault(db)
            let vaultItemModel = vault_item(db)
            const dbRes = await vaultItemModel.destroy({
                where: { vault_id: req.params.id },
                transaction
            })
            const dbRes2 = await vaultModel.destroy({
                where: { id: req.params.id },
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
    getVaultHistory: async (req, res, next) => {
        let code, result

        try{
            await db.authenticate()
            let vaultItemModel = vault_item(db)
            
            const dbRes = await vaultItemModel.findAll({
                where: { vault_id: req.params.id, active: false },
                attributes: ['nonce', 'ciphertext', 'created'],
                order: [['created', 'DESC']],
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
    findAllNotes: main.findAll(notes, ['created', 'DESC']),
    createNotes: main.create(notes),
    updateNotes: main.update(notes),
    deleteNotes: main.delete(notes),
}