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
interface CardListProps {}

const CardList: React.FC<CardListProps> = (props) => {
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
  const [likedAstronomy, setLikedAstronomy] = React.useState<Astronomy[]>([]);
  const [showInfoModal, setShowInfoModal] = React.useState<boolean>(false);
  const [selectedAstronomy, setSelectedAstronomy] =
    React.useState<Astronomy>(null);
  const [selectedAstronomyIndex, setSelectedAstronomyIndex] =
    React.useState<number>(null);
  const [selectedLikedIndex, setSelectedLikedIndex] =
    React.useState<number>(null);

  // Card Action Bar Methods

  const showExploreSection = () => {
    setShowExplore(true);
  };

  const showLikedSection = () => {
    setShowExplore(false);
  };

  const handleSelectedDates = (dateToFetch: string[]) => {
    setDateToFetch(dateToFetch);
  };

  // Hooks
  React.useEffect(() => {
    const fetchAstronomy = async () => {
      setIsLoading(true);
      const selectedDate = parseSelectedDates(dateToFetch);
      const response = await getJSON(selectedDate[0], selectedDate[1]);

      let responseData = await response.json();

      if (!response.ok) {
        throw new Error(`${responseData.code} - ${responseData.msg}`);
      }

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
      setIsLoading(false);
    });
  }, [dateToFetch]);

  // methods

  const onClickShowInfo = (index: number) => {
    setShowInfoModal(true);
    setSelectedAstronomyIndex(index);
  };

  const onClickShowLikedInfo = (index: number) => {
    setShowInfoModal(true);
    setSelectedAstronomy(likedAstronomy[index]);
    setSelectedLikedIndex(index);
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
    // newAstronomyList = [...newAstronomyList, editedAstronomy];

    // remove the mutated LikedPost from the array of LikedAstronomy, and update astronomyList with the mutated posted
    newLikedAstronomyList[index] = editedAstronomy;

    // When remove an already existing astronomy update the selected Astronomy with the new state of isLiked
    if (selectedAstronomy) {
      setSelectedAstronomy(editedAstronomy);
    }

    newLikedAstronomyList = newLikedAstronomyList.filter(
      (astronomy) => astronomy.isLiked
    );

    // updates the two Arrays
    setAstronomyList(newAstronomyList);
    setLikedAstronomy(newLikedAstronomyList);
  };

  const toggleLikeFromModal = (index: number, newPost: Astronomy) => {
    //  If Liked Astronomy is empty simple add that value and mutate the Astronomy List
    //  if not empty, and liked is clicked, button object does not exist
    //  Add it to the array and update the status on the Astronomy List
    // else do the same

    let newAstronomyList = [...astronomyList];
    let newLikedAstronomyList = [...likedAstronomy];
    const editedAstronomy: Astronomy = {
      ...newPost,
      isLiked: !newPost.isLiked,
    };

    const toggledPostIndex = astronomyList.findIndex(
      (astronomy) => astronomy.date === newPost.date
    );

    const existingIndex = checkExistingLikedPost(newPost);
    if (existingIndex !== -1) {
      removeLikedPosted(index);
    } else {
      newAstronomyList[toggledPostIndex] = editedAstronomy;
      newLikedAstronomyList = [...newLikedAstronomyList, editedAstronomy];
      // Update the content of the selected Astronomy to reflect new state of isLiked and prevent duplication
      setSelectedAstronomy(editedAstronomy);
      setAstronomyList(newAstronomyList);
      setLikedAstronomy(newLikedAstronomyList);
    }
  };

  const Card = () => {
    if (isLoading) {
      return (
        <UILoadingSpinner
          containerClassName={'flex flex-1 h-full justify-center items-center'}
        />
      );
    }

    // if (errorMessage.length !== 0) {
    //   return (
    //     <div className='bg-purple-100 flex justify-center items-center p-12 h-40  sm:w-4/5 text-red-600 sm:p-20 font-bold'>
    //       {errorMessage}
    //     </div>
    //   );
    // }

    if (showExplore) {
      return (
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
      );
    } else {
      return (
        <>
          {likedAstronomy.length === 0 ? (
            <h1 className='bg-purple-300 flex justify-center items-center p-12  h-40 text-4xl font-bold sm:w-4/5 sm:p-20'>
              No Liked Photos
            </h1>
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
                  onClickMoreInformation={onClickShowLikedInfo.bind(
                    this,
                    index
                  )}
                  onClickLike={removeLikedPosted.bind(this, index)}
                  isLiked={card.isLiked}
                />
              ))}
            </div>
          )}
        </>
      );
    }
  };

  return (
    <>
      <CardActionBar
        onClickExplore={showExploreSection}
        onClickLiked={showLikedSection}
        dateToFetch={handleSelectedDates}
      />
      <div className='flex flex-col flex-1 justify-center items-center'>
        <Card />
      </div>
      {showInfoModal && (
        <UIModal onClickBackdrop={hideInfoModal}>
          <UICard
            title={
              showExplore
                ? astronomyList[selectedAstronomyIndex].title
                : selectedAstronomy.title
            }
            copyright={
              showExplore
                ? astronomyList[selectedAstronomyIndex].copyright
                : selectedAstronomy.copyright
            }
            image={
              showExplore
                ? astronomyList[selectedAstronomyIndex].mediaType !==
                  MediaType.VIDEO
                  ? astronomyList[selectedAstronomyIndex].hdUrl
                  : astronomyList[selectedAstronomyIndex].thumbnailUrl
                : selectedAstronomy.mediaType !== MediaType.VIDEO
                ? selectedAstronomy.hdUrl
                : selectedAstronomy.thumbnailUrl
            }
            description={
              showExplore
                ? astronomyList[selectedAstronomyIndex].explanation
                : selectedAstronomy.explanation
            }
            datePosted={
              showExplore
                ? astronomyList[selectedAstronomyIndex].date
                : selectedAstronomy.date
            }
            isLiked={
              showExplore
                ? astronomyList[selectedAstronomyIndex].isLiked
                : selectedAstronomy.isLiked
            }
            closeShowInfoModal={hideInfoModal}
            onClickLike={
              showExplore
                ? handleLikeButton.bind(this, selectedAstronomyIndex)
                : toggleLikeFromModal.bind(
                    this,
                    selectedLikedIndex,
                    selectedAstronomy
                  )
            }
          />
        </UIModal>
      )}
    </>
  );
};

export default CardList;
