import Fastify from "fastify";
import fastifyStatic from "@fastify/static";
import path from "path";
import registerInvoice from "./invoice.js";
import registerInvoiceComplete from "./invoice-complete.js";

const __dirname = import.meta.dirname;

const fastify = Fastify({
  logger: true,
});

fastify.register(fastifyStatic, {
  root: path.join(__dirname, "public"),
  prefix: "/public/",
});

fastify.register(registerInvoice, { prefix: "/invoice" });
fastify.register(registerInvoiceComplete, { prefix: "/invoice-complete" });

fastify.get("/htmx.js", function (req, reply) {
  reply.sendFile("node_modules/htmx.org/dist/htmx.js", path.join(__dirname));
});

fastify.get("/client-side-templates.js", function (req, reply) {
  reply.sendFile(
    "node_modules/htmx.org/dist/ext/client-side-templates.js",
    path.join(__dirname)
  );
});

fastify.get("/response-targets.js", function (req, reply) {
  reply.sendFile(
    "node_modules/htmx.org/dist/ext/response-targets.js",
    path.join(__dirname)
  );
});

fastify.get("/handlebars.js", function (req, reply) {
  reply.sendFile(
    "node_modules/handlebars/dist/handlebars.js",
    path.join(__dirname)
  );
});

fastify.get("/favicon.ico", function (req, reply) {
  reply.sendFile("favicon.ico", path.join(__dirname));
});

fastify.get("/", (request, reply) => {
  reply.sendFile("index.html", path.join(__dirname));
});

fastify.listen({ port: 8080 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
