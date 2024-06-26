import fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";

import {
  ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";

export const app = fastify().withTypeProvider<ZodTypeProvider>();
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "SampleApi",
      description: "Sample backend service",
      version: "1.0.0",
    },
    servers: [],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUI, {
  routePrefix: "/",
});

app
  .withTypeProvider<ZodTypeProvider>()
  .register(authRoutes, { prefix: "/auth" })
  .register(userRoutes, { prefix: "/users" });

async function run() {
  await app.ready();

  await app.listen({
    port: 3000,
  });

  console.log(`Documentation running at http://localhost:3000/`);
}

run();
