import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'

const getItems = async (req, res) => {
  try {
    const data = await fs.promises.readFile('./db/invoices.json', 'utf8')
    const list = JSON.parse(data)

    res.json(list)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: true, message:'Erreur lors de la requête' })
  }
}

const getItem = async (req, res) => {
  try {
    const data = await fs.promises.readFile('./db/invoices.json', 'utf8')
    const list = JSON.parse(data)
    const item = list.find(item => item.id == req.params.id)

    if (!item) {
      res.status(404).json({ error: true, message:'Facture non trouvée' })
      return
    }

    res.json(item)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: true, message:'Erreur lors de la requête' })
  }
}

const postItem = async (req, res) => {
  try {
    const data = await fs.promises.readFile('./db/invoices.json', 'utf8')
    const list = JSON.parse(data)

    const itemToSave = {
      ...req.body
    }

    itemToSave.id = uuidv4()
    
    if (!itemToSave.description || itemToSave.description.trim().length < 5) {
      console.log(itemToSave)
      res.status(400).json({ error: true, message: 'Description manquante ou trop courte' })
      return
    }

    list.push(itemToSave)
    await fs.promises.writeFile('./db/invoices.json', JSON.stringify(list))

    res.json(itemToSave)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: true, message:'Erreur lors de la requête' })
  }
}

const patchItem = async (req, res) => {
  try {
    const data = await fs.promises.readFile('./db/invoices.json', 'utf8')
    const list = JSON.parse(data)
    const itemToEdit = list.find(item => item.id == req.params.id)

    if (!itemToEdit) {
      res.status(404).json({ error: true, message:'Facture non trouvée' })
      return
    }

    const itemToSave = {
      ...itemToEdit,
      ...req.body
    }
    
    if (itemToSave.description && itemToSave.description.trim().length < 5) {
      console.log(itemToSave)
      res.status(400).json({ error: true, message: 'Description manquante ou trop courte' })
      return
    }
    
    const listToSave = list.map(item => item.id == req.params.id ? itemToSave : item)

    await fs.promises.writeFile('./db/invoices.json', JSON.stringify(listToSave))

    res.json(itemToSave)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: true, message:'Erreur lors de la requête' })
  }
}

const deleteItem = async (req, res) => {
  try {
    const data = await fs.promises.readFile('./db/invoices.json', 'utf8')
    const list = JSON.parse(data)
    
    const itemToDelete = list.find(item => item.id == req.params.id)
    if (!itemToDelete) {
      res.status(404).json({ error: true, message:'Facture non trouvée' })
      return
    }
    
    const listToSave = list.filter(item => item.id != req.params.id)

    await fs.promises.writeFile('./db/invoices.json', JSON.stringify(listToSave))

    res.json({ error: false, message: 'Facture supprimée' })
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: true, message:'Erreur lors de la requête' })
  }
}


export { getItems, getItem, patchItem, postItem, deleteItem }