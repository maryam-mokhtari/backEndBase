const outputResult = function() {
    this.hasError = null;
    this.code = null;
    this.data = [];
    this.message = '';
    this.status = 200
}

outputResult.prototype.setCode = function(code){
    this.hasError  = false;
    this.code = code;
    return this;
}

outputResult.prototype.setErrorCode = function(code){
    this.hasError = true;
    this.code = code;
    this.status = code == 403? code: 400
    return this;
}

outputResult.prototype.setData = function(data){
    this.data = data;
    return this;
}

outputResult.prototype.setMessage = function(message){
    this.message = message;
    return this;
}

outputResult.prototype.validateResultForOutput = function(){
    if(this.code == -1){
        this.message = 'Internal Server Error'
    }
    return this;
}

module.exports = outputResult;
