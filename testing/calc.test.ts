import { sum, sub } from "./calc.ts";
// import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { assertEquals } from "../dependencies.ts";

Deno.test("Sum function", () => {
  const result = sum(13, 5);

  assertEquals(result, 18);
});

Deno.test("Sub function", () => {
  const result = sub(13, 5);

  assertEquals(result, 8);
});
