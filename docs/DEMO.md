# Demo Guide

This guide walks you through the key features and user flows of the Achievement Tracker app.

## Quick Start Demo

### 1. Login

1. Start the backend:
   ```bash
   cd backend
   python -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   python -m app.seed
   uvicorn app.main:app --reload --port 8000
   ```

2. Start the frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. Navigate to `http://localhost:5173`
4. Login with:
   - Email: `demo@achievement-tracker.com`
   - Password: `demo123`

### 2. Explore the Dashboard

**User Header**
- See your profile picture, display name, and quote
- Click "✏️ Edit" next to the quote to edit it inline
- Click "Profile" to go to the full profile page

**Calendar Sidebar**
- View the current month
- Click any date to view that day's achievements and todos
- Today's date is highlighted with a ring
- Selected date is highlighted in blue

**Day View**
- See today's achievements and todos
- View completion counts (e.g., "2/3" achievements completed)
- "Today" badge appears when viewing today's date

### 3. Add an Achievement

1. In the Achievements section, type in the input field: "Completed morning meditation"
2. Press Enter
3. The achievement appears as a card
4. Click the checkbox to mark it complete
5. Click ✏️ to edit the title or add notes
6. Click 🗑️ to delete

### 4. Add a Todo

1. In the Todos section, type: "Review project proposal"
2. Press Enter
3. The todo appears with a checkbox
4. Click ✏️ to edit and set priority (low/medium/high)
5. Mark complete when done
6. Completed items show with strikethrough and reduced opacity

### 5. Edit Your Profile

1. Click "Profile" in the top right
2. Update your display name
3. Change your avatar URL (or use a DiceBear URL)
4. Edit your quote
5. Click "Save Changes"
6. Return to dashboard to see updates

### 6. Switch Themes

1. Click the theme toggle button (☀️/🌙) in the day view header
2. Observe the glassmorphism effect change between light and dark
3. The theme preference is saved to localStorage

## Key Features Demonstrated

### Glassmorphism UI
- Frosted glass panels with backdrop blur
- Subtle translucency and depth
- Smooth hover transitions
- Rounded corners (rounded-2xl)

### Inline Editing
- Quote editing in UserHeader
- Achievement and Todo editing in place
- Save/Cancel buttons for confirmation

### Calendar Navigation
- Month view with date selection
- Today highlighting
- Selected date indication

### Completion Tracking
- Checkboxes for achievements and todos
- Completion counts
- Visual feedback (strikethrough, opacity)

## Screenshots Guide

To document the app, capture these screenshots:

1. **Login Page**
   - Clean glassmorphism login form
   - Demo credentials hint

2. **Dashboard - Today View**
   - User header with quote
   - Calendar sidebar
   - Day view with achievements and todos
   - Completion counts visible

3. **Dashboard - Past Date**
   - Select a past date from calendar
   - Show historical achievements/todos

4. **Editing Achievement**
   - Achievement card in edit mode
   - Title and notes fields visible

5. **Profile Page**
   - Full profile form
   - Avatar, name, quote editing

6. **Light Theme**
   - Same dashboard in light theme
   - Compare glassmorphism effect

## User Flows

### Flow 1: Daily Tracking
1. Login → Dashboard (today)
2. Add morning achievement: "Completed workout"
3. Add todo: "Call dentist" (high priority)
4. Complete the workout achievement
5. Navigate to tomorrow, add plan for tomorrow

### Flow 2: Profile Customization
1. Click Profile
2. Upload new avatar (or paste URL)
3. Update display name to "Alice"
4. Set quote: "Progress, not perfection"
5. Save and return to dashboard
6. See updated header with new quote

### Flow 3: Week Review
1. Navigate through past 7 days using calendar
2. Review achievements and todos
3. See completion patterns
4. Plan for upcoming week

## Tips for Demo

- **Show the glassmorphism**: Hover over cards to show the elevation effect
- **Demonstrate inline editing**: Edit the quote directly in the header
- **Show responsiveness**: Resize browser to show mobile layout
- **Highlight smooth transitions**: Add/delete items to show animations
- **Emphasize the design**: Point out the subtle vignette, blur effects, and spacing

## Troubleshooting

**Backend not starting?**
- Check Python version (3.11+)
- Ensure virtual environment is activated
- Run `python -m app.seed` to create demo data

**Frontend not connecting?**
- Verify backend is running on port 8000
- Check CORS settings in `backend/app/core/config.py`
- Check browser console for errors

**No data showing?**
- Run the seed script: `python -m app.seed`
- Check database file exists: `backend/achievement_tracker.db`
- Verify you're logged in with demo credentials

## Next Steps

After exploring the demo:
- Try the exercises in `EXERCISES.md`
- Review the design system in `DESIGN.md`
- Check `ISSUES.md` for planned enhancements
- Contribute improvements!

Enjoy exploring Achievement Tracker! 🎉

