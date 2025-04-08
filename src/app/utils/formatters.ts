export const formatPhoneNumber = (input: unknown): string => {
    // Handle non-string inputs
    if (input === null || input === undefined) {
        return '';
    }

    // Convert to string if needed
    const phoneNumber = String(input);

    // Use regex to format the phone number directly
    // This regex matches a 10-digit number and formats it
    const formatted = phoneNumber.replace(
        /^\D*(\d{3})\D*(\d{3})\D*(\d{4})\D*$/,
        '($1) $2-$3'
    );

    // If the formatted result is the same as input, it means the regex didn't match
    // In that case, return the original input
    return formatted !== phoneNumber ? formatted : phoneNumber;
};