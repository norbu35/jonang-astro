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
  {
    id: "sunyata",
    termEn: "Śūnyatā (Emptiness)",
    termBo: "སྟོང་པ་ཉིད།",
    wylie: "stong pa nyid",
    termSkt: "Śūnyatā",
    category: "philosophy",
    shortDef:
      "The fundamental Buddhist truth that all relative phenomena are devoid of independent, permanent self-existence (svabhāva).",
    fullDef:
      "Śūnyatā ('emptiness' or 'openness') is the core insight of Mahāyāna Buddhism articulated in the Prajñāpāramitā scriptures. It signifies that phenomena exist solely through dependent origination (pratītyasamutpāda) and lack inherent essence. In the Jonang Shentong formulation, relative conditioned phenomena are empty of self-nature (rangtong), while the ultimate unconditioned reality—luminous awareness and Buddha-nature—is empty only of adventitious obscurations (shentong).",
    aliases: ["Emptiness", "Voidness", "stong pa nyid", "Shunyata"],
    relatedIds: ["shentong", "rangtong", "svabhava", "madhyamaka"],
  },
  {
    id: "svabhava",
    termEn: "Svabhāva (Inherent Nature / Own-Being)",
    termBo: "རང་བཞིན།",
    wylie: "rang bzhin",
    termSkt: "Svabhāva",
    category: "philosophy",
    shortDef:
      "The theoretical concept of an independent, unchanging, self-originated essence that all conditioned phenomena are shown to lack.",
    fullDef:
      "Svabhāva ('own-nature' or 'inherent existence') refers to the assumed intrinsic reality of phenomena that Buddhist dialectics thoroughly refute. Nāgārjuna demonstrated that if a phenomenon had svabhāva, it could never arise, change, or cease. In Shentong, while conventional entities are devoid of svabhāva, the ultimate dharmatā is an uncompounded, primordially enduring reality that never undergoes degeneration.",
    aliases: ["Self-nature", "Inherent Existence", "Own-being", "rang bzhin"],
    relatedIds: ["sunyata", "madhyamaka", "rangtong", "shentong"],
  },
  {
    id: "nitartha",
    termEn: "Nītārtha (Definitive Meaning)",
    termBo: "ངེས་དོན།",
    wylie: "nges don",
    termSkt: "Nītārtha",
    category: "philosophy",
    shortDef:
      "Teachings that directly and explicitly reveal ultimate truth as it is, requiring no further interpretation.",
    fullDef:
      "In Buddhist hermeneutics, nītārtha ('definitive meaning') denotes scriptures and teachings that articulate the ultimate truth directly, in contrast to neyārtha ('provisional meaning') which uses pedagogical devices adapted to disciples' capacities. The Jonang school considers the Third Turning of the Dharma Wheel and the Kālacakra Tantra as the supreme nītārtha revelations of the Buddha.",
    aliases: ["Definitive Meaning", "Absolute Meaning", "nges don"],
    relatedIds: ["neyartha", "three-turnings", "shentong"],
  },
  {
    id: "neyartha",
    termEn: "Neyārtha (Provisional Meaning)",
    termBo: "དྲང་དོན།",
    wylie: "drang don",
    termSkt: "Neyārtha",
    category: "philosophy",
    shortDef:
      "Teachings of indirect or pedagogical intent, given to guide disciples toward the ultimate truth step-by-step.",
    fullDef:
      "Neyārtha ('interpretable or provisional meaning') refers to discourses where the Buddha spoke using conventional metaphors, dualistic frameworks, or intermediate negations to guide beings away from gross clinging. According to Jonang masters, teachings that stop at mere absence or non-affirming negation without revealing luminous wisdom serve as provisional stepping stones toward the definitive Shentong realization.",
    aliases: ["Provisional Meaning", "Interpretable Meaning", "drang don"],
    relatedIds: ["nitartha", "three-turnings"],
  },
  {
    id: "jnana",
    termEn: "Jñāna (Primordial Wisdom / Yeshe)",
    termBo: "ཡེ་ཤེས།",
    wylie: "ye shes",
    termSkt: "Jñāna",
    category: "philosophy",
    shortDef:
      "The primordially pure, unconditioned awareness that is the intrinsic nature of the enlightened mind, beyond ordinary dualistic consciousness.",
    fullDef:
      "Jñāna (Tibetan: ye shes, 'primordial knowing') is distinguished from vijñāna (rnam shes, ordinary dualistic consciousness). While consciousness operates through subject-object duality and conceptual fabrications, jñāna is the non-dual, self-illuminating, uncompounded wisdom that perceives ultimate reality directly. In Jonang Shentong, jñāna is permanent, immutable, and replete with the spontaneous enlightened qualities of Buddhahood.",
    aliases: ["Yeshe", "Primordial Wisdom", "Timeless Awareness", "ye shes"],
    relatedIds: ["rangrik", "dharmadhatu", "tathagatagarbha", "shentong"],
  },
  {
    id: "pramana",
    termEn: "Pramāṇa (Valid Cognition / Epistemology)",
    termBo: "ཚད་མ།",
    wylie: "tshad ma",
    termSkt: "Pramāṇa",
    category: "philosophy",
    shortDef:
      "The rigorous Buddhist science of logic and valid cognition, founded by Dignāga and Dharmakīrti.",
    fullDef:
      "Pramāṇa (Tibetan: tshad ma, 'valid cognition') is the epistemology and formal logic system utilized throughout Tibetan monastic debate (shedra). It accepts two valid means of knowledge: direct perception (pratyakṣa) and inferential reasoning (anumāna). Jonang scholars mastered Dharmakīrti's Pramāṇavārttika to demonstrate that Shentong is not only experientially realized in tantric yoga, but also completely invulnerable to logical refutation.",
    aliases: ["Valid Cognition", "Buddhist Logic", "tshad ma"],
    relatedIds: ["madhyamaka", "shedra", "chos-rwa"],
  },
  {
    id: "prajnaparamita",
    termEn: "Prajñāpāramitā (Perfection of Wisdom)",
    termBo: "ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པ།",
    wylie: "shes rab kyi pha rol tu phyin pa",
    termSkt: "Prajñāpāramitā",
    category: "philosophy",
    shortDef:
      "The Mother of all Buddhas: the transcendent insight that directly realizes the emptiness and non-dual nature of all phenomena.",
    fullDef:
      "Prajñāpāramitā ('Perfection of Transcendent Wisdom') is the central corpus of Mahāyāna literature (such as the Heart Sūtra and Diamond Sūtra) and the supreme of the six pāramitās. It reveals that all phenomena are unborn, unceasing, and free from conceptual extremes. In the Jonang monastic curriculum, it is studied extensively through Maitreya's Abhisamayālaṃkāra.",
    aliases: ["Perfection of Wisdom", "Transcendent Wisdom", "Phar phyin"],
    relatedIds: ["sunyata", "madhyamaka", "shedra"],
  },
  {
    id: "abhidharma",
    termEn: "Abhidharma (Higher Knowledge / Phenomenology)",
    termBo: "ཆོས་མངོན་པ།",
    wylie: "chos mngon pa",
    termSkt: "Abhidharma",
    category: "philosophy",
    shortDef:
      "The systematic Buddhist analysis of mind, mental factors, cosmology, and the constituents of conditioned existence.",
    fullDef:
      "Abhidharma ('Higher Doctrine' or 'Phenomenology') is the third basket (piṭaka) of the Buddhist canon. It maps the human mind through detailed classifications of consciousness, positive and afflictive mental factors (caitta), karma, and the 75 or 100 dharmas. Monastic students at Jonang study Vasubandhu's Abhidharmakośa to ground their philosophical training.",
    aliases: ["Higher Knowledge", "Buddhist Phenomenology", "chos mngon pa"],
    relatedIds: ["shedra", "pramana"],
  },
  {
    id: "agantukamala",
    termEn: "Āgantukamala (Adventitious Obscurations)",
    termBo: "གློ་བུར་གྱི་དྲི་མ།",
    wylie: "glo bur gyi dri ma",
    termSkt: "Āgantukamala",
    category: "philosophy",
    shortDef:
      "Temporary, fleeting emotional and cognitive defilements that obscure the mind's primordially pure nature without altering its intrinsic purity.",
    fullDef:
      "Āgantukamala ('incidental or adventitious stains') is a central concept in Tathāgatagarbha and Shentong doctrine. It asserts that ignorance, desire, aversion, and karmic patterns are not intrinsic to consciousness—they are like clouds veiling the sun or dust coating a diamond. When these superficial stains are purified through the contemplative path, the innate, uncreated virtues of Buddha-nature emerge effortlessly.",
    aliases: ["Adventitious Stains", "Fleeting Defilements", "glo bur gyi dri ma"],
    relatedIds: ["tathagatagarbha", "shentong", "jnana"],
  },
  {
    id: "cittamatra",
    termEn: "Cittamātra (Mind-Only / Yogācāra)",
    termBo: "སེམས་ཙམ་པ།",
    wylie: "sems tsam pa",
    termSkt: "Cittamātra / Vijñānavāda",
    category: "philosophy",
    shortDef:
      "The Buddhist philosophical tradition founded by Asanga and Vasubandhu holding that all external appearances are manifestations of mind.",
    fullDef:
      "Cittamātra ('Mind-Only') or Yogācāra asserts that external physical objects do not exist independently of cognition; all perceived dualities are projections of karmic imprints in the storehouse consciousness (ālayavijñāna). Jonang masters integrate the Yogācāra analysis of consciousness with Madhyamaka emptiness, synthesizing them into the Great Middle Way of Other-Emptiness.",
    aliases: ["Mind-Only", "Yogacara", "Vijñanavada", "sems tsam"],
    relatedIds: ["kunzhi", "shentong", "madhyamaka"],
  },
  {
    id: "avadhuti",
    termEn: "Avadhūti (Central Channel / Uma)",
    termBo: "དབུ་མ།",
    wylie: "dbu ma",
    termSkt: "Avadhūti",
    category: "kalachakra",
    shortDef:
      "The primary central energetic channel running from the crown to the perineum, through which wisdom winds flow during tantric realization.",
    fullDef:
      "The avadhūti (Tibetan: dbu ma) is the central pathway of the subtle energetic body in Anuttarayoga Tantra. Flanked by the left (lalanā) and right (rasanā) channels, it represents the non-dual axis of spiritual transmutation. In Kālacakra practice, the yogi causes the karmic winds to enter, abide, and dissolve into the avadhūti, triggering the dawn of immutable bliss and unhindered empty form.",
    aliases: ["Central Channel", "dbu ma rtsa", "Uma", "Avadhuti"],
    relatedIds: ["nadi", "prana", "bindu", "lalana-rasana", "six-branch-yoga"],
  },
  {
    id: "lalana-rasana",
    termEn: "Lalanā & Rasanā (Left and Right Subtle Channels)",
    termBo: "རྐྱང་མ་དང་རོ་མ།",
    wylie: "rkyang ma dang ro ma",
    termSkt: "Lalanā & Rasanā",
    category: "kalachakra",
    shortDef:
      "The two side channels carrying lunar (cooling/wisdom) and solar (warming/method) karmic energies that constrict the central channel.",
    fullDef:
      "In Vajrayāna subtle physiology, the lalanā (left, white, lunar) and rasanā (right, red, solar) channels run parallel to the central channel and knot around the bodily cakras. These side channels govern ordinary dualistic inhalation and exhalation. Through the six yogas of Kālacakra, these dualistic energies are drawn inward and untied, releasing their winds into the central channel.",
    aliases: ["Side Channels", "Lunar and Solar Channels", "rkyang ma dang ro ma"],
    relatedIds: ["nadi", "avadhuti", "prana", "six-branch-yoga"],
  },
  {
    id: "tummo",
    termEn: "Tummo (Inner Heat / Caṇḍālī)",
    termBo: "གཏུམ་མོ།",
    wylie: "gtum mo",
    termSkt: "Caṇḍālī",
    category: "kalachakra",
    shortDef:
      "The yogic practice of generating intense spiritual heat at the navel center to melt subtle drops and experience blissful non-dual awareness.",
    fullDef:
      "Tummo (Sanskrit: Caṇḍālī, 'fierce woman') is one of the most celebrated completion-stage yogas. By focusing breath retention, subtle body postures, and visualization at the navel cakra, an inner fire blazes upward through the central channel. This melts the white bodhicitta drop at the crown, causing it to descend and trigger the Four Joys (ānanda) and the realization of ultimate emptiness.",
    aliases: ["Inner Heat", "Candali", "gtum mo", "Fierce Fire"],
    relatedIds: ["prana", "bindu", "avadhuti", "mahasukha", "six-branch-yoga"],
  },
  {
    id: "mahasukha",
    termEn: "Mahāsukha (Supreme Great Bliss)",
    termBo: "བདེ་བ་ཆེན་པོ།",
    wylie: "bde ba chen po",
    termSkt: "Mahāsukha",
    category: "kalachakra",
    shortDef:
      "The unconditioned, immutable bliss experienced when subtle drops and winds dissolve into the central channel, inseparable from empty form.",
    fullDef:
      "Mahāsukha ('Great Bliss') in Kālacakra is not a physical or emotional sensation, but the permanent, unfluctuating realization of the primordial Buddha nature. When the 21,600 karmic winds are transmuted into wisdom winds, the yogi experiences 21,600 moments of immutable bliss (acalasukha), culminating in complete enlightenment.",
    aliases: ["Great Bliss", "Immutable Bliss", "bde ba chen po"],
    relatedIds: ["sunyata", "stong-gzugs", "sahajakaya", "kalachakra"],
  },
  {
    id: "stong-gzugs",
    termEn: "Stong Gzugs (Empty Form / Śūnyatā-bimba)",
    termBo: "སྟོང་གཟུགས།",
    wylie: "stong gzugs",
    termSkt: "Śūnyatā-bimba / Pratibhāsa",
    category: "kalachakra",
    shortDef:
      "The luminous, non-material visionary appearances arising in sensory isolation and completion-stage yoga, devoid of physical atomic particles.",
    fullDef:
      "Stong gzugs ('Empty Form') is the hallmark realization of the Kālacakra Six-Branch Yoga. Unlike ordinary mental imagery produced by conceptuality, empty forms arise spontaneously in dark retreat and sky-gazing as reflections of ultimate reality—replete with color, light, and deity forms, yet completely uncompounded by atomic matter (paramāṇu). In union with immutable bliss, empty form constitutes the Sambhogakāya.",
    aliases: ["Empty Form", "Sunyata-bimba", "Pristine Visions"],
    relatedIds: ["kalachakra", "mahasukha", "mun-khang", "sahajakaya"],
  },
  {
    id: "mun-khang",
    termEn: "Mun Khang (Dark Retreat Hermitage)",
    termBo: "མུན་ཁང་།",
    wylie: "mun khang",
    category: "kalachakra",
    shortDef:
      "The lightproof, sealed meditation cell designed for strict 50 to 100-day dark retreats in the Kālacakra tradition.",
    fullDef:
      "A mun khang ('dark house' or 'dark cell') is an architectural sanctuary constructed to block all external photons. In this total sensory void, the practitioner isolates the physical senses (lus dben), speech (ngag dben), and mind (yid dben). Free from visual sensory stimulation, the ocular consciousness subsides and the ten visionary signs of empty form shine forth directly from Buddha-nature.",
    aliases: ["Dark Retreat", "Dark Cell", "Yang khang"],
    relatedIds: ["stong-gzugs", "six-branch-yoga", "kalachakra"],
  },
  {
    id: "sahajakaya",
    termEn: "Sahajakāya (Co-emergent Body of Fruition)",
    termBo: "ལྷན་སྐྱེས་ཀྱི་སྐུ།",
    wylie: "lhan skyes kyi sku",
    termSkt: "Sahajakāya",
    category: "kalachakra",
    shortDef:
      "The ultimate body of enlightenment in Kālacakra, representing the indivisible union of immutable great bliss and all-pervasive empty form.",
    fullDef:
      "Sahajakāya ('Co-emergent or Innate Body') is celebrated in the Jonang Kālacakra tradition as the crowning fruition of the spiritual path. It transcends ordinary dualisms of samsara and nirvana, embodying the Primordial Buddha (Ādibuddha) Kālacakra in full perfection, endowed with the 32 major and 80 minor marks without a single physical atom.",
    aliases: ["Innate Body", "Body of Co-emergence", "lhan skyes sku"],
    relatedIds: ["mahasukha", "stong-gzugs", "kalachakra"],
  },
  {
    id: "yidam",
    termEn: "Yidam (Meditational Deity / Iṣṭadevatā)",
    termBo: "ཡི་དམ།",
    wylie: "yi dam",
    termSkt: "Iṣṭadevatā",
    category: "practice",
    shortDef:
      "An enlightened archetype or meditational deity embodying the practitioner's own innate Buddha-nature used for tantric transformation.",
    fullDef:
      "Yidam (contracted from yid kyi dam tshig, 'mind-bond') is a personal meditational deity such as Kālacakra, Cakrasaṃvara, or Tārā. The practitioner visualizes themselves as the yidam to dissolve mundane ego-identity and actualize pure perception. In Jonang praxis, the supreme yidam is glorious Kālacakra embraced by Viśvamātā.",
    aliases: ["Meditation Deity", "Tantric Deity", "Istadevata", "yi dam"],
    relatedIds: ["kyerim", "kalachakra", "dbang"],
  },
  {
    id: "trulkhor",
    termEn: "Trulkhor (Yantra Yoga / Physical Postures)",
    termBo: "འཁྲུལ་འཁོར།",
    wylie: "'khrul 'khor",
    termSkt: "Yantra-yoga",
    category: "practice",
    shortDef:
      "The synchronized physical postures, movements, and breath holds practiced to guide subtle winds into the central channel.",
    fullDef:
      "Trulkhor ('magical wheel' or 'movement machine') consists of dynamic yogic postures, muscle locks, and breath retentions designed to eliminate energetic knots in the subtle channels. In the Jonang Kālacakra retreat curriculum, trulkhor movements are practiced to prepare the physical body for prolonged dark retreat and the Six-Branch Yoga.",
    aliases: ["Yantra Yoga", "Tibetan Yoga", "'khrul 'khor"],
    relatedIds: ["nadi", "prana", "tummo", "six-branch-yoga"],
  },
  {
    id: "ngondro",
    termEn: "Ngöndro (Foundational Practices)",
    termBo: "སྔོན་འགྲོ།",
    wylie: "sngon 'gro",
    category: "practice",
    shortDef:
      "The comprehensive preliminary practices undertaken to purify karmic obscurations and accumulate merit prior to advanced tantric initiation.",
    fullDef:
      "Ngöndro ('preliminaries' or 'prior step') constitutes the indispensable bedrock of Tibetan Vajrayāna. It consists of the Common Preliminaries (the Four Mind-Turnings on impermanence, karma, suffering, and precious human rebirth) and the Uncommon Preliminaries: 500,000 accumulations of prostrations with refuge, bodhicitta, Vajrasattva purification, maṇḍala offerings, and Guru Yoga.",
    aliases: ["Preliminary Practices", "Ngondro", "Foundational Accumulations", "sngon 'gro"],
    relatedIds: ["bodhicitta", "dbang", "kalachakra"],
  },
  {
    id: "dbang",
    termEn: "Dbang (Tantric Empowerment / Abhiṣeka)",
    termBo: "དབང་།",
    wylie: "dbang",
    termSkt: "Abhiṣeka",
    category: "practice",
    shortDef:
      "The formal ritual initiation through which a qualified master transmits the blessing and authorization to practice Vajrayāna tantras.",
    fullDef:
      "Dbang (Sanskrit: Abhiṣeka, 'empowerment' or 'consecration') is the gateway to all tantric practice. In the Kālacakra tradition, initiation encompasses the Seven Empowerments of Entering Like a Child, the Four High and Highest Empowerments, and the Great Vajra Master Empowerment, cleansing the disciple's body, speech, mind, and drops.",
    aliases: ["Empowerment", "Abhiseka", "Initiation", "dbang"],
    relatedIds: ["lung", "khrid", "dorje-lopon", "kalachakra"],
  },
  {
    id: "lung",
    termEn: "Lung (Scriptural Reading Transmission)",
    termBo: "ལུང་།",
    wylie: "lung",
    termSkt: "Āgama",
    category: "practice",
    shortDef:
      "The oral vocalization of a sacred text from teacher to student, transmitting the unbroken lineage energy of the teaching.",
    fullDef:
      "A lung ('authorizing transmission') is the oral reading of a scripture, ritual liturgy, or commentary by a lineage master who received it in an unbroken chain from the author. It awakens the receptive potency in the student's mind and authorizes them to read and practice the text.",
    aliases: ["Reading Transmission", "Oral Transmission", "Scriptural Authorization"],
    relatedIds: ["dbang", "khrid", "pecha"],
  },
  {
    id: "khrid",
    termEn: "Khrid (Experiential Guidance / Pith Instruction)",
    termBo: "ཁྲིད།",
    wylie: "khrid",
    termSkt: "Upadeśa",
    category: "practice",
    shortDef:
      "Step-by-step practical and experiential meditation guidance given by a master to lead disciples through actual realization.",
    fullDef:
      "Khrid ('guidance' or 'leading step-by-step') refers to practical, experiential meditation instructions derived from the personal realization of lineage masters. Unlike dry scholastic commentaries, khrid manuals (khrid yig)—such as Tāranātha's 'Meaningful to Behold' (Mthong ba don ldan)—provide precise meditation instructions for retreatants.",
    aliases: ["Pith Instruction", "Meditation Guidance", "Upadesha", "khrid"],
    relatedIds: ["dbang", "lung", "dorje-lopon", "six-branch-yoga"],
  },
  {
    id: "dorje-lopon",
    termEn: "Dorje Lopön (Vajra Master / Vajrācārya)",
    termBo: "རྡོ་རྗེ་སློབ་དཔོན།",
    wylie: "rdo rje slob dpon",
    termSkt: "Vajrācārya",
    category: "lineage",
    shortDef:
      "A fully qualified tantric master who holds the complete transmissions, retreats, and spiritual authority to confer empowerments.",
    fullDef:
      "A Dorje Lopön (Vajra Master) is a highly realized practitioner who has completed rigorous monastic training and multi-year contemplative retreats. They oversee the retreat facility, guide candidates through the subtle completion stages of Kālacakra, and maintain the purity of the samayas.",
    aliases: ["Vajra Master", "Vajracarya", "rdo rje slob dpon"],
    relatedIds: ["dbang", "khrid", "kalachakra"],
  },
  {
    id: "bodhisattva",
    termEn: "Bodhisattva (Awakening Being)",
    termBo: "བྱང་ཆུབ་སེམས་དཔའ།",
    wylie: "byang chub sems dpa'",
    termSkt: "Bodhisattva",
    category: "practice",
    shortDef:
      "A heroic spiritual practitioner who has generated bodhicitta and dedicates their life across infinite lifetimes to freeing all sentient beings.",
    fullDef:
      "A Bodhisattva ('awakening warrior') vows to attain full Buddhahood solely for the universal salvation of all suffering beings. Cultivating the six transcendental perfections (generosity, ethics, patience, diligence, meditation, and wisdom), Bodhisattvas traverse the ten spiritual grounds (bhūmi) until total Buddhahood is realized.",
    aliases: ["Awakening Being", "Spiritual Hero", "byang chub sems dpa'"],
    relatedIds: ["bodhicitta", "prajnaparamita"],
  },
  {
    id: "shedra",
    termEn: "Shedra (Monastic Philosophical College)",
    termBo: "བཤད་གྲྭ།",
    wylie: "bshad grwa",
    category: "monastic",
    shortDef:
      "The academic and philosophical academy of a Tibetan monastery dedicated to scholastic debate and the Five Great Treatises.",
    fullDef:
      "A shedra ('place of explanation') is the formal university of Tibetan Buddhist monasticism. Monks undertake a rigorous 9 to 13-year curriculum studying the Five Great Treatises: Prajñāpāramitā, Madhyamaka, Pramāṇa, Abhidharma, and Vinaya, accompanied by daily dialectical debates in the courtyard (chos rwa).",
    aliases: ["Monastic College", "Philosophical Academy", "bshad grwa"],
    relatedIds: ["chos-rwa", "drupdra", "vinaya", "pecha"],
  },
  {
    id: "drupdra",
    termEn: "Drupdra (Contemplative Retreat Center)",
    termBo: "སྒྲུབ་གྲྭ།",
    wylie: "sgrub grwa",
    category: "monastic",
    shortDef:
      "The enclosed contemplative retreat facility where monks dedicate years to intensive tantric meditation and the Six Yogas.",
    fullDef:
      "A drupdra ('place of practice') is the meditation center of a monastery, distinct from the academic shedra. Monks enter the drupdra to complete the canonical three-year, three-fortnight retreat (lo gsum phyogs gsum) in total seclusion, mastering the subtle wind-channel yogas and dark retreats.",
    aliases: ["Retreat Facility", "Contemplative Center", "sgrub grwa"],
    relatedIds: ["shedra", "mun-khang", "six-branch-yoga", "kalachakra"],
  },
  {
    id: "chos-rwa",
    termEn: "Chos Rwa (Monastic Debate Courtyard)",
    termBo: "ཆོས་རྭ།",
    wylie: "chos rwa",
    category: "monastic",
    shortDef:
      "The sacred courtyard where monks gather daily to test philosophical comprehension through dynamic, stylized physical debate.",
    fullDef:
      "The chos rwa ('dharma enclosure') is the vibrant heart of monastic intellectual life. Monks face each other in intense dialectical debate, punctuated by clapping hands, stamping feet, and snapping rosaries. This dynamic pedagogy ensures that scriptural understanding is not merely memorized, but scrutinized and verified with razor-sharp logic.",
    aliases: ["Debate Courtyard", "Dharma Enclosure", "chos rwa"],
    relatedIds: ["shedra", "pramana", "dam-bca-pa", "thal-phen-pa"],
  },
  {
    id: "dam-bca-pa",
    termEn: "Dam Bca' Pa (Defender in Monastic Debate)",
    termBo: "དམ་བཅའ་བ།",
    wylie: "dam bca' ba",
    category: "monastic",
    shortDef:
      "The debater who sits cross-legged on a low cushion, defending a philosophical thesis against challenger attacks.",
    fullDef:
      "In traditional Tibetan monastic debate, the dam bca' pa sits calmly and must defend their scriptural thesis against rapid-fire questions and absurd consequences (prasaṅga). They must answer strictly with precise formal formulas: 'I accept,' 'The reason is not established,' or 'There is no pervasion.'",
    aliases: ["Defender", "Thesis Defender", "dam bca' ba"],
    relatedIds: ["chos-rwa", "thal-phen-pa", "pramana"],
  },
  {
    id: "thal-phen-pa",
    termEn: "Thal 'Phen Pa (Challenger in Monastic Debate)",
    termBo: "ཐལ་འཕེན་པ།",
    wylie: "thal 'phen pa",
    category: "monastic",
    shortDef:
      "The standing challenger who circles the defender, posing rapid logical syllogisms with dramatic claps and gestures.",
    fullDef:
      "The thal 'phen pa ('launcher of consequences') stands, circles, and energetically challenges the defender's assertions by exposing hidden contradictions. Emphasizing each deduction with a rhythmic downward clap of the hands and a stamp of the foot, the challenger drives the inquiry to root philosophical clarity.",
    aliases: ["Challenger", "Questioner", "thal 'phen pa"],
    relatedIds: ["chos-rwa", "dam-bca-pa", "pramana"],
  },
  {
    id: "cham",
    termEn: "Cham (Sacred Monastic Masked Dance)",
    termBo: "འཆམ།",
    wylie: "'cham",
    category: "monastic",
    shortDef:
      "The sacred ritual dance performed by ordained monks in ornate brocade robes and deity masks to subdue obstacles.",
    fullDef:
      "Cham ('cham) is a living ritual art form and dynamic meditation. Monks visualize themselves as meditational deities and wrathful protectors, moving in precise geometric patterns accompanied by cymbals, long horns (dungchen), and drums. The dance cleanses the environment of negative karmic forces and transmits blessings to the community.",
    aliases: ["Masked Dance", "Lama Dance", "Sacred Dance", "'cham"],
    relatedIds: ["kalachakra", "torma"],
  },
  {
    id: "dul-tshon",
    termEn: "Dul Tshon (Sand Mandala / Dul-tshon Dkyil-'khor)",
    termBo: "རྡུལ་ཚོན་དཀྱིལ་འཁོར།",
    wylie: "rdul tshon dkyil 'khor",
    category: "monastic",
    shortDef:
      "The intricate two-dimensional sacred palace mandala meticulously created using millions of grains of colored mineral sand.",
    fullDef:
      "A sand mandala (rdul tshon dkyil 'khor) is constructed over several days by trained monks using narrow metal funnels (chakpur). It represents the divine residence and enlightened qualities of deities like Kālacakra. Upon completion and consecration, the mandala is ritually swept up and offered to a flowing river, demonstrating the impermanence of all composite phenomena.",
    aliases: ["Sand Mandala", "Colored Sand Mandala", "rdul tshon"],
    relatedIds: ["kalachakra", "cham"],
  },
  {
    id: "torma",
    termEn: "Torma (Ritual Offering Cake)",
    termBo: "གཏོར་མ།",
    wylie: "gtor ma",
    termSkt: "Balingta",
    category: "monastic",
    shortDef:
      "Sculpted ritual offering cakes made of roasted barley flour (tsampa) and butter, adorned with vibrant butter motifs.",
    fullDef:
      "Tormas (gtor ma) are physical offering sculptures central to Tibetan ritual liturgy. Modeled from dough and decorated with delicate butter ornamentation (kar rgyan), tormas serve multiple functions: as representations of deities, as feasts of spiritual sustenance for protectors, and as tools for casting out adversities.",
    aliases: ["Offering Cake", "Ritual Cake", "gtor ma"],
    relatedIds: ["vinaya", "pecha"],
  },
  {
    id: "gandi",
    termEn: "Gaṇḍī (Monastic Slit-Gong)",
    termBo: "གཎྜཱི།",
    wylie: "gaN+DI",
    termSkt: "Gaṇḍī",
    category: "monastic",
    shortDef:
      "The ancient wooden slit-gong rhythmically struck in Buddhist monasteries to summon monks to prayer, assembly, and meditation.",
    fullDef:
      "The gaṇḍī is a traditional carved wooden percussion beam dating back to the time of Buddha Śākyamuni in India. Kept inside the main prayer hall, its sharp, syncopated rhythm summons the Sangha to assemblies, monastic confessions (posadha), and liturgies.",
    aliases: ["Wooden Gong", "Monastic Beam", "Gandi"],
    relatedIds: ["vinaya", "shedra"],
  },
  {
    id: "tsa-tsa",
    termEn: "Tsa-Tsa (Sacred Votive Clay Reliefs)",
    termBo: "ཚ་ཚ།",
    wylie: "tsha tsha",
    category: "monastic",
    shortDef:
      "Small sacred plaques or miniature stupas molded from purified clay and consecrated with mantras, placed inside shrines and stupas.",
    fullDef:
      "Tsa-tsas (tsha tsha) are sacred votive tablets stamped from metal molds using clay mixed with medicinal herbs, flower petals, and holy relics. After being painted and consecrated, thousands of tsa-tsas are entombed inside stupas, prayer walls, and pilgrimage shrines to magnify merit.",
    aliases: ["Clay Reliefs", "Votive Stupas", "tsha tsha"],
    relatedIds: ["kumbum", "kora"],
  },
  {
    id: "mar-me",
    termEn: "Mar Me (Butter Lamp / Dīpa)",
    termBo: "མར་མེ།",
    wylie: "mar me",
    termSkt: "Dīpa",
    category: "monastic",
    shortDef:
      "Traditional brass or silver lamps fueled by clarified butter, symbolizing the radiant light of wisdom banishing the darkness of ignorance.",
    fullDef:
      "Butter lamps (mar me) are ubiquitous offerings in Himalayan Buddhist temples. Filled with pure clarified butter and lit with a cotton wick, their steady, golden flames represent the illumination of prajñā and the removal of the two obscurations.",
    aliases: ["Butter Lamp", "Sacred Lamp", "mar me"],
    relatedIds: ["pecha", "kumbum"],
  },
  {
    id: "kora",
    termEn: "Kora (Sacred Circumambulation / Pradakṣiṇā)",
    termBo: "སྐོར་བ།",
    wylie: "skor ba",
    termSkt: "Pradakṣiṇā",
    category: "monastic",
    shortDef:
      "The practice of circumambulating a sacred object or site clockwise while reciting mantras and prayers.",
    fullDef:
      "Kora (skor ba) is the devotional practice of walking clockwise around holy temples, stupas, or mountains. Accompanied by prayer wheels and mantra recitation, circumambulation unifies body, speech, and mind in reverence, purifying aeons of negative karma.",
    aliases: ["Circumambulation", "Pradaksina", "skor ba"],
    relatedIds: ["kumbum", "tsa-tsa"],
  },
  {
    id: "kalki",
    termEn: "Kalkī (Rigden / Sacred Kings of Shambhala)",
    termBo: "རིགས་ལྡན།",
    wylie: "rigs ldan",
    termSkt: "Kalkī / Kulika",
    category: "lineage",
    shortDef:
      "The lineage of twenty-five enlightened Kulika kings of Shambhala who hold and protect the Kālacakra Tantra.",
    fullDef:
      "The Kalkīs (Tibetan: Rigs ldan, 'Holders of the Castes') succeeded the Seven Dharma Kings of Shambhala, beginning with Mañjuśrī Yaśas. They unified all castes into a single vajra family through the Kālacakra initiation. According to tradition, the 25th Kalki, Raudracakrin, will usher in a golden age of Dharma.",
    aliases: ["Rigden", "Kulika", "King of Shambhala", "rigs ldan"],
    relatedIds: ["shambhala", "kalachakra"],
  },
  {
    id: "kunpang",
    termEn: "Kunpang Thukje Tsöndru",
    termBo: "ཀུན་སྤངས་ཐུགས་རྗེ་བརྩོན་འགྲུས།",
    wylie: "kun spangs thugs rje brtson 'grus",
    category: "lineage",
    shortDef:
      "The great 13th-century master who unified seventeen distinct transmission lineages of the Kālacakra and founded Jonang Monastery.",
    fullDef:
      "Kunpang Thukje Tsöndru (1243–1313) was the pivotal founding father of the Jonang tradition as an institutional center. After mastering all available Kālacakra commentary traditions in Tibet, he established the primary monastery at Jomonang in 1294, where the lineage took its name.",
    aliases: ["Kunpangpa", "Thukje Tsondru", "Kun spangs pa"],
    relatedIds: ["dolpopa", "kalachakra", "dro-lineage"],
  },
  {
    id: "bamda-gelek",
    termEn: "Bamda Gelek Gyatso",
    termBo: "འབའ་མདའ་དགེ་ལེགས་རྒྱ་མཚོ།",
    wylie: "'ba' mda' dge legs rgya mtsho",
    category: "lineage",
    shortDef:
      "The prolific 19th/20th-century Jonang polymath whose meditation manuals and commentary guides form the basis of the modern three-year retreat.",
    fullDef:
      "Bamda Thupten Gelek Gyatso (1844–1904) was a master of the rimé (non-sectarian) movement and one of the greatest commentators on the Kālacakra. His extensive multi-volume practice manual, 'A Ray of Sunlight' (Nyin byed snang ba), provides the detailed liturgical and physical guidance utilized to this day in Jonang retreat centers.",
    aliases: ["Bamda Gelek", "Bamda Rinpoche", "Thupten Gelek Gyatso"],
    relatedIds: ["taranatha", "kalachakra", "drupdra"],
  },
  {
    id: "jetsun-dampa",
    termEn: "Khalkha Jetsun Dampa",
    termBo: "རྗེ་བཙུན་དམ་པ།",
    wylie: "rje btsun dam pa",
    category: "lineage",
    shortDef:
      "The revered line of spiritual leaders of Mongolia, regarded as successive reincarnations of Jetsun Tāranātha.",
    fullDef:
      "The Khalkha Jetsun Dampa (Bogd Gegeen) line originated when Zanabazar was recognized as the direct incarnation of Jetsun Tāranātha. The 9th Khalkha Jetsun Dampa (1933–2012) served as the supreme head of the Jonang tradition in exile, consecrating the Main Jonang Takten Phuntsok Choeling monastery in Sanjauli, Shimla.",
    aliases: ["Bogd Gegeen", "Jetsun Dampa Khutuktu", "Bogdo Gegen"],
    relatedIds: ["taranatha", "kalu-rinpoche"],
  },
  {
    id: "kalu-rinpoche",
    termEn: "Kyabje Kalu Rinpoche",
    termBo: "ཀརྨ་རང་བྱུང་ཀུན་ཁྱབ་ཕྲིན་ལས།",
    wylie: "kar ma rang byung kun khyab phrin las",
    category: "lineage",
    shortDef:
      "The legendary 20th-century meditation master and Shangpa Kagyu luminary who preserved and established the Jonang exile monastery in Shimla.",
    fullDef:
      "Kyabje Kalu Rinpoche (1905–1989) was one of the earliest Tibetan masters to propagate Vajrayāna Buddhism to the West. Having trained in Jonang Kālacakra transmissions in Eastern Tibet, he took responsibility for preserving the endangered Jonang lineage in India, acquiring and establishing the Sanjauli monastery in Shimla in the 1960s before placing it under the spiritual care of the Jonang order.",
    aliases: ["Kalu Rinpoche", "Kyabje Kalu", "Dorje Chang Kalu Rinpoche"],
    relatedIds: ["jetsun-dampa", "kalachakra"],
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
