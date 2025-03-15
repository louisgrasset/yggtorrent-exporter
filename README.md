# YGG Torrent Exporter

Straightforward YggTorrent leeching / seeding exporter for [Prometheus](https://github.com/prometheus/prometheus).
This exporter relies on the Cloudflare cookie stored on the browser when you are logged in to YggTorrent.
Data is refreshed every two hours.

## Exposed metrics

The ratio isn't exposed as a metric since it can be computed in your visualization tool.

|   | Metric                            | Description                                   |
|---|-----------------------------------|-----------------------------------------------|
| ⏬ | `yggtorrent_download_bytes_total` | Total amount of bytes leeched from YggTorrent |
| ⏫ | `yggtorrent_upload_bytes_total`   | Total amount of bytes sent to YggTorrent      |

## Getting started

Simply run the exporter by creating its container.
You'll have to pass the following environment variables:

| Variable          | Description                                                                                                           |
|-------------------|-----------------------------------------------------------------------------------------------------------------------|
| `YGG_PROFILE_URL` | Your profile URL. (find it by posting a comment under a torrent)  (eg. `https://sub.domain.tld/profile/xxxxxx-xxxxx`) |
| `YGG_COOKIE`      | The cookie string from YGG starting by `cf_clearance`                                                                 |
| `YGG_USER_AGENT`  | The user-agent string of the browser you extracted the cookie string from                                             |
