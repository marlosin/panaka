export function getIdFromUrl(url: string): string {
  return /[0-9]+/.exec(url)[0]
}
