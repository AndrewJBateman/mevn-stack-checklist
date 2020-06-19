const { Router } = require('express');
const ChecklistItem = require('../../models/ChecklistItem')

const router = Router()

router.get('/', async (req, res) => {
  try {
    const checklistItems = await ChecklistItem.find()
  if (!checklistItems) throw new Error('No checklist items')
  const sorted = checklistItems.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime()
  })
  res.status(200).json(sorted)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post('/', async (req, res) => {
  const newChecklistItem = new ChecklistItem(req.body)
  try {
    const checklistItem = await newChecklistItem.save()
    if (!checklistItem) throw new Error('Error saving checklist item')
    res.status(200).json(checklistItem)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  
  try {
    const response = await ChecklistItem.findByIdAndUpdate(id, req.body)
    if (!response) throw Error('Error updating checklist item')
    const updated = { ...response._doc, ...req.body }
    res.status(200).json(updated)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const removed = await ChecklistItem.findByIdAndDelete(id)
    if (!removed) throw Error('Error deleting checklist item')
    res.status(200).json(removed)
  } catch (error) {
    res.status(500).json({ message: error.message})
  }
})

module.exports = router