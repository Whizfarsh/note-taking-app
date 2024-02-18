import "./index.css";
import { NoteApp } from "./NoteApp";

export const initialNotes = [
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
