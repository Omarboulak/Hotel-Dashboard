import React, { useEffect, useState } from "react";
import Table from "../components/Table/Table";
import { RoomInfo, RoomImage, RoomDetails, RoomId, RoomNumber, Status } from './roomStyled';

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
                            <RoomInfo>
                                <RoomImage src={row[col.accessor]} alt="Room" />
                                <RoomDetails>
                                    <RoomId>{row['Room ID']}</RoomId>
                                    <RoomNumber>{row['Room number']}</RoomNumber>
                                </RoomDetails>
                            </RoomInfo>
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
