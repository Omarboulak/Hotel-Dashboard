import React, { useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import { ContactInfo } from "../contactStyled";
import { MenuContact } from "./MenuContact";

export const ContactArchive = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch('../../Contact.json')
      .then(response => response.json())
      .then(data => setContacts(data))
      .catch(error => console.error("Error cargando datos:", error));
  }, []);


  const archivedContacts = contacts.filter(item => item.ARCHIVE);

  const columns = [
    { header: 'ID', accessor: 'ID' },
    { header: 'Date', accessor: 'Date' },
    { header: 'Customer', accessor: 'Customer' },
    { header: 'Subject', accessor: 'Subject' },
    { header: 'Comment', accessor: 'Comment' },
    { header: 'ARCHIVE', accessor: 'ARCHIVE' },
  ];

  return (
    <div>
      <MenuContact />
      <Table
        columns={columns}
        data={archivedContacts}
        renderCell={(col, row) => {
          if (col.accessor === 'Customer') {
            return (
              <ContactInfo>
                <span>{row.first_name}</span>
                <span>{row.last_name}</span>
                <p>{row.email}</p>
                <p>{row.phone}</p>
              </ContactInfo>
            );
          }
          if (col.accessor === 'ARCHIVE') {
            return <span>Archived</span>;
          }
          return row[col.accessor];
        }}
      />
    </div>
  );
};
