var azure = require('azure');
var config = require('./config');
var WebSocket = require('ws');

var sbService = azure.createServiceBusService(config.sbConnectionString);

var ws = new WebSocket(config.sourceSocket);

ws.on('open', function() {
    
    console.log('connected');

});

ws.on('message', function(data, flags) {

   console.log('receiving data...');

   var message = JSON.stringify(data); // will need to try Base64 encoding

    console.log('sending message to service bus');
    sbService.sendTopicMessage(config.sbTopic, message, function(error){
        if(error) {
            console.error(error);
        }
    });
    console.log('message sent!');

});
