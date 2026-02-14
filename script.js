document.addEventListener('DOMContentLoaded', function() {
    var plank = document.getElementById('plank');
    var objects = [];

    // Load saved state
    var saved = localStorage.getItem('seesawObjects');
    if (saved) {
        try {
            objects = JSON.parse(saved);
        } catch (e) {
            objects = [];
            localStorage.removeItem('seesawObjects');
        }

        // Render saved objects
        for (var i = 0; i < objects.length; i++) {
            var el = document.createElement('div');
            el.className = 'weight-object';
            el.style.left = objects[i].clickX + 'px';
            el.textContent = objects[i].weight;
            plank.appendChild(el);
        }

        // Recalculate tilt
        var leftTorque = 0;
        var rightTorque = 0;
        var halfPlank = plank.offsetWidth / 2;
        for (var i = 0; i < objects.length; i++) {
            var normalizedDist = Math.abs(objects[i].position) / halfPlank * 10;
            if (objects[i].position < 0) {
                leftTorque += objects[i].weight * normalizedDist;
            } else {
                rightTorque += objects[i].weight * normalizedDist;
            }
        }
        var angle = Math.max(-30, Math.min(30, (rightTorque - leftTorque) / 10));
        plank.style.transform = 'rotate(' + angle + 'deg)';

        console.log('=== Seesaw Debug ===');
        console.log('Objects count:', objects.length);
        console.log('Left torque:', leftTorque.toFixed(2));
        console.log('Right torque:', rightTorque.toFixed(2));
        console.log('Tilt angle:', angle.toFixed(2) + '°');
        console.log('====================');

        // Update weight display
        var leftTotal = 0, rightTotal = 0;
        for (var i = 0; i < objects.length; i++) {
            if (objects[i].position < 0) leftTotal += objects[i].weight;
            else rightTotal += objects[i].weight;
        }
        document.getElementById('leftWeight').textContent = 'Left: ' + leftTotal + ' kg';
        document.getElementById('rightWeight').textContent = 'Right: ' + rightTotal + ' kg';
    }

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
        localStorage.setItem('seesawObjects', JSON.stringify(objects));

        var el = document.createElement('div');
        el.className = 'weight-object';
        el.style.left = clickX + 'px';
        el.textContent = weight;
        plank.appendChild(el);

        console.log('Object added:', obj);
        console.log('Total objects:', objects.length);

        // Calculate torque
        var leftTorque = 0;
        var rightTorque = 0;
        var halfPlank = plank.offsetWidth / 2;

        for (var i = 0; i < objects.length; i++) {
            var normalizedDist = Math.abs(objects[i].position) / halfPlank * 10;
            if (objects[i].position < 0) {
                leftTorque += objects[i].weight * normalizedDist;
            } else {
                rightTorque += objects[i].weight * normalizedDist;
            }
        }

        var angle = Math.max(-30, Math.min(30, (rightTorque - leftTorque) / 10));

        console.log('=== Seesaw Debug ===');
        console.log('Objects count:', objects.length);
        console.log('Left torque:', leftTorque.toFixed(2));
        console.log('Right torque:', rightTorque.toFixed(2));
        console.log('Tilt angle:', angle.toFixed(2) + '°');
        console.log('====================');

        // Update weight display
        var leftTotal = 0;
        var rightTotal = 0;
        for (var i = 0; i < objects.length; i++) {
            if (objects[i].position < 0) {
                leftTotal += objects[i].weight;
            } else {
                rightTotal += objects[i].weight;
            }
        }
        document.getElementById('leftWeight').textContent = 'Left: ' + leftTotal + ' kg';
        document.getElementById('rightWeight').textContent = 'Right: ' + rightTotal + ' kg';

        plank.style.transform = 'rotate(' + angle + 'deg)';
    });

    document.getElementById('resetBtn').addEventListener('click', function() {
        objects = [];

        var weightObjects = plank.querySelectorAll('.weight-object');
        for (var i = 0; i < weightObjects.length; i++) {
            weightObjects[i].remove();
        }

        plank.style.transform = 'rotate(0deg)';
        document.getElementById('leftWeight').textContent = 'Left: 0 kg';
        document.getElementById('rightWeight').textContent = 'Right: 0 kg';
    });
});
