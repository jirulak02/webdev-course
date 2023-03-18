import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
	const [notes, setNotes] = useState([]);

	function addNote(input) {
		setNotes((prevNotes) => {
			return [...prevNotes, input];
		});
	}

	function deleteNote(id) {
		setNotes((prevNotes) => {
			return prevNotes.filter((note, index) => {
				return index !== id;
			});
		});
	}

	return (
		<div>
			<Header />
			<CreateArea add={addNote} />
				{notes.map((note, index) => {
					return (
						<Note
							key={index}
							id={index}
							title={note.title}
							content={note.content}
							delete={deleteNote}
						/>
					);
				})}
			<Footer />
		</div>
	);
}

export default App;
