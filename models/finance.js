const Sequelize = require('sequelize')

const category = (orm) => {
    return orm.define(
        'category',
        {
          name: {
            type: Sequelize.STRING(255),
            allowNull: false,
          },
          type: {
            type: Sequelize.STRING(255),
            allowNull: false,
          },
        },
        {
          timestamps: false,
          tableName: 'category',
        }
    )
}

const profile = (orm) => {
  return orm.define(
      'profile',
      {
        name: {
          type: Sequelize.STRING(255),
          allowNull: false,
        }
      },
      {
        timestamps: false,
        tableName: 'profile',
      }
  )
}

const transaction = (orm) => {
  return orm.define(
      'transaction',
      {
        name: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        category_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        amount: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        profile_id: {
          type: Sequelize.INTEGER,
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
        tableName: 'transaction',
      }
  )
}

const hasOne = (model, orm, include) => {
  include.forEach(each => {
    model.hasOne(each.model(orm), {
      sourceKey: `${each.model.name}_id`,
      foreignKey: 'id'
    })
  })
  return model
}

const hasMany = (model, orm, include) => {
  include.forEach(each => {
    model.hasMany(each.model(orm), {
      onDelete: `cascade`,
      hooks: true,
      sourceKey: `id`,
      foreignKey: `${model.name}_id`
    })
  })
  return model
}

module.exports = {
    category,
    profile,
    transaction,
    hasOne,
    hasMany
}