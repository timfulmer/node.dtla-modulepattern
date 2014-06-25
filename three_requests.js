/**
 * Created by tim on 6/25/14.
 */
function threeRequestsModule(){
    var http= require('http');
    var q= require('q');
    function requestPromiseFactory(host){
        var params={host:host,agent:false};
        return q.Promise(function(resolve){
            function responseHandler(response){
                response.on('end',resolve);
            }
            var req=http.request(params,
                responseHandler);
            req.end();
        });
    }
    requestPromiseFactory(
            'facebook.com'
    ).then(
        requestPromiseFactory('twitter.com')
    ).then(
        requestPromiseFactory('pinterest.com')
    ).then(
        console.log('success!')
    ).done();
}
exports=module.exports={requestAllThree:threeRequestsModule};