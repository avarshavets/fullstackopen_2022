// Helper function for exhaustive type checking
export const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

export const isValidDate = (date: string): boolean => {
    // Invalid format YYYY-MM-DD
    if (!date.match(/^\d{4}-\d{2}-\d{2}$/))
        return false;

    // Parse the date parts to integers
    const dateParts = date.split("-");
    // the radix or base is the number of unique digits, including the digit zero, used to represent numbers
    const day = parseInt(dateParts[2], 10);
    const month = parseInt(dateParts[1], 10);
    const year = parseInt(dateParts[0], 10);

    // Check the ranges of month and year
    if(year < 1000 || year > 3000 || month == 0 || month > 12)
        return false;

    const monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
};