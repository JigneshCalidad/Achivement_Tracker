# Known Issues & Future Enhancements

This document tracks known issues, planned features, and areas for improvement.

## Known Issues

### Critical
- None currently

### Minor
- [ ] Avatar upload currently only supports URLs; file upload not implemented
- [ ] No validation for quote length (could be very long)
- [ ] Calendar doesn't show which dates have achievements/todos
- [ ] No loading states for some async operations
- [ ] Error messages could be more user-friendly

## Planned Features

### High Priority

#### Authentication & Security
- [ ] Replace demo auth with proper password verification
- [ ] Add password reset functionality
- [ ] Implement email verification
- [ ] Add OAuth providers (Google, GitHub)
- [ ] Rate limiting on API endpoints
- [ ] CSRF protection

#### Data & Persistence
- [ ] Migrate from SQLite to PostgreSQL for production
- [ ] Add database backups
- [ ] Implement soft deletes (archive instead of delete)
- [ ] Add data export (CSV, JSON)
- [ ] Add data import functionality

#### User Experience
- [ ] Add keyboard shortcuts (e.g., `n` for new, `j/k` for navigation)
- [ ] Implement drag-and-drop reordering for todos
- [ ] Add bulk actions (mark multiple as complete)
- [ ] Show completion percentage per day
- [ ] Add empty state illustrations (SVG)
- [ ] Improve mobile responsiveness

#### Features
- [ ] Weekly streak indicator (consecutive days with achievements)
- [ ] Achievement categories/tags
- [ ] Todo subtasks
- [ ] Recurring todos (daily, weekly)
- [ ] Todo due dates (full date, not just time)
- [ ] Achievement photos/attachments
- [ ] Notes with markdown support
- [ ] Search functionality
- [ ] Filter by category, priority, completion status
- [ ] Statistics dashboard (weekly/monthly summaries)

### Medium Priority

#### UI/UX Improvements
- [ ] Add animations for add/delete operations
- [ ] Implement skeleton loaders
- [ ] Add toast notifications for actions
- [ ] Improve calendar navigation (jump to date)
- [ ] Add dark/light theme toggle animation
- [ ] Font size accessibility controls (small/medium/large)
- [ ] High contrast mode

#### Performance
- [ ] Implement pagination for long lists
- [ ] Add caching for frequently accessed data
- [ ] Optimize database queries (indexes)
- [ ] Lazy load calendar months
- [ ] Implement virtual scrolling for long lists

#### Testing
- [ ] Increase test coverage (aim for 80%+)
- [ ] Add E2E tests (Playwright/Cypress)
- [ ] Add visual regression tests
- [ ] Performance testing

### Low Priority

#### Integrations
- [ ] Calendar sync (Google Calendar, iCal)
- [ ] Export to Notion, Obsidian
- [ ] Slack/Discord notifications
- [ ] Email reminders

#### Advanced Features
- [ ] Multi-user collaboration (shared achievements)
- [ ] Achievements templates
- [ ] Habit tracking (beyond daily achievements)
- [ ] Goal setting and tracking
- [ ] Reflection prompts/journaling
- [ ] Mood tracking integration

#### Developer Experience
- [ ] Add API documentation (OpenAPI/Swagger improvements)
- [ ] Docker Compose for easy local setup
- [ ] Add development seed scripts with more data
- [ ] Improve error logging and monitoring
- [ ] Add performance monitoring (Sentry, etc.)

## Technical Debt

### Code Quality
- [ ] Refactor duplicate code in AchievementCard and TodoCard
- [ ] Extract common form components
- [ ] Improve TypeScript types (reduce `any` usage)
- [ ] Add JSDoc comments to complex functions
- [ ] Standardize error handling patterns

### Architecture
- [ ] Consider state management library (Zustand/Redux) if complexity grows
- [ ] Implement proper API error handling middleware
- [ ] Add request/response logging
- [ ] Consider GraphQL for flexible queries

### Infrastructure
- [ ] Set up CI/CD for automated deployments
- [ ] Add staging environment
- [ ] Implement feature flags
- [ ] Set up monitoring and alerting
- [ ] Add database migration rollback strategy

## Design Improvements

- [ ] Add more micro-interactions
- [ ] Improve empty states with illustrations
- [ ] Add loading skeletons
- [ ] Enhance accessibility (ARIA labels, keyboard navigation)
- [ ] Add haptic feedback (mobile)
- [ ] Improve color contrast in light theme

## Documentation

- [ ] Add API endpoint documentation
- [ ] Create architecture diagram
- [ ] Add contribution guidelines
- [ ] Create deployment guide
- [ ] Add troubleshooting guide
- [ ] Document environment variables

## Security Considerations

- [ ] Implement proper password hashing (already using bcrypt, but verify)
- [ ] Add input sanitization
- [ ] Implement rate limiting
- [ ] Add security headers (CSP, HSTS, etc.)
- [ ] Regular dependency updates
- [ ] Security audit

## Performance Optimizations

- [ ] Implement code splitting
- [ ] Optimize bundle size
- [ ] Add service worker for offline support
- [ ] Implement image optimization
- [ ] Add database query optimization

## Accessibility

- [ ] Full keyboard navigation
- [ ] Screen reader testing
- [ ] Color contrast audit
- [ ] Focus management improvements
- [ ] ARIA labels and roles

---

## Contributing

If you'd like to work on any of these items:

1. Check if an issue already exists
2. Create a new issue describing the feature/bug
3. Fork the repo and create a feature branch
4. Submit a pull request with your changes

## Priority Guidelines

- **High Priority**: Core functionality, security, critical bugs
- **Medium Priority**: Nice-to-have features, UX improvements
- **Low Priority**: Experimental features, integrations, polish

---

Last updated: 2025-01-17

