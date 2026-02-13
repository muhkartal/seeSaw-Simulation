document.addEventListener('DOMContentLoaded', function() {
    var plank = document.getElementById('plank');
    var container = document.querySelector('.seesaw-container');
    var objects = [];

    plank.addEventListener('click', function(e) {
        var clickX = e.offsetX;
        var plankCenter = plank.offsetWidth / 2;
        var distanceFromCenter = clickX - plankCenter;

        var weight = Math.floor(Math.random() * 10) + 1;

        var obj = {
            id: Date.now(),
            weight: weight,
            position: distanceFromCenter,
            clickX: clickX
        };
        objects.push(obj);

        var el = document.createElement('div');
        el.className = 'weight-object';
        el.style.left = (clickX + 25) + 'px';
        el.style.top = '100px';
        el.textContent = weight;
        container.appendChild(el);

        console.log('Object added:', obj);
        console.log('Total objects:', objects.length);
    });
});
