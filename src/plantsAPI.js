export const fetchPlants = async (u) => {
  const API_KEY = 'VyI3aVCVj-iM9PYUYYU0NFB64dGjaDKlkA9navpVUIw';
  const URL = `/api/plants?token=${API_KEY}&page=${u}`;

  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data.data; // Return an array of plants
  } catch (error) {
    console.error(error);
  }
};