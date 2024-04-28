const express = require('express');
const { exec } = require('child_process');

const app = express();
const PORT = 3001;

app.use(express.json());

app.post('/run-python-script', (req, res) => {
  const { move } = req.body;
  exec('python real-life-chess-vision/app.py', (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return res.status(500).send('An error occurred while running the script.');
    }
    console.log('Python script output:', stdout);
    res.json({ message: 'Python script executed successfully.', move });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
