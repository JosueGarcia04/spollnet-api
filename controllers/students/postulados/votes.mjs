import { Candidato } from '../../../models/votes.mjs';

export const votar = async (req, res) => {
  const { candidato } = req.body;

  try {
    // Encuentra el documento con los candidatos
    const doc = await Candidato.findOne();

    if (!doc) {
      return res.status(404).json({ message: 'Candidatos no encontrados' });
    }

    // Incrementa el voto para el candidato específico
    if (doc[candidato] !== undefined) {
      doc[candidato] += 1;
      await doc.save();
      res.json({ message: `Voto registrado para ${candidato}` });
    } else {
      res.status(400).json({ message: 'Candidato no válido' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar el voto', error });
  }
};
