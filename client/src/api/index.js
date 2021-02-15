import axios from 'axios';

const url = 'https://xmeme6711.herokuapp.com/memes';

export const fetchMemes = () => axios.get(url);
export const createMeme = (newMeme) => axios.post(url, newMeme);
export const likeMeme = (id) => axios.patch(`${url}/${id}/likeMeme`);
export const updateMeme = (id, updatedMeme) => axios.patch(`${url}/${id}`, updatedMeme);
export const deleteMeme = (id) => axios.delete(`${url}/${id}`);
