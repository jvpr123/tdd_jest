require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

module.exports = {
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dialect: process.env.DB_DIALECT || "postgres",
  storage: "./__tests__/database.sqlite",
  logging: false, // Desativa o log de muitas informações ao rodar migrations
  define: {
    timestamps: true, // created_at e updated_at automáticos
    underscored: true, // Nomes de tabelas sempre em snake_case
    underscoredAll: true, // Nomes de colunas sempre em snake_case
  },
};
