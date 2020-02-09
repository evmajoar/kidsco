var presentationContainer = '.presentation__carousel';

var presentation = new Swiper ( presentationContainer, {
    slidesPerView: 1,
    loop: true,
    spaceBetween: 50,

    autoplay: {
        speed: 300,
        delay: 5000,
        disableOnInteraction: false
    },

    pagination: {
        el: '.presentation__pagination',
        clickable: true,
        renderBullet: function ( index, className ) {
            return '<button class="' + className + '" type="button">' +
                '<span class="' + className + '-text' + '"> Слайд N1' + (index) + '</span>'+
                '<span class="' + className + '-tracker' + '">' +
                    '<svg class="icon-circle" viewBox="-10 -10 220 220">\n' +
                        '<g class="icon-circle-g1" transform="translate(100,100)">\n' +
                            '<path d="M 0,-100 A 100,100 0 0,1 86.6,-50" stroke="url(#cl1)"></path>\n' +
                            '<path d="M 86.6,-50 A 100,100 0 0,1 86.6,50" stroke="url(#cl2)"></path>\n' +
                            '<path d="M 86.6,50 A 100,100 0 0,1 0,100" stroke="url(#cl3)"></path>\n' +
                            '<path d="M 0,100 A 100,100 0 0,1 -86.6,50" stroke="url(#cl4)"></path>\n' +
                            '<path d="M -86.6,50 A 100,100 0 0,1 -86.6,-50" stroke="url(#cl5)"></path>\n' +
                            '<path d="M -86.6,-50 A 100,100 0 0,1 0,-100" stroke="url(#cl6)"></path>\n' +
                        '</g>\n' +
                        '<g class="icon-circle-g2">\n' +
                            '<path d="M200,100 C200,44.771525 155.228475,0 100,0 C44.771525,0 0,44.771525 0,100 C0,155.228475 44.771525,200 100,200 C155.228475,200 200,155.228475 200,100 Z" stroke-dashoffset="629"></path>\n' +
                        '</g>\n' +
                        '<g class="icon-circle-g3">\n' +
                            '<path d="M200,100 C200,44.771525 155.228475,0 100,0 C44.771525,0 0,44.771525 0,100 C0,155.228475 44.771525,200 100,200 C155.228475,200 200,155.228475 200,100 Z" stroke-dashoffset="629"></path>\n' +
                        '</g>\n' +
                    '</svg>\n' +
                '</span>' +
                '</button>';
        },
    },

    navigation: {
        nextEl: '.presentation__arrow--next',
        prevEl: '.presentation__arrow--prev',
    },
});

$( '.icon-circle-g3 path', presentationContainer ).css( 'animation-duration', presentation.passedParams.autoplay.delay + 'ms' );