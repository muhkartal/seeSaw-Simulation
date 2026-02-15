# Seesaw Simulation

A physics-based seesaw simulation built with pure JavaScript, HTML, and CSS.

## Live Demo

[View Demo](https://muhkartal.github.io/seeSaw-Simulation/)

## How It Works

- Click anywhere on the seesaw plank to drop a weight object (1-10 kg)
- The seesaw tilts based on real torque physics
- Objects closer to the edge have more leverage than those near the center
- Maximum tilt angle is capped at ±30 degrees
- State persists across page refreshes via localStorage

## Physics

The simulation uses real torque calculations:

- **Torque** = weight × normalized distance from pivot
- Distance is normalized to a 0-10 scale (where 10 = edge of plank)
- Tilt angle = clamp(±30°, torque difference / sensitivity factor)

## Design Decisions

- **DOM-based rendering**: Used CSS transforms instead of Canvas for smooth animations and simpler interaction handling
- **CSS transitions**: Smooth tilting with `transition: transform 0.8s ease-out`
- **Normalized distances**: Pixel distances normalized to 0-10 scale for consistent torque behavior regardless of plank size
- **LocalStorage**: State persistence across page refreshes with error handling for corrupted data
- **Responsive scaling**: CSS `transform: scale()` maintains physics calculations while fitting smaller screens

## Trade-offs & Limitations

- Click detection on rotated plank uses `offsetX` — works in modern browsers but may have minor imprecision at extreme tilt angles
- Responsive design uses CSS scaling rather than reflowing, which preserves physics accuracy but may look slightly blurry on very small screens
- Objects cannot be individually removed — only full reset is supported
- Objects at the same position will visually overlap

## AI Usage

AI tools were used as helpers for:
- Debugging CSS transform-origin positioning issues
- Checking JavaScript syntax
- Reviewing responsive layout approaches

All core logic (torque calculation, state management, animation, event handling) was developed manually.

## How to Run

1. Clone the repository
2. Open `index.html` in a browser
3. Click on the seesaw plank to add weight objects
4. Use the Reset button to clear all objects

## Technologies

- HTML5
- CSS3 (transitions, transforms, keyframe animations)
- Vanilla JavaScript (DOM manipulation, localStorage, event handling)
