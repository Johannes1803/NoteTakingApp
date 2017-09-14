console.log("Starting app.js");
// build-in and 3rd party modules
const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

// own module
const notes = require('./notes.js');

// Store the command entered by user
const argv = yargs.argv;
var command = argv._[0];
console.log('Command:',command);
console.log('yargs:', argv)

// call functions depending on the command user entered in terminal
if (command === 'add'){
	var note = notes.addNote(argv.title, argv.body);
	// if the notes title doesnt exist yet, show title and body of new note entry
	if (note){
		notes.logNote(note);
	} else	{
		// Alert that title is already taken!
		console.log("The title already exists!");
	}
} else if (command === 'list'){
	notes.getAll();
} else if (command === 'read'){
	var note = notes.getNote(argv.title);
	if (note){
		notes.logNote(note);
	} else {
		console.log('Note not found.');
	}
} else if (command === 'remove'){
	var noteRemoved = notes.removeNote(argv.title);
	var message = noteRemoved ? 'Note was removed': 'Note not found';
	console.log(message);
}else {
	console.log('Command not recognized')
}