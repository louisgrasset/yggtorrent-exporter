# YGG Torrent Exporter

Straightforward YggTorrent leeching / seeding exporter for [Prometheus](https://github.com/prometheus/prometheus).
This exporter relies on [FlareSolverr](https://github.com/FlareSolverr/FlareSolverr) to bypass the Cloudflare's
protection (often enabled on YGG). The data is refreshed every two hours.

## Exposed metrics

The ratio isn't exposed as a metric since it is not publicly available. But it can be computed in your visualization
tool.

|   | Metric                            | Description                                   |
|---|-----------------------------------|-----------------------------------------------|
| ⏬ | `yggtorrent_download_bytes_total` | Total amount of bytes leeched from YggTorrent |
| ⏫ | `yggtorrent_upload_bytes_total`   | Total amount of bytes sent to YggTorrent      |

## Getting started

Simply run the exporter by creating its container.
You'll have to pass the following environment variables:

| Variable           | Description                                                                                                                       |
|--------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| `YGG_PROFILE_URL`  | Your profile URL. (find it by posting a comment under a torrent)  (eg. `https://sub.domain.tld/profile/xxxxxx-xxxxx`)             |
| `FLARESOLVERR_URL` | The [FlareSolverr](https://github.com/FlareSolverr/FlareSolverr) URL  (eg. `http://flaresolverr:8191` or `http://sub.domain.tld`) |
