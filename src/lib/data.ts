import { SurvivalTechnique } from './types';

export const survivalTechniques: SurvivalTechnique[] = [
  {
    id: '1',
    title: 'Build a Debris Shelter',
    category: 'shelter',
    difficulty: 'beginner',
    description: 'A simple, insulated shelter using natural materials found in the forest. Essential for maintaining body temperature in wilderness survival.',
    timeRequired: '2-3 hours',
    steps: [
      'Find a long, sturdy ridgepole (8-10 feet) and prop one end against a tree or rock at waist height',
      'Lean branches at 45-degree angles on both sides of the ridgepole to create a ribbed framework',
      'Pile leaves, grass, pine needles, and other debris over the framework until walls are 2-3 feet thick',
      'Create a thick insulated floor inside using dry leaves or pine boughs',
      'Build a small door plug from branches and debris to seal the entrance'
    ],
    warnings: [
      'Avoid building in valleys or depressions where cold air settles',
      'Check overhead for dead branches (widowmakers) before building',
      'Ensure adequate ventilation if using any heat source inside'
    ],
    tips: [
      'The shelter should be just large enough for your body - smaller means warmer',
      'Build the entrance perpendicular to prevailing winds',
      'Test the thickness by lying inside - you should not see any light through the walls'
    ]
  },
  {
    id: '2',
    title: 'Purify Water with Boiling',
    category: 'water',
    difficulty: 'beginner',
    description: 'The most reliable method to kill pathogens in water. Boiling destroys bacteria, viruses, and parasites that cause waterborne illnesses.',
    timeRequired: '15-20 minutes',
    steps: [
      'Collect water from the cleanest source available (flowing water is preferable to stagnant)',
      'Pre-filter through cloth or allow sediment to settle if water is cloudy',
      'Bring water to a rolling boil in a metal container',
      'Maintain a rolling boil for 1 minute (3 minutes above 6,500 feet elevation)',
      'Allow to cool before drinking or store in a clean container'
    ],
    warnings: [
      'Boiling does not remove chemical contaminants or heavy metals',
      'Ensure your container can withstand heat and won\'t leach toxins',
      'Be cautious of steam burns when handling boiling water'
    ],
    tips: [
      'If no container is available, heat rocks in fire and drop into water in a bark or hide vessel',
      'Boiling also improves taste by driving off dissolved gases',
      'Save fuel by using a lid to reach boiling point faster'
    ]
  },
  {
    id: '3',
    title: 'Bow Drill Fire Starting',
    category: 'fire',
    difficulty: 'advanced',
    description: 'A friction-based fire starting method requiring no modern tools. Mastering this technique provides reliable fire-making capability in any environment.',
    timeRequired: '30-60 minutes',
    steps: [
      'Create a spindle from a straight, dry stick (8-10 inches long, thumb thickness)',
      'Fashion a bow using a curved branch and cordage (shoelace, paracord, or plant fiber)',
      'Carve a fireboard from soft, dry wood (cedar, willow, or cottonwood work well)',
      'Cut a small depression in the fireboard and notch a V-shaped channel to collect ember dust',
      'Place tinder bundle nearby, loop bow around spindle, apply downward pressure with handhold, and saw rapidly',
      'Once ember forms in the notch, carefully transfer to tinder bundle and blow gently until flames appear'
    ],
    warnings: [
      'This technique requires significant practice - don\'t expect success on your first attempt',
      'Blisters are common - consider making a handhold with proper bearing surface',
      'Keep all materials bone dry - moisture will prevent ember formation'
    ],
    tips: [
      'Wood selection is critical: spindle should be harder than fireboard but both must be dry',
      'Success comes from speed and pressure - you need both',
      'Practice in dry conditions before relying on this method in an emergency'
    ]
  },
  {
    id: '4',
    title: 'Identify Edible Plants Safely',
    category: 'food',
    difficulty: 'intermediate',
    description: 'The Universal Edibility Test helps identify safe wild plants when you cannot definitively recognize them. Use only when truly necessary.',
    timeRequired: '24+ hours per plant',
    steps: [
      'Test only one plant part at a time and separate different parts (leaves, stems, roots)',
      'Smell the plant - reject if it has a strong unpleasant odor (almonds, peaches)',
      'Rub plant juice on sensitive skin (inner wrist or elbow), wait 15 minutes for reaction',
      'If no reaction, touch a small portion to outer lip, then inner lip, then tongue tip - wait 3 minutes between steps',
      'If no burning, stinging, or irritation, chew a small amount and hold in mouth for 15 minutes',
      'If still no reaction, swallow and wait 5 hours with no other food',
      'If no nausea, cramping, or diarrhea occurs, eat 1/4 cup and wait another 5 hours',
      'If no ill effects, the plant is likely safe to eat in moderate quantities'
    ],
    warnings: [
      'Avoid all plants with milky sap (except dandelion and thistle)',
      'Never eat mushrooms in a survival situation unless you are 100% certain of identification',
      'Aggregated berries (raspberries, blackberries) are generally safe; single berries can be toxic',
      'This test can take 24+ hours and requires discipline'
    ],
    tips: [
      'Learn to definitively identify common edible plants in your region before you need them',
      'Plants with three-leafed patterns should be avoided (poison ivy, etc.)',
      'If in doubt, don\'t eat it - you can survive weeks without food but not water'
    ]
  },
  {
    id: '5',
    title: 'Navigate Using the Sun',
    category: 'navigation',
    difficulty: 'beginner',
    description: 'Use the sun\'s predictable path to determine cardinal directions during the day, essential when compasses are unavailable.',
    timeRequired: '5-10 minutes',
    steps: [
      'In the Northern Hemisphere, the sun rises in the east and sets in the west',
      'At noon (solar noon, not clock noon), the sun is roughly south',
      'To find a precise east-west line: push a straight stick vertically into flat ground',
      'Mark the tip of the stick\'s shadow with a stone',
      'Wait 15-20 minutes and mark the shadow tip\'s new position',
      'Draw a line between the two marks - this runs east to west (first mark is west)',
      'A perpendicular line to this runs north-south'
    ],
    warnings: [
      'This method is less accurate near the equator',
      'Heavily overcast days make this technique impossible',
      'Remember seasonal variations affect the sun\'s path'
    ],
    tips: [
      'The shadow stick method works anywhere in the world',
      'Combine with night navigation using stars for confirmation',
      'Your watch can help: point hour hand at sun, south is halfway between hour hand and 12'
    ]
  },
  {
    id: '6',
    title: 'Treat Hypothermia',
    category: 'first-aid',
    difficulty: 'intermediate',
    description: 'Recognize and treat hypothermia, a life-threatening drop in core body temperature that can occur even in moderate conditions.',
    timeRequired: 'Several hours',
    steps: [
      'Recognize symptoms: shivering, confusion, slurred speech, drowsiness, loss of coordination',
      'Move person to shelter and out of wind/wet conditions immediately',
      'Remove all wet clothing and replace with dry layers if available',
      'Insulate from ground using sleeping pad, leaves, or clothing',
      'Apply heat to core areas: chest, neck, armpits, and groin using warm water bottles or body heat',
      'If person is alert and can swallow, give warm, sweet drinks (no alcohol or caffeine)',
      'Monitor closely - severe hypothermia requires immediate evacuation and medical care'
    ],
    warnings: [
      'Never give alcohol - it increases heat loss',
      'Do not rub or massage extremities - this can cause cold blood to rush to heart',
      'Avoid rapid rewarming which can cause heart problems',
      'Handle person gently - rough movement can trigger cardiac arrest in severe cases'
    ],
    tips: [
      'Prevention is key: stay dry, layer clothing, eat regularly, stay hydrated',
      '"Cotton kills" - wet cotton provides no insulation',
      'Group huddling in a shelter shares body heat effectively'
    ]
  },
  {
    id: '7',
    title: 'Create a Signal Fire',
    category: 'signaling',
    difficulty: 'beginner',
    description: 'Build a fire optimized for smoke production to signal rescuers. Smoke is visible for miles and can dramatically increase rescue chances.',
    timeRequired: '30-45 minutes',
    steps: [
      'Choose an open location visible from air and ground (hilltop, clearing, or beach)',
      'Build a substantial base fire using the teepee or log cabin method',
      'Prepare green branches, fresh leaves, or grass in advance for smoke production',
      'Have signal materials in three separate piles for three fires (international distress signal)',
      'Once base fire is burning hot, add green materials to create white smoke',
      'For darker smoke, add rubber, oil-soaked materials (use with caution)',
      'Maintain fires and be ready to add smoke materials when aircraft are heard or seen'
    ],
    warnings: [
      'Never leave signal fires unattended - they can spread',
      'Avoid toxic smoke from plastic or treated materials unless dire emergency',
      'In dry conditions, clear area around fire to prevent wildfire',
      'Three fires in a triangle is international distress - don\'t use casually'
    ],
    tips: [
      'Prepare fires in advance so you only need to light them when needed',
      'White smoke shows against dark forest, black smoke against snow',
      'Combine with ground signals (rocks, logs arranged in SOS pattern)',
      'A signal mirror is more effective during daytime in clear weather'
    ]
  },
  {
    id: '8',
    title: 'Find Water Using Vegetation',
    category: 'water',
    difficulty: 'intermediate',
    description: 'Locate water sources by reading the landscape and observing plant indicators when direct water sources aren\'t visible.',
    timeRequired: '1-2 hours',
    steps: [
      'Look for convergence of animal trails - they often lead to water',
      'Follow valleys and terrain downhill - water collects at lowest points',
      'Observe vegetation: lush, green plants indicate water nearby',
      'Look for water-loving plants: cattails, willows, cottonwoods, ferns, and moss',
      'In dry regions, dig at the outside bend of dry stream beds',
      'Morning dew can be collected by tying absorbent cloth around ankles and walking through grass',
      'Follow insects like bees and flies which stay within a few miles of water'
    ],
    warnings: [
      'All water sources must be purified before drinking',
      'Stagnant water carries higher risk of contamination',
      'In deserts, water may be deep underground despite surface indicators'
    ],
    tips: [
      'Birds flying low and fast at dawn/dusk are heading to water',
      'Listen for flowing water - sound carries well in quiet wilderness',
      'Rain collection is the safest water source when available',
      'Dew collection works best in grasslands with high humidity'
    ]
  },
  {
    id: '9',
    title: 'Build a Dakota Fire Hole',
    category: 'fire',
    difficulty: 'intermediate',
    description: 'An efficient, low-visibility fire pit that uses less fuel and produces minimal smoke. Excellent for windy conditions or when concealment is needed.',
    timeRequired: '45-60 minutes',
    steps: [
      'Dig a vertical hole about 12 inches deep and 8-10 inches in diameter',
      'Dig a second angled tunnel from about 10 inches away, connecting to the bottom of the first hole',
      'The tunnel should slope upward toward the fire chamber to create draft',
      'Line the fire chamber with rocks if available to retain heat',
      'Build fire in the main vertical chamber - tunnel provides oxygen',
      'Cook over the opening or use flat rocks as a grill surface'
    ],
    warnings: [
      'Check for tree roots before digging - fire can spread underground',
      'Avoid areas with peat or dry organic soil that can smolder',
      'Fully extinguish and fill in hole before leaving area'
    ],
    tips: [
      'This design is extremely fuel-efficient due to improved airflow',
      'Nearly smokeless once established, making it ideal for stealth camping',
      'Excellent wind protection - works in conditions that would kill surface fires',
      'Heat radiates from surrounding soil, providing warmth after fire dies'
    ]
  },
  {
    id: '10',
    title: 'Navigate by the Stars',
    category: 'navigation',
    difficulty: 'intermediate',
    description: 'Use celestial navigation to find direction at night. The night sky provides reliable navigation tools across the globe.',
    timeRequired: '5-10 minutes',
    steps: [
      'In Northern Hemisphere: locate the Big Dipper constellation',
      'Find the two stars forming the outer edge of the "cup"',
      'Draw an imaginary line through these stars and extend it about 5 times the distance',
      'This points to Polaris (North Star), which marks true north',
      'In Southern Hemisphere: locate the Southern Cross constellation',
      'Extend the long axis of the cross 4.5 times its length',
      'Drop a line straight down to the horizon - this marks south'
    ],
    warnings: [
      'Requires clear skies - cloud cover makes this method impossible',
      'Light pollution in populated areas obscures stars',
      'Learn constellations before you need them in an emergency'
    ],
    tips: [
      'Polaris appears stationary while other stars rotate around it',
      'The pointer stars of the Big Dipper always point to Polaris',
      'Orion\'s belt rises in the east and sets in the west worldwide',
      'Confirm star navigation with other methods when possible'
    ]
  },
  {
    id: '11',
    title: 'Improvise Cordage from Plants',
    category: 'shelter',
    difficulty: 'advanced',
    description: 'Create strong rope from natural plant fibers for shelters, traps, and tools. This fundamental skill multiplies your capabilities.',
    timeRequired: '1-3 hours',
    steps: [
      'Identify suitable plants: nettle, milkweed, yucca, basswood bark, or cattail leaves',
      'Harvest long fibers and allow to dry if possible (or use fresh in emergency)',
      'Strip fibers from the plant material and separate into thin strands',
      'Take two bundles of fiber, twist each clockwise',
      'Wrap the two twisted bundles around each other counter-clockwise',
      'As you near the end of fibers, splice in new material by overlapping and continuing twist',
      'The opposing twists create tension that holds the cordage together'
    ],
    warnings: [
      'Some plants like nettle cause skin irritation - wear gloves if available',
      'Wet cordage is stronger but will shrink when it dries',
      'Green materials are easier to work but dried fibers are generally stronger'
    ],
    tips: [
      'The reverse-wrap technique (twist clockwise, wrap counter-clockwise) is key',
      'Longer fibers make stronger cordage with fewer splice points',
      'Inner bark of dead trees often provides ready-to-use fiber',
      'Practice this skill at home - it\'s difficult to learn under stress'
    ]
  },
  {
    id: '12',
    title: 'Set a Simple Snare Trap',
    category: 'food',
    difficulty: 'advanced',
    description: 'Construct a basic snare to catch small game. Passive trapping conserves energy while increasing food procurement chances.',
    timeRequired: '30-45 minutes',
    steps: [
      'Identify active game trails by looking for tracks, droppings, and worn paths',
      'Create a noose from wire or strong cordage with a slipknot',
      'Size the noose appropriately: 2 inches for squirrels, 4 inches for rabbits',
      'Position noose about one hand width above the trail',
      'Use natural funneling: place sticks to guide animal through noose',
      'Secure the running end to a tree or stake firmly anchored in ground',
      'Check snares morning and evening - never leave indefinitely'
    ],
    warnings: [
      'Snaring may be illegal in many areas - know local laws',
      'Only use in genuine survival situations',
      'Dispatch caught animals quickly and humanely',
      'Never set and forget - check traps regularly to prevent suffering'
    ],
    tips: [
      'Set multiple snares to increase chances - 10+ is reasonable',
      'Remove human scent by rubbing snare with local vegetation',
      'Place on runs between bedding and feeding areas',
      'Spring snares (with bent sapling) are more effective but complex'
    ]
  }
];

export const categoryColors: Record<string, string> = {
  shelter: 'bg-amber-500/20 text-amber-300 border-amber-500/50',
  water: 'bg-blue-500/20 text-blue-300 border-blue-500/50',
  fire: 'bg-orange-500/20 text-orange-300 border-orange-500/50',
  food: 'bg-green-500/20 text-green-300 border-green-500/50',
  navigation: 'bg-purple-500/20 text-purple-300 border-purple-500/50',
  'first-aid': 'bg-red-500/20 text-red-300 border-red-500/50',
  signaling: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50',
};

export const categoryLabels: Record<string, string> = {
  shelter: 'Shelter',
  water: 'Water',
  fire: 'Fire',
  food: 'Food',
  navigation: 'Navigation',
  'first-aid': 'First Aid',
  signaling: 'Signaling',
};
