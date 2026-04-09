const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'voting-data.json');

// Middleware
app.use(cors());
app.use(express.json());

// Initialize data file if it doesn't exist
async function initializeDataFile() {
    try {
        await fs.access(DATA_FILE);
    } catch (error) {
        // File doesn't exist, create it with default data
        const defaultData = {
            votingRecords: [],
            votingData: {
                'prom-king': {},
                'prom-queen': {},
                'best-dressed-male': {},
                'best-dressed-female': {}
            },
            votedUsers: []
        };
        await fs.writeFile(DATA_FILE, JSON.stringify(defaultData, null, 2));
        console.log('Created voting data file');
    }
}

// API Routes

// Save voting data
app.post('/api/save-voting-data', async (req, res) => {
    try {
        const data = req.body;
        await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
        res.json({ success: true, message: 'Voting data saved successfully' });
    } catch (error) {
        console.error('Error saving voting data:', error);
        res.status(500).json({ success: false, message: 'Failed to save voting data' });
    }
});

// Load voting data
app.get('/api/load-voting-data', async (req, res) => {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        const votingData = JSON.parse(data);
        res.json(votingData);
    } catch (error) {
        console.error('Error loading voting data:', error);
        res.status(500).json({ success: false, message: 'Failed to load voting data' });
    }
});

// Reset voting data
app.delete('/api/reset-voting-data', async (req, res) => {
    try {
        const defaultData = {
            votingRecords: [],
            votingData: {
                'prom-king': {},
                'prom-queen': {},
                'best-dressed-male': {},
                'best-dressed-female': {}
            },
            votedUsers: []
        };
        await fs.writeFile(DATA_FILE, JSON.stringify(defaultData, null, 2));
        res.json({ success: true, message: 'Voting data reset successfully' });
    } catch (error) {
        console.error('Error resetting voting data:', error);
        res.status(500).json({ success: false, message: 'Failed to reset voting data' });
    }
});

// Serve static files
app.use(express.static('.'));

// Start server
app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    await initializeDataFile();
});

module.exports = app;
