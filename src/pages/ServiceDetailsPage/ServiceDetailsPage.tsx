import Navbar from "../../components/Navbar/Navbar";
import { useDispatch } from 'react-redux';
import type { AppDispatch } from "../../store";
import { getServiceId } from "../../store/serviceSlice";
import { useEffect, useState } from "react";
import {format} from "date-fns";
import { type SubmitHandler } from "react-hook-form";
import { useParams } from 'react-router-dom';
import { getCustomer } from "../../store/userSlice";
import { createScheduling } from "../../store/schedulingSlice";

type User = {
    user: {
        email: string
        name: string
        password: string
        phone: string
        role: string
    }
}

const ServiceDetailsPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [service, setService] = useState<any>({ services: [] });
    const [user, setUser] = useState<User>();

    const { id } = useParams();

    useEffect(() => {
        const service = async () => {
            /* @ts-ignore */
            const service = await dispatch(getServiceId(id));
            setService(service.payload);
        }
        service();
    },[dispatch]);

    useEffect(() => {
        const user = async () => {
            const user = await dispatch(getCustomer());
            setUser(user.payload);
        }
        user();
    }, [dispatch]);

    const onSubmit: SubmitHandler<any> = async (data: any) => {
        const res = await dispatch(createScheduling(data));
        if(res.meta.requestStatus === 'fulfilled') {
            console.log(res.payload);
        }
    }

    return (
        <div>
            <Navbar/>
            <h1 className="text-3xl flex items-center justify-center m-3">{service.service?.name}</h1>
            <div className="hero flex flex-col bg-gray-100 p-3 rounded">
                <div className="hero-content flex flex-col">
                    <h3>{service.service?.description}</h3>
                    <p>Horarios disponiveis:</p>
                    <div className="flex flex-col gap-2">
                        {
                            Array.isArray(service.service?.time) && service.service?.time.map((time: any) => (
                                <div className="flex flex-row bg-green-200 p-3 rounded gap-2">
                                    <p>{format(time.startTime, 'dd/MM/yyyy HH:mm')}</p>
                                    {
                                        user &&
                                        /* @ts-ignore */
                                        <button onClick={() => onSubmit({ status: "SCHEDULED", serviceId: id, timeId: time.id, customerId: user?.customer?.id })} className="btn btn-primary">Agendar</button>
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default ServiceDetailsPage;