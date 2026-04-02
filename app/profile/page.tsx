"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

export default function ProfilePage() {
    const [user, setUser] = useState<any>(null);
    const [qrDataUrl, setQrDataUrl] = useState<string>("");

    useEffect(() => {
        fetch("/api/profile", { credentials: "include" })
            .then((res) => { if (!res.ok) throw new Error(); return res.json(); })
            .then((data) => setUser(data.user))
            .catch(() => { window.location.href = "/login"; });
    }, []);

    useEffect(() => {
        if (user?.registrationId) {
            QRCode.toDataURL(user.registrationId, {
                width: 220, margin: 2,
                color: { dark: "#ffffff", light: "#00000000" },
            }).then(setQrDataUrl);
        }
    }, [user]);

    if (!user) {
        return (
            <div style={ps.loadingWrapper}>
                <div style={ps.spinner} />
                <p style={{ color: "#667", marginTop: 16, fontFamily: "system-ui" }}>Loading your profile…</p>
            </div>
        );
    }

    return (
        <div style={ps.page}>
            {/* Hero — name, ID, hall, status */}
            <div style={ps.heroCard}>
                <div style={ps.avatar}>{user.name?.charAt(0)?.toUpperCase()}</div>
                <h1 style={ps.heroName}>{user.name}</h1>
                <div style={ps.heroId}>{user.registrationId || "—"}</div>
                <div style={ps.heroHall}>🏠 Hall: {user.hall_alloted || "Not assigned"}</div>
            </div>

            {/* QR Code */}
            {qrDataUrl && (
                <div style={ps.qrCard}>
                    <p style={ps.qrLabel}>🎫 Your Entry QR Code</p>
                    <div style={ps.qrBox}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={qrDataUrl} alt="QR Code" style={{ width: 200, height: 200 }} />
                    </div>
                    <p style={ps.qrSub}>Show this QR to the admin during entry</p>
                </div>
            )}

            {/* Basic Info */}
            <div style={ps.card}>
                <h3 style={ps.cardTitle}>📋 Basic Information</h3>
                {[
                    ["Name", user.name],
                    ["College", user.college],
                    ["Email", user.email],
                    ["Phone", user.phone],
                    ["Gender", user.gender],
                ].map(([label, value]) => (
                    <div key={label} style={ps.cardRow}>
                        <span style={ps.cardLabel}>{label}</span>
                        <span style={ps.cardValue}>{value || "—"}</span>
                    </div>
                ))}
            </div>

            {/* Event Info */}
            <div style={ps.card}>
                <h3 style={ps.cardTitle}>🎫 Event Info</h3>
                {[
                    ["PA Status", user.PA ? "✅ Present" : "N/A"],
                    ["Dinner Taken", user.DinnerTaken ? "✅ Yes" : "N/A"],
                    ["Certificate", user.Certificate ? "✅ Issued" : "N/A"],
                    ["Hall Allotted", user.hall_alloted || "Not assigned"],
                ].map(([label, value]) => (
                    <div key={label} style={ps.cardRow}>
                        <span style={ps.cardLabel}>{label}</span>
                        <span style={ps.cardValue}>{value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

const ps: Record<string, React.CSSProperties> = {
    page: { minHeight: "100vh", background: "#050a19", padding: "24px 16px 80px", fontFamily: "system-ui, sans-serif", display: "flex", flexDirection: "column", alignItems: "center", gap: 18, boxSizing: "border-box" },
    loadingWrapper: { minHeight: "100vh", background: "#050a19", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" },
    spinner: { width: 40, height: 40, border: "3px solid rgba(255,255,255,0.1)", borderTop: "3px solid #4fd1ff", borderRadius: "50%", animation: "spin 1s linear infinite" },
    heroCard: { width: "100%", maxWidth: 480, background: "linear-gradient(135deg,rgba(79,209,255,0.1),rgba(124,58,237,0.1))", border: "1px solid rgba(79,209,255,0.2)", borderRadius: 24, padding: "32px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, textAlign: "center", boxSizing: "border-box" },
    avatar: { width: 68, height: 68, borderRadius: "50%", background: "linear-gradient(135deg,#4fd1ff,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, fontWeight: 700, color: "#fff", marginBottom: 4 },
    heroName: { color: "#fff", fontSize: 22, fontWeight: 700, margin: 0 },
    heroId: { color: "#4fd1ff", fontSize: 13, letterSpacing: 2, fontWeight: 600 },
    heroHall: { color: "#aab", fontSize: 13 },
    statusBadge: { borderRadius: 20, padding: "4px 16px", fontSize: 11, fontWeight: 700, letterSpacing: 1 },
    qrCard: { width: "100%", maxWidth: 480, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "24px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 12, boxSizing: "border-box" },
    qrLabel: { color: "#fff", fontSize: 15, fontWeight: 700, margin: 0 },
    qrBox: { background: "#0a1428", borderRadius: 16, padding: 16, border: "1px solid rgba(79,209,255,0.2)" },
    qrSub: { color: "#668", fontSize: 12, margin: 0, textAlign: "center" },
    card: { width: "100%", maxWidth: 480, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "16px 18px", boxSizing: "border-box" },
    cardTitle: { color: "#4fd1ff", fontSize: 13, fontWeight: 700, margin: "0 0 12px 0" },
    cardRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 10, flexWrap: "wrap" },
    cardLabel: { color: "#668", fontSize: 13, flexShrink: 0 },
    cardValue: { color: "#ccc", fontSize: 13, fontWeight: 500, textAlign: "right", wordBreak: "break-word", maxWidth: "60%" },
};