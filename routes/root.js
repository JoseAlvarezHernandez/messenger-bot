const root = function (request, response, next) {
    response.send(200,{ message : 'Welcome to Inncol\'s API '});
}
module.exports = root;