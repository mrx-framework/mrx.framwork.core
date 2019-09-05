const config = {
  development: {
    mode: "development",
    locale: "en",
    database: {
      connection: {
        "username": "root",
        "password": null,
        "database": "mrx.framework.dev",
        "host": "127.0.0.1",
        "dialect": "mariadb"
      },
      migrate: "auto",
      seeding: "auto"
    },
    server: {
      ssl: false,
      port: 8000,
      host: "localhost"
    }
  },
  production: {
    mode: "production",
    locale: "en",
    database: {
      connection: {
        "username": "root",
        "password": null,
        "database": "mrx.framework.dev",
        "host": "127.0.0.1",
        "dialect": "mariadb"
      },
      migrate: "auto",
      seeding: "auto"
    },
    server: {
      ssl: false,
      port: 8000,
      host: "localhost"
    }
  },
  test: {
    mode: "development",
    locale: "en",
    database: {
      connection: {
        "username": "root",
        "password": null,
        "database": "mrx.framework.dev",
        "host": "127.0.0.1",
        "dialect": "mariadb"
      },
      migrate: false, //"auto",
      seeding: false, //"auto"
    },
    server: {
      ssl: false,
      port: 3000,
      host: "localhost"
    }
  }
}

const env = process.env.NODE_ENV || "development"

module.exports = config[env]
