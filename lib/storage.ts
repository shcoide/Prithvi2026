/**
 * lib/storage.ts
 * Screenshots are now stored securely via Uploadthing.
 * The database only holds the direct HTTPS URL string.
 */

/**
 * Returns the public URL for a screenshot.
 * Since we use Uploadthing, the string saved in MongoDB is already a fully qualified URL.
 */
export function getScreenshotUrl(screenshotUrl: string): string {
    if (!screenshotUrl) return '';
    return screenshotUrl;
}

// Used by admin/users route to view/download the image
export async function getSignedDownloadUrl(screenshotUrl: string): Promise<string> {
    return getScreenshotUrl(screenshotUrl);
}