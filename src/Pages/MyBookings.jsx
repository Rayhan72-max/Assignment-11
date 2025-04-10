import React, { use, useContext, useEffect, useState } from 'react';
import { FaRegTrashAlt } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import Swal from 'sweetalert2';
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import axios from 'axios';
import Chart from 'chart.js/auto';
import { Link, useLocation, useParams } from 'react-router-dom';
import LineChart from '../Components/LineChart';


const MyBookings = (props) => {
    const params = useParams();
    const location = useLocation();
    const today = new Date();
    const [cars,setCars] = useState([]);
    
 
    useEffect(()=>{
        axios.get(`http://localhost:5000/bookings/${params.email}`, { withCredentials: true })
        .then(res=> {
        setCars(res.data);
    })}
    ,[])
    
    
    const handleCancel = (car) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Cancel it!",
            cancelButtonText: "No!",
            reverseButtons: true
        }).then((result) => {
            
            if (result.isConfirmed) {
                console.log("confirmed")
                axios.delete(`http://localhost:5000/cancelbookings/${car._id}`,{car},{ withCredentials: true })
                .then(res=>{
                    if(res.data.deletedCount>0){
                        const remaining = cars.filter(ca => ca._id !== car._id);
                        setCars(remaining);
                    }
                })
                swalWithBootstrapButtons.fire({
                    title: "Canceled!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Your imaginary file is safe :)",
                    icon: "error"
                });
            }
        });
    }
    const handleDate = (car) => {
        location.state = {id: car._id}
        const datepicker = document.getElementById("datepicker");
        datepicker.showModal();
    }
    

    const handleSubmit = (e) => { 
        e.preventDefault();
        console.log("handleskdjfffffff")
        
        const id = location.state.id;
        console.log(id)
        const start = e.target.start.value;
        const ending = e.target.ending.value;
        const dates = {start, ending}; 
        axios.patch(`http://localhost:5000/modifydate/${id}`,{dates},{ withCredentials: true })
        .then(res=>{
            console.log("inside update")
            if(res.data.modifiedCount > 0){
                setCars(cars.map(item => item._id === id ? {...item, BookingDate: start} : item));
            }
        }) 
        .catch(err => console.log(err))
        
        console.log(start, ending);
        const datepicker = document.getElementById("datepicker");
        datepicker.close(); 
    } 
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className='text-center bg-cyan-500 text-black'>
                            <th>Name</th>
                            <th>Booking Date</th>
                            <th>Total Price</th>
                            <th>Booking Status</th>
                            <th>Modify Date</th>
                            <th>Cancel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            cars.map((car)=>{ 
                        const startDate = new Date(car.BookingDate);
                        const datepassed = Math.abs(startDate-today);
                        console.log("date passed",datepassed)
                        const daysPassed = Math.ceil(datepassed / (1000 * 60 * 60 * 24));   
                        return <tr className='text-center hover:bg-cyan-200 font-bold'>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src={car.ImageUrl} />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{car.Model}</div>
                                        
                                    </div>
                                </div>
                            </td>
                            <td>
                                {car.BookingDate}
                                
                            </td>
                            <td>{car.Daily_Price*daysPassed}</td>
                            <td>
                                <Link to={`/bookingdetails/${car._id}`}><button  className="btn btn-ghost btn-xs ">details</button></Link>
                            </td>
                            <td className='text-2xl text-center'>
                                <button id='date' onClick={()=>handleDate(car)} className="btn bg-blue-500 text-white"><CiCalendarDate /> Modify Date</button>
                            </td>
                            <td>
                                <button onClick={()=>handleCancel(car)} className="btn bg-red-500  text-white"><FaRegTrashAlt /> Cancel</button>
                            </td>
                        </tr>}
                            )
                        }
                    </tbody>
                </table>
            </div>
            <div>
                <dialog id="datepicker" className="modal bg-white">
                    <div className='modal-box flex flex-col gap-2'>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
                    <div>
                    <label className='label'> Start Date : </label>
                    <input name='start' className='border rounded' type="date"/>
                    </div>
                    <div>
                    <label className='label'> Ending Date : </label>
                    <input name="ending" className='border rounded' type="date"/>
                    </div>
                    <div className="modal-action">
                        <button type='submit' className="btn">Submit</button>
                        <button className="btn">Cancel</button>
                    </div>
                    </form>
                    </div>
                    
                </dialog>
            </div>
            
                
            <div>
               {cars.length>0?<h1 className='font-bold text-xl text-center'>Car VS Price</h1>:""} 
            <LineChart data={cars}></LineChart>
            </div>
            
        </div>
    );
};

export default MyBookings;