export function truncateText(inputText: string): string {
    const wordsArray: string[] = inputText.split(/\s+/);

    const selectedWords: string[] = wordsArray.slice(0, 25);

    const truncatedText: string = selectedWords.join(' ');

    if (wordsArray.length > 25) {
        return truncatedText + '...';
    }

    return truncatedText;
}
