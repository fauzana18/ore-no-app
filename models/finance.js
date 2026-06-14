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
        },
        color: {
          type: Sequelize.STRING(255),
          allowNull: true,
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

const plan = (orm) => {
  return orm.define(
      'plan',
      {
        name: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        amount: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        type: {
          type: Sequelize.STRING(10),
          allowNull: false,
        },
        month: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        year: {
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
        tableName: 'plan',
      }
  )
}

module.exports = {
    category,
    profile,
    transaction,
    plan
}