import { useForm, type SubmitHandler } from "react-hook-form";
import { createUser } from '../../store/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from "../../store";
import { useState } from "react";

type Inputs = {
    name: string
    email: string
    password: string
    phone: string
    role: string
}

const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();
    const dispatch = useDispatch<AppDispatch>();
    
    const { loading, error } = useSelector((state: any) => state.auth);

    const [registerError, setRegisterError] = useState('');

    const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
        const res = await dispatch(createUser(data));
        if(res.meta.requestStatus === 'fulfilled') {
            console.log(res.payload);
        }else{
            setRegisterError(res.payload.error);
        }
    }
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Crie sua conta agora!</h1>
                    <p className="py-6">
                        Crie sua conta e tenha acesso ao nosso sistema de agendamento online.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <fieldset className="fieldset">
                                <label className="label">Nome</label>
                                <input type="text" className="input" placeholder="Nome" {...register("name", { required: true })} />
                                {errors.name && <span className="text-red-600">Este campo é obrigatório</span>}

                                <label className="label">Telefone</label>
                                <input type="text" className="input" placeholder="Telefone" {...register("phone", { required: true })} />
                                {errors.name && <span className="text-red-600">Este campo é obrigatório</span>}

                                <label className="label">Tipo de Conta</label>
                                <select id="" {...register("role", { required: true })} className="input">
                                    <option value="CLIENT">Cliente</option>
                                    <option value="EMPLOYEE">Profissional</option>
                                </select>
                                {errors.name && <span className="text-red-600">Este campo é obrigatório</span>}

                                <label className="label">E-mail</label>
                                <input type="email" className="input" placeholder="E-mail" {...register("email", { required: true })} />
                                {errors.email && <span className="text-red-600">Este campo é obrigatório</span>}

                                <label className="label">Senha</label>
                                <input type="password" className="input" placeholder="Senha" {...register("password", { required: true })} />
                                {errors.password && <span className="text-red-600">Este campo é obrigatório</span>}

                                <button className="btn btn-neutral mt-4" disabled={loading}>{loading ? 'Carregando...' : 'Criar Conta'}</button>

                                {error && <span className="text-red-600">{error}</span>}
                                {registerError && <span className="text-red-600">{registerError}</span>}

                                <div className="flex justify-between">
                                    <a className="link link-hover">Esqueceu sua senha?</a>
                                    <a href="/login">Faça login</a>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterForm;