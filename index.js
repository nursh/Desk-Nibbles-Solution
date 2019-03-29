import express from 'express';
import { findStockedSnacks } from './utils';

const app = express();

app.get('/', async (req, res) => {
  const stockedSnacks = await findStockedSnacks();
  const totalPrice = stockedSnacks.reduce((sum, { price }) => sum += parseFloat(price), 0);
  const emails = stockedSnacks.map(({ email}) => email);
  const snacks = stockedSnacks.reduce((snacks, { fave_snack}) => {
    if (!snacks.includes(fave_snack)) {
      snacks.push(fave_snack);
    }
    return snacks;
  },[]);
  res.send({
    totalPrice,
    emails,
    snacks,
    stockedSnacks
  });
});

app.listen(3000, () => console.log(`App is running on port:3000`));