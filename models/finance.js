const { DataTypes } = require('sequelize')

const category = (orm) => {
    return orm.define(
        'category',
        {
          name: {
            type: DataTypes.STRING(255),
            allowNull: false,
          },
          type: {
            type: DataTypes.STRING(255),
            allowNull: false,
          },
        },
        {
          timestamps: false,
          tableName: 'category',
        }
    )
}

module.exports = {
    category
}