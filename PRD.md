# Planning Guide

A multi-language survival guide mobile application called Charlie Codex, featuring Charlie - an AI survival assistant. The app provides essential wilderness survival techniques with offline access capabilities (premium feature), user authentication system, freemium subscription model, and AI-powered survival assistant (Charlie) for premium members. The AI is configured by the creator, not the users.

**Experience Qualities**: 
1. **Educational** - Clear, structured information that teaches survival principles progressively in multiple languages with Charlie's AI-powered assistance for premium users
2. **Mobile-First** - Native-feeling app experience optimized for smartphones with streamlined 3-tab bottom navigation and profile-based settings access
3. **Value-Driven** - Free tier for browsing and bookmarking, premium tier unlocks downloads and Charlie AI assistance

**Complexity Level**: Light Application (multiple features with basic state)
  - Multiple categorized survival guides with filtering, search, bookmark functionality, user authentication, freemium subscription model, premium-gated downloads, Charlie AI assistant (creator-configured), multi-language support, and mobile-optimized 3-tab navigation with settings/plans accessible via profile menu

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
- **Functionality**: Three main tabs - Charlie AI (left), Accueil/Home (center), Téléchargements/Downloads (right) - accessible via persistent bottom navigation. Settings and Plans accessible via profile avatar dropdown in header.
- **Purpose**: Provide mobile app-style navigation optimized for thumb access with streamlined 3-tab layout focused on core features
- **Trigger**: User taps navigation items at bottom of screen or clicks profile avatar in header
- **Progression**: Tap tab → View transitions → Content loads → Navigation state persists; Click profile avatar → Open dropdown → Select Settings or Plans → Dialog opens
- **Success criteria**: Navigation remains accessible, shows active state, Plans and Settings accessible from profile dropdown dialog

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
- **Functionality**: Chat with Charlie, the AI survival expert, for personalized survival advice. The AI API key is configured by the app creator via environment variables, not by users.
- **Purpose**: Provide interactive, contextual survival guidance beyond static content through conversational AI
- **Trigger**: User navigates to Charlie tab (leftmost in navigation)
- **Progression**: Open Charlie tab → Ask question in French or other languages → Receive expert advice from Charlie → Continue conversation
- **Success criteria**: Charlie provides relevant survival advice in the user's language, chat history persists, free users see upgrade prompt, no API key management needed from users

### Plans Tab
- **Functionality**: Dedicated subscription plans page with side-by-side Free and Premium plan comparison, featuring detailed feature lists and multiple payment options
- **Purpose**: Central hub for subscription management with transparent pricing and convenient payment methods
- **Trigger**: User clicks Plans tab in bottom nav or any "Premium"/"Upgrade" button in the app
- **Progression**: View plans → Compare features → Sign up (if not logged in) → Select payment method (Card/PayPal/Google Play) → Complete payment → Premium activated
- **Success criteria**: All premium buttons throughout app redirect here, clear value proposition, free users can sign up, premium payment seamless

### Profile Menu
- **Functionality**: User avatar button in header that opens dropdown menu with user info (avatar, name, email), subscription status badge, and navigation to Settings and Plans dialogs
- **Purpose**: Centralized access to account management and settings without cluttering bottom navigation (only 3 tabs)
- **Trigger**: User clicks profile avatar in top right corner of header
- **Progression**: Click avatar → Dropdown opens → See user info and subscription → Click Settings or Plans → Dialog opens with tabs → Make changes → Close dialog
- **Success criteria**: Avatar displays user's custom image or initials, dropdown shows all account info, Settings/Plans open in a unified dialog with tabs, seamless navigation between Settings and Plans tabs within dialog

### Settings & Plans Dialog
- **Functionality**: Combined dialog with two tabs - Settings and Plans - accessible from profile dropdown, containing all account management, app preferences, and subscription options
- **Purpose**: Consolidated settings and subscription management in one place without requiring dedicated bottom nav tabs
- **Trigger**: User clicks Settings or Plans in profile dropdown menu
- **Progression**: Profile dropdown → Click Settings/Plans → Dialog opens on selected tab → Switch between tabs → Make changes → Close dialog
- **Success criteria**: Dialog opens with correct default tab, can switch between Settings and Plans tabs, changes persist, closing dialog returns to previous view

### Settings Tab
- **Functionality**: Manage language, account, avatar image, subscription status, view storage statistics, clear data (within Settings dialog)
- **Purpose**: User preference and account management with avatar customization, no API key management (handled by creator)
- **Trigger**: User navigates to Settings via profile menu dropdown, opens in dialog
- **Progression**: Profile dropdown → Click Settings → Dialog opens on Settings tab → Change avatar URL → Change language → View subscription → Switch to Plans tab if needed → Sign out if needed
- **Success criteria**: Settings persist, avatar updates reflect in profile menu and dropdown, account management works, subscription status visible, can navigate to Plans tab, no API key field for users

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
- **Free Tier Limitations**: All premium buttons redirect to Settings/Plans dialog for seamless upgrade flow
- **Multiple Sign-In Methods**: Support Google OAuth and email/password with consistent user experience
- **Payment Method Selection**: Require payment method selection before completing premium purchase
- **Charlie AI Without Creator Key**: Show appropriate error if creator hasn't configured VITE_AI_API_KEY environment variable
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
  - Dialog (authentication with Google/email options, Settings/Plans unified dialog with tabs, technique details)
  - Input (search, email/password, chat messages with Charlie)
  - Badge (category, difficulty, subscription tier tags, "Most Popular" plan badge)
  - Button (actions optimized for mobile touch, sign-in with Google, payment method selection, upgrade CTA)
  - AlertDialog (data clearing confirmations)
  - ScrollArea (scrollable content areas, chat history with Charlie)
  - Select/Dropdown (language selector in Settings)
  - Separator (dividing plan features, auth methods)
  - Tabs (Settings and Plans tabs within unified dialog)
  - Avatar (user profile picture with initials fallback in header dropdown)
  
- **Customizations**: 
  - Bottom navigation bar with safe area support (3 tabs: Charlie, Accueil, Téléchargements)
  - Profile avatar dropdown menu with user info and navigation to Settings/Plans
  - Unified Settings/Plans dialog with tabbed interface
  - Plans comparison within dialog tab (side-by-side free/premium)
  - Payment method buttons (Card, PayPal, Google Play icons)
  - Google sign-in button with Google logo
  - Glassmorphic card backgrounds with backdrop blur
  - Mobile-optimized touch targets (minimum 44px)
  - Download button with premium gating redirecting to Plans tab in dialog
  - Crown icon for premium badge and upgrade CTAs
  - Chat interface for Charlie with message bubbles
  - Authentication modal with Google OAuth and email options
  - Profile dropdown showing avatar, name, email, subscription tier
  
- **States**: 
  - Navigation tabs: inactive, active (filled icon + primary color) - 3 tabs only
  - Profile avatar: default, hover (subtle scale), active dropdown
  - Settings/Plans dialog: closed, open on Settings tab, open on Plans tab
  - Plans cards: current plan (disabled button), upgradeable (active payment selection)
  - Payment methods: unselected (outline), selected (filled)
  - Payment button: idle, processing (spinner), disabled (no method selected)
  - Cards: default, pressed (slight scale), bookmarked
  - Buttons: default, hover, pressed, disabled, premium (accent color)
  - Download status: not downloaded (redirects to Plans in dialog), downloading, downloaded
  - User status: signed out (shows Sign In button), free tier, premium tier with expiry date
  - Charlie chat: idle, thinking, error
  
- **Icon Selection**: 
  - Sparkle for Charlie AI tab (leftmost)
  - House for Accueil/Home tab (center)
  - DownloadSimple for Téléchargements/Downloads tab (rightmost)
  - User for profile avatar placeholder and account section
  - Crown for Plans, premium features, and upgrade CTAs
  - Gear for Settings
  - BookmarkSimple for favorites
  - MagnifyingGlass for search
  - Globe for language
  - Trash for data clearing
  - Database for storage
  - SignIn/SignOut for authentication
  - GoogleLogo for Google sign-in and Google Play payment
  - CreditCard for card payment
  - PayPal logo (custom SVG) for PayPal payment
  - Camera for avatar URL update
  - PaperPlaneRight for sending messages to Charlie
  - Check for feature lists in plans
  
- **Spacing**: 
  - Bottom nav height: 64px with safe area padding (3 tabs only)
  - Container padding: p-4 mobile
  - Card gaps: gap-6 for grid, gap-8 for plans comparison
  - Bottom page padding: pb-20 to account for fixed navigation
  - Charlie chat message spacing: gap-4 with proper alignment
  - Plans feature lists: gap-4 between items
  - Payment method buttons: gap-2 in grid
  - Dialog content: proper padding for tabbed interface
  
- **Mobile**: 
  - Bottom navigation fixed to viewport bottom with safe area support (3 tabs: Charlie, Accueil, Téléchargements)
  - Profile avatar button in header opening dropdown menu
  - Settings/Plans in unified dialog (not separate pages/tabs in navigation)
  - Viewport-fit=cover for edge-to-edge design
  - Single column layout on mobile (1 column), expanding to 2 columns for plans comparison on tablet/desktop within dialog
  - Full-height dialogs with proper scroll handling
  - Touch-optimized 44px minimum tap targets throughout
  - Responsive Charlie chat interface with proper keyboard handling
  - Plans: stacked cards on mobile, side-by-side on larger screens (within dialog)
