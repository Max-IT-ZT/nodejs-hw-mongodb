import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { env } from './utils/env.js';
import * as contactServices from './services/contacts.js';
export const setupServer = () => {
  const app = express();
  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });
  app.use(logger);
  app.use(cors());

  //? На майбутнє
  app.use(express.json());
  // Маршрути
  app.get('/contacts', async (req, res) => {
    const data = await contactServices.getAllContacts();

    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data,
    });
  });
  app.get('/contacts/:id', async (req, res) => {
    const { id } = req.params;
    const data = await contactServices.getContactById(id);
    if (!data) {
      res.status(404).json({
        message: `Contact with id ${id} not found!`,
      });
    }
    res.json({
      status: 200,
      message: `Successfully found contact with id ${id}!`,
      data,
    });
  });

  //? Маршрути <Більш детально розглянамо на наступних заняттях>
  app.use((req, res) => {
    res.status(404).json({
      message: `${req.url} not found 😢`,
    });
  });
  app.use((error, req, res, next) => {
    res.status(500).json({
      message: error.message,
    });
  });
  //! Створюємо порт
  const port = Number(env('PORT', 3000));

  app.listen(port, () => console.log(`Server running on port 3000`));
};
