import { format, parse } from "https://deno.land/std@0.91.0/datetime/mod.ts";

const a = parse("20-01-2019", "dd-MM-yyyy");
console.log(a);

const b = format(new Date(2019, 2, 20), "dd-MM-yyyy");
console.log(b);
