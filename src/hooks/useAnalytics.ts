import { track } from '@vercel/analytics';

export interface AnalyticsStats {
    pageViews: number;
    resumeDownloads: number;
    contactClicks: number;
    chatMessages: number;
    projectInteractions: Record<string, number>;
    certificateClicks: Record<string, number>;
    socialClicks: Record<string, number>;
}

const STORAGE_KEY = 'portfolio_analytics_stats';

const initialStats: AnalyticsStats = {
    pageViews: 0,
    resumeDownloads: 0,
    contactClicks: 0,
    chatMessages: 0,
    projectInteractions: {},
    certificateClicks: {},
    socialClicks: {},
};

export const useAnalytics = () => {
    const getStats = (): AnalyticsStats => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : initialStats;
        } catch {
            return initialStats;
        }
    };

    const saveStats = (stats: AnalyticsStats) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
    };

    const trackPageView = () => {
        const stats = getStats();
        stats.pageViews += 1;
        saveStats(stats);
        // Vercel Analytics automatically tracks page views, so we might not need a custom event here
        // unless you want to track something specific.
    };

    const trackResumeDownload = () => {
        const stats = getStats();
        stats.resumeDownloads += 1;
        saveStats(stats);
        track('resume_download');
    };

    const trackContactClick = () => {
        const stats = getStats();
        stats.contactClicks += 1;
        saveStats(stats);
        track('contact_click');
    };

    const trackChatMessage = () => {
        const stats = getStats();
        stats.chatMessages += 1;
        saveStats(stats);
        track('chat_message');
    };

    const trackProjectInteraction = (projectId: string) => {
        const stats = getStats();
        stats.projectInteractions[projectId] = (stats.projectInteractions[projectId] || 0) + 1;
        saveStats(stats);
        track('project_interaction', { projectId });
    };

    const trackCertificateClick = (certId: string) => {
        const stats = getStats();
        stats.certificateClicks[certId] = (stats.certificateClicks[certId] || 0) + 1;
        saveStats(stats);
        track('certificate_click', { certId });
    };

    const trackSocialClick = (platform: string) => {
        const stats = getStats();
        stats.socialClicks[platform] = (stats.socialClicks[platform] || 0) + 1;
        saveStats(stats);
        track('social_click', { platform });
    };

    const resetStats = () => {
        saveStats(initialStats);
        return initialStats;
    };

    return {
        getStats,
        trackPageView,
        trackResumeDownload,
        trackContactClick,
        trackChatMessage,
        trackProjectInteraction,
        trackCertificateClick,
        trackSocialClick,
        resetStats,
    };
};
