import React, { createContext, useState, useEffect, useContext } from "react";
import { useCurrentUser } from "./CurrentUserContext";
import { axiosReq } from "../api/axiosDefaults";

const ProfileDataContext = createContext();
const SetProfileDataContext = createContext();

export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileDataContext = () => useContext(SetProfileDataContext);

export const ProfileDataProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    // placeholder for profile data
    pageProfile: { results: [] },
    popularProfiles: { results: [] },
  });

  const popularProfiles = useProfileData();
  console.log(popularProfiles);

  const currentUser = useCurrentUser();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(
          `/profiles/?ordering=-followers_count`
        );
        console.log(data);
        setProfileData((prevState) => ({
          ...prevState,
          popularProfiles: data,
        }));
      } catch (error) {
        console.log(error);
      }
    };

    handleMount();
  }, [currentUser]);

  return (
    <ProfileDataContext.Provider value={profileData}>
      <SetProfileDataContext.Provider value={setProfileData}>
        {children}
      </SetProfileDataContext.Provider>
    </ProfileDataContext.Provider>
  );
};
