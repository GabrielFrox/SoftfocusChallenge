import { useState } from 'react';
import { getBeneficiaries, registerNewBeneficiary } from '../services/axios';
import coordCalc from '../utils/coordinatesDistanceCalculator';

export default function RegisterPage() {
  const INITIAL_STATE = {
    name: '',
    email: '',
    cpf: '',
    latitude: '',
    longitude: '',
    type: '',
    date: '',
    event: ''
  }

  const WRONG_FIELDS_MESSAGES = {
    name: 'Acentos não são permitidos',
    type: 'Acentos não são permitidos',
    email: 'Formato inválido! Tente no formato exemplo@exemplo.com'
  }

  const RADIUS_CHECK_MESSAGE = 'Já existe um beneficiário cadastrado na mesma data em um raio de 10Km'

  const [formData, setFormData] = useState(INITIAL_STATE);

  // Better way its just create a route on backend that returns to me
  // filtered by something, but considering my time, ive decided to do this way
  const TenKilometerChecker = async () => {
    const dbData = await getBeneficiaries();
    
    const filteredByDate = dbData.filter((data) => (
      data.date === formData.date
    ))

    if (filteredByDate.length > 0) {
      const check = filteredByDate.some((curr) => {
        const { latitude: lat, longitude: long } = curr;
        const { latitude: lat2, longitude: long2 } = formData;
        return coordCalc(lat, long, lat2, long2) <= 10
      })

      return check;
    }

    return false;
  }

  const formHandler = async (e) => {
    e.preventDefault()
    const check = await TenKilometerChecker();
    if (check === true) window.alert(RADIUS_CHECK_MESSAGE);
    else {
      const formattedData = {
        ...formData,
        name: formData.name.toUpperCase(),
        type: formData.type.toUpperCase(),
      }

      const result = await registerNewBeneficiary(formattedData)
      window.alert(result.data)
    }
  };

  const fieldHandler = ({ target: { value, name } }) => {
    setFormData({...formData, [name]: value })
  }
  
  return (
    <>
      <h1>Registre um novo beneficiário</h1>
      <form onSubmit={ formHandler }>
        {/* === Person data === */}
        <fieldset>
          <legend>Dados do novo beneficiário</legend>
          {/* === Name === */}
          <label htmlFor="name">
            Nome
            <input
              required
              type="text"
              name="name"
              id="name"
              placeholder='Sem acentos'
              pattern='^[a-zA-Z ]+$'
              title={ WRONG_FIELDS_MESSAGES['name'] }
              onChange={ (e) => {
                const { target: { value } } = e
                !value.match('^[0-9]*$') && fieldHandler(e)
              }}
              value={ formData.name }
            />
          </label>
          <br />

          {/* === Email === */}
          <label htmlFor="email">
            Email
            <input
              required
              type="text"
              name="email"
              id="email"
              placeholder='exemplo@exemplo.com'
              pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
              title={ WRONG_FIELDS_MESSAGES['email'] }
              onChange={ fieldHandler }
              value={ formData.email }
            />
          </label>
          <br />

          {/* === CPF === */}
          <label htmlFor="cpf">
            CPF
            <input
              required
              type="text"
              name="cpf"
              id="cpf"
              placeholder='ex: 123512'
              minLength='11'
              maxLength='11'
              onChange={ (e) => {
                const { target: { value } } = e
                value.match('^[0-9]*$') && fieldHandler(e)
              }}
              value={ formData.cpf }
            />
          </label>
          <br />

        </fieldset>
        {/* === Location Data === */}
        <fieldset>
          <legend>Localização</legend>
          {/* === Latitude === */}
          <label htmlFor="latitude">
            Latitude
            <input
              required
              type="number"
              name="latitude"
              id="latitude"
              placeholder='ex: -13.0987'
              onChange={ fieldHandler }
              value={ formData.latitude }
            />
          </label>
          <br />

          {/* === Longitude === */}
          <label htmlFor="longitude">
            Longitude
            <input
              required
              type="number"
              name="longitude"
              id="longitude"
              placeholder='ex: -13.0987'
              onChange={ fieldHandler }
              value={ formData.longitude }
            />
          </label>
          <br />

          {/* === Type === */}
          <label htmlFor="type">
            Tipo da lavoura
            <input
              required
              type="type"
              name="type"
              id="type"
              placeholder='Sem acentos'
              pattern='^[a-zA-Z ]+$'
              title={ WRONG_FIELDS_MESSAGES['type'] }
              onChange={ fieldHandler }
              value={ formData.type }
            />
          </label>
          <br />

          {/* === Date === */}
          <label htmlFor="date">
            Data da colheita
            <input
              required
              type="date"
              name="date"
              id="date"
              onChange={ fieldHandler }
            />
          </label>
          <br />

          {/* === Event === */}
          <label htmlFor="event">
            Evento
            <select defaultValue='' required id='event' name="event" onChange={ fieldHandler }>
              <option disabled value=''> -- selecione uma opção -- </option>
              <option value="CHUVA EXCESSIVA">CHUVA EXCESSIVA</option>
              <option value="GEADA">GEADA</option>
              <option value="GRANIZO">GRANIZO</option>
              <option value="SECA">SECA</option>
              <option value="VENDAVAL">VENDAVAL</option>
              <option value="RAIO">RAIO</option>
            </select>
          </label>
        </fieldset>
        <button type="submit">Finalizar Form</button>
      </form>
    </>
  )
}