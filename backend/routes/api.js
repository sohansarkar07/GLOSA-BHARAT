const express = require('express');
const router = express.Router();
const axios = require('axios');
const junctions = require('../data/junctions.json');
const { calculateAdvisory, getDistance } = require('../utils/glosa');

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';

// List all junctions
router.get('/junctions', (req, res) => {
    res.json(junctions);
});

// [NEW] Dashboard Statistics Endpoint
router.get('/stats', (req, res) => {
    // Simulated dynamic stats
    const trafficStats = [
        { label: 'Total Vehicles Processed', value: (2800 + Math.floor(Math.random() * 200)).toLocaleString(), change: '+12.5%', icon: 'Users' },
        { label: 'Average Wait Time', value: (15 + Math.random() * 5).toFixed(1) + 's', change: '-25.2%', icon: 'Clock' },
        { label: 'System Efficiency', value: (85 + Math.random() * 5).toFixed(1) + '%', change: '+8.1%', icon: 'TrendingUp' },
        { label: 'AI Accuracy', value: (95 + Math.random() * 3).toFixed(1) + '%', change: '+2.3%', icon: 'Brain' },
    ];

    const deliveryStats = [
        { label: 'Active Deliveries', value: (20 + Math.floor(Math.random() * 10)).toString(), change: '+15.2%', icon: 'Package' },
        { label: 'On-Time Delivery Rate', value: (92 + Math.random() * 4).toFixed(1) + '%', change: '+5.8%', icon: 'Target' },
        { label: 'Fleet Utilization', value: (75 + Math.random() * 10).toFixed(1) + '%', change: '+12.3%', icon: 'Truck' },
        { label: 'AI Route Efficiency', value: (20 + Math.random() * 8).toFixed(1) + '%', change: '+8.9%', icon: 'MapPin' },
    ];

    const systemStatus = [
        { label: 'Cameras', status: 'online' },
        { label: 'AI System', status: 'active' },
        { label: 'Traffic Lights', status: 'operational' },
        { label: 'Fleet', status: 'monitoring' },
    ];

    res.json({
        trafficStats,
        deliveryStats,
        systemStatus,
        lastUpdated: new Date().toISOString()
    });
});

// Get Advisory for a driver
router.post('/advisory', async (req, res) => {
    try {
        const { junctionId, lat, lng, timestamp } = req.body;

        const junction = junctions.find(j => j.id === junctionId);
        if (!junction) return res.status(404).json({ error: 'Junction not found' });

        // Calculate distance
        const distance = getDistance(lat, lng, junction.lat, junction.lng);

        // Call AI Service for prediction
        const aiResponse = await axios.post(`${AI_SERVICE_URL}/predict`, {
            junction_id: junctionId,
            timestamp: timestamp || Date.now() / 1000
        });

        const { current_status, seconds_to_change } = aiResponse.data;

        // Calculate GLOSA advisory
        const advisory = calculateAdvisory(distance, seconds_to_change, current_status);

        res.json({
            junction: junction.name,
            distance: Math.round(distance),
            signalStatus: current_status,
            secondsToChange: seconds_to_change,
            recommendedSpeed: advisory.speedKmh,
            message: advisory.message
        });

    } catch (error) {
        console.error('Advisory error:', error.message);
        res.status(500).json({ error: 'Failed to compute advisory', details: error.message });
    }
});

module.exports = router;
