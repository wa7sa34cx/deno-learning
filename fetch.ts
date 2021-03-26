// https://jsonplaceholder.typicode.com/todos/1

window.addEventListener("load", () => {
  console.log("load");
});

window.addEventListener("unload", () => {
  console.log("unload");
});

const url = Deno.args[0];
const response = await fetch(url);
const data = await response.json();

console.log(data);
