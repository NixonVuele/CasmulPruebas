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
  IoTimeOutline,
} from 'react-icons/hi';
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { IoMenu } from "react-icons/io5";

import { MdAccessTime } from "react-icons/md";
import Mapa from './mapa';
import { fetchRoutesFromDataBase } from '@/app/config/consultas';
import { db } from '../../config/firebase';
import dynamic from "next/dynamic";
import ModalComponent from './Modal'
import { CiMenuBurger } from "react-icons/ci";

import styled from 'styled-components';

const StyledSidebar = styled(Sidebar)`
  transition: width 0.3s ease;
`;

const StyledSidebarItem = styled(Sidebar.Item)`
  cursor: pointer;
  &:hover {
    background-color: #f2f2f2; /* Color de fondo al pasar el mouse sobre el ítem */
  }
  ${({ selected }) => selected && `
    background-color: #e0e0e0; /* Color de fondo del ítem seleccionado */
  `}
`;

// Componente: HeroLocation

export default function Rutas({ params }) {

  const [users, setUsers] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Estado para almacenar la fecha seleccionada
  const [selectedUserId, setSelectedUserId] = useState(null); // Estado para almacenar el id del usuario seleccionado
  const [firstLoad, setFirstLoad] = useState(true); // Estado para determinar si es la primera carga
  const [sidebarOpen, setSidebarOpen] = useState(true); // Estado para controlar si el sidebar está abierto o cerrado
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!firstLoad && users.length === 0) {
      setShowModal(true);
    }
  }, [selectedDate, users, firstLoad]);

  const closeModal = () => {
    setShowModal(false);
  };


  const fetchData = async () => {
    try {
      const formattedDate = selectedDate.toISOString(); // Convertir a formato ISO
      const usersData = await fetchRoutesFromDataBase(db, { params, selectedDate: formattedDate , firstLoad:firstLoad });
      const usersDataArray = Array.isArray(usersData) ? usersData : [usersData];
      if (Array.isArray(usersData) && usersData.length === 0) {
        setUsers(usersData)
      }
      if (usersData && usersData.length > 0 &&  usersData[0].createdAt) {
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

  const timeData = (userId)=> {
    const dataUser = users.filter(x=> (x.id == userId));
    //const location = dataUser.map(x => (x.createdAt));
    const time = dataUser.map(x=> x.createdAt.seconds)
    const date = new Date(time * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    
    const time24 = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

  // Formatear la hora y los minutos en un formato de 12 horas (AM/PM)
  const period = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours > 12 ? hours - 12 : hours;
  const time12 = `${hours12.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;

  return time12;
  };
  return (
    <div style={{ display: 'flex' }}>
      <StyledSidebar aria-label="Sidebar with content separator example" style={{ width: sidebarOpen ? '13rem' : '50px' }}>
        <Sidebar.Items>
          <div style={{ textAlign: 'center', marginBottom: '10px' }}>
            <IoMenu size={30} style={{ cursor: 'pointer' }} onClick={() => setSidebarOpen(!sidebarOpen)} />
          </div>
          {sidebarOpen && (
            <>
              <Sidebar.ItemGroup>
              <input type="date" value={selectedDate.toISOString().split('T')[0]} onChange={handleDateChange} />
              </Sidebar.ItemGroup>
              <Sidebar.ItemGroup>
                {users && users.map(user => (
                  <StyledSidebarItem
                    key={user.id}
                    onClick={() => handleUserClick(user.id)}
                    icon={MdAccessTime}
                    selected={selectedUserId === user.id} // Aplica estilos adicionales al ítem seleccionado
                  >
                    {timeData(user.id)}
                  </StyledSidebarItem>
                ))}
                {users.length === 0 && (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50px' }}>
                    <h4>Sin rutas registradas</h4>
                    {showModal && <ModalComponent onClose={closeModal} />}


                    
                  </div>
                )}
              </Sidebar.ItemGroup>
            </>
          )}
        </Sidebar.Items>
      </StyledSidebar>
      <div style={{ overflow: 'hidden', zIndex: 0,flex: 1 }}>
        {/* Verifica si no hay usuarios disponibles */}
        {selectedUserId && <Mapa users={users} selectedUserId={selectedUserId}></Mapa>}  
      </div>
    </div>
  );
}