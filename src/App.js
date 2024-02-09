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
	const [showUpdateNote, setShowNoteUpdate] = useState(false);

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
			/>
			{showAddNote && (
				<NoteContentAdd onAddNote={handleAddNote} onShow={showAddNote} />
			)}
			{showUpdateNote && <NoteOption note={noteSelected} />}
		</div>
	);
}

function NoteLists({
	notes,
	onAddNoteToggle,
	onSelection,
	noteSelected,
	onDelete,
	onEdit,
}) {
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
						onDelete={onDelete}
						onEdit={onEdit}
						key={note.id}
					/>
				))}
			</ul>
		</div>
	);
}

function Note({ note, onSelection, noteSelected, onDelete, onEdit }) {
	const isSelected = noteSelected?.id === note.id;
	return (
		<>
			<li
				className={isSelected ? "selected" : ""}
				onClick={() => onSelection(note)}
			>
				{note.title}
				<span>{note.content.slice(0, 10)}...</span>
				{isSelected && (
					<div className="note-option">
						<p onClick={() => onEdit(note.id)}>Edit</p>
						<p onClick={() => onDelete(note.id)}>Delete</p>
					</div>
				)}
			</li>
		</>
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

function NoteOption({ note }) {
	return (
		<div>
			<form className="form-add">
				<input
					className="title"
					type="text"
					placeholder={note?.title}
					value={note?.title}
				/>
				<input type="text" placeholder={note?.content} value={note?.content} />
				<button className="button">Update</button>
			</form>
		</div>
	);
}
