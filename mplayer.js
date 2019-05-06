var spawner = require('child_process')
var StringDecoder = require('string_decoder').StringDecoder
var events = require('events')
var fs = require('fs')
var schedule = require('node-schedule')
var omx = require('node-mplayer')
var isrunning = require('is-running')

process.on('SIGHUP',  function(){ console.log('\nCLOSING: [SIGHUP]'); process.emit("SIGINT"); })
process.on('SIGINT',  function(){
	 spawner.spawn('bash', ['-c', './cleanup.sh']).pid
	 console.log('\nCLOSING: [SIGINT]');
	 for (var i = 0; i < pids.length; i++) {
		if (isrunning(pids[i])){
		console.log("KILLING: " + pids[i])
		process.kill(-pids[i], 0)
		}
 	}
	 process.exit(0);
 })
process.on('SIGQUIT', function(){ console.log('\nCLOSING: [SIGQUIT]'); process.emit("SIGINT"); })
process.on('SIGABRT', function(){ console.log('\nCLOSING: [SIGABRT]'); process.emit("SIGINT"); })
process.on('SIGTERM', function(){ console.log('\nCLOSING: [SIGTERM]'); process.emit("SIGINT"); })

var pids = new Array();

function cleanPID(pid) {
	var pid = pid || false
	for (var i = 0; i < pids.length; i++) {
		if ( pids[i] == pid ) {
			pids.splice(i, 1)
			// console.log("PID"+pid+" deleted")
		}
	}
}


var player = {
"player": omx("pd/" + "../../parduplayer.wav", 85),
"volume": 85,
"state":0
}
pids.push(player["player"]["pid"])

setTimeout(function(){
	player["player"].play()
}, 2000)
