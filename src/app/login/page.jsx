'use client'
import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import as from  "../../../public/fondo1.png";
import Image from 'next/image';
import {signIn} from 'next-auth/react'
import { useRouter } from 'next/navigation'
import logCas from '../../../public/casmulLogin.png'

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Aquí puedes agregar la lógica para autenticar al usuario con tu backend
    console.log('Correo electrónico:', email);
    console.log('Contraseña:', password);
    const res = await signIn("credentials", {
      email:email,
      password:password,
      redirect: false
    });
    console.log(res);
    if(res.error){
        alert(res.error);
    }else{
      router.push('/usuarios')
    }

    // Limpia los campos después de enviar el formulario
    //setEmail('');
    //setPassword('');
  };

  return (
    <>
      <Image src={as} layout='fill' sizes="100vw" style={{backgroundImage: `url({background})`,objectFit: 'cover',zIndex: -1 }}	 alt="Picture of the author" />
 
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image 
          src={logCas}   
          width={300}
          height={300} 
          alt="logoCasmul" 
          className="mx-auto"/>
          <h2 className="mt-10 text-center text-2xl font-normal leading-9 tracking-tight text-gray-900">
            Iniciar sesión
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Correo electrónico
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Contraseña
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Iniciar Sesión
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Admin Casmull
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
