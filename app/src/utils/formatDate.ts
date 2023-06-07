export const formatDate = (timestamp: string) => {
    const date = new Date(`${timestamp}`);

    const day = date.getDate();
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    const time = new Date(`${timestamp}`).toLocaleTimeString()

    if (month && day && year) {
        return `${month} ${day}, ${year}. ${time}`;
    }

    return 'N/A'
};
