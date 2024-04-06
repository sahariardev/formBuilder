export function idGenerator(): string {
    return Math.floor(Math.random() * 100001).toString();
}