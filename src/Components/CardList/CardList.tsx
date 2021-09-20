import React from 'react';
import { Astronomy } from '../../model';
import UIModal from '../../UIKit/UIModal/UIModal';
import UICard from '../../UIKit/UICard/UICard';
import UIImage from '../../UIKit/UIImage/UIImage';
import UILoadingSpinner from '../../UIKit/UILoadingSpinner/UILoadingSpinner';
import { getJSON } from '../../utils';

const data = [
  {
    date: '2021-09-01',
    explanation:
      'Why would galaxies emit jets that look like ghosts?  And furthermore, why do they appear to be dancing?  The curled and fluffy jets from the supermassive black holes at the centers of two host galaxies (top center and lower left) are unlike anything seen before.  They were found by astronomers using the Australian Square Kilometer Array Pathfinder (ASKAP) radio telescope when creating maps tracing the evolution of galaxies.  Images preceding this Evolutionary Map of the Universe survey only showed amorphous blobs.  Eventually, comparisons of relative amounts of energy emitted revealed the glowing elongated structures were created by electrons streaming around magnetic field lines',
    hdUrl:
      'https://apod.nasa.gov/apod/image/2109/DancingGhosts_EnglishNorris_2524.jpg',
    media_type: 'image',
    service_version: 'v1',
    title: 'Dancing Ghosts: Curved Jets from Active Galaxies',
    url: 'https://apod.nasa.gov/apod/image/2109/DancingGhosts_EnglishNorris_960.jpg',
  },
  {
    copyright: 'Josep Drudis',
    date: '2021-09-02',
    explanation:
      "Find the Big Dipper and follow the handle away from the dipper's bowl until you get to the last bright star. Then, just slide your telescope a little south and west and you'll come upon this stunning pair of interacting galaxies, the 51st entry in Charles Messier's famous catalog. Perhaps the original spiral nebula, the large galaxy with well defined spiral structure is also cataloged as NGC 5194. Its spiral arms and dust lanes clearly sweep in front of its companion galaxy (top), NGC 5195. The pair are about 31 million light-years distant and officially lie within the angular boundaries of the small constellation Canes Venatici. Though M51 looks faint and fuzzy to the eye, deep images like this one reveal its striking colors and galactic tidal debris.",
    hdUrl:
      'https://apod.nasa.gov/apod/image/2109/M51-SL14-RGB-196-Final-cC.jpg',
    media_type: 'image',
    service_version: 'v1',
    title: 'M51: The Whirlpool Galaxy',
    url: 'https://apod.nasa.gov/apod/image/2109/M51-SL14-RGB-196-Final-cC_1024.png',
  },
  {
    copyright: 'Satwant Kumar',
    date: '2021-09-03',
    explanation:
      "These cosmic clouds have blossomed 1,300 light-years away, in the fertile starfields of the constellation Cepheus. Called the Iris Nebula, NGC 7023 is not the only nebula to evoke the imagery of flowers. Still, this deep telescopic image shows off the Iris Nebula's range of colors and symmetries, embedded in surrounding fields of interstellar dust. Within the Iris itself, dusty nebular material surrounds a hot, young star. The dominant color of the brighter reflection nebula is blue, characteristic of dust grains reflecting starlight. Central filaments of the reflection nebula glow with a faint reddish photoluminesence as some dust grains effectively convert the star's invisible ultraviolet radiation to visible red light. Infrared observations indicate that this nebula contains complex carbon molecules known as PAHs. The dusty blue petals of the Iris Nebula span about six light-years.",
    hdUrl: 'https://apod.nasa.gov/apod/image/2109/Irish_RC8_LHaRGB.png',
    media_type: 'image',
    service_version: 'v1',
    title: 'NGC 7023: The Iris Nebula',
    url: 'https://apod.nasa.gov/apod/image/2109/Irish_RC8_LHaRGB1024.png',
  },
  {
    copyright: 'Dennis Huff',
    date: '2021-09-04',
    explanation:
      "Not the Hubble Space Telescope's latest view of a distant galactic nebula, this illuminated cloud of gas and dust dazzled early morning spacecoast skygazers on August 29. The snapshot was taken at 3:17am from Space View Park in Titusville, Florida. That's about 3 minutes after the launch of a SpaceX Falcon 9 rocket on the CRS-23 mission to resupply the International Space Station. It captures drifting plumes and exhaust from the separated first and second stage of the rocket rising through still dark skies. The lower bright dot is the second stage continuing on to low Earth orbit. The upper one is the rocket's first stage performing a boostback burn. Of course the first stage booster returned to make the first landing on the latest autonomous spaceport drone ship to arrive in the Atlantic, A Shortfall of Gravitas.",
    hdUrl: 'https://apod.nasa.gov/apod/image/2109/DSC06988copy2.jpg',
    media_type: 'image',
    service_version: 'v1',
    title: 'A Falcon 9 Nebula',
    url: 'https://apod.nasa.gov/apod/image/2109/DSC06988copy2_1024.jpg',
  },
  {
    date: '2021-09-05',
    explanation:
      "The Earth and Moon are rarely photographed together. One of most spectacular times this occurred was about 30 years ago when the Jupiter-bound Galileo spacecraft zoomed past our home planetary system.  Then, robotic Galileo watched from about 15-times the Earth-Moon separation as our only natural satellite glided past our home world.  The featured video combines 52 historic color-enhanced images. Although our Moon may appear small next to the Earth, no other planet in our Solar System has a satellite so comparable in size .  The Sun, far off to the right, illuminated about half of each sphere, and shows the spinning Earth's white clouds, blue oceans, and tan continents.",
    media_type: 'video',
    service_version: 'v1',
    thumbnail_url: 'https://img.youtube.com/vi/tvB0mdkrG3Q/0.jpg',
    title: 'Earth and Moon',
    url: 'https://www.youtube.com/embed/tvB0mdkrG3Q?rel=0',
  },
];

interface CardListProps {
  isExploreActive?: boolean;
  selectedDate: string[];
}

const CardList: React.FC<CardListProps> = (props) => {
  const { isExploreActive, selectedDate } = props;

  // States
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>('');
  const [astronomyList, setAstronomyList] = React.useState<Astronomy[]>([]);
  const [showInfoModal, setShowInfoModal] = React.useState<boolean>(false);
  const [showLikedSection, setShowLikedSection] =
    React.useState<boolean>(false);
  const [selectedAstronomy, setSelectedAstronomy] = React.useState<Astronomy>(
    {}
  );
  const [likedAstronomy, setLikedAstronomy] = React.useState<Astronomy[]>();

  // Hooks
  React.useEffect(() => {
    const fetchAstronomy = async () => {
      setIsLoading(true);

      const response = await getJSON(selectedDate[0], selectedDate[1]);

      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      const responseData = await response.json();

      const fetchedData: Astronomy[] = [];

      // Parsed Data and set isLiked to false
      for (let key in fetchedData) {
        fetchedData.push({
          copyright: responseData[key].copyright,
          date: responseData[key].date,
          explanation: responseData[key].explanation,
          hdUrl: responseData[key].hdurl,
          mediaType: responseData[key].mediaType,
          title: responseData[key].title,
          url: responseData[key].url,
          isLiked: false,
        });
      }

      setAstronomyList(responseData);
      setIsLoading(false);
    };

    fetchAstronomy().catch((error) => {
      setErrorMessage(error.message);
    });
  }, [selectedDate]);

  // methods

  const onClickShowInfo = (index: number) => {
    setShowInfoModal(true);
    console.log(index);
    // setSelectedAstronomy(data[index]);
    setSelectedAstronomy(astronomyList[index]);
  };

  const hideInfoModal = () => {
    setShowInfoModal(false);
  };

  const handleLikeButton = (index: number) => {};

  return (
    <>
      <div className='flex flex-col flex-1 justify-center items-center'>
        {isLoading === true ? (
          <UILoadingSpinner />
        ) : isExploreActive ? (
          <div className='flex flex-wrap justify-center p-8'>
            {data.map((card, index) => (
              <UIImage
                key={index}
                image={card.hdUrl}
                imageAlternative={card.title}
                onClickMoreInformation={onClickShowInfo.bind(this, index)}
                onClickLike={handleLikeButton.bind(this, index)}
              />
            ))}
          </div>
        ) : (
          <div className='flex justify-center item-center h-screen'>
            <h1>No Liked Photos</h1>
          </div>
        )}
      </div>
      {showInfoModal && (
        <UIModal onClickBackdrop={hideInfoModal}>
          <UICard
            // title={data[0].title}
            // image={data[0].hdurl}
            // description={data[0].explanation}
            // datePosted={data[0].date}
            title={selectedAstronomy.title}
            image={selectedAstronomy.hdUrl}
            description={selectedAstronomy.explanation}
            datePosted={selectedAstronomy.date}
          />
        </UIModal>
      )}
    </>
  );
};

export default CardList;
