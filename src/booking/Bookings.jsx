import React, { useEffect, useState } from "react";
import Table from "../components/Table/Table";
import { useNavigate } from 'react-router-dom';
import { BookingUser, RoomId, ButtonModal, StatusBooking, MenuTable, Add } from "./bookingStyled";
import { Modal } from "./components/modal";
import { Filter } from "../components/filter/Filter";
import { useDispatch, useSelector } from "react-redux";
import { newBooking } from "./redux/bookingSlice";

export const Bookings = () => {
    const dispatch = useDispatch();
    const [open, setopen] = useState(false);
    const [activeFilter, setActiveFilter] = useState("All");
    const navigate = useNavigate();
    const bookings = useSelector((state) => state.newBooking.value);
    const [filteredBooking, setFilteredBooking] = useState(bookings);

    useEffect(() => {
        if (bookings.length === 0) {
            dispatch(newBooking());
        }
    }, [dispatch, bookings.length]);

    useEffect(() => {
        setFilteredBooking(bookings);
        console.log(bookings);
    }, []);


    const columns = [
        { header: 'Guest', accessor: 'Guest' },
        { header: 'OrderDate', accessor: 'OrderDate' },
        { header: 'CheckIn', accessor: 'CheckIn' },
        { header: 'CheckOut', accessor: 'CheckOut' },
        { header: 'SpecialRequest', accessor: 'SpecialRequest' },
        { header: 'RoomType', accessor: 'RoomType' },
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
            const filtered = bookings.filter(cell => cell.Status === status);
            setFilteredBooking(filtered)
        }
    }

    const menuOptions = [
        { value: "All", label: "All" },
        { value: "CheckIn", label: "CheckIn" },
        { value: "CheckOut", label: "CheckOut" },
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
                <Add onClick={addBooking}>+ Add new</Add>
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
                    if (col.accessor === 'SpecialRequest') {
                        return (
                            <ButtonModal onClick={() => openPopup(row.ID)}>View Notes</ButtonModal>
                        )
                    }
                    if (col.accessor === 'Status') {
                        return <StatusBooking status={row[col.accessor]}>{row[col.accessor]}</StatusBooking>;
                    }
                    if (col.accessor === 'RoomType') {
                        return <p>{row['RoomType']} - {row['RoomNumber']}</p>;
                    }
                    return row[col.accessor];
                }}
            />
            {selectedBooking && (
                <Modal
                    closeModal={closePopup}
                    request={selectedBooking['SpecialRequest']}
                />
            )}
        </div>
    );
}


