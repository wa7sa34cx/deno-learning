import { Application, Router } from "https://deno.land/x/oak/mod.ts";

// global vars
const port = 5555;

const app = new Application();
const router = new Router();

// Add middleware
app.use(router.routes());

// routes
router.get("/", ({ response }: { response: any }) => {
  response.body = "Hello from Oak!";
});

console.log(`Listening on ${port}...`);
await app.listen({ hostname: "127.0.0.1", port });
