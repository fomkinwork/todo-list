import React, { FC, useEffect, useState } from "react";
import { loadNotes, saveNotes } from "../../utils/utils";
import NoteItem, { Note } from "./Note/NoteItem";
import "./NotesList.scss"


const NotesList:FC = () => {
	
	const [notes, setNotes] = useState<Note[]>([]);
	const [filterTag, setFilterTag] = useState<string>('');
	const [tags, setTags] = useState<string[]>([]);

	useEffect(() => {
		const data = loadNotes();
		setNotes(data);

		//Получаем теги из заметок
		let tags: string[] = [];
		data.map(note => {
			note.tags.map(tag => {tags.push(parseTags(tag).toString())
			})
		})

		//Фильтруем повторения тегов
		const uniqueTags = tags.filter(function(item, pos) {
			return tags.indexOf(item) == pos;
		})
		setTags(uniqueTags);
	}, []);


	//Сохраняем заметки в локалсторэдж
	useEffect( () => {
		setTimeout(() => saveNotes(notes), 100);
	}, [notes]);

	const handleAddNote = (text: string) => {
		const newNote = {
			id: notes.length + 1,
			text: text,
			isCompleted: false,
			tags: parseTags(text),
		};
		setNotes([...notes, newNote]);
		newNote.tags.map(tag => !tags.includes(tag) && tags.push(tag))
	};
	
	const handleDeleteNote = (id: number) => {
		const newNotes = notes.filter((todo) => todo.id !== id);
		setNotes(newNotes);
	};

	const handleEditNotes = (id: number, text: string) => {
		const newNotes = notes.map((note) => {
			if (note.id === id) {
				return { ...note, text, tags: parseTags(text) };
			}
			return note;
		});
		setNotes(newNotes);
	};

	const handleToggleCompleted = (id: number) => {
		const newNotes = notes.map((note) => {
			return note.id === id ? { ...note, isCompleted: !note.isCompleted } : note;
		});
		setNotes(newNotes);
	};

	const handleFilterByTag = (tag: string) => {
		setFilterTag(tag);
	};

	const parseTags = (text: string) => {
		const tagsRegex = /#[a-zа-я0-9]+/gi;
		const tags = text.match(tagsRegex);
		return tags || [];
	};

	const handleDeleteTag = (index: number) => {
		const newTags = [...tags]
		newTags.splice(index, 1)
		setTags(newTags);
	}

	const resetFilter = () => {
		setFilterTag('');
	};

	const filteredTodos = filterTag ? notes.filter((note) => note.tags.includes(filterTag)) : notes;
	
	return (
		<div className={"notesList"}>
			<h1>Notes List</h1>
			<input type="text" placeholder="Add Todo" onKeyPress={(e) => {
				if (e.key === 'Enter') {
					e.currentTarget.value.length  && handleAddNote(e.currentTarget.value);
					e.currentTarget.value = '';
				}
			}}
			/>
			<button onClick={resetFilter}>Clear filter</button>
			<ul className={"tagsList"}>
				{
					tags.map((tag, index) =>
						<li>
							{tag}
							<button onClick={() => handleDeleteTag(index)}>
								x
							</button>
						</li>)
				}
			</ul>
			<ul>
				{filteredTodos.map((note) => (
					<NoteItem
						key={note.id}
						noteItem={note}
						onDeleteTodo={handleDeleteNote}
						onEditTodo={handleEditNotes}
						onToggleCompleted={handleToggleCompleted}
						filterByTag={handleFilterByTag}
					/>
				))}
			</ul>
		</div>
	);
};

export default NotesList;
