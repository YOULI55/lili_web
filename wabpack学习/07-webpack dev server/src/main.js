import './main.css';
import createElement from './heading.js';
import img from './img.png';

console.log('main.js');

const heading = createElement();

document.body.append(heading);

const imgElement = new Image();
imgElement.src = img;
document.body.append(imgElement);