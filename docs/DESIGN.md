# Design System

## Apple Tahoe Glassmorphism Design

This document outlines the design tokens and styling approach for the Achievement Tracker app, inspired by Apple's Tahoe design language with glassmorphism effects.

## Color Palette

### Dark Theme (Default)
- **Background**: `#0b0f14` - Deep dark base
- **Glass Panel**: `rgba(255, 255, 255, 0.06)` with `backdrop-filter: blur(10px)`
- **Glass Border**: `rgba(255, 255, 255, 0.06)`
- **Text Primary**: `#ffffff` / `rgba(255, 255, 255, 0.9)`
- **Text Secondary**: `rgba(255, 255, 255, 0.6)`
- **Text Tertiary**: `rgba(255, 255, 255, 0.4)`

### Light Theme
- **Background**: `#ffffff` - Pure white base
- **Glass Panel**: `rgba(255, 255, 255, 0.65)` with `backdrop-filter: blur(8px)`
- **Glass Border**: `rgba(0, 0, 0, 0.06)`
- **Text Primary**: `#000000` / `rgba(0, 0, 0, 0.9)`
- **Text Secondary**: `rgba(0, 0, 0, 0.6)`
- **Text Tertiary**: `rgba(0, 0, 0, 0.4)`

### Accent Colors
- **Primary Blue**: `#3b82f6` (blue-600)
- **Hover Blue**: `#2563eb` (blue-700)
- **Success Green**: `#10b981` (green-500)
- **Warning Yellow**: `#f59e0b` (yellow-500)
- **Error Red**: `#ef4444` (red-500)

## Typography

### Font Stack
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
```

### Scale
- **Display**: `3xl` (30px) - `font-semibold` (600)
- **Heading 1**: `2xl` (24px) - `font-semibold` (600)
- **Heading 2**: `xl` (20px) - `font-semibold` (600)
- **Heading 3**: `lg` (18px) - `font-medium` (500)
- **Body**: `base` (16px) - `font-normal` (400)
- **Small**: `sm` (14px) - `font-normal` (400)
- **XSmall**: `xs` (12px) - `font-normal` (400)

## Spacing System

Based on Tailwind's spacing scale (4px base unit):
- **xs**: `0.5` (2px)
- **sm**: `1` (4px)
- **md**: `2` (8px)
- **lg**: `3` (12px)
- **xl**: `4` (16px)
- **2xl**: `6` (24px)
- **3xl**: `8` (32px)
- **4xl**: `12` (48px)
- **6xl**: `16` (64px)

## Border Radius

- **Small**: `rounded-lg` (8px)
- **Medium**: `rounded-xl` (12px)
- **Large**: `rounded-2xl` (16px) - Primary for cards
- **Full**: `rounded-full` (9999px) - For avatars and badges

## Shadows

### Glass Card Shadow
```css
box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
```

### Glass Card Hover Shadow
```css
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.16);
```

## Glassmorphism Utilities

### Tailwind Classes

```css
/* Dark theme glass */
.glass-dark {
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

/* Light theme glass */
.glass-light {
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(0, 0, 0, 0.06);
}

/* Glass card with hover effect */
.glass-card {
  @apply rounded-2xl shadow-glass;
  transition: all 0.3s ease;
}

.glass-card:hover {
  @apply shadow-glass-hover;
  transform: translateY(-2px);
}
```

## Component Patterns

### Card Component
```tsx
<div className="glass-dark glass-card p-6">
  {/* Content */}
</div>
```

### Input Field
```tsx
<input
  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg 
             focus:outline-none focus:ring-2 focus:ring-blue-500"
/>
```

### Button Primary
```tsx
<button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg 
                   font-medium transition-colors">
  Button Text
</button>
```

### Button Secondary (Glass)
```tsx
<button className="px-6 py-2 glass-dark hover:bg-white/10 rounded-lg 
                   font-medium transition-colors">
  Button Text
</button>
```

## Vignette Effect

A subtle radial gradient overlay creates depth:

```css
body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
    ellipse at center,
    transparent 0%,
    rgba(0, 0, 0, 0.1) 100%
  );
  pointer-events: none;
  z-index: 0;
}
```

## Transitions

- **Default**: `transition-colors` (150ms)
- **Smooth**: `transition-all` (300ms ease)
- **Transform**: `transform: translateY(-2px)` on hover

## Accessibility

- **Contrast Ratios**: All text meets WCAG AA standards (4.5:1 for normal text)
- **Focus States**: Visible focus rings (`focus:ring-2 focus:ring-blue-500`)
- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Font Size Controls**: User can adjust font size (small/medium/large)

## Responsive Breakpoints

- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

## Tailwind Config Snippets

```js
// tailwind.config.js
theme: {
  extend: {
    colors: {
      glass: {
        dark: {
          bg: 'rgba(255, 255, 255, 0.06)',
          border: 'rgba(255, 255, 255, 0.06)',
        },
        light: {
          bg: 'rgba(255, 255, 255, 0.65)',
          border: 'rgba(0, 0, 0, 0.06)',
        },
      },
    },
    backdropBlur: {
      glass: '10px',
      'glass-light': '8px',
    },
    boxShadow: {
      glass: '0 6px 24px rgba(0, 0, 0, 0.12)',
      'glass-hover': '0 8px 32px rgba(0, 0, 0, 0.16)',
    },
  },
}
```

