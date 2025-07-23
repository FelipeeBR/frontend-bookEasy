import Navbar from "../../components/Navbar/Navbar";
import { useDispatch } from 'react-redux';
import type { AppDispatch } from "../../store";
import { getService } from "../../store/serviceSlice";
import { useEffect, useState } from "react";

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
                                <p className="text-gray-600">{service.description}</p>
                                <div className="justify-end card-actions">
                                    <button className="btn btn-success">Adicionar horário</button>
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