const Sequelize = require('sequelize')

const vault = (orm) => {
  return orm.define(
      'vault',
      {
        webapp: {
          type: Sequelize.STRING(300),
          allowNull: false,
        },
        created: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW
        }
      },
      {
        timestamps: false,
        tableName: 'vault',
      }
  )
}

const vault_item = (orm) => {
  return orm.define(
      'vault_item',
      {
        vault_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        nonce: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        ciphertext: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        active: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true
        },
        created: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW
        }
      },
      {
        timestamps: false,
        tableName: 'vault_item',
      }
  )
}

const notes = (orm) => {
  return orm.define(
      'notes',
      {
        title: {
          type: Sequelize.STRING(300),
          allowNull: false,
        },
        nonce: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        ciphertext: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        created: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW
        }
      },
      {
        timestamps: false,
        tableName: 'notes',
      }
  )
}

module.exports = {
    vault,
    vault_item,
    notes
}