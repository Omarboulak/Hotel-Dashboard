import React, { useEffect, useState } from "react";
import Table from "../components/Table/Table";
import { ContactInfo } from "./contactStyled";
import { MenuContact } from "./Compnents/MenuContact";
import { useLocation } from "react-router-dom";

function contact() {
    const [contact, setContact] = useState([]);
    const location = useLocation();

    useEffect(() => {
        fetch('../../Contact.json')
            .then((response) => response.json())
            .then((data) => setContact(data))
            .catch((error) => console.error("Error cargando datos:", error));
    }, []);

    const columns = [
        { header: 'ID', accessor: 'ID' },
        { header: 'Date', accessor: 'Date' },
        { header: 'Customer', accessor: 'Customer' },
        { header: 'Subject', accessor: 'Subject' },
        { header: 'Comment', accessor: 'Comment' },
        { header: 'ARCHIVE', accessor: 'ARCHIVE' },
    ];

    const handleArchive = (archiveId) => {
        setContact(arch =>
          arch.map(contact =>
            contact.ID === archiveId ? { ...contact, ARCHIVE: true } : contact
          )
        );
      };
      
      const isArchivedView = location.pathname.includes("archive");
      const filteredContacts = isArchivedView
        ? contact.filter(contact => contact.ARCHIVE)
        : contact.filter(contact => !contact.ARCHIVE);

    return (
        <div>
            <MenuContact />
            <Table
                columns={columns}
                data={filteredContacts}
                renderCell={(col, row) => {
                    if (col.accessor === 'Customer') {
                        return (
                            <ContactInfo>
                                <span>{row['first_name']}</span>
                                <span>{row['last_name']}</span>
                                <p>{row['email']}</p>
                                <p>{row['phone']}</p>
                            </ContactInfo>
                        );
                    }
                    if (col.accessor === 'ARCHIVE') {
                        return !row.ARCHIVE ? (
                            <button onClick={() => handleArchive(row.ID)}>Archive</button>
                          ) : (
                            <span>Archived</span>
                          );
                        }
                        return row[col.accessor];
                      }}
                    />
        </div>
    );
}

export default contact;
