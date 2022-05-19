const Sequelize = require('sequelize')

const movement = (orm) => {
    return orm.define(
        'movement',
        {
          name: {
            type: Sequelize.STRING(255),
            allowNull: false,
          },
          type: {
            type: Sequelize.STRING(255),
            allowNull: true,
          },
        },
        {
          timestamps: false,
          tableName: 'movement',
        }
    )
}

const workset = (orm) => {
    return orm.define(
        'workset',
        {
          movements: {
            type: Sequelize.STRING(255),
            allowNull: false,
          },
        },
        {
          timestamps: false,
          tableName: 'workset',
        }
    )
}

const workout = (orm) => {
    return orm.define(
        'workout',
        {
          movement_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          set1: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          set2: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          set3: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          date: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
          }
        },
        {
          timestamps: false,
          tableName: 'workout',
        }
    )
}

module.exports = {
    movement,
    workset,
    workout
}