import { Language } from './translations';

export interface TechniqueTranslation {
  title: string;
  description: string;
  steps: string[];
  warnings?: string[];
  tips?: string[];
}

export const techniqueTranslations: Record<string, Record<Language, TechniqueTranslation>> = {
  '1': {
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
    },
    es: {
      title: 'Construir un refugio de escombros',
      description: 'Un refugio simple y aislado usando materiales naturales del bosque. Esencial para mantener la temperatura corporal.',
      steps: [
        'Encuentra un poste de cumbrera largo y resistente (2,5-3 m) y apoya un extremo contra un árbol o roca a la altura de la cintura',
        'Apoya ramas en ángulos de 45 grados a ambos lados del poste para crear un marco acanalado',
        'Apila hojas, hierba, agujas de pino y otros escombros sobre el marco hasta 60-90 cm de espesor',
        'Crea un suelo aislado grueso en el interior usando hojas secas o ramas de pino',
        'Construye un pequeño tapón de puerta con ramas y escombros para sellar la entrada'
      ],
      warnings: [
        'Evita construir en valles donde se acumula el aire frío',
        'Verifica las ramas muertas arriba antes de construir',
        'Asegura ventilación adecuada si usas una fuente de calor dentro'
      ],
      tips: [
        'El refugio debe ser justo lo suficientemente grande para tu cuerpo - más pequeño significa más cálido',
        'Construye la entrada perpendicular a los vientos dominantes',
        'Prueba el espesor acostándote dentro - no deberías ver luz a través de las paredes'
      ]
    },
    de: {
      title: 'Einen Trümmer-Unterschlupf bauen',
      description: 'Ein einfacher, isolierter Unterschlupf aus natürlichen Materialien des Waldes. Wesentlich zur Aufrechterhaltung der Körpertemperatur.',
      steps: [
        'Finden Sie einen langen, stabilen Firstpfosten (2,5-3 m) und stützen Sie ein Ende gegen einen Baum oder Felsen in Hüfthöhe',
        'Lehnen Sie Äste in 45-Grad-Winkeln auf beiden Seiten des Firstpfostens an, um ein geripptes Gerüst zu schaffen',
        'Stapeln Sie Blätter, Gras, Kiefernnadeln und andere Trümmer über das Gerüst bis zu 60-90 cm Dicke',
        'Schaffen Sie einen dicken isolierten Boden im Inneren mit trockenen Blättern oder Kiefernzweigen',
        'Bauen Sie einen kleinen Türstopfen aus Ästen und Trümmern, um den Eingang zu versiegeln'
      ],
      warnings: [
        'Vermeiden Sie den Bau in Tälern, wo sich kalte Luft sammelt',
        'Überprüfen Sie tote Äste oben vor dem Bau',
        'Stellen Sie ausreichende Belüftung sicher, wenn Sie eine Wärmequelle im Inneren verwenden'
      ],
      tips: [
        'Der Unterschlupf sollte gerade groß genug für Ihren Körper sein - kleiner bedeutet wärmer',
        'Bauen Sie den Eingang senkrecht zu den vorherrschenden Winden',
        'Testen Sie die Dicke, indem Sie sich hineinlegen - Sie sollten kein Licht durch die Wände sehen'
      ]
    },
    it: {
      title: 'Costruire un rifugio di detriti',
      description: 'Un rifugio semplice e isolato usando materiali naturali della foresta. Essenziale per mantenere la temperatura corporea.',
      steps: [
        'Trova un palo di colmo lungo e robusto (2,5-3 m) e appoggia un\'estremità contro un albero o roccia all\'altezza della vita',
        'Inclina rami ad angoli di 45 gradi su entrambi i lati del palo per creare una struttura costolata',
        'Accumula foglie, erba, aghi di pino e altri detriti sulla struttura fino a 60-90 cm di spessore',
        'Crea un pavimento isolato spesso all\'interno usando foglie secche o rami di pino',
        'Costruisci un piccolo tappo di porta con rami e detriti per sigillare l\'ingresso'
      ],
      warnings: [
        'Evita di costruire in valli dove si accumula aria fredda',
        'Controlla i rami morti sopra prima di costruire',
        'Assicura una ventilazione adeguata se usi una fonte di calore all\'interno'
      ],
      tips: [
        'Il rifugio dovrebbe essere appena abbastanza grande per il tuo corpo - più piccolo significa più caldo',
        'Costruisci l\'ingresso perpendicolare ai venti dominanti',
        'Testa lo spessore sdraiandoti dentro - non dovresti vedere luce attraverso le pareti'
      ]
    }
  },
  '2': {
    en: {
      title: 'Purify Water with Boiling',
      description: 'The most reliable method to kill pathogens in water. Boiling destroys bacteria, viruses, and parasites that cause waterborne illnesses.',
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
    fr: {
      title: 'Purifier l\'eau par ébullition',
      description: 'La méthode la plus fiable pour tuer les pathogènes dans l\'eau. L\'ébullition détruit les bactéries, virus et parasites.',
      steps: [
        'Collectez l\'eau de la source la plus propre disponible (l\'eau courante est préférable à l\'eau stagnante)',
        'Pré-filtrez à travers un tissu ou laissez les sédiments se déposer si l\'eau est trouble',
        'Portez l\'eau à ébullition dans un récipient métallique',
        'Maintenez une ébullition pendant 1 minute (3 minutes au-dessus de 2000 m d\'altitude)',
        'Laissez refroidir avant de boire ou conservez dans un récipient propre'
      ],
      warnings: [
        'L\'ébullition n\'élimine pas les contaminants chimiques ou métaux lourds',
        'Assurez-vous que votre récipient peut résister à la chaleur',
        'Attention aux brûlures de vapeur lors de la manipulation de l\'eau bouillante'
      ],
      tips: [
        'Si aucun récipient n\'est disponible, chauffez des pierres dans le feu et plongez-les dans l\'eau',
        'L\'ébullition améliore également le goût en éliminant les gaz dissous',
        'Économisez du combustible en utilisant un couvercle'
      ]
    },
    es: {
      title: 'Purificar agua hirviendo',
      description: 'El método más fiable para matar patógenos en el agua. Hervir destruye bacterias, virus y parásitos.',
      steps: [
        'Recoge agua de la fuente más limpia disponible (el agua corriente es preferible a la estancada)',
        'Pre-filtra a través de tela o deja que el sedimento se asiente si el agua está turbia',
        'Lleva el agua a ebullición en un recipiente metálico',
        'Mantén una ebullición durante 1 minuto (3 minutos por encima de 2000 m de altitud)',
        'Deja enfriar antes de beber o almacena en un recipiente limpio'
      ],
      warnings: [
        'Hervir no elimina contaminantes químicos o metales pesados',
        'Asegúrate de que tu recipiente puede soportar el calor',
        'Ten cuidado con las quemaduras de vapor al manipular agua hirviendo'
      ],
      tips: [
        'Si no hay recipiente disponible, calienta rocas en el fuego y suéltalas en el agua',
        'Hervir también mejora el sabor al eliminar gases disueltos',
        'Ahorra combustible usando una tapa'
      ]
    },
    de: {
      title: 'Wasser durch Kochen reinigen',
      description: 'Die zuverlässigste Methode, um Krankheitserreger im Wasser abzutöten. Kochen zerstört Bakterien, Viren und Parasiten.',
      steps: [
        'Sammeln Sie Wasser aus der saubersten verfügbaren Quelle (fließendes Wasser ist stehendem vorzuziehen)',
        'Vorfiltern Sie durch Stoff oder lassen Sie Sedimente absetzen, wenn das Wasser trüb ist',
        'Bringen Sie Wasser in einem Metallbehälter zum Kochen',
        'Halten Sie ein rollendes Kochen für 1 Minute aufrecht (3 Minuten über 2000 m Höhe)',
        'Vor dem Trinken abkühlen lassen oder in einem sauberen Behälter aufbewahren'
      ],
      warnings: [
        'Kochen entfernt keine chemischen Verunreinigungen oder Schwermetalle',
        'Stellen Sie sicher, dass Ihr Behälter Hitze standhalten kann',
        'Vorsicht vor Dampfverbrennungen beim Umgang mit kochendem Wasser'
      ],
      tips: [
        'Wenn kein Behälter verfügbar ist, erhitzen Sie Steine im Feuer und legen Sie sie ins Wasser',
        'Kochen verbessert auch den Geschmack durch Entfernung gelöster Gase',
        'Sparen Sie Brennstoff durch Verwendung eines Deckels'
      ]
    },
    it: {
      title: 'Purificare l\'acqua bollendo',
      description: 'Il metodo più affidabile per uccidere i patogeni nell\'acqua. Bollire distrugge batteri, virus e parassiti.',
      steps: [
        'Raccogli acqua dalla fonte più pulita disponibile (l\'acqua corrente è preferibile a quella stagnante)',
        'Pre-filtra attraverso un panno o lascia depositare i sedimenti se l\'acqua è torbida',
        'Porta l\'acqua a ebollizione in un contenitore metallico',
        'Mantieni un\'ebollizione per 1 minuto (3 minuti sopra i 2000 m di altitudine)',
        'Lascia raffreddare prima di bere o conserva in un contenitore pulito'
      ],
      warnings: [
        'Bollire non rimuove contaminanti chimici o metalli pesanti',
        'Assicurati che il tuo contenitore possa resistere al calore',
        'Attenzione alle ustioni da vapore quando si maneggia acqua bollente'
      ],
      tips: [
        'Se non è disponibile alcun contenitore, riscalda le pietre nel fuoco e immergile nell\'acqua',
        'Bollire migliora anche il gusto eliminando i gas disciolti',
        'Risparmia combustibile usando un coperchio'
      ]
    }
  }
};
