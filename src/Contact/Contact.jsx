import React, { useEffect, useState } from "react";
import Table from "../components/Table/Table";
import { ContactInfo } from "./contactStyled";
import { MenuContact } from "./Compnents/MenuContact";

function contact() {
    const [contact, setContact] = useState([]);

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

    const handleArchive = (contactId) => {
        setContacts(prevContacts =>
          prevContacts.map(item =>
            item.ID === contactId ? { ...item, ARCHIVE: true } : item
          )
        );
      };

    return (
        <div>
            <MenuContact />
            <Table
                columns={columns}
                data={contact}
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
                        return (
                            <button onClick={() => handeArchive(row.ID)}>
                                Archive
                            </button>
                        )                    }
                    return row[col.accessor];
                }}
            />
        </div>
    );
}

export default contact;
