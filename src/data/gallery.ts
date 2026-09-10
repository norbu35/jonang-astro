import type { ImageMetadata } from "astro";

import mainEntranceImg from "../assets/images/main-entrance.webp";
import riteSutraImg from "../assets/images/rite-sutra.webp";
import teacherLibraryImg from "../assets/images/teacher-library.webp";
import chantingDrumsImg from "../assets/images/chanting-drums.webp";
import chantingDrums2Img from "../assets/images/chanting-drums2.webp";
import chantingTrioImg from "../assets/images/chanting-trio.webp";
import butterLampImg from "../assets/images/butter-lamp.webp";
import thangkaImg from "../assets/images/thangka.webp";
import vajraBellImg from "../assets/images/vajra-bell.webp";
import modernArtImg from "../assets/images/modern-art.webp";
import plantingTreesImg from "../assets/images/planting-trees.webp";
import housingLandscapeImg from "../assets/images/housing-landscape.webp";
import lectureImg from "../assets/images/lecture.webp";
import youngStudentsImg from "../assets/images/young-students.webp";
import yardRitualImg from "../assets/images/yard-ritual.webp";

export interface GalleryItem {
  id: string;
  image: ImageMetadata;
  title: string;
  titleBo?: string;
  category: "Sanctuary" | "Ritual" | "Study" | "Community";
  alt: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "main-entrance",
    image: mainEntranceImg,
    title: "Monks at Main Entrance",
    titleBo: "དགོན་པའི་སྒོ་ཆེན།",
    category: "Sanctuary",
    alt: "Group portrait of the sangha at the main monastery entrance in Shimla",
  },
  {
    id: "rite-sutra",
    image: riteSutraImg,
    title: "Sutra Liturgy",
    titleBo: "མདོ་ཆོག་གསུང་འདོན།",
    category: "Ritual",
    alt: "Resident monk reciting sacred pecha texts during morning liturgy",
  },
  {
    id: "teacher-library",
    image: teacherLibraryImg,
    title: "Scholastic Library",
    titleBo: "དཔེ་མཛོད་ཁང་།",
    category: "Study",
    alt: "Jonang teacher studying historical treatises in the monastery library",
  },
  {
    id: "chanting-drums",
    image: chantingDrumsImg,
    title: "Ritual Chanting & Drums",
    titleBo: "རོལ་མོ་དང་རྔ་སྒྲ།",
    category: "Ritual",
    alt: "Monks sounding ritual drums and cymbals during temple ceremonies",
  },
  {
    id: "chanting-drums-2",
    image: chantingDrums2Img,
    title: "Tantric Music Assembly",
    titleBo: "རྒྱུད་སྡེའི་རོལ་དབྱངས།",
    category: "Ritual",
    alt: "Ceremonial ritual performance with traditional Tibetan drums",
  },
  {
    id: "chanting-trio",
    image: chantingTrioImg,
    title: "Trio of Young Monks",
    titleBo: "གྲྭ་ཆུང་གསུམ།",
    category: "Study",
    alt: "Three young student monks reciting memorized philosophical verses",
  },
  {
    id: "lecture-debate",
    image: lectureImg,
    title: "Philosophical Debate",
    titleBo: "ཆོས་རྭའི་རྩོད་པ།",
    category: "Study",
    alt: "Monastic students participating in Pramāṇa debate and lecture classes",
  },
  {
    id: "young-students",
    image: youngStudentsImg,
    title: "Novice Classrooms",
    titleBo: "སློབ་གྲྭའི་འཛིན་གྲྭ།",
    category: "Study",
    alt: "Young students in class learning Tibetan grammar and modern subjects",
  },
  {
    id: "butter-lamp",
    image: butterLampImg,
    title: "Altar Butter Lamps",
    titleBo: "མཆོད་ཀོང་མར་མེ།",
    category: "Ritual",
    alt: "Rows of illuminated golden butter lamps offered in the main prayer hall",
  },
  {
    id: "vajra-bell",
    image: vajraBellImg,
    title: "Vajra and Bell",
    titleBo: "རྡོ་རྗེ་དང་དྲིལ་བུ།",
    category: "Ritual",
    alt: "Sacred Vajra (Dorje) and Ghanta (Drilbu) ritual instruments of the Vajrayana",
  },
  {
    id: "thangka-buddha",
    image: thangkaImg,
    title: "Sacred Thangka Painting",
    titleBo: "སངས་རྒྱས་ཀྱི་ཞལ་ཐང་།",
    category: "Sanctuary",
    alt: "Detailed traditional thangka depicting the Buddha and lineage deities",
  },
  {
    id: "modern-art",
    image: modernArtImg,
    title: "Contemporary Buddhist Art",
    titleBo: "དེང་རབས་ནང་བསྟན་རི་མོ།",
    category: "Sanctuary",
    alt: "Contemporary painting of Buddhist imagery in the monastery hall",
  },
  {
    id: "housing-landscape",
    image: housingLandscapeImg,
    title: "Sanjauli Mountain Ridge",
    titleBo: "སན་ཇོ་ལིའི་རི་རྒྱུད།",
    category: "Sanctuary",
    alt: "Monastery residential buildings overlooking the Himalayan hills of Sanjauli",
  },
  {
    id: "yard-ritual",
    image: yardRitualImg,
    title: "Monastery Courtyard Gathering",
    titleBo: "དགོན་པའི་ར་བའི་ཚོགས་འདུ།",
    category: "Community",
    alt: "Sangha gathered in the monastery courtyard for traditional observances",
  },
  {
    id: "planting-trees",
    image: plantingTreesImg,
    title: "Community Tree Planting",
    titleBo: "ལྗོན་ཤིང་འདེབས་འཛུགས།",
    category: "Community",
    alt: "Monastery community planting cedar and pine saplings in the local forest",
  },
];
