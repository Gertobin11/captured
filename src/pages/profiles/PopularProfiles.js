import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";

import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const PopularProfiles = () => {
  const [profileData, setProfileData] = useState({
    // placeholder for profile data
    pageProfile: { results: [] },
    PopularProfiles: { results: [] },
  });

  const { popularProfiles } = profileData;
  const currentUser = useCurrentUser();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(
          `/profiles/?ordering=-followers_count`
        );
        console.log(data.results);
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
    <Container className={appStyles.Content}>
      <p>Most followed profiles</p>
      {popularProfiles?.results.length ? (
        popularProfiles?.results.map((profile) => (
          <p key={profile.id}>{profile.owner}</p>
        ))
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default PopularProfiles;
