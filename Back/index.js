const express = require('express')
require('dotenv').config()
const sequelize = require('./db')
const pgp = require('pg-promise')();
const cors = require('cors');
const db = pgp('postgres://postgres:root@localhost:5432/car');

const PORT = process.env.PORT

const app = express()
app.use(cors());
app.get('/api/cost', (req, res) => {
    db.any(`SELECT * FROM public."Model"`)
      .then((data) => res.json(data))
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  });

app.get('/api/marki', (req, res) => {
  db.any(`SELECT * FROM public."Marka"`)
    .then((data) => res.json(data))
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

app.get('/api/modeli/', (req, res) => {
  const  brand  = req.query.brand; // Получение значения переменной из поля запроса
  console.log(brand)
  // Делаем что-то с переменной, например, выводим в консоль
  db.any(`SELECT "Nazvanie_Modeli" FROM public."Model" WHERE "Nazvanie_Marki" = $1`, [brand])
    .then((data) => res.json(data))
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
  // console.log(brand);

  // Отправляем успешный ответ
  //res.status(200).json({ message: 'Данные успешно обработаны' });
});


const start = async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, ()=> console.log(`Server started at ${PORT}` ))
    }
    catch (e){
        console.log(e)
    }
}

start()