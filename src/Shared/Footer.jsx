import React from 'react';
import { Link } from 'react-router-dom';

const Footer = (props) => {
    const handleRunning=()=>{
        const element = document.getElementById("running");
        element.scrollIntoView()
    }
    const handleHome=()=>{
        const element = document.getElementById("home");
        element.scrollIntoView()
    }
    return (
        <div>
            <div className='mt-4 pt-4 border-t-2 border-black bg-black'>
                <h1 className="font-bold text-4xl text-center text-blue-500 ">CarHub</h1>
                <p className="text-gray-400 text-center">FIX YOUR CAR EASY</p>
                <footer className="text-white flex flex-col  justify-between p-8 lg:grid grid-cols-3 gap-2 ">
                    <div>
                        <h1 className=" font-bold flex gap-2 items-center text-xl"><img src="./images/logo.webp" alt="" />About Us</h1>
                        <div className="mt-4 text-gray-400 text-left">
                            <p>Location: av. Washington 165, NY CA </p>
                            <p>54003</p>
                            <p>Phone 45123000</p>
                            <p>Email: info@yourdomain.com</p>
                            <p>Openings hours: 9.00 AM - 5.00 PM</p>
                        </div>
                    </div>
                    <div>
                        <h1 className="mb-2 font-bold text-xl">Quick Links</h1>
                        <div className="text-gray-400 flex flex-col">
                            <div><button onClick={handleHome}><h1>Home</h1></button></div>
                            
                            <div><button  onClick={handleRunning}><h1>Available Cars</h1></button></div>
                        </div>
                    </div>
                    <div>
                        <h1 className=" font-bold flex gap-2 items-center text-xl">Subscribe</h1>
                        <p className="text-gray-400 text-left">Subscribe to our newsletter for the latest updates.</p>
                        <div className='text-left mt-2'>
                            <input type="text" placeholder="Enter your name" className="mt-2 bg-zinc-800 p-2 rounded-l-lg" />
                            <button className="mt-2 p-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-r-lg">Subscribe</button>
                        </div>
                    </div>
                </footer>

                <div>
                    <p className="text-center text-gray-400 border-t p-2">© 2021 Your Company. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;