import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/'
});

export const getBeneficiaries = async () => {
    try {
        const data = await api.get('/');
        return data.data;
    } catch (error) {
        console.log(error);
    }
}

export const registerNewBeneficiary = async (payload) => {
    try {
        const result = await api.post('/create', payload);
        return result;
    } catch (error) {
        console.log(error);
    }
}

export const deleteBeneficiary = async (cpf) => {
    try {
        const result = await api.delete(`/delete?cpf=${ cpf }`);
        return result;
    } catch (error) {
        console.log(error);
    }
}

export const updateBeneficiary = async (payload) => {
    try {
        const result = await api.put('/update', payload);
        return result;
    } catch (error) {
        console.log(error);
    }
}

export const populateDb = async () => {
    try {
        const result = await api.get('/dev/populate');
        return result;
    } catch (error) {
        console.log(error);
    }
}
