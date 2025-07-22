import { FaUser, FaLock, FaEnvelope, FaPhoneAlt, FaUserLock } from "react-icons/fa";

const ProfileForm = () => {
    return (
        <div className="card bg-base-100 w-96 shadow-sm">
            <div className="card-body">
                <label className="input validator">
                    <FaUser size={15} color="black"/>  
                    <input type="text" placeholder="Nome" className="" />
                </label>
                
                <label className="input validator">
                    <FaEnvelope size={15} color="black"/>  
                    <input type="email" placeholder="E-mail" className="" />
                </label>

                <label className="input validator">
                    <FaLock size={15} color="black"/>  
                    <input type="password" placeholder="Senha" className="" />
                </label>

                <label className="input validator">
                    <FaPhoneAlt size={15} color="black"/>  
                    <input type="text" placeholder="Telefone" className="" />
                </label>

                <label className="input validator">
                    <FaUserLock size={15} color="black"/>  
                    <input type="text" placeholder="Tipo Conta" className="" />
                </label>

                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Alterar Dados</button>
                </div>
            </div>
        </div>
    )
}

export default ProfileForm