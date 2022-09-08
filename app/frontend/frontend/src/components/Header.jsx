import { Link } from 'react-router-dom'

export default function Header() {
  return(
    <div>
      <span>PROAGRO-FACIL</span>
      <Link to='/beneficiaries'>Beneficiários</Link>
    </div>
  )
}