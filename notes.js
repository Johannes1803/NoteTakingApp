console.log("Starting notes.js");

const fs =require('fs');
// Fetch all existing notes from the json file
var fetchNotes = () => {
	try {
		var notesString = fs.readFileSync('notes-data.json');
		return JSON.parse(notesString);
	} catch (e) {
		// if there are none, notes is the empty array
		return [];
	}
};
// save notes to json file
var saveNotes = (notes) => {
		fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};
// add new note
var addNote = (title, body)  => {
	var notes = fetchNotes();
	var note = {
		title,
		body
	};
	// only if title doesnt exist yet will the Note be added
	var duplicateNotes = notes.filter((note)=> note.title === title);
	
	if (duplicateNotes.length === 0) {
		notes.push(note);
		saveNotes(notes);
		return note;
	}
};

var getAll = () => {
	console.log('Getting all notes.');
};

var getNote = (title) => {
	var notes = fetchNotes();
	var filteredNote = notes.filter((note)=> note.title === title);
	return filteredNote[0];
};

var removeNote = (title) => {
	var notes= fetchNotes();
	var filteredNotes = notes.filter((note)=> note.title !== title);
	saveNotes(filteredNotes);	

	return notes.length !== filteredNotes.length;
};

var logNote = (note) => {
	console.log('--');
	console.log('title:' + note.title + ', body:' + note.body);
};

module.exports = {
	addNote,
	getAll,
	getNote,
	removeNote,
	logNote
};
