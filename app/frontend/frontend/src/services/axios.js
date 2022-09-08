import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/',
});

export const getBeneficiaries = async (setBeneficiaries) => {
  api.get('/')
  .then((res) => setBeneficiaries(res.data))
  .catch((err) => console.log(err))
}
