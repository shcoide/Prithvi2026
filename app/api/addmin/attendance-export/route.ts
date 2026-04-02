import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminCookie, unauthorizedResponse } from '../adminAuth';
import { getAllUsersV2 } from '@/lib/db';
import * as XLSX from 'xlsx';

export async function GET(req: NextRequest) {
    try {
        if (!verifyAdminCookie(req)) return unauthorizedResponse();

        const users = await getAllUsersV2();

        // ── Sheet columns ──────────────────────────────────────────────────
        const baseRow = (u: (typeof users)[0]) => ({
            'Registration ID': u.registrationId,
            'Name': u.name,
            'Email': u.email,
            'Phone': u.phone,
            'College': u.college || '',
            'Gender': u.gender || '',
            'Hall Allotted': u.hall_alloted || 'N/A',
        });

        // Sheet 1 — All registered participants
        const totalSheet = XLSX.utils.json_to_sheet(
            users.length > 0
                ? users.map(u => ({ ...baseRow(u), 'Present (PA)': u.PA ? 'Yes' : 'No', 'Dinner Taken': u.DinnerTaken ? 'Yes' : 'No', 'Certificate': u.Certificate ? 'Yes' : 'No' }))
                : [{ Message: 'No data yet' }]
        );

        // Sheet 2 — Present only (PA = true)
        const presentUsers = users.filter(u => u.PA);
        const presentSheet = XLSX.utils.json_to_sheet(
            presentUsers.length > 0
                ? presentUsers.map(u => ({ ...baseRow(u), 'Marked Present At': '' }))
                : [{ Message: 'No participants marked present yet' }]
        );

        // Sheet 3 — Dinner Taken (DinnerTaken = true)
        const dinnerUsers = users.filter(u => u.DinnerTaken);
        const dinnerSheet = XLSX.utils.json_to_sheet(
            dinnerUsers.length > 0
                ? dinnerUsers.map(u => baseRow(u))
                : [{ Message: 'No dinner entries yet' }]
        );

        // Sheet 4 — Certificate Issued (Certificate = true)
        const certUsers = users.filter(u => u.Certificate);
        const certSheet = XLSX.utils.json_to_sheet(
            certUsers.length > 0
                ? certUsers.map(u => baseRow(u))
                : [{ Message: 'No certificates issued yet' }]
        );

        // ── Build workbook ─────────────────────────────────────────────────
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, totalSheet, `Total (${users.length})`);
        XLSX.utils.book_append_sheet(wb, presentSheet, `Present (${presentUsers.length})`);
        XLSX.utils.book_append_sheet(wb, dinnerSheet, `Dinner (${dinnerUsers.length})`);
        XLSX.utils.book_append_sheet(wb, certSheet, `Certificate (${certUsers.length})`);

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
