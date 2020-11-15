const knex = require('../database/connection');

exports.all = () => {
  return knex
    .select('*')
    .from('urlTable');
}

exports.create = (url) => {
  return knex('urlTable')
    .insert({ 
      original_url: url.original_url,
      nanoid: url.nanoid,
      short_url: url.short_url,
    });
}

//Find por el nanoid
exports.find = (nanoid) => {
  return knex
    .select('*')
    .from('urlTable')
    .where('nanoid', nanoid)
    .first()
}

exports.findById = (id) => {
  return knex
    .select('*')
    .from('urlTable')
    .where('id', id)
    .first()
}

//Aumentar el numero de referencia
exports.changeStatus = (url) => {
  return knex('urlTable')
    .where('id', url.id)
    .update({num_referencia: url.num_referencia+1});
    
}

// exports.delete = (task) => {
//   return knex('urlTable')
//     .where('id', task.id)
//     .del();
// }