import { useState } from "react";

export function AddCategory({ onAddCategory, categories }) {
	const [addCategory, setAddCategory] = useState("");

	function handleCategory(e) {
		e.preventDefault();

		const category = addCategory;
		onAddCategory(category);

		// console.log(categories);
		setAddCategory("");
	}
	return (
		<>
			<input
				className="cat-input"
				type="text"
				name=""
				id=""
				value={addCategory}
				onChange={(e) => setAddCategory(e.target.value)}
			/>
			<button className="btn-min" onClick={handleCategory}>
				add category
			</button>
		</>
	);
}
