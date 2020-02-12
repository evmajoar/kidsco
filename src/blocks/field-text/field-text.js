var form = $( '.form' );

form.find( '.field-text--phone input' ).inputmask(
    {
        "mask": "+7 (999) 999-99-99",
        showMaskOnHover: false
    }
);

form.find( '.field-text--date input' ).inputmask(
    "dd.mm.yyyy",
    {
        placeholder:"__.__.___",
        // yearrange: {
        //     minyear: '1950',
        //     maxyear: '2010',
        // },
        insertMode:false,
        showMaskOnHover:false,
        alias:"dd/mm/yyyy"
    }
);