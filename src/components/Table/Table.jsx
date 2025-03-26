import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { TableContainer } from './tableStyle';

function Table({ columns, data, renderCell}) {
    const slides = [];
    for (let i = 0; i < data.length; i += 10) {
        slides.push(data.slice(i, i + 10));
    }

    return (
        <TableContainer>
            <Swiper
                modules={[Navigation]} 
                pagination={{ clickable: true }} 
                navigation 
                spaceBetween={30} 
                slidesPerView={1} 
                style={{ height: "100%", maxWidth: "78vw" }} 
                autoHeight={false} >
                
                {slides.map((pageData, pageIndex) => (
                    <SwiperSlide key={pageIndex}>
                        <table>
                            <thead>
                                <tr>
                                    {columns.map((col, index) => (
                                        <th key={index}>{col.header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {pageData.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {columns.map((col, colIndex) => (
                                            <td key={colIndex}>
                                                {renderCell ? renderCell(col, row) : row[col.accessor]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </SwiperSlide>
                ))}
            </Swiper>
        </TableContainer>
    );
}

export default Table;
