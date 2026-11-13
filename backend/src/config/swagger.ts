import swaggerJSDoc from "swagger-jsdoc";


const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Chatvo",
      version: "1.0.0",
      description: "API Documentation for Chatvo",
    },

    server: [
      {
        url: `http://localhost:${process.env.PORT}`,
        description: "Local development server",
      },
    ],
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

  apis:["./src/routes/**/*.ts"]
};

export const swaggerSpec = swaggerJSDoc(options)