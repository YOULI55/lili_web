const deepClone = (obj) => {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof RegExp) return new RegExp(obj);
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof Function) {
            return obj.bing(this);
    }
    const res = obj instanceof Array ? [] : {};
    for(let key in obj) {
        if(obj.hasOwnProperty(key)) {
            res[key] = deepClone(obj[key]);
        }
    }
    return res;
}