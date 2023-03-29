const PersonForm = ({nameValue, handleNameChange, numberValue, handleNumberChange, handleAddName}) => {
    return (
    <form>
        <div>
        name: <input 
            value={nameValue}
            onChange={handleNameChange}
        />
        </div>
        <div>
        number: <input 
            value={numberValue}
            onChange={handleNumberChange}
        />
        </div>
        <div>
        <button type="submit" onClick={handleAddName}>add</button>
        </div>
    </form>
    )
}


export default PersonForm