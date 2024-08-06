// Limpia la consola
import clear from "console-clear";
clear();

import fastify from "fastify";
import fastifyCors from "fastify-cors";
import log from "./src/config/console";

// variables de entorno
const PORT = parseInt(process.env.PORT || "4000");
const CORS_URL = process.env.CORS_URL || "*";

const server = fastify({ bodyLimit: 1048576 });

// Habilita CORS
server.register(fastifyCors, {
  origin: CORS_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

server.get("/", async (request, reply) => {
  return { hello: "world" };
});

const start = async () => {
  try {
    await server.listen({ port: PORT });

    log.green(`El servidor esta corriendo http://localhost:${PORT}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
