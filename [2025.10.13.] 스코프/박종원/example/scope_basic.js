var global = 10;

function func() {
  var inner = 20;
}

console.log(global);
console.log(inner); // ReferenceError: inner is not defined
