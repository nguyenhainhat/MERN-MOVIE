import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getCommentUser, getUser } from '../../api/constants';
import TableHome from '../../components/TablePagination/TablePagination';
import "./user.scss"
import Button from "../../components/button/Button"

function User(props) {
    const [user, setUser] = useState([])
    const [valueUser, setValueUser] = useState("")
    const [storeUser, setStoreUser] = useState([])
    useEffect(() => {
        const getDetailUser = async() => {
            const res = await getUser()
            setUser(res.data);
            setStoreUser(res.data)
        }
        getDetailUser()
    },[])

    const handleSearch = () => {
        if(valueUser !== "") {
            const filterUser = user.filter(item => {
                return item.username === valueUser.trim()
            })
            setUser(filterUser)
            setTimeout(() => {
                setValueUser("")
            },2000)
        }else {
            setUser(storeUser)
        }
    }

    return (
        <div className='user' style={{width: "100%"}}>
            <h1>User</h1>
            <div>
                <input type='text' placeholder='Search name' value={valueUser} onChange={(e) => setValueUser(e.target.value)} />
                <Button onClick={handleSearch}>Search</Button>
            </div>
            <TableHome item={user} type="user" />
        </div>
    );
}

export default User;