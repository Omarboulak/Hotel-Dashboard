import React, { useEffect, useState, FC, CSSProperties, ChangeEvent } from "react";
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import Table, { Column } from "../components/Table/Table";
import { Filter, FilterOption } from "../components/filter/Filter";
import { createUserFetch, allUsersFetch, deleteUserFetch } from "./redux/usersThunk";
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
  const [selectRow, setSelectRow] = useState<string[]>([]);

  const addUser = () => navigate('/Users/NewUsers');
  const editUser = (id: string) => navigate(`/Users/EditUser/${id}`);

  const columns: Column<UsersInterface>[] = [
    { header: 'Select', accessor: 'select' },
    { header: 'Name', accessor: 'FullName' },
    { header: 'Email', accessor: 'Email' },
    { header: 'Job Desk', accessor: 'JobDescription' },
    { header: 'Contact', accessor: 'Contact' },
    { header: 'Status', accessor: 'status' },
  ];

  const menuOptions: FilterOption[] = [
    { value: "All", label: "All" },
    { value: "ACTIVE", label: "ACTIVE" },
    { value: "INACTIVE", label: "INACTIVE" },
  ];
 
   useEffect(() => {
     dispatch(allUsersFetch());
   }, [dispatch]);
 
   useEffect(() => {
     if (activeFilter === 'All') {
       setFilteredUsers(users);
     } else {
       setFilteredUsers(users.filter(b => b.status === activeFilter));
     }
   }, [users, activeFilter]);
 
   const handleFilter = (status: string) => {
     setActiveFilter(status);
   };
 
   const handleDelete = async () => {
     if (selectRow.length === 0) {
       alert("No se ha seleccionado ninguna fila");
       return;
     }
     await Promise.all(selectRow.map(id => dispatch(deleteUserFetch(id)).unwrap()));
     setSelectRow([]);
     dispatch(allUsersFetch());
   };
 
   const handleUpdate = () => {
     if (selectRow.length !== 1) {
       alert(selectRow.length === 0 
         ? "No se ha seleccionado ninguna fila" 
         : "Solo puede editar un booking a la vez");
       return;
     }
     editUser(selectRow[0]);
   };
 
   const handleCheckbox = (e: ChangeEvent<HTMLInputElement>, id: string) => {
     setSelectRow(prev =>
       e.target.checked
         ? [...prev, id]
         : prev.filter(selectedId => selectedId !== id)
     );
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
                  <ID>{row.id}</ID>
                  <UserJoin>{row.StartDate}</UserJoin>
                </Details>
              </Info>
            );
          }
          if (col.accessor === 'status') {
            return (
              <Status status={row.status}>
                {row.status}
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
                checked={selectRow.includes(row.id!)}
                onChange={e => handleCheckbox(e, row.id!)}
              />
            );
          }
          return (row[col.accessor] as React.ReactNode);
        }}
      />
    </div>
  );
};
