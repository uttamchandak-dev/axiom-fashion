'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

type Notification = {
  id: string;
  type: 'order' | 'review' | 'system';
  title: string;
  message: string;
  read: boolean;
  timestamp: Date;
  link?: string;
};

// Mock data for Phase 4 demonstration
const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-1',
    type: 'order',
    title: 'New Order Placed',
    message: 'Order #ORD-1042 was placed by John Doe.',
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 mins ago
    link: '/admin/orders'
  },
  {
    id: 'notif-2',
    type: 'review',
    title: 'New Product Review',
    message: 'A 5-star review was left on Camel Wool Flat Cap.',
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    link: '/product/camel-wool-flat-cap'
  },
  {
    id: 'notif-3',
    type: 'system',
    title: 'Inventory Alert',
    message: 'Japanese Selvedge Denim is running low on size M.',
    read: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    link: '/admin/inventory'
  }
];

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type: string) => {
    switch(type) {
      case 'order': return '📦';
      case 'review': return '⭐';
      case 'system': return '⚠️';
      default: return '🔔';
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 hover:opacity-60 transition-opacity relative hidden md:block"
        aria-label="Notifications"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-medium">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-xl overflow-hidden z-50 animate-fade-in">
          <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-100 dark:border-neutral-800">
            <h3 className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
              Notifications
            </h3>
            {unreadCount > 0 && (
              <button 
                onClick={markAllAsRead}
                className="text-[10px] text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors uppercase tracking-widest"
              >
                Mark all read
              </button>
            )}
          </div>
          
          <div className="max-h-[400px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-neutral-500">
                You have no notifications.
              </div>
            ) : (
              <ul className="divide-y divide-neutral-100 dark:divide-neutral-800">
                {notifications.map((notification) => (
                  <li 
                    key={notification.id} 
                    className={`p-4 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800/50 ${!notification.read ? 'bg-neutral-50/50 dark:bg-neutral-800/20' : ''}`}
                  >
                    <Link href={notification.link || '#'} onClick={() => setIsOpen(false)} className="flex gap-3">
                      <span className="text-xl shrink-0 mt-0.5">{getIcon(notification.type)}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <p className={`text-sm truncate ${!notification.read ? 'font-semibold text-neutral-900 dark:text-white' : 'font-medium text-neutral-700 dark:text-neutral-300'}`}>
                            {notification.title}
                          </p>
                          <span className="text-[10px] text-neutral-400 whitespace-nowrap ml-2">
                            {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-snug line-clamp-2">
                          {notification.message}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          <div className="p-3 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 text-center">
            <Link href="/admin" onClick={() => setIsOpen(false)} className="text-[11px] font-medium text-neutral-900 dark:text-white hover:underline uppercase tracking-widest">
              View Dashboard
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
