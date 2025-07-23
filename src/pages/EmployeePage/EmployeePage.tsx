import Navbar from "../../components/Navbar/Navbar";
import { useDispatch } from 'react-redux';
import type { AppDispatch } from "../../store";
import { useForm, type SubmitHandler } from "react-hook-form";
import { createEmployee } from "../../store/employeeSlice";
import { useNavigate } from "react-router-dom";

type Employee = {
    specialization: string
}

const EmployeePage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Employee>();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<Employee> = async (data: any) => {
        const res = await dispatch(createEmployee(data));
        if(res.meta.requestStatus === 'fulfilled') {
            navigate('/home');
        }
    }

    return (
        <div>
            <Navbar/>
            <div className="hero max-w-1/2 m-auto">
                <div>
                    <h3 className="text-3xl flex items-center justify-center mb-3">Dados do empregado</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                        <div className="form-control w-full max-w-xs">
                            <label className="label">Especialização</label>
                            <input type="text" placeholder="Especialização" className="input input-bordered" {...register("specialization", { required: true })}/>
                            {errors.specialization && <span className="text-red-500">Campo obrigatório</span>}
                        </div>
                        <button type="submit" className="btn btn-primary">Salvar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EmployeePage;