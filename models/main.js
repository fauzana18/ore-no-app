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
    hasOne,
    hasMany
}