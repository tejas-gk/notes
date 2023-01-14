import {useState} from 'react'

interface FolderProps {
    explorer: any;
    handleInsertNode: (folderId: number, item: any, isFolder: boolean) => void;
}

type ShowInput = {
    isVisible: boolean;
    isFolder: any
}


export default function Folder({
    explorer,
    handleInsertNode
}: FolderProps) {
    const [expand, setExpand] = useState<boolean>(false)
    const [showInput, setShowInput] = useState<ShowInput>({
        isVisible: false,
        isFolder: null,
    })

    const handleAddNewFile = (e: any,isFolder:boolean) => {
        e.stopPropagation()
        setExpand(true)
        setShowInput({
            isVisible: true,
            isFolder
        })
    }

    const onAddFolder = (e: any) => {
        if(e.keyCode==13 && e.target.value){
            handleInsertNode(explorer.id, e.target.value, showInput.isFolder)
            setShowInput({ ...showInput, isVisible: false })
            
        }
    }

 if(explorer.isFolder)
  return (
      <div>
          <div className='mt-2'>
              <div className='flex flex-row'
                  onClick={() => {
                      setExpand(!expand)
                  }}
                 
              >
                  <span className='text-white'>
                      📁 {explorer.name}
                  </span>
                  <div>
                      <div className='flex flex-row ml-10 text-white'>
                        <button onClick={(e) => handleAddNewFile(e, true)}>Folder +</button>
                          <button onClick={(e) => handleAddNewFile(e, false)}>File +</button>
                      </div>
                      
          </div>
        </div>
                    
              </div>
                  
          <div className='ml-10 '>
              <div className={`flex flex-col ${expand ? 'block' : 'hidden'}`}>
          {showInput.isVisible && (
            <div className="inputContainer">
           <span>{showInput.isFolder? "📁" : "📄"}</span> 
           <input
              type="text"
              className="inputContainer__input" 
              autoFocus
              onKeyDown={onAddFolder}
                              onBlur={() => setShowInput({ ...showInput, isVisible: false })}
                              placeholder={showInput.isFolder ? "Folder Name" : "File Name"}
              />
              </div>
          )}

          {explorer.items.map((child:any) => {
            return (
              <Folder
                handleInsertNode={handleInsertNode}
                key={child.id}
                explorer={child}
              />
            );
          })}
              </div>
          </div>
          
          </div>
  )
  else return (
      <div>
          <div className='mt-2'>
              <div className='flex flex-row'>
                  <span className='text-white'>
                      📄 {explorer.name}
                      </span>
              </div>
          </div>
    </div>
    )
    
}
