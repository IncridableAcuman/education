import React, { useState } from 'react';
import { User, Building, Lock, Bell, Save, Check } from 'lucide-react';

export const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'center' | 'security' | 'notifications'>('profile');
  const [saved, setSaved] = useState(false);

  // Profile Form State
  const [profile, setProfile] = useState({
    name: 'Admin Person',
    email: 'admin@educenter.uz',
    phone: '+998 90 123 45 67',
    role: 'Super Admin',
  });

  // Center Info State
  const [center, setCenter] = useState({
    title: 'EduCenter',
    address: 'Toshkent sh., Yunusobod t., 4-mavze',
    phone: '+998 71 200 00 00',
    telegramBotToken: '6123456789:AAFg...',
  });

  // Security State
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });

  // Notifications State
  const [notifications, setNotifications] = useState({
    newApplication: true,
    paymentAlert: true,
    weeklyReport: false,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const tabs = [
    { id: 'profile', label: 'Profil sozlamalari', icon: User },
    { id: 'center', label: 'Markaz ma’lumotlari', icon: Building },
    { id: 'security', label: 'Xavfsizlik', icon: Lock },
    { id: 'notifications', label: 'Bildirishnomalar', icon: Bell },
  ] as const;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Sozlamalar</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Tizim sozlamalari va profil ma'lumotlarini boshqarish.
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-slate-200 dark:border-slate-700 space-x-2 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                isActive
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-xs max-w-3xl">
        <form onSubmit={handleSave} className="space-y-6">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Shaxsiy ma'lumotlar</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">F.I.O</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Lavozim</label>
                  <input
                    type="text"
                    disabled
                    value={profile.role}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900/50 text-slate-500 text-sm cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Telefon raqam</label>
                  <input
                    type="text"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Center Info Tab */}
          {activeTab === 'center' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">O‘quv markazi ma'lumotlari</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Markaz nomi</label>
                  <input
                    type="text"
                    value={center.title}
                    onChange={(e) => setCenter({ ...center, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Manzil</label>
                  <input
                    type="text"
                    value={center.address}
                    onChange={(e) => setCenter({ ...center, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Aloqa telefoni</label>
                    <input
                      type="text"
                      value={center.phone}
                      onChange={(e) => setCenter({ ...center, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Telegram Bot Token (Arizalar uchun)</label>
                    <input
                      type="password"
                      value={center.telegramBotToken}
                      onChange={(e) => setCenter({ ...center, telegramBotToken: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Parolni o‘zgartirish</h2>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Joriy parol</label>
                  <input
                    type="password"
                    value={passwords.current}
                    onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Yangi parol</label>
                  <input
                    type="password"
                    value={passwords.new}
                    onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Yangi parolni tasdiqlash</label>
                  <input
                    type="password"
                    value={passwords.confirm}
                    onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Bildirishnoma sozlamalari</h2>
              <div className="space-y-3">
                <label className="flex items-center justify-between p-3.5 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer">
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">Yangi ariza kelganda</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Telegram va email orqali xabar berish</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.newApplication}
                    onChange={(e) => setNotifications({ ...notifications, newApplication: e.target.checked })}
                    className="w-4 h-4 text-indigo-600 rounded-sm focus:ring-indigo-500"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer">
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">To‘lov amalga oshirilganda</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">O‘quvchilar to‘lovi tasdiqlanganda notification jo'natish</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.paymentAlert}
                    onChange={(e) => setNotifications({ ...notifications, paymentAlert: e.target.checked })}
                    className="w-4 h-4 text-indigo-600 rounded-sm focus:ring-indigo-500"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer">
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">Haftalik hisobotlar</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Hafta yakunida statistika hisobotini yuborish</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.weeklyReport}
                    onChange={(e) => setNotifications({ ...notifications, weeklyReport: e.target.checked })}
                    className="w-4 h-4 text-indigo-600 rounded-sm focus:ring-indigo-500"
                  />
                </label>
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm transition-colors"
            >
              <Save className="w-4 h-4" />
              Saqlash
            </button>

            {saved && (
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                <Check className="w-4 h-4" />
                O'zgarishlar saqlandi!
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};