import React, { useState, useEffect } from 'react';
import { deleteBeneficiary } from '../services/axios';
import UpdateForm from './UpdateForm';

export default function Table({ data }) {
  const [currData, setCurrData] = useState(data);
  const [filterOn, setFilterOn] = useState(false);
  const [filter, setFilter] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [update, setUpdate] = useState({ update: false });

  const deleteHandler = async ({ cpf, name }) => {
    const confirmation =
     window.confirm(`Deseja realmente apagar o/a beneficiário(a) ${ name }`);
    if (confirmation) {
      const result = await deleteBeneficiary(cpf);
      const newCurrData = currData.filter((curr) => curr.cpf !== cpf);
      setCurrData(newCurrData);
      window.alert(result.data);
    }
  }

  const updateHandler = async (data) => {
    setUpdate({ update: true, data, });
  }

  const filterHandler = ({ target }) => {
    setFilter(target.value.toString());
  }

  // Wait for any filter state update
  useEffect(() => {
    if (filter.length > 0) {
      setFilterOn(true)
      setFiltered(
        currData.filter((curr) => curr.cpf.includes(filter))
      );
    }

    else {
      setFilterOn(false);
      setFiltered([]);
    }
  }, [filter]);

  const tableContent = (array) => {
    if (array.length > 0) {
      return (
        array.map((person, i) => (
          <tr key={i}>
            <td>{ person.cpf }</td>
            <td>{ person.name }</td>
            <td>{ person.email }</td>
            <td>{ person.type }</td>
            <td>{ person.event }</td>
            <td>{ person.date }</td>
            <td>{ person.latitude }</td>
            <td>{ person.longitude }</td>
            <td>
              <button
                onClick={ () => deleteHandler(person) }
              >
                REMOVER
              </button>
            </td>
            <td>
              <button
                onClick={ () => updateHandler(person) }
              >
                ATUALIZAR
              </button>
            </td>
          </tr>
        ))
      )
    }
  }
  
  return (
    <>
      <label htmlFor="">
            Busque por CPF(Apenas números):
            <input
              type="number"
              placeholder='ex: 1234567'
              onChange={ filterHandler }
            />
          </label>
      <table>
        <thead>
          <tr>
            <th>CPF</th>
            <th>NOME</th>
            <th>EMAIL</th>
            <th>TIPO</th>
            <th>EVENTO</th>
            <th>DATA</th>
            <th>LATITUDE</th>
            <th>LONGITUDE</th>
            <th>REMOVER</th>
            <th>ATUALIZAR</th>
          </tr>
        </thead>
        <tbody>
          {/* Render the table content considering filter conditional  */}
          { filterOn ? tableContent(filtered) : tableContent(currData) }
        </tbody>
      </table>
      { update.update && <UpdateForm data={update.data} /> }
    </>
  )
}