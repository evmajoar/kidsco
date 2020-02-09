var brands = new Swiper ('.brands__carousel', {
    slidesPerView: 5,
    loop: true,

    pagination: {
        el: '.brands__pagination',
        clickable: true,
    },

    navigation: {
        nextEl: '.brands__arrow--next',
        prevEl: '.brands__arrow--prev',
    },

    breakpoints: {
        1296: {
            slidesPerView: 1,
        },
    }
});