import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Info, Image, Details } from "../room/roomStyled";
import { FullName, ID, UserJoin, Status, Contact } from "./usersStyled";
import { MenuTable, Add } from "../booking/bookingStyled";
import phone from '../assets/phone.svg';
import Table from "../components/Table/Table";
import { Filter } from "../components/filter/Filter";
import { addUsersFetch, deleteUsersFetch } from "./redux/usersThunk";

export const Users = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users.value);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectRow, setSelectRow] = useState([]);

  const addUser = () => {
    navigate('/Users/NewUsers');
  };

  const editUser = (id) => {
    navigate(`/Users/EditUser/${id}`);
  };

  const columns = [
    { header: 'Select', accessor: 'select' },
    { header: 'Name', accessor: 'Name' },
    { header: 'Email', accessor: 'Email' },
    { header: 'Job Desk', accessor: 'JobDescription' },
    { header: 'Contact', accessor: 'Contact' },
    { header: 'Status', accessor: 'Status' },
  ];

  const menuOptions = [
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

  const handleFilter = (status) => {
    if (status === 'All') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((cell) => cell.Status === status);
      setFilteredUsers(filtered);
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
    } else if (selectRow.length > 1) {
      alert("No se puede seleccionar más de una fila");
      return;
    } else {
      editUser(selectRow[0]);
    }
  };

  const handleCheckbox = (e, id) => {
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
          if (col.accessor === 'Name') {
            return (
              <Info>
                <Image src={row['Photo']} alt="User" />
                <Details>
                  <FullName>{row['FullName']}</FullName>
                  <ID>{row['ID']}</ID>
                  <UserJoin>{row['StartDate']}</UserJoin>
                </Details>
              </Info>
            );
          }
          if (col.accessor === 'Status') {
            return <Status status={row[col.accessor]}>{row[col.accessor]}</Status>;
          }
          if (col.accessor === 'Contact') {
            return (
              <Contact>
                <img src={phone} alt="icono de un teléfono" />
                <span>{row['Contact']}</span>
              </Contact>
            );
          }
          if (col.accessor === 'select') {
            return (
              <input
                type="checkbox"
                checked={selectRow.includes(row.ID)}
                onChange={(e) => handleCheckbox(e, row.ID)}
              />
            );
          }
          return row[col.accessor];
        }}
      />
    </div>
  );
};
