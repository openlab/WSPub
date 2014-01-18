var azure = require('azure');
var program = require('commander');
var config = require('./config');
var WebSocket = require('ws');
var stdin = process.stdin;

var sbService = azure.createServiceBusService(config.sbConnectionString);

/*
var ws = new WebSocket(config.sourceSocket);

ws.on('open', function() {
    console.log('Connected to ' + config.sourceSocket);
});

ws.on('message', function(data, flags) {
   var message = new Buffer(data).toString('base64');
   console.log('Message received, length in b64: ' + message.length);

    sbService.sendTopicMessage(config.sbTopic, message, function(error){
        if(error) {
            console.error(error);
        } else {
	    console.log('Message written to ' + config.sbTopic);
	}
    });
});
*/

stdin.on('data', function(chunk) {
   var message = new Buffer(chunk).toString('base64');
   console.log('STDIN received, length in b64: ' + message.length);

    sbService.sendTopicMessage(config.sbTopic, message, function(error){
        if(error) {
            console.error(error);
        } else {
	    console.log('Message written to ' + config.sbTopic);
	}
    });
});
