var a = [
    { a: 1, b: 2 },
    { a: 3, b: 4 },
    { a: 5, b: 6 },
];

a.find(o => o.a == 1).a = -1;

console.log(a);
