"use client";
import { use } from 'react';
import {fetchRoutesFromDataBase, fetchUsersFromDataBase} from '../../config/consultas'
import { Card, Title, Text } from '@tremor/react';
import { db } from "../../config/firebase";
import UserTable from "./components/UserTable"
import { useEffect,useState } from 'react';
import Search from './components/Search';

export default function Home() {
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    try {
      const usersData = await fetchUsersFromDataBase(db);
      //console.log(usersData);
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Users</Title>
      <Text>A list of users retrieved from a Postgres database.</Text>
      <Search />
      <Card className="mt-6">
        <UserTable users={users} />
      </Card>
    </main>
  );
}