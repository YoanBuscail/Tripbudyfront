import axios from "axios";
import { useState, useEffect } from "react";
import "./UserInfo.css"
import ActionButton from "../actionButtonProfile/ActionButtonProfile";
import { useNavigate } from "react-router-dom";

function UserInfo({ userData }) {
    const [user, setUser] = useState({
        lastname: 'Prénom' ,
        firstname: 'Nom',
        email: 'Email'
    });
    const [isEditing, setIsEditing] = useState(false)
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userData'); 
        navigate('/');
    };

    useEffect(() => {
        console.log('userdata dans user' ,user)
    
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');  // Récupérez le token du localStorage
                const response = await axios.get(`http://tripbuddy.sc3wect2718.universe.wf/api/users/${userData.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`  // Incluez le token dans l'en-tête Authorization
                    }
                });
                const fetchedUser = response.data;
                console.log(fetchedUser.lastname);
                setUser({
                    lastname: fetchedUser.lastname ,
                    firstname: fetchedUser.firstname,
                    email: fetchedUser.email 
                });
            } catch (error) {
                console.error("Une erreur est survenue lors de la récupération du profil utilisateur.", error);
            }
        };
        
        if(userData.id) fetchUserProfile();  // Appelez la fonction pour récupérer le profil utilisateur
    }, []);
        
    return (
        
        <div className="user-info-container">
            <div className="info-container">
                {isEditing ? (
                    <>
                        <div className="info-container">
                            <label>Nom: 
                                <input type="text" value={user.lastname} onChange={(e) => setUser({...user, nom: e.target.value})} />
                            </label>
                            <label>Prenom: 
                                <input type="text" value={user.firstname} onChange={(e) => setUser({...user, prenom: e.target.value})} />
                            </label>
                            <label>Email: 
                                <input type="email" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} />
                            </label>
                        </div>
                        <div className="button-profile-container">
                            <button className="button-profile user-info-button"  onClick={() => setIsEditing(false)}>Valider</button>
                            <ActionButton className="button-profile logout-button " label="Déconnexion" onClick={handleLogout} />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="info-container">
                            <p>Nom: {user.lastname}</p>
                            <p>Prenom: {user.firstname}</p>
                            <p>Email: {user.email}</p>
                        </div>
                        <div className="button-profile-container">
                            <button className="button-profile user-info-button" onClick={() => setIsEditing(true)}>Modifier</button>
                            <ActionButton className="button-profile logout-button" label="Déconnexion" onClick={handleLogout} />
                        </div>
                    </>
                )}

                
            </div>
        </div>
    );
}

export default UserInfo;