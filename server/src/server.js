import http from "http";

import app from "./app.js";
import { loadPlanetData } from "./models/planets.model.js";

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

await loadPlanetData();

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
