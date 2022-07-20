import { axiosReq } from "../api/axiosDefaults";

export const fetchMoreData = async (resource, setResource) => {
  try {
    const { data } = await axiosReq.get(resource.next);
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
      results: data.results.reduce((acc, cur) => {
        return acc.some((accResult) => accResult.id === cur.id)
          ? acc
          : [...acc, cur];
      }, prevResource.results),
    }));
  } catch (error) {}
};

export const followHelper = (profile, clickedProfile, follower_id) => {
  return profile.id === clickedProfile.id
    ? {
        ...profile,
        followers_count: profile.followers_count + 1,
        follower_id: follower_id,
      }
    : profile.is_owner
    ? {
        ...profile,
        followed_count: profile.followed_count + 1,
      }
    : profile;
};

export const UnfollowHelper = (profile, clickedProfile) => {
  return profile.id === clickedProfile.id
    ? {
        ...profile,
        followers_count: profile.followers_count - 1,
        follower_id: null,
      }
    : profile.is_owner
    ? {
        ...profile,
        followed_count: profile.followed_count - 1,
      }
    : profile;
};
