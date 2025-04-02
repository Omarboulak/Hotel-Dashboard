import React, { useEffect, useState } from "react";
import Table from "../components/Table/Table";
import { useNavigate } from 'react-router-dom';
import { BookingUser, RoomId, ButtonModal, StatusBooking, MenuTable, AddBooking } from "./bookingStyled";
import { Modal } from "./components/modal";
import { Filter } from "../components/filter/Filter";
import { useSelector } from "react-redux";

export const Bookings = () => {
    const [open, setopen] = useState(false);
    const [activeFilter, setActiveFilter] = useState("All");
    const navigate = useNavigate();
    const bookings = useSelector((state) => state.newBooking.value);
    const [filteredBooking, setFilteredBooking] = useState(bookings);

    useEffect(() => {
        setFilteredBooking(bookings)
    }, [bookings]);

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

    const selectedBooking = bookings.find(item => item.ID === open);

    const handleFilter = (status) => {
        if (status === 'All') {
            setFilteredBooking(bookings);
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

    const addBooking = () => {
        navigate('/Bookings/NewBooking');
      };

    return (
        <div>
            <MenuTable>
                <Filter
                    options={menuOptions}
                    selected={activeFilter}
                    onSelect={handleFilter} />
                <AddBooking onClick={addBooking}>+ Add new</AddBooking>
            </MenuTable>

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


