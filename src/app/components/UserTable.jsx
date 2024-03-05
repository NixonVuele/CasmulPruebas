import React from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text
} from '@tremor/react';

export default function UserTable({users}) {
  console.log(users)
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Celular</TableHeaderCell>
          <TableHeaderCell>Email</TableHeaderCell>
          <TableHeaderCell>Ver ruta</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map(({ id, nombre, ciudad }) => (
          <TableRow key={id}>
            <TableCell>{nombre}</TableCell>
            <TableCell>
              <Text>{ciudad}</Text>
            </TableCell>
            <TableCell>
              <button> hola </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}