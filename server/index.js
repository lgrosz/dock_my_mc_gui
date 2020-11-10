import express from 'express';
import path, {dirname} from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// serve the front-end
app.use(express.static(path.join(__dirname, '..', 'build')));

// start express server on port 5000
// todo get port from environment
const PORT = 8080
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});

