const Card = require("../models/CardModel");
const mongoose = require("mongoose");

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({}).sort({ createdAt: -1 });
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getCardsAdmin = async (req, res) => {
  try {
    const cards = await Card.find({}).sort({ createdAt: -1 });
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getCard = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: "No such card"})
  }

  const card = await Card.findById(id);

  if(!card) {
    return res.status(400).json({error: "No such card"})
  }

  res.status(200).json(card);
}

const updateCard = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: "No such card"})
  }

  const { title, body, button, imgUrl, fileUrl } = req.body;

  const card = await Card.findOneAndUpdate(
    { _id: id },
    { title, body, button, imgUrl, fileUrl },
    { new: true }
  );

  if(!card) {
    return res.status(400).json({error: "No such card"})
  }

  res.status(200).json(card);
}

const addCard = async (req, res) => {
  try {
    const { title, body, button, imgUrl, fileUrl } = req.body;

    const newCard = new Card({
      title, 
      body, 
      button, 
      imgUrl, 
      fileUrl
    });

    await newCard.save();

    res.status(200).json({ mssg: "Card added seccessfully!" })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getCards,
  getCardsAdmin,
  getCard,
  addCard,
  updateCard
}