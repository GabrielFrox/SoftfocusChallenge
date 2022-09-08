import React, { useEffect, useState } from 'react';
import { getBeneficiaries } from '../services/axios'

export default function MainContent() {
  const [beneficiaries, setBeneficiaries] = useState();
  const [loading, setLoading] = useState(true)
  // const []
  

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
        <section>
          <label htmlFor="">
            Busque por CPF(Apenas números):
            <input
              type="text"
              placeholder='ex: 1234567'
            />
          </label>
        </section>
      </>
    )
  }

  return (
    <div>
      { loading ? <h1>loading...</h1> : PageContent() }
    </div>
  )
}