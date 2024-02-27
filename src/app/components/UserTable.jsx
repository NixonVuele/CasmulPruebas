
import React from 'react';

function UserTable({users}) {
  console.log(users.map(({ id, nombre, ciudad }) => ({ id, nombre, ciudad })));
  console.log(users)
  // console.log("ID:", id);
  // console.log("Nombre:", nombre);
  // console.log("Ciudad:", ciudad);

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Ciudad</th>
        </tr>
      </thead>
      <tbody>
        {users.map(({ id, nombre, ciudad }) => (
          <tr key={id}>
            <td>{id}</td>
            <td>{nombre}</td>
            <td>{ciudad}</td>
          </tr>
        ))}
      </tbody>
    </table>
);
}

export default UserTable;