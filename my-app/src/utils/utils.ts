import { Note } from "../components/MyNotes/Note/NoteItem";

const NOTES_KEY = 'notes';

export const saveNotes = (notes: Note[]) => {
	localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
};

export const loadNotes = (): Note[] => {
	const data = localStorage.getItem(NOTES_KEY);
	return data ? JSON.parse(data) : [];
};