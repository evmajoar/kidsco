var amountMin = $( '#amount-min' ),
    amountMinVal = amountMin.data( 'value-min' ),
    parseAmountMinVal = parseInt(amountMinVal),
    amountMax = $( '#amount-max' ),
    amountMaxVal = amountMax.data( 'value-max' ),
    parseAmountMaxVal = parseInt(amountMaxVal),
    rangeContainer= $( '#form__slider-range' );

rangeContainer.slider({
    range: true,
    min: parseAmountMinVal,
    max: parseAmountMaxVal,
    values: [
        parseAmountMinVal,
        parseAmountMaxVal
    ],
    slide: function( event, ui ) {
        amountMin.val( ui.values[ 0 ].toLocaleString() + ' ₽' );
        amountMax.val( ui.values[ 1 ].toLocaleString() + ' ₽' );
    }
});

amountMin.val( rangeContainer.slider( "values", 0 ).toLocaleString() + ' ₽' );
amountMax.val( rangeContainer.slider( "values", 1 ).toLocaleString() + ' ₽' );

$( '.field-text__range' ).find( 'input' ).each(function () {
    $(this)


        //- проверка при вводе
        .on( 'input', function () {
            var that = $( this ),
                thatVal = that.val(),
                thatValRep = Number( thatVal.replace(/\s+/g, '').replace('₽', '') );

            that.val( thatVal.replace(/[A-Za-zА-Яа-яЁё]/, '') );

            if( !isNaN( thatValRep ) ) {
                that.val( thatVal * 1 );

                // if( thatValRep >= Number( amountMaxVal ) ) {
                //     that.val( amountMaxVal );
                // }
            }
        })


        //- проверка при смене
        .on( 'change', function () {
            var that = $( this ),
                value1 = Number( amountMin.val().replace(/\s+/g, '').replace('₽', '') ),
                value2 = Number( amountMax.val().replace(/\s+/g, '').replace('₽', '') );

            if( that.is( amountMin ) ) {
                if ( value1 > value2 ) {
                    value1 = value2;
                    that.val( value1 );
                    rangeContainer.slider( "values", 0, value1 );
                }

                rangeContainer.slider( "values", 0, value1 );
            }

            if( that.is( amountMax ) ) {
                if( value1 > value2  ){
                    value2 = value1;
                    that.val( value2 );
                    rangeContainer.slider( "values", 1, value2 );
                }

                rangeContainer.slider( "values", 1, value2 );
            }
        } )


        //- проверка при фокусе
        .on( 'focus', function () {

            var that = $( this ),
                thatVal = that.val(),
                thatValRep = Number( thatVal.replace(/\s+/g, '').replace('₽', '') );

            that.val( thatValRep );

            thatValRep === 0 ? that.val( '' ) : false;

        } )


        //- проверка при потере фокуса
        .on( 'blur', function () {

            var that = $( this ),
                thatValNumber = Number( that.val() );

            if ( !isNaN( thatValNumber ) ) {
                that.val( thatValNumber.toLocaleString() + ' ₽' );
            } else {
                that.val( 0 + ' ₽' );
            }

        } );
});

$( '.filter' )
    .find( '.form__legend' )
    .on( 'click', function () {
        $( this ).toggleClass( 'form__legend--hide-fields' );
    } );