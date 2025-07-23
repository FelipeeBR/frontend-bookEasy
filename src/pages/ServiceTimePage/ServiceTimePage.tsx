import Navbar from "../../components/Navbar/Navbar";
import { useDispatch } from 'react-redux';
import type { AppDispatch } from "../../store";
import { useForm, type SubmitHandler } from "react-hook-form";
import { createServiceTime } from "../../store/serviceSlice";
import { useParams } from 'react-router-dom';

const ServiceTimePage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<any>();
    const dispatch = useDispatch<AppDispatch>();

    const { id } = useParams();
    console.log(id);

    const onSubmit: SubmitHandler<any> = async (data: any) => {
        const res = await dispatch(createServiceTime(data));
        if(res.meta.requestStatus === 'fulfilled') {
            console.log(res.payload);
        }
    }
    return (
        <div>
            <Navbar/>
            <div className="hero max-w-1/2 m-auto">
                <div>
                    <h3 className="text-3xl flex items-center justify-center mb-3">Adicionar Data e Horario</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                        <div className="form-control w-full max-w-xs">
                            <label htmlFor="">Data e Hora</label>
                            <input type="datetime-local" placeholder="Data e Hora" className="input input-bordered" {...register("startTime", { required: true })}/>
                            {errors.date && <span className="text-red-500">Campo obrigatório</span>}
                        </div>
                        <input type="text" className="hidden" {...register("serviceId", {value: id})}/>
                        <button type="submit" className="btn btn-primary">Salvar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ServiceTimePage;