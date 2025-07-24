import Navbar from "../../components/Navbar/Navbar";
import { useDispatch } from 'react-redux';
import type { AppDispatch } from "../../store";
import { useForm, type SubmitHandler } from "react-hook-form";
import { createCustomer } from "../../store/userSlice";

type Customer = {
    cpf: string;
    dataNasc: string;
    endereco: string;
}
const CustomerPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { register, handleSubmit, formState: { errors } } = useForm<Customer>();

    const onSubmit: SubmitHandler<Customer> = async (data: any) => {
        const res = await dispatch(createCustomer(data));
        if(res.meta.requestStatus === 'fulfilled') {
            console.log(res.payload);
        }
    }
    return (
        <div>
            <Navbar/>
            <div className="hero max-w-1/2 m-auto">
                <div>
                    <h3 className="text-3xl flex items-center justify-center mb-3">Dados de Cliente</h3>
                    <div className="card bg-base-100 w-96 shadow-sm">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="card-body">
                                <label className="label">CPF</label>
                                <input type="text" placeholder="CPF" className="input input-bordered" {...register("cpf", { required: true })}/>
                                {errors.cpf && <span className="text-red-500">Campo obrigatório</span>}
                                <label className="label">Data de Nascimento</label>
                                <input type="date" placeholder="Data de Nascimento" className="input input-bordered" {...register("dataNasc", { required: true })}/>
                                {errors.dataNasc && <span className="text-red-500">Campo obrigatório</span>}
                                <label className="label">Endereço</label>
                                <input type="text" placeholder="Endereço" className="input input-bordered" {...register("endereco", { required: true })}/>
                                {errors.endereco && <span className="text-red-500">Campo obrigatório</span>}

                                <div className="card-actions justify-end">
                                    <button type="submit" className="btn btn-primary">Salvar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerPage;