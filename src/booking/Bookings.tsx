import React, { useEffect, useState, FC, ChangeEvent } from "react";
import { useNavigate } from 'react-router-dom';
import Table, { Column } from "../components/Table/Table";
import { BookingUser, RoomId, ButtonModal, StatusBooking, MenuTable, Add } from "./bookingStyled";
import { Modal } from "./components/Modal";
import { Filter, FilterOption } from "../components/filter/Filter";
import { allBookingFetch, deleteBookingFetch } from "./redux/bookinThunk";
import type { RootState } from "../Redux/store";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { BookingInterface } from "../interfaces/BookingInterface";

export const Bookings: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const bookings = useAppSelector((state: RootState) => state.booking.value);

  const [filteredBooking, setFilteredBooking] = useState<BookingInterface[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [selectRow, setSelectRow] = useState<string[]>([]);
  const [open, setOpen] = useState<string | null>(null);
  const selectedBooking = bookings.find(item => item.id === open);

  const addBooking = () => navigate('/Bookings/NewBooking');
  const editBooking = (id: string) => navigate(`/Bookings/EditBooking/${id}`);

  const menuOptions: FilterOption[] = [
    { value: "All", label: "All" },
    { value: "CheckIn", label: "CheckIn" },
    { value: "CheckOut", label: "CheckOut" },
    { value: "In Progress", label: "In Progress" },
  ];

  const columns: Column<BookingInterface>[] = [
    { header: 'Select', accessor: 'select' },
    { header: 'Guest', accessor: 'first_Name' },
    { header: 'OrderDate', accessor: 'orderDate' },
    { header: 'CheckIn', accessor: 'checkIn' },
    { header: 'CheckOut', accessor: 'checkOut' },
    { header: 'SpecialRequest', accessor: 'specialRequest' },
    { header: 'RoomType', accessor: 'roomType' },
    { header: 'Status', accessor: 'status' },
  ];

  useEffect(() => {
    dispatch(allBookingFetch());
  }, [dispatch]);

  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredBooking(bookings);
    } else {
      setFilteredBooking(bookings.filter(b => b.status === activeFilter));
    }
  }, [bookings, activeFilter]);

  const handleFilter = (status: string) => {
    setActiveFilter(status);
  };

  const handleDelete = async () => {
    if (selectRow.length === 0) {
      alert("No se ha seleccionado ninguna fila");
      return;
    }
    await Promise.all(selectRow.map(id => dispatch(deleteBookingFetch(id)).unwrap()));
    setSelectRow([]);
    dispatch(allBookingFetch());
  };

  const handleUpdate = () => {
    if (selectRow.length !== 1) {
      alert(selectRow.length === 0 
        ? "No se ha seleccionado ninguna fila" 
        : "Solo puede editar un booking a la vez");
      return;
    }
    editBooking(selectRow[0]);
  };

  const handleCheckbox = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    setSelectRow(prev =>
      e.target.checked
        ? [...prev, id]
        : prev.filter(selectedId => selectedId !== id)
    );
  };

  const openPopup = (id: string) => setOpen(id);
  const closePopup = () => setOpen(null);

  return (
    <div>
      <MenuTable>
        <Filter options={menuOptions} selected={activeFilter} onSelect={handleFilter} />
        <Add onClick={addBooking}>+ Add new</Add>
        <Add onClick={handleUpdate}>Edit</Add>
        <Add onClick={handleDelete}>Delete</Add>
      </MenuTable>

      <Table
        columns={columns}
        data={filteredBooking}
        renderCell={(col, row) => {
          switch (col.accessor) {
            case 'first_Name':
              return (
                <BookingUser>
                  <span>{row.first_Name} {row.last_Name}</span>
                  <RoomId>{row.id}</RoomId>
                </BookingUser>
              );
            case 'specialRequest':
              return (
                <ButtonModal onClick={() => openPopup(row.id!)}>View Notes</ButtonModal>
              );
            case 'status':
              return (
                <StatusBooking status={row.status}>{row.status}</StatusBooking>
              );
            case 'roomType':
              return <p>{row.roomType} - {row.roomNumber}</p>;
            case 'select':
              return (
                <input
                  type="checkbox"
                  checked={selectRow.includes(row.id!)}
                  onChange={e => handleCheckbox(e, row.id!)}
                />
              );
            default:
              return row[col.accessor] as React.ReactNode;
          }
        }}
      />

      {selectedBooking && (
        <Modal
          closeModal={closePopup}
          request={selectedBooking.specialRequest}
        />
      )}
    </div>
  );
};
