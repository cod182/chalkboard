'use client';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';

const heroImages = [
  {
    imgUrl: '/assets/images/hero-1.svg',
    alt: 'smart watch',
  },
  {
    imgUrl: '/assets/images/hero-2.svg',
    alt: 'bag',
  },
  {
    imgUrl: '/assets/images/hero-3.svg',
    alt: 'lamp',
  },
  {
    imgUrl: '/assets/images/hero-4.svg',
    alt: 'airfryer',
  },
  {
    imgUrl: '/assets/images/hero-5.svg',
    alt: 'chair',
  },
];

const HeroCarousel = () => {
  return (
    <div className="hero-carousel">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={2000}
        showArrows={false}
        showStatus={false}
      >
        {heroImages.map((image) => (
          <Image
            key={image.alt}
            src={image.imgUrl}
            alt={image.alt}
            height={484}
            width={484}
            className="object-contain"
          />
        ))}
      </Carousel>
    </div>
  );
};

export default HeroCarousel;
