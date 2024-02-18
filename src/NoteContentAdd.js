import { useState } from "react";
import { Category } from "./Category";
import { AddCategory } from "./AddCategory";

export function NoteContentAdd({ onAddNote, notes }) {
	const [noteTitle, setNoteTitle] = useState("");
	const [noteText, setNoteText] = useState("");
	// const [addCategory, setAddCategory] = useState([]);
	const [categories, setCategories] = useState(["general"]);
	const [showAddcategory, setShowAddCategory] = useState(false);

	// category selection
	const [categorySelection, setCategorySelection] = useState("General");

	function handleSubmit(e) {
		e.preventDefault();

		const newNote = {
			id: crypto.randomUUID(),
			title: noteTitle,
			content: noteText,
			category: categorySelection,
		};

		onAddNote(newNote);

		setNoteTitle("");
		setNoteText("");
		setCategorySelection("General");
	}

	function handleAddCategory(category) {
		if (category === "") return;
		setCategories((categories) => [...categories, category]);
		setCategorySelection(category);
		setShowAddCategory(false);
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
				<select
					className="category"
					style={{ textTransform: "capitalize" }}
					value={categorySelection}
					onChange={(e) => {
						const selectCatValue = e.target.value;
						console.log(selectCatValue);
						if (selectCatValue === "addcategory") {
							setCategorySelection(selectCatValue);
							setShowAddCategory(true);
						} else {
							setCategorySelection(selectCatValue);
							setShowAddCategory(false);
						}
					}}
				>
					{categories.map((category) => (
						<Category category={category} key={category} />
					))}
					<option value="addcategory">Add category</option>;
				</select>
				{showAddcategory && (
					<AddCategory
						onAddCategory={handleAddCategory}
						categories={categories}
					/>
				)}
				<input
					className="content"
					type="text"
					placeholder="Start writing your note ..."
					value={noteText}
					onChange={(e) => setNoteText(e.target.value)}
				/>
				<button className="button">Add note</button>
			</form>
		</div>
	);
}
