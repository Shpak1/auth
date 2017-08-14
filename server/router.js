module.exports = function (app) {
    app.get('/', function(req,resp,next){
        resp.send(['new', 'slut', 'baby'])
    })
}
