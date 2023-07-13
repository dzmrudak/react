const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const upload = multer();

const app = express();
const picturesFolder = path.join(__dirname, 'img');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/public/script.js', (req, res) => {
    res.setHeader('Content-Type', 'text/javascript');
    res.sendFile(path.join(__dirname, 'public', 'script.js'));
});

app.get('/random-picture', (req, res) => {
    fs.readdir(picturesFolder, (err, files) => {
        if (err) {
            console.error(err);
            res.status(404).send('Folder has not been found');
            return;
        }

        const pictureFiles = files.filter(file => {
            const extension = path.extname(file).toLowerCase();
            return ['.jpg', '.jpeg', '.png', '.gif'].includes(extension);
        });

        if (pictureFiles.length === 0) {
            res.status(404).send('No pictures found in the folder');
            return;
        }

        const randomIndex = Math.floor(Math.random() * pictureFiles.length);
        const randomPicture = pictureFiles[randomIndex];
        const picturePath = path.join(picturesFolder, randomPicture);

        res.sendFile(picturePath);
    });
});

app.post('/picture', upload.none(), (req, res) => {
    const pictureName = req.body.pictureName;
    const picturePath = path.join(__dirname, 'img', pictureName);

    if (!pictureName) {
        res.status(500).send(
            {
                error: "Picture name is required"
            });
        return;
    }

    fs.stat(picturePath, (err, stats) => {
        if (err || !stats.isFile()) {
            res.status(404).send(
                {
                    error: "Picture not found"
                });
            return;
        }
        res.sendFile(picturePath);
    });
});

app.listen(8080, () => {
    console.log('Server listening on port 8080');
});

module.exports = app;
