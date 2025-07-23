import { FaCircleUser } from "react-icons/fa6";
import type { AppDispatch } from "../../store";
import { useDispatch } from 'react-redux';
import { logout } from "../../store/authSlice";

const Navbar = () => {
    const dispatch = useDispatch<AppDispatch>();

    const onSubmit = async () => {
        try {
            const result = await dispatch(logout());
            if(logout.fulfilled.match(result)) {
                console.log('Logout successful');
            } else {
                console.error('Logout failed:', result.error);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="navbar bg-blue-500 shadow-sm">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl text-white" href="/home">Book Easy</a>
            </div>
            <div className="flex-1">
                <ul className="menu menu-horizontal px-1">
                    <li><a href="/my-services" className="text-white">Meus Serviços</a></li>
                    <li><a href="/my-schedulings" className="text-white">Meus Agendamentos</a></li>
                </ul>
            </div>
            <div className="flex gap-2">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <FaCircleUser size={30} color="white"/>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <a className="justify-between" href="/profile">Perfil</a>
                        </li>
                        <li className="justify-between" onClick={onSubmit}><p>Sair</p></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar;