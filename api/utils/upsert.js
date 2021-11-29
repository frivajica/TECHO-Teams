var upsert = function (model, where, newItem) {
    // First try to find the record
    return model.findOne({where: where})
    .then(foundItem => {
        if (!foundItem) {
            // Item not found, create a new one
            return model.create(newItem)
        } else {
            // Found an item, update it
            return model.update(newItem, {where: where})
        }
    })
}

module.exports = upsert;