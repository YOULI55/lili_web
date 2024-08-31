// Description: markdown-loader

module.exports = function(source) {
    console.log(source,'source');
    return `export default ${JSON.stringify(source)}`;
}