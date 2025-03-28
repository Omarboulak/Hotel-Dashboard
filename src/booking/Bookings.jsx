import React, { useEffect, useState } from "react";
import Table from "../components/Table/Table";
import { useLocation } from "react-router-dom";
import { BookingUser, RoomId, ButtonModal, StatusBooking } from "./bookingStyled";
import { Modal } from "./components/modal";
import { Filter } from "../components/filter/Filter";

export const Bookings = () => {
    const [booking, setBooking] = useState([]);
    const [filteredBooking, setFilteredBooking] = useState([]);
    const [open, setopen] = useState(false);
    const [activeFilter, setActiveFilter] = useState("All");

    useEffect(() => {
        fetch('../../Booking.json')
            .then((response) => response.json())
            .then((data) => setBooking(data))
            .catch((error) => console.error("Error cargando datos:", error));
    }, []);

    const columns = [
        { header: 'Guest', accessor: 'Guest' },
        { header: 'Order Date', accessor: 'Order Date' },
        { header: 'Check in', accessor: 'Check in' },
        { header: 'Special Request', accessor: 'Special Request' },
        { header: 'Room Type', accessor: 'Room Type' },
        { header: 'Status', accessor: 'Status' },
    ];



    const openPopup = (bookingId) => {
        setopen(bookingId);
    };

    const closePopup = () => {
        setopen(false);
    };

    const selectedBooking = booking.find(item => item.ID === open);

    const handleFilter = (status) => {
        if (status === 'All') {
            setFilteredBooking(booking);
        } else {
            const filtered = booking.filter(cell => cell.Status === status);
            setFilteredBooking(filtered)
        }
    }

    const menuOptions = [
        { value: "All", label: "All" },
        { value: "Check In", label: "Check In" },
        { value: "Check Out", label: "Check Out" },
        { value: "In Progress", label: "In Progress" },
    ];

    return (
        <div>
            <Filter
                options={menuOptions}
                selected={activeFilter}
                onSelect={handleFilter} />
            <Table
                columns={columns}
                data={filteredBooking}
                renderCell={(col, row) => {
                    if (col.accessor === 'Guest') {
                        return (
                            <BookingUser>
                                <span>{row['First_Name']}</span>
                                <span>{row['Last_Name']}</span>
                                <RoomId>{row['ID']}</RoomId>
                            </BookingUser>
                        );
                    }
                    if (col.accessor === 'Special Request') {
                        return (
                            <ButtonModal onClick={() => openPopup(row.ID)}>View Notes</ButtonModal>
                        )
                    }
                    if (col.accessor === 'Status') {
                        return <StatusBooking status={row[col.accessor]}>{row[col.accessor]}</StatusBooking>;
                    }
                    if (col.accessor === 'Room Type') {
                        return <p>{row['Room Type']} - {row['Room Number']}</p>;
                    }
                    return row[col.accessor];
                }}
            />
            {selectedBooking && (
                <Modal
                    closeModal={closePopup}
                    request={selectedBooking['Special Request']}
                />
            )}
        </div>
    );
}


