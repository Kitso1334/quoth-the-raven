import { BsTwitter } from "react-icons/bs";
import { format, formatDistanceToNowStrict } from "date-fns";
import useNotifications from "@/hooks/useNotifications";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useCallback, useEffect } from "react";
import { GiRaven } from "react-icons/gi";
import router from "next/router";

interface NotificationsFeedProps {
  data: Record<string, any>;
}

const NotificationsFeed: React.FC<NotificationsFeedProps> = ({ data }) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: fetchedNotifications = [] } = useNotifications(currentUser?.id);
  
  const goToPost = useCallback(() => {
    router.push(`/posts/${data.id}`);
  }, [router, data]);

  useEffect(() => {
    mutateCurrentUser();
  }, [mutateCurrentUser]);

  if (fetchedNotifications.length === 0) {
    return (
      <div className="text-neutral-600 text-center p-6 text-xl">
        No notifications
      </div>
    );
  }

  return (
    <div 
    className="flex flex-col">
      {fetchedNotifications.map((notification: Record<string, any>) => {
       
        const formattedDate = notification.createdAt
          ? format(new Date(notification.createdAt), "MMMM dd, yyyy -HH:mm")
          : "";

        return (
          <div
            key={notification.id}
            className="flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-800"
          >
            <GiRaven size={30} color="light-grey" />
            <p className="text-gray-400">
              {notification.body}
              {}
              <span className="text-neutral-500 text-sm">
                {" "}
                - {formattedDate}
              </span>
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default NotificationsFeed;
