//This file holds database log in info
module.exports = {
  "development": {
    "username": "root",
    "password": process.env.mysqlPassword,
    "database": "d0h81wtddmdymv4o",
    "host": "localhost",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": "root",
    "database": "testdb",
    "host": "localhost",
    "dialect": "mysql",
    "logging": false
  },
  "production": {
    "use_env_variable": "JAWSDB_URL",
    "dialect": "mysql",
    "operatorsAliases": false
  }
}
