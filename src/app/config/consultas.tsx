import {db} from"./firebase"
//import { Firestore } from "firebase/firestore";
import { Firestore } from "firebase/firestore";
import { Timestamp, collection, doc, getDocs } from 'firebase/firestore/lite';
import { query, where } from "firebase/firestore";


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
export async function fetchRoutesFromDataBase(db: Firestore, { params: { id },selectedDate , firstLoad }:any) {
    try {
        console.log(firstLoad)
        //const { id, selectedDate } = params;
        const fechaDada = new Date(selectedDate);
        
        //const fecha = timestamp.toDate();

        //console.log(fecha);
        console.log('EStoy desde la consulta')
        console.log(fechaDada)
        console.log('EStoy desde la consulta')
        const userDocRef = doc(db, "usuarios", id);
        const routesCollectionRef = await getDocs(collection(userDocRef, "routes"));

        const routes = routesCollectionRef.docs.map((doc) => {
            const data = doc.data();
            const createdAtTimestamp = data.createdAt; // Suponiendo que createdAt es el campo donde tienes el Timestamp
            const createdAtDate = createdAtTimestamp.toDate();
          
            // Extraer año, mes y día de cada fecha
            const año1 = fechaDada.getFullYear();
            const mes1 = fechaDada.getMonth();
            const dia1 = fechaDada.getDate();
          
            const año2 = createdAtDate.getFullYear();
            const mes2 = createdAtDate.getMonth();
            const dia2 = createdAtDate.getDate();
          
            // Comparar las fechas
            const sonIguales = año1 === año2 && mes1 === mes2 && dia1 === dia2;
            return {id: doc.id, ...data, sonIguales: sonIguales };
            
          });

        console.log(routes);
        //return routes;
        const rutasCoincidentes = routes.filter(route => route.sonIguales);
        console.log(rutasCoincidentes)
        // Si hay rutas coincidentes, tomar todos los datos
        if (rutasCoincidentes.length > 0) {
            return rutasCoincidentes;
        }
        // Obtener la fecha más reciente entre todas las fechas de creación
        if(firstLoad){
            const fechaMasReciente = new Date(Math.max(...routes.map(item => item.createdAt.seconds * 1000))); // Multiplicamos por 1000 para convertir los segundos en milisegundos
        
        // Filtrar los objetos que tienen la misma fecha (mismo día, mes y año) que la fecha más reciente
            const objetosFiltrados = routes.filter(item => {
            const createdAt = item.createdAt.toDate(); // Convertir el Timestamp a objeto Date
            
            // Comparar el día, mes y año
            return (
                createdAt.getDate() === fechaMasReciente.getDate() &&
                createdAt.getMonth() === fechaMasReciente.getMonth() &&
                createdAt.getFullYear() === fechaMasReciente.getFullYear()
            );
            });
        
            console.log(objetosFiltrados);
            console.log(objetosFiltrados)


            console.log("la fecha mas alta es:",fechaMasReciente )
            //console.log( [routes[routes.length - 2]])

            // Si no hay rutas coincidentes, devolver todos los datos de todas las rutas de la última fecha registrada
            return objetosFiltrados;}
            
        return [];

    } catch (error) {
        console.error("Error fetching routes:", error);
        throw error;
    }
}