import React, { use, useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Card from '../Components/Card'
import Swal from 'sweetalert2';
import axios from 'axios';
import { AuthContext } from '../Auth/AuthProvider';
import moment from 'moment';

const today = new Date();
const BookingDetails = (props) => {
    const BookingDate = new Date();
    const [handle, setHandle] = useState([]);
    const user = useContext(AuthContext);
    const email = user.user.email;
    const id = useParams();
    const [car, setCar] = useState({});
    useEffect(() => {
        fetch(`https://assignment11-server-red.vercel.app/bookingdetails/${id.id}`)
            .then(res => res.json())
            .then(data => setCar(data))
    }, [])



    const beginingDate = new Date(car.BookingDate);
    const totalpassed = Math.abs(beginingDate - today);
    const totalDays = Math.ceil(totalpassed / (1000 * 60 * 60 * 24));



    const startDate = new Date(car.Date_Posted);
    const datePassed = today - startDate;
    const daysPassed = Math.floor(datePassed / (1000 * 60 * 60 * 24));


    return (
        <div>
            <div className='flex justify-center my-4'>
                <div className="card bg-base-100 w-full h-screen shadow-sm px-48">
                    <figure>
                        <img
                            src={car.ImageUrl}
                            alt="Shoes" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{car.Model}</h2>
                        <h2>Daily Price : {car.Daily_Price}</h2>
                        <h2>Total Cost :{totalDays*car.Daily_Price} </h2>
                        <h2>Booking Count : {car.Booking_count}</h2>
                        <h2>Booking Date : {moment(car.BookingDate).format("YYYY/MM/DD HH:ss")}</h2>
                        <h2>Added {daysPassed} days</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingDetails;