import express from 'express';
import {parse} from 'node-html-parser';
import {Gauge, register} from 'prom-client';

import {parseBytesFromString} from "./helpers/parse-bytes-from-string.js";
import {proxyRequest} from "./helpers/proxy-request.js";

const app = express();
const port = 3000;

// Create Prometheus metrics
const yggtorrentDownloadTotalMetric = new Gauge({
    name: 'yggtorrent_download_bytes_total', help: 'Total amount of bytes leeched from YggTorrent',
});

const yggtorrentUploadTotalMetric = new Gauge({
    name: 'yggtorrent_upload_bytes_total', help: 'Total amount of bytes sent to YggTorrent',
});

const parseData = (html) => {
    const root = parse(html);
    const getValueFromElement = (element) => element ? parseBytesFromString(element.textContent.trim()) : 0

    const [yggtorrentDownloadTotal, yggtorrentUploadTotal] = root.querySelectorAll('#middle .content .card-footer strong').map(getValueFromElement)
    return {
        yggtorrentDownloadTotal, yggtorrentUploadTotal
    }
}

// Fetch data from website
const fetchData = async () => {
    console.log('Fetching YGGTorrent user profile data...')
    try {
        const html = await proxyRequest(process.env.YGG_PROFILE_URL);
        const data = parseData(html);

        // Parse data and update metrics
        const {yggtorrentDownloadTotal, yggtorrentUploadTotal} = data;

        yggtorrentDownloadTotalMetric.set(yggtorrentDownloadTotal);
        yggtorrentUploadTotalMetric.set(yggtorrentUploadTotal);
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

const ONE_HOUR_IN_MS = 3600000;

// Initialize server and initial data fetch
fetchData().then(() => {

    // Expose Prometheus metrics endpoint
    app.get('/metrics', (req, res) => {
        res.set('Content-Type', register.contentType);
        register.metrics().then((data) => {
            res.end(data);
        })

    });

    // Start server
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });

    // Schedule script to run every hour
    setInterval(fetchData, 2 * ONE_HOUR_IN_MS);
})
