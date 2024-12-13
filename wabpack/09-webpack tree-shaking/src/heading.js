export default () => {
    const element = document.createElement('h2');

    element.textContent = 'Hello world';
    element.addEventListener('click', () => {
        alert('Hello webpack');
    });

    return element;

    console.log('heading.js'); //未引用代码
}

export function test() {} //未引用代码

export const a = 1; //未引用代码