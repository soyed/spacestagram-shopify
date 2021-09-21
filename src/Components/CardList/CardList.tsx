import React from 'react';
import { Astronomy, MediaType } from '../../model';
import UIModal from '../../UIKit/UIModal/UIModal';
import UICard from '../../UIKit/UICard/UICard';
import UIImage from '../../UIKit/UIImage/UIImage';
import UILoadingSpinner from '../../UIKit/UILoadingSpinner/UILoadingSpinner';
import {
  getJSON,
  parseSelectedDates,
  setDefaultDate,
  sortAstronomy,
} from '../../utils';
import isEqual from 'lodash/isEqual';
import CardActionBar from '../CardActionBar/CardActionBar';
interface CardListProps {
  // isExploreActive?: boolean;
  // selectedDate: string[];
}

const CardList: React.FC<CardListProps> = (props) => {
  // const { isExploreActive, selectedDate } = props;
  // const { isExploreActive } = props;

  // States
  // Card Action Bar
  const [showExplore, setShowExplore] = React.useState<boolean>(true);

  const [dateToFetch, setDateToFetch] = React.useState<any[]>(
    setDefaultDate(true)
  );

  // Card List
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>('');
  const [astronomyList, setAstronomyList] = React.useState<Astronomy[]>([]);
  const [showInfoModal, setShowInfoModal] = React.useState<boolean>(false);
  // const [showLikedSection, setShowLikedSection] =
  //   React.useState<boolean>(false);
  const [selectedAstronomyIndex, setSelectedAstronomyIndex] =
    React.useState<number>(null);
  const [likedAstronomy, setLikedAstronomy] = React.useState<Astronomy[]>([]);

  // Card Action Bar Methods

  const showExploreSection = () => {
    setShowExplore(true);
  };

  const showLikedSection = () => {
    setShowExplore(false);
  };

  const handleSelectedDates = (dateToFetch: string[]) => {
    setDateToFetch(dateToFetch);
    const data = parseSelectedDates(dateToFetch);
  };

  // Hooks
  React.useEffect(() => {
    const fetchAstronomy = async () => {
      setIsLoading(true);
      const selectedDate = parseSelectedDates(dateToFetch);
      const response = await getJSON(selectedDate[0], selectedDate[1]);

      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      const responseData = await response.json();

      const fetchedData: Astronomy[] = [];

      // Parsed Data and set isLiked to false
      for (let key in responseData) {
        fetchedData.push({
          copyright: responseData[key].copyright,
          date: responseData[key].date,
          explanation: responseData[key].explanation,
          hdUrl: responseData[key].hdurl,
          mediaType:
            responseData[key].media_type === 'video'
              ? MediaType.VIDEO
              : MediaType.IMAGE,
          title: responseData[key].title,
          url: responseData[key].url,
          thumbnailUrl: responseData[key].thumbnail_url,
          isLiked: false,
        });
      }

      // Sort List of Astronomy in other of Date posted
      fetchedData.sort((a, b) =>
        sortAstronomy(new Date(b.date), new Date(a.date))
      );

      setAstronomyList(fetchedData);
      setIsLoading(false);
    };

    fetchAstronomy().catch((error) => {
      setErrorMessage(error.message);
    });
  }, [dateToFetch]);

  // methods

  const onClickShowInfo = (index: number) => {
    setShowInfoModal(true);
    setSelectedAstronomyIndex(index);
  };

  const hideInfoModal = () => {
    setShowInfoModal(false);
  };

  const checkExistingLikedPost = (updatedPost: Astronomy): number => {
    return likedAstronomy.findIndex((astronomy) =>
      isEqual(astronomy, updatedPost)
    );
  };

  const handleLikeButton = (index: number) => {
    // mutate isLiked property
    const likedPost = {
      ...astronomyList[index],
      isLiked: !astronomyList[index].isLiked,
    };
    // create new astronomy list and update content of that index
    const newAstronomyList = [...astronomyList];
    let newLikedAstronomyList = [...likedAstronomy];
    newAstronomyList[index] = likedPost;

    // Check if astronomy exist in the array
    const existingIndex = checkExistingLikedPost(astronomyList[index]);
    if (existingIndex !== -1) {
      if (likedPost.isLiked) {
        newLikedAstronomyList[existingIndex] = likedPost;
      } else {
        newLikedAstronomyList[existingIndex] = likedPost;
        newLikedAstronomyList = newLikedAstronomyList.filter(
          (astronomy) => !isEqual(astronomy, newAstronomyList[index])
        );
      }
    } else {
      newLikedAstronomyList = [...newLikedAstronomyList, likedPost];
    }

    // update Astronomy List and Liked Astronomy List
    setAstronomyList(newAstronomyList);
    setLikedAstronomy(newLikedAstronomyList);
  };

  const removeLikedPosted = (index: number) => {
    // Find the LikedAstronomy in Astronomy List
    const editedAstronomy: Astronomy = {
      ...likedAstronomy[index],
      isLiked: !likedAstronomy[index].isLiked,
    };

    const unLikedAstronomy = astronomyList.findIndex((astronomy) =>
      isEqual(astronomy, likedAstronomy[index])
    );

    let newAstronomyList = [...astronomyList];
    let newLikedAstronomyList = [...likedAstronomy];

    //  mutate the existing astronomy in astronomyList and LikedAstronomyList
    newAstronomyList[unLikedAstronomy] = editedAstronomy;
    newLikedAstronomyList[index] = editedAstronomy;
    // remove the mutated LikedPost from the array of LikedAstronomy, and update astronomyList with the mutated posted
    newAstronomyList = [...newAstronomyList, editedAstronomy];
    newLikedAstronomyList = newLikedAstronomyList.filter(
      (astronomy) => astronomy.isLiked
    );

    // updates the two Arrays
    setAstronomyList(newAstronomyList);
    setLikedAstronomy(newLikedAstronomyList);
  };

  return (
    <>
      <CardActionBar
        onClickExplore={showExploreSection}
        onClickLiked={showLikedSection}
        dateToFetch={handleSelectedDates}
      />
      <div className='flex flex-col flex-1 justify-center items-center'>
        {isLoading === true ? (
          <UILoadingSpinner />
        ) : showExplore ? (
          <div className='flex flex-wrap justify-center p-8'>
            {astronomyList.map((card, index) => (
              <UIImage
                key={index}
                image={
                  card.mediaType !== MediaType.VIDEO
                    ? card.hdUrl
                    : card.thumbnailUrl
                }
                imageAlternative={card.title}
                onClickMoreInformation={onClickShowInfo.bind(this, index)}
                onClickLike={handleLikeButton.bind(this, index)}
                isLiked={card.isLiked}
              />
            ))}
          </div>
        ) : (
          <div className='flex flex-1 justify-center  h-screen'>
            {likedAstronomy.length === 0 ? (
              <h1 className='text-4xl font-bold'>No Liked Photos</h1>
            ) : (
              <div className='flex flex-wrap justify-center p-8'>
                {likedAstronomy.map((card, index) => (
                  <UIImage
                    key={index}
                    image={
                      card.mediaType !== MediaType.VIDEO
                        ? card.hdUrl
                        : card.thumbnailUrl
                    }
                    imageAlternative={card.title}
                    onClickMoreInformation={onClickShowInfo.bind(this, index)}
                    onClickLike={removeLikedPosted.bind(this, index)}
                    isLiked={card.isLiked}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      {showInfoModal && (
        <UIModal onClickBackdrop={hideInfoModal}>
          <UICard
            title={astronomyList[selectedAstronomyIndex].title}
            copyright={astronomyList[selectedAstronomyIndex].copyright}
            image={
              astronomyList[selectedAstronomyIndex].mediaType !==
              MediaType.VIDEO
                ? astronomyList[selectedAstronomyIndex].hdUrl
                : astronomyList[selectedAstronomyIndex].thumbnailUrl
            }
            description={astronomyList[selectedAstronomyIndex].explanation}
            datePosted={astronomyList[selectedAstronomyIndex].date}
            isLiked={astronomyList[selectedAstronomyIndex].isLiked}
            closeShowInfoModal={hideInfoModal}
            onClickLike={handleLikeButton.bind(this, selectedAstronomyIndex)}
          />
        </UIModal>
      )}
    </>
  );
};

export default CardList;
