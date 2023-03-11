import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note.js'
import Notification from './components/Notification.js'
import Footer from './components/Footer.js'

// Import backend note handling
import noteService from './services/notes'

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [notificationMessage, setNotificationMessage] = useState(null)


  // LOAD INITIAL NOTES FROM db.json FILE ON SERVER
  // Effects occur once at the end of initial rendering
  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])


  // FUNC:  TOGGLE IMPORTANCE OF A NOTE.
  // Passed to the <Note> component.
  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    // Create a new object from the original note and overwrite the 
    // 'important' property by assigning it again.
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
        console.debug(`Importance of ${id} is toggled`)
      })
      .catch(error => {
        setNotificationMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
    }


  // FUNC:  ADD NOTE ON CLICK 'save' BUTTON
  const addNote = (event) => {
    event.preventDefault()

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5
      // id: notes.length + 1,
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
    // HTTP POST NEW NOTE INTO db.json
    axios
      .post('http://localhost:3001/notes', noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }


  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }


  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)


  return (
    <div>
      <h1>Notes</h1>
      <Notification message={notificationMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note 
            key={note.id} 
            note={note} 
            toggleImportance={() => toggleImportanceOf(note.id)}
          
          />
        )}
      </ul>
      <form onSubmit={addNote}> 
        <input 
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App