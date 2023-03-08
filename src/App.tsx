
import Sidebar from './components/Sidebar/Sidebar'
import Main from './components/Main/Main'
import { useEffect, useLayoutEffect, useState } from 'react'
import uuid from 'react-uuid'
import styles from './App.css'

interface Note {
  id: string;
  title: string;
  body: string;
  lastModified: number;
}

export default function Home() {
  // @ts-ignore
  const [notes, setNotes] = useState(
    localStorage.notes ? JSON.parse(localStorage.notes) : []
  )
  const [activeNote, setActiveNote] = useState<boolean|any>(false)
    const onAddNote = () => {
        const newNote:Note = {
      id: uuid(),
      title: "Untitled Note",
      body: "",
      lastModified: Date.now(),
    };

    setNotes([newNote, ...notes]);
    setActiveNote(newNote.id);
    }
  
  const onDeleteNote = (id: string) => {
    // @ts-ignore
    setNotes(notes.filter((note) => note.id !== id))
    console.log(id)
  }

  const getActiveNote = () => {
    // @ts-ignore
    return notes.find(({ id }) => id === activeNote);
  }

  const onUpdateNote = (updatedNote: Note) => {
    // @ts-ignore
    const updatedNotesArray = notes.map((note) => {
      // @ts-ignore
      if (note.id === updatedNote.id) {
        return updatedNote
      }
      return note
    })
    setNotes(updatedNotesArray)
  }

   useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const isMobile = () => {
    return window.innerWidth <= 800;
  };

  if (isMobile()) {
    return (
      <div className="
      flex flex-col items-center justify-center h-screen
      ">
        <p className="text-2xl font-bold">Note App</p>
        <p className="text-sm px-3">

          This app works best on a desktop or laptop. Please open it on a larger screen.
        </p>
      </div>
    );
  }


  return (
    <>


      <div className='flex flex-row'>
      <section>
          <Sidebar
            notes={notes}
            onAddNote={onAddNote}
            onDeleteNote={onDeleteNote}
            activeNote={activeNote}
            setActiveNote={setActiveNote}
          />
      </section>
      <main>
          <Main
            activeNote={getActiveNote()}
            onUpdateNote={onUpdateNote}
          />
        </main>
      </div>
      
    </>
  )
}
