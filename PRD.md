# Planning Guide

A multi-language survival guide mobile application optimized for Google Play and App Store, providing essential wilderness survival techniques with offline access capabilities (premium feature), user authentication system, freemium subscription model, and AI-powered survival assistant for premium members.

**Experience Qualities**: 
1. **Educational** - Clear, structured information that teaches survival principles progressively in multiple languages with AI-powered assistance for premium users
2. **Mobile-First** - Native-feeling app experience optimized for smartphones with bottom navigation and seamless authentication
3. **Value-Driven** - Free tier for browsing and bookmarking, premium tier unlocks downloads and AI assistance

**Complexity Level**: Light Application (multiple features with basic state)
  - Multiple categorized survival guides with filtering, search, bookmark functionality, user authentication, freemium subscription model, premium-gated downloads, AI assistant, multi-language support, and mobile-optimized navigation

## Essential Features

### User Authentication
- **Functionality**: Free sign-up via Google Play, Google OAuth, or email/password with persistent session
- **Purpose**: Enable personalized experience and subscription management with multiple convenient sign-up options
- **Trigger**: User clicks sign-in button in header or attempts to access premium features
- **Progression**: Click sign-in → Choose Google/email option → Enter credentials (if email) → Account created with free tier → Access unlocked
- **Success criteria**: User session persists across app restarts, smooth authentication flow with multiple sign-in methods

### Freemium Subscription Model with Plans Page
- **Functionality**: Dedicated Plans tab showing Free and Premium tiers side-by-side with clear feature comparison and payment options (Card, PayPal, Google Play)
- **Purpose**: Transparent monetization with clear value proposition and multiple payment methods for user convenience
- **Trigger**: User clicks Plans tab in navigation or any "Premium" button throughout the app
- **Progression**: Navigate to Plans → Compare free vs premium → Select payment method → Complete payment → Premium access granted
- **Success criteria**: Clear feature comparison, all premium buttons redirect to Plans page, seamless payment flow with 3 payment options

### Multi-Language Support
- **Functionality**: Full app translation support for English, French, Spanish, German, and Italian
- **Purpose**: Make survival knowledge accessible to users worldwide in their native language
- **Trigger**: User selects language in settings tab
- **Progression**: Open settings → Select language → App content updates → Preference persists
- **Success criteria**: All UI elements and technique content translate correctly and persist across sessions

### Bottom Navigation Tabs
- **Functionality**: Five main tabs - Home, Downloads, AI Assistant, Plans, Settings - accessible via persistent bottom navigation
- **Purpose**: Provide mobile app-style navigation optimized for thumb access with prominent Plans access
- **Trigger**: User taps navigation items at bottom of screen
- **Progression**: Tap tab → View transitions → Content loads → Navigation state persists
- **Success criteria**: Navigation remains accessible, shows active state, Plans tab clearly accessible for upgrades

### Home Tab
- **Functionality**: Browse, search, and filter survival techniques with category badges
- **Purpose**: Main discovery interface for survival knowledge (available to all users)
- **Trigger**: Default tab on app launch
- **Progression**: View categories → Search/filter → Select technique → View details
- **Success criteria**: All techniques are browsable, searchable, and filterable with bookmarking

### Downloads Tab (Premium Feature)
- **Functionality**: View and manage downloaded techniques for offline access
- **Purpose**: Enable offline access to critical survival information for premium users
- **Trigger**: User navigates to Downloads tab
- **Progression**: View downloads → Select technique → Read offline → Remove if needed
- **Success criteria**: Downloaded techniques persist and are accessible, free users see upgrade prompt

### AI Assistant Tab (Premium Feature)
- **Functionality**: Chat with AI survival expert powered by OpenAI for personalized survival advice
- **Purpose**: Provide interactive, contextual survival guidance beyond static content
- **Trigger**: User navigates to AI Assistant tab
- **Progression**: Open AI tab → Ask question → Receive expert advice → Continue conversation
- **Success criteria**: AI provides relevant survival advice, chat history persists, free users see upgrade prompt

### Plans Tab
- **Functionality**: Dedicated subscription plans page with side-by-side Free and Premium plan comparison, featuring detailed feature lists and multiple payment options
- **Purpose**: Central hub for subscription management with transparent pricing and convenient payment methods
- **Trigger**: User clicks Plans tab in bottom nav or any "Premium"/"Upgrade" button in the app
- **Progression**: View plans → Compare features → Sign up (if not logged in) → Select payment method (Card/PayPal/Google Play) → Complete payment → Premium activated
- **Success criteria**: All premium buttons throughout app redirect here, clear value proposition, free users can sign up, premium payment seamless

### Settings Tab
- **Functionality**: Manage language, account, subscription, API key, view storage statistics, clear data
- **Purpose**: User preference and account management
- **Trigger**: User navigates to Settings tab
- **Progression**: View settings → Change preferences → Manage subscription → Sign out if needed
- **Success criteria**: Settings persist, account management works, subscription status visible

### Download Techniques (Premium Only)
- **Functionality**: Download individual techniques for offline access from detail dialog, with premium check redirecting to Plans page
- **Purpose**: Prepare critical survival information for emergency offline use
- **Trigger**: User clicks download button in technique dialog
- **Progression**: View technique → Click download → Premium check → Free users redirected to Plans tab → Premium users download saved → Accessible in Downloads tab
- **Success criteria**: Free users automatically navigate to Plans page, premium users can download unlimited content

## Edge Case Handling
- **Empty Downloads**: Display helpful message encouraging premium users to download, free users automatically navigate to Plans
- **Empty Search Results**: Display helpful message suggesting to try different keywords
- **No Bookmarks Yet**: Show empty state encouraging users to bookmark useful techniques
- **Unauthenticated Access**: Redirect to sign-in when attempting premium features or accessing Plans for payment
- **Free Tier Limitations**: All premium buttons redirect to Plans page for seamless upgrade flow
- **Multiple Sign-In Methods**: Support Google OAuth and email/password with consistent user experience
- **Payment Method Selection**: Require payment method selection before completing premium purchase
- **AI Without API Key**: Premium users prompted to add OpenAI API key in settings
- **Safe Area Support**: Handle iPhone notches and Android gesture bars with proper padding
- **Data Clearing**: Confirmation dialogs prevent accidental data loss
- **Session Persistence**: User remains logged in across app restarts

## Design Direction
The design should feel like a modern mobile application with a tech-focused dark theme featuring purple gradients, optimized for one-handed use with bottom navigation and clear visual hierarchy - a minimal interface that prioritizes readability and quick information access.

## Color Selection
Custom palette with dark technology aesthetic featuring purple/violet gradients.

- **Primary Color**: Purple (oklch(0.65 0.25 285)) - tech-forward, modern, innovative
- **Secondary Colors**: Dark gray/charcoal for structure and depth
- **Accent Color**: Bright pink/magenta (oklch(0.75 0.20 320)) - attention, highlights, active states
- **Foreground/Background Pairings**: 
  - Background (Dark purple oklch(0.08 0.01 285)): Light text oklch(0.98 0.01 285) - Ratio 13.8:1 ✓
  - Card (Elevated dark oklch(0.12 0.02 285)): Light text oklch(0.98 0.01 285) - Ratio 12.2:1 ✓
  - Primary (Purple oklch(0.65 0.25 285)): White text oklch(1 0 0) - Ratio 5.8:1 ✓
  - Secondary (Dark gray oklch(0.20 0.03 285)): Light text oklch(0.98 0.01 285) - Ratio 11.5:1 ✓
  - Accent (Magenta oklch(0.75 0.20 320)): Dark text oklch(0.08 0.01 285) - Ratio 9.2:1 ✓
  - Muted (Mid gray oklch(0.15 0.02 285)): Muted text oklch(0.60 0.05 285) - Ratio 4.6:1 ✓

## Font Selection
Clean, modern sans-serif (Inter) throughout for optimal screen readability on mobile devices with various screen sizes and resolutions.

- **Typographic Hierarchy**: 
  - H1 (App Title): Inter Bold / 32px / tight tracking (-0.02em)
  - H2 (Section Headers): Inter Bold / 24px / normal tracking
  - H3 (Technique Titles): Inter SemiBold / 18px / normal tracking
  - Body (Descriptions): Inter Regular / 15px / relaxed leading (1.6)
  - Small (Metadata): Inter Medium / 13px / normal leading
  - Navigation Labels: Inter Medium / 12px / normal tracking

## Animations
Smooth, app-like transitions that feel native to mobile platforms - purposeful motion that guides users through content without delaying interactions.

- **Purposeful Meaning**: Tab transitions slide content, cards lift on press, dialogs scale in smoothly
- **Hierarchy of Movement**: Bottom nav active state (icon fill + color), download button (icon bounce on save), alert dialogs (gentle scale + fade)

## Component Selection
- **Components**: 
  - Card (technique display with glassmorphic backdrop, plan comparison cards)
  - Dialog (authentication with Google/email options, upgrade prompts, full technique details)
  - Input (search, email/password, API key, chat messages)
  - Badge (category, difficulty, subscription tier tags, "Most Popular" plan badge)
  - Button (actions optimized for mobile touch, sign-in with Google, payment method selection, upgrade CTA)
  - AlertDialog (data clearing confirmations)
  - ScrollArea (scrollable content areas, chat history)
  - Select/Dropdown (language selector)
  - Separator (dividing plans features, auth methods)
  
- **Customizations**: 
  - Bottom navigation bar with safe area support (5 tabs including Plans)
  - Plans page with side-by-side free/premium comparison
  - Payment method buttons (Card, PayPal, Google Play icons)
  - Google sign-in button with Google logo
  - Glassmorphic card backgrounds with backdrop blur
  - Mobile-optimized touch targets (minimum 44px)
  - Download button with premium gating redirecting to Plans
  - Crown icon for premium badge, Plans tab, and upgrade CTAs
  - Chat interface for AI assistant with message bubbles
  - Authentication modal with Google OAuth and email options
  
- **States**: 
  - Navigation tabs: inactive, active (filled icon + primary color) - 5 tabs total
  - Plans cards: current plan (disabled button), upgradeable (active payment selection)
  - Payment methods: unselected (outline), selected (filled)
  - Payment button: idle, processing (spinner), disabled (no method selected)
  - Cards: default, pressed (slight scale), bookmarked
  - Buttons: default, hover, pressed, disabled, premium (accent color)
  - Download status: not downloaded (redirects to Plans), downloading, downloaded
  - User status: signed out, free tier, premium tier with expiry date
  - AI chat: idle, thinking, error
  
- **Icon Selection**: 
  - House for Home tab
  - DownloadSimple for Downloads tab
  - Sparkle for AI Assistant tab
  - Crown for Plans tab and premium features
  - Gear for Settings tab
  - BookmarkSimple for favorites
  - MagnifyingGlass for search
  - Globe for language
  - Trash for data clearing
  - Database for storage
  - SignIn for authentication
  - GoogleLogo for Google sign-in and Google Play payment
  - CreditCard for card payment
  - PayPal logo (custom SVG) for PayPal payment
  - User for account management
  - Key for API key settings
  - PaperPlaneRight for sending messages
  - Check for feature lists in plans
  
- **Spacing**: 
  - Bottom nav height: 64px with safe area padding (5 tabs)
  - Container padding: p-4 mobile
  - Card gaps: gap-6 for grid, gap-8 for plans comparison
  - Bottom page padding: pb-20 to account for fixed navigation
  - Chat message spacing: gap-4 with proper alignment
  - Plans feature lists: gap-4 between items
  - Payment method buttons: gap-2 in grid
  
- **Mobile**: 
  - Bottom navigation fixed to viewport bottom with safe area support (5 tabs)
  - Viewport-fit=cover for edge-to-edge design
  - Single column layout on mobile (1 column), expanding to 2 columns for plans comparison on tablet/desktop
  - Full-height dialogs with proper scroll handling
  - Touch-optimized 44px minimum tap targets throughout
  - Responsive chat interface with proper keyboard handling
  - Plans page: stacked cards on mobile, side-by-side on larger screens
