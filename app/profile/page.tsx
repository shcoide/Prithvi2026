"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        fetch("/api/profile", {
            credentials: "include",
        })
            .then((res) => {
                if (!res.ok) throw new Error();
                return res.json();
            })
            .then((data) => setUser(data.user))
            .catch(() => {
                window.location.href = "/login";
            });
    }, []);

    if (!user) {
        return (
            <section className="page-header">
                <h1>Profile</h1>
                <p>Loading your details...</p>
            </section>
        );
    }

    return (
        <>
            {/* Header */}
            <section className="page-header">
                <h1>My Profile</h1>
                <p>Welcome back, {user.name}</p>
            </section>

            {/* Main Grid */}
            <section
                style={{
                    display: "flex",
                    gap: 24,
                    flexWrap: "wrap",
                    justifyContent: "center",
                    padding: "20px",
                }}
            >
                {/* Basic Info */}
                <div className="contact-card" style={{ width: 300 }}>
                    <h3>Basic Info</h3>
                    <p><b>{user.name}</b></p>
                    {user.registrationId && <p>{user.registrationId}</p>}
                    {user.email && <p>📧 {user.email}</p>}
                    {user.phone && <p>📞 {user.phone}</p>}
                    {user.college && <p>🏫 {user.college}</p>}
                    {user.gender && <p>⚧ {user.gender}</p>}
                </div>

                {/* Status */}
                <div className="contact-card" style={{ width: 300 }}>
                    <h3>Status</h3>
                    <p>
                        Payment:{" "}
                        <span
                            style={{
                                color:
                                    user.paymentStatus === "approved"
                                        ? "#22c55e"
                                        : user.paymentStatus === "rejected"
                                            ? "#ef4444"
                                            : "#facc15", // optional: pending = yellow
                                fontWeight: 600,
                            }}
                        >
                            {user.paymentStatus}
                        </span>
                    </p>
                    <p>Email Verified: {user.emailVerified ? "Yes" : "No"}</p>
                    <p>Admin Verified: {user.adminVerified ? "Yes" : "No"}</p>
                </div>

                {/* Event Info */}
                <div className="contact-card" style={{ width: 300 }}>
                    <h3>Event Info</h3>
                    <p>PA: {user.PA ? "Yes" : "No"}</p>
                    <p>Dinner Taken: {user.DinnerTaken ? "Yes" : "No"}</p>
                    <p>Certificate: {user.Certificate ? "Yes" : "No"}</p>
                    <p>Hall: {user.hall_alloted || "Not assigned"}</p>
                </div>
            </section>
        </>
    );
}