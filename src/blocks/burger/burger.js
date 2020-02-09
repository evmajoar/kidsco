var burger = $( '.burger' );

burger.on( 'click', function () {

    var self = $( this );
    var targetId = self.data( 'target-id' );
    var targetClassToggle = self.data( 'target-class-toggle' );

    if ( targetId &&  targetClassToggle) {
        $(this).toggleClass('burger--close');
        $('.' + targetId).toggleClass(targetClassToggle);
    }
} );
