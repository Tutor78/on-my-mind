module.exports = {
    // formats the date into a Month, Day, Year format
    format_date: date => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
    },
    // formts the words to be plural or singular depending on the amount of comments
    format_plural: (word, amount) => {
        if (amount !==1) {
            return `${word}s`;
        }

        return word;
    }
};