import explorer from '../../data/folderData';
import { useState } from 'react';
import Folder from './Folder/Folder';
import useTraverseTree from '../../hooks/useTraverseTree';
interface SidebarProps {
    notes: any;
    onAddNote: () => void;
    onDeleteNote: (id: number | any) => void;
    activeNote: boolean;
    setActiveNote: (activeNote: boolean) => void;
}

export default function Sidebar({
    notes,
    onAddNote,
    onDeleteNote,
    activeNote,
    setActiveNote
}: SidebarProps) {
    
    const [explorerData, setExplorerData] = useState(explorer)
   const sortedNotes = notes.sort((a:any, b:any) => b.lastModified - a.lastModified);

    const { insertNode } = useTraverseTree();


    const handleInsertNode = (folderId: number, item: any, isFolder: boolean) => {
        // @ts-ignore
        const finalTree = insertNode(explorerData, folderId, item, isFolder);
        // @ts-ignore
        setExplorerData(finalTree);
    }
    
  console.log(explorerData)
  return (
      <div>
        
          <div className="flex flex-col  w-64 h-screen bg-[#2c2c38]">
              <div className="sidebar-header flex flex-row items-center justify-between w-full h-20 bg-gray-900">
                  <h1 className="text-2xl font-bold text-white pl-5">Notes</h1>
                  <div className='text-white pr-10'>
                      <button
                          onClick={onAddNote}
                      >Add</button>
                  </div>
              </div>
              <div className='app-sidebar-notes h-[calc(100vh-78vh)]' >
                    {/* <Folder
                handleInsertNode={handleInsertNode}
                explorer={explorerData}
          /> */}
              {
                  sortedNotes?.map(({ id, title, body, lastModified }:any,key:number) => (
                      <div className={`sidebar-notes cursor-pointer p-4  hover:bg-black
                            ${
                          // @ts-ignore
                          id === activeNote && 'bg-black'}
                      `}
                          onClick={()=>{setActiveNote(id)}}
                          key={key}>
                      <div className='sidebar-note-title flex justify-between items-center'>
                              <h1 className='text-white font-semibold'>{title}</h1>
                              <button className='text-red-500 hover:text-red-600'
                                  onClick={()=>{onDeleteNote(id)}}
                              >delete</button>
                      </div>
                      <div className='note-preview flex flex-col'>
                              <small className='text-gray-400'>{
                                    body.length > 10 ? body.substr(0,10) + '...' : body
                          }</small>
                              <small className='text-gray-400 inline-block'>{
                                  new Date(lastModified).toLocaleDateString('en-US', {
                                      hour: 'numeric',
                                      minute: 'numeric'
                                  })
                                  
                              }</small>
                      </div>
                  </div>
                    ))
                    
                }
                </div>
          </div>
          
      </div>
  )
}
