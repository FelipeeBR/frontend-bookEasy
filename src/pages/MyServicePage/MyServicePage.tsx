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
            <div className="hero max-w-1/2 m-auto">
                <div className="text-center lg:text-left">
                    <h1 className="text-xl font-bold">Meus Serviços</h1>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                    {Array.isArray(services.services) &&
                        services.services.map((service: any) => (
                        <div
                            key={service.id}
                            className="w-full max-w-md bg-white rounded-2xl shadow-md p-6 transition-transform hover:scale-105 hover:shadow-lg"
                        >
                            <h2 className="text-xl font-semibold mb-2 text-gray-800">{service.name}</h2>
                            <p className="text-gray-600">{service.description}</p>
                            <div className="justify-end card-actions">
                                <button className="btn btn-success">Adicionar horário</button>
                            </div>
                        </div>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default MyServicePage;