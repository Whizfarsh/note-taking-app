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
		const searchedNote = notes.filter((note) =>
			// note.title.toLowerCase().includes(searchNote.toLowerCase()) ||
			note.content.toLowerCase().includes(searchNote.toLowerCase())
		);
		// setNotes(searchedNote);
		console.log(searchedNote);
		// console.log(searchedNote.length);
		// searchedNote ? setNotes(searchedNote) : setNotes(initialNotes);
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

function NoteLists({
	notes,
	onAddNoteToggle,
	onSelection,
	noteSelected,
	onDelete,
	onEdit,
	searchNote,
	onSetSearch,
	onSearch,
}) {
	// onSearch();
	return (
		<div className="notelists">
			<input
				type="text"
				placeholder="Search notes"
				value={searchNote}
				onChange={(e) => {
					const textSearched = e.target.value;
					onSetSearch(textSearched);
					console.log(textSearched);
					onSearch(textSearched);
				}}
			/>
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
				<span
					style={{
						// backgroundColor: "#6B96FF",
						display: "inline-block",
						padding: "0.4rem 0",
						fontWeight: "700",
						// width: "8.4rem",
					}}
				>
					{note.category}
				</span>

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

function NoteContentAdd({ onAddNote, notes }) {
	const [noteTitle, setNoteTitle] = useState("");
	const [noteText, setNoteText] = useState("");
	// const [addCategory, setAddCategory] = useState([]);
	const [categories, setCategories] = useState(["general"]);
	const [showAddcategory, setShowAddCategory] = useState(false);

	function handleSubmit(e) {
		e.preventDefault();

		const newNote = {
			id: crypto.randomUUID(),
			title: noteTitle,
			content: noteText,
			// category: "jobs",
		};

		// console.log(newNote);

		onAddNote(newNote);

		setNoteTitle("");
		setNoteText("");
	}

	function handleAddCategory(category) {
		if (category === "") return;
		setCategories((categories) => [...categories, category]);
		// console.log(categories);
	}

	// category selection
	const [categorySelection, setCategorySelection] = useState("");

	// function handleCategorySelection(){
	// 	setCategorySelection()
	// }
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
				<select
					style={{ textTransform: "capitalize" }}
					value={categorySelection}
					onChange={(e) => {
						const selectCatValue = e.target.value;
						console.log(selectCatValue);
						setCategorySelection(selectCatValue);
						if (selectCatValue === "addcategory") {
							setShowAddCategory(true);
						} else {
							setShowAddCategory(false);
						}
					}}
				>
					{categories.map((category) => (
						<Category category={category} />
					))}
					<option value="addcategory">Add category</option>;{/* <Category /> */}
				</select>
				{showAddcategory && (
					<AddCategory
						onAddCategory={handleAddCategory}
						categories={categories}
						// showAddcategory={showAddcategory}
					/>
				)}
				<input
					className="content"
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
function AddCategory({ onAddCategory, categories }) {
	const [addCategory, setAddCategory] = useState("");

	function handleCategory(e) {
		e.preventDefault();

		const category = addCategory;
		onAddCategory(category);

		console.log(categories);
		setAddCategory("");
	}
	return (
		<>
			<input
				type="text"
				name=""
				id=""
				value={addCategory}
				onChange={(e) => setAddCategory(e.target.value)}
			/>
			<button onClick={handleCategory}>add</button>
		</>
	);
}
function Category({ category }) {
	return (
		<>
			<option value={category}>{category}</option>;
			{/* <option value="addCategory">Add category</option>; */}
		</>
	);
}

function NoteOption({ note, onUpdate }) {
	const [newTitle, setNewTitle] = useState(note.title);
	const [newContent, setNewContent] = useState(note.content);

	function handleUpdate(e) {
		e.preventDefault();

		onUpdate(newTitle, newContent);
	}
	return (
		<div>
			<form className="form-add" onSubmit={handleUpdate}>
				<input
					className="title"
					type="text"
					placeholder={note?.title}
					value={newTitle}
					onChange={(e) => setNewTitle(e.target.value)}
				/>
				<input
					type="text"
					placeholder={note?.content}
					value={newContent}
					onChange={(e) => setNewContent(e.target.value)}
				/>
				<button className="button">Update</button>
			</form>
		</div>
	);
}
