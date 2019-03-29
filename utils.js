import axios from 'axios';


const snackersURL = 'https://s3.amazonaws.com/misc-file-snack/MOCK_SNACKER_DATA.json';
const productsURL = 'https://ca.desknibbles.com/products.json?limit=250';

const fetchSnackers = async () => {
  const { data } = await axios.get(snackersURL);
  const snackers = data.map(({ email, fave_snack }) => ({ email, fave_snack }));
  return snackers;
}

const fetchProducts = async () => {
  const { data } = await axios.get(productsURL);
  const { products } = data;
  return products.map(({ title, variants }) => {
    const [ item ] = variants;
    return {
      title,
      price: item.price
    }
  });
}


export const findStockedSnacks = async () => {
  const snackers = await fetchSnackers();
  const products = await fetchProducts();

  const stockedSnacks = snackers.map(({ fave_snack, email }) => {
    const foundItem = products.find(({ title, price }) => title === fave_snack);
    if (foundItem) {
      return {
        email,
        fave_snack,
        price: foundItem.price
      }
    }
  }).filter(item => item);

  return stockedSnacks;
}

