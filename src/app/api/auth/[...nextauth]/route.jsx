import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/app/config/firebase";
import {fetchUsersAdministrativosFromDataBase} from '../../../config/consultas';
//

const authOptions =     {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials:{
                email: {label:'Email',type:'text',placeholder:'Nixon'},
                password: {label:'Password', type:'password' , placeholder:'******'}    
            },
            async authorize(credentials, req) {
                const userFound = await fetchUsersAdministrativosFromDataBase(db);
                const user = userFound.find(user => user.email === credentials.email);
                if(!user) return null;
                const acceso = user.password === credentials.password
                if (!acceso) return null;  
                
                return {
                    id : user.id,
                    name: user.nombre,
                    email: user.email
                };
            }
        })
    ], 
    pages: {
        signIn: '/login', // Displays signin page at /signin
      },
        // OAuth authentication providers...

}
const handle = NextAuth(authOptions)
export {handle as GET, handle as POST};