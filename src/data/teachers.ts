import type { ImageMetadata } from "astro";
import akuKungaImg from "../assets/portraits/aku_kunga.webp";
import yontenGyamtsoImg from "../assets/portraits/yonten_gyamtso.webp";
import kungaChoephelImg from "../assets/portraits/kunga_choephel_rinpoche.webp";
import kungaTsamchungImg from "../assets/portraits/kunga_tsamchung_rinpoche.webp";
import kungaRinchenImg from "../assets/portraits/kunga_rinchen_rinpoche.webp";
import choekyiNangpaImg from "../assets/portraits/choekyi_nangpa_rinpoche.webp";

export interface TeacherRole {
  role: string;
}

export interface Teacher {
  id: string;
  name: string;
  slug: string;
  roles: string[];
  order: number;
  portrait: ImageMetadata;
  portraitAlt: string;
  bioHtml: string;
}

export const TEACHERS: Teacher[] = [
  {
    id: "66ed1abebd6f15dd70d966cb",
    name: "Choekyi Nangpa Rinpoche",
    slug: "choekyi-nangpa-rinpoche",
    roles: ["Jonang Gyaltsab", "Dorje Lopön"],
    order: 1,
    portrait: choekyiNangpaImg,
    portraitAlt: "Portrait of His Eminence Choekyi Nangpa Rinpoche",
    bioHtml: "<p>His Eminence Choekyi Nangpa Rinpoche has resided in India since 1993. Over the decades, he has received numerous profound empowerments and transmissions from His Holiness the 14th Dalai Lama, with particular emphasis on the Hundred Guidance Instructions on the Kālacakra. In 1998, His Holiness appointed him as the Abbot of Jonang Monastery in Shimla. Rinpoche also holds the exalted title of Dorje Lopön (Vajra Master / Vajrācārya), the highest tantric office within the Jonang tradition.</p><p>In 2014, he was bestowed the supreme office of Jonang Gyaltsab Rinpoche, making him the principal representative of the Jonang lineage in exile. Tulku Choekyi Nangpa Rinpoche holds all lineages of the Jonang tradition, with special emphasis on the Kālacakra Tantra, the central meditational deity (yidam) of the Jonang tradition tracing back to the Buddha.</p><p>Rinpoche was entrusted with transmitting the lineage teachings by His Eminence Vajradhara (Dorje Chang) Ngawang Yonten Sangpo, his root guru. He instructs monks in Shimla according to classical Jonang tradition, directs retreatants of the Kālacakra Meditation Institute in the Six-fold Vajrayoga, and regularly travels to teach students across Europe, the Americas, and Asia.</p>",
  },
  {
    id: "66ed1b10bd6f15dd70d966e4",
    name: "Kunga Rinchen Rinpoche",
    slug: "kunga-rinchen-rinpoche",
    roles: ["Vajra Master", "Former Abbot"],
    order: 2,
    portrait: kungaRinchenImg,
    portraitAlt: "Portrait of Geshe Kunga Rinchen Rinpoche",
    bioHtml: "<p>Geshe Kunga Rinchen, the second lineage abbot of Jonang Monastery in Shimla, India, was born in 1971 in the Ngawa region of eastern Tibet (Amdo). In 1985, he took monastic vows under the guidance of the esteemed Lama Kunga Thukje Palsangpo of Se Gönchen Monastery in Ngawa. He dedicated three years to intensive practice of the Six Yogas of the Kālacakra Tantra and spent two additional years in solitary retreat, engaging in Chöd (severance) practice and other profound contemplative paths.</p><p>In 1989, he received monk ordination in the transmission lineage of Jetsun Tāranātha in the presence of the reincarnated master Khar Sherab Choephel. Later that year, he performed extensive ascetic practice across one hundred charnel grounds (dur khrod) alongside Wugye Tulku Tenkho and Lama Kunga Loden, deepening his direct yogic realization.</p><p>In June 1990, Geshe Kunga Rinchen arrived in India. He embarked on an extensive seventeen-year course of dialectical study, mastering the Collected Topics (Bsdus grwa) and the Five Great Treatises of Buddhist philosophy under former Drepung Gomang abbot Tsultrim Phentsok and other distinguished tutors. In 2007, during a grand gathering of the Drepung Gomang monastic assembly, he attained the prestigious degree of Geshe Kachu (Master of the Ten Treatises).</p>",
  },
  {
    id: "66ed1be0bd6f15dd70d9670c",
    name: "Geshe Kunga Tsamchung Rinpoche",
    slug: "geshe-kunga-tsamchung-rinpoche",
    roles: ["Former Abbot"],
    order: 3,
    portrait: kungaTsamchungImg,
    portraitAlt: "Portrait of Geshe Kunga Tsamchung Rinpoche",
    bioHtml: "<p>Geshe Kunga Tsamchung was born on April 1, 1978, in the Ngawa region of Tibet. In 1985, at the age of eight, he entered Se Monastery Thupten Shedrup Namgyal Ling. Under his tutor Gen Jangchup, he mastered the Kālacakra ritual liturgy and ceremonial arts. He later took monastic vows in the presence of the reincarnated Khar Sherab Choephel.</p><p>In August 1992, Vajra Master Kunga Thukje Palsangpo imparted full transmission and guidance on the Kālacakra. Under the same master, Geshe Kunga Tsamchung practiced the Six Yogas of the Kālacakra completion stage for three years, receiving detailed instructions on tantric liturgies and commentary manuals, including Tāranātha's <em>Mthong ba don ldan</em> (མཐོང་བ་དོན་ལྡན།) and <em>Sgom rim</em>. He received numerous empowerments, reading transmissions, and pith instructions (upadeśa) of the Jonang lineage.</p><p>At age nineteen, he joined Amchok Tsannyin Monastery to study classical Buddhist philosophy under the guidance of the abbot emeritus. At twenty, he took full monastic vows before Lama Kunga Thukje Pal. In 1997, Geshe Kunga Tsamchung traveled to India, receiving the blessings and spiritual guidance of His Holiness the 14th Dalai Lama, and subsequently served as the third abbot of Jonang Monastery in Shimla from 2014 to 2019.</p>",
  },
  {
    id: "66ed1c32bd6f15dd70d96721",
    name: "Kunga Choephel Rinpoche",
    slug: "kunga-choephel-rinpoche",
    roles: ["Current Abbot"],
    order: 4,
    portrait: kungaChoephelImg,
    portraitAlt: "Portrait of Khenpo Kunga Choephel Rinpoche",
    bioHtml: "<p>Khentrul Kyabje Kunga Choephel Rinpoche was born in 1983. At the age of eight, he was recognized as the authentic reincarnation of Lama Jamyang Gyatso of Drokge, beginning his formal training at Jonang Drokge Monastery.</p><p>For three years, Rinpoche practiced the Six-fold Vajrayoga of the Noble Kālacakra under the great Vajra Master Kunga Thukje Pal of Se Gönchen Monastery, receiving the full cycle of Jonang empowerments, textual transmissions, and experiential instructions. He subsequently undertook intensive Chöd practice, meditating in solitary charnel grounds and the sacred hundred springs of Muktinath.</p><p>In 1997, Rinpoche met His Holiness the 14th Dalai Lama, receiving teachings across the Rimé (non-sectarian) traditions. He entered Palden Drepung Gomang Monastic College to advance his philosophical studies. During this period, His Holiness the 9th Khalkha Jetsun Dampa Rinpoche formally recognized and enthroned him as the reincarnation of Drokge Lama Jamyang Gyatso. Rinpoche completed the entire academic curriculum at Gomang College, attaining the title of Geshe.</p><p>Following years of teaching at the Jonang Main Monastery in Shimla, Rinpoche traveled to Mongolia at the request of the 9th Khalkha Jetsun Dampa. In 2014, he founded two monasteries and Dharma centers in Mongolia: Jonang Takten Chöphel Ling and Jonang Takten Machik Kachö Ling, establishing regular cycles of Kālacakra practice, foundational preliminaries, Lamrim, and Chöd. Since 2019, in accordance with the decree of His Holiness the Dalai Lama, Rinpoche serves as the 4th and Current Abbot of Main Jonang Takten Phuntsok Choeling in Shimla.</p>",
  },
  {
    id: "66ed1c7cbd6f15dd70d9673a",
    name: "Yonten Gyamtso",
    slug: "yonten-gyamtso",
    roles: ["Lama"],
    order: 5,
    portrait: yontenGyamtsoImg,
    portraitAlt: "Portrait of Lama Yonten Gyamtso",
    bioHtml: "<p>Lama Yonten Gyamtso was born in 1966 into a rural family in Ngawa. He memorized root tantric treatises and liturgical manuals, successfully completing formal examinations at Se Gönchen Monastery. There, he studied the minor and major sciences under Vajradhara Kunga Thukje Pal. After passing his examinations on the Kālacakra Tantra, he entered the traditional three-year contemplative retreat.</p><p>Subsequently, he traveled to Lhasa for extended retreats, meditating in historic caves and secluded hermitages. He dedicated a decade to mastering Buddhist epistemology (Pramāṇa) and Middle Way philosophy. He taught philosophy for one year and conducted instructional classes in the Kālacakra ritual arts department for four years.</p><p>In 1997, Lama Yonten Gyamtso arrived in India, studying Buddhist philosophy at the Institute of Buddhist Dialectics in Dharamsala for three years before joining Jonang Takten Phuntsok Choeling in Shimla. Dedicated to disseminating the vast heritage of the Jonang tradition globally, Lama Yonten Gyamtso teaches extensively in Russia and internationally, establishing Jonang Dharma and meditation centers.</p>",
  },
  {
    id: "66ed1cdbbd6f15dd70d96759",
    name: "Aku Kunga",
    slug: "aku-kunga",
    roles: ["Lama"],
    order: 6,
    portrait: akuKungaImg,
    portraitAlt: "Portrait of Lama Aku Kunga",
    bioHtml: "<p>Lama Aku Kunga was born in April 1948 in the Amdo region of Tibet. From early youth, he became a devoted disciple at Se Gönchen Monastery in his home region.</p><p>He spent more than three years studying the history, cosmology, and completion-stage yogas (<em>Jordruk</em> / <em>Sbyor drug</em>) of the Kālacakra under the esteemed master Kunga Gyaltsen. He also received classical Tibetan grammar education from the renowned scholar Muge Samten. Lama Aku Kunga studied Buddhist sūtras under great luminaries including Tulku Urgyen Rinpoche and Chökyi Nyima Rinpoche. In India, he was a close disciple of the 9th Khalkha Jetsun Dampa Khutuktu, focusing on Chöd and tantric ritual practices.</p>",
  },
];
