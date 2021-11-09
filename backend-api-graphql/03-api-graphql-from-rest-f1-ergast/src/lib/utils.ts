export function getWikipediaMobileUrl(url: string): string {
  return url !== undefined ? url.replace("wikipedia", "m.wikipedia") : "";
}

export function checkYear(year: string): string {
  const currentYear = new Date().getFullYear();
  if (isNaN(+year) || +year < 1950 || +year > currentYear) {
    return String(currentYear);
  }
  return String(year);
}

export function roundCheck(round: number): number {
  if (round >= 100) {
    return 1;
  }
  return round;
}

export function paginationOptions(pageElements: number, page: number): string {
  const offset = (page - 1) * pageElements;
  const limit = pageElements;
  return `limit=${limit}&offset=${offset}`;
}
