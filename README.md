Project Files:

index.html: Defines the structure of the single-page application, containing the header nav, layouts for both tabs, the item editor modal, and nature soundscape audio nodes.

app.js: Handles state management (loading/saving from localStorage by date key), event binding, quotes rotation, list mutation, social battery percentage calculations, and soundscape volume mixers.

style.css: Defines a premium dark glassmorphic design system using CSS custom properties (variables), custom scrollbars, keyframe animations, responsive grid layouts, and active states.
Core Features Implemented

1. Mindful Journal Tab
. Expandable Calendar Widget: Displays week/month mode with indicator dots representing days containing logs.
Daily Quote: Displays a deterministic daily quote from a preset pool of 52 quotes.
Thoughts & Feelings Sky Box: A auto-saved text box (capped at 5,000 characters) for recording mental states.
Interactive Lists (5 items limit each):
Gratitude: For recording appreciation.
Areas of Change: For recording things to improve.
Daily Tasks: Checklist with item cross-out and check states.
Daily Tracker: Checklist with "Did" (green) and "Did Not" (red) toggle states.

3. Social Battery Tab
Social Battery Calculator: Shows current social energy with rising bubble animations and a dynamic HSL gradient fill (scaling from red to green).
Base Slider: Adjusts wake-up/starting energy level.
Daily Activity Energy Logs: Predefined list of chargers (e.g., spent time in nature +20%) and drainers (e.g., work meetings -25%).
Custom Activity Builder: Form to log custom events and persist them in the activity presets pool.
Event Log History: Shows daily activity entries with delete buttons and a clear-all feature.

5. Nature Soundscape Panel
A persistent, floating audio mixer in the bottom right corner with individual channel controls for rain, wind, birds, and campfire audio loops.
