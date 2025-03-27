import React, { useEffect, useState } from "react";
import Table from "../components/Table/Table";
import { Info, Image, Details} from '../room/roomStyled';
import { FullName, ID, UserJoin, Status, Contact } from "./usersStyled";
import phone from '../assets/phone.svg'

export const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('../../users.json')
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error("Error cargando datos:", error));
    }, []);

    const columns = [
        { header: 'Name', accessor: 'Name' },
        { header: 'Email', accessor: 'Email' },
        { header: 'Job Desk', accessor: 'Job Description' },
        { header: 'Contact', accessor: 'Contact' },
        { header: 'Status', accessor: 'Status' },
    ];

    return (
        <div>
            <Table
                columns={columns}
                data={users}
                renderCell={(col, row) => {
                    if (col.accessor === 'Name') {
                        return (
                            <Info>
                                <Image src={row['Photo']} alt="Room" />
                                <Details>
                                    <FullName>{row['Full Name']}</FullName>
                                    <ID>{row['ID']}</ID>
                                    <UserJoin>{row['Start Date']}</UserJoin>
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
