'use client'
import { Sidebar } from 'flowbite-react';
import { BiBuoy } from 'react-icons/bi';

import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';
import Mapa from './mapa'
import React, { useState , useEffect} from 'react'
import { fetchRoutesFromDataBase } from '@/app/config/consultas';
import {db} from '../../config/firebase'


export default function Rutas({params}){
  console.log(params);
  const [users, setUsers] = useState();
  const groupSocial= 'Adultos Mayores'
  const fetchData = async () => {
    try {
      'use server'
      const usersData = await fetchRoutesFromDataBase(db, {params});
      console.log('Estoy en el slider')
      console.log(usersData);
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div style={{ display: 'flex' }}>
      <Sidebar aria-label="Sidebar with content separator example">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="#" icon={HiChartPie}>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiViewBoards}>
              Kanban
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiInbox}>
              Inbox
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiUser}>
              Users
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiShoppingBag}>
              Products
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiArrowSmRight}>
              Sign In
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiTable}>
              Sign Up
            </Sidebar.Item>
          </Sidebar.ItemGroup>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="#" icon={HiChartPie}>
              Upgrade to Pro
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiViewBoards}>
              Documentation
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={BiBuoy}>
              Help
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
      <div style={{ overflow: 'hidden' }}>
        <Mapa users={users}></Mapa>
        </div>
    </div>
  );
}
