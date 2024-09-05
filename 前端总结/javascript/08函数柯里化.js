function curry(fn,...args) {
    return function(...newArgs) {
        if(args.length + newArgs.length === fn.length) {
            return fn.call(this,...args,...newArgs);
        }else {
            return curry.call(this,fn,...args,...newArgs);
        }
    }
}

function add(a,b,c,d) {
    return a + b + c + d;
}

console.log(curry(add)(6)(2)(3)(4)); // 10