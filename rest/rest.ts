import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { v4 } from "https://deno.land/std@0.91.0/uuid/mod.ts";
import { User } from "./interfaces.ts";
import { router } from "./router.ts";

// global vars
const port = 5555;

const app = new Application();

let users: User[] = [
  { id: "1", name: "Alex Black" },
  { id: "2", name: "Jonh Wolf" },
  { id: "3", name: "Mika Doomed" },
];

// Add middleware
app.use(router.routes());

// Routes
// Get all users
router.get("/api/v1/users", ({ response }: { response: any }) => {
  response.status = 200;
  response.body = {
    users,
  };
});

// Get user bu id
router.get(
  "/api/v1/users/:id",
  ({ response, params }: { response: any; params: { id: string } }) => {
    const user: User | undefined = users.find((u) => u.id === params.id);

    if (!user) {
      response.status = 404;
      response.body = {
        message: "User not found",
      };
      return;
    }

    response.status = 200;
    response.body = {
      user,
    };
  }
);

// Add new user
router.post(
  "/api/v1/users",
  async ({ response, request }: { response: any; request: any }) => {
    const body = await request.body();

    if (!request.hasBody) {
      response.status = 404;
      response.body = {
        message: "Invalid data",
      };
      return;
    }

    const user: User = await body.value;
    user.id = v4.generate();
    users.push(user);

    response.status = 201;
    response.body = {
      user,
    };
  }
);

// Update user
router.patch(
  "/api/v1/users/:id",
  async ({
    response,
    request,
    params,
  }: {
    response: any;
    request: any;
    params: { id: string };
  }) => {
    const user: User | undefined = users.find((u) => u.id === params.id);

    if (!user) {
      response.status = 404;
      response.body = {
        message: "User not found",
      };
      return;
    }

    const body = await request.body();
    const bodyValue = await body.value;
    users = users.map((u) => (u.id === user.id ? { ...u, ...bodyValue } : u));

    response.status = 200;
    response.body = {
      users,
    };
  }
);

// Delete user
router.delete(
  "/api/v1/users/:id",
  ({ response, params }: { response: any; params: { id: string } }) => {
    const user: User | undefined = users.find((u) => u.id === params.id);

    if (!user) {
      response.status = 404;
      response.body = {
        message: "User not found",
      };
      return;
    }

    users = users.filter((u) => u.id !== params.id);

    response.status = 200;
    response.body = {
      users,
    };
  }
);

console.log(`Listening on ${port}...`);
await app.listen({ hostname: "127.0.0.1", port });
