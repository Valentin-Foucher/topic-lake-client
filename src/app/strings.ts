export const title = (s: string): string => {
    return s
        .trim()
        .split(' ')
        .map((e) => e.length > 0 ? e[0].toUpperCase() + e.substring(1) : ' ')
        .join(' ')
}
