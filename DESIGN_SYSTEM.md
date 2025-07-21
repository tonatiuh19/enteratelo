# Design System

## Color Palette

The design system uses CSS custom properties for theming support:

```css
:root {
  --background: 0 0% 99%; /* Main background */
  --foreground: 220 15% 15%; /* Main text color */
  --primary: 221 83% 53%; /* Primary brand color */
  --secondary: 210 40% 98%; /* Secondary background */
  --muted: 210 40% 96%; /* Muted backgrounds */
  --accent: 210 40% 94%; /* Accent color */
  --border: 214 32% 91%; /* Border color */
}
```

## Typography

- **Headlines**: Uses system font stack with bold weights
- **Body Text**: Regular weight for readability
- **Small Text**: Used for metadata and captions

## Components

### Spacing

- **Container**: Max width with responsive padding
- **Grid**: CSS Grid for layout with responsive columns
- **Gap**: Consistent spacing using Tailwind's scale

### Interactive Elements

- **Buttons**: Consistent padding and hover states
- **Cards**: Subtle shadows with hover animations
- **Links**: Underline on hover for accessibility

## Responsive Design

- **Mobile First**: Starts with mobile layout
- **Breakpoints**: Follows Tailwind's responsive system
- **Grid**: Adaptive columns based on screen size
