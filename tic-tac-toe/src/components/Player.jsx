import { useState } from 'react';

export default function Player({initialName, symbol, isActive, onChangeName}) {
  const [ isEditing, setIsEditing ] = useState(false);
  const [ playerName, setPlayerName ] = useState(initialName);

  let editablePlayerName = <span className='player-name'>{playerName}</span>; 

  if(isEditing) {
    editablePlayerName = (
      <input className='player-name' type='text' required value={playerName} onChange={handleChange}/>)
    ;
  }

  function editButton() {
    setIsEditing(editing => !editing);
    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }

  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  return <>
    <li className={isActive ? 'active' : undefined}>
      <span className='player'>
        {editablePlayerName}
        <span className='player-symbol'>{symbol}</span>
      </span>
      <button onClick={editButton}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
  </>
}