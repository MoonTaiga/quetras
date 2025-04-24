
/**
 * Simple notification service for sending notifications to users
 * In a real application, this would connect to a backend service
 */

interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  timestamp: string;
}

class NotificationService {
  private notifications: Record<string, Notification[]> = {};
  
  constructor() {
    // Try to load existing notifications from localStorage
    try {
      const savedNotifications = localStorage.getItem('quetras_notifications');
      if (savedNotifications) {
        this.notifications = JSON.parse(savedNotifications);
      }
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  }
  
  /**
   * Send a notification to a specific user
   */
  sendNotification(userId: string, title: string, message: string): void {
    const notification: Notification = {
      id: `notif-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      userId,
      title,
      message,
      read: false,
      timestamp: new Date().toISOString(),
    };
    
    // Initialize user's notifications array if it doesn't exist
    if (!this.notifications[userId]) {
      this.notifications[userId] = [];
    }
    
    // Add the notification
    this.notifications[userId].unshift(notification);
    
    // Save to localStorage
    localStorage.setItem('quetras_notifications', JSON.stringify(this.notifications));
    
    // In a real app, this might trigger a push notification or email
    console.log(`Notification sent to user ${userId}:`, notification);
  }
  
  /**
   * Get all notifications for a specific user
   */
  getNotificationsForUser(userId: string): Notification[] {
    return this.notifications[userId] || [];
  }
  
  /**
   * Mark a notification as read
   */
  markAsRead(userId: string, notificationId: string): void {
    const userNotifications = this.notifications[userId];
    
    if (userNotifications) {
      const notification = userNotifications.find(n => n.id === notificationId);
      if (notification) {
        notification.read = true;
        localStorage.setItem('quetras_notifications', JSON.stringify(this.notifications));
      }
    }
  }
  
  /**
   * Mark all notifications as read for a user
   */
  markAllAsRead(userId: string): void {
    const userNotifications = this.notifications[userId];
    
    if (userNotifications) {
      userNotifications.forEach(notification => {
        notification.read = true;
      });
      
      localStorage.setItem('quetras_notifications', JSON.stringify(this.notifications));
    }
  }
  
  /**
   * Clear all notifications for a user
   */
  clearNotifications(userId: string): void {
    this.notifications[userId] = [];
    localStorage.setItem('quetras_notifications', JSON.stringify(this.notifications));
  }
}

// Export a singleton instance
export const notificationService = new NotificationService();
