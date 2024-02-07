import { useState } from "react";
import "./index.css";

const initialNotes = [
	{
		id: 1,
		category: "General",
		title: "Grocery Shopping",
		content: "Buy groceries: eggs, milk, bread",
	},
	{
		id: 2,
		category: "Reminder",
		title: "Meeting Reminder",
		content: "Meeting with John at 3 PM",
	},
	{
		id: 3,
		category: "Personal Task",
		title: "Birthday Call",
		content: "Call mom to wish her happy birthday",
	},
	{
		id: 4,
		category: "Work-related",
		title: "Presentation Preparation",
		content: "Prepare presentation slides for Monday's meeting",
	},
];

export default function App() {
	return (
		<div className="app">
			<NoteApp />
		</div>
	);
}

function NoteApp() {
	const [notes, setNotes] = useState(initialNotes);

	const [showAddNote, setShowAddNote] = useState(false);
	const [noteSelected, setNoteSeleted] = useState(null);

	function handleAddNote(note) {
		setNotes((notes) => [...notes, note]);
		setShowAddNote(false);
	}

	function handleAddNoteToggle() {
		setShowAddNote((show) => !show);
		setNoteSeleted(null);
	}

	function handleNoteSelection(note) {
		setNoteSeleted((noteId) => (noteId?.id === note.id ? null : note));
		setShowAddNote(false);
	}
	return (
		<div className="noteapp">
			<NoteLists
				notes={notes}
				onAddNoteToggle={handleAddNoteToggle}
				onSelection={handleNoteSelection}
				noteSelected={noteSelected}
			/>
			{showAddNote && (
				<NoteContentAdd onAddNote={handleAddNote} onShow={showAddNote} />
			)}
		</div>
	);
}

function NoteLists({ notes, onAddNoteToggle, onSelection, noteSelected }) {
	return (
		<div className="notelists">
			<input type="text" placeholder="Search notes" />
			<button className="button" onClick={() => onAddNoteToggle()}>
				Add notes
			</button>
			<ul>
				{notes.map((note) => (
					<Note
						note={note}
						onSelection={onSelection}
						noteSelected={noteSelected}
						key={note.id}
					/>
				))}
			</ul>
		</div>
	);
}

function Note({ note, onSelection, noteSelected }) {
	const isSelected = noteSelected?.id === note.id;
	// console.log(isSelected);
	return (
		<div className={isSelected ? "selected" : ""}>
			<li onClick={() => onSelection(note)}>{note.title}</li>
			<span>{note.content.slice(0, 10)}...</span>
		</div>
	);
}

function NoteContentAdd({ onAddNote }) {
	const [noteTitle, setNoteTitle] = useState("");
	const [noteText, setNoteText] = useState("");

	function handleSubmit(e) {
		e.preventDefault();

		const newNote = {
			id: crypto.randomUUID(),
			title: noteTitle,
			content: noteText,
			category: "jobs",
		};

		console.log(newNote);

		onAddNote(newNote);

		setNoteTitle("");
		setNoteText("");
	}

	return (
		<div className="note-content">
			{/* <h3>Title</h3> */}
			<form className="form-add" onSubmit={handleSubmit}>
				<input
					className="title"
					type="text"
					placeholder="note title"
					value={noteTitle}
					onChange={(e) => setNoteTitle(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Start writing your note ..."
					value={noteText}
					onChange={(e) => setNoteText(e.target.value)}
				/>
				<button className="button">Add</button>
			</form>
		</div>
	);
}
