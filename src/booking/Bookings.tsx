import React, { useEffect, useState } from "react";
import { FC } from "react";
import Table, { Column } from "../components/Table/Table";
import { useNavigate } from 'react-router-dom';
import { BookingUser, RoomId, ButtonModal, StatusBooking, MenuTable, Add } from "./bookingStyled";
import { Modal } from "./components/Modal";
import { Filter } from "../components/filter/Filter";
import { useDispatch, useSelector } from "react-redux";
import { addBookingFetch, deleteBookingFetch } from "./redux/bookinThunk";
import { BookingInterface } from "../interfaces/BookingInterface";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import type { RootState } from "../Redux/store";


export const Bookings: FC = () => {
    
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [open, setopen] = useState<number | boolean>(false);
    const [activeFilter, setActiveFilter] = useState<string>("All");

    const bookings = useAppSelector((state: RootState) => state.newBooking.value);
    
    const [filteredBooking, setFilteredBooking] = useState(bookings);
    const [selectRow, setSelectRow] = useState<number[]>([]);
    const selectedBooking = bookings.find(item => item.ID === open);
    const addBooking = () => navigate('/Bookings/NewBooking');
    const editBooking = (id: number) => navigate(`/Bookings/EditBooking/${id}`);

    const menuOptions = [
        { value: "All", label: "All" },
        { value: "CheckIn", label: "CheckIn" },
        { value: "CheckOut", label: "CheckOut" },
        { value: "In Progress", label: "In Progress" },
    ];

    const columns: Column<BookingInterface>[] = [
        { header: 'Select', accessor: 'select' as keyof BookingInterface },
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

    const openPopup = (bookingId: number) => setopen(bookingId);
    const closePopup = () => setopen(false);

    const handleFilter = (status: string) => {
        if (status === 'All') {
            setFilteredBooking(bookings);
        } else {
            const filtered = bookings.filter(cell => cell.status === status);
            setFilteredBooking(filtered)
        }
    }

    const handleDelete = () => {
        if (selectRow.length === 0) {
            alert("No se ha seleccionado ninguna fila");
            return;
        }
        selectRow.forEach(id => {
            dispatch(deleteBookingFetch(id));
        });
        setSelectRow([]);
    };

    const handleUpdate = () =>{
        if (selectRow.length === 0) {
            alert("No se ha seleccionado ninguna fila");
            return;
        }
        else if (selectRow.length > 1) {
            alert("No se puede seleccionar mas de una fila fila");
            return;
        } else {
            editBooking(selectRow[0]);
        }
    }

    const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        if (e.target.checked) {
            setSelectRow(prev => [...prev, id])
        } else {
            setSelectRow(prev => prev.filter(selectedId => selectedId !== id));
        }
    };

    interface MyColumn {
        header: string;
        accessor: keyof BookingInterface | "select"; 
      }

    return (
        <div>
            <MenuTable>
                <Filter
                    options={menuOptions}
                    selected={activeFilter}
                    onSelect={handleFilter} />
                <Add onClick={addBooking}>+ Add new</Add>
                <Add onClick={handleUpdate}>Edit</Add>
                <Add onClick={handleDelete}>Delete</Add>
            </MenuTable>

            <Table
                columns={columns}
                data={filteredBooking}
                renderCell={(
                    col:  Column<BookingInterface>,
                    row: BookingInterface
                  ) => {
                    if (col.accessor === 'Guest') {
                        return (
                            <BookingUser>
                                <span>{row['first_Name']}</span>
                                <span>{row['last_Name']}</span>
                                <RoomId>{row['ID']}</RoomId>
                            </BookingUser>
                        );
                    }
                    if (col.accessor === 'specialRequest') {
                        return (
                            <ButtonModal onClick={() => openPopup(row.ID)}>View Notes</ButtonModal>
                        )
                    }
                    if (col.accessor === 'status') {
                        return <StatusBooking status={row[col.accessor]}>{row[col.accessor]}</StatusBooking>;
                    }
                    if (col.accessor === 'roomType') {
                        return <p>{row['roomType']} - {row['roomNumber']}</p>;
                    }
                    if (col.accessor === 'select') {
                        return <input
                            type="checkbox"
                            checked={selectRow.includes(row.ID)}
                            onChange={(e) => handleCheckbox(e, row.ID)} />
                    }
                    return row[col.accessor];
                }}
            />
            {selectedBooking && (
                <Modal
                    closeModal={closePopup}
                    request={selectedBooking['specialRequest']}
                />
            )}
        </div>
    );
}


