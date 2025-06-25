import React from "react";
import { jwtDecode } from "jwt-decode";

const MoodComponent = () => {
  const [moods, setMoods] = React.useState<any[]>([]);

  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const decoded: any = jwtDecode(token);
      return decoded.userId;
    } catch (e) {
      return null;
    }
  };

  const userId = getUserIdFromToken();

  React.useEffect(() => {
    const fetchMoods = async () => {
      try {
        const res = await fetch(
          `http://localhost:9999/mood/moods/user/${userId}`
        );
        const data = await res.json();

        if (Array.isArray(data)) {
          setMoods(data);
          data.forEach((mood) => {
            console.log("User moodTitle:", mood.moodTitle);
            console.log("Mapped image:", getMoodImage(mood.moodTitle));
          });
        }
      } catch (err) {
        console.error("Failed to fetch moods", err);
      }
    };

    if (userId) fetchMoods();
  }, [userId]);

  const getMoodImage = (title: string) => {
    const lowerTitle = title
    switch (lowerTitle) {
      case "хэцүү":
        return "angry.png";
      case "Дажгүй шүү":
        return "happy.png";
      case "тавгүй":
        return "sad.png";
      case "хэвийн":
        return "neutral.png";
    }
  };

  return (
    <div>
      {moods.length === 0 ? (
        <p>No moods found</p>
      ) : (
        moods.map((mood, index) => (
          <div key={index}>
            <img
              src={getMoodImage(mood.moodTitle)}
              alt={mood.moodTitle}
              width={100}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default MoodComponent;
