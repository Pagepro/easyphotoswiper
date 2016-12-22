import $ from 'jquery'
import PhotoSwipe from 'PhotoSwipe'
import PhotoSwipeUIDefault from '../default-ui/photoswipe-ui-default.js'
import queryString from 'query-string'

export default class EasyPhotoSwiper {
  constructor (config) {
    this.wrap = config.wrap
    this.item = config.item
    this.link = config.link
    this.image = config.image

    this.initPhotoSwipeFromDOM = this.initPhotoSwipeFromDOM.bind(this)
  }

  init () {
    $('body').append(this.getGalleryTemplate())
    this.initPhotoSwipeFromDOM(this.wrap)
  }

  initPhotoSwipeFromDOM (wrap) {
    // loop through all gallery elements and bind events
    const galleryElements = document.querySelectorAll(wrap)

    Array.from(galleryElements).forEach((galeryElement, i) => {
      galeryElement.setAttribute('data-pswp-uid', i + 1)
      $(galeryElement).find(this.link).on('click', (e) => {
        e.preventDefault()

        const $listItem = $(e.currentTarget).parents(this.item)
        const $clickedGallery = $listItem.parents(this.wrap)
        const index = $clickedGallery.find(this.item).index($listItem)

        this.getPhotoSwipe(index, $clickedGallery[0]).init()
      })
    })

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    const hashData = queryString.parse(window.location.hash.substring(1))
    if (hashData.pid && hashData.gid) {
      this.getPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true).init()
    }
  }

  parseThumbnailElements (el) {
    const thumbnails = []

    $(el).find(this.item).each((ind, item) => {
      let thumb
      let $link = $(item).find(this.link)
      let $image = $link.find(this.image)
      let $figcaption = $link.find('figcaption')
      let size = $link.data('size').split('x')

      thumb = {
        src: $link.attr('href'),
        w: parseInt(size[0], 10),
        h: parseInt(size[1], 10),
        title: $figcaption.length ? $figcaption.html() : undefined,
        msrc: $image.length ? $image.attr('src') : undefined,
        el: $link[0]
      }

      thumbnails.push(thumb)
    })

    return thumbnails
  }

  getPhotoSwipe (index, galleryElement, disableAnimation, fromURL) {
    const $pswpElement = $('.pswp')
    const $galleryElement = $(galleryElement)
    const items = this.parseThumbnailElements(galleryElement)
    const options = {
      galleryUID: $galleryElement.data('pswp-uid'),
      getThumbBoundsFn: (index) => {
        // See Options -> getThumbBoundsFn section of documentation for more info
        const thumbnail = $(items[index].el).find('img')[0]
        const rect = thumbnail.getBoundingClientRect()
        const pageYScroll = window.pageYOffset || document.documentElement.scrollTop

        return {
          x: rect.left,
          y: rect.top + pageYScroll,
          w: rect.width
        }
      }
    }

    // PhotoSwipe opened from URL
    if (fromURL) {
      if (options.galleryPIDs) {
        // parse real index when custom PIDs are used
        // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
        for (var j = 0; j < items.length; j++) {
          if (items[j].pid === index) {
            options.index = j
            break
          }
        }
      } else {
        // in URL indexes start from 1
        options.index = parseInt(index, 10) - 1
      }
    } else {
      options.index = parseInt(index, 10)
    }

    // exit if index not found
    if (isNaN(options.index)) {
      return
    }

    if (disableAnimation) {
      options.showAnimationDuration = 0
    }

    // Pass data to PhotoSwipe and initialize it
    return new PhotoSwipe($pswpElement[0], PhotoSwipeUIDefault, items, options)
  }

  getGalleryTemplate () {
    return `<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
              <div class="pswp__bg"></div>
              <div class="pswp__scroll-wrap">
                  <div class="pswp__container">
                      <div class="pswp__item"></div>
                      <div class="pswp__item"></div>
                      <div class="pswp__item"></div>
                  </div>
                  <div class="pswp__ui pswp__ui--hidden">
                      <div class="pswp__top-bar">
                          <div class="pswp__counter"></div>
                          <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
                          <div class="pswp__preloader">
                              <div class="pswp__preloader__icn">
                                <div class="pswp__preloader__cut">
                                  <div class="pswp__preloader__donut"></div>
                                </div>
                              </div>
                          </div>
                      </div>
                      <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                          <div class="pswp__share-tooltip"></div>
                      </div>
                      <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
                      </button>
                      <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
                      </button>
                      <div class="pswp__caption">
                          <div class="pswp__caption__center"></div>
                      </div>
                  </div>
              </div>
          </div>`
  }
}
