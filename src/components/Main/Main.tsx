import React from 'react'
interface Note {
  id: string;
  title: string;
  body: string;
  lastModified: number;
}

interface MainProps {
  activeNote: any;
  onUpdateNote: (updatedNote: any) => Note | void;
}

export default function Main({
  activeNote,
  onUpdateNote,
}: MainProps) {
  
  const onEditField = (key: string, value: string) => {
    onUpdateNote({
       ...activeNote,
      [key]: value,
      lastModified: Date.now(),
    })
  }

  if (!activeNote) return <div className='no-active-note text-3xl text-gray-400 font-bold text-center mt-56 ml-96
  '>No note selected</div>

  return (
      <div className='app-main w-full h-full ml-10 mt-10'> 
          <div className='app-main-note-edit'>
              <input type="text" className='w-full h-auto 
               text-3xl font-bold border-b-2 outline-none' placeholder='Note Title'
          value={activeNote?.title}
          onChange={(e)=>{onEditField('title', e.target.value)}}
          autoFocus />
        <textarea className='w-full h-auto outline-none'
          placeholder='Note Content'
          value={activeNote?.body}
          onChange={(e)=>{onEditField('body', e.target.value)}}
        />
          </div>
     

    </div>
  )
}
