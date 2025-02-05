import React from 'react';
import { NavLink } from 'react-router-dom';
import Popup from './Popup';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import myContext from '../MyContext'

const Navbar = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [groups, setGroups] = useState([]);
    const [newGroupName, setNewGroupName] = useState('');
    const [newGroupColor, setNewGroupColor] = useState('');
    const { isHidden ,setIsHidden} = useContext(myContext);
    

    const colors = ["rgb(179, 139, 250)", "rgb(255, 121, 242)", "rgb(67, 230, 252)", "rgb(241, 149, 118)", "rgb(0, 71, 255)", "rgb(204, 204, 204)"];

    useEffect(() => {
        const groups = JSON.parse(localStorage.getItem('groups'));
        if(groups){
            setGroups(groups);
        }
    },[]);

    function handleCreateGroup(){
        setIsPopupOpen(false);
        if(newGroupName.trim() && !groups.some(group => group.name === newGroupName)){
            const timestamp = new Date().getTime();
            const updatedGroups = [...groups,{id: timestamp, name: newGroupName, color: newGroupColor || colors[Math.floor(Math.random() * colors.length)]}];
            setGroups(updatedGroups);
            setNewGroupName('');
            setNewGroupColor('');
            localStorage.setItem('groups', JSON.stringify(updatedGroups));
        } 
        else {
            alert('Group name already exists or is empty');
        }
    }

    const getGroupInitials = (name) => {
        if (!name) return '';
        const words = name.trim().split(/\s+/);
        return words.length === 1
            ? words[0].charAt(0).toUpperCase()
            : words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase();
      };
    return (
        <div className="navbar" id={isHidden ? 'hidden' : ''}>
            <h2 style={{ margin:'1rem' }}>Pocket Notes</h2>
            <button className='addGroup' onClick={()=>setIsPopupOpen(true)} >+</button>
            <ul>
                {
                    groups.map(group =>(
                        <li key={group.id} style={{ listStyle: "none", padding: "0.5rem 0", fontSize: "1.5rem" }}>
                            <NavLink to={`/${group.name}/${group.color}`} className="group-link" style={{ display: "flex", alignItems: "center" }} onClick={()=>setIsHidden(true)}>
                            <div style={{
                                    width: "3rem",
                                    height: "3rem",
                                    backgroundColor: group.color,
                                    borderRadius: "50%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    fontWeight: "bold",
                                    marginRight: "0.5rem",
                                    color: "white"
                                }}>
                            {getGroupInitials(group.name)}
                            </div>
                                <span style={{color:'black'}}>{group.name}</span>
                            </NavLink>
                        </li>
                    ))
                }
            </ul>
            <Popup
                isPopupOpen = {isPopupOpen}
                createNewGroup = {handleCreateGroup}
                groupName = {newGroupName}
                setGroupName = {setNewGroupName}
                setGroupColor = {setNewGroupColor}
                colors = {colors}
            />
        </div>
    );
};

export default Navbar;