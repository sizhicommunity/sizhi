
module.exports ={
    name:"datasource",
    filePattern:"**/**.datasource.yml",
    toPiece:function(o){
        return o
    },
    merge:function(model,piece){
        model.datasources = (model.datasources || []).concat(piece.datasources || [])
        return model
    }
}