import { google } from 'googleapis';

const SPREADSHEET_ID = '10MuNAYfLSQPc7c-qyjO-ha68qjKdJjykmUv6_dLLX3w';
const SHEET_NAME = 'Sheet1';

function getAuth() {
    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (!email || !key) {
        throw new Error('Google service account credentials not configured in env');
    }

    return new google.auth.GoogleAuth({
        credentials: {
            client_email: email,
            private_key: key,
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
}

/**
 * Appends a new registration row to the Google Sheet.
 * Columns: Registration ID | Name | Email | Phone | College | Gender | Payment Screenshot | Registered At
 */
export async function appendRegistrationToSheet(data: {
    registrationId: string;
    name: string;
    email: string;
    phone: string;
    college: string;
    gender: string;
    paymentScreenshot: string;
    registeredAt: string;
}): Promise<void> {
    const auth = getAuth();
    const sheets = google.sheets({ version: 'v4', auth });

    await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A:H`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
            values: [
                [
                    data.registrationId,
                    data.name,
                    data.email,
                    data.phone,
                    data.college,
                    data.gender,
                    data.paymentScreenshot,
                    data.registeredAt,
                ],
            ],
        },
    });
}
