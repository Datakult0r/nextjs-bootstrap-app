import { createMcpHandler } from "@vercel/mcp-adapter";
import { z } from "zod";
import { v0Tools } from "../../v0-mcp-server-main/app/tools/v0-tools.js";
import { createClient } from "redis";

// Configuration for max distance
const MAX_DISTANCE = 800;

const redisClient = createClient({
  url: process.env.REDIS_URL,
  socket: {
    connectTimeout: 60000,
  },
  database: 0,
});
redisClient.connect().catch(console.error);

const promptSchema = {
  prompt: z.string(),
  system_message: z.string().optional(),
  max_tokens: z.number().optional(),
  temperature: z.number().optional(),
};

const handler = createMcpHandler((server) => {
  // Echo tool for testing
  server.tool("echo", { message: z.string() }, async ({ message }) => ({
    content: [{ type: "text", text: `Tool echo: ${message}` }],
  }));

  // v0Design tool: uses v0 generateCompletion for design/UX suggestions
  server.tool("v0Design", promptSchema, async (args) => {
    return await v0Tools.generateCompletion({
      prompt: args.prompt,
      system_message: args.system_message,
      max_tokens: args.max_tokens,
      temperature: args.temperature,
      model: "v0-1.0-md",
      stream: false,
    });
  });

  // v0Code tool: uses v0 generateCompletion for code generation/modification
  server.tool("v0Code", promptSchema, async (args) => {
    return await v0Tools.generateCompletion({
      prompt: args.prompt,
      system_message: args.system_message,
      max_tokens: args.max_tokens,
      temperature: args.temperature,
      model: "v0-1.0-md",
      stream: false,
    });
  });

  // vercelDeploy tool: placeholder for managing Vercel deployments
  server.tool("vercelDeploy", { action: z.string() }, async (args) => {
    // TODO: Implement Vercel deployment management using Vercel API
    return {
      content: [{ type: "text", text: `Vercel deployment action requested: ${args.action}` }],
    };
  });

  // redisState tool: simple Redis get/set for development state management with max distance
  server.tool(
    "redisState",
    {
      command: z.enum(["get", "set", "config"]),
      key: z.string(),
      value: z.string().optional(),
    },
    async (args) => {
      try {
        if (args.command === "get") {
          const result = await redisClient.get(args.key);
          return { content: [{ type: "text", text: `Redis GET ${args.key}: ${result} (Max Distance: ${MAX_DISTANCE})` }] };
        } else if (args.command === "set" && args.value !== undefined) {
          await redisClient.set(args.key, args.value);
          return { content: [{ type: "text", text: `Redis SET ${args.key} = ${args.value} (Max Distance: ${MAX_DISTANCE})` }] };
        } else if (args.command === "config") {
          return { content: [{ type: "text", text: `Redis Configuration - Max Distance: ${MAX_DISTANCE}` }] };
        } else {
          return { content: [{ type: "text", text: "Invalid Redis command or missing value" }] };
        }
      } catch (error: unknown) {
        return { content: [{ type: "text", text: `Redis error: ${error instanceof Error ? error.message : String(error)}` }] };
      }
    }
  );
});

export { handler as GET, handler as POST, handler as DELETE };
