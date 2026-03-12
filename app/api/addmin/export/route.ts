import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminCookie, unauthorizedResponse } from '../adminAuth';
import { getAllUsers, getAllEventRegistrations, getUsersByIds } from '@/lib/db';
import * as XLSX from 'xlsx';
import { EVENTS } from '@/lib/eventsConfig';

export async function GET(req: NextRequest) {
    try {
        if (!verifyAdminCookie(req)) return unauthorizedResponse();

        // 1. Fetch Users
        const users = await getAllUsers();
        const usersData = users.map(u => ({
            'Registration ID': u.registrationId,
            'Name': u.name,
            'Email': u.email,
            'Phone': u.phone,
            'College': u.college,
            'Gender': u.gender,
            'Payment Status': u.paymentStatus,
            'Admin Verified': u.adminVerified ? 'Yes' : 'No',
            'Registered At': new Date(u.registeredAt).toLocaleString('en-IN')
        }));

        const wb = XLSX.utils.book_new();

        // Add 'All Participants' Sheet
        const wsUsers = XLSX.utils.json_to_sheet(usersData.length > 0 ? usersData : [{ Message: 'No participants yet' }]);
        XLSX.utils.book_append_sheet(wb, wsUsers, 'All Participants');

        // 2. Fetch Event Registrations
        const registrations = await getAllEventRegistrations();
        const allIds = [...new Set(registrations.flatMap(r => r.participantIds))];
        const participantsUsers = await getUsersByIds(allIds);
        const userMap = Object.fromEntries(participantsUsers.map(u => [u.registrationId, u]));

        // Create a sheet per event
        const eventsMap = new Map<string, any[]>();

        // Initialize all events as empty so they always exist in the bottom tabs
        for (const ev of EVENTS) {
            eventsMap.set(ev.name, []);
        }

        for (const reg of registrations) {
            const eventName = reg.eventName;
            if (!eventsMap.has(eventName)) {
                eventsMap.set(eventName, []);
            }

            // Create one row per team member with their details, grouped by team
            reg.participantIds.forEach((pid, index) => {
                const u = userMap[pid];
                const row = {
                    'Team Name': reg.teamName,
                    'College': reg.college,
                    'Participant Role': index === 0 && reg.registeredBy === pid ? 'Captain' : 'Member',
                    'Registration ID': pid,
                    'Name': u ? u.name : 'Unknown',
                    'Email': u ? u.email : '',
                    'Phone': u ? u.phone : '',
                    'Registered At': new Date(reg.registeredAt).toLocaleString('en-IN')
                };
                eventsMap.get(eventName)!.push(row);
            });
        }

        // Add each event's sheet to the workbook
        for (const [eventName, data] of eventsMap.entries()) {
            const safeSheetName = eventName.substring(0, 31).replace(/[\[\]\*\/\?\:]/g, ''); // Excel sheet name limits
            const sheetData = data.length > 0 ? data : [{ Message: 'No teams registered yet' }];
            const wsEvent = XLSX.utils.json_to_sheet(sheetData);
            XLSX.utils.book_append_sheet(wb, wsEvent, safeSheetName);
        }

        // 3. Generate the Excel file buffer
        const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

        return new NextResponse(buf, {
            status: 200,
            headers: {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'Content-Disposition': `attachment; filename="Prithvi2026_DataExport_${new Date().toISOString().split('T')[0]}.xlsx"`,
            },
        });
    } catch (err) {
        console.error('Export Error:', err);
        return NextResponse.json({ error: 'Failed to generate export file' }, { status: 500 });
    }
}
