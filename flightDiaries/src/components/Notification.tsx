import { Dispatch, SetStateAction } from "react";
import { NotificationType } from "../types";

type NotificationProps = {
  notification: NotificationType;
  setNotification: Dispatch<SetStateAction<NotificationType>>;
};

let timeoutId: NodeJS.Timeout;
export const Notification = (props: NotificationProps) => {
  //   return <div>kissa</div>;
  if (props.notification.message === "") {
    return null;
  }

  if (timeoutId !== undefined) {
    clearTimeout(timeoutId);
  }

  timeoutId = setTimeout(() => {
    props.setNotification({
      message: "",
      type: "notif",
    });
  }, 5000);

  let className = "notif";
  if (props.notification.type === "error") {
    className = "error";
  }
  return <div className={className}>{props.notification.message}</div>;
};
