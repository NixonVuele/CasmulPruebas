'use client';
import { Card, Title, Text } from '@tremor/react';
import { useState,useEffect, use } from 'react';
import { db } from '../config/firebase'
import DataTable from 'react-data-table-component';
import { fetchRoutesFromDataBase, fetchUsersFromDataBase } from '../config/consultas'
import { Table } from 'flowbite-react';
import Link from 'next/link';
function TableUsers() {
  const [users, setUsers] = useState([]);
  const [loadingData, setLoadingData] = useState(true); // Estado para controlar si se están cargando los datos

  const columns = [
    {
      name: "Nombre",
      selector: (row) => row.nombre,
      sortable: true,
    },
    {
      name: "Grupo",
      selector: (row) => row.grupo,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Rutas",
      selector: (row) => (
        <Link href={`/map/${row.id}`} className='Btn bg-[#7A6F6A]'>
        Ver rutas
      </Link>
      
      ),
      sortable: true,
    },
  ];
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
 
      // setRecords(users);
      setLoading(false);
  }, []);
  
  const fetchData = async () => {
    try {
      const usersData = await fetchUsersFromDataBase(db);
      setRecords(usersData);
      setUsers(usersData);
      setLoadingData(false); // Marcar como cargados los datos
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (loadingData) { // Solo cargar datos si aún no se han cargado
      fetchData();
    }
  }, [loadingData]); // Eje

  const handleChange = (e) => {
    const filteredRecords = users.filter((record) => {
      return record.nombre.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setRecords(filteredRecords);
  };

  function Loader() {
    return <div>
      <h1 className='text-center'>Cargando ...</h1>
    </div>
  }

  return (
    <div className="w-full max-w-5xl mx-auto my-4">
      <input
        type="text"
        onChange={handleChange}
        className="w-full px-4 py-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500 transition-colors duration-300"
        placeholder="Buscar usuario..."
      />

      <DataTable
        title="Datos de Usuario"
        columns={columns}
        data={records}
        pagination
        onSelectedRowsChange={(data) => console.log(data)}
        fixedHeader
        progressPending={loading}
        progressComponent={<Loader />}
        className="rounded-lg shadow-lg"
        paginationPerPage={5}
        noDataComponent={<div className="p-4 text-gray-500 rounded-md">No hay datos disponibles.</div>}
      />
    </div>
  );
};

export default TableUsers;