# EasyPhotoSwiper

## Installation

1. Install the module:

```sh
npm install --save-dev easyphotoswiper
```

2. Import the module in your JavaScript files:

```javascript
import EasyPhotoSwiper from 'easyphotoswiper'
```

3. Executhe the script:

```javascript
const PhotoGallery = new EasyPhotoSwiper({
  wrap: '.js-gallery',
  item: '.js-gallery__item',
  link: '.js-gallery__link',
  image: 'img'
})
PhotoGallery.init()
```

4. Import styles in your SCSS files and setup $images_url variable:

```scss
$images_url: '../img/';
@import "node_modules/easyphotoswiper/src/easyphotoswiper";
```

5. Grab images and save them in your images folder (src/img):

https://raw.githubusercontent.com/dimsemenov/PhotoSwipe/master/dist/default-skin/default-skin.svg
https://github.com/dimsemenov/PhotoSwipe/blob/master/dist/default-skin/default-skin.svg
https://github.com/dimsemenov/PhotoSwipe/blob/master/dist/default-skin/preloader.gif

6. Enjoy!

## Configuration

1. Your HTML needs to be well prepared, example below:

```html
<div class="c-gallery-list js-gallery">
    <div class="c-gallery-list__item js-gallery__item">
        <div class="c-gallery-item">
            <a href="static/img/pic_gal-01-big.jpg" itemprop="contentUrl" data-size="1140x759" class="c-gallery-item__inner js-gallery__link">
                <figure class="o-image">
                    <img class="o-image__media" src="static/img/pic_gal-01.jpg" alt="" />
                </figure>
            </a>
        </div>
    </div>
</div>
```

2. Make sure if you have JS class for wrapper, list item and list link.
3. List link should contain data-size attribute.


## Features
* Build with [Babel](https://babeljs.io). (ES6 -> ES5)
* Test with [mocha](https://mochajs.org).
* Cover with [istanbul](https://github.com/gotwarlost/istanbul).
* Check with [eslint](eslint.org).
* Deploy with [Travis](travis-ci.org).

## Commands
- `npm run clean` - Remove `lib/` directory
- `npm test` - Run tests. Tests can be written with ES6 (WOW!)
- `npm test:watch` - You can even re-run tests on file changes!
- `npm run cover` - Yes. You can even cover ES6 code.
- `npm run lint` - We recommend using [airbnb-config](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb). It's fantastic.
- `npm run test:examples` - We recommend writing examples on pure JS for better understanding module usage.
- `npm run build` - Do some magic with ES6 to create ES5 code.
- `npm run prepublish` - Hook for npm. Do all the checks before publishing you module.


