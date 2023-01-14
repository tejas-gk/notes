import {
    createContext,useReducer
} from 'react';

const initialState = {
    notes: [],
    activeNote: false,
    onAddNote: () => { },
    onDeleteNote: () => { },
    onUpdateNote: () => { },
    getActiveNote: () => { },
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_NOTE':
            return {
                ...state,
                notes: [action.payload, ...state.notes],
                activeNote: action.payload.id
            }
        case 'DELETE_NOTE':
            return {
                ...state,
                notes: state.notes.filter((note) => note.id !== action.payload),
                activeNote: false
            }
        case 'SET_ACTIVE_NOTE':
            return {
                ...state,
                activeNote: action.payload
            }
        case 'UPDATE_NOTE':
            return {
                ...state,
                notes: state.notes.map((note) => {
                    if (note.id === action.payload.id) {
                        return action.payload
                    }
                    return note
                })
            }
        default:
            return state
    }
}

export const SidebarContext = createContext(initialState);

export const SidebarProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const onAddNote = () => {
        dispatch({
            type: 'ADD_NOTE',
            payload: {
                id: uuid(),
                title: "Untitled Note",
                body: "",
                lastModified: Date.now(),
            }
        })
    }

    const onDeleteNote = (id) => {
        dispatch({
            type: 'DELETE_NOTE',
            payload: id
        })
    }

    const onUpdateNote = (updatedNote) => {
        dispatch({
            type: 'UPDATE_NOTE',
            payload: updatedNote
        })
    }

    const getActiveNote = () => {
        return state.notes.find(({ id }) => id === state.activeNote);
    }

    const setActiveNote = (id) => {
        dispatch({
            type: 'SET_ACTIVE_NOTE',
            payload: id
        })
    }

    return (
        <SidebarContext.Provider value={{
            notes: state.notes,
            activeNote: state.activeNote,
            onAddNote,
            onDeleteNote,
            onUpdateNote,
            getActiveNote,
            setActiveNote
        }}>
            {children}
        </SidebarContext.Provider>
    )
}
