import { qrcode } from "https://deno.land/x/qrcode/mod.ts";
const base64Image = await qrcode("https://habr.com");

const encoder = new TextEncoder();

const data = encoder.encode(`<img src='${base64Image}'>`);

await Deno.writeFile("./qrcode.html", data);
