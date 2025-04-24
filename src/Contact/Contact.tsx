import React, { useEffect, useState, FC, ChangeEvent } from "react";
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import Table, { Column } from "../components/Table/Table";
import { Filter, FilterOption } from "../components/filter/Filter";
import { addContactFetch, deleteContactFetch } from "./redux/contactThunk";
import type { RootState } from "../Redux/store";
import { Info, Image, Details } from "../room/roomStyled";
import { FullName, ID, ContactJoin, Status, Contact } from '../users/usersStyled';
import { MenuTable, Add } from "../booking/bookingStyled";
import { ContactInterface } from "../interfaces/ContactInterface";

export const Contacts: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const contacts = useAppSelector((state: RootState) => state.contacts.value as ContactInterface[]);

  const [filteredContacts, setFilteredContacts] = useState<ContactInterface[]>(contacts);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [selectRow, setSelectRow] = useState<number[]>([]);

  const addContact = () => navigate('/Contact/NewContact');
  const editContact = (id: number) => navigate(`/Contact/EditContact/${id}`);

  const columns: Column<ContactInterface>[] = [
    { header: 'Select', accessor: 'select' },
    { header: 'Name', accessor: 'first_name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Subject', accessor: 'Subject' },
    { header: 'Comment', accessor: 'Comment' },
    { header: 'Status', accessor: 'ARCHIVE' },
  ];

  const menuOptions: FilterOption[] = [
    { value: "All", label: "All" },
    { value: "true", label: "Archived" },
    { value: "false", label: "Not Archived" },
  ];

  useEffect(() => {
    if (contacts.length === 0) {
      dispatch(addContactFetch());
    }
    setFilteredContacts(contacts);
  }, [dispatch, contacts]);

  const handleFilter = (status: string) => {
    setActiveFilter(status);
    if (status === 'All') {
      setFilteredContacts(contacts);
    } else {
      setFilteredContacts(contacts.filter(c => String(c.ARCHIVE) === status));
    }
  };

  const handleDelete = () => {
    if (selectRow.length === 0) {
      alert("No se ha seleccionado ninguna fila");
      return;
    }
    selectRow.forEach(id => {
      dispatch(deleteContactFetch(id));
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
    editContact(selectRow[0]);
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
        <Add onClick={addContact}>+ Add new</Add>
        <Add onClick={handleUpdate}>Edit</Add>
        <Add onClick={handleDelete}>Delete</Add>
      </MenuTable>

      <Table
        columns={columns}
        data={filteredContacts}
        renderCell={(col, row) => {
          if (col.accessor === 'first_name') {
            return (
              <Info>
                <Image src={row.email} alt="Contact" />
                <Details>
                  <FullName>{row.first_name} {row.last_name}</FullName>
                  <ID>{row.ID}</ID>
                  <ContactJoin>{row.Date}</ContactJoin>
                </Details>
              </Info>
            );
          }
          if (col.accessor === 'ARCHIVE') {
            return (
              <Status status={row.ARCHIVE.toString()}>
                {row.ARCHIVE ? 'Archived' : 'Active'}
              </Status>
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
