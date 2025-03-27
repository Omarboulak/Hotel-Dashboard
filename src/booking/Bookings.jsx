import React, { useEffect, useState } from "react";
import Table from "../components/Table/Table";
import { ContactInfo } from "./contactStyled";
import { MenuContact } from "./Compnents/MenuContact";
import { useLocation } from "react-router-dom";

function contact() {

    useEffect(() => {
        fetch('../../Booking.json')
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
                        return row[col.accessor];
                      }}
                    />
        </div>
    );
}

export default contact;
