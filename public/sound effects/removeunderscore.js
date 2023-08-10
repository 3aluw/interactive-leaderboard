const fs = require('fs');
const path = require('path');

const folderPath = 'final'; // Path to the folder containing the files

fs.readdirSync(folderPath).forEach(filename => {
    if (filename.includes('_')) {
        const newFilename = filename.replace(/_/g, '');
        const oldPath = path.join(folderPath, filename);
        const newPath = path.join(folderPath, newFilename);

        fs.renameSync(oldPath, newPath, err => {
            if (err) {
                console.error(`Error renaming file: ${filename}`);
            } else {
                console.log(`Renamed ${filename} to ${newFilename}`);
            }
        });
    }
});



