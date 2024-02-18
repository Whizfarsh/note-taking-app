import { useState } from "react";
import { NoteLists } from "./NoteLists";
import { initialNotes } from "./App";
import { NoteOption } from "./NoteOption";
import { NoteContentAdd } from "./NoteContentAdd";

export function NoteApp() {
	const [notes, setNotes] = useState([]);

	const [showAddNote, setShowAddNote] = useState(false);
	const [noteSelected, setNoteSeleted] = useState(null);
	const [showUpdateNote, setShowNoteUpdate] = useState(false);
	const [searchNote, setSearchNote] = useState("");

	function handleAddNote(note) {
		setNotes((notes) => [...notes, note]);
		setShowAddNote(false);
	}

	function handleAddNoteToggle() {
		setShowAddNote((show) => !show);
		setNoteSeleted(null);
		setShowNoteUpdate(false);
	}

	function handleDelete(id) {
		setNotes(notes.filter((note) => id !== note.id));
		setShowNoteUpdate(false);
	}

	function handleEdit(id) {
		const selectedNote = notes.map((note) => note?.id === id);
		setNoteSeleted(selectedNote);
		setShowNoteUpdate((show) => !show);
	}

	function handleNoteSelection(note) {
		setNoteSeleted((noteId) => (noteId?.id === note.id ? null : note));
		setShowAddNote(false);
		if (noteSelected?.id !== note.id && showUpdateNote) {
			setShowNoteUpdate(false);
		}
	}

	function handleNoteUpdate(newTitle, newContent) {
		setNotes((notes) =>
			notes.map((note) =>
				note.id === noteSelected.id
					? { ...note, content: newContent, title: newTitle }
					: note
			)
		);
	}

	function handleNoteSearch(searchNote) {
		if (searchNote === "") setNotes(initialNotes);
		const searchedNote = notes.filter(
			(note) =>
				note.title.toLowerCase().includes(searchNote.toLowerCase()) ||
				note.content.toLowerCase().includes(searchNote.toLowerCase())
		);
		setNotes(searchedNote.length === 0 ? notes : searchedNote);
	}

	return (
		<div className="noteapp">
			<NoteLists
				notes={notes}
				onAddNoteToggle={handleAddNoteToggle}
				onSelection={handleNoteSelection}
				noteSelected={noteSelected}
				onDelete={handleDelete}
				onEdit={handleEdit}
				searchNote={searchNote}
				onSetSearch={setSearchNote}
				onSearch={handleNoteSearch}
			/>
			{showAddNote && (
				<NoteContentAdd
					onAddNote={handleAddNote}
					onShow={showAddNote}
					notes={notes}
				/>
			)}
			{showUpdateNote && (
				<NoteOption
					note={noteSelected}
					notes={notes}
					onUpdate={handleNoteUpdate}
				/>
			)}
		</div>
	);
}
