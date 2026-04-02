# Obsidian Chat UI - Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Ensure Required Packages
```bash
npm install tailwindcss @tailwindcss/vite react-router
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. View the Interface
Open your browser and navigate to:
- `http://localhost:5173/` (Chat page)
- `http://localhost:5173/chat` (Chat page)

## Configuration Files

### Tailwind Configuration (`tailwind.config.js`)
- Custom colors for Obsidian theme
- Extended border radius
- Custom font family definitions
- Dark mode configuration

### Component Files Location
```
src/
├── components/
│   ├── SideNavBar.jsx          ← Left navigation
│   ├── TopNavBar.jsx           ← Header
│   ├── ChatContainer.jsx       ← Message area
│   ├── MessageBubble.jsx       ← Individual messages
│   ├── ChatInput.jsx           ← Input field
│   └── FloatingChips.jsx       ← Action buttons
└── features/pages/Chat/
    ├── Chat.jsx                ← Main component (static)
    └── ChatWithIntegration.jsx ← With backend integration
```

## Integration with Backend

### Option 1: Use ChatWithIntegration.jsx
For live backend integration with state management:
```jsx
import Chat from '../features/pages/Chat/ChatWithIntegration';
```

### Option 2: Update Chat Routes
In `app.routes.jsx`:
```jsx
{
  path: '/chat',
  element: <Chat /> // or <ChatWithIntegration />
}
```

## API Integration Example

```jsx
// In ChatWithIntegration.jsx, update handleSendMessage:
const response = await fetch('http://localhost:3000/api/messages', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    message,
    userId: currentUser.id 
  })
});

const data = await response.json();
// Add AI response to messages
```

## Styling Customization

### Colors in `tailwind.config.js`
```js
colors: {
  "primary": "#DDB7FF",        // Purple
  "secondary": "#00E5FF",      // Cyan
  "background": "#000000",     // Black
  "on-surface": "#E2E2E2",     // Light gray
  // ... more colors
}
```

### CSS Classes in `obsidian-chat.css`
- `.neon-glow-purple` - Purple glow effect
- `.neon-glow-cyan` - Cyan glow effect
- `.message-bubble` - Message styling
- `.glass-effect` - Blur background effect

## Responsive Breakpoints

- **Mobile** (< 768px): Hidden sidebar, full-width chat
- **Tablet** (768px - 1024px): Partial layout adjustments
- **Desktop** (> 1024px): Full sidebar visible (`lg:` prefix in Tailwind)

## Common Issues & Solutions

### Fonts Not Loading
Ensure `index.html` includes:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Manrope:wght@700;800&display=swap" rel="stylesheet" />
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
```

### Colors Not Appearing
Check that `tailwind.config.js` extends the theme with custom colors.

### Layout Issues on Mobile
The sidebar uses `hidden lg:flex` to hide on mobile. Check Tailwind breakpoints in components.

## Backend API Endpoints

Expected endpoints for full functionality:

```
POST /api/messages         ← Send message
GET  /api/messages         ← Get conversation
GET  /api/threads          ← Get recent threads
POST /api/threads          ← Create new thread
GET  /api/user/profile     ← Get user info
```

## Building for Production

```bash
npm run build
npm run preview
```

Output will be in `dist/` directory.

## Performance Tips

1. Use React.memo() for components that don't re-render often
2. Lazy load images in message bubbles
3. Implement virtual scrolling for large message lists
4. Cache API responses with React Query or SWR

## Browser DevTools

In Chrome/Firefox Developer Tools:
- Check "Device Emulation" to test responsive design
- Use "Light/Dark mode" toggle to verify theme
- Check Console for any JavaScript errors

## Support

For issues or questions:
1. Check browser console for errors
2. Verify all dependencies are installed
3. Clear node_modules and reinstall if needed
4. Check that all font URLs are accessible
