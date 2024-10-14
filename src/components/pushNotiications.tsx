import {
    PushNotifications,
    PushNotificationSchema,
    Token,
} from "@capacitor/push-notifications";
import { Capacitor } from "@capacitor/core";

export const registerPushHandlers = async () => {
    console.log("Get Mobile Device ID");
    if (Capacitor.getPlatform() !== "web") {
        // Handle registration success
        await PushNotifications.addListener("registration", (token: Token) => {
            console.log("PUSH :::: Push registration success, token: " + token.value);
            // Debugging: Log and alert token value
            console.log("Token value:", token.value);
           // alert(`Token value: ${token.value}`);
            localStorage.setItem("device_token", token.value); // Set device token to localStorage
        });

        // Handle registration error
        await PushNotifications.addListener("registrationError", (error: any) => {
            console.error("PUSH :::: Push registration error: ", error);
        });

        // Handle push notifications received
        await PushNotifications.addListener(
            "pushNotificationReceived",
            (notification: PushNotificationSchema) => {
                console.log("PUSH :::: PUSH Notification received. Message = ", notification);
                alert(`Notification received: ${notification.title} - ${notification.body}`);
                window.location.href = '/notification';
            }
        );

        await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
            console.log('PUSH :::: Push notification action performed', notification.actionId, notification.inputValue);
            window.location.href = '/notification';
        });
    } else {
        console.log("Capacitor platform is web, push notifications not supported.");
    }
}


export const registerDevice = async () => {
    if (Capacitor.getPlatform() !== "web") {
        // Request permission to use push notifications
        PushNotifications.requestPermissions().then((result) => {
            if (result.receive === "granted") {
                // Register with the push notification service
                PushNotifications.register();
            } else {
                // Show some error or fallback
                console.error("PUSH :::: Push notification permission not granted");
            }
        });
    }
}

export const getDeliveredNotifications = async () => {
    const notificationList = await PushNotifications.getDeliveredNotifications();
    console.log('PUSH :::: delivered notifications', notificationList);
    window.location.href = '/notification';
}
