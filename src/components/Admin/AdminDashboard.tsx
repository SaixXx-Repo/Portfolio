import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnalytics } from '../../hooks/useAnalytics';
import { projects, certificates } from '../../data/projects';
import './AdminDashboard.css';

interface AdminDashboardProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
    const { getStats } = useAnalytics();
    const [stats, setStats] = useState(getStats());

    useEffect(() => {
        if (isOpen) {
            setStats(getStats());
        }
    }, [isOpen, getStats]);

    // Calculate max value for bar charts
    const maxProjectInteractions = Math.max(
        ...Object.values(stats.projectInteractions),
        1 // prevent division by zero
    );

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="admin-dashboard-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="admin-dashboard-modal"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="admin-dashboard-header">
                        <h2>📊 Analytics Dashboard</h2>
                        <button className="admin-dashboard-close" onClick={onClose}>×</button>
                    </div>

                    <div className="admin-dashboard-grid">
                        {/* Overview Stats */}
                        <div className="admin-stat-card">
                            <h3>Page Views</h3>
                            <div className="admin-stat-value">{stats.pageViews}</div>
                        </div>
                        <div className="admin-stat-card">
                            <h3>Resume Downloads</h3>
                            <div className="admin-stat-value">{stats.resumeDownloads}</div>
                        </div>
                        <div className="admin-stat-card">
                            <h3>Contact Clicks</h3>
                            <div className="admin-stat-value">{stats.contactClicks}</div>
                        </div>
                        <div className="admin-stat-card">
                            <h3>Chat Messages</h3>
                            <div className="admin-stat-value">{stats.chatMessages}</div>
                        </div>

                        {/* Project Stats */}
                        <div className="admin-stat-section">
                            <h3>Project Interest</h3>
                            <div className="admin-stat-list">
                                {projects.map(project => {
                                    const count = stats.projectInteractions[project.id] || 0;
                                    const percentage = (count / maxProjectInteractions) * 100;

                                    return (
                                        <div key={project.id} className="admin-stat-row">
                                            <div
                                                className="admin-stat-bar"
                                                style={{ width: `${percentage}%` }}
                                            />
                                            <span className="stat-label">{project.title}</span>
                                            <span className="stat-count">{count}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Certificate Stats */}
                        <div className="admin-stat-section">
                            <h3>Certificate Clicks</h3>
                            <div className="admin-stat-list">
                                {certificates.map(cert => (
                                    <div key={cert.id} className="admin-stat-row">
                                        <span>{cert.title}</span>
                                        <span className="stat-count">
                                            {stats.certificateClicks[cert.id] || 0}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Social Stats */}
                        <div className="admin-stat-section">
                            <h3>Social Clicks</h3>
                            <div className="admin-stat-list">
                                {Object.entries(stats.socialClicks).map(([platform, count]) => (
                                    <div key={platform} className="admin-stat-row">
                                        <span>{platform}</span>
                                        <span className="stat-count">{count}</span>
                                    </div>
                                ))}
                                {Object.keys(stats.socialClicks).length === 0 && (
                                    <div className="admin-no-data">No social clicks yet</div>
                                )}
                            </div>
                        </div>

                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
