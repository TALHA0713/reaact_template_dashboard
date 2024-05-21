import { useState, useEffect } from "react";

const Notification = () => {
  const notifications = [
    {
      message: "Pending Task",
      detail: "Fyp Evaluation",
      dateTime: "2024-06-20T10:30:00Z", // Today's date
    },
    {
      message: "previous day",
      detail: "Sunday task which are left",
      dateTime: "2024-05-05T12:30:00Z", // Yesterday's date
    },
    {
      message: "Today Task",
      detail: "Submit the app",
      dateTime: "2024-05-06T10:00:00Z", // Today's date
    },
    {
      message: "Task completed",
      detail:
        "i Have completed my most of the app but one thing is remaining check this app to my teacher",
      dateTime: "2024-05-06T10:00:00Z", // A past date
    },
  ];

  const [todayNotifications, setTodayNotifications] = useState([]);
  const [yesterdayNotifications, setYesterdayNotifications] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      console.error("No token found in session storage.");
      window.location.href = "/login";
    }
    sortNotification();
    setupNotificationIntervals();
  }, []);

  const sortNotification = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const todayNotifications = [];
    const yesterdayNotifications = [];

    notifications.forEach((notification) => {
      const notificationDate = new Date(notification.dateTime);
      if (isSameDate(notificationDate, today)) {
        todayNotifications.push(notification);
      } else if (isSameDate(notificationDate, yesterday)) {
        yesterdayNotifications.push(notification);
      }
    });

    setTodayNotifications(todayNotifications);
    setYesterdayNotifications(yesterdayNotifications);
  };

  const isSameDate = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const setupNotificationIntervals = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    todayNotifications.forEach((notification) => {
      const notificationDate = new Date(notification.dateTime);
      const timeDifference = notificationDate.getTime() - today.getTime();
      if (timeDifference >= 0) {
        const numberOfIntervals = Math.floor(
          timeDifference / (3 * 60 * 60 * 1000)
        ); // Calculate number of intervals between current time and notification time
        const initialDelay =
          timeDifference - numberOfIntervals * 3 * 60 * 60 * 1000; // Calculate initial delay before the first notification

        setTimeout(() => {
          sendNotification(notification);
          setInterval(() => sendNotification(notification), 3 * 60 * 60 * 1000);
        }, initialDelay);
      }
    });
  };

  const sendNotification = (notification) => {
    console.log("Sending notification:", notification);
  };
  return (
    <div className="min-h-screen w-screen bg-slate-200">
      <UpperNavbar heading="Notifications" />
      <div className="w-full h-full flex">
        <div id="left-navbar" className="w-[22%] h-full ">
          <SideNavbar />
        </div>

        <div
          id="Right-Side"
          className="w-[78%] h-full flex justify-center mt-10 bg-slate-200"
        >
          <div className="w-[90%] rounded border">
            <h1 className="text-[#445862] font-semibold text-4xl">
              Notification
            </h1>
            <p className="text-sm text-[#37474F]">
              you have {todayNotifications.length} unread notification
            </p>

            <h1 className="mt-5 text-[#9A9EA5] text-2xl">Today</h1>
            <div>
              {todayNotifications.map((notification, index) => {
                return (
                  <div key={index} className="mt-3 ml-3 flex gap-x-3">
                    <svg
                      className="mt-5"
                      width="9"
                      height="10"
                      viewBox="0 0 9 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        y="0.80249"
                        width="8.9374"
                        height="8.9374"
                        rx="4.4687"
                        fill="#FF0000"
                      />
                    </svg>

                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 68 68"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="0.874802"
                        y="0.536133"
                        width="67.0305"
                        height="67.0305"
                        rx="13.4061"
                        fill="#EBEBEB"
                      />
                      <g>
                        <path
                          d="M50.1069 42.2843C48.8569 41.2297 47.8523 39.9146 47.1637 38.4311C46.4751 36.9476 46.119 35.3316 46.1203 33.696V29.024C46.1203 23.127 41.7399 18.2455 36.0657 17.4277V15.6179C36.0657 15.1735 35.8892 14.7472 35.5749 14.433C35.2607 14.1187 34.8344 13.9421 34.39 13.9421C33.9455 13.9421 33.5193 14.1187 33.205 14.433C32.8908 14.7472 32.7142 15.1735 32.7142 15.6179V17.4277C27.0384 18.2455 22.6596 23.127 22.6596 29.024V33.696C22.6603 35.3349 22.3024 36.954 21.6111 38.4399C20.9199 39.9258 19.9119 41.2425 18.6579 42.2977C18.2047 42.6884 17.8817 43.2082 17.7321 43.7875C17.5826 44.3669 17.6136 44.9781 17.821 45.5393C18.0284 46.1005 18.4024 46.585 18.8928 46.9278C19.3832 47.2706 19.9666 47.4554 20.5649 47.4574H48.215C49.8321 47.4574 51.1476 46.1419 51.1476 44.5248C51.1476 43.6668 50.7739 42.8557 50.1069 42.2843ZM34.39 54.1604C35.8379 54.1585 37.2408 53.6574 38.3623 52.7416C39.4838 51.8258 40.2553 50.5514 40.5467 49.1332H28.2332C28.5247 50.5514 29.2961 51.8258 30.4176 52.7416C31.5391 53.6574 32.9421 54.1585 34.39 54.1604Z"
                          fill="#4BCBEB"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_10_4930">
                          <rect
                            width="40.2183"
                            height="40.2183"
                            fill="white"
                            transform="translate(14.2807 13.9421)"
                          />
                        </clipPath>
                      </defs>
                    </svg>

                    <div className="mb-3">
                      <p className="font-semibold text-[#445862] text-xl">
                        {notification.message}
                      </p>
                      <p className=" text-[#445862] text-sm">
                        {notification.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <h1 className="mt-5 text-[#9A9EA5] text-2xl">Yesterday</h1>
            <div>
              {yesterdayNotifications.map((notification, index) => {
                return (
                  <div key={index} className=" mt-3 ml-8 flex gap-x-3">
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 68 68"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="0.874802"
                        y="0.536133"
                        width="67.0305"
                        height="67.0305"
                        rx="13.4061"
                        fill="#EBEBEB"
                      />
                      <g>
                        <path
                          d="M50.1069 42.2843C48.8569 41.2297 47.8523 39.9146 47.1637 38.4311C46.4751 36.9476 46.119 35.3316 46.1203 33.696V29.024C46.1203 23.127 41.7399 18.2455 36.0657 17.4277V15.6179C36.0657 15.1735 35.8892 14.7472 35.5749 14.433C35.2607 14.1187 34.8344 13.9421 34.39 13.9421C33.9455 13.9421 33.5193 14.1187 33.205 14.433C32.8908 14.7472 32.7142 15.1735 32.7142 15.6179V17.4277C27.0384 18.2455 22.6596 23.127 22.6596 29.024V33.696C22.6603 35.3349 22.3024 36.954 21.6111 38.4399C20.9199 39.9258 19.9119 41.2425 18.6579 42.2977C18.2047 42.6884 17.8817 43.2082 17.7321 43.7875C17.5826 44.3669 17.6136 44.9781 17.821 45.5393C18.0284 46.1005 18.4024 46.585 18.8928 46.9278C19.3832 47.2706 19.9666 47.4554 20.5649 47.4574H48.215C49.8321 47.4574 51.1476 46.1419 51.1476 44.5248C51.1476 43.6668 50.7739 42.8557 50.1069 42.2843ZM34.39 54.1604C35.8379 54.1585 37.2408 53.6574 38.3623 52.7416C39.4838 51.8258 40.2553 50.5514 40.5467 49.1332H28.2332C28.5247 50.5514 29.2961 51.8258 30.4176 52.7416C31.5391 53.6574 32.9421 54.1585 34.39 54.1604Z"
                          fill="#4BCBEB"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_10_4930">
                          <rect
                            width="40.2183"
                            height="40.2183"
                            fill="white"
                            transform="translate(14.2807 13.9421)"
                          />
                        </clipPath>
                      </defs>
                    </svg>

                    <div className="mb-3">
                      <p className="font-semibold text-[#445862] text-xl">
                        {notification.message}
                      </p>
                      <p className=" text-[#445862] text-sm">
                        {notification.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
