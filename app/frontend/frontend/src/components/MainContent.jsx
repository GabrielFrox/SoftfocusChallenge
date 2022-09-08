import React, { useEffect, useState } from 'react';
import { getBeneficiaries } from '../services/axios'

export default function MainContent() {
  const [beneficiaries, setBeneficiaries] = useState();
  // const []
  
  // useEffect(() => {
  //   (async () => (
  //     await getBeneficiaries(setBeneficiaries)
  //   ))()
  // }, []);

  const testeHandler = async () => {
    const result = await getBeneficiaries(setBeneficiaries)
    console.log(result);
  }

  const PageContent = () => {
    return (
      <>
        <h1>Page content</h1>
        <button onClick={ testeHandler }> teste </button>
      </>
    )
  }

  return (
    <div>
      { beneficiaries ? <h1>loading...</h1> : PageContent() }
    </div>
  )
}