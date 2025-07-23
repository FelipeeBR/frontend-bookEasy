import { useDispatch } from 'react-redux';
import type { AppDispatch } from "../../store";
import { createService } from '../../store/serviceSlice';
import { useForm, type SubmitHandler } from "react-hook-form";
import Navbar from '../../components/Navbar/Navbar';

const ServicePage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { register, handleSubmit, formState: { errors } } = useForm<any>();

    const onSubmit: SubmitHandler<any> = async (data: any) => {
        console.log(data);
    }

    return (
        <div>
            <Navbar/>
            <div className="hero max-w-1/2 m-auto">
                <div>
                    <h3 className="text-3xl flex items-center justify-center mb-3">Adicionar novo serviço</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <fieldset className="fieldset">
                            <label className="label">Nome</label>
                            <input type="text" placeholder="Nome" className="input input-bordered" {...register("name", { required: true })}/>
                        </fieldset>
                        <fieldset className="fieldset">
                            <label className="label">Duração (Horas)</label>
                            <input type="number" placeholder="Duração" className="input input-bordered" {...register("duration", { required: true })}/>
                        </fieldset>
                        <fieldset className="fieldset">
                            <label className="label">Preço</label>
                            <input type="text" placeholder="Preço" className="input input-bordered" {...register("price", { required: true })}/>
                        </fieldset>
                        <fieldset className="fieldset">
                            <label className="label">Descrição</label>
                            <input type="text" placeholder="Descrição" className="input input-bordered" {...register("description", { required: true })}/>
                        </fieldset>
                        <button type="submit" className="btn btn-success">Adicionar</button>
                    </form>
                </div>
            </div>
    </div>
    )
}

export default ServicePage;