const endpoint =
  "https://raw.githubusercontent.com/datasketch/frontend-dev-test/master/data/lideres-sociales.json";

const getData = async () => {
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Fetch Error:", error);
  }
};

export default getData;
