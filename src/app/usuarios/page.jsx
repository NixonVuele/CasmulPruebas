'use client';
import { Card, Title, Text } from '@tremor/react';
import { useState,useEffect, use } from 'react';
import { db } from '../config/firebase'
import {fetchRoutesFromDataBase, fetchUsersFromDataBase} from '../config/consultas'
import { Table } from 'flowbite-react';
import Link from 'next/link';

export default function Component() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para controlar si se están cargando los datos

  const fetchData = async () => {
    try {
      const usersData = await fetchUsersFromDataBase(db);
      setUsers(usersData);
      setLoading(false); // Marcar como cargados los datos
      console.log(usersData); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (loading) { // Solo cargar datos si aún no se han cargado
      fetchData();
    }
  }, [loading]); // Ejecutar solo cuando el estado de carga cambie

  return (
    <div className="overflow-x-auto">
      <Title>Users</Title>
      <Text>Usuarios a cargo de Adultos Mayores</Text>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Nombre</Table.HeadCell>
          <Table.HeadCell>Grupo</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Rutas</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {users.map((user) => (
            <Table.Row key={user.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {user.nombre}
              </Table.Cell>
              <Table.Cell>{user.grupo}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>
                <Link href={`/map/${user.id}`} className='Btn'>
                  Edit
                </Link>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
