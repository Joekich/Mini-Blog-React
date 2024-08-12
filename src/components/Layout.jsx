import { Link, Outlet } from 'react-router-dom'
import 'styles/Layout.css'

const Layout = () => {
    return (
        <>
            <header className="navbar">
                <Link className='navbutton' to="/">Home</Link>
                <Link className='navbutton' to="/sort">Sort</Link>
                <Link className='navbutton' to="/add">Add</Link>
            </header >
            <Outlet />
        </>
    )
}

export { Layout }