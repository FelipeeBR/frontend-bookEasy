import { useForm, type SubmitHandler } from "react-hook-form";
import { fetchUser } from "../../store/authSlice";
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from "../../store";
import { useNavigate } from 'react-router-dom';

type Inputs = {
  email: string
  password: string
}

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();
    const dispatch = useDispatch<AppDispatch>();

    const { loading, error } = useSelector((state: any) => state.auth);

    const navigate = useNavigate();

    const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
        const res = await dispatch(fetchUser(data));
        if(res.meta.requestStatus === 'fulfilled') {
            navigate('/home');
        }else{
            console.log(res.payload);
        }
    }
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Entre agora!</h1>
                    <p className="py-6">
                        Faça login e tenha acesso ao nosso sistema de agendamento online.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <fieldset className="fieldset">
                                <label className="label">E-mail</label>
                                <input type="email" className="input" placeholder="E-mail" {...register("email", { required: true })} />
                                {errors.email && <span className="text-red-600">Este campo é obrigatório</span>}
                                <label className="label">Senha</label>
                                <input type="password" className="input" placeholder="Senha" {...register("password", { required: true })} />
                                {errors.password && <span className="text-red-600">Este campo é obrigatório</span>}
                                <button className="btn btn-neutral mt-4" disabled={loading}>{loading ? 'Carregando...' : 'Login'}</button>
                                {error && <span className="text-red-600">{error}</span>}
                                <div className="flex justify-between">
                                    <a className="link link-hover">Esqueceu sua senha?</a>
                                    <a href="/register">Crie sua conta</a>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginForm