export function toOracleJsDate(dateLike: string | Date): Date {
    if (dateLike instanceof Date) return dateLike;
    // "YYYY-MM-DD"
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateLike)) {
        const [y, m, d] = dateLike.split('-').map(Number);
        // medianoche UTC para no desfazar por timezone del server
        return new Date(Date.UTC(y, m - 1, d, 0, 0, 0));
    }
    // ISO u otro formato parseable
    return new Date(dateLike);
}
