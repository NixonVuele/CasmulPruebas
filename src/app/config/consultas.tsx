import {db} from"./firebase"
//import { Firestore } from "firebase/firestore";
import { Firestore } from "firebase/firestore";
import { collection, doc, getDocs } from 'firebase/firestore/lite';

// Función para recuperar usuarios de la base de datosf
export async function fetchUsersFromDataBase(db: Firestore) {
    try {
        const usersQuerySnapshot = await getDocs(collection(db, "usuarios"));
        const users = usersQuerySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        return users;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error; // Re-lanzar el error para manejarlo donde se llame a esta función
    }
}

export async function fetchUsersAdministrativosFromDataBase(db: Firestore) {
    try {
        const usersQuerySnapshot = await getDocs(collection(db, "usuariosAdministrativos"));
        const users = usersQuerySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        return users;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error; // Re-lanzar el error para manejarlo donde se llame a esta función
    }
}

// Función para recuperar las rutas de un solo usuario de la base de datos
export async function fetchRoutesFromDataBase(db: Firestore, { params: { id, otroCampo } }:any) {
    try {
        const userDocRef = doc(db, "usuarios", id);
        const routesCollectionRef = await getDocs(collection(userDocRef, "routes"));
        const routes = routesCollectionRef.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        console.log(routes);
        return routes;

    } catch (error) {
        console.error("Error fetching routes:", error);
        throw error;
    }
}