export interface GlossaryEntry {
  id: string; // Unique URL slug and anchor ID
  termEn: string; // Primary English / phonetic romanization
  termBo: string; // Tibetan script in canonical Uchen
  wylie: string; // Accurate EWTS / Wylie transliteration
  termSkt?: string; // Sanskrit with IAST diacritics
  category: "philosophy" | "kalachakra" | "practice" | "monastic" | "lineage";
  shortDef: string; // 1-2 sentence concise definition for inline hover popover
  fullDef: string; // Rigorous, comprehensive explanation for the glossary page
  aliases?: string[]; // Alternate spellings, synonyms, translations
  relatedIds?: string[]; // IDs of related terms for cross-referencing
}

export const GLOSSARY_CATEGORIES = [
  { id: "all", labelEn: "All Terms", labelBo: "ཚང་མ།" },
  { id: "philosophy", labelEn: "Philosophy & Views", labelBo: "གཞུང་ལུགས།" },
  { id: "kalachakra", labelEn: "Kālacakra Tantra", labelBo: "དུས་འཁོར།" },
  { id: "practice", labelEn: "Meditation & Practice", labelBo: "ཉམས་ལེན།" },
  { id: "monastic", labelEn: "Monastic Life & Lore", labelBo: "དགོན་སྡེའི་ལམ་ལུགས།" },
  { id: "lineage", labelEn: "Lineage & History", labelBo: "བརྒྱུད་པའི་ལོ་རྒྱུས།" },
] as const;

export type GlossaryCategoryId = (typeof GLOSSARY_CATEGORIES)[number]["id"];

export const GLOSSARY_ENTRIES: GlossaryEntry[] = [
  {
    id: "shentong",
    termEn: "Shentong (Other-Emptiness)",
    termBo: "གཞན་སྟོང་།",
    wylie: "gzhan stong",
    termSkt: "Paratantra-śūnyatā / Parasūnya",
    category: "philosophy",
    shortDef:
      "The foundational Jonang philosophical view stating that the luminous ultimate nature of awareness is empty of adventitious defilements, but not empty of its own primordially enlightened qualities.",
    fullDef:
      "Shentong ('other-emptiness') is the distinctive hermeneutical view formulated and championed by the Jonang master Dölpopa Sherab Gyaltsen (1292–1361). In contrast to Rangtong ('self-emptiness'), which emphasizes that all phenomena are empty of self-nature (svabhāva), Shentong distinguishes between conventional and ultimate reality. Conventional, conditioned phenomena (relative truth) are empty of their own nature. However, the ultimate nature—luminous awareness, Dharmadhātu, and Buddha-nature (Tathāgatagarbha)—is unconditioned, unchanging, and permanent, empty only of extraneous, adventitious defilements (kleśa) that temporarily obscure it.",
    aliases: ["Zhentong", "Other-Emptiness", "Extrinsic Emptiness", "gzhan stong"],
    relatedIds: ["rangtong", "tathagatagarbha", "dharmadhatu", "dolpopa", "three-turnings"],
  },
  {
    id: "rangtong",
    termEn: "Rangtong (Self-Emptiness)",
    termBo: "རང་སྟོང་།",
    wylie: "rang stong",
    termSkt: "Svabhāva-śūnyatā",
    category: "philosophy",
    shortDef:
      "The philosophical view holding that all phenomena, including the ultimate, are devoid of inherent, independent existence (svabhāva).",
    fullDef:
      "Rangtong ('self-emptiness') holds that all phenomena without exception—both conventional truths and the ultimate truth—are entirely empty of any inherent, intrinsic reality (svabhāva). In Tibetan scholastic debate, Shentong masters do not reject Rangtong, but rather maintain that Rangtong perfectly describes the relative, conditioned realm of dependent origination taught in the Second Turning of the Dharma Wheel, while Shentong represents the definitive realization of the Third Turning.",
    aliases: ["Self-Emptiness", "Intrinsic Emptiness", "rang stong"],
    relatedIds: ["shentong", "three-turnings", "madhyamaka"],
  },
  {
    id: "tathagatagarbha",
    termEn: "Tathāgatagarbha (Buddha-Nature)",
    termBo: "བདེ་བར་གཤེགས་པའི་སྙིང་པོ།",
    wylie: "bde bar gshegs pa'i snying po",
    termSkt: "Tathāgatagarbha",
    category: "philosophy",
    shortDef:
      "The primordial, uncompounded potential for enlightenment inherent within all sentient beings, inseparable from ultimate wisdom.",
    fullDef:
      "Tathāgatagarbha, literally the 'embryo or matrix of the Thus-Gone One' (Buddha), is the luminous core of enlightened awareness present in all living beings. In the Jonang Shentong tradition, as articulated in the Uttaratantraśāstra (Ratnagotravibhāga), Buddha-nature is not merely a metaphor or a seed to be manufactured, but the actual, fully endowed ultimate reality of wisdom and compassion obscured only by adventitious delusions.",
    aliases: ["Buddha-Nature", "Sugatagarbha", "Matrix of Enlightenment"],
    relatedIds: ["shentong", "dharmadhatu", "rangrik"],
  },
  {
    id: "kalachakra",
    termEn: "Kālacakra (Wheel of Time)",
    termBo: "དུས་ཀྱི་འཁོར་ལོ།",
    wylie: "dus kyi 'khor lo",
    termSkt: "Kālacakra",
    category: "kalachakra",
    shortDef:
      "The highest Anuttarayoga Tantra system encompassing Outer cycles (cosmology), Inner cycles (subtle body), and Alternative cycles (meditative transformation into supreme bliss and emptiness).",
    fullDef:
      "Kālacakra ('Wheel of Time') is the supreme tantric matrix and the crowning jewel of the Jonang lineage. It synthesizes three interdependent realms: the Outer Kālacakra (the macrocosm, celestial motions, and astrology), the Inner Kālacakra (the human microcosm, subtle channels [nāḍī], winds [prāṇa], and drops [bindu]), and the Alternative Kālacakra (the mandalas, initiations, and meditation stages that purify body and mind into the indestructible union of great bliss and empty form).",
    aliases: ["Wheel of Time", "Kalachakra Tantra", "dus 'khor"],
    relatedIds: ["six-branch-yoga", "dzogrim", "kyerim", "shambhala", "dro-lineage"],
  },
  {
    id: "six-branch-yoga",
    termEn: "Six-Branch Yoga (Ṣaḍaṅgayoga)",
    termBo: "སྦྱོར་བ་ཡན་ལག་དྲུག",
    wylie: "sbyor ba yan lag drug",
    termSkt: "Ṣaḍaṅgayoga",
    category: "kalachakra",
    shortDef:
      "The distinctive completion stage (dzogrim) of the Kālacakra Tantra, consisting of six progressive meditative yogas that awaken primordial wisdom.",
    fullDef:
      "The Six-Branch Yoga (Ṣaḍaṅgayoga) forms the core contemplative praxis preserved unbroken in the Jonang tradition. The six stages are: 1) Withdrawal (pratyāhāra / sor sdud), 2) Meditative Absorption (dhyāna / bsam gtan), 3) Breath Control (prāṇāyāma / srog rtsol), 4) Retention (dhāraṇā / 'dzin pa), 5) Recollection (anusmṛti / rjes dran), and 6) Meditative Concentration (samādhi / ting nge 'dzin). Through these branches, the meditator binds the karmic winds into the central channel, giving rise to empty forms and unchanging great bliss.",
    aliases: ["Six Yogas of Kalachakra", "Sixfold Yoga", "Sadangayoga"],
    relatedIds: ["kalachakra", "dzogrim", "prana", "nadi", "bindu"],
  },
  {
    id: "dharmadhatu",
    termEn: "Dharmadhātu (Expanse of Reality)",
    termBo: "ཆོས་ཀྱི་དབྱིངས།",
    wylie: "chos kyi dbyings",
    termSkt: "Dharmadhātu",
    category: "philosophy",
    shortDef:
      "The unconditioned ground and basic expanse of ultimate reality, free from conceptual elaboration and birth or cessation.",
    fullDef:
      "Dharmadhātu refers to the true nature of phenomena, the ultimate reality in which all things abide beyond birth, death, and conceptual duality. In Jonang thought, the Dharmadhātu is not a barren nothingness or conceptual negation, but the luminous, intrinsically pure expanse inseparable from wisdom (jñāna) and Buddha-nature.",
    aliases: ["Expanse of Reality", "Realm of Dharma", "Absolute Reality"],
    relatedIds: ["shentong", "tathagatagarbha"],
  },
  {
    id: "three-turnings",
    termEn: "Three Turnings of the Dharma Wheel",
    termBo: "ཆོས་འཁོར་རིམ་པ་གསུམ།",
    wylie: "chos 'khor rim pa gsum",
    termSkt: "Tridharmacakrapravartana",
    category: "philosophy",
    shortDef:
      "The three progressive historical and hermeneutical phases of Buddha Śākyamuni's teachings, from the Four Noble Truths to the definitive ultimate reality of the Third Turning.",
    fullDef:
      "As set forth in the Saṃdhinirmocanasūtra, the Buddha turned the Wheel of Dharma three times: 1) The First Turning at Vārāṇasī taught the Four Noble Truths and impermanence for early disciples; 2) The Second Turning at Rājagṛha taught universal emptiness (Prajñāpāramitā); 3) The Third Turning at Vaiśālī and Mount Malaya revealed the definitive (nītārtha) ultimate reality of luminous awareness, Buddha-nature, and unconditioned wisdom. Jonang regards the Third Turning as the ultimate definitive teaching.",
    aliases: ["Three Turnings", "Three Cycles of Teachings"],
    relatedIds: ["shentong", "rangtong", "tathagatagarbha"],
  },
  {
    id: "kyerim",
    termEn: "Kyerim (Generation Stage)",
    termBo: "བསྐྱེད་རིམ།",
    wylie: "bskyed rim",
    termSkt: "Utpattikrama",
    category: "practice",
    shortDef:
      "The first main stage of Highest Yoga Tantra involving the visualization of the deity, divine retinue, and sacred palace to transform ordinary perception.",
    fullDef:
      "Kyerim (Generation or Development Stage) is the meditative process of systematically constructing the visualization of oneself as the meditational deity (yidam) inside the sacred mandala palace. This practice purifies ordinary grasping at mundane birth, death, and intermediate states (bardo), training the mind in divine pride and clarity prior to entering the formless energetic yogas of the completion stage.",
    aliases: ["Generation Stage", "Development Stage", "Creation Stage"],
    relatedIds: ["dzogrim", "kalachakra", "six-branch-yoga"],
  },
  {
    id: "dzogrim",
    termEn: "Dzogrim (Completion Stage)",
    termBo: "རྫོགས་རིམ།",
    wylie: "rdzogs rim",
    termSkt: "Niṣpannakrama / Sampannakrama",
    category: "practice",
    shortDef:
      "The advanced stage of tantric meditation working directly with the subtle energetic body (winds, channels, and drops) to actualize primordial wisdom.",
    fullDef:
      "Dzogrim (Completion or Perfection Stage) is the direct, non-conceptual culmination of Vajrayāna praxis. In the Kālacakra tradition, this takes the form of the Six-Branch Yoga, where meditation shifts from conceptual visualization to internal energetic mastery—drawing the karmic winds (prāṇa) into the central channel (avadhūti) to ignite inner heat (caṇḍālī/tummo) and realize supreme, unshakeable bliss and emptiness.",
    aliases: ["Completion Stage", "Perfection Stage", "Dissolution Stage"],
    relatedIds: ["kyerim", "six-branch-yoga", "kalachakra", "nadi", "prana", "bindu"],
  },
  {
    id: "rangrik",
    termEn: "Rangrik (Self-Awareness / Self-Cognition)",
    termBo: "རང་རིག",
    wylie: "rang rig",
    termSkt: "Svasaṃvedana / Svasaṃvitti",
    category: "philosophy",
    shortDef:
      "The reflexive, non-dual capacity of pristine awareness to know itself directly without needing a subject-object dichotomy.",
    fullDef:
      "Rangrik (Self-cognition or reflexive awareness) is consciousness's inherent ability to illuminate and know itself immediately, without being split into an external subject observing an object. While critically analyzed in Prāsaṅgika Madhyamaka, Jonang and Yogācāra scholars affirm that on the ultimate level, the luminous nature of primordial mind is inherently self-illuminating and self-aware.",
    aliases: ["Self-cognition", "Reflexive Awareness", "Svasamvedana"],
    relatedIds: ["shentong", "tathagatagarbha", "dharmadhatu"],
  },
  {
    id: "kunzhi",
    termEn: "Künzhi (All-Ground Consciousness)",
    termBo: "ཀུན་གཞི།",
    wylie: "kun gzhi",
    termSkt: "Ālayavijñāna",
    category: "philosophy",
    shortDef:
      "The foundational storehouse consciousness that holds the karmic seeds of all conditioned experience, distinct from the primordial ultimate wisdom ground.",
    fullDef:
      "In Buddhist psychology and Yogācāra philosophy, the Ālayavijñāna (Künzhi) is the eighth consciousness—the repository where latent karmic impressions (vāsanā) are stored and ripen into ordinary dualistic perceptions. In Dölpopa's Shentong writings, a crucial distinction is made between the conditioned, defiled all-ground (kun gzhi rnam shes) and the primordial, unconditioned wisdom-ground (ye shes kyi kun gzhi) which is identical with Buddha-nature.",
    aliases: ["Alaya", "Storehouse Consciousness", "All-Ground"],
    relatedIds: ["shentong", "tathagatagarbha"],
  },
  {
    id: "nadi",
    termEn: "Nāḍī (Subtle Channels)",
    termBo: "རྩ།",
    wylie: "rtsa",
    termSkt: "Nāḍī",
    category: "kalachakra",
    shortDef:
      "The subtle pathways within the human body through which vital winds (prāṇa) and creative drops (bindu) circulate.",
    fullDef:
      "In Buddhist tantric physiology, nāḍīs are the internal subtle energetic pathways. The system centers around three primary channels: the central channel (avadhūti / dbu ma), flanked by the left lunar channel (lalanā / rkyang ma) and right solar channel (rasanā / ro ma), intersecting at various wheels or centers (cakras). Kālacakra yoga directs all turbulent energy into the central channel.",
    aliases: ["Subtle Channels", "Energy Channels", "rtsa"],
    relatedIds: ["prana", "bindu", "kalachakra", "six-branch-yoga"],
  },
  {
    id: "prana",
    termEn: "Prāṇa (Vital Winds)",
    termBo: "རླུང་།",
    wylie: "rlung",
    termSkt: "Prāṇa / Vāyu",
    category: "kalachakra",
    shortDef:
      "The subtle energetic currents and breath that animate consciousness, mental movements, and physiological life.",
    fullDef:
      "Prāṇa (Tibetan: rlung) is the vital wind or subtle life energy. Mind and prāṇa are regarded as rider and horse: erratic mental chatter is driven by karmic winds (las kyi rlung). Through the breath-control branch (prāṇāyāma) of the Six-Branch Yoga, these dispersed winds are gathered and dissolved into the wisdom wind (ye shes kyi rlung) within the central channel.",
    aliases: ["Vital Winds", "Wind Energies", "rlung", "Vayu"],
    relatedIds: ["nadi", "bindu", "six-branch-yoga", "kalachakra"],
  },
  {
    id: "bindu",
    termEn: "Bindu (Subtle Drops)",
    termBo: "ཐིག་ལེ།",
    wylie: "thig le",
    termSkt: "Bindu",
    category: "kalachakra",
    shortDef:
      "The subtle quintessential essences stored within the bodily cakras that support physical vitality and the experience of transcendent bliss.",
    fullDef:
      "Bindus (Tibetan: thig le) are the subtle drops or essences located in the energy centers of the subtle body, categorized into white bodhicitta (lunar/cooling) and red bodhicitta (solar/warming). In advanced Kālacakra meditation, the melting and immobilization of these drops at the crown and other cakras generates the 21,600 moments of unchanging great bliss.",
    aliases: ["Subtle Drops", "Drops of Essence", "thig le"],
    relatedIds: ["nadi", "prana", "kalachakra", "six-branch-yoga"],
  },
  {
    id: "shambhala",
    termEn: "Shambhala",
    termBo: "ཤambhala / ཤམ་བྷ་ལ།",
    wylie: "sham bha la",
    termSkt: "Śambhala",
    category: "kalachakra",
    shortDef:
      "The legendary northern realm of enlightened kings where the Kālacakra Tantra was originally preserved, practiced, and propagated.",
    fullDef:
      "According to tradition, King Sucandra of Shambhala requested the Kālacakra Tantra from Buddha Śākyamuni at the Dhānyakaṭaka Stūpa in South India. Sucandra returned to Shambhala to write down and practice the root tantra. Ruled by seven Dharma Kings and twenty-five Kalki rulers (Kulika), Shambhala is described both as a sacred geographic pure land and an inner state of spiritual realization.",
    aliases: ["Realm of Shambhala", "Pure Land of Shambhala"],
    relatedIds: ["kalachakra", "dro-lineage", "ra-lineage"],
  },
  {
    id: "dro-lineage",
    termEn: "Dro Lineage (Dro-luk)",
    termBo: "འབྲོ་ལུགས།",
    wylie: "'bro lugs",
    category: "lineage",
    shortDef:
      "The primary transmission lineage of the Kālacakra Tantra in Tibet, founded by translator Dro Lotsāwa Sherab Drak and preserved completely by the Jonang school.",
    fullDef:
      "The Dro Lineage ('bro lugs) was established in Tibet by the Kashmiri master Somanātha and the great Tibetan translator Dro Lotsāwa Sherab Drak (11th century). It emphasizes the practice tradition of the Six-Branch Yoga and profound philosophical commentaries. While the rival Ra Lineage (rwa lugs) focused heavily on ritual recitation, the Dro Lineage became the primary meditative lineage of the Jonang order.",
    aliases: ["Dro Tradition", "'bro lugs", "Dro Lotsawa Lineage"],
    relatedIds: ["ra-lineage", "kalachakra", "dolpopa"],
  },
  {
    id: "ra-lineage",
    termEn: "Ra Lineage (Ra-luk)",
    termBo: "རྭ་ལུགས།",
    wylie: "rwa lugs",
    category: "lineage",
    shortDef:
      "The historical sister lineage of Kālacakra in Tibet, initiated by Ra Lotsāwa Dorje Drak and Nepalese master Samantaśrī.",
    fullDef:
      "The Ra Lineage (rwa lugs) is one of the two major historical streams of the Kālacakra Tantra in Tibet, brought from Nepal by Ra Lotsāwa Dorje Drak. In contrast to the Dro tradition which emphasizes internal meditative realization and the Six-Branch Yoga, the Ra tradition is noted for its extensive ritual manuals and protective wrathful rites. Jonang masters studied both, but anchored their practice in the Dro lineage.",
    aliases: ["Ra Tradition", "rwa lugs", "Ra Lotsawa Lineage"],
    relatedIds: ["dro-lineage", "kalachakra"],
  },
  {
    id: "dolpopa",
    termEn: "Dölpopa Sherab Gyaltsen",
    termBo: "དོལ་པོ་པ་ཤེས་རབ་རྒྱལ་མཚན།",
    wylie: "dol po pa shes rab rgyal mtshan",
    category: "lineage",
    shortDef:
      "The peerless 14th-century Jonang master known as 'The Buddha from Dölpo,' who systematically articulated the Shentong philosophy and built the Great Jonang Stūpa.",
    fullDef:
      "Dölpopa Sherab Gyaltsen (1292–1361) was the pivotal luminary of the Jonang tradition. After extensive study across all Tibetan traditions, he arrived at Jonang and experienced a transformative breakthrough while practicing the Six-Branch Yoga. He authored the monumental 'Mountain Dharma: Ocean of Definitive Meaning' (Ri chos nges don rgya mtsho) and constructed the Kumbum Stūpa at Jomonang, establishing Jonang as a paramount seat of Buddhist scholasticism.",
    aliases: ["Dolpopa", "The Buddha from Dolpo", "Kunmkhyen Dolpopa"],
    relatedIds: ["shentong", "kumbum", "taranatha"],
  },
  {
    id: "taranatha",
    termEn: "Jetsun Tāranātha",
    termBo: "ཇོ་ནང་རྗེ་བཙུན་ཏཱ་ར་ནཱ་ཐ།",
    wylie: "jo nang rje btsun tA ra nA tha",
    category: "lineage",
    shortDef:
      "The renowned 16th/17th-century Jonang historian, polymath, and master who built Takten Damchö Ling and authored definitive histories of Indian Buddhism.",
    fullDef:
      "Jetsun Tāranātha (1575–1634) was one of Tibet's most prolific scholars, meditators, and historians. He revitalized the Jonang lineage during a turbulent period, founded Takten Phuntsok Choeling (Takten Damchö Ling) in Tsang, and composed classic texts such as the 'History of Buddhism in India' (dgya gar chos 'byung) and extensive commentaries on the Kālacakra Six-Branch Yoga and the Tara tantras.",
    aliases: ["Taranatha", "Kunga Nyingpo", "Jetsun Taranatha"],
    relatedIds: ["dolpopa", "kalachakra", "shentong"],
  },
  {
    id: "pecha",
    termEn: "Pecha (Traditional Loose-Leaf Text)",
    termBo: "དཔེ་ཆ།",
    wylie: "dpe cha",
    category: "monastic",
    shortDef:
      "The traditional unbound, oblong Tibetan manuscript or xylograph format modeled after ancient Indian palm-leaf scriptures.",
    fullDef:
      "A pecha (dpe cha) is the sacred physical format of Tibetan religious and philosophical literature. Inherited from Indian palm-leaf (pattra) manuscripts, pechas consist of long, narrow horizontal pages wrapped inside sacred cloth cloths and secured between wooden boards. In monastic study, pechas are treated with the highest veneration as representations of the Buddha's speech (Dharma).",
    aliases: ["Pothi", "Tibetan Scripture", "Xylograph Book"],
    relatedIds: ["vinaya"],
  },
  {
    id: "kumbum",
    termEn: "Kumbum (Hundred Thousand Holy Images)",
    termBo: "སྐུ་འབུམ།",
    wylie: "sku 'bum",
    category: "monastic",
    shortDef:
      "A multi-tiered octagonal stupa housing thousands of sacred frescoes, deities, and chapels symbolizing the stages of spiritual ascent.",
    fullDef:
      "A Kumbum (literally 'one hundred thousand holy images') is an architectural masterpiece of Tibetan Buddhism. The Great Jonang Kumbum, designed and consecrated by Dölpopa in 1333, features multi-storied chapels arranged as a three-dimensional mandala representing the outer, inner, and alternative Kālacakra. Its iconographic murals remain a pinnacle of Himalayan Buddhist sacred art.",
    aliases: ["Great Stupa", "Jonang Kumbum", "Gyantse Kumbum style"],
    relatedIds: ["dolpopa", "kalachakra"],
  },
  {
    id: "vinaya",
    termEn: "Vinaya (Monastic Discipline)",
    termBo: "འདུལ་བ།",
    wylie: "'dul ba",
    termSkt: "Vinaya",
    category: "monastic",
    shortDef:
      "The canonical division of the Buddhist canon containing the code of ethical precepts and vows governing ordained monks and nuns.",
    fullDef:
      "The Vinaya (Tibetan: 'dul ba, 'taming') is the foundational monastic ethical framework instituted by the Buddha to guide the Sangha. Tibetan monasticism, including the Jonang tradition, upholds the Mūlasarvāstivāda Vinaya lineage, requiring full monks (gelong) to observe 253 rules covering celibacy, non-harm, poverty, and communal harmony.",
    aliases: ["Monastic Precepts", "Monastic Code", "'dul ba"],
    relatedIds: ["pecha"],
  },
  {
    id: "bodhicitta",
    termEn: "Bodhicitta (Awakening Mind)",
    termBo: "བྱང་ཆུབ་ཀྱི་སེམས།",
    wylie: "byang chub kyi sems",
    termSkt: "Bodhicitta",
    category: "practice",
    shortDef:
      "The altruistic aspiration to attain complete enlightenment for the benefit of all sentient beings.",
    fullDef:
      "Bodhicitta is the heartbeat of all Mahāyāna and Vajrayāna paths. It is divided into conventional bodhicitta (comprising aspirational bodhicitta to liberate beings and practical bodhicitta through the six pāramitās) and ultimate bodhicitta, which is the direct, non-dual realization of emptiness and luminous wisdom.",
    aliases: ["Enlightened Mind", "Mind of Awakening", "Awakening Aspiration"],
    relatedIds: ["shentong", "tathagatagarbha"],
  },
  {
    id: "chod",
    termEn: "Chöd (Severance)",
    termBo: "གཅོད།",
    wylie: "gcod",
    category: "practice",
    shortDef:
      "The meditative practice of metaphorically severing self-grasping and ego-clinging through the visualization of offering one's body to gods and demons.",
    fullDef:
      "Chöd ('severance' or 'cutting through') is a profound meditation system originated by the Indian master Padampa Sangye and the great Tibetan yoginī Machig Labdrön. Practiced in charnel grounds and desolate places using a bell, ḍamaru drum, and thighbone trumpet (kangling), it cuts through root ego-grasping by offering the meditator's visualized body as an ambrosial feast.",
    aliases: ["Severance Practice", "Feast Offering of the Body", "gcod"],
    relatedIds: ["bodhicitta", "shentong"],
  },
  {
    id: "madhyamaka",
    termEn: "Madhyamaka (Middle Way)",
    termBo: "དབུ་མ་པ།",
    wylie: "dbu ma pa",
    termSkt: "Mādhyamika / Madhyamaka",
    category: "philosophy",
    shortDef:
      "The profound Buddhist philosophical tradition that avoids the extremes of eternalism and nihilism by revealing the emptiness of all conceptual extremes.",
    fullDef:
      "Founded by Ārya Nāgārjuna in the 2nd century CE based on the Prajñāpāramitā sūtras, Madhyamaka ('Middle Way') demonstrates through rigorous dialectic that nothing possesses intrinsic, independent existence. Jonang philosophy categorizes Madhyamaka into Rangtong Madhyamaka (which negates self-existence in relative phenomena) and Shentong Madhyamaka (The Great Middle Way / dbu ma chen po, which affirms the unconditioned reality of ultimate wisdom).",
    aliases: ["The Middle Way", "dbu ma", "Centrism"],
    relatedIds: ["shentong", "rangtong", "three-turnings"],
  },
];

// Lookup Map for O(1) retrieval
export const GLOSSARY_MAP = new Map<string, GlossaryEntry>(
  GLOSSARY_ENTRIES.map((entry) => [entry.id.toLowerCase(), entry])
);

// Add aliases to lookup
for (const entry of GLOSSARY_ENTRIES) {
  if (entry.aliases) {
    for (const alias of entry.aliases) {
      const key = alias.toLowerCase().trim();
      if (!GLOSSARY_MAP.has(key)) {
        GLOSSARY_MAP.set(key, entry);
      }
    }
  }
}

/**
 * Find a glossary entry by id or alias
 */
export function getGlossaryEntry(idOrAlias: string): GlossaryEntry | undefined {
  return GLOSSARY_MAP.get(idOrAlias.toLowerCase().trim());
}

/**
 * Get all terms sorted alphabetically by English name
 */
export function getAllGlossaryEntries(): GlossaryEntry[] {
  return [...GLOSSARY_ENTRIES].sort((a, b) => a.termEn.localeCompare(b.termEn));
}

/**
 * Get terms by category
 */
export function getEntriesByCategory(category: GlossaryCategoryId): GlossaryEntry[] {
  if (category === "all") return getAllGlossaryEntries();
  return getAllGlossaryEntries().filter((e) => e.category === category);
}
