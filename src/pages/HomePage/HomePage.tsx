import Navbar from "../../components/Navbar/Navbar";
import { useDispatch } from 'react-redux';
import type { AppDispatch } from "../../store";
import { getServices } from "../../store/serviceSlice";
import { useEffect, useState } from "react";
import { getUser } from "../../store/userSlice";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [services, setServices] = useState<any>({ services: [] });

  const [isEmployee, setIsEmployee] = useState<boolean>(false);
  const [isCustomer, setIsCustomer] = useState<boolean>(false);
  const [createService, setCreateService] = useState<boolean>(false);

  useEffect(() => {
    const services = async () => {
      const services = await dispatch(getServices());
      setServices(services.payload);
    }
    services();
  }, [dispatch]);

  useEffect(() => {
    const checkUser = async () => {
      const result = await dispatch(getUser());
      if(result.meta.requestStatus === 'fulfilled') {
        const data = result.payload;
        console.log(data);
        if(data && data.user.employee !== null) {
          setCreateService(true);
        } else if(data && data.user.customer === null) {
          setIsCustomer(true);
        } else if(data && data.user.role === 'EMPLOYEE') {
          setIsEmployee(true);
        }
      }
    };
    checkUser();
  }, [dispatch]);

  return (
    <div>
      <Navbar/>
      <h1 className="text-3xl flex items-center justify-center mb-3">Bem-vindo ao Book Easy</h1>
      <div className="flex items-center justify-end m-3">
        { createService && <a href="/create-service" className="btn btn-success">Divulgar Serviços</a> }
        { isEmployee && <a href="/create-employee" className="btn btn-success">Adicione sua profissão</a> }
        { isCustomer && <a href="/create-client" className="btn btn-success">Adicionar dados de cliente</a> }
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-3">
        {Array.isArray(services.services) ? (
          services.services.map((service: any) => (
            <div key={service.id} className="card w-96 bg-base-100 card-lg shadow-sm">
              <div className="card-body">
                <h2 className="card-title">{service.name}</h2>
                <p>{service.description}</p>
                <p className="text-xl text-green-500">R$ {service.price}</p>
                <div className="justify-end card-actions">
                  <a className="btn btn-success" href={`/service/${service.id}`}>Mais Informações</a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhum serviço disponível.</p>
        )}
      </div>
    </div>
  )
}

export default HomePage;