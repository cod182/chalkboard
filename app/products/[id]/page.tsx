import { redirect } from 'next/navigation';

import { getProductById } from '@/lib/actions';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { formatNumber } from '@/lib/utils';

type Props = {
  params: { id: String };
};

const page = async ({ params: { id } }: Props) => {
  const product: Product = await getProductById(id);

  if (!product) redirect('/');

  return (
    <div className="product-container">
      <div className="flex gap-28 xl:flex-row flex-col">
        {/* Section 1 - Image */}
        <div className="product-image">
          <Image
            src={product.image}
            alt={product.title}
            width={580}
            height={400}
            className="mx-auto"
          />
        </div>
        {/* Section 2 Infos */}
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-start gap-5 flex-wrap pb-6">
            {/* Title & Link */}
            <div className="flex flex-col gap-3">
              <p className="text-28 text-secondary font-semibold">
                {product.title}
              </p>
              <Link
                href={product.url}
                target="_blank"
                className="text-base text-black opacity-50"
              >
                Visit Product
              </Link>
            </div>
            {/* Quick Info */}
            <div className="flex items-center gap-3">
              {/* Reviews Info */}
              <div className="product-hearts">
                <Image
                  src="/assets/icons/red-heart.svg"
                  alt="heart"
                  height={20}
                  width={20}
                />
                <p className="text-base font-semibold text-[#d46f77]">
                  {product.reviewsCount}
                </p>
              </div>
              {/* Bookmark Button */}
              <div className="p-2 bg-white-200 rounded-10">
                <Image
                  src="/assets/icons/bookmark.svg"
                  alt="bookmark"
                  width={20}
                  height={20}
                />
              </div>
              {/* Share BUtton */}
              <div className="p-2 bg-white-200 rounded-10">
                <Image
                  src="/assets/icons/share.svg"
                  alt="share"
                  width={20}
                  height={20}
                />
              </div>
            </div>
          </div>
          {/* Product Information */}
          <div className="product-info">
            <div className="flex flex-col gap-2">
              {/* Current Price */}
              <p className="text-34 text-secondary font-bold">
                {product.currency}
                {formatNumber(product.currentPrice)}
              </p>
              {/* Original Price */}
              <p className="text-21 text-black opacity-50 line-through font-bold">
                {product.currency}
                {formatNumber(product.originalPrice)}
              </p>
            </div>
            {/* Rating / Review */}
            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                {/* Star Rating */}
                <div className="product-stars">
                  <Image
                    src="/assets/icons/star.svg"
                    alt="star"
                    width={16}
                    height={16}
                  />
                  <p className="text-sm text-primary-orange font-semibold">
                    {product.stars}
                  </p>
                </div>
                {/* Product Reviews */}
                <div className="product-reviews">
                  <Image
                    src="/assets/icons/comment.svg"
                    alt="comment"
                    width={16}
                    height={16}
                  />
                  <p className="text-sm text-secondary font-semibold">
                    {product.reviewsCount} reviews
                  </p>
                </div>
              </div>
              {/* Recommendation percentage */}
              <p className="text-sm text-black opacity-50">
                <span className="text-primary-green font-semibold">93%</span>
                of buyers have recommended this
              </p>
            </div>
          </div>
          {/* Prices */}
          <div className="my-7 flex flex-col gap-5">
            <div className="flex gap-5 flex-wrap">
              {/* <PriceCard/> */}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
