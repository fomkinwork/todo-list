import React, { ChangeEvent, FC, useState } from "react";
import "./NoteItem.scss"


export type Note = {
	text: string;
	isCompleted: boolean;
	id: number;
	tags: string[];
}

interface INoteItem {
	noteItem : Note,
	onDeleteTodo: (id: number) => void;
	onEditTodo: (id: number, text: string) => void;
	onToggleCompleted: (id: number) => void;
	filterByTag: (tag: string) => void;
}

const NoteItem: FC <INoteItem> = ({noteItem, onDeleteTodo, onEditTodo, onToggleCompleted, filterByTag}) => {

	const [isEditing, setIsEditing] = useState(false);
	const [text, setText] = useState(noteItem.text);

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleSaveClick = () => {
		setIsEditing(false);
		onEditTodo(noteItem.id, text);
	};

	const handleCancelClick = () => {
		setIsEditing(false);
		setText(noteItem.text);
	};
	
	const handleSetText = (e: ChangeEvent<HTMLInputElement>) => {
		setText(e.target.value)
	}

	const handleFilterByTag = (tag: string) => {
		filterByTag && filterByTag(tag);
	};

	return (
		<li className={"NoteItem"}>
			<input
				type="checkbox"
				checked={noteItem.isCompleted}
				onChange={() => onToggleCompleted(noteItem.id)}
			/>
			{isEditing ?
				<>
					<input type="text" value={text} onChange={handleSetText} />
					<button onClick={handleSaveClick}>Save</button>
					<button onClick={handleCancelClick}>Cancel</button>
				</>
				:
				<>
					<span>{noteItem.text}</span>
					<div className="tags">
						{noteItem.tags.map((tag) => (
							<span key={tag} onClick={() => handleFilterByTag(tag)}>#{tag}</span>
						))}
					</div>
					<button onClick={handleEditClick}>Edit</button>
					<button onClick={() => onDeleteTodo(noteItem.id)}>Delete</button>
				</>}
		</li>
	);
};

export default NoteItem;
