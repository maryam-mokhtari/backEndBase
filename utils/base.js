const dbConnect = require('../utils/dbConnect')
const log = require('../log').log
const result = require('../utils/result')
const token = require('../utils/token')
const {finalize} = require('base')

module.exports = {
  async saveInfo(tokenInput, info, functionName, userId, isAdminConsidered = false) {
   let outputResult = new result()
   try {
     const tokenData = token.verify(tokenInput)
     if (!tokenData) {
       outputResult.setErrorCode(403).setMessage('Authentication failed');
       return outputResult;
     }
     let params = isAdminConsidered?
     userId? [parseInt(tokenData.userId), userId, ...info]
     : [null, parseInt(tokenData.userId), ...info]
     : [parseInt(tokenData.userId), ...info]
     console.log('functionName:', functionName, 'params:', params);
     let dbOutput = await dbConnect.func(functionName, params);
     console.log('dbOutput', dbOutput);
     if (dbOutput[0][functionName] == -1) {
       outputResult.setErrorCode(403).setMessage('Permission denied');
       return outputResult
     }
     if (dbOutput[0][functionName] == null) {
       outputResult.setErrorCode(2001).setMessage('No query result');
       return outputResult
     }
     if (dbOutput[0][functionName] == -2) {
       outputResult.setErrorCode(2001).setMessage('Input format invalid');
       return outputResult
     }
     outputResult.setCode(0).setData([{userId: tokenData.userId, output: dbOutput[0][functionName] }]).setMessage('OK')
     return outputResult
   } catch (ex) {
     outputResult.setErrorCode(-1).setMessage(ex.message);
     log.error(`${functionName} exception, ${ex.message}`);
   }
   return outputResult;
 },
 async getInfo(res, ...args) {
   const result = getInfoBase(...args)
   finalize(result, res)
 },
 async getInfoBase(functionName, tokenInput, info, isAdminConsidered, userId) {
   console.log('getInfo:', tokenInput, functionName, userId, info);
   let outputResult = new result()
   try {
     let tokenData;
     if (tokenInput) {
       tokenData = token.verify(tokenInput)
       console.log('tokenData:', tokenData, );
       if (!tokenData) {
         outputResult.setErrorCode(403).setMessage('Authentication failed');
         return outputResult;
       }
       if (userId && !tokenData.rolename.includes('admin')) {
         outputResult.setErrorCode(403).setMessage('Permission denied');
         return outputResult;
       }
     }
     let params = tokenInput? isAdminConsidered? userId? [parseInt(tokenData.userId), parseInt(userId)]
     : [null, parseInt(tokenData.userId)]
     : info? [parseInt(tokenData.userId), ...info]:[parseInt(tokenData.userId)]
     : []
     console.log('functionName:', functionName, 'params:', params);
     let dbOutput = await dbConnect.func(functionName, params);
     console.log('dbOutput:', dbOutput);
     outputResult.setCode(0).setData(dbOutput).setMessage('OK')
   } catch (ex) {
     outputResult.setErrorCode(-1).setMessage(ex.message);
     log.error(`getInfo exception, ${ex.message}`);
   }
   return outputResult;
 }
}
