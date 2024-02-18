import { useState } from "react";

export function NoteOption({ note, onUpdate }) {
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
					className="content"
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
