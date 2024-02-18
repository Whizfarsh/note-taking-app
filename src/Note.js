export function Note({ note, onSelection, noteSelected, onDelete, onEdit }) {
	const isSelected = noteSelected?.id === note.id;
	return (
		<>
			<li
				className={isSelected ? "selected" : ""}
				onClick={() => onSelection(note)}
			>
				<span className="note-category">{note.category}</span>

				{note.title}
				<span className="note-info">{note.content.slice(0, 10)}...</span>
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
