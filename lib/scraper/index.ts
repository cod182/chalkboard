import axios from 'axios';
import * as cheerio from 'cheerio';
import { extractPrice, extractCurrency, extractDescription } from '../utils';

export async function scrapeAmazonProduct(url: string) {
  if (!url) return;

  const username = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);
  const port = 22225;
  const session_id = (1000000 * Math.random()) | 0;
  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password: password,
    },
    host: 'brd.superproxy.io',
    post: port,
    rejectUnauthorized: false,
  };

  try {
    const response = await axios.get(url, options);
    const $ = cheerio.load(response.data);
    const title = $('#productTitle').text().trim();
    const currentPrice = extractPrice(
      $('.priceToPay span.a-offscreen'),
      $('.priceToPay span.a-price-white'),
      $('a.size.base.a-color-price'),
      $('.a-button-selected .a-color-base'),
      $('.a-price.a-text-price')
    );

    const originalPrice = extractPrice(
      // $('#price-block_ourprice'),
      // $('.a-price.a-text-price span.a-offscreen'),
      // $('#listPrice'),
      // $('#priceBlock_dealprice'),
      // $('.a-size-base.a-color-price'),
      $(
        '#corePriceDisplay_desktop_feature_div span.a-section.a-spacing-small.aok-align-center span span.aok-relative span.a-size-small.a-color-secondary.aok-align-center.basisPrice span.a-price.a-text-price span.a-offscreen'
      )
    );

    const outOfStock =
      $('#availability span').text().trim().toLowerCase() ===
      'currently unavailable';

    const images =
      $('#imgBlkFront').attr('data-a-dynamic-image') ||
      $('#landingImage').attr('data-a-dynamic-image') ||
      '{}';

    const imageUrls = Object.keys(JSON.parse(images));

    const currency = extractCurrency($('.a-price-symbol'));

    const discountRate = $('.savingsPercentage').text().replace(/[-%]/g, '');

    const stars = $(
      'a.a-popover-trigger.a-declarative span.a-size-base.a-color-base'
    )
      .first()
      .text()
      .trim();

    const reviews = $('#acrCustomerReviewText')
      .first()
      .text()
      .replace(/[^\d.]/g, '');

    const description = extractDescription($);

    const category = $(
      'ul.a-unordered-list.a-horizontal.a-size-small li span.a-list-item'
    )
      .first()
      .text()
      .trim();

    const data = {
      url,
      currency: currency || '$',
      image: imageUrls[0],
      title,
      currentPrice: Number(currentPrice),
      originalPrice: Number(originalPrice) || Number(currentPrice),
      priceHistory: [],
      discountHistory: Number(discountRate),
      category: category,
      reviewsCount: Number(reviews),
      stars: Number(stars),
      isOutOfStock: outOfStock,
      description: description,
      lowestPrice: Number(currentPrice) || Number(currentPrice),
      highestPrice: Number(currentPrice) || Number(currentPrice),
      average: Number(currentPrice) || Number(originalPrice),
    };
    return data;
  } catch (error: any) {
    throw new Error(`Failed to to scrape product: ${error.message}`);
  }
}
