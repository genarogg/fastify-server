// Limpia la consola
import clear from "console-clear";
clear();

import log from "@log";

import fastify from "fastify";
import cors from "@fastify/cors";
import formbody from "@fastify/formbody";
import multipart from "@fastify/multipart";

// variables de entorno
const PORT = parseInt(process.env.PORT || "4000");
const CORS_URL = process.env.CORS_URL || "*";

const server = fastify({ bodyLimit: 1048576 });

// Plugin para parsear URL-encoded
server.register(formbody);
// Registrar el plugin de multipart para manejar multipart/form-data
server.register(multipart);

// Registrar el plugin de CORS
server.register(cors, {
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
