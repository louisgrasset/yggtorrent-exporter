export  const formatUrl = (url) => {
    const updatedUrl = url.trim()

    // Remove trailing slash
    if (updatedUrl.endsWith('/')) {
        return updatedUrl.slice(0, -1);
    }

    return url;
}
