document.addEventListener('DOMContentLoaded', function() {
    var plank = document.getElementById('plank');
    var objects = [];

    function calculateTorque() {
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

        return { leftTorque: leftTorque, rightTorque: rightTorque };
    }

    function calculateAngle(leftTorque, rightTorque) {
        return Math.max(-30, Math.min(30, (rightTorque - leftTorque) / 10));
    }

    function updateWeightDisplay() {
        var leftTotal = 0;
        var rightTotal = 0;
        for (var i = 0; i < objects.length; i++) {
            if (objects[i].position < 0) leftTotal += objects[i].weight;
            else rightTotal += objects[i].weight;
        }
        document.getElementById('leftWeight').textContent = 'Left: ' + leftTotal + ' kg';
        document.getElementById('rightWeight').textContent = 'Right: ' + rightTotal + ' kg';
    }

    function updateSeesaw() {
        var torques = calculateTorque();
        var angle = calculateAngle(torques.leftTorque, torques.rightTorque);
        plank.style.transform = 'rotate(' + angle + 'deg)';
        updateWeightDisplay();
    }

    function renderObject(obj, animate) {
        var el = document.createElement('div');
        el.className = 'weight-object';
        el.style.left = obj.clickX + 'px';

        var size = 20 + obj.weight * 3;
        el.style.width = size + 'px';
        el.style.height = size + 'px';

        var hue = ((obj.weight - 1) / 9) * 120;
        el.style.backgroundColor = 'hsl(' + (120 - hue) + ', 70%, 45%)';

        var label = document.createElement('span');
        label.className = 'weight-label';
        label.textContent = obj.weight + 'kg';
        el.appendChild(label);

        if (animate) {
            el.classList.add('drop-animation');
        }

        plank.appendChild(el);
    }

    function renderAllObjects() {
        var existing = plank.querySelectorAll('.weight-object');
        for (var i = 0; i < existing.length; i++) {
            existing[i].remove();
        }
        for (var i = 0; i < objects.length; i++) {
            renderObject(objects[i], false);
        }
    }

    function saveState() {
        localStorage.setItem('seesawObjects', JSON.stringify(objects));
    }

    function loadState() {
        var saved = localStorage.getItem('seesawObjects');
        if (saved) {
            try {
                objects = JSON.parse(saved);
            } catch (e) {
                objects = [];
                localStorage.removeItem('seesawObjects');
            }
        }
    }

    // Load saved state and render
    loadState();
    renderAllObjects();
    updateSeesaw();

    plank.addEventListener('click', function(e) {
        var clickX = e.offsetX;
        var plankCenter = plank.offsetWidth / 2;
        var distanceFromCenter = clickX - plankCenter;

        if (Math.abs(distanceFromCenter) < 10) return;
        if (clickX < 5 || clickX > plank.offsetWidth - 5) return;

        var weight = Math.floor(Math.random() * 10) + 1;

        var obj = {
            id: Date.now(),
            weight: weight,
            position: distanceFromCenter,
            clickX: clickX
        };
        objects.push(obj);
        renderObject(obj, true);
        updateSeesaw();
        saveState();
    });

    document.getElementById('resetBtn').addEventListener('click', function() {
        objects = [];
        localStorage.removeItem('seesawObjects');
        renderAllObjects();
        updateSeesaw();
    });
});
