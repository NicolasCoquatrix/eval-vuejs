import express from 'express'
import invoicesRoutes from './routes/invoices.mjs'

const app = express()
const port = 3000

app.use(express.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/', (req, res) => {
  res.json('API REST évaluation VueJS')
})

app.use('/invoices', invoicesRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
