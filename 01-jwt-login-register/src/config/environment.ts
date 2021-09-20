import dotenv from "dotenv";

const environments = dotenv.config({
  path: "./src/.env",
});

// Cargar las variables de entorno desde el fichero si no estamos en Producción

if (process.env.NODE_ENV !== "production") {
  if (environments.error) {
    throw environments.error;
  }
}

export default environments;
