const express = require('express')
const { Card } = require('../models')

const router = express.Router()

/**
 * Get a card by its id
 */
router.get('/:id', async (req, res) => {
  try {
    const card = await card.findByPk(req.params.id)
    if (!card) return res.sendStatus(404)
    res.send(card)
  } catch (err) {
    res.sendStatus(500)
    console.error(err)
  }
})

/**
 * Get all cards
 */
router.get('/', async (req, res) => {
  try {
    const cards = await Card.findAll()
    res.send(cards)
  } catch (err) {
    res.sendStatus(500)
    console.error(err)
  }
})

/**
 * Create a new card
 */
router.post('/', async (req, res) => {
  try {
    const card = await card.create(req.body)
    res.status(201).send(card)
  } catch (err) {
    res.sendStatus(500)
    console.error(err)
  }
})

/**
 * Update a card
 */
router.put('/:id', async (req, res) => {
  try {
    let card = await card.findByPk(req.params.id)
    if (!card) return res.sendStatus(404)
    card = await card.update({ ...card, ...req.body })
    res.send(card)
  } catch (err) {
    res.sendStatus(500)
    console.error(err)
  }
})

/**
 * Delete a card
 */
router.delete('/:id', async (req, res) => {
  try {
    let card = await card.findByPk(req.params.id)
    if (!card) return res.sendStatus(404)
    card = await card.destroy()
    res.send(card)
  } catch (err) {
    res.sendStatus(500)
    console.error(err)
  }
})

module.exports = { router }
