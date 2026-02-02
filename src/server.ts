import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// IMPORTANT: for stdio servers, do NOT write to stdout.
// Use stderr for logs.
const log = (...args: any[]) => process.stderr.write(args.join(" ") + "\n");

const server = new McpServer({
  name: "mcp-spike",
  version: "0.0.1",
});

// A super basic tool: echo back input
server.tool(
  "echo",
  "Echo a message back (smoke test tool).",
  { message: z.string().describe("Message to echo") },
  async ({ message }) => {
    log("[echo] called with:", message);
    return {
      content: [{ type: "text", text: `echo: ${message}` }],
    };
  }
);

// Start stdio transport
const transport = new StdioServerTransport();
await server.connect(transport);
