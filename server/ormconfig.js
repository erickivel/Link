module.exports = {
  "type": "postgres",
  "host": process.env.DB_HOST || "localhost",
  "port": process.env.DB_PORT || 5432,
  "username": process.env.DB_USER || "postgres",
  "password": process.env.DB_PASSWORD || "docker",
  "database": process.env.DB_NAME || "link-db",
  "entities": [
    "./dist/database/entities/*.js"
  ],
  "migrations": [
    "./dist/database/migrations/*.js"
  ],
  "cli": {
    "migrationsDir": "./src/database/migrations"
  }
}
