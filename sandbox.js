var a = {
    a: 0,
    b: 2,
    c: 3,
};

console.log(
    Object.entries(a).map(a => {
        let o = {};
        o[a[0]] = a[1];
        return o;
    })
);
