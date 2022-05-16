const homeUrl = 'http://localhost'
module.exports = {
    defaultPort: 3000,
    homeUrl:function(foundPort){
        return `${homeUrl}:${foundPort}/www`
    },
    healthUrl:function(foundPort){
        return `${homeUrl}:${foundPort}/ping`
    },
}