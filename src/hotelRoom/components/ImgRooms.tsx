import React from "react";
import { Images } from "./hotelRoom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import doubleBed from '../../assets/double-bed.jpg';
import luxury from '../../assets/luxury-room.jpg';
import room from '../../assets/room.jpg';
import bigRoom from '../../assets/room-buena.jpg'

export const ImgHotelRoom = () => {

    return (
        <Images>
            <Swiper
                modules={[Navigation, Pagination]}
                pagination={{ clickable: true }}
                navigation
                spaceBetween={30}
                slidesPerView={1}
                // style={{ width: "100%", height: "auto" }}
                autoHeight={true}
            >

                <SwiperSlide>
                    <img src={doubleBed} alt="" />
                </SwiperSlide>

                <SwiperSlide>
                    <img src={luxury} alt="" />
                </SwiperSlide>

                <SwiperSlide>
                    <img src={room} alt="" />
                </SwiperSlide>

                <SwiperSlide>
                    <img src={bigRoom} alt="" />
                </SwiperSlide>

            </Swiper>
        </Images>
    )
}