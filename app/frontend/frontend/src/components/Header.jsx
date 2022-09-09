import { Link } from 'react-router-dom'
import { populateDb } from '../services/axios'

export default function Header() {
  return(
    <div>
      <span>PROAGRO-FACIL</span>

      <button
        onClick={ async () => {
            const result = await populateDb();
            console.log(result.data);
          }
        }
      >
        Popular banco de dados
      </button>
      <Link to='/beneficiaries'>Beneficiários</Link>
    </div>
  )
}