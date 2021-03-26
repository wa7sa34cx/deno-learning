// https://jsonplaceholder.typicode.com/todos/1

const url = Deno.args[0];
const response = await fetch(url);
const data = await response.json();

console.log(data);
