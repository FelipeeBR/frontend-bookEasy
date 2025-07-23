import Navbar from "../../components/Navbar/Navbar";
import { useDispatch } from 'react-redux';
import type { AppDispatch } from "../../store";
import { getService } from "../../store/serviceSlice";
import { useEffect, useState } from "react";
import {format} from "date-fns";
import { type SubmitHandler } from "react-hook-form";

const MyServicePage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [services, setServices] = useState<any>({ services: [] });

    useEffect(() => {
        const service = async () => {
            const service = await dispatch(getService());
            setServices(service.payload);
        }
        service();
    },[dispatch]);

    const onSubmit: SubmitHandler<any> = async (data: any) => {
        console.log(data);
    }

    return (
        <div>
            <Navbar/>
            <div className="flex flex-col items-center justify-center">
                <div className="text-center lg:text-left">
                    <h1 className="text-3xl flex items-center justify-center mb-3">Meus Serviços</h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-3">
                    {Array.isArray(services.services) &&
                        services.services.map((service: any) => (
                        <div key={service.id} className="card w-96 bg-base-100 card-lg shadow-sm">
                            <div className="card-body">
                                <h2 className="card-title">{service.name}</h2>
                                <h4>Duração: {service.duration} horas</h4>
                                <p className="text-gray-600">{service.description}</p>
                                <div className="flex flex-col overflow-auto max-h-52 gap-2">
                                    {
                                        Array.isArray(service.time) && service.time.map((time: any) => (
                                            <div className="flex flex-row card w-80 bg-base-200 card-lg shadow-sm gap-2 p-2">
                                                <p key={time.id}>{format(time.startTime, 'dd/MM/yyyy HH:mm')}</p>
                                                <button onClick={()=> {onSubmit({timeId: time.id})}} className="btn btn-error">Excluir</button>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="justify-end card-actions">
                                    <a className="btn btn-success" href={`/service-time/${service.id}`}>Adicionar horário</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MyServicePage;