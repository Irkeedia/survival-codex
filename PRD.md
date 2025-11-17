# Planning Guide

An interactive educational platform that explains how survival codexes work, teaching users essential survival knowledge through categorized guides, techniques, and practical information.

**Experience Qualities**: 
1. **Educational** - Clear, structured information that teaches survival principles progressively
2. **Trustworthy** - Authoritative presentation that instills confidence in the information provided
3. **Accessible** - Easy navigation through complex survival topics with visual hierarchy

**Complexity Level**: Light Application (multiple features with basic state)
  - Multiple categorized survival guides with filtering, search, and bookmark functionality for users to save and organize survival knowledge

## Essential Features

### Browse Survival Categories
- **Functionality**: Display organized categories of survival knowledge (shelter, water, fire, food, navigation, first aid, signaling)
- **Purpose**: Allow users to quickly find relevant survival information by topic
- **Trigger**: User visits the app or clicks on category filters
- **Progression**: View categories → Select a category → Browse techniques in that category → View detailed information
- **Success criteria**: All categories are visible, clickable, and filter content appropriately

### View Technique Details
- **Functionality**: Display comprehensive information about each survival technique with steps, warnings, and tips
- **Purpose**: Provide detailed, actionable guidance for survival scenarios
- **Trigger**: User clicks on a survival technique card
- **Progression**: Click technique → View detailed dialog with steps → Read warnings and tips → Close or navigate to another technique
- **Success criteria**: All technique information is clearly presented and easy to read

### Search Functionality
- **Functionality**: Real-time search filtering across all survival techniques
- **Purpose**: Enable quick access to specific survival information
- **Trigger**: User types in the search input
- **Progression**: Type search query → See filtered results update in real-time → Clear search to return to full list
- **Success criteria**: Search accurately filters techniques by title, category, and description

### Bookmark Favorites
- **Functionality**: Save important techniques for quick access later
- **Purpose**: Allow users to create a personalized survival reference list
- **Trigger**: User clicks bookmark icon on a technique
- **Progression**: Click bookmark → Technique is saved → Toggle filter to view only bookmarked items → Unbookmark to remove
- **Success criteria**: Bookmarks persist across sessions and can be toggled on/off

## Edge Case Handling
- **Empty Search Results**: Display helpful message suggesting to try different keywords or clear filters
- **No Bookmarks Yet**: Show empty state encouraging users to bookmark useful techniques
- **Mobile Navigation**: Ensure all cards and dialogs are fully accessible on small screens
- **Long Content**: Implement proper scrolling in dialogs for lengthy technique descriptions

## Design Direction
The design should feel authoritative and grounded like a field guide, with an earthy, rugged aesthetic that communicates reliability and preparedness - a minimal interface that prioritizes readability and quick information access in potentially stressful situations.

## Color Selection
Custom palette with earthy, natural tones that evoke outdoor environments and survival contexts.

- **Primary Color**: Deep forest green (oklch(0.35 0.08 155)) - represents nature, growth, and safety
- **Secondary Colors**: Warm earth brown (oklch(0.45 0.06 65)) for grounding and natural feel; slate gray for professional structure
- **Accent Color**: Amber orange (oklch(0.70 0.15 65)) - visibility, warmth, fire, urgent calls-to-action
- **Foreground/Background Pairings**: 
  - Background (Cream #faf8f5 / oklch(0.98 0.01 85)): Dark text oklch(0.20 0.01 85) - Ratio 12.5:1 ✓
  - Card (White #ffffff / oklch(1 0 0)): Dark text oklch(0.20 0.01 85) - Ratio 14.2:1 ✓
  - Primary (Forest Green oklch(0.35 0.08 155)): White text oklch(1 0 0) - Ratio 7.8:1 ✓
  - Secondary (Earth Brown oklch(0.45 0.06 65)): White text oklch(1 0 0) - Ratio 5.2:1 ✓
  - Accent (Amber oklch(0.70 0.15 65)): Dark text oklch(0.20 0.01 85) - Ratio 8.5:1 ✓
  - Muted (Light Sage oklch(0.92 0.02 155)): Muted text oklch(0.50 0.02 85) - Ratio 6.1:1 ✓

## Font Selection
A combination of authoritative serif for headers (evoking classic field guides) and clean sans-serif for body text ensures both character and readability.

- **Typographic Hierarchy**: 
  - H1 (App Title): Merriweather Bold / 32px / tight tracking (-0.02em)
  - H2 (Category Headers): Merriweather Bold / 24px / tight tracking
  - H3 (Technique Titles): Merriweather Bold / 18px / normal tracking
  - Body (Descriptions): Inter Regular / 15px / relaxed leading (1.6)
  - Small (Metadata): Inter Medium / 13px / normal leading

## Animations
Subtle, purposeful animations that guide attention without distracting from the critical information - smooth transitions that feel natural and grounded, like pages turning in a field guide.

- **Purposeful Meaning**: Gentle fade-ins for content loading, smooth dialog slides that feel like opening a guidebook
- **Hierarchy of Movement**: Card hover elevations (subtle lift on hover), dialog entrances (scale + fade), bookmark toggle (satisfying check animation)

## Component Selection
- **Components**: 
  - Card (technique display with hover states)
  - Dialog (detailed technique view with scrollable content)
  - Input (search with icon)
  - Badge (category tags with color coding)
  - Button (primary actions with icon support)
  - Separator (visual section breaks)
  - ScrollArea (for long technique lists and dialog content)
  
- **Customizations**: 
  - Custom category badge colors matching survival categories
  - Technique cards with custom bookmark button overlay
  - Category filter chips with active states
  
- **States**: 
  - Cards: default, hover (subtle elevation), active bookmark (filled icon)
  - Buttons: default, hover (slight darkening), active (pressed), disabled (muted)
  - Search input: empty, typing (focused border), populated
  
- **Icon Selection**: 
  - Bookmark/BookmarkSimple for favorites
  - MagnifyingGlass for search
  - X for clearing/closing
  - Warning for caution sections
  - Lightbulb for tips
  - Category-specific icons (Fire, Drop, House, FirstAid, etc.)
  
- **Spacing**: 
  - Container padding: p-6 desktop, p-4 mobile
  - Card gaps: gap-6 desktop, gap-4 mobile
  - Section spacing: space-y-8 for major sections, space-y-4 for related elements
  
- **Mobile**: 
  - Single column card grid on mobile, 2-3 columns on tablet/desktop
  - Full-screen dialogs on mobile with proper scroll handling
  - Touch-friendly button sizes (min 44px tap targets)
  - Collapsible category filters on mobile with toggle button
