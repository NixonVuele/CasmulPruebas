import {db} from"./firebase"
//import { Firestore } from "firebase/firestore";
import { Firestore } from "firebase/firestore";
import { collection, getDocs } from 'firebase/firestore/lite';

// Función para recuperar usuarios de la base de datosf
export async function fetchUsersFromDataBase(db: Firestore) {
    try {
        const usersQuerySnapshot = await getDocs(collection(db, "users"));
        const users = usersQuerySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        return users;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error; // Re-lanzar el error para manejarlo donde se llame a esta función
    }
}

// Función para recuperar las rutas de un solo usuario de la base de datos
export async function fetchRoutesFromDataBase(db:Firestore){
    try {
        const routesCollectionRef = await getDocs(collection(db,"/users/75rgERaHNBX2FGaiL4hJuiZsCeG3/routes"));
        const routes = routesCollectionRef.docs.map((doc) => ({ id: doc.id, ...doc.data() })); 
        return routes;  
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
}