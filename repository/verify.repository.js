const { getConnection } = require("../connection/connection")
let knex = getConnection()

exports.login = async (user, password) => {
  const userExists = await knex('user').where({ ['user']: user }).first();
  if (!userExists) {
    return { userExists: false };
  }
  return { userExists: true, password: userExists.password, id: userExists.id };
};
