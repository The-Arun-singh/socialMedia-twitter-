import React from 'react'
import { NavLink } from 'react-router-dom'

const SideNavBar = () => {
    return (
        <div className='bg-info nav-width navigation'>
            <div className='vh-100 d-flex flex-column align-items-center justify-content-between'>
                <div className='d-flex flex-column'>
                    <h1>logo</h1>
                    <NavLink>Home</NavLink>
                    <NavLink>Profile</NavLink>
                    <NavLink>Logout</NavLink>
                </div>
                <div className='d-flex'>
                    <div><img src="" alt="" /></div>
                    <div>
                        <h5>Name</h5>
                        <p>@username</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SideNavBar