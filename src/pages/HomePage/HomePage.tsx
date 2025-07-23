import Navbar from "../../components/Navbar/Navbar";
import { useDispatch } from 'react-redux';
import type { AppDispatch } from "../../store";
import { getServices } from "../../store/serviceSlice";
import { useEffect, useState } from "react";
import { getEmployee } from "../../store/employeeSlice";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [services, setServices] = useState<any>({ services: [] });

  const [isEmployee, setIsEmployee] = useState<boolean>(false);

  useEffect(() => {
    const services = async () => {
      const services = await dispatch(getServices());
      setServices(services.payload);
    }
    services();
  }, [dispatch]);

  useEffect(() => {
    const checkEmployee = async () => {
      const result = await dispatch(getEmployee());
      if(result.meta.requestStatus === 'fulfilled') {
        const data = result.payload;
        if(data && data.employee && data.employee.id) {
          setIsEmployee(true);
        } else {
          setIsEmployee(false);
        }
      }
    };
    checkEmployee();
  }, [dispatch]);

  return (
    <div>
      <Navbar/>
      <h1 className="text-3xl flex items-center justify-center mb-3">Bem-vindo ao Book Easy</h1>
      <div className="flex items-center justify-end m-3">
        {
          isEmployee ? (
            <a href="/create-service" className="btn btn-success">Divulgar Serviços</a>
          ) : (
            <a href="/create-employee" className="btn btn-success">Adicione sua profissão</a>
          )
        }
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