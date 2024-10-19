const express = require('express');
const app = express();
const boardRoutes = require('./routes/boardRoutes');

app.use(express.json());

// Usar las rutas de los tableros
app.use('/api', boardRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});