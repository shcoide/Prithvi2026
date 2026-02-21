/**
 * lib/storage.ts
 * Screenshots are stored in MongoDB (not S3 or local disk).
 * This file re-exports the DB helpers under the storage interface so
 * calling code doesn't need to change its import names.
 */

export { saveScreenshot as uploadPaymentScreenshot, getScreenshotById } from './db';

/**
 * Returns the admin API URL for viewing a screenshot.
 * The storedPath is the MongoDB _id string of the Screenshot document.
 */
export function getScreenshotUrl(screenshotId: string): string {
    if (!screenshotId) return '';
    if (screenshotId.startsWith('http')) return screenshotId;
    return `/api/addmin/screenshot?id=${encodeURIComponent(screenshotId)}`;
}

// Used by admin/users route — same thing for MongoDB
export async function getSignedDownloadUrl(screenshotId: string): Promise<string> {
    return getScreenshotUrl(screenshotId);
}
