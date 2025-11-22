const fs = require('fs');

const techniques = [
  {
    id: '1',
    category: 'shelter',
    difficulty: 'beginner',
    timeRequired: '2-3 hours',
    translations: {
      en: {
        title: 'Build a Debris Shelter',
        description: 'A simple, insulated shelter using natural materials found in the forest. Essential for maintaining body temperature in wilderness survival.',
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
      fr: {
        title: 'Construire un abri de débris',
        description: 'Un abri simple et isolé utilisant des matériaux naturels trouvés en forêt. Essentiel pour maintenir la température corporelle en survie.',
        steps: [
          'Trouvez une longue perche faîtière robuste (2,5-3 m) et appuyez une extrémité contre un arbre ou rocher à hauteur de taille',
          'Inclinez des branches à 45 degrés des deux côtés de la perche pour créer une structure nervurée',
          'Empilez feuilles, herbe, aiguilles de pin et autres débris sur la structure jusqu\'à 60-90 cm d\'épaisseur',
          'Créez un sol isolé épais à l\'intérieur avec des feuilles sèches ou des branches de pin',
          'Construisez un petit bouchon de porte avec des branches et des débris pour sceller l\'entrée'
        ],
        warnings: [
          'Évitez de construire dans les vallées où l\'air froid s\'accumule',
          'Vérifiez les branches mortes au-dessus avant de construire',
          'Assurez une ventilation adéquate si vous utilisez une source de chaleur à l\'intérieur'
        ],
        tips: [
          'L\'abri doit être juste assez grand pour votre corps - plus petit signifie plus chaud',
          'Construisez l\'entrée perpendiculairement aux vents dominants',
          'Testez l\'épaisseur en vous allongeant à l\'intérieur - vous ne devriez pas voir de lumière à travers les murs'
        ]
      }
    }
  },
  // ... I will add the rest in the real file generation or just do a few as example and tell user to complete? 
  // No, I should try to do all if possible.
  // For brevity in this tool call, I will generate the script that generates the SQL structure and the first item, 
  // and I will manually complete the SQL file with the rest of the data I read from the files.
];

// Actually, I will just write the SQL file directly using the data I have.
