import { FaCircleUser } from "react-icons/fa6";

const Navbar = () => {
    return (
        <div className="navbar bg-blue-500 shadow-sm">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl text-white">Book Easy</a>
            </div>
            <div className="flex gap-2">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <FaCircleUser size={30} color="white"/>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li><a className="justify-between" href="/profile">Perfil</a></li>
                        <li><a>Sair</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar;