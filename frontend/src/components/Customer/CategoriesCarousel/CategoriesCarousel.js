import React, { Fragment } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
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
import classes from './CategoriesCarousel.module.scss';

export const CategoriesCarousel = () => {
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
    { name: 'Mercado', icon: market },
    { name: 'Lanches', icon: hamburguer },
    { name: 'Pizza', icon: pizza },
    { name: 'Vegetariana', icon: veggie },
    { name: 'Japonesa', icon: japanese },
    { name: 'Brasileira', icon: brazilian },
    { name: 'Bebidas', icon: drinks },
    { name: 'Açai', icon: acai },
    { name: 'Doces & Bolos', icon: cakes },
    { name: 'Italiana', icon: italian },
    { name: 'Chinesa', icon: chinese },
  ];

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
            <div>
              <img src={oCategory.icon} alt={oCategory.name} />
            </div>
            <span>{oCategory.name}</span>
          </Fragment>
        ))}
      </Carousel>
    </div>
  );
};
