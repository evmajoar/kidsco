var ftw = $( '.form__field-text-wrapper' );

$( '.form__wrapper' ).each(function () {
    $( this ).find( '.field-text--radio input' ).on( 'click', function () {
        var that = $( this );

        if( that.is(':checked') ) {
            that.closest( '.form__fieldset' ).find( '.field-text' ).removeClass( 'field-text--checked' );
            that.closest( '.field-text--radio' ).addClass( 'field-text--checked' );

            if ( that.data( 'name' ) === 'pickup' ) {
                $( '.order-contacts-data__help' ).addClass( 'order-contacts-data__help--show' );
            } else if( that.data( 'name' ) === 'delivery' ) {
                $( '.order-contacts-data__help' ).removeClass( 'order-contacts-data__help--show' )
            }
        }
    } );
});

$( ftw ).find( '.field-text--search input' )
    .on( 'focus', function () {
        $( this ).closest( '.field-text--search' ).addClass( 'field-text--active' );
    } )
    .on( 'blur', function () {
        $( this ).closest( '.field-text--search' ).removeClass( 'field-text--active' );
    } );

$( '.order-contacts-data__help-button' ).on( 'click', function() {
    $( '.order-contacts-data__help-map' ).toggleClass( 'order-contacts-data__help-map--show' );
} );

