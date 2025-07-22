import { FaUser, FaLock, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import type { AppDispatch } from "../../store";
import { getUser } from "../../store/userSlice";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";


type Inputs = {
    name: string
    email: string
    password: string
    phone: string
}

type User = {
    user: {
        email: string
        name: string
        password: string
        phone: string
        role: string
    }
}

const ProfileForm = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [user, setUser] = useState<User>();

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    useEffect(() => {
        const user = async () => {
            const user = await dispatch(getUser());
            setUser(user.payload);
        }
        user();
    }, [dispatch]);

    const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
        console.log(data);
    }

    return (
        <div className="card bg-base-100 w-96 shadow-sm">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="card-body">
                    <label className="input validator">
                        <FaUser size={15} color="black"/>  
                        <input type="text" placeholder="Nome" className="" defaultValue={user?.user.name} {...register("name", { required: true })}/>
                    </label>
                    
                    <label className="input validator">
                        <FaEnvelope size={15} color="black"/>  
                        <input type="email" placeholder="E-mail" className="" defaultValue={user?.user.email} {...register("email", { required: true })}/>
                    </label>

                    <label className="input validator">
                        <FaLock size={15} color="black"/>  
                        <input type="password" placeholder="Senha" className=""/>
                    </label>

                    <label className="input validator">
                        <FaPhoneAlt size={15} color="black"/>  
                        <input defaultValue={user?.user.phone} {...register("phone", { required: true })}/>
                    </label>

                    <div>
                        {user?.user.role === 'CLIENT' && <span>Conta Cliente</span>}
                    </div>

                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Alterar Dados</button>
                    </div>
                </div>
            </form> 
        </div>
    )
}

export default ProfileForm