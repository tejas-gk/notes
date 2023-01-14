
import Sidebar from './components/Sidebar/Sidebar'
import Main from './components/Main/Main'
import { useEffect, useState } from 'react'
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
    setNotes(notes.filter((note) => note.id !== id))
    console.log(id)
  }

  const getActiveNote = () => {
    // @ts-ignore
    return notes.find(({ id }) => id === activeNote);
  }

  const onUpdateNote = (updatedNote: Note) => {
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
      <main className={styles.main}>
          <Main
            activeNote={getActiveNote()}
            onUpdateNote={onUpdateNote}
          />
        </main>
      </div>
      
    </>
  )
}
