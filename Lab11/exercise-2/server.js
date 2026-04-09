// Import File System module
const fs = require('fs');

// File name
const fileName = 'sample.txt';

// 1. Create a new file using writeFile()
fs.writeFile(fileName, 'Hello, this is the initial content.\n', (err) => {
    if (err) {
        console.error('Error creating file:', err);
        return;
    }
    console.log('File created successfully.');

    // 2. Read the file using readFile()
    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        console.log('\nFile content after creation:\n', data);

        // 3. Append data using appendFile()
        fs.appendFile(fileName, 'This content is appended.\n', (err) => {
            if (err) {
                console.error('Error appending file:', err);
                return;
            }
            console.log('Data appended successfully.');

            // 4. Read file again to verify append
            fs.readFile(fileName, 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading file after append:', err);
                    return;
                }
                console.log('\nFile content after append:\n', data);

                // 5. Delete the file using unlink()
                fs.unlink(fileName, (err) => {
                    if (err) {
                        console.error('Error deleting file:', err);
                        return;
                    }
                    console.log('File deleted successfully.');
                });
            });
        });
    });
});