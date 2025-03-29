import React, { useEffect, useState } from 'react';
import Banner from '../Components/Banner';
import { IoCarSport } from "react-icons/io5";
import { MdOutlinePriceChange } from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";
import Card from '../Components/Card';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaRegArrowAltCircleRight } from "react-icons/fa";
AOS.init();

const Home = (props) => {
    const [isWide, setIsWide] = useState(false);
    const handleWide = () => {
        if (isWide === false) { setIsWide(true); }
    }
    const [cars, setCars] = useState([])
    useEffect(() => {
        fetch("../../cars.json")
            .then(res => res.json())
            .then(data => setCars(data))
    }, [])
    console.log(cars)
    return (
        <div>
            <Banner></Banner>
            <section>
                <h1 className='text-4xl font-bold text-center mt-5 text-blue-500'>Why Choose Us?</h1>
                <div className='grid grid-rows lg:grid-cols-4 gap-2 text-center justify-around mt-8 p-4'>
                    <div className='flex flex-col'>
                        <h1 className='flex justify-center text-xl'><IoCarSport></IoCarSport></h1>
                        <h1 className=' font-bold'>Wide Variety of Cars</h1>
                        <p className='font-semibold'>From budget-friendly options to luxury vehicles.</p>
                    </div>
                    <div className='flex flex-col'>
                        <h1 className='flex justify-center text-xl'><MdOutlinePriceChange></MdOutlinePriceChange></h1>
                        <h1 className=' font-bold'>Affordable Prices</h1>
                        <p className='font-semibold'>Competitive daily rates you can count on.</p>
                    </div>
                    <div className='flex flex-col'>
                        <h1 className='flex justify-center text-xl'><TbBrandBooking></TbBrandBooking></h1>
                        <h1 className=' font-bold'>Easy Booking Process</h1>
                        <p className='font-semibold'>Seamlessly book your ride in just a few clicks.</p>
                    </div>
                    <div className='flex flex-col'>
                        <h1 className='flex justify-center  text-xl'><BiSupport></BiSupport></h1>
                        <h1 className=' font-bold'>Customer Support</h1>
                        <p className='font-semibold'>24/7 assistance for all your queries.</p>
                    </div>

                </div>
            </section>
            <section>
                <h1 className='text-4xl font-bold text-center mt-5 text-blue-500'>Recent Listing</h1>

                {<Card cars={cars}></Card>}

            </section>



            <section className='my-12'>

                <h1 class="text-5xl font-bold bg-gradient-to-br from-blue-600 to-cyan-500 text-transparent bg-clip-text text-center p-2">Reviews</h1>
                <div className='flex items-center gap-24'>
                    <div className={isWide ? 'grid grid-cols-3 gap-2 p-4 text-black' : "stack stack-start size-90 ml-2 mb-2"} >

                        <div className="card w-full h-full bg-base-100 card-lg shadow-sm">
                            <div className="card-body">
                                <h2 className="card-title">Rakib Ahmed</h2>
                                <div className="rating">
                                    <input type="radio" name="rating-1" className="mask mask-star-2 bg-orange-400" aria-label="1 star" />
                                    <input type="radio" name="rating-1" className="mask mask-star-2 bg-orange-400" aria-label="2 star" />
                                    <input type="radio" name="rating-1" className="mask mask-star-2 bg-orange-400" aria-label="3 star" />
                                    <input type="radio" name="rating-1" className="mask mask-star-2 bg-orange-400" aria-label="4 star" />
                                    <input type="radio" name="rating-1" className="mask mask-star-2 bg-orange-400" aria-label="5 star" defaultChecked />
                                </div>
                                <p>CarHub made my car-buying experience smooth and hassle-free! The customer service was top-notch, and they helped me find the perfect SUV within my budget. Highly recommended!</p>
                            </div>
                        </div>
                        <div className="card w-96 bg-base-100 card-lg shadow-sm">
                            <div className="card-body">
                                <h2 className="card-title">Shafiq Kaji</h2>
                                <div className="rating">
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="1 star" />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="2 star"  />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="3 star" />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="4 star" />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="5 star" defaultChecked />
                                </div>
                                
                                <p>Great selection of cars at reasonable prices. The staff was friendly and knowledgeable, though the paperwork process took longer than expected. Overall, a good experience!</p>
                            </div>
                        </div>
                        <div className="card w-96 bg-base-100 card-lg shadow-sm">
                            <div className="card-body">
                                <h2 className="card-title">Hasina Minu</h2>
                                <div className="rating">
                                    <input type="radio" name="rating-3" className="mask mask-star-2 bg-orange-400" aria-label="1 star" />
                                    <input type="radio" name="rating-3" className="mask mask-star-2 bg-orange-400" aria-label="2 star"  />
                                    <input type="radio" name="rating-3" className="mask mask-star-2 bg-orange-400" aria-label="3 star" />
                                    <input type="radio" name="rating-3" className="mask mask-star-2 bg-orange-400" aria-label="4 star" />
                                    <input type="radio" name="rating-3" className="mask mask-star-2 bg-orange-400" aria-label="5 star" defaultChecked/>
                                </div>
                                
                                <p>The car quality is decent, but I had some issues with after-sales service. They took a bit too long to respond to my concerns. Hoping for better support in the future!</p>
                            </div>
                        </div>
                        <div className="card w-96 bg-base-100 card-lg shadow-sm">
                            <div className="card-body">
                                <h2 className="card-title">Abul Hayder</h2>
                                <div className="rating">
                                    <input type="radio" name="rating-4" className="mask mask-star-2 bg-orange-400" aria-label="1 star" />
                                    <input type="radio" name="rating-4" className="mask mask-star-2 bg-orange-400" aria-label="2 star"  />
                                    <input type="radio" name="rating-4" className="mask mask-star-2 bg-orange-400" aria-label="3 star" />
                                    <input type="radio" name="rating-4" className="mask mask-star-2 bg-orange-400" aria-label="4 star" />
                                    <input type="radio" name="rating-4" className="mask mask-star-2 bg-orange-400" aria-label="5 star" checked />
                                </div>
                                
                                <p>Found a car I loved, but the financing options were limited. The staff wasn’t very transparent about hidden fees. Wouldn’t recommend for first-time buyers.</p>
                            </div>
                        </div>

                    </div>
                    <div onClick={handleWide} className={isWide ? "hidden" : "text-4xl text-blue-500 hover:text-green-500"}>
                        <FaRegArrowAltCircleRight />
                    </div>
                </div>
            </section>
            
            <div data-aos="fade-up">
            <section className='w-full bg-yellow-300 p-8 flex gap-16 items-center'>
               <div>
               <h1 className='text-2xl'>We Have <b>Recommendations</b> for you</h1>
               <p>Take 50% off when you spend $500 or more with code CARHUB25</p>     
               </div>
               <div>
                <button className='btn bg-neutral rounded-full text-white p-4'>Dicover Now!</button>
               </div>
               <div>
               </div>
            </section>
            </div>
            
        </div>
    );
};

export default Home;