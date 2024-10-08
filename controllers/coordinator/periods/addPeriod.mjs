import { Period } from '../../../models/periods.mjs'

export const addPeriod = async (req, res) => {
    try {
        const { name, startDate, endDate, startTime, endTime, isSameDay } = req.body;
    if (!name || !startDate || !endTime || !startTime ) {
      return res.status(400).json({ msg: "Todos los campos son obligatorios" });
    }

        const newPeriod = new Period({
            name,
            startDate,
            endDate: isSameDay ? startDate : endDate,
            startTime,
            endTime,
            isSameDay
        });
        await newPeriod.save();
        res.status(201).json({ msg: "Periodo añadido exitosamente", period: newPeriod });
    } catch (error) {
        res.status(500).json({ msg: "Error al añadir el periodo", error });
    }
};