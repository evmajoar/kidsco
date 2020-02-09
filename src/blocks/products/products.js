var prodSwiper;

function resizeScreen() {
    if ( $( window ).width() < 1200 && prodSwiper === undefined ) {
        prodSwiper = new Swiper( '.products__cards', {
            slidesPerView: 1,
            loop: true,
            spaceBetween: 50,
            pagination: {
                el: '.products__pagination',
                clickable: true,
            }
        } );
    } else if( $( window ).width() > 1200 && prodSwiper !== undefined ) {
        prodSwiper.destroy( false, true );
    }
}

resizeScreen();
$( window ).resize( resizeScreen );