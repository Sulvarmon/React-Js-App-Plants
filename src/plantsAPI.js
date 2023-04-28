export const fetchPlants = async (u) => {
  const API_KEY = `${process.env.REACT_APP_API_KEY}`;
  const URL = `/api/plants?token=${API_KEY}&page=${u}`;

  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.data; 
  } catch (error) {
    console.error(error);
  }
};