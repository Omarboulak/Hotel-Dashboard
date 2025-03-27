import React, { useEffect, useState } from "react";
import Table from "../components/Table/Table";
import { Info, Image, Details, ID, RoomNumber, Status } from './roomStyled';

export const Room = () => {
    const [room, setRoom] = useState([]);

    useEffect(() => {
        fetch('../../RoomList.json')
            .then((response) => response.json())
            .then((data) => setRoom(data))
            .catch((error) => console.error("Error cargando datos:", error));
    }, []);

    const columns = [
        { header: 'Photo', accessor: 'Photo' },
        { header: 'Bed Type', accessor: 'Bed Type' },
        { header: 'Facilities', accessor: 'Facilities' },
        { header: 'Rate', accessor: 'Rate' },
        { header: 'Offer Price', accessor: 'Offer Price' },
        { header: 'Status', accessor: 'Status' },
    ];

    return (
        <div>
            <Table
                columns={columns}
                data={room}
                renderCell={(col, row) => {
                    if (col.accessor === 'Customer') {
                        return (
                            <Info>
                                <Image src={row[col.accessor]} alt="Room" />
                                <Details>
                                    <ID>{row['Room ID']}</ID>
                                    <RoomNumber>{row['Room number']}</RoomNumber>
                                </Details>
                            </Info>
                        );
                    }
                    if (col.accessor === 'Status') {
                        return <Status status={row[col.accessor]}>{row[col.accessor]}</Status>;
                    }
                    return row[col.accessor];
                }}
            />
        </div>
    );
}
