import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminCookie, unauthorizedResponse } from '../adminAuth';
import { getAllUsersV2 } from '@/lib/db';
import * as XLSX from 'xlsx';

export async function GET(req: NextRequest) {
    try {
        if (!verifyAdminCookie(req)) return unauthorizedResponse();

        const users = await getAllUsersV2();

        const data = users.map(u => ({
            'Registration ID': u.registrationId,
            'Name': u.name,
            'Email': u.email,
            'Phone': u.phone,
            'College': u.college || '',
            'Gender': u.gender || '',
            'Hall Allotted': u.hall_alloted || 'N/A',
            'Present (PA)': u.PA ? 'Yes' : 'No',
            'Dinner Taken': u.DinnerTaken ? 'Yes' : 'No',
            'Certificate Issued': u.Certificate ? 'Yes' : 'No',
        }));

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(data.length > 0 ? data : [{ Message: 'No data yet' }]);
        XLSX.utils.book_append_sheet(wb, ws, 'Attendance');

        const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

        return new NextResponse(buf, {
            status: 200,
            headers: {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'Content-Disposition': `attachment; filename="Prithvi2026_Attendance_${new Date().toISOString().split('T')[0]}.xlsx"`,
            },
        });
    } catch (err) {
        console.error('Attendance Export Error:', err);
        return NextResponse.json({ error: 'Failed to generate attendance export' }, { status: 500 });
    }
}
