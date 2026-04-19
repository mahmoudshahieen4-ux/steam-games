import { useState } from "react";
import { motion } from "motion/react";
import { Settings, User, Monitor, Bell, Shield, Palette, Globe, Save } from "lucide-react";

export default function Setting() {
    const [activeTab, setActiveTab] = useState('account');

    const tabs = [
        { id: 'account', label: 'Account', icon: User },
        { id: 'display', label: 'Display', icon: Monitor },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'privacy', label: 'Privacy', icon: Shield },
        { id: 'appearance', label: 'Appearance', icon: Palette },
        { id: 'language', label: 'Language', icon: Globe },
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'account':
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-white mb-6">Account Settings</h2>
                        <div className="space-y-4">
                            <div className="bg-red-950/20 border border-red-900/30 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-white mb-4">Profile Information</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Display Name</label>
                                        <input type="text" className="w-full px-4 py-2 bg-black/50 border border-red-900/30 rounded-lg text-white focus:border-red-500 focus:outline-none" placeholder="Your display name" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                                        <input type="email" className="w-full px-4 py-2 bg-black/50 border border-red-900/30 rounded-lg text-white focus:border-red-500 focus:outline-none" placeholder="your@email.com" />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-red-950/20 border border-red-900/30 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-white mb-4">Steam Integration</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Steam API Key</label>
                                        <input type="password" className="w-full px-4 py-2 bg-black/50 border border-red-900/30 rounded-lg text-white focus:border-red-500 focus:outline-none" placeholder="Enter your Steam API key" />
                                    </div>
                                    <button className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg transition-colors">
                                        Connect Steam Account
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'display':
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-white mb-6">Display Settings</h2>
                        <div className="space-y-4">
                            <div className="bg-red-950/20 border border-red-900/30 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-white mb-4">Grid Layout</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Games per row</label>
                                        <select className="w-full px-4 py-2 bg-black/50 border border-red-900/30 rounded-lg text-white focus:border-red-500 focus:outline-none">
                                            <option>Auto</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                            <option>6</option>
                                        </select>
                                    </div>
                                    <div className="flex items-center">
                                        <input type="checkbox" id="showScreenshots" className="mr-3" />
                                        <label htmlFor="showScreenshots" className="text-gray-300">Show game screenshots in grid</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'notifications':
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-white mb-6">Notification Settings</h2>
                        <div className="space-y-4">
                            <div className="bg-red-950/20 border border-red-900/30 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-white mb-4">Game Updates</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-300">New game releases</span>
                                        <input type="checkbox" defaultChecked />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-300">Game updates</span>
                                        <input type="checkbox" defaultChecked />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-300">Achievement unlocks</span>
                                        <input type="checkbox" defaultChecked />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'privacy':
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-white mb-6">Privacy Settings</h2>
                        <div className="space-y-4">
                            <div className="bg-red-950/20 border border-red-900/30 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-white mb-4">Data Sharing</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-300">Share game statistics</span>
                                        <input type="checkbox" />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-300">Allow friend requests</span>
                                        <input type="checkbox" defaultChecked />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'appearance':
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-white mb-6">Appearance Settings</h2>
                        <div className="space-y-4">
                            <div className="bg-red-950/20 border border-red-900/30 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-white mb-4">Theme</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center">
                                        <input type="radio" id="dark" name="theme" className="mr-3" defaultChecked />
                                        <label htmlFor="dark" className="text-gray-300">Dark Theme</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input type="radio" id="light" name="theme" className="mr-3" />
                                        <label htmlFor="light" className="text-gray-300">Light Theme</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'language':
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-white mb-6">Language Settings</h2>
                        <div className="space-y-4">
                            <div className="bg-red-950/20 border border-red-900/30 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-white mb-4">Interface Language</h3>
                                <select className="w-full px-4 py-2 bg-black/50 border border-red-900/30 rounded-lg text-white focus:border-red-500 focus:outline-none">
                                    <option>English</option>
                                    <option>العربية</option>
                                    <option>Français</option>
                                    <option>Deutsch</option>
                                    <option>Español</option>
                                </select>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="setting p-8 text-white">
            <div className="container flex flex-col lg:flex-row gap-8">
                <div className="lg:w-1/4">
                    <div className="bg-red-950/20 border border-red-900/30 rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                            <Settings className="size-6 text-red-500" />
                            Settings
                        </h2>
                        <nav className="space-y-2">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                                            activeTab === tab.id
                                                ? 'bg-red-600/20 border border-red-500/50 text-red-400'
                                                : 'hover:bg-red-950/30 text-gray-300'
                                        }`}
                                    >
                                        <Icon className="size-5" />
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </nav>
                    </div>
                </div>
                <div className="lg:w-3/4">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-gradient-to-br from-red-950/10 to-black/20 border border-red-900/20 rounded-lg p-8"
                    >
                        {renderTabContent()}
                        <div className="mt-8 flex justify-end">
                            <button className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg transition-colors shadow-lg shadow-red-900/20">
                                <Save className="size-5" />
                                Save Changes
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}