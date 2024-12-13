class RequestPool {
    constructor(maxRequests) {
        this.maxRequests = maxRequests; // 最大并发请求数
        this.requests = []; // 请求队列
        this.curRequests = []; // 当前活跃的请求
    }

    // 添加请求到池中
    addRequest(request, times = 3) {
        this.requests.push({ request, times });
        this.addCurRequest();
    }

    // 处理请求队列
    addCurRequest() {
        // while循环并不会阻塞主线程，因为每次循环都会检查当前活跃请求数是否小于最大请求数
        // 如果小于则继续处理队列，否则退出循环
        while (this.requests.length > 0 && this.curRequests.length < this.maxRequests) {
            console.log('addCurRequest');
            const { request, times } = this.requests.shift(); // 从队列中取出一个请求
            this.curRequests.push({ request, times }); // 添加到活跃请求中
            request().then((res) => {
                this.onSuccess(request);
                console.log(res);
            }).catch((e) => {
                this.onFail(request, times);
                console.log(e);
            })
        }
    }

    // 请求成功处理
    onSuccess(request) {
        const index = this.curRequests.findIndex(r => r.request === request);
        if (index !== -1) {
            this.curRequests.splice(index, 1); // 从活跃请求中移除
        }
        this.addCurRequest(); // 继续处理队列
    }

    // 请求失败处理
    onFail(request, times) {
        if (times > 0) {
            const index = this.curRequests.findIndex(r => r.request === request);
            if (index !== -1) {
                this.curRequests[index].times--; // 减少重试次数
                this.requests.unshift(this.curRequests[index]); // 重新加入队列
                this.curRequests.splice(index, 1); // 从活跃请求中移除
            }
            this.addCurRequest(); // 继续处理队列
        } else {
            const index = this.curRequests.findIndex(r => r.request === request);
            if (index !== -1) {
                this.curRequests.splice(index, 1); // 从活跃请求中移除
            }
            this.addCurRequest(); // 继续处理队列
        }
    }
}

// 使用示例
// 模拟请求函数
function mockRequest(i) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.5) { // 随机成功或失败
                resolve(`Request ${i} succeeded`);
            } else {
                reject(`Request ${i} failed`);
            }
        }, 1000);
    });
}

// 创建请求池，限制最多5个并发请求
const requestPool = new RequestPool(5);
// 添加请求到池中
for (let i = 1; i <= 10; i++) {
    requestPool.addRequest(() => mockRequest(i), 3); // 每个请求最多重试3次
}