import React, { useEffect, useState, FC, CSSProperties, ChangeEvent } from "react";
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import Table, { Column } from "../components/Table/Table";
import { Filter, FilterOption } from "../components/filter/Filter";
import { addUsersFetch, deleteUsersFetch } from "./redux/usersThunk";
import type { RootState } from "../Redux/store";
// import phone from '../assets/phone.svg';
import { Info, Image, Details } from "../room/roomStyled";
import { FullName, ID, UserJoin, Status, Contact } from './usersStyled';
import { MenuTable, Add } from "../booking/bookingStyled";
import { UsersInterface } from "../interfaces/UsersInterface";

export const Users: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const users = useAppSelector((state: RootState) => state.users.value as UsersInterface[]);

  const [filteredUsers, setFilteredUsers] = useState<UsersInterface[]>(users);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [selectRow, setSelectRow] = useState<number[]>([]);

  const addUser = () => navigate('/Users/NewUsers');
  const editUser = (id: number) => navigate(`/Users/EditUser/${id}`);

  const columns: Column<UsersInterface>[] = [
    { header: 'Select', accessor: 'select' },
    { header: 'Name', accessor: 'FullName' },
    { header: 'Email', accessor: 'Email' },
    { header: 'Job Desk', accessor: 'JobDescription' },
    { header: 'Contact', accessor: 'Contact' },
    { header: 'Status', accessor: 'Status' },
  ];

  const menuOptions: FilterOption[] = [
    { value: "All", label: "All" },
    { value: "ACTIVE", label: "ACTIVE" },
    { value: "INACTIVE", label: "INACTIVE" },
  ];

  useEffect(() => {
    if (users.length === 0) {
      dispatch(addUsersFetch());
    }
    setFilteredUsers(users);
  }, [dispatch, users]);

  const handleFilter = (status: string) => {
    setActiveFilter(status);
    if (status === 'All') {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(users.filter(user => user.Status === status));
    }
  };

  const handleDelete = () => {
    if (selectRow.length === 0) {
      alert("No se ha seleccionado ninguna fila");
      return;
    }
    selectRow.forEach(id => {
      dispatch(deleteUsersFetch(id));
    });
    setSelectRow([]);
  };

  const handleUpdate = () => {
    if (selectRow.length === 0) {
      alert("No se ha seleccionado ninguna fila");
      return;
    }
    if (selectRow.length > 1) {
      alert("No se puede seleccionar más de una fila");
      return;
    }
    editUser(selectRow[0]);
  };

  const handleCheckbox = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    if (e.target.checked) {
      setSelectRow(prev => [...prev, id]);
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
          onSelect={handleFilter}
        />
        <Add onClick={addUser}>+ Add new</Add>
        <Add onClick={handleUpdate}>Edit</Add>
        <Add onClick={handleDelete}>Delete</Add>
      </MenuTable>

      <Table
        columns={columns}
        data={filteredUsers}
        renderCell={(col, row) => {
          if (col.accessor === 'FullName') {
            return (
              <Info>
                <Image src={row.Photo} alt="User" />
                <Details>
                  <FullName>{row.FullName}</FullName>
                  <ID>{row.ID}</ID>
                  <UserJoin>{row.StartDate}</UserJoin>
                </Details>
              </Info>
            );
          }
          if (col.accessor === 'Status') {
            return (
              <Status status={row.Status}>
                {row.Status}
              </Status>
            );
          }
          if (col.accessor === 'Contact') {
            return (
              <Contact>
                {/* <img src={phone} alt="icono de un teléfono" /> */}
                <span>{row.Contact}</span>
              </Contact>
            );
          }
          if (col.accessor === 'select') {
            return (
              <input
                type="checkbox"
                checked={selectRow.includes(row.ID)}
                onChange={e => handleCheckbox(e, row.ID)}
              />
            );
          }
          return (row[col.accessor] as React.ReactNode);
        }}
      />
    </div>
  );
};
