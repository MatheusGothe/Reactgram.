import React, { useEffect, useState } from 'react'
import styles from './StoriesContainer.module.css'
import { getStories, getUserStories } from '../slices/storeSlice'

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import { useDispatch, useSelector } from 'react-redux'

import Stories from 'react-insta-stories'

import { uploads } from '../utils/config'

const StoriesContainer = () => {
  const dispatch = useDispatch();
  const [showStories, setShowStories] = useState(false);


  useEffect(() => {
    dispatch(getStories());
  }, []);

  const { stories, userStories,loading } = useSelector((state) => state.stories);

  const uniqueStories = stories.filter((story, index, self) =>
    index === self.findIndex((t) => t.userId === story.userId)
  );

  const handleShowStories = async (id) => {
    await dispatch(getUserStories(id));
    setShowStories(true);
  };

  const updatedUserStories = userStories.map((story) => {
    // Parse the expirationDate string as a Date object
    const expirationDate = new Date(story.expirationDate);
    expirationDate.setDate(expirationDate.getDate() - 1);
    const currentDate = new Date();
    const timeDifference = Math.round((currentDate - expirationDate) / 3600000);
    const timeDifferenceString =
      timeDifference > 1 ? `${timeDifference} horas` : `${timeDifference} hora`;
    return {
      ...story,
      url: `${uploads}/stories/${story.storyImage}`,
      duration: 3000,
      header: {
        heading: story.userName,
        subheading: `Postado há ${timeDifferenceString}`,
        profileImage: `${uploads}/users/${story.userImage}`,
      },
    };
  });

  const StoryHeader = ({ heading, subheading, profileImage }) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0px',border:"2px solid red" }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={profileImage} alt={heading} style={{ width: '40px', height: '40px', borderRadius: '20px', marginRight: '10px' }} />
        <div>
          <h4 style={{ margin: 0 }}>{heading}</h4>
          <p style={{ margin: 0 }}>{subheading}</p>
        </div>
      </div>
      <div>
      <FontAwesomeIcon
                   icon={faXmark}
                   className={styles.x_icon}
                   onClick={() => {
                    setShowStories(false)
                    console.log(showStories)
                  }}
                   style={{
                     color: "white",
                     fontSize: "24px",
                     cursor: "pointer",
                   }}
                 />
      </div>
    </div>
  );
  
  return (
    <div className={styles.stories}>
      {loading && <p>Carregando...</p>}
      {showStories && updatedUserStories && (
        <Stories
          stories={updatedUserStories}
          defaultInterval={1500}
          keyboardNavigation={true}
          width={432}
          height={768}
          header={StoryHeader}
          onAllStoriesEnd={() => {
            // Get the index of the current user in the uniqueStories array
            setShowStories(false)
            const currentUserIndex = uniqueStories.findIndex(
              (story) => story.userId === userStories[0].userId
            );
            // Get the index of the next user in the uniqueStories array
            const nextUserIndex = (currentUserIndex + 1) % uniqueStories.length;
            // Get the ID of the next user
            const nextUserId = uniqueStories[nextUserIndex].userId;
            // Start the next story from another user
            handleShowStories(nextUserId);

          }}
        />
      )}
      {uniqueStories &&
        uniqueStories.map((storie) => (
          <div
            onClick={() => handleShowStories(storie.userId)}
            key={storie.Id}
            className={styles.div_storie}
          >
            <img
              className={styles.storieImg}
              src={`${uploads}/users/${storie.userImage}`}
            />

            <p style={{ fontSize: "10px" }}> {storie.userName} </p>
          </div>
        ))}
    </div>
  );
};

export default StoriesContainer;
