import React, { useEffect, useState, ChangeEvent, FC } from "react";
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import Table, { Column } from "../components/Table/Table";
import { Filter, FilterOption } from "../components/filter/Filter";
import { addRoomFetch, updateRoomFetch, deleteRoomFetch } from './redux/roomThunk';
import type { RootState } from "../Redux/store";
import { MenuTable, Add } from "../booking/bookingStyled";
import { RoomInterface } from "../interfaces/RoomInterface";

export const Room: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const rooms = useAppSelector((state: RootState) => state.rooms.value as RoomInterface[]);
  const [filteredRooms, setFilteredRooms] = useState<RoomInterface[]>(rooms);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectRow, setSelectRow] = useState<number[]>([]);

  const addRoom = () => navigate('/Room/NewRoom');
  const editRoom = (id: number) => navigate(`/Room/EditRoom/${id}`);

  const columns: Column<RoomInterface>[] = [
    { header: 'Room ID', accessor: 'room_id' },
    { header: 'Type', accessor: 'room_type' },
    { header: 'Price', accessor: 'price' },
    { header: 'Discount', accessor: 'discount' },
    { header: 'Offer', accessor: 'offer' },
    { header: 'Amenities', accessor: 'amenities' },
  ];

  const menuOptions: FilterOption[] = [
    { value: 'All', label: 'All' },
    { value: 'true', label: 'Offer' },
    { value: 'false', label: 'No Offer' },
  ];

  useEffect(() => {
    if (rooms.length === 0) {
      dispatch(addRoomFetch());
    }
    setFilteredRooms(rooms);
  }, [dispatch, rooms]);

  const handleFilter = (value: string) => {
    setActiveFilter(value);
    if (value === 'All') {
      setFilteredRooms(rooms);
    } else {
      setFilteredRooms(rooms.filter(room => String(room.offer) === value));
    }
  };

  const handleDelete = () => {
    if (selectRow.length === 0) {
      alert('No rooms selected');
      return;
    }
    selectRow.forEach(id => dispatch(deleteRoomFetch(id)));
    setSelectRow([]);
  };

  const handleUpdate = () => {
    if (selectRow.length === 0) {
      alert('No rooms selected');
      return;
    }
    if (selectRow.length > 1) {
      alert('Select only one room to edit');
      return;
    }
    editRoom(selectRow[0]);
  };

  const handleCheckbox = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    if (e.target.checked) {
      setSelectRow(prev => [...prev, id]);
    } else {
      setSelectRow(prev => prev.filter(i => i !== id));
    }
  };

  return (
    <div>
      <MenuTable>
        <Filter 
          options={menuOptions} 
          selected={activeFilter} 
          onSelect={handleFilter} />
          
        <Add onClick={addRoom}>+ Add Room</Add>
        <Add onClick={handleUpdate}>Edit</Add>
        <Add onClick={handleDelete}>Delete</Add>
      </MenuTable>

      <Table
        columns={columns}
        data={filteredRooms}
        renderCell={(col, row) => {
          if (col.accessor === 'select') {
            return (
              <input
                type="checkbox"
                checked={selectRow.includes(row.room_id)}
                onChange={e => handleCheckbox(e, row.room_id)}
              />
            );
          }
          return String(row[col.accessor]) as React.ReactNode;
        }}
      />
    </div>
  );
};
