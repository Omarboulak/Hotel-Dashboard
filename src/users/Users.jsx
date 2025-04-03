import React, { useEffect, useState } from "react";
import Table from "../components/Table/Table";
import { Info, Image, Details } from '../room/roomStyled';
import { FullName, ID, UserJoin, Status, Contact } from "./usersStyled";
import phone from '../assets/phone.svg'
import { MenuTable, Add } from "../booking/bookingStyled";
import { Filter } from "../components/filter/Filter";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { newUsersFetch } from "./redux/userSlice";

export const Users = () => {
    const [active, setActive] = useState([])
    const [activeFilter, setActiveFilter] = useState("All");
    const users = useSelector((state) => state.users.users);
    const [filteredUsers, setfilteredUsers] = useState(users);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (users.length === 0) {
          dispatch(newUsersFetch());
        }
      }, [dispatch, users.length]);
      
      useEffect(() => {
        setfilteredUsers(users);
        console.log(users);
      }, [users]);

    const columns = [
        { header: 'Name', accessor: 'Name' },
        { header: 'Email', accessor: 'Email' },
        { header: 'Job Desk', accessor: 'JobDescription' },
        { header: 'Contact', accessor: 'Contact' },
        { header: 'Status', accessor: 'Status' },
    ];

    const handleFilter = (status) => {
        if (status === 'All') {
            setfilteredUsers(users);
        } else {
            const filtered = users.filter(cell => cell.Status === status);
            setfilteredUsers(filtered)
        }
    }
    const menuOptions = [
        { value: "All", label: "All" },
        { value: "ACTIVE", label: "ACTIVE" },
        { value: "INACTIVE", label: "INACTIVE" },

    ];

    const addUser = () => {
        navigate('/Users/NewUsers');
    };

    return (
        <div>
            <MenuTable>
                <Filter
                    options={menuOptions}
                    selected={activeFilter}
                    onSelect={handleFilter} />
                <Add onClick={addUser}>+ Add new</Add>
            </MenuTable>
            <Table
                columns={columns}
                data={users}
                renderCell={(col, row) => {
                    if (col.accessor === 'Name') {
                        return (
                            <Info>
                                <Image src={row['Photo']} alt="Room" />
                                <Details>
                                    <FullName>{row['FullName']}</FullName>
                                    <ID>{row['ID']}</ID>
                                    <UserJoin>{row['StartDate']}</UserJoin>
                                </Details>
                            </Info>
                        );
                    }
                    if (col.accessor === 'Status') {
                        return <Status status={row[col.accessor]}>{row[col.accessor]}</Status>;
                    }
                    if (col.accessor === 'Contact') {
                        return (
                            <Contact>
                                <img src={phone} alt="icono de un telefono" />
                                <span>{row['Contact']}</span>
                            </Contact>
                        )
                    }
                    return row[col.accessor];
                }}
            />
        </div>
    );
}
