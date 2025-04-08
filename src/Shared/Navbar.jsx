import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthProvider';
import { Tooltip } from 'react-tooltip'
import logo from "../assets/carlogo.jpeg"
const Navbar = (props) => {
    const { user, logOut, setTheme, theme } = useContext(AuthContext);
    const email = user.email;

    const routes = [
        { name: "Home", path: "/",role:"user" },
        { name: "My Cars", path: `/mycar/${email}`,role:"admin" },
        { name: "My Bookings", path: `/mybookings`,role:"admin"},
        { name: "Add Cars", path: "/addcar",role:"admin"},
        { name: "Avaiable Cars", path: "/available",role:"user" }
    ]
    const handleLogOut = () => {
        logOut()
    }
    const handleTheme = () => {
        if (theme === true) {
            setTheme(false)
        } else {
            setTheme(true)
        }
    }

    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {user===""?routes.filter(r=> r.role==="user").map(r => <Link to={r.path}>{r.name}</Link>): 
                            routes.map(r => <Link to={r.path}>{r.name}</Link>)}


                        </ul>
                    </div>
                    <div className='flex items-center h-12 w-12'>
                        <img src={logo}/>
                        <a className="btn btn-ghost text-xl">CarHub</a>    
                    </div>
                    
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {user===""?routes.filter(r=> r.role==="user").map(r =>  <Link key={r.name} to={r.path}><li><button className='font-bold'>{r.name}</button></li></Link>):routes.map(r => <Link to={r.path}><li><button className='font-bold'>{r.name}</button></li></Link>)}
                    </ul>
                </div>
                <div className="navbar-end">
                    {user === "" ? <Link to={"/login"}><button className="btn font-semibold">Log In</button></Link> : <div data-tooltip-id="my-tooltip-inline" data-tooltip-content={user.displayName} className='flex flex-row items-center gap-2'> <img className='rounded-full w-[50px] h-[50px]' src={user.photoURL}></img> <button className="btn font-semibold" onClick={handleLogOut}>LogOut</button></div>}
                    <input data-tooltip-id="my-tooltip-inline"
                        data-tooltip-content="Change Theme" onClick={handleTheme} type="checkbox" defaultChecked className="ml-2 toggle border-indigo-600 bg-black text-white checked:bg-white checked:text-black checked:border-orange-500 " />
                    <Tooltip
                        id="my-tooltip-inline"
                        style={{ backgroundColor: "rgb(0, 255, 30)", color: "#222" }}
                    />

                </div>
            </div>
        </div>
    );
};

export default Navbar;