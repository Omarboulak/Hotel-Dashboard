import React, { useEffect, useState, ChangeEvent, FC } from "react";
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from "../Redux/hooks";
import Table, { Column } from "../components/Table/Table";
import { Filter, FilterOption } from "../components/filter/Filter";
import { MenuTable, Add } from "../booking/bookingStyled";
import { ContactInterface } from "../interfaces/ContactInterface";

export const Contact: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const [contacts, setContacts] = useState<ContactInterface[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<ContactInterface[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectRow, setSelectRow] = useState<number[]>([]);

  const columns: Column<ContactInterface>[] = [
    { header: 'ID', accessor: 'ID' },
    { header: 'Date', accessor: 'Date' },
    { header: 'Subject', accessor: 'Subject' },
    { header: 'Comment', accessor: 'Comment' },
    { header: 'Customer', accessor: 'first_name' },
    { header: 'ARCHIVE', accessor: 'ARCHIVE' },
  ];

  const menuOptions: FilterOption[] = [
    { value: 'All', label: 'All' },
    { value: 'true', label: 'Archived' },
    { value: 'false', label: 'Not Archived' },
  ];

  useEffect(() => {
    fetch('../../Contact.json')
      .then(res => res.json())
      .then(data => {
        setContacts(data);
        setFilteredContacts(data);
      })
      .catch(err => console.error("Error loading contacts:", err));
  }, []);

  const handleFilter = (value: string) => {
    setActiveFilter(value);
    if (value === 'All') {
      setFilteredContacts(contacts);
    } else {
      setFilteredContacts(contacts.filter(contact => String(contact.ARCHIVE) === value));
    }
  };

  const handleArchive = (id: number) => {
    const updated = contacts.map(contact =>
      contact.ID === id ? { ...contact, ARCHIVE: true } : contact
    );
    setContacts(updated);
    handleFilter(activeFilter);
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
        <Filter options={menuOptions} selected={activeFilter} onSelect={handleFilter} />
        <Add onClick={() => alert("Add Contact (not implemented)")}>+ Add Contact</Add>
        <Add onClick={() => selectRow.forEach(id => handleArchive(id))}>Archive</Add>
      </MenuTable>

      <Table
        columns={columns}
        data={filteredContacts}
        renderCell={(col, row) => {
          if (col.accessor === 'first_name') {
            return (
              <div>
                <span>{row.first_name} {row.last_name}</span>
                <p>{row.email}</p>
                <p>{row.phone}</p>
              </div>
            );
          }
          if (col.accessor === 'ARCHIVE') {
            return !row.ARCHIVE ? (
              <button onClick={() => handleArchive(row.ID)}>Archive</button>
            ) : (
              <span>Archived</span>
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
          return String(row[col.accessor]);
        }}
      />
    </div>
  );
};
