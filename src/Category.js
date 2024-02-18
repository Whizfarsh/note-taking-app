export function Category({ category }) {
	return (
		<>
			<option value={category}>{category}</option>;
			{/* <option value="addCategory">Add category</option>; */}
		</>
	);
}
