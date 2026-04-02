# Obsidian Chat UI - Frontend Components

A modern, sleek chat interface built with React and Tailwind CSS featuring a dark theme with purple and cyan neon accents.

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── App.jsx
│   │   ├── app.routes.jsx (Chat route added)
│   │   └── index.css
│   ├── components/
│   │   ├── SideNavBar.jsx
│   │   ├── TopNavBar.jsx
│   │   ├── ChatContainer.jsx
│   │   ├── MessageBubble.jsx
│   │   ├── ChatInput.jsx
│   │   └── FloatingChips.jsx
│   ├── features/
│   │   └── pages/
│   │       ├── Chat/
│   │       │   └── Chat.jsx (Main Chat Page)
│   │       ├── Login.jsx
│   │       └── Register.jsx
│   ├── styles/
│   │   └── obsidian-chat.css (Custom styles)
│   └── main.jsx
├── index.html
├── tailwind.config.js (Custom colors & fonts)
└── vite.config.js
```

## Features

### Components

1. **SideNavBar** - Left navigation sidebar with:
   - Logo and branding
   - Main navigation menu
   - Recent threads
   - Settings and account links
   - Upgrade to Pro card

2. **TopNavBar** - Header bar with:
   - App title
   - Navigation links
   - Help and settings buttons
   - User avatar

3. **ChatContainer** - Main chat area with:
   - Scrollable message history
   - Support for both user and AI messages
   - Embedded image galleries with mood labels

4. **MessageBubble** - Individual message component supporting:
   - User messages with timestamp
   - AI responses with custom formatting
   - Bullet point lists
   - Image galleries with hover effects

5. **ChatInput** - Floating input bar with:
   - Text input field
   - Add attachment button
   - Voice input button
   - Send button with gradient
   - Focus-aware glow effect

6. **FloatingChips** - Contextual action buttons:
   - "Refine Palette"
   - "Logo Concept"
   - Hover animations and neon glows

## Design System

### Color Palette

- **Primary**: `#DDB7FF` (Purple)
- **Secondary**: `#00E5FF` (Cyan)
- **Background**: `#000000` (Black)
- **Surface**: `#0E0E0E` (Dark Gray)
- **Text**: `#E2E2E2` (Light Gray)

### Typography

- **Headlines**: Manrope (700, 800)
- **Body**: Inter (400, 500, 600)
- **Icons**: Material Symbols Outlined

### Effects

- **Neon Glow Purple**: `box-shadow: 0 0 15px rgba(221, 183, 255, 0.2)`
- **Neon Glow Cyan**: `box-shadow: 0 0 15px rgba(0, 229, 255, 0.2)`
- **Glass Effect**: `backdrop-filter: blur(40px)`

## Getting Started

### Installation

1. Install dependencies:
```bash
npm install
```

2. Ensure the following are installed:
```bash
npm install tailwindcss @tailwindcss/vite
npm install -D tailwindcss
```

### Running the Application

```bash
npm run dev
```

The chat interface will be available at `http://localhost:5173/chat` or `http://localhost:5173/`

### Build for Production

```bash
npm run build
npm run preview
```

## Usage

### Adding Custom Messages

Update `ChatContainer.jsx` to add new messages:

```jsx
const messages = [
  {
    id: 1,
    type: 'user',
    content: 'Your message here',
    timestamp: 'Just Now',
  },
  {
    id: 2,
    type: 'ai',
    content: 'AI response here',
    images: [
      {
        alt: 'Image description',
        src: 'image-url',
        label: 'Label',
        glow: 'purple', // or 'cyan'
      },
    ],
  },
];
```

### Customizing Colors

Edit `tailwind.config.js` to modify the color palette:

```js
colors: {
  "primary": "#DDB7FF",
  "secondary": "#00E5FF",
  // Add more custom colors...
}
```

## Responsive Behavior

- **Mobile**: Sidebar is hidden, full-width chat
- **Tablet** (md): Partial sidebar, adjusted padding
- **Desktop** (lg): Full sidebar visible with navigation

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Dependencies

- React 18+
- Tailwind CSS 4+
- React Router 7+
- Vite 5+

## Notes

- The Material Symbols font is loaded from Google Fonts
- Inter and Manrope fonts are preconnected for optimal loading
- Custom scrollbar styling is applied to `.chat-container`
- All components use Tailwind CSS utilities and custom color tokens

## Future Enhancements

- [ ] Real-time message sync with backend
- [ ] User authentication integration
- [ ] Message persistence
- [ ] File upload support
- [ ] Typing indicators
- [ ] Message reactions/emojis
- [ ] Dark/Light theme toggle
