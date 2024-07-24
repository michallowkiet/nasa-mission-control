import planets from "../../models/planets.model.js";

const getAllPlanets = (req, res) => {
  res.status(200).json(planets);
};

export { getAllPlanets };
