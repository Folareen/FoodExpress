const formatAmount = (amt : number) => {
    if (amt == null || amt == undefined) {
        return 'N/A'
    }
    let amount = String(amt)

    const [intPart, decimalPart] = amount.split('.')

    let numArr : string[] = []
    intPart.split('').reverse().forEach((digit, index) => {
        if (index % 3 == 0) {
            numArr.push(`${digit},`)
        } else {
            numArr.push(digit)
        }
    });
    let formatted = numArr.reverse().join('');
    formatted = formatted.substring(0, formatted.length - 1)
    if (!decimalPart) {
        return `${formatted}.00`
    }

    return `${formatted}.${decimalPart}`
};

export default formatAmount