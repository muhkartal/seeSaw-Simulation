document.addEventListener('DOMContentLoaded', function() {
    var plank = document.getElementById('plank');

    plank.addEventListener('click', function(e) {
        var clickX = e.offsetX;
        var plankCenter = plank.offsetWidth / 2;
        var distanceFromCenter = clickX - plankCenter;
        var side = distanceFromCenter < 0 ? 'left' : 'right';

        console.log('Clicked at X:', clickX);
        console.log('Distance from center:', distanceFromCenter);
        console.log('Side:', side);
    });
});
