import React from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import styles from "../../styles/Profile.module.css";
import btnStyles from "../../styles/Button.module.css";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { Button } from "react-bootstrap";
import { useSetProfileDataContext } from "../../contexts/ProfileDataContext";

const Profile = (props) => {
  const { profile, mobile, imageSize = 55 } = props;
  const { id, follower_id, image, owner } = profile;

  const { handleFollow, handleUnfollow } = useSetProfileDataContext();

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  return (
    <div
      className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}
    >
      <Link className="align-self-center" to={`/profiles/${id}`}>
        <Avatar src={image} height={imageSize} />
      </Link>
      <div className={`mx-2 ${styles.Wordbreak}`}>
        <strong>{owner}</strong>
      </div>
      <div className={`text-right ${!mobile && "ml-auto"}`}>
        {!mobile &&
          currentUser &&
          !is_owner &&
          (follower_id ? (
            <Button
              className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
              onClick={() => handleUnfollow(profile)}
            >
              Unfollow
            </Button>
          ) : (
            <Button
              className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
              onClick={() => handleFollow(profile)}
            >
              Follow
            </Button>
          ))}
      </div>
    </div>
  );
};

export default Profile;
