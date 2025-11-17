# Learning Exercises

Welcome! These exercises are designed to help you understand and extend the Achievement Tracker codebase. Each exercise builds on the previous one and introduces new concepts.

## Exercise A: Change Theme Tokens

**Goal**: Modify the color palette and glassmorphism effects to create a custom theme.

### Steps

1. **Open the Tailwind config**: `frontend/tailwind.config.js`

2. **Modify the color palette**:
   - Change the `glass.dark.bg` color to a different opacity or hue
   - Experiment with different blur values in `backdropBlur`

3. **Update CSS utilities**: `frontend/src/styles/index.css`
   - Modify the `.glass-dark` class to use your new colors
   - Adjust the blur strength

4. **Test your changes**:
   ```bash
   cd frontend
   npm run dev
   ```
   - Observe how the glass panels look with your new settings
   - Try different opacity values (0.03, 0.1, 0.15) to see the effect

### Learning Points
- Understanding Tailwind's theme extension system
- How CSS backdrop-filter creates glassmorphism
- The relationship between opacity and visual depth

### Challenge
Create a "midnight blue" theme variant with a blue-tinted glass effect.

---

## Exercise B: Add a New Field to Achievements

**Goal**: Add a `category` field to achievements (e.g., "Work", "Personal", "Health").

### Steps

1. **Backend - Update the model** (`backend/app/models.py`):
   ```python
   category = Column(String, nullable=True, default="general")
   ```

2. **Backend - Update the schema** (`backend/app/schemas.py`):
   - Add `category: Optional[str] = None` to `AchievementBase`
   - Add `category: Optional[str] = None` to `AchievementUpdate`

3. **Backend - Create a migration**:
   ```bash
   cd backend
   alembic revision --autogenerate -m "add_category_to_achievements"
   alembic upgrade head
   ```

4. **Frontend - Update the type** (`frontend/src/types/index.ts`):
   ```typescript
   category?: string
   ```

5. **Frontend - Update the UI** (`frontend/src/components/AchievementCard.tsx`):
   - Add a category selector dropdown in edit mode
   - Display the category as a badge when viewing

6. **Test**:
   - Create a new achievement with a category
   - Verify it saves and displays correctly

### Learning Points
- Database migrations with Alembic
- Pydantic schema validation
- React form state management
- TypeScript type updates

### Challenge
Add category filtering to the DayView component so users can filter achievements by category.

---

## Exercise C: Wire Up Avatar Upload to Local Storage

**Goal**: Allow users to upload an image file for their avatar and store it locally (or convert to base64).

### Steps

1. **Create an upload component** (`frontend/src/components/AvatarUpload.tsx`):
   ```typescript
   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const file = e.target.files?.[0]
     if (file) {
       // Convert to base64
       const reader = new FileReader()
       reader.onloadend = () => {
         const base64String = reader.result as string
         // Update avatar URL
       }
       reader.readAsDataURL(file)
     }
   }
   ```

2. **Update ProfilePage** (`frontend/src/pages/ProfilePage.tsx`):
   - Replace the URL input with the AvatarUpload component
   - Handle the base64 string or file upload

3. **Backend - Optional: Add file upload endpoint** (`backend/app/api/user.py`):
   ```python
   @router.post("/me/avatar")
   async def upload_avatar(file: UploadFile, ...):
       # Save file or convert to base64
       # Return URL or base64 string
   ```

4. **Update UserHeader** to display the new avatar

### Learning Points
- File handling in React
- Base64 encoding
- FileReader API
- Optional: FastAPI file uploads

### Challenge
Add image validation (max size, file type) and image preview before upload.

---

## Bonus Exercise: Add Weekly Streak Indicator

**Goal**: Calculate and display a streak of consecutive days with at least one achievement.

### Steps

1. **Backend - Add streak calculation** (`backend/app/api/user.py`):
   ```python
   @router.get("/me/streak")
   def get_streak(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
       # Query achievements grouped by date
       # Calculate consecutive days from today backwards
       # Return streak count
   ```

2. **Frontend - Create StreakIndicator component**:
   - Display fire emoji 🔥 and streak count
   - Show visual indicator (e.g., progress bar)

3. **Add to DashboardPage**:
   - Fetch streak on component mount
   - Display in UserHeader or sidebar

### Learning Points
- Date calculations
- SQL aggregation queries
- React data fetching patterns
- Visual feedback for user motivation

---

## Getting Help

- Check existing code patterns in the codebase
- Review FastAPI docs: https://fastapi.tiangolo.com/
- Review React docs: https://react.dev/
- Review Tailwind docs: https://tailwindcss.com/docs

## Next Steps

After completing these exercises, consider:
- Adding more sophisticated filtering and search
- Implementing real-time updates with WebSockets
- Adding data export (CSV, JSON)
- Creating mobile-responsive improvements
- Adding keyboard shortcuts

Happy coding! 🚀

