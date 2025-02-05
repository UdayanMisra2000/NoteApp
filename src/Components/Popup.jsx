import React from 'react'
import './Popup.css'

function Popup({isPopupOpen, createNewGroup, groupName, setGroupName, setGroupColor, colors}) {
    if(!isPopupOpen) return null;
  return (
    <div className="popup-overlay">
    <div className='popup'>
        <h3>Create New Group</h3>
        <input type="text" placeholder="Group Name" value={groupName} onChange={(e)=>setGroupName(e.target.value)} />
        <div className="color-picker">
            {
                colors.map(color => (
                    <div key={color} style={{backgroundColor: color, width: '1rem', height: '1rem', borderRadius: '50%', cursor: 'pointer'}} onClick={()=>setGroupColor(color)}></div>
                ))
            }
        </div>
        <button className='create-btn' onClick={createNewGroup}>Create</button>
    </div>
    </div>
  )
}

export default Popup