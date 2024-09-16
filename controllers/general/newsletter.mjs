import { News } from '../../models/news.mjs';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
export const upload  = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } 
});

export const addNewsletter = async (req, res) => {
  try {
    const { title, description } = req.body;
    const imagePath = req.file ? req.file.filename : null;

    if (!title || !description || !imagePath) {
      return res.status(400).json({ error: 'Título, descripción e imagen son requeridos.' });
    }

    const newNewsletter = new News({ title, description, image: imagePath });
    await newNewsletter.save();
    res.status(201).json(newNewsletter);
  } catch (error) {
    console.error('Error en addNewsletter:', error);
    res.status(500).json({ error: 'Error adding newsletter' });
  }
};

export const getAllNewsletters = async (req, res) => {
  try {
    const newsletters = await News.find({});
    res.status(200).json(newsletters);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching newsletters' });
  }
};

export const deleteNewsletter = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedNews = await News.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!updatedNews) {
      return res.status(404).json({ message: 'Noticia no encontrada' });
    }
    res.status(200).json({ message: 'Noticia marcada como eliminada exitosamente' });
  } catch (error) {
    console.error('Error al marcar la noticia como eliminada:', error);
    res.status(500).json({ message: 'Error marcando la noticia como eliminada' });
  }
};
export const restoreNewsletter = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedNews = await News.findByIdAndUpdate(id, { isDeleted: false }, { new: true });
    if (!updatedNews) {
      return res.status(404).json({ message: 'Noticia no encontrada' });
    }
    res.status(200).json({ message: 'Noticia restaurada exitosamente' });
  } catch (error) {
    console.error('Error al restaurar la noticia:', error);
    res.status(500).json({ message: 'Error restaurando la noticia' });
  }
};


