const About = require("../models/AboutModel");

const getAbout = async (req, res) => {
  try {
    const about = await About.findOne();

    if (!about) {
      return res.status(404).json({ error: "No about section found." });
    }

    res.status(200).json(about);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getAboutAdmin = async (req, res) => {
  try {
    const about = await About.findOne();

    if (!about) {
      return res.status(404).json({ error: "No about section found." });
    }

    res.status(200).json(about);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const updateAbout = async (req, res) => {
  const { imgUrl1, imgUrl2, title, body } = req.body;

  try {
    const about = await About.findOne();

    if (!about) {
      return res.status(404).json({ error: "No about section found." });
    }

    about.imgUrl1 = imgUrl1;
    about.imgUrl2 = imgUrl2;
    about.title = title;
    about.body = body;

    await about.save();

    res.status(200).json({ mssg: "About section updated seccessfully!" })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const addAbout = async (req, res) => {
  try {
    const { imgUrl1, imgUrl2, title, body } = req.body;

    const newAbout = new About({
      imgUrl1,
      imgUrl2,
      title,
      body,
    });

    await newAbout.save();

    res.status(200).json({ mssg: "About added seccessfully!" })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAbout,
  getAboutAdmin,
  addAbout,
  updateAbout
}