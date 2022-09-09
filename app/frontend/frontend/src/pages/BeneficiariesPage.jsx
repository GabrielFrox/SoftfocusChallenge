import React, { useEffect, useState } from 'react';
import { getBeneficiaries } from '../services/axios'
import Table from '../components/Table';

export default function MainContent() {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const EMPTY_DB_MESSAGE = 'Nenhum beneficiário cadastrado';
  

  // Fetch all data from beneficiaries in API when page is mounted
  useEffect(() => {
    (async () => {
      const data = await getBeneficiaries();
      setBeneficiaries(data);
      setLoading(false);
    })()
  }, []);

  const PageContent = () => {
    return (
      <>
        <h1>Beneficiários</h1>
        { beneficiaries.length < 1 ? <h2>{ EMPTY_DB_MESSAGE }</h2> : <Table data={beneficiaries} /> }
      </>
    )
  }

  return (
    <div>
      { loading ? <h1>loading...</h1> : PageContent() }
    </div>
  )
}