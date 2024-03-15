'use client'
import React, { useState, useEffect } from 'react';
import { Sidebar } from 'flowbite-react';
import { BiBuoy } from 'react-icons/bi';
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from 'react-icons/hi';
import Mapa from './mapa';
import { fetchRoutesFromDataBase } from '@/app/config/consultas';
import { db } from '../../config/firebase';
import dynamic from "next/dynamic";
import ModalComponent from './Modal'

// Componente: HeroLocation

export default function Rutas({ params }) {
  console.log(params);
  const [users, setUsers] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Estado para almacenar la fecha seleccionada
  const [selectedUserId, setSelectedUserId] = useState(null); // Estado para almacenar el id del usuario seleccionado
  const [firstLoad, setFirstLoad] = useState(true); // Estado para determinar si es la primera carga


  const fetchData = async () => {
    try {
      const formattedDate = selectedDate.toISOString(); // Convertir a formato ISO
      const usersData = await fetchRoutesFromDataBase(db, { params, selectedDate: formattedDate , firstLoad:firstLoad });
      const usersDataArray = Array.isArray(usersData) ? usersData : [usersData];
      if (Array.isArray(usersData) && usersData.length === 0) {
        setUsers(usersData)
      }
      if (usersData && usersData[0].createdAt) {
        const fechaUnica = usersData[0].createdAt.toDate(); // Tomamos la primera fecha de la lista
        if (fechaUnica.getTime() !== selectedDate.getTime()) {
          setSelectedDate(fechaUnica);
          //firstLoad(false);
        }
      }
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedDate]);

  useEffect(() => {
    if (users && users.length > 0) {
      setSelectedUserId(users[0].id);
       // Asignar el primer ID por defecto
    }
  }, [users]);

  const handleDateChange = (event) => {
    const selectedDateString = event.target.value;
    const [year, month, day] = selectedDateString.split('-');
    const selectedDate = new Date(year, month - 1, day); // Restamos 1 al mes ya que los meses en JavaScript son base 0
    setSelectedDate(selectedDate);
    setFirstLoad(false);
  };
  

  const handleUserClick = (userId) => {
    // Establecer el id del usuario seleccionado
    setSelectedUserId(userId);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar aria-label="Sidebar with content separator example">
      <Sidebar.Items>
          <input type="date" value={selectedDate.toISOString().split('T')[0]} onChange={handleDateChange} />
          <Sidebar.ItemGroup>
            {users && users.map(user => (
              <Sidebar.Item key={user.id} onClick={() => handleUserClick(user.id)} icon={HiUser}>
                {user.id}
              </Sidebar.Item>
            ))}
            {users.length === 0 && (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50px' }}>
                <h4>Sin rutas registradas</h4>
              </div>
            )}
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
      <div style={{ overflow: 'hidden' }}>
        {/* Verifica si no hay usuarios disponibles */}
        {(!users || users.length === 0 || !selectedUserId) && <ModalComponent />}
        {selectedUserId && <Mapa users={users} selectedUserId={selectedUserId}></Mapa>}  
      </div>
      </div>
  );
}
