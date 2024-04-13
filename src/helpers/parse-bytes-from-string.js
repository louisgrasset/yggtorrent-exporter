export const parseBytesFromString = (inputString) => {
    // Parse the input string to extract the number and unit
    const match = inputString.match(/^(\d+(\.\d+)?)\s*(Go|To|Po)$/i);

    if (!match) {
        return 0;
    }

    // Extract the number and unit
    const number = parseFloat(match[1]);
    const unit = match[3].toLowerCase();

    // Calculate the number of bytes based on the unit
    let bytes;
    switch (unit) {
        case 'go':
            bytes = number * 1e9; // Gigabyte to bytes
            break;
        case 'to':
            bytes = number * 1e12; // Terabyte to bytes
            break;
        case 'po':
            bytes = number * 1e15; // Petabyte to bytes
            break;
        default:
            // Handle unsupported units
            return 0; // or throw new Error('Unsupported unit');
    }

    return parseInt(bytes);
}
