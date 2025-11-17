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
  },
  '3': {
    en: {
      title: 'Bow Drill Fire Starting',
      description: 'A friction-based fire starting method requiring no modern tools. Mastering this technique provides reliable fire-making capability in any environment.',
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
    fr: {
      title: 'Allumage par friction (bow drill)',
      description: 'Une méthode d\'allumage par friction sans outils modernes. Maîtriser cette technique fournit une capacité fiable de faire du feu.',
      steps: [
        'Créez une tige à partir d\'un bâton droit et sec (20-25 cm de long, épaisseur du pouce)',
        'Fabriquez un arc avec une branche courbée et de la corde (lacet, paracorde ou fibre végétale)',
        'Sculptez une planche de feu en bois tendre et sec (cèdre, saule ou peuplier)',
        'Creusez une petite dépression dans la planche et entaillez un canal en V pour collecter la braise',
        'Placez un paquet d\'amadou à proximité, enroulez l\'arc autour de la tige, appliquez une pression vers le bas et sciez rapidement',
        'Une fois la braise formée dans l\'encoche, transférez-la soigneusement dans l\'amadou et soufflez doucement jusqu\'à l\'apparition des flammes'
      ],
      warnings: [
        'Cette technique nécessite beaucoup de pratique - ne vous attendez pas au succès lors de votre première tentative',
        'Les ampoules sont courantes - envisagez de fabriquer une poignée avec une surface d\'appui appropriée',
        'Gardez tous les matériaux parfaitement secs - l\'humidité empêchera la formation de la braise'
      ],
      tips: [
        'La sélection du bois est critique : la tige doit être plus dure que la planche mais les deux doivent être sèches',
        'Le succès vient de la vitesse et de la pression - vous avez besoin des deux',
        'Pratiquez dans des conditions sèches avant de compter sur cette méthode en situation d\'urgence'
      ]
    },
    es: {
      title: 'Encendido por fricción (bow drill)',
      description: 'Un método de encendido por fricción sin herramientas modernas. Dominar esta técnica proporciona capacidad confiable para hacer fuego.',
      steps: [
        'Crea un husillo de un palo recto y seco (20-25 cm de largo, grosor del pulgar)',
        'Fabrica un arco usando una rama curva y cordaje (cordón, paracord o fibra vegetal)',
        'Talla una tabla de fuego de madera blanda y seca (cedro, sauce o álamo)',
        'Corta una pequeña depresión en la tabla y talla un canal en forma de V para recoger brasas',
        'Coloca un paquete de yesca cerca, enrolla el arco alrededor del husillo, aplica presión hacia abajo y sierra rápidamente',
        'Una vez que se forme la brasa en la muesca, transfiérela cuidadosamente al paquete de yesca y sopla suavemente hasta que aparezcan llamas'
      ],
      warnings: [
        'Esta técnica requiere práctica significativa - no esperes éxito en tu primer intento',
        'Las ampollas son comunes - considera hacer un soporte con superficie adecuada',
        'Mantén todos los materiales completamente secos - la humedad evitará la formación de brasas'
      ],
      tips: [
        'La selección de madera es crítica: el husillo debe ser más duro que la tabla pero ambos deben estar secos',
        'El éxito proviene de la velocidad y la presión - necesitas ambas',
        'Practica en condiciones secas antes de confiar en este método en una emergencia'
      ]
    },
    de: {
      title: 'Feuer machen durch Reibung (Bow Drill)',
      description: 'Eine reibungsbasierte Feuermethode ohne moderne Werkzeuge. Diese Technik zu beherrschen bietet zuverlässige Feuerfähigkeit.',
      steps: [
        'Erstellen Sie eine Spindel aus einem geraden, trockenen Stock (20-25 cm lang, Daumendicke)',
        'Fertigen Sie einen Bogen aus einem gebogenen Ast und Schnur (Schnürsenkel, Paracord oder Pflanzenfaser)',
        'Schnitzen Sie ein Feuerbrett aus weichem, trockenem Holz (Zeder, Weide oder Pappel)',
        'Schneiden Sie eine kleine Vertiefung im Feuerbrett und kerben Sie einen V-förmigen Kanal zum Sammeln von Glutstaub',
        'Legen Sie Zunderbündel in die Nähe, wickeln Sie den Bogen um die Spindel, üben Sie Druck nach unten aus und sägen Sie schnell',
        'Sobald sich Glut in der Kerbe bildet, übertragen Sie sie vorsichtig auf das Zunderbündel und blasen Sie sanft, bis Flammen erscheinen'
      ],
      warnings: [
        'Diese Technik erfordert erhebliche Übung - erwarten Sie keinen Erfolg beim ersten Versuch',
        'Blasen sind häufig - erwägen Sie einen Handgriff mit angemessener Auflagefläche',
        'Halten Sie alle Materialien knochentrocken - Feuchtigkeit verhindert Glutbildung'
      ],
      tips: [
        'Holzauswahl ist kritisch: Spindel sollte härter sein als Feuerbrett, aber beide müssen trocken sein',
        'Erfolg kommt von Geschwindigkeit und Druck - Sie brauchen beides',
        'Üben Sie unter trockenen Bedingungen, bevor Sie sich im Notfall auf diese Methode verlassen'
      ]
    },
    it: {
      title: 'Accensione del fuoco per attrito (bow drill)',
      description: 'Un metodo di accensione del fuoco basato sulla friction senza strumenti moderni. Padroneggiare questa tecnica fornisce capacità affidabile.',
      steps: [
        'Crea un fuso da un bastone dritto e secco (20-25 cm di lunghezza, spessore del pollice)',
        'Fabbrica un arco usando un ramo curvo e cordame (laccio, paracord o fibra vegetale)',
        'Intagli una tavola di fuoco da legno morbido e secco (cedro, salice o pioppo)',
        'Taglia una piccola depressione nella tavola e incidi un canale a forma di V per raccogliere brace',
        'Posiziona un fascio di esca nelle vicinanze, avvolgi l\'arco attorno al fuso, applica pressione verso il basso e sega rapidamente',
        'Una volta formata la brace nell\'intaglio, trasferiscila con cura al fascio di esca e soffia delicatamente finché non appaiono fiamme'
      ],
      warnings: [
        'Questa tecnica richiede pratica significativa - non aspettarti successo al primo tentativo',
        'Le vesciche sono comuni - considera di fare un\'impugnatura con superficie adeguata',
        'Mantieni tutti i materiali completamente asciutti - l\'umidità impedirà la formazione di brace'
      ],
      tips: [
        'La selezione del legno è critica: il fuso dovrebbe essere più duro della tavola ma entrambi devono essere asciutti',
        'Il successo deriva da velocità e pressione - hai bisogno di entrambe',
        'Pratica in condizioni asciutte prima di fare affidamento su questo metodo in emergenza'
      ]
    }
  },
  '4': {
    en: {
      title: 'Identify Edible Plants Safely',
      description: 'The Universal Edibility Test helps identify safe wild plants when you cannot definitively recognize them. Use only when truly necessary.',
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
    fr: {
      title: 'Identifier les plantes comestibles en sécurité',
      description: 'Le test d\'édibilité universel aide à identifier les plantes sauvages comestibles. À utiliser uniquement en cas de vraie nécessité.',
      steps: [
        'Testez une seule partie de la plante à la fois et séparez les différentes parties (feuilles, tiges, racines)',
        'Sentez la plante - rejetez-la si elle a une forte odeur désagréable (amande, pêche)',
        'Frottez le jus de la plante sur une peau sensible (poignet intérieur ou coude), attendez 15 minutes pour une réaction',
        'Si aucune réaction, touchez une petite partie à la lèvre externe, puis lèvre interne, puis bout de la langue - attendez 3 minutes entre chaque étape',
        'Si pas de brûlure, piqûre ou irritation, mâchez une petite quantité et gardez en bouche pendant 15 minutes',
        'Si toujours aucune réaction, avalez et attendez 5 heures sans autre nourriture',
        'Si pas de nausée, crampes ou diarrhée, mangez 1/4 de tasse et attendez encore 5 heures',
        'Si aucun effet indésirable, la plante est probablement sûre à manger en quantités modérées'
      ],
      warnings: [
        'Évitez toutes les plantes avec de la sève laiteuse (sauf pissenlit et chardon)',
        'Ne mangez jamais de champignons en survie sauf si vous êtes sûr à 100% de l\'identification',
        'Les baies agrégées (framboises, mûres) sont généralement sûres; les baies simples peuvent être toxiques',
        'Ce test peut prendre plus de 24 heures et nécessite de la discipline'
      ],
      tips: [
        'Apprenez à identifier définitivement les plantes comestibles communes de votre région avant d\'en avoir besoin',
        'Les plantes à motifs à trois feuilles doivent être évitées (herbe à puce, etc.)',
        'En cas de doute, ne mangez pas - vous pouvez survivre des semaines sans nourriture mais pas sans eau'
      ]
    },
    es: {
      title: 'Identificar plantas comestibles con seguridad',
      description: 'La prueba universal de comestibilidad ayuda a identificar plantas silvestres seguras. Usar solo cuando sea realmente necesario.',
      steps: [
        'Prueba solo una parte de la planta a la vez y separa las diferentes partes (hojas, tallos, raíces)',
        'Huele la planta - rechaza si tiene un olor desagradable fuerte (almendras, melocotones)',
        'Frota el jugo de la planta en piel sensible (muñeca interna o codo), espera 15 minutos para reacción',
        'Si no hay reacción, toca una pequeña porción al labio externo, luego labio interno, luego punta de la lengua - espera 3 minutos entre pasos',
        'Si no hay ardor, picazón o irritación, mastica una pequeña cantidad y mantén en la boca durante 15 minutos',
        'Si todavía no hay reacción, traga y espera 5 horas sin otra comida',
        'Si no hay náuseas, calambres o diarrea, come 1/4 de taza y espera otras 5 horas',
        'Si no hay efectos adversos, la planta probablemente sea segura para comer en cantidades moderadas'
      ],
      warnings: [
        'Evita todas las plantas con savia lechosa (excepto diente de león y cardo)',
        'Nunca comas hongos en supervivencia a menos que estés 100% seguro de la identificación',
        'Las bayas agregadas (frambuesas, moras) generalmente son seguras; las bayas individuales pueden ser tóxicas',
        'Esta prueba puede tomar más de 24 horas y requiere disciplina'
      ],
      tips: [
        'Aprende a identificar definitivamente plantas comestibles comunes en tu región antes de necesitarlas',
        'Las plantas con patrones de tres hojas deben evitarse (hiedra venenosa, etc.)',
        'En caso de duda, no comas - puedes sobrevivir semanas sin comida pero no sin agua'
      ]
    },
    de: {
      title: 'Essbare Pflanzen sicher identifizieren',
      description: 'Der universelle Essbarkeitstest hilft, sichere Wildpflanzen zu identifizieren. Nur bei wirklicher Notwendigkeit verwenden.',
      steps: [
        'Testen Sie nur einen Pflanzenteil gleichzeitig und trennen Sie verschiedene Teile (Blätter, Stängel, Wurzeln)',
        'Riechen Sie an der Pflanze - lehnen Sie ab, wenn sie einen starken unangenehmen Geruch hat (Mandeln, Pfirsiche)',
        'Reiben Sie Pflanzensaft auf empfindliche Haut (Innenseite des Handgelenks oder Ellbogens), warten Sie 15 Minuten auf Reaktion',
        'Wenn keine Reaktion, berühren Sie eine kleine Portion an der äußeren Lippe, dann inneren Lippe, dann Zungenspitze - warten Sie 3 Minuten zwischen den Schritten',
        'Wenn kein Brennen, Stechen oder Reizung, kauen Sie eine kleine Menge und halten Sie sie 15 Minuten im Mund',
        'Wenn immer noch keine Reaktion, schlucken Sie und warten Sie 5 Stunden ohne andere Nahrung',
        'Wenn keine Übelkeit, Krämpfe oder Durchfall auftreten, essen Sie 1/4 Tasse und warten Sie weitere 5 Stunden',
        'Wenn keine negativen Auswirkungen, ist die Pflanze wahrscheinlich sicher in moderaten Mengen zu essen'
      ],
      warnings: [
        'Vermeiden Sie alle Pflanzen mit milchigem Saft (außer Löwenzahn und Distel)',
        'Essen Sie niemals Pilze in einer Überlebenssituation, es sei denn, Sie sind 100% sicher bei der Identifizierung',
        'Aggregierte Beeren (Himbeeren, Brombeeren) sind im Allgemeinen sicher; einzelne Beeren können giftig sein',
        'Dieser Test kann über 24 Stunden dauern und erfordert Disziplin'
      ],
      tips: [
        'Lernen Sie, häufige essbare Pflanzen in Ihrer Region definitiv zu identifizieren, bevor Sie sie brauchen',
        'Pflanzen mit dreiblättrigen Mustern sollten vermieden werden (Giftefeu usw.)',
        'Im Zweifelsfall nicht essen - Sie können Wochen ohne Nahrung überleben, aber nicht ohne Wasser'
      ]
    },
    it: {
      title: 'Identificare piante commestibili in sicurezza',
      description: 'Il test universale di commestibilità aiuta a identificare piante selvatiche sicure. Usare solo quando davvero necessario.',
      steps: [
        'Testa solo una parte della pianta alla volta e separa le diverse parti (foglie, steli, radici)',
        'Annusa la pianta - rifiuta se ha un forte odore sgradevole (mandorle, pesche)',
        'Strofina il succo della pianta su pelle sensibile (polso interno o gomito), aspetta 15 minuti per reazione',
        'Se nessuna reazione, tocca una piccola porzione al labbro esterno, poi labbro interno, poi punta della lingua - aspetta 3 minuti tra i passaggi',
        'Se nessuna bruciatura, puntura o irritazione, mastica una piccola quantità e tieni in bocca per 15 minuti',
        'Se ancora nessuna reazione, ingoia e aspetta 5 ore senza altro cibo',
        'Se nessuna nausea, crampi o diarrea, mangia 1/4 di tazza e aspetta altre 5 ore',
        'Se nessun effetto negativo, la pianta è probabilmente sicura da mangiare in quantità moderate'
      ],
      warnings: [
        'Evita tutte le piante con linfa lattiginosa (eccetto tarassaco e cardo)',
        'Non mangiare mai funghi in una situazione di sopravvivenza a meno che non sei sicuro al 100% dell\'identificazione',
        'Le bacche aggregate (lamponi, more) sono generalmente sicure; le bacche singole possono essere tossiche',
        'Questo test può richiedere oltre 24 ore e richiede disciplina'
      ],
      tips: [
        'Impara a identificare definitivamente piante commestibili comuni nella tua regione prima di averne bisogno',
        'Le piante con pattern a tre foglie dovrebbero essere evitate (edera velenosa, ecc.)',
        'In caso di dubbio, non mangiare - puoi sopravvivere settimane senza cibo ma non senza acqua'
      ]
    }
  },
  '5': {
    en: {
      title: 'Navigate Using the Sun',
      description: 'Use the sun\'s predictable path to determine cardinal directions during the day, essential when compasses are unavailable.',
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
    fr: {
      title: 'Naviguer avec le soleil',
      description: 'Utilisez le chemin prévisible du soleil pour déterminer les directions cardinales, essentiel quand les boussoles sont indisponibles.',
      steps: [
        'Dans l\'hémisphère nord, le soleil se lève à l\'est et se couche à l\'ouest',
        'À midi (midi solaire, pas midi d\'horloge), le soleil est approximativement au sud',
        'Pour trouver une ligne est-ouest précise: plantez un bâton droit verticalement dans le sol plat',
        'Marquez la pointe de l\'ombre du bâton avec une pierre',
        'Attendez 15-20 minutes et marquez la nouvelle position de la pointe de l\'ombre',
        'Tracez une ligne entre les deux marques - cela va d\'est en ouest (première marque à l\'ouest)',
        'Une ligne perpendiculaire à celle-ci va du nord au sud'
      ],
      warnings: [
        'Cette méthode est moins précise près de l\'équateur',
        'Les jours très nuageux rendent cette technique impossible',
        'Rappelez-vous que les variations saisonnières affectent le trajet du soleil'
      ],
      tips: [
        'La méthode du bâton d\'ombre fonctionne partout dans le monde',
        'Combinez avec la navigation nocturne par les étoiles pour confirmation',
        'Votre montre peut aider: pointez l\'aiguille des heures vers le soleil, le sud est à mi-chemin entre l\'aiguille et 12'
      ]
    },
    es: {
      title: 'Navegar usando el sol',
      description: 'Usa el camino predecible del sol para determinar direcciones cardinales, esencial cuando las brújulas no están disponibles.',
      steps: [
        'En el hemisferio norte, el sol sale por el este y se pone por el oeste',
        'Al mediodía (mediodía solar, no de reloj), el sol está aproximadamente al sur',
        'Para encontrar una línea este-oeste precisa: clava un palo recto verticalmente en suelo plano',
        'Marca la punta de la sombra del palo con una piedra',
        'Espera 15-20 minutos y marca la nueva posición de la punta de la sombra',
        'Dibuja una línea entre las dos marcas - esto va de este a oeste (primera marca es oeste)',
        'Una línea perpendicular a esta va de norte a sur'
      ],
      warnings: [
        'Este método es menos preciso cerca del ecuador',
        'Los días muy nublados hacen imposible esta técnica',
        'Recuerda que las variaciones estacionales afectan el camino del sol'
      ],
      tips: [
        'El método del palo de sombra funciona en cualquier parte del mundo',
        'Combina con navegación nocturna usando estrellas para confirmación',
        'Tu reloj puede ayudar: apunta la manecilla de las horas al sol, el sur está a mitad de camino entre la manecilla y las 12'
      ]
    },
    de: {
      title: 'Navigation mit der Sonne',
      description: 'Nutzen Sie den vorhersehbaren Sonnenweg, um Himmelsrichtungen zu bestimmen, wichtig wenn keine Kompasse verfügbar sind.',
      steps: [
        'Auf der Nordhalbkugel geht die Sonne im Osten auf und im Westen unter',
        'Mittags (Sonnenmittag, nicht Uhrmittag) steht die Sonne ungefähr im Süden',
        'Für eine präzise Ost-West-Linie: stecken Sie einen geraden Stock vertikal in ebenen Boden',
        'Markieren Sie die Spitze des Stockschattens mit einem Stein',
        'Warten Sie 15-20 Minuten und markieren Sie die neue Position der Schattenspitze',
        'Ziehen Sie eine Linie zwischen den beiden Markierungen - diese verläuft von Ost nach West (erste Markierung ist West)',
        'Eine senkrechte Linie dazu verläuft von Nord nach Süd'
      ],
      warnings: [
        'Diese Methode ist in der Nähe des Äquators weniger genau',
        'Stark bewölkte Tage machen diese Technik unmöglich',
        'Denken Sie daran, dass saisonale Schwankungen den Sonnenweg beeinflussen'
      ],
      tips: [
        'Die Schattenstab-Methode funktioniert überall auf der Welt',
        'Kombinieren Sie mit Nachtnavigation mit Sternen zur Bestätigung',
        'Ihre Uhr kann helfen: richten Sie den Stundenzeiger auf die Sonne, Süden ist auf halbem Weg zwischen Stundenzeiger und 12'
      ]
    },
    it: {
      title: 'Navigare usando il sole',
      description: 'Usa il percorso prevedibile del sole per determinare direzioni cardinali, essenziale quando le bussole non sono disponibili.',
      steps: [
        'Nell\'emisfero nord, il sole sorge ad est e tramonta ad ovest',
        'A mezzogiorno (mezzogiorno solare, non dell\'orologio), il sole è approssimativamente a sud',
        'Per trovare una linea est-ovest precisa: pianta un bastone dritto verticalmente nel terreno piano',
        'Segna la punta dell\'ombra del bastone con una pietra',
        'Aspetta 15-20 minuti e segna la nuova posizione della punta dell\'ombra',
        'Traccia una linea tra i due segni - questa va da est a ovest (primo segno è ovest)',
        'Una linea perpendicolare a questa va da nord a sud'
      ],
      warnings: [
        'Questo metodo è meno preciso vicino all\'equatore',
        'Giorni molto nuvolosi rendono questa tecnica impossibile',
        'Ricorda che le variazioni stagionali influenzano il percorso del sole'
      ],
      tips: [
        'Il metodo del bastone d\'ombra funziona ovunque nel mondo',
        'Combina con navigazione notturna usando stelle per conferma',
        'Il tuo orologio può aiutare: punta la lancetta delle ore al sole, il sud è a metà strada tra la lancetta e le 12'
      ]
    }
  },
  '6': {
    en: {
      title: 'Treat Hypothermia',
      description: 'Recognize and treat hypothermia, a life-threatening drop in core body temperature that can occur even in moderate conditions.',
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
    fr: {
      title: 'Traiter l\'hypothermie',
      description: 'Reconnaître et traiter l\'hypothermie, une chute dangereuse de la température corporelle pouvant survenir même dans des conditions modérées.',
      steps: [
        'Reconnaître les symptômes: frissons, confusion, discours confus, somnolence, perte de coordination',
        'Déplacer la personne à l\'abri et hors des conditions venteuses/humides immédiatement',
        'Retirer tous les vêtements mouillés et remplacer par des couches sèches si disponibles',
        'Isoler du sol en utilisant un tapis de sol, des feuilles ou des vêtements',
        'Appliquer de la chaleur aux zones centrales: poitrine, cou, aisselles et aine avec des bouteilles d\'eau chaude ou chaleur corporelle',
        'Si la personne est alerte et peut avaler, donner des boissons chaudes sucrées (pas d\'alcool ni de caféine)',
        'Surveiller attentivement - l\'hypothermie sévère nécessite une évacuation immédiate et des soins médicaux'
      ],
      warnings: [
        'Ne jamais donner d\'alcool - cela augmente la perte de chaleur',
        'Ne pas frotter ou masser les extrémités - cela peut faire affluer du sang froid vers le cœur',
        'Éviter le réchauffement rapide qui peut causer des problèmes cardiaques',
        'Manipuler la personne doucement - les mouvements brusques peuvent déclencher un arrêt cardiaque dans les cas graves'
      ],
      tips: [
        'La prévention est essentielle: rester au sec, superposer les vêtements, manger régulièrement, rester hydraté',
        '"Le coton tue" - le coton mouillé ne fournit aucune isolation',
        'Se blottir en groupe dans un abri partage efficacement la chaleur corporelle'
      ]
    },
    es: {
      title: 'Tratar la hipotermia',
      description: 'Reconocer y tratar la hipotermia, una caída peligrosa de temperatura corporal que puede ocurrir incluso en condiciones moderadas.',
      steps: [
        'Reconocer síntomas: temblores, confusión, habla arrastrada, somnolencia, pérdida de coordinación',
        'Mover a la persona al refugio y fuera de condiciones de viento/humedad inmediatamente',
        'Quitar toda la ropa mojada y reemplazar con capas secas si están disponibles',
        'Aislar del suelo usando una colchoneta, hojas o ropa',
        'Aplicar calor a áreas centrales: pecho, cuello, axilas e ingle usando botellas de agua caliente o calor corporal',
        'Si la persona está alerta y puede tragar, dar bebidas calientes dulces (sin alcohol ni cafeína)',
        'Monitorear de cerca - la hipotermia severa requiere evacuación inmediata y atención médica'
      ],
      warnings: [
        'Nunca dar alcohol - aumenta la pérdida de calor',
        'No frotar ni masajear extremidades - esto puede hacer que la sangre fría fluya al corazón',
        'Evitar el recalentamiento rápido que puede causar problemas cardíacos',
        'Manejar a la persona con suavidad - el movimiento brusco puede desencadenar paro cardíaco en casos graves'
      ],
      tips: [
        'La prevención es clave: mantenerse seco, usar capas de ropa, comer regularmente, mantenerse hidratado',
        '"El algodón mata" - el algodón mojado no proporciona aislamiento',
        'Agruparse en un refugio comparte el calor corporal eficazmente'
      ]
    },
    de: {
      title: 'Hypothermie behandeln',
      description: 'Unterkühlung erkennen und behandeln, ein lebensbedrohlicher Abfall der Körperkerntemperatur, der selbst bei mäßigen Bedingungen auftreten kann.',
      steps: [
        'Symptome erkennen: Zittern, Verwirrung, undeutliche Sprache, Schläfrigkeit, Verlust der Koordination',
        'Person sofort in Schutz und aus Wind-/Nassbedingungen bringen',
        'Alle nassen Kleidungsstücke entfernen und durch trockene Schichten ersetzen, falls verfügbar',
        'Vom Boden isolieren mit Schlafmatte, Blättern oder Kleidung',
        'Wärme auf Kernbereiche anwenden: Brust, Hals, Achselhöhlen und Leiste mit warmen Wasserflaschen oder Körperwärme',
        'Wenn Person wach ist und schlucken kann, warme, süße Getränke geben (kein Alkohol oder Koffein)',
        'Eng überwachen - schwere Hypothermie erfordert sofortige Evakuierung und medizinische Versorgung'
      ],
      warnings: [
        'Niemals Alkohol geben - es erhöht den Wärmeverlust',
        'Extremitäten nicht reiben oder massieren - dies kann kaltes Blut zum Herzen treiben',
        'Schnelles Aufwärmen vermeiden, das Herzprobleme verursachen kann',
        'Person sanft behandeln - grobe Bewegung kann in schweren Fällen Herzstillstand auslösen'
      ],
      tips: [
        'Prävention ist entscheidend: trocken bleiben, Kleidung schichten, regelmäßig essen, hydratisiert bleiben',
        '"Baumwolle tötet" - nasse Baumwolle bietet keine Isolierung',
        'Gruppenkuscheln in einem Schutz teilt Körperwärme effektiv'
      ]
    },
    it: {
      title: 'Trattare l\'ipotermia',
      description: 'Riconoscere e trattare l\'ipotermia, un calo pericoloso della temperatura corporea che può verificarsi anche in condizioni moderate.',
      steps: [
        'Riconoscere i sintomi: brividi, confusione, eloquio confuso, sonnolenza, perdita di coordinazione',
        'Spostare la persona al riparo e fuori da condizioni ventose/umide immediatamente',
        'Rimuovere tutti i vestiti bagnati e sostituire con strati asciutti se disponibili',
        'Isolare dal terreno usando un materassino, foglie o vestiti',
        'Applicare calore alle aree centrali: petto, collo, ascelle e inguine usando bottiglie di acqua calda o calore corporeo',
        'Se la persona è vigile e può deglutire, dare bevande calde dolci (niente alcol o caffeina)',
        'Monitorare attentamente - l\'ipotermia grave richiede evacuazione immediata e cure mediche'
      ],
      warnings: [
        'Mai dare alcol - aumenta la perdita di calore',
        'Non strofinare o massaggiare le estremità - questo può far fluire sangue freddo al cuore',
        'Evitare il riscaldamento rapido che può causare problemi cardiaci',
        'Maneggiare la persona delicatamente - il movimento brusco può scatenare arresto cardiaco nei casi gravi'
      ],
      tips: [
        'La prevenzione è fondamentale: rimanere asciutti, stratificare i vestiti, mangiare regolarmente, rimanere idratati',
        '"Il cotone uccide" - il cotone bagnato non fornisce isolamento',
        'Raggrupparsi in un riparo condivide il calore corporeo efficacemente'
      ]
    }
  },
  '7': {
    en: {
      title: 'Create a Signal Fire',
      description: 'Build a fire optimized for smoke production to signal rescuers. Smoke is visible for miles and can dramatically increase rescue chances.',
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
    fr: {
      title: 'Créer un feu de signalisation',
      description: 'Construire un feu optimisé pour la production de fumée pour signaler les sauveteurs. La fumée est visible sur des kilomètres.',
      steps: [
        'Choisissez un emplacement ouvert visible depuis l\'air et le sol (sommet de colline, clairière ou plage)',
        'Construisez un feu de base substantiel en utilisant la méthode du tipi ou de la cabane en rondins',
        'Préparez des branches vertes, des feuilles fraîches ou de l\'herbe à l\'avance pour la production de fumée',
        'Ayez des matériaux de signalisation en trois piles séparées pour trois feux (signal de détresse international)',
        'Une fois que le feu de base brûle chaud, ajoutez des matériaux verts pour créer de la fumée blanche',
        'Pour de la fumée plus foncée, ajoutez du caoutchouc, des matériaux imbibés d\'huile (avec prudence)',
        'Entretenez les feux et soyez prêt à ajouter des matériaux fumigènes quand un avion est entendu ou vu'
      ],
      warnings: [
        'Ne laissez jamais les feux de signalisation sans surveillance - ils peuvent se propager',
        'Évitez la fumée toxique du plastique ou des matériaux traités sauf urgence extrême',
        'Dans des conditions sèches, dégagez la zone autour du feu pour prévenir les incendies de forêt',
        'Trois feux en triangle est un signal de détresse international - ne pas utiliser à la légère'
      ],
      tips: [
        'Préparez les feux à l\'avance pour n\'avoir qu\'à les allumer en cas de besoin',
        'La fumée blanche se voit contre une forêt sombre, la fumée noire contre la neige',
        'Combinez avec des signaux au sol (pierres, rondins disposés en motif SOS)',
        'Un miroir de signalisation est plus efficace pendant la journée par temps clair'
      ]
    },
    es: {
      title: 'Crear una fogata de señalización',
      description: 'Construir un fuego optimizado para producción de humo para señalar a rescatadores. El humo es visible por kilómetros.',
      steps: [
        'Elige un lugar abierto visible desde el aire y el suelo (cima de colina, claro o playa)',
        'Construye un fuego base sustancial usando el método de tipi o cabaña de troncos',
        'Prepara ramas verdes, hojas frescas o hierba por adelantado para producción de humo',
        'Ten materiales de señalización en tres pilas separadas para tres fuegos (señal de socorro internacional)',
        'Una vez que el fuego base esté ardiendo caliente, agrega materiales verdes para crear humo blanco',
        'Para humo más oscuro, agrega caucho, materiales empapados en aceite (usar con precaución)',
        'Mantén los fuegos y estate listo para agregar materiales de humo cuando se escuche o vea una aeronave'
      ],
      warnings: [
        'Nunca dejes fuegos de señalización sin vigilancia - pueden propagarse',
        'Evita humo tóxico de plástico o materiales tratados a menos que sea emergencia extrema',
        'En condiciones secas, despeja el área alrededor del fuego para prevenir incendios forestales',
        'Tres fuegos en triángulo es señal de socorro internacional - no usar casualmente'
      ],
      tips: [
        'Prepara fuegos por adelantado para solo tener que encenderlos cuando sea necesario',
        'El humo blanco se ve contra bosque oscuro, el humo negro contra nieve',
        'Combina con señales terrestres (rocas, troncos dispuestos en patrón SOS)',
        'Un espejo de señalización es más efectivo durante el día en clima despejado'
      ]
    },
    de: {
      title: 'Ein Signalfeuer erstellen',
      description: 'Ein Feuer bauen, das für Rauchproduktion optimiert ist, um Retter zu signalisieren. Rauch ist kilometerweit sichtbar.',
      steps: [
        'Wählen Sie einen offenen Ort, der aus der Luft und vom Boden sichtbar ist (Hügelkuppe, Lichtung oder Strand)',
        'Bauen Sie ein substantielles Basisfeuer mit der Tipi- oder Blockhüttenmethode',
        'Bereiten Sie grüne Zweige, frische Blätter oder Gras im Voraus für Rauchproduktion vor',
        'Haben Sie Signalmaterialien in drei separaten Haufen für drei Feuer (internationales Notsignal)',
        'Sobald das Basisfeuer heiß brennt, fügen Sie grüne Materialien hinzu, um weißen Rauch zu erzeugen',
        'Für dunkleren Rauch fügen Sie Gummi, ölgetränkte Materialien hinzu (mit Vorsicht verwenden)',
        'Pflegen Sie Feuer und seien Sie bereit, Rauchmaterialien hinzuzufügen, wenn Flugzeuge gehört oder gesehen werden'
      ],
      warnings: [
        'Lassen Sie Signalfeuer niemals unbeaufsichtigt - sie können sich ausbreiten',
        'Vermeiden Sie giftigen Rauch von Kunststoff oder behandelten Materialien, außer bei extremem Notfall',
        'Unter trockenen Bedingungen den Bereich um das Feuer herum räumen, um Waldbrände zu verhindern',
        'Drei Feuer in einem Dreieck ist internationales Notsignal - nicht beiläufig verwenden'
      ],
      tips: [
        'Bereiten Sie Feuer im Voraus vor, sodass Sie sie nur anzünden müssen, wenn nötig',
        'Weißer Rauch zeigt sich gegen dunklen Wald, schwarzer Rauch gegen Schnee',
        'Kombinieren Sie mit Bodensignalen (Steine, Holzstämme in SOS-Muster angeordnet)',
        'Ein Signalspiegel ist tagsüber bei klarem Wetter effektiver'
      ]
    },
    it: {
      title: 'Creare un fuoco di segnalazione',
      description: 'Costruire un fuoco ottimizzato per la produzione di fumo per segnalare i soccorritori. Il fumo è visibile per chilometri.',
      steps: [
        'Scegli un luogo aperto visibile dall\'aria e dal suolo (cima di collina, radura o spiaggia)',
        'Costruisci un fuoco di base sostanziale usando il metodo tipi o capanna di tronchi',
        'Prepara rami verdi, foglie fresche o erba in anticipo per la produzione di fumo',
        'Tieni materiali di segnalazione in tre pile separate per tre fuochi (segnale di soccorso internazionale)',
        'Una volta che il fuoco di base brucia caldo, aggiungi materiali verdi per creare fumo bianco',
        'Per fumo più scuro, aggiungi gomma, materiali imbevuti di olio (usare con cautela)',
        'Mantieni i fuochi e sii pronto ad aggiungere materiali fumanti quando si sentono o vedono aeromobili'
      ],
      warnings: [
        'Non lasciare mai fuochi di segnalazione incustoditi - possono diffondersi',
        'Evita fumo tossico da plastica o materiali trattati a meno che non sia emergenza estrema',
        'In condizioni asciutte, pulisci l\'area intorno al fuoco per prevenire incendi boschivi',
        'Tre fuochi in un triangolo è segnale di soccorso internazionale - non usare casualmente'
      ],
      tips: [
        'Prepara fuochi in anticipo così devi solo accenderli quando necessario',
        'Il fumo bianco si vede contro foresta scura, il fumo nero contro neve',
        'Combina con segnali a terra (rocce, tronchi disposti in modello SOS)',
        'Uno specchio di segnalazione è più efficace durante il giorno in tempo sereno'
      ]
    }
  },
  '8': {
    en: {
      title: 'Find Water Using Vegetation',
      description: 'Locate water sources by reading the landscape and observing plant indicators when direct water sources aren\'t visible.',
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
    fr: {
      title: 'Trouver de l\'eau grâce à la végétation',
      description: 'Localiser les sources d\'eau en lisant le paysage et en observant les indicateurs végétaux quand les sources directes ne sont pas visibles.',
      steps: [
        'Cherchez la convergence des pistes animales - elles mènent souvent à l\'eau',
        'Suivez les vallées et le terrain en descente - l\'eau se collecte aux points les plus bas',
        'Observez la végétation: des plantes luxuriantes et vertes indiquent de l\'eau à proximité',
        'Cherchez des plantes aimant l\'eau: massettes, saules, peupliers, fougères et mousse',
        'Dans les régions sèches, creusez au virage extérieur des lits de ruisseaux secs',
        'La rosée matinale peut être collectée en attachant un tissu absorbant autour des chevilles et en marchant dans l\'herbe',
        'Suivez les insectes comme les abeilles et les mouches qui restent à quelques kilomètres de l\'eau'
      ],
      warnings: [
        'Toutes les sources d\'eau doivent être purifiées avant de boire',
        'L\'eau stagnante comporte un risque plus élevé de contamination',
        'Dans les déserts, l\'eau peut être profondément sous terre malgré les indicateurs de surface'
      ],
      tips: [
        'Les oiseaux volant bas et rapidement à l\'aube/crépuscule se dirigent vers l\'eau',
        'Écoutez l\'eau qui coule - le son porte bien dans la nature calme',
        'La collecte de pluie est la source d\'eau la plus sûre quand disponible',
        'La collecte de rosée fonctionne mieux dans les prairies à forte humidité'
      ]
    },
    es: {
      title: 'Encontrar agua usando vegetación',
      description: 'Localizar fuentes de agua leyendo el paisaje y observando indicadores de plantas cuando las fuentes directas no son visibles.',
      steps: [
        'Busca la convergencia de senderos de animales - a menudo llevan al agua',
        'Sigue valles y terreno cuesta abajo - el agua se reúne en los puntos más bajos',
        'Observa la vegetación: plantas verdes y exuberantes indican agua cercana',
        'Busca plantas amantes del agua: espadañas, sauces, álamos, helechos y musgo',
        'En regiones secas, cava en la curva exterior de lechos de arroyos secos',
        'El rocío matutino puede recogerse atando tela absorbente alrededor de los tobillos y caminando por la hierba',
        'Sigue insectos como abejas y moscas que permanecen a pocos kilómetros del agua'
      ],
      warnings: [
        'Todas las fuentes de agua deben purificarse antes de beber',
        'El agua estancada conlleva mayor riesgo de contaminación',
        'En desiertos, el agua puede estar profundamente bajo tierra a pesar de los indicadores de superficie'
      ],
      tips: [
        'Los pájaros volando bajo y rápido al amanecer/atardecer se dirigen al agua',
        'Escucha el agua corriente - el sonido viaja bien en la naturaleza tranquila',
        'La recolección de lluvia es la fuente de agua más segura cuando está disponible',
        'La recolección de rocío funciona mejor en praderas con alta humedad'
      ]
    },
    de: {
      title: 'Wasser mit Hilfe von Vegetation finden',
      description: 'Wasserquellen finden, indem man die Landschaft liest und Pflanzenindikatoren beobachtet, wenn direkte Wasserquellen nicht sichtbar sind.',
      steps: [
        'Suchen Sie nach Konvergenz von Tierpfaden - sie führen oft zu Wasser',
        'Folgen Sie Tälern und Gelände bergab - Wasser sammelt sich an tiefsten Punkten',
        'Beobachten Sie Vegetation: üppige, grüne Pflanzen zeigen Wasser in der Nähe an',
        'Suchen Sie nach wasserliebenden Pflanzen: Rohrkolben, Weiden, Pappeln, Farne und Moos',
        'In trockenen Regionen graben Sie an der Außenkurve trockener Bachbetten',
        'Morgentau kann gesammelt werden, indem man absorbierendes Tuch um die Knöchel bindet und durch Gras läuft',
        'Folgen Sie Insekten wie Bienen und Fliegen, die innerhalb weniger Kilometer von Wasser bleiben'
      ],
      warnings: [
        'Alle Wasserquellen müssen vor dem Trinken gereinigt werden',
        'Stehendes Wasser birgt höheres Kontaminationsrisiko',
        'In Wüsten kann Wasser trotz Oberflächenindikatoren tief unter der Erde sein'
      ],
      tips: [
        'Vögel, die bei Dämmerung niedrig und schnell fliegen, fliegen zu Wasser',
        'Hören Sie auf fließendes Wasser - Geräusche tragen gut in ruhiger Wildnis',
        'Regensammlung ist die sicherste Wasserquelle, wenn verfügbar',
        'Tausammlung funktioniert am besten in Grasland mit hoher Luftfeuchtigkeit'
      ]
    },
    it: {
      title: 'Trovare acqua usando la vegetazione',
      description: 'Localizzare fonti d\'acqua leggendo il paesaggio e osservando indicatori di piante quando le fonti dirette non sono visibili.',
      steps: [
        'Cerca la convergenza di sentieri di animali - spesso portano all\'acqua',
        'Segui valli e terreno in discesa - l\'acqua si raccoglie nei punti più bassi',
        'Osserva la vegetazione: piante rigogliose e verdi indicano acqua nelle vicinanze',
        'Cerca piante amanti dell\'acqua: tife, salici, pioppi, felci e muschio',
        'In regioni aride, scava alla curva esterna di letti di ruscelli secchi',
        'La rugiada mattutina può essere raccolta legando un panno assorbente intorno alle caviglie e camminando nell\'erba',
        'Segui insetti come api e mosche che rimangono entro pochi chilometri dall\'acqua'
      ],
      warnings: [
        'Tutte le fonti d\'acqua devono essere purificate prima di bere',
        'L\'acqua stagnante comporta un rischio più elevato di contaminazione',
        'Nei deserti, l\'acqua può essere profonda sottoterra nonostante gli indicatori di superficie'
      ],
      tips: [
        'Gli uccelli che volano bassi e veloci all\'alba/tramonto si dirigono verso l\'acqua',
        'Ascolta l\'acqua che scorre - il suono viaggia bene nella natura tranquilla',
        'La raccolta della pioggia è la fonte d\'acqua più sicura quando disponibile',
        'La raccolta della rugiada funziona meglio in praterie con alta umidità'
      ]
    }
  },
  '9': {
    en: {
      title: 'Build a Dakota Fire Hole',
      description: 'An efficient, low-visibility fire pit that uses less fuel and produces minimal smoke. Excellent for windy conditions or when concealment is needed.',
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
    fr: {
      title: 'Construire un foyer Dakota',
      description: 'Un foyer efficace et discret qui utilise moins de combustible et produit un minimum de fumée. Excellent pour les conditions venteuses.',
      steps: [
        'Creusez un trou vertical d\'environ 30 cm de profondeur et 20-25 cm de diamètre',
        'Creusez un second tunnel incliné à environ 25 cm de distance, se connectant au fond du premier trou',
        'Le tunnel doit monter en pente vers la chambre de feu pour créer un tirage',
        'Tapissez la chambre de feu avec des pierres si disponibles pour retenir la chaleur',
        'Construisez le feu dans la chambre verticale principale - le tunnel fournit l\'oxygène',
        'Cuisinez au-dessus de l\'ouverture ou utilisez des pierres plates comme surface de grill'
      ],
      warnings: [
        'Vérifiez les racines d\'arbres avant de creuser - le feu peut se propager sous terre',
        'Évitez les zones avec de la tourbe ou du sol organique sec qui peut couver',
        'Éteignez complètement et remplissez le trou avant de quitter la zone'
      ],
      tips: [
        'Cette conception est extrêmement économe en carburant grâce à un flux d\'air amélioré',
        'Presque sans fumée une fois établi, idéal pour le camping furtif',
        'Excellente protection contre le vent - fonctionne dans des conditions qui tueraient les feux de surface',
        'La chaleur rayonne du sol environnant, fournissant de la chaleur après la mort du feu'
      ]
    },
    es: {
      title: 'Construir un hoyo de fuego Dakota',
      description: 'Un pozo de fuego eficiente y de baja visibilidad que usa menos combustible y produce humo mínimo. Excelente para condiciones ventosas.',
      steps: [
        'Cava un hoyo vertical de unos 30 cm de profundidad y 20-25 cm de diámetro',
        'Cava un segundo túnel inclinado desde unos 25 cm de distancia, conectando al fondo del primer hoyo',
        'El túnel debe inclinarse hacia arriba hacia la cámara de fuego para crear corriente de aire',
        'Forra la cámara de fuego con rocas si están disponibles para retener el calor',
        'Construye fuego en la cámara vertical principal - el túnel proporciona oxígeno',
        'Cocina sobre la abertura o usa rocas planas como superficie de parrilla'
      ],
      warnings: [
        'Verifica raíces de árboles antes de cavar - el fuego puede propagarse bajo tierra',
        'Evita áreas con turba o suelo orgánico seco que puede arder sin llama',
        'Extingue completamente y rellena el hoyo antes de abandonar el área'
      ],
      tips: [
        'Este diseño es extremadamente eficiente en combustible debido al flujo de aire mejorado',
        'Casi sin humo una vez establecido, ideal para camping sigiloso',
        'Excelente protección contra el viento - funciona en condiciones que matarían fuegos de superficie',
        'El calor irradia del suelo circundante, proporcionando calidez después de que el fuego se apaga'
      ]
    },
    de: {
      title: 'Ein Dakota-Feuerloch bauen',
      description: 'Eine effiziente, unauffällige Feuerstelle, die weniger Brennstoff verbraucht und minimalen Rauch produziert. Exzellent für windige Bedingungen.',
      steps: [
        'Graben Sie ein vertikales Loch etwa 30 cm tief und 20-25 cm im Durchmesser',
        'Graben Sie einen zweiten schrägen Tunnel von etwa 25 cm Entfernung, der zum Boden des ersten Lochs führt',
        'Der Tunnel sollte zur Feuerkammer hin nach oben geneigt sein, um Zug zu erzeugen',
        'Kleiden Sie die Feuerkammer mit Steinen aus, falls verfügbar, um Wärme zu speichern',
        'Bauen Sie Feuer in der vertikalen Hauptkammer - Tunnel liefert Sauerstoff',
        'Kochen Sie über der Öffnung oder verwenden Sie flache Steine als Grillfläche'
      ],
      warnings: [
        'Überprüfen Sie Baumwurzeln vor dem Graben - Feuer kann sich unterirdisch ausbreiten',
        'Vermeiden Sie Bereiche mit Torf oder trockenem organischem Boden, der schwelen kann',
        'Vollständig löschen und Loch füllen, bevor Sie den Bereich verlassen'
      ],
      tips: [
        'Dieses Design ist durch verbesserten Luftstrom äußerst kraftstoffeffizient',
        'Fast rauchfrei, sobald etabliert, ideal für Stealth-Camping',
        'Ausgezeichneter Windschutz - funktioniert unter Bedingungen, die Oberflächenfeuer töten würden',
        'Wärme strahlt vom umgebenden Boden aus und spendet Wärme, nachdem das Feuer erloschen ist'
      ]
    },
    it: {
      title: 'Costruire un buco di fuoco Dakota',
      description: 'Una fossa di fuoco efficiente e a bassa visibilità che usa meno combustibile e produce fumo minimo. Eccellente per condizioni ventose.',
      steps: [
        'Scava un buco verticale di circa 30 cm di profondità e 20-25 cm di diametro',
        'Scava un secondo tunnel inclinato da circa 25 cm di distanza, collegando al fondo del primo buco',
        'Il tunnel dovrebbe inclinarsi verso l\'alto verso la camera di fuoco per creare corrente',
        'Rivesti la camera di fuoco con rocce se disponibili per trattenere il calore',
        'Costruisci fuoco nella camera verticale principale - il tunnel fornisce ossigeno',
        'Cucina sopra l\'apertura o usa rocce piatte come superficie di griglia'
      ],
      warnings: [
        'Controlla le radici degli alberi prima di scavare - il fuoco può diffondersi sottoterra',
        'Evita aree con torba o terreno organico secco che può covare',
        'Estingui completamente e riempi il buco prima di lasciare l\'area'
      ],
      tips: [
        'Questo design è estremamente efficiente in termini di carburante grazie al flusso d\'aria migliorato',
        'Quasi senza fumo una volta stabilito, ideale per campeggio stealth',
        'Eccellente protezione dal vento - funziona in condizioni che ucciderebbero fuochi di superficie',
        'Il calore irradia dal terreno circostante, fornendo calore dopo che il fuoco si spegne'
      ]
    }
  },
  '10': {
    en: {
      title: 'Navigate by the Stars',
      description: 'Use celestial navigation to find direction at night. The night sky provides reliable navigation tools across the globe.',
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
    fr: {
      title: 'Naviguer avec les étoiles',
      description: 'Utilisez la navigation céleste pour trouver la direction la nuit. Le ciel nocturne fournit des outils de navigation fiables.',
      steps: [
        'Dans l\'hémisphère nord: localisez la constellation de la Grande Ourse',
        'Trouvez les deux étoiles formant le bord extérieur de la "coupe"',
        'Tracez une ligne imaginaire à travers ces étoiles et prolongez-la environ 5 fois la distance',
        'Cela pointe vers Polaris (Étoile Polaire), qui marque le vrai nord',
        'Dans l\'hémisphère sud: localisez la constellation de la Croix du Sud',
        'Prolongez l\'axe long de la croix 4,5 fois sa longueur',
        'Tracez une ligne droite vers l\'horizon - cela marque le sud'
      ],
      warnings: [
        'Nécessite un ciel dégagé - la couverture nuageuse rend cette méthode impossible',
        'La pollution lumineuse dans les zones peuplées obscurcit les étoiles',
        'Apprenez les constellations avant d\'en avoir besoin en cas d\'urgence'
      ],
      tips: [
        'Polaris apparaît immobile tandis que les autres étoiles tournent autour d\'elle',
        'Les étoiles pointeuses de la Grande Ourse pointent toujours vers Polaris',
        'La ceinture d\'Orion se lève à l\'est et se couche à l\'ouest partout dans le monde',
        'Confirmez la navigation stellaire avec d\'autres méthodes si possible'
      ]
    },
    es: {
      title: 'Navegar por las estrellas',
      description: 'Usa navegación celestial para encontrar dirección por la noche. El cielo nocturno proporciona herramientas de navegación confiables.',
      steps: [
        'En el hemisferio norte: localiza la constelación de la Osa Mayor',
        'Encuentra las dos estrellas que forman el borde exterior de la "copa"',
        'Traza una línea imaginaria a través de estas estrellas y extiéndela aproximadamente 5 veces la distancia',
        'Esto apunta a Polaris (Estrella Polar), que marca el norte verdadero',
        'En el hemisferio sur: localiza la constelación de la Cruz del Sur',
        'Extiende el eje largo de la cruz 4,5 veces su longitud',
        'Traza una línea recta hacia el horizonte - esto marca el sur'
      ],
      warnings: [
        'Requiere cielos despejados - la cobertura de nubes hace imposible este método',
        'La contaminación lumínica en áreas pobladas oscurece las estrellas',
        'Aprende las constelaciones antes de necesitarlas en una emergencia'
      ],
      tips: [
        'Polaris parece estacionaria mientras otras estrellas rotan a su alrededor',
        'Las estrellas apuntadoras de la Osa Mayor siempre apuntan a Polaris',
        'El cinturón de Orión sale por el este y se pone por el oeste en todo el mundo',
        'Confirma la navegación estelar con otros métodos cuando sea posible'
      ]
    },
    de: {
      title: 'Navigation mit den Sternen',
      description: 'Verwenden Sie himmlische Navigation, um nachts die Richtung zu finden. Der Nachthimmel bietet zuverlässige Navigationswerkzeuge.',
      steps: [
        'Auf der Nordhalbkugel: lokalisieren Sie das Sternbild Großer Wagen',
        'Finden Sie die zwei Sterne, die den äußeren Rand der "Schüssel" bilden',
        'Zeichnen Sie eine imaginäre Linie durch diese Sterne und verlängern Sie sie etwa 5-mal die Entfernung',
        'Dies zeigt auf Polaris (Nordstern), der wahren Norden markiert',
        'Auf der Südhalbkugel: lokalisieren Sie das Sternbild Kreuz des Südens',
        'Verlängern Sie die lange Achse des Kreuzes 4,5-mal seine Länge',
        'Ziehen Sie eine gerade Linie zum Horizont - dies markiert Süden'
      ],
      warnings: [
        'Erfordert klaren Himmel - Wolkendecke macht diese Methode unmöglich',
        'Lichtverschmutzung in besiedelten Gebieten verdeckt Sterne',
        'Lernen Sie Sternbilder, bevor Sie sie im Notfall benötigen'
      ],
      tips: [
        'Polaris erscheint stationär, während andere Sterne sich darum drehen',
        'Die Zeigersterne des Großen Wagens zeigen immer auf Polaris',
        'Orions Gürtel geht im Osten auf und im Westen unter, weltweit',
        'Bestätigen Sie Sternnavigation mit anderen Methoden, wenn möglich'
      ]
    },
    it: {
      title: 'Navigare con le stelle',
      description: 'Usa la navigazione celeste per trovare la direzione di notte. Il cielo notturno fornisce strumenti di navigazione affidabili.',
      steps: [
        'Nell\'emisfero nord: localizza la costellazione dell\'Orsa Maggiore',
        'Trova le due stelle che formano il bordo esterno della "coppa"',
        'Traccia una linea immaginaria attraverso queste stelle ed estendila circa 5 volte la distanza',
        'Questo punta a Polaris (Stella Polare), che segna il vero nord',
        'Nell\'emisfero sud: localizza la costellazione della Croce del Sud',
        'Estendi l\'asse lungo della croce 4,5 volte la sua lunghezza',
        'Traccia una linea dritta verso l\'orizzonte - questo segna il sud'
      ],
      warnings: [
        'Richiede cieli sereni - la copertura nuvolosa rende impossibile questo metodo',
        'L\'inquinamento luminoso nelle aree popolate oscura le stelle',
        'Impara le costellazioni prima di averne bisogno in un\'emergenza'
      ],
      tips: [
        'Polaris appare stazionaria mentre altre stelle ruotano attorno ad essa',
        'Le stelle puntatori dell\'Orsa Maggiore puntano sempre a Polaris',
        'La cintura di Orione sorge ad est e tramonta ad ovest in tutto il mondo',
        'Conferma la navigazione stellare con altri metodi quando possibile'
      ]
    }
  },
  '11': {
    en: {
      title: 'Improvise Cordage from Plants',
      description: 'Create strong rope from natural plant fibers for shelters, traps, and tools. This fundamental skill multiplies your capabilities.',
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
    fr: {
      title: 'Improviser de la corde à partir de plantes',
      description: 'Créer une corde solide à partir de fibres végétales naturelles pour abris, pièges et outils. Cette compétence fondamentale multiplie vos capacités.',
      steps: [
        'Identifiez les plantes appropriées: ortie, asclépiade, yucca, écorce de tilleul ou feuilles de quenouille',
        'Récoltez de longues fibres et laissez sécher si possible (ou utilisez fraîches en urgence)',
        'Dépouillez les fibres du matériau végétal et séparez en brins minces',
        'Prenez deux faisceaux de fibres, tordez chacun dans le sens horaire',
        'Enroulez les deux faisceaux tordus l\'un autour de l\'autre dans le sens antihoraire',
        'Lorsque vous approchez de la fin des fibres, épissez de nouveau matériau en chevauchant et continuant à tordre',
        'Les torsions opposées créent une tension qui maintient la corde ensemble'
      ],
      warnings: [
        'Certaines plantes comme l\'ortie causent une irritation cutanée - portez des gants si disponibles',
        'La corde humide est plus forte mais rétrécira en séchant',
        'Les matériaux verts sont plus faciles à travailler mais les fibres séchées sont généralement plus fortes'
      ],
      tips: [
        'La technique d\'enroulement inversé (tordre dans le sens horaire, enrouler dans le sens antihoraire) est essentielle',
        'Des fibres plus longues font une corde plus forte avec moins de points d\'épissage',
        'L\'écorce intérieure des arbres morts fournit souvent des fibres prêtes à l\'emploi',
        'Pratiquez cette compétence à la maison - c\'est difficile à apprendre sous stress'
      ]
    },
    es: {
      title: 'Improvisar cordaje de plantas',
      description: 'Crear cuerda fuerte de fibras vegetales naturales para refugios, trampas y herramientas. Esta habilidad fundamental multiplica tus capacidades.',
      steps: [
        'Identifica plantas adecuadas: ortiga, algodoncillo, yuca, corteza de tilo o hojas de espadaña',
        'Cosecha fibras largas y deja secar si es posible (o usa frescas en emergencia)',
        'Despoja fibras del material vegetal y separa en hebras delgadas',
        'Toma dos manojos de fibra, tuerce cada uno en sentido horario',
        'Envuelve los dos manojos retorcidos alrededor uno del otro en sentido antihorario',
        'Al acercarte al final de las fibras, empalma nuevo material superponiendo y continuando el giro',
        'Los giros opuestos crean tensión que mantiene el cordaje unido'
      ],
      warnings: [
        'Algunas plantas como la ortiga causan irritación de la piel - usa guantes si están disponibles',
        'El cordaje mojado es más fuerte pero se encogerá al secarse',
        'Los materiales verdes son más fáciles de trabajar pero las fibras secas son generalmente más fuertes'
      ],
      tips: [
        'La técnica de envoltura inversa (girar en sentido horario, envolver en sentido antihorario) es clave',
        'Las fibras más largas hacen cordaje más fuerte con menos puntos de empalme',
        'La corteza interior de árboles muertos a menudo proporciona fibra lista para usar',
        'Practica esta habilidad en casa - es difícil de aprender bajo estrés'
      ]
    },
    de: {
      title: 'Schnur aus Pflanzen improvisieren',
      description: 'Starkes Seil aus natürlichen Pflanzenfasern für Unterkünfte, Fallen und Werkzeuge herstellen. Diese grundlegende Fähigkeit vervielfacht Ihre Fähigkeiten.',
      steps: [
        'Geeignete Pflanzen identifizieren: Brennnessel, Seidenpflanze, Yucca, Lindenrinde oder Rohrkolbenblätter',
        'Lange Fasern ernten und wenn möglich trocknen lassen (oder frisch im Notfall verwenden)',
        'Fasern vom Pflanzenmaterial abstreifen und in dünne Stränge trennen',
        'Nehmen Sie zwei Faserbündel, drehen Sie jedes im Uhrzeigersinn',
        'Wickeln Sie die zwei gedrehten Bündel umeinander gegen den Uhrzeigersinn',
        'Wenn Sie dem Ende der Fasern nahe kommen, spleißen Sie neues Material ein, indem Sie überlappen und weiterdrehen',
        'Die entgegengesetzten Drehungen erzeugen Spannung, die die Schnur zusammenhält'
      ],
      warnings: [
        'Einige Pflanzen wie Brennnessel verursachen Hautreizungen - tragen Sie Handschuhe, falls verfügbar',
        'Nasse Schnur ist stärker, schrumpft aber beim Trocknen',
        'Grüne Materialien sind leichter zu verarbeiten, aber getrocknete Fasern sind im Allgemeinen stärker'
      ],
      tips: [
        'Die Umkehrwickeltechnik (im Uhrzeigersinn drehen, gegen den Uhrzeigersinn wickeln) ist entscheidend',
        'Längere Fasern machen stärkere Schnur mit weniger Spleißpunkten',
        'Innere Rinde toter Bäume bietet oft gebrauchsfertige Faser',
        'Üben Sie diese Fähigkeit zu Hause - es ist schwierig, unter Stress zu lernen'
      ]
    },
    it: {
      title: 'Improvvisare cordame da piante',
      description: 'Creare corda forte da fibre vegetali naturali per rifugi, trappole e strumenti. Questa abilità fondamentale moltiplica le tue capacità.',
      steps: [
        'Identifica piante adatte: ortica, asclepiade, yucca, corteccia di tiglio o foglie di tifa',
        'Raccogli fibre lunghe e lascia asciugare se possibile (o usa fresche in emergenza)',
        'Stacca le fibre dal materiale vegetale e separa in fili sottili',
        'Prendi due fasci di fibre, torci ciascuno in senso orario',
        'Avvolgi i due fasci torti l\'uno attorno all\'altro in senso antiorario',
        'Mentre ti avvicini alla fine delle fibre, innesta nuovo materiale sovrapponendo e continuando a torcere',
        'Le torsioni opposte creano tensione che tiene insieme il cordame'
      ],
      warnings: [
        'Alcune piante come l\'ortica causano irritazione cutanea - indossa guanti se disponibili',
        'Il cordame bagnato è più forte ma si restringerà quando si asciuga',
        'I materiali verdi sono più facili da lavorare ma le fibre secche sono generalmente più forti'
      ],
      tips: [
        'La tecnica di avvolgimento inverso (torcere in senso orario, avvolgere in senso antiorario) è fondamentale',
        'Le fibre più lunghe rendono il cordame più forte con meno punti di innesto',
        'La corteccia interna di alberi morti spesso fornisce fibre pronte all\'uso',
        'Pratica questa abilità a casa - è difficile imparare sotto stress'
      ]
    }
  },
  '12': {
    en: {
      title: 'Set a Simple Snare Trap',
      description: 'Construct a basic snare to catch small game. Passive trapping conserves energy while increasing food procurement chances.',
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
    },
    fr: {
      title: 'Installer un piège à collet simple',
      description: 'Construire un collet de base pour attraper du petit gibier. Le piégeage passif conserve l\'énergie tout en augmentant les chances de nourriture.',
      steps: [
        'Identifiez les pistes de gibier actives en cherchant des traces, des excréments et des sentiers usés',
        'Créez un nœud coulant à partir de fil métallique ou de corde solide avec un nœud coulissant',
        'Dimensionnez le nœud de manière appropriée: 5 cm pour les écureuils, 10 cm pour les lapins',
        'Positionnez le nœud à environ une largeur de main au-dessus du sentier',
        'Utilisez un entonnoir naturel: placez des bâtons pour guider l\'animal à travers le nœud',
        'Sécurisez l\'extrémité mobile à un arbre ou piquet fermement ancré dans le sol',
        'Vérifiez les collets matin et soir - ne les laissez jamais indéfiniment'
      ],
      warnings: [
        'Le piégeage peut être illégal dans de nombreuses régions - connaissez les lois locales',
        'À utiliser uniquement dans de véritables situations de survie',
        'Abattez rapidement et humainement les animaux capturés',
        'Ne jamais installer et oublier - vérifiez régulièrement les pièges pour éviter la souffrance'
      ],
      tips: [
        'Installez plusieurs collets pour augmenter les chances - 10+ est raisonnable',
        'Éliminez l\'odeur humaine en frottant le collet avec de la végétation locale',
        'Placez sur les trajets entre les zones de repos et d\'alimentation',
        'Les collets à ressort (avec jeune arbre courbé) sont plus efficaces mais complexes'
      ]
    },
    es: {
      title: 'Instalar una trampa de lazo simple',
      description: 'Construir un lazo básico para atrapar animales pequeños. El trampeo pasivo conserva energía mientras aumenta las posibilidades de comida.',
      steps: [
        'Identifica senderos de caza activos buscando huellas, excrementos y caminos desgastados',
        'Crea un lazo de alambre o cordaje fuerte con nudo corredizo',
        'Dimensiona el lazo apropiadamente: 5 cm para ardillas, 10 cm para conejos',
        'Posiciona el lazo aproximadamente a un ancho de mano sobre el sendero',
        'Usa embudo natural: coloca palos para guiar al animal a través del lazo',
        'Asegura el extremo móvil a un árbol o estaca firmemente anclada en el suelo',
        'Revisa los lazos mañana y tarde - nunca los dejes indefinidamente'
      ],
      warnings: [
        'Atrapar puede ser ilegal en muchas áreas - conoce las leyes locales',
        'Solo usar en situaciones genuinas de supervivencia',
        'Despacha los animales capturados rápida y humanamente',
        'Nunca instalar y olvidar - revisa las trampas regularmente para evitar sufrimiento'
      ],
      tips: [
        'Instala múltiples lazos para aumentar posibilidades - 10+ es razonable',
        'Elimina el olor humano frotando el lazo con vegetación local',
        'Coloca en recorridos entre áreas de descanso y alimentación',
        'Los lazos de resorte (con árbol joven doblado) son más efectivos pero complejos'
      ]
    },
    de: {
      title: 'Eine einfache Schlinge aufstellen',
      description: 'Eine grundlegende Schlinge zum Fangen von Kleinwild konstruieren. Passives Fallen konserviert Energie und erhöht Nahrungsbeschaffungschancen.',
      steps: [
        'Identifizieren Sie aktive Wildpfade, indem Sie nach Spuren, Kot und abgenutzten Pfaden suchen',
        'Erstellen Sie eine Schlinge aus Draht oder starker Schnur mit Schlaufenknoten',
        'Dimensionieren Sie die Schlinge angemessen: 5 cm für Eichhörnchen, 10 cm für Kaninchen',
        'Positionieren Sie die Schlinge etwa eine Handbreite über dem Pfad',
        'Verwenden Sie natürliche Trichter: platzieren Sie Stöcke, um Tiere durch die Schlinge zu leiten',
        'Sichern Sie das laufende Ende an einem Baum oder fest im Boden verankerten Pfahl',
        'Überprüfen Sie Schlingen morgens und abends - lassen Sie sie niemals unbestimmt'
      ],
      warnings: [
        'Fallenstellen kann in vielen Gebieten illegal sein - kennen Sie die örtlichen Gesetze',
        'Nur in echten Überlebenssituationen verwenden',
        'Töten Sie gefangene Tiere schnell und human',
        'Niemals aufstellen und vergessen - überprüfen Sie Fallen regelmäßig, um Leiden zu verhindern'
      ],
      tips: [
        'Stellen Sie mehrere Schlingen auf, um Chancen zu erhöhen - 10+ ist vernünftig',
        'Entfernen Sie menschlichen Geruch, indem Sie die Schlinge mit lokaler Vegetation reiben',
        'Platzieren Sie auf Wegen zwischen Ruhe- und Futterplätzen',
        'Federschlingen (mit gebogenem Setzling) sind effektiver, aber komplex'
      ]
    },
    it: {
      title: 'Installare una trappola a laccio semplice',
      description: 'Costruire un laccio base per catturare selvaggina piccola. L\'intrappolamento passivo conserva energia aumentando le possibilità di cibo.',
      steps: [
        'Identifica sentieri di caccia attivi cercando tracce, escrementi e percorsi consumati',
        'Crea un laccio da filo metallico o cordame forte con nodo scorsoio',
        'Dimensiona il laccio appropriatamente: 5 cm per scoiattoli, 10 cm per conigli',
        'Posiziona il laccio circa una larghezza di mano sopra il sentiero',
        'Usa imbuto naturale: posiziona bastoni per guidare l\'animale attraverso il laccio',
        'Fissa l\'estremità mobile a un albero o palo fermamente ancorato nel terreno',
        'Controlla i lacci mattina e sera - non lasciare mai indefinitamente'
      ],
      warnings: [
        'Intrappolare può essere illegale in molte aree - conosci le leggi locali',
        'Usa solo in genuine situazioni di sopravvivenza',
        'Uccidi gli animali catturati rapidamente e umanamente',
        'Mai installare e dimenticare - controlla le trappole regolarmente per prevenire sofferenza'
      ],
      tips: [
        'Installa più lacci per aumentare le possibilità - 10+ è ragionevole',
        'Rimuovi l\'odore umano strofinando il laccio con vegetazione locale',
        'Posiziona su percorsi tra aree di riposo e alimentazione',
        'I lacci a molla (con alberello piegato) sono più efficaci ma complessi'
      ]
    }
  }
};
