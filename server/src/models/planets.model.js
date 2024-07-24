import fs from "fs";
import { pipeline } from "stream/promises";
import path from "path";
import { parse } from "csv-parse";
const planets = [];

const isHabitablePlanet = (planet) => {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
};

const loadPlanetData = () => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(import.meta.dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", (planet) => {
        if (isHabitablePlanet(planet)) {
          planets.push(planet);
        }
      })
      .on("error", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end", () => {
        console.log(
          planets.map((planet) => {
            return planet["kepler_name"];
          })
        );
        console.log("------ CSV file successfully processed ------");
        resolve();
      });
  });
};

export { planets, loadPlanetData };
export default planets;
