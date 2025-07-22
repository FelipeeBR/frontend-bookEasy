import ProfileForm from "../../components/Forms/ProfileForm";
import Navbar from "../../components/Navbar/Navbar";

const UserPage = () => {
  return (
    <div>
        <Navbar/>
        <div className="hero max-w-1/2 m-auto">
            <div>
                <h3 className="text-3xl flex items-center justify-center mb-3">Dados do usuário</h3>
                <ProfileForm/>
            </div>
        </div>
    </div>
  )
}

export default UserPage;