// obj[1]  // 1
// obj[1][2]  // 3
// obj[1][2][3] + 10  // 16

const createProxy = (value=0) => {
    return new Proxy({}, {
        get(target,key) {
            console.log(key,Symbol.toPrimitive,key === Symbol.toPrimitive)
            if(key === Symbol.toPrimitive) {
                return () => {
                    return value;
                };
            }
            return createProxy(value+Number(key));
        }
    })
}

const add = createProxy();

const r1 = +add[1][2][3]
console.log(r1); // 16