var sortButtons = $( '.sort-buttons' );

sortButtons
    .find( '.sort-buttons__button' )
    .not('.sort-buttons__button--show-all')
    .on( 'click', function () {

        var that = $( this );

        sortButtons
            .find( '.sort-buttons__button--selected' )
            .removeClass( 'sort-buttons__button--selected' );

        that
            .addClass( 'sort-buttons__button--selected' );

    } );

sortButtons
    .find( '.sort-buttons__button--show-all' )
    .on( 'click', function () {

        sortButtons
            .find( '.sort-buttons__list' )
            .toggleClass( 'sort-buttons__list--show-all' )

    } );