import PropTypes from "prop-types"
import React, { useState } from 'react';
import { updateBeneficiary } from '../services/axios';

export default function UpdateForm({ data, upHandler }) {
    const [field, setField] = useState('');
    const [newData, setNewData] = useState('');

    // Build the category radio input fields
    const inputComp = (arg) => {
        return (
          <>
            <input
              type="radio"
              name="field"
              id={arg}
              onClick={ (e) => setField(e.target.id) }
            />
            <label htmlFor={arg}>{ arg[0].toUpperCase() + arg.slice(1, arg.length) }</label>
          </>
        )
    }

    // Build the input for the category choosed
    const inputAndSubmit = () => {
        const type = () => {
            switch (field) {
            case 'date':
                return 'date'
            case 'latitude':
                return 'number';
            case 'longitude':
                return 'number';
            default:
                return 'text'
            }
        }

        return (
            <>
              <br />
              <label htmlFor={ field }>{ `Digite o/a novo(a) ${field}` }</label>
              <input
                type={ type() }
                id={ field }
                onChange={ ({ target }) => setNewData(target.value) }
              />
              <button
                type="submit"
                onClick={ submitHandler }
              >
                Atualizar
              </button>
            </>
        )
    }

    const submitHandler = async () => {
        const newObj = { ...data, field: newData };
        const result = await updateBeneficiary(newObj);
        window.alert(result.data);
        upHandler(false)
    }

    return (
      <form onSubmit={ (e) => e.preventDefault() }>
        <fieldset>
          <legend>Escolha o campo que deseja atualizar</legend>
          { inputComp('name') }
          { inputComp('email') }
          { inputComp('type') }
          { inputComp('event') }
          { inputComp('date') }
          { inputComp('latitude') }
          { inputComp('longitude') }
          <br />
          { field !== '' &&
            inputAndSubmit()
          }
        </fieldset>
      </form>
    )
}
UpdateForm.propTypes = {
    data: PropTypes.any,
    upHandler: PropTypes.any
}
