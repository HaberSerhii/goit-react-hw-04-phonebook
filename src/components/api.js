import axios from 'axios';

axios.defaults.baseURL =
  'https://652aec3c4791d884f1fd8243.mockapi.io/phonebook-haber';

export const fetchContacts = async () => {
  const response = await axios.get('/contacts');
  return response.data;
};
