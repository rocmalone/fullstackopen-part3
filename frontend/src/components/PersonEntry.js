const PersonEntry = ({ person, deletePerson }) => {
    return (
        <li>
            {person.name} {person.number}
            <button onClick={deletePerson}>delete</button>
        </li>
    )
}

export default PersonEntry