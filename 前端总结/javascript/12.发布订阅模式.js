class EventBus {
    constructor() {
        this.events = {};
    }

    addEvent(eventName, callback) {
        if(!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(callback);
    }

    removeEvent(eventName, callback) {
        if(!this.events[eventName]) {
            return;
        }
        this.events[eventName] = this.events[eventName].filter(cb => cb !== callback);
    }

    publish(eventName, ...args) {
        if(!this.events[eventName]) {
            return;
        }
        this.events[eventName].forEach(cb => {
            cb(...args);
        });
    }
}

const eventBus = new EventBus();
function fn1(data) {
    console.log('fn1' + data);
}
function fn2(data) {
    console.log('fn2' + data);
}
eventBus.addEvent('event', fn1)
eventBus.addEvent('event', fn2)
eventBus.publish('event', 'hello');
eventBus.removeEvent('event', fn1);
eventBus.publish('event', 'world');