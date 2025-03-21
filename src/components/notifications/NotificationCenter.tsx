
import React, { useState } from "react";
import { Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

// Sample notifications for demonstration
const initialNotifications = [
  {
    id: "n1",
    title: "Payment Due Reminder",
    message: "Your tuition payment is due in 3 days.",
    date: "2023-09-25",
    read: false,
  },
  {
    id: "n2",
    title: "Scholarship Application Update",
    message: "Your scholarship application has been processed.",
    date: "2023-09-23",
    read: false,
  },
  {
    id: "n3",
    title: "Late Fee Waiver Approved",
    message: "Your request for a late fee waiver has been approved.",
    date: "2023-09-20",
    read: true,
  },
];

export const NotificationCenter = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((n) => ({ ...n, read: true }))
    );
    toast.success("All notifications marked as read");
  };

  const sendTestNotification = () => {
    const newNotification = {
      id: `n${notifications.length + 1}`,
      title: "Test Notification",
      message: "This is a test notification to demonstrate the feature.",
      date: new Date().toISOString().split("T")[0],
      read: false,
    };
    
    setNotifications([newNotification, ...notifications]);
    toast.success("New notification received!");
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="relative p-2">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center"
              variant="destructive"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4">
          <h3 className="font-medium">Notifications</h3>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
            >
              Mark all read
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={sendTestNotification}
            >
              Test
            </Button>
          </div>
        </div>
        <Separator />
        <div className="max-h-80 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              No notifications
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 transition-colors ${
                  notification.read ? "bg-background" : "bg-accent/20"
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-sm font-medium">{notification.title}</h4>
                  <span className="text-xs text-muted-foreground">
                    {notification.date}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {notification.message}
                </p>
              </div>
            ))
          )}
        </div>
        <Separator />
        <div className="p-4">
          <Button className="w-full" size="sm">
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
