import React, { Fragment } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useDispatch } from 'react-redux';
import acai from '../../../assets/icons/acai.png';
import brazilian from '../../../assets/icons/brazilian.png';
import cakes from '../../../assets/icons/cakes.png';
import chinese from '../../../assets/icons/chinese.png';
import drinks from '../../../assets/icons/drinks.png';
import hamburguer from '../../../assets/icons/hamburguer.png';
import italian from '../../../assets/icons/italian.png';
import japanese from '../../../assets/icons/japanese.png';
import market from '../../../assets/icons/market.png';
import pizza from '../../../assets/icons/pizza.png';
import veggie from '../../../assets/icons/veggie.png';
import * as actions from '../../../store/actions/index';
import classes from './CategoriesCarousel.module.scss';

export const CategoriesCarousel = () => {
  /* Redux Dispatchers */
  const dispatch = useDispatch();
  const onFetchRestaurants = payload =>
    dispatch(actions.fetchRestaurantsFilter(payload));

  /* Constants and Variables */
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 9,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 5,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
    },
  };

  const aCategories = [
    { name: 'Mercado', icon: market, enum: 'MERCADO' },
    { name: 'Lanches', icon: hamburguer, enum: 'LANCHES' },
    { name: 'Pizza', icon: pizza, enum: 'PIZZA' },
    { name: 'Vegetariana', icon: veggie, enum: 'VEGETARIANA' },
    { name: 'Japonesa', icon: japanese, enum: 'JAPONESA' },
    { name: 'Brasileira', icon: brazilian, enum: 'BRASILEIRA' },
    { name: 'Bebidas', icon: drinks, enum: 'BEBIDAS' },
    { name: 'Açai', icon: acai, enum: 'ACAI' },
    { name: 'Doces & Bolos', icon: cakes, enum: 'DOCES_BOLOS' },
    { name: 'Italiana', icon: italian, enum: 'ITALIANA' },
    { name: 'Chinesa', icon: chinese, enum: 'CHINESA' },
  ];

  // Fetch restaurants based on clicked category
  const handleCategory = category => {
    const storedAddress = localStorage.getItem('IFOOD_address');

    if (storedAddress) {
      onFetchRestaurants({
        coordinates: JSON.parse(storedAddress).coordinates,
        type: category,
      });
    }
  };

  return (
    <div>
      <Carousel
        swipeable={true}
        draggable={true}
        responsive={responsive}
        infinite={true}
        customTransition="transform 300ms ease-in-out"
        transitionDuration={500}
        containerClass={classes.carousel}
        itemClass={classes.carousel_item}
      >
        {aCategories.map(oCategory => (
          <Fragment key={oCategory.name}>
            <div onClick={() => handleCategory(oCategory.enum)}>
              <img src={oCategory.icon} alt={oCategory.name} />
            </div>
            <span>{oCategory.name}</span>
          </Fragment>
        ))}
      </Carousel>
    </div>
  );
};
