import { Note } from "./Note";

export function NoteLists({
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
