import React, { useEffect, useState } from "react";
import Table from "../components/Table/Table";
import { useNavigate } from 'react-router-dom';
import { BookingUser, RoomId, ButtonModal, StatusBooking, MenuTable, Add } from "./bookingStyled";
import { Modal } from "./components/modal";
import { Filter } from "../components/filter/Filter";
import { useDispatch, useSelector } from "react-redux";
import { addBookingFetch, deleteBookingFetch } from "./redux/bookinThunk";

export const Bookings = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setopen] = useState(false);
    const [activeFilter, setActiveFilter] = useState("All");
    const bookings = useSelector((state) => state.newBooking.value);
    const [filteredBooking, setFilteredBooking] = useState(bookings);
    const [selectRow, setSelectRow] = useState([]);
    const selectedBooking = bookings.find(item => item.ID === open);
    const addBooking = () => navigate('/Bookings/NewBooking');

    const menuOptions = [
        { value: "All", label: "All" },
        { value: "CheckIn", label: "CheckIn" },
        { value: "CheckOut", label: "CheckOut" },
        { value: "In Progress", label: "In Progress" },
    ];

    const columns = [
        { header: 'Select', accessor: 'select' },
        { header: 'Guest', accessor: 'Guest' },
        { header: 'OrderDate', accessor: 'OrderDate' },
        { header: 'CheckIn', accessor: 'CheckIn' },
        { header: 'CheckOut', accessor: 'CheckOut' },
        { header: 'SpecialRequest', accessor: 'SpecialRequest' },
        { header: 'RoomType', accessor: 'RoomType' },
        { header: 'Status', accessor: 'Status' },
    ];

    useEffect(() => {
        if (bookings.length === 0) {
            dispatch(addBookingFetch());
        }
        setFilteredBooking(bookings);
    }, [dispatch, bookings]);

    const openPopup = (bookingId) => setopen(bookingId);
    const closePopup = () => setopen(false);


    const handleFilter = (status) => {
        if (status === 'All') {
            setFilteredBooking(bookings);
        } else {
            const filtered = bookings.filter(cell => cell.Status === status);
            setFilteredBooking(filtered)
        }
    }

    const handleDelete = () => {
        if (selectRow.length === 0) {
            alert("No se ha seleccionado ninguna fila.");
            return;
        }
        selectRow.forEach(id => {
            dispatch(deleteBookingFetch(id));
        });
        setSelectRow([]);
    };

    const handleCheckbox = (e, id) => {
        if (e.target.checked) {
            setSelectRow(prev => [...prev, id])
        } else {
            setSelectRow(prev => prev.filter(selectedId => selectedId !== id));
        }
    };

    return (
        <div>
            <MenuTable>
                <Filter
                    options={menuOptions}
                    selected={activeFilter}
                    onSelect={handleFilter} />
                <Add onClick={addBooking}>+ Add new</Add>
                <Add onClick={addBooking}>Edit</Add>
                <Add onClick={handleDelete}>Delete</Add>
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
                    if (col.accessor === 'select') {
                        return <input 
                                    type="checkbox"
                                    checked={selectRow.includes(row.id)}
                                    onChange={(e) => handleCheckbox(e, row.ID)} />
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


