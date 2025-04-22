import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { View, Text, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { Word } from "../../../../api/__api/Modules/APP_WORD_A_DAY/Module";

export interface WordManager {
  data: Record<number, Word>;
  setData: (d: Record<number, Word>) => void;
  getWordByDate: (d: Date) => Word | undefined;
  getNGrams: (word: Word) => Record<number, number> | undefined;
  fetchWords: () => Promise<void>;
}

// Create the Word context
const WordContext = createContext<WordManager | null>(null);

// WordProvider component
export function WordProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<Record<number, Word>>({});
  const [startDate, setStartDate] = useState<Date | null>(null);

  function isWordLike(obj: unknown): obj is Word {
    return (
      typeof obj === "object" &&
      obj !== null &&
      "lexeme" in obj &&
      "id" in obj &&
      "definition" in obj &&
      "example" in obj &&
      "etymology" in obj &&
      // "pronunciation" in obj &&
      // "ipa" in obj &&
      "date" in obj &&
      "partOfSpeech" in obj &&
      "synonyms" in obj &&
      "antonyms" in obj &&
      "related" in obj &&
      "translations" in obj
    );
  }

  const getNGrams = useCallback(
    (word: Word): Record<number, number> | undefined => {
      if (!isWordLike(word)) return undefined;
      return undefined;
    },
    [],
  );

  const parseWord = useCallback((word: unknown): Word | undefined => {
    if (!isWordLike(word)) return undefined;
    const wordRecord: Word = {
      lexeme: word?.lexeme,
      id: word?.id,
      definition: word?.definition,
      example: word?.example,
      etymology: word?.etymology,
      pronunciation: word?.pronunciation,
      date: word?.date,
      ipa: word?.ipa,
      partOfSpeech: word?.partOfSpeech,
      synonyms: word?.synonyms,
      antonyms: word?.antonyms,
      related: word?.related,
      translations: {
        de: word?.translations?.de,
        fr: word?.translations?.fr,
        es: word?.translations?.es,
        it: word?.translations?.it,
      },
    };

    return wordRecord;
  }, []);

  // Fetch words from an API or a local data source
  const fetchWords = useCallback(async () => {
    // const res = await fetch("/api/WORD_A_DAY/data");
    // if (!res.ok) {
    //   throw new Error("NetworkError");
    // } else {
    // const data = await res.json();

    const data = {
      yowling: {
        lexeme: "yowling",
        id: 2731566,
        definition:
          "A loud, prolonged, mournful cry, typically made by a cat or dog.",
        example:
          "The yowling of the stray cat kept the neighborhood awake all night.",
        etymology:
          "From Middle English 'yowlen,' likely imitative of the sound itself, akin to 'howl.'",
        pronunciation: "co-ter-ie",
        ipa: "/ˈkoʊtəri/",
        partOfSpeech: "noun",
        date: "2025-10-06",
        synonyms: ["howling", "wailing", "screeching", "caterwauling"],
        antonyms: ["silence", "quiet", "murmuring"],
        related: ["meowing", "barking", "whining", "growling"],
        translations: {
          de: ["Jaulen"],
          fr: ["miaulement"],
          es: ["aullido"],
          it: ["ululato"],
        },
      },
      nimbly: {
        lexeme: "nimbly",
        id: 8445070,
        definition: "In a quick and light manner; with agility.",
        example: "The cat leaped nimbly over the fence.",
        etymology:
          "From Middle English 'nimbly', from 'nimble' (quick, agile) + '-ly' (adverbial suffix). 'Nimble' originates from Old English 'nǣmel' (quick to grasp), related to 'niman' (to take).",
        pronunciation: "crav-en",
        ipa: "/ˈkreɪvən/",
        partOfSpeech: "adverb",
        date: "2025-02-23",
        synonyms: ["agilely", "quickly", "lightly", "spryly", "deftly"],
        antonyms: ["clumsily", "slowly", "heavily"],
        related: ["nimble", "agility", "dexterity", "grace"],
        translations: {
          de: ["behende"],
          fr: ["avec agilité"],
          es: ["ágilmente"],
          it: ["agilmente"],
        },
      },
      gabbled: {
        lexeme: "gabbled",
        id: 9045320,
        definition: "To talk rapidly and unintelligibly.",
        example:
          "The excited children gabbled about their day at the amusement park.",
        etymology:
          "From Middle English 'gabben', meaning 'to talk idly', possibly of imitative origin.",
        pronunciation: "cred-u-lous",
        ipa: "/ˈkrɛdʒələs/",
        partOfSpeech: "verb",
        date: "2026-04-01",
        synonyms: ["chattered", "jabbered", "prattled", "babbled"],
        antonyms: ["articulated", "enunciated", "pronounced"],
        related: ["gibberish", "mutter", "ramble", "blather"],
        translations: {
          de: ["plappern"],
          fr: ["jaboter"],
          es: ["balbucear"],
          it: ["ciarlare"],
        },
      },
      direful: {
        lexeme: "direful",
        id: 7368552,
        definition:
          "Extremely bad or dreadful; causing great fear or suffering.",
        example:
          "The direful news of the earthquake left the entire town in shock.",
        etymology:
          "From Middle English 'direful', combining 'dire' (from Latin 'dirus', meaning 'fearful, ominous') + '-ful' (a suffix meaning 'full of').",
        pronunciation: "cryp-tic",
        ipa: "/ˈkrɪptɪk/",
        partOfSpeech: "adjective",
        date: "2026-01-18",
        synonyms: ["dreadful", "terrible", "horrific", "awful", "frightful"],
        antonyms: ["pleasant", "delightful", "wonderful", "joyful"],
        related: ["dire", "fearful", "ominous", "calamitous"],
        translations: {
          de: ["furchtbar"],
          fr: ["effroyable"],
          es: ["horroroso"],
          it: ["terribile"],
        },
      },
      emulate: {
        lexeme: "emulate",
        id: 6790746,
        definition: "To imitate with effort to equal or surpass.",
        example: "Many young athletes strive to emulate their heroes.",
        etymology:
          "From Latin 'aemulatus', past participle of 'aemulari' (to rival), from 'aemulus' (rivaling).",
        pronunciation: "cul-pa-ble",
        ipa: "/ˈkʌlpəbl/",
        partOfSpeech: "verb",
        date: "2025-05-28",
        synonyms: ["imitate", "copy", "mimic", "follow"],
        antonyms: ["neglect", "ignore", "abandon"],
        related: ["rival", "compete", "mirror", "aspire"],
        translations: {
          de: ["nachahmen"],
          fr: ["émuler"],
          es: ["emular"],
          it: ["emulare"],
        },
      },
      pugnacious: {
        lexeme: "pugnacious",
        id: 7369149,
        definition: "Eager or quick to argue, quarrel, or fight.",
        example: "The pugnacious boxer was always looking for a fight.",
        etymology:
          "From Latin 'pugnax' (combative), from 'pugnare' (to fight).",
        pronunciation: "cu-pid-i-ty",
        ipa: "/kjuːˈpɪdəti/",
        partOfSpeech: "adjective",
        date: "2025-04-08",
        synonyms: ["combative", "aggressive", "belligerent", "contentious"],
        antonyms: ["peaceful", "gentle", "conciliatory", "cooperative"],
        related: ["feisty", "truculent", "hostile", "confrontational"],
        translations: {
          de: ["kampflustig"],
          fr: ["combatif"],
          es: ["pugnaz"],
          it: ["pugnace"],
        },
      },
      pensive: {
        lexeme: "pensive",
        id: 2285231,
        definition:
          "Engaged in, involving, or reflecting deep or serious thought.",
        example:
          "She sat in a pensive mood, staring out the window at the rain.",
        etymology:
          "From Middle English 'pensif', from Old French 'pensif', from 'penser' (to think), from Latin 'pensare' (to weigh, consider).",
        pronunciation: "cur-mud-geon",
        ipa: "/kɜːˈmʌdʒən/",
        partOfSpeech: "adjective",
        date: "2025-11-11",
        synonyms: ["thoughtful", "contemplative", "reflective", "meditative"],
        antonyms: ["unthinking", "heedless", "carefree"],
        related: ["introspective", "ruminative", "brooding"],
        translations: {
          de: ["nachdenklich"],
          fr: ["pensif"],
          es: ["pensativo"],
          it: ["pensieroso"],
        },
      },
      importuned: {
        lexeme: "importuned",
        id: 814915,
        definition: "To ask persistently or pressingly for something.",
        example: "She importuned her boss for a raise until he finally agreed.",
        etymology:
          "From Middle French 'importuner', from Latin 'importunus' (inconvenient, troublesome).",
        pronunciation: "cur-so-ry",
        ipa: "/ˈkɜːrsəri/",
        partOfSpeech: "verb",
        date: "2025-11-03",
        synonyms: ["beg", "plead", "beseech", "entreat", "implore"],
        antonyms: ["refuse", "deny", "reject", "ignore"],
        related: ["persistent", "urgent", "demand", "request"],
        translations: {
          de: ["betteln"],
          fr: ["importuner"],
          es: ["importunar"],
          it: ["importunare"],
        },
      },
      gapes: {
        lexeme: "gapes",
        id: 587606,
        definition: "To stare with an open mouth, as in wonder or surprise.",
        example:
          "The audience gapes in amazement as the magician performs his final trick.",
        etymology:
          "Middle English 'gapen', from Old Norse 'gapa' (to gape, yawn).",
        pronunciation: "daunt-less",
        ipa: "/ˈdɔːntləs/",
        partOfSpeech: "verb",
        date: "2025-01-16",
        synonyms: ["stare", "ogle", "gawk", "gaze"],
        antonyms: ["ignore", "overlook", "avert"],
        related: ["yawn", "wonder", "astonishment"],
        translations: {
          de: ["gaffen"],
          fr: ["béer"],
          es: ["boquear"],
          it: ["sbadigliare"],
        },
      },
      expediency: {
        lexeme: "expediency",
        id: 3125230,
        definition:
          "The quality of being convenient and practical despite possibly being improper or immoral.",
        example:
          "The decision was made more out of expediency than moral consideration.",
        etymology:
          "From Latin 'expedientia' (advantage, fitness), from 'expediens' (suitable, advantageous).",
        pronunciation: "de-bac-le",
        ipa: "/dɪˈbɑːklə/",
        partOfSpeech: "noun",
        date: "2025-01-15",
        synonyms: ["convenience", "practicality", "advantage", "utility"],
        antonyms: ["inconvenience", "impracticality", "disadvantage"],
        related: ["expedient", "opportunism", "pragmatism"],
        translations: {
          de: ["Zweckmäßigkeit"],
          fr: ["opportunité"],
          es: ["conveniencia"],
          it: ["opportunità"],
        },
      },
      detract: {
        lexeme: "detract",
        id: 4517205,
        definition:
          "To reduce the strength, value, or importance of something.",
        example:
          "The minor errors did not detract from the overall quality of the presentation.",
        etymology:
          "From Latin 'detractus', past participle of 'detrahere', meaning 'to pull away' or 'to take down'.",
        pronunciation: "de-bil-i-tate",
        ipa: "/dɪˈbɪlɪˌteɪt/",
        partOfSpeech: "verb",
        date: "2025-08-31",
        synonyms: ["diminish", "lessen", "reduce", "undermine"],
        antonyms: ["enhance", "improve", "boost", "augment"],
        related: ["detraction", "detractive", "detractor"],
        translations: {
          de: ["schmälern"],
          fr: ["déprécier"],
          es: ["menoscabar"],
          it: ["sminuire"],
        },
      },
      grise: {
        lexeme: "grise",
        id: 7677172,
        definition:
          "A variant spelling of 'greys', meaning to make or become grey.",
        example: "The sky began to grise as the storm approached.",
        etymology:
          "From Old English 'grǣg', meaning grey, influenced by French 'gris'.",
        pronunciation: "de-cad-ent",
        ipa: "/ˈdɛkədənt/",
        partOfSpeech: "verb",
        date: "2026-04-03",
        synonyms: ["grey", "gray", "whiten", "fade"],
        antonyms: ["brighten", "color", "enliven"],
        related: ["greyness", "greyish", "grizzle"],
        translations: {
          de: ["ergrauen"],
          fr: ["griser"],
          es: ["grisear"],
          it: ["ingrigire"],
        },
      },
      stout: {
        lexeme: "stout",
        id: 887600,
        definition:
          "Strong, sturdy, or heavily built; also, brave or determined.",
        example: "The stout oak door withstood the storm's fury.",
        etymology:
          "From Middle English 'stout', from Old French 'estout' (bold, proud), from Frankish *stolt (proud, stately), from Proto-Germanic *stultaz (proud, stately).",
        pronunciation: "de-cor-um",
        ipa: "/dɪˈkɔːrəm/",
        partOfSpeech: "adjective",
        date: "2025-11-19",
        synonyms: ["strong", "sturdy", "robust", "brave", "resolute"],
        antonyms: ["weak", "frail", "timid", "cowardly"],
        related: ["stoutness", "stouthearted", "stoutly"],
        translations: {
          de: ["stark / tapfer"],
          fr: ["robuste / courageux"],
          es: ["robusto / valiente"],
          it: ["robusto / coraggioso"],
        },
      },
      vizard: {
        lexeme: "vizard",
        id: 8170732,
        definition:
          "A mask or visor, especially one worn to disguise the face.",
        example:
          "The thief wore a vizard to conceal his identity during the robbery.",
        etymology:
          "From Middle English 'visard', derived from Old French 'visiere' (visor), from 'vis' (face), from Latin 'visus' (sight, appearance).",
        pronunciation: "def-er-ence",
        ipa: "/ˈdɛfərəns/",
        partOfSpeech: "noun",
        date: "2026-01-06",
        synonyms: ["mask", "visor", "disguise", "false face"],
        antonyms: ["unmask", "reveal"],
        related: ["disguise", "camouflage", "concealment", "masquerade"],
        translations: {
          de: ["Maske"],
          fr: ["masque"],
          es: ["máscara"],
          it: ["maschera"],
        },
      },
      reproachful: {
        lexeme: "reproachful",
        id: 9185501,
        definition: "Expressing disapproval or disappointment.",
        example: "She gave him a reproachful look after he arrived late.",
        etymology:
          "From Middle English 'reprocheful', from Old French 'reprochier' (to reproach) + '-ful' (suffix meaning 'full of').",
        pronunciation: "de-funct",
        ipa: "/dɪˈfʌŋkt/",
        partOfSpeech: "adjective",
        date: "2025-02-21",
        synonyms: ["disapproving", "critical", "scornful", "condemnatory"],
        antonyms: ["approving", "complimentary", "praising"],
        related: ["reproach", "rebuke", "chide", "admonish"],
        translations: {
          de: ["vorwurfsvoll"],
          fr: ["réprobateur"],
          es: ["reprochador"],
          it: ["rimproverante"],
        },
      },
      abate: {
        lexeme: "abate",
        id: 4594117,
        definition: "To reduce in amount, degree, or intensity; lessen.",
        example: "The storm began to abate by evening.",
        etymology:
          "From Middle English 'abaten', from Old French 'abatre' ('to beat down'), from Latin 'ad-' (to) + 'battuere' ('to beat').",
        pronunciation: "de-le-ter-i-ous",
        ipa: "/ˌdɛlɪˈtɪəriəs/",
        partOfSpeech: "verb",
        date: "2025-01-21",
        synonyms: ["diminish", "subside", "weaken", "ebb", "decline"],
        antonyms: ["increase", "intensify", "escalate", "grow"],
        related: ["mitigate", "alleviate", "dwindle", "recede"],
        translations: {
          de: ["verringern"],
          fr: ["diminuer"],
          es: ["disminuir"],
          it: ["diminuire"],
        },
      },
      abberant: {
        lexeme: "abberant",
        id: 2581608,
        definition: "Deviating from the norm or standard; abnormal.",
        example:
          "The scientist observed aberrant behavior in the test subjects under the new conditions.",
        etymology:
          "From Latin 'aberrantem' (nominative 'aberrans'), present participle of 'aberrare', meaning 'to wander away, go astray' (from 'ab-' 'away' + 'errare' 'to wander').",
        pronunciation: "dem-a-gogue",
        ipa: "/ˈdɛməɡɔːɡ/",
        partOfSpeech: "adjective",
        date: "2025-02-08",
        synonyms: ["anomalous", "atypical", "deviant", "irregular"],
        antonyms: ["normal", "typical", "standard", "conventional"],
        related: ["aberration", "aberrance", "aberrantly"],
        translations: {
          de: ["abweichend"],
          fr: ["aberrant"],
          es: ["aberrante"],
          it: ["aberrante"],
        },
      },
      abhor: {
        lexeme: "abhor",
        id: 6019757,
        definition:
          "To regard with extreme repugnance or aversion; detest utterly.",
        example: "She abhors violence in any form.",
        etymology:
          "From Middle English abhorren, from Latin abhorrēre, from ab- 'away from' + horrēre 'to shudder, tremble'.",
        pronunciation: "de-mur",
        ipa: "/dɪˈmɜːr/",
        partOfSpeech: "verb",
        date: "2026-01-19",
        synonyms: ["detest", "loathe", "despise", "execrate"],
        antonyms: ["love", "admire", "cherish", "adore"],
        related: ["abhorrence", "abhorrent", "repugnance", "aversion"],
        translations: {
          de: ["verabscheuen"],
          fr: ["abhorrer"],
          es: ["aborrecer"],
          it: ["aborrire"],
        },
      },
      abnegate: {
        lexeme: "abnegate",
        id: 2869447,
        definition:
          "To renounce or reject something, especially a belief or desire.",
        example:
          "She chose to abnegate her personal ambitions for the sake of her family.",
        etymology:
          "From Latin 'abnegatus', past participle of 'abnegare', meaning 'to refuse' (from 'ab-' 'away' + 'negare' 'to deny').",
        pronunciation: "de-nig-rate",
        ipa: "/ˈdɛnɪɡreɪt/",
        partOfSpeech: "verb",
        date: "2025-03-23",
        synonyms: ["renounce", "reject", "relinquish", "forswear"],
        antonyms: ["embrace", "accept", "claim", "indulge"],
        related: ["self-denial", "abstain", "sacrifice", "repudiate"],
        translations: {
          de: ["verzichten"],
          fr: ["renoncer"],
          es: ["renegar"],
          it: ["rinnegare"],
        },
      },
      absolve: {
        lexeme: "absolve",
        id: 8348245,
        definition:
          "To declare someone free from guilt, obligation, or punishment.",
        example: "The priest absolved him of his sins during confession.",
        etymology:
          "From Latin 'absolvere', meaning 'to set free, acquit', from 'ab-' (away) + 'solvere' (to loosen).",
        pronunciation: "de-prav-i-ty",
        ipa: "/dɪˈprævəti/",
        partOfSpeech: "verb",
        date: "2025-10-16",
        synonyms: ["acquit", "exonerate", "pardon", "forgive", "clear"],
        antonyms: ["condemn", "accuse", "blame", "charge", "convict"],
        related: ["absolution", "absolvitory", "remission", "vindicate"],
        translations: {
          de: ["freisprechen"],
          fr: ["absoudre"],
          es: ["absolver"],
          it: ["assolvere"],
        },
      },
      abstruse: {
        lexeme: "abstruse",
        id: 5453653,
        definition: "Difficult to understand; obscure.",
        example:
          "The professor's lecture on quantum mechanics was so abstruse that most students left confused.",
        etymology:
          "From Latin 'abstrusus', meaning 'hidden, concealed', past participle of 'abstrudere' ('to conceal'), from 'ab-' ('away') + 'trudere' ('to push').",
        pronunciation: "de-ride",
        ipa: "/dɪˈraɪd/",
        partOfSpeech: "adjective",
        date: "2025-10-15",
        synonyms: ["obscure", "esoteric", "arcane", "recondite", "complex"],
        antonyms: ["clear", "simple", "straightforward", "lucid", "obvious"],
        related: [
          "abstract",
          "complicated",
          "cryptic",
          "enigmatic",
          "perplexing",
        ],
        translations: {
          de: ["abstrus"],
          fr: ["abstrus"],
          es: ["abstruso"],
          it: ["astruso"],
        },
      },
      accolade: {
        lexeme: "accolade",
        id: 4159597,
        definition:
          "An award or privilege granted as a special honor or as an acknowledgment of merit.",
        example:
          "She received an accolade for her outstanding contributions to science.",
        etymology:
          "From French 'accolade', from Italian 'accolata', meaning 'an embrace', from 'accolare' (to embrace), from Latin 'ad-' (to) + 'collum' (neck). Originally referred to the ceremonial embrace conferring knighthood.",
        pronunciation: "des-pot",
        ipa: "/ˈdɛspɒt/",
        partOfSpeech: "noun",
        date: "2025-06-05",
        synonyms: ["honor", "award", "commendation", "praise", "tribute"],
        antonyms: ["criticism", "censure", "disapproval"],
        related: ["recognition", "achievement", "distinction", "laurels"],
        translations: {
          de: ["Auszeichnung"],
          fr: ["accolade"],
          es: ["reconocimiento"],
          it: ["riconoscimento"],
        },
      },
      accretion: {
        lexeme: "accretion",
        id: 6801843,
        definition:
          "The process of growth or increase, typically by the gradual accumulation of additional layers or matter.",
        example:
          "The accretion of dust and gas formed new stars in the nebula.",
        etymology:
          "From Latin 'accretio', meaning 'an increase', derived from 'accrescere' (to grow).",
        pronunciation: "de-sul-to-ry",
        ipa: "/dɪˈsʌltəri/",
        partOfSpeech: "noun",
        date: "2025-03-13",
        synonyms: [
          "accumulation",
          "growth",
          "buildup",
          "amassment",
          "augmentation",
        ],
        antonyms: ["erosion", "reduction", "diminution", "decrease"],
        related: ["aggregation", "deposition", "expansion", "increment"],
        translations: {
          de: ["Akkretion"],
          fr: ["accrétion"],
          es: ["acreción"],
          it: ["accrescimento"],
        },
      },
      acerbic: {
        lexeme: "acerbic",
        id: 9437744,
        definition:
          "Sharp and forthright in tone or manner, often harsh or bitter.",
        example:
          "Her acerbic remarks during the meeting left everyone stunned.",
        etymology:
          "From Latin 'acerbus' (harsh, bitter), influenced by French 'acerbique'.",
        pronunciation: "de-tri-tus",
        ipa: "/dɪˈtraɪtəs/",
        partOfSpeech: "adjective",
        date: "2025-01-25",
        synonyms: ["sharp", "caustic", "sarcastic", "cutting", "tart"],
        antonyms: ["gentle", "kind", "mild", "sweet", "diplomatic"],
        related: ["acerbity", "acerbically", "acerbate"],
        translations: {
          de: ["scharf, beißend"],
          fr: ["acerbe"],
          es: ["acerbo"],
          it: ["acerbo"],
        },
      },
      acrimonious: {
        lexeme: "acrimonious",
        id: 1818495,
        definition: "Angry and bitter, especially in speech or debate.",
        example:
          "The meeting ended in an acrimonious exchange between the two leaders.",
        etymology:
          "From Latin 'acrimonia', meaning sharpness or bitterness, derived from 'acer' (sharp).",
        pronunciation: "dex-ter-i-ty",
        ipa: "/dɛkˈstɛrɪti/",
        partOfSpeech: "adjective",
        date: "2025-10-02",
        synonyms: ["bitter", "caustic", "rancorous", "sarcastic", "vitriolic"],
        antonyms: ["amicable", "friendly", "harmonious", "peaceful"],
        related: ["animosity", "hostility", "resentment", "strife"],
        translations: {
          de: ["scharf"],
          fr: ["acrimonieux"],
          es: ["acre"],
          it: ["acre"],
        },
      },
      acumen: {
        lexeme: "acumen",
        id: 9417497,
        definition: "The ability to make good judgments and quick decisions.",
        example: "Her business acumen helped the company grow rapidly.",
        etymology:
          "From Latin 'acūmen', meaning 'sharpness' or 'point', derived from 'acuere' (to sharpen).",
        pronunciation: "dex-ter-ous",
        ipa: "/ˈdɛkstərəs/",
        partOfSpeech: "noun",
        date: "2025-05-03",
        synonyms: ["shrewdness", "astuteness", "perceptiveness"],
        antonyms: ["stupidity", "naivety", "ignorance"],
        related: ["insight", "discernment", "intelligence"],
        translations: {
          de: ["Scharfsinn"],
          fr: ["perspicacité"],
          es: ["perspicacia"],
          it: ["acume"],
        },
      },
      adamant: {
        lexeme: "adamant",
        id: 9747755,
        definition: "Refusing to be persuaded or to change one's mind.",
        example: "She was adamant that she would not attend the meeting.",
        etymology:
          "From Old French 'adamant', from Latin 'adamantem' (nominative 'adamas'), from Greek 'adamas' (unconquerable, invincible), from 'a-' (not) + 'daman' (to tame).",
        pronunciation: "di-a-phan-ous",
        ipa: "/daɪˈæfənəs/",
        partOfSpeech: "adjective",
        date: "2026-03-07",
        synonyms: ["unyielding", "inflexible", "resolute", "determined"],
        antonyms: ["flexible", "yielding", "pliant", "agreeable"],
        related: ["stubborn", "steadfast", "obstinate", "firm"],
        translations: {
          de: ["unbeugsam"],
          fr: ["inflexible"],
          es: ["firme"],
          it: ["inflessibile"],
        },
      },
      adjudicate: {
        lexeme: "adjudicate",
        id: 6943318,
        definition:
          "To make a formal judgment or decision about a problem or disputed matter.",
        example:
          "The court will adjudicate the dispute between the two companies.",
        etymology:
          "From Latin 'adjudicatus', past participle of 'adjudicare', meaning 'to award judicially' (ad- 'to' + judicare 'to judge').",
        pronunciation: "di-a-tribe",
        ipa: "/ˈdaɪəˌtraɪb/",
        partOfSpeech: "verb",
        date: "2025-08-04",
        synonyms: ["arbitrate", "decide", "settle", "judge", "determine"],
        antonyms: ["hesitate", "waver", "defer"],
        related: ["adjudication", "adjudicator", "judicial", "arbitration"],
        translations: {
          de: ["entscheiden"],
          fr: ["juger"],
          es: ["adjudicar"],
          it: ["giudicare"],
        },
      },
      admonish: {
        lexeme: "admonish",
        id: 3384082,
        definition: "To warn or reprimand someone firmly.",
        example:
          "The teacher admonished the students for talking during the exam.",
        etymology:
          "From Middle English 'amonesten', from Old French 'amonester', based on Latin 'admonere' (to warn).",
        pronunciation: "di-dac-tic",
        ipa: "/dɪˈdæktɪk/",
        partOfSpeech: "verb",
        date: "2026-01-24",
        synonyms: ["reprimand", "rebuke", "scold", "chide"],
        antonyms: ["praise", "commend", "applaud"],
        related: ["warn", "caution", "reprove", "counsel"],
        translations: {
          de: ["ermahnen"],
          fr: ["réprimander"],
          es: ["amonestar"],
          it: ["ammonire"],
        },
      },
      adroit: {
        lexeme: "adroit",
        id: 9609598,
        definition: "Skillful or clever in using the hands or mind.",
        example:
          "She was adroit at handling difficult situations with diplomacy.",
        etymology:
          "From French 'adroit', meaning 'skillful', from the phrase 'à droit' ('according to right').",
        pronunciation: "dif-fi-dent",
        ipa: "/ˈdɪfɪdənt/",
        partOfSpeech: "adjective",
        date: "2025-08-20",
        synonyms: ["dexterous", "nimble", "skillful", "clever", "adept"],
        antonyms: ["clumsy", "awkward", "inept", "unskillful"],
        related: ["agile", "proficient", "resourceful", "handy"],
        translations: {
          de: ["geschickt"],
          fr: ["adroit"],
          es: ["hábil"],
          it: ["abile"],
        },
      },
      aegis: {
        lexeme: "aegis",
        id: 4889387,
        definition:
          "Protection, backing, or support of a particular person or organization.",
        example: "The project was completed under the aegis of the university.",
        etymology:
          "From Greek 'aigis', the shield of Zeus or Athena, often shown with a Gorgon's head.",
        pronunciation: "di-gress",
        ipa: "/daɪˈɡrɛs/",
        partOfSpeech: "noun",
        date: "2026-01-20",
        synonyms: [
          "protection",
          "patronage",
          "auspices",
          "sponsorship",
          "guardianship",
        ],
        antonyms: ["opposition", "neglect", "abandonment"],
        related: ["shield", "defense", "support", "authority", "sanction"],
        translations: {
          de: ["Ägide"],
          fr: ["égide"],
          es: ["égida"],
          it: ["egida"],
        },
      },
      aesthetic: {
        lexeme: "aesthetic",
        id: 8484397,
        definition: "Concerned with beauty or the appreciation of beauty.",
        example:
          "The minimalist design of the room had a clean and modern aesthetic.",
        etymology:
          "From Greek 'aisthētikos', meaning 'perceptive, sensitive', from 'aisthēta' (perceptible things), from 'aisthesthai' (to perceive).",
        pronunciation: "di-la-to-ry",
        ipa: "/ˈdɪləˌtɔːri/",
        partOfSpeech: "adjective",
        date: "2025-05-10",
        synonyms: ["artistic", "tasteful", "stylish", "elegant"],
        antonyms: ["unattractive", "ugly", "plain"],
        related: ["aesthetics", "beauty", "design", "visual"],
        translations: {
          de: ["ästhetisch"],
          fr: ["esthétique"],
          es: ["estético"],
          it: ["estetico"],
        },
      },
      alacrity: {
        lexeme: "alacrity",
        id: 6408458,
        definition: "Cheerful readiness or eagerness.",
        example: "She accepted the invitation with alacrity.",
        etymology:
          "From Latin 'alacritas', meaning 'liveliness' or 'eagerness', derived from 'alacer' (lively).",
        pronunciation: "dil-i-gent",
        ipa: "/ˈdɪlɪdʒənt/",
        partOfSpeech: "noun",
        date: "2026-03-26",
        synonyms: ["eagerness", "enthusiasm", "willingness", "promptness"],
        antonyms: ["reluctance", "hesitation", "unwillingness", "sluggishness"],
        related: ["zeal", "ardor", "briskness", "cheerfulness"],
        translations: {
          de: ["Bereitwilligkeit"],
          fr: ["empressement"],
          es: ["presteza"],
          it: ["alacrità"],
        },
      },
      allege: {
        lexeme: "allege",
        id: 9700728,
        definition: "To claim or assert something without providing proof.",
        example:
          "The defendant alleges that he was not present at the scene of the crime.",
        etymology:
          "From Middle English 'alleggen', from Old French 'aleguer', from Latin 'allegare' (to send, cite, adduce), from 'ad-' (to) + 'legare' (to send, depute).",
        pronunciation: "dis-a-buse",
        ipa: "/ˈdɪsəˌbjuːz/",
        partOfSpeech: "verb",
        date: "2025-12-30",
        synonyms: ["claim", "assert", "declare", "contend", "maintain"],
        antonyms: ["deny", "disprove", "refute"],
        related: ["accuse", "affirm", "testify", "charge"],
        translations: {
          de: ["behaupten"],
          fr: ["alléguer"],
          es: ["alegar"],
          it: ["allegare"],
        },
      },
      aloofness: {
        lexeme: "aloofness",
        id: 6667273,
        definition:
          "The state of being emotionally or physically distant or reserved.",
        example:
          "Her aloofness made it difficult for her colleagues to approach her with their concerns.",
        etymology:
          "From 'aloof' (16th century), from Middle Dutch 'loef' (windward side of a ship), implying keeping a distance to avoid involvement.",
        pronunciation: "dis-af-fect-ed",
        ipa: "/ˌdɪsəˈfæktɪd/",
        partOfSpeech: "noun",
        date: "2025-01-09",
        synonyms: ["detachment", "reserve", "remoteness", "standoffishness"],
        antonyms: ["friendliness", "warmth", "approachability", "engagement"],
        related: ["indifference", "isolation", "unapproachability"],
        translations: {
          de: ["Distanziertheit"],
          fr: ["détachement"],
          es: ["distanciamiento"],
          it: ["distanza"],
        },
      },
      altruistic: {
        lexeme: "altruistic",
        id: 946611,
        definition: "Showing a selfless concern for the well-being of others.",
        example:
          "Her altruistic actions, such as volunteering at the shelter, inspired many.",
        etymology:
          "From French 'altruiste', derived from Italian 'altrui' (meaning 'other people'), which comes from Latin 'alter' (meaning 'other').",
        pronunciation: "dis-cern",
        ipa: "/dɪˈsɜːrn/",
        partOfSpeech: "adjective",
        date: "2025-11-14",
        synonyms: ["selfless", "philanthropic", "benevolent", "generous"],
        antonyms: ["selfish", "egoistic", "greedy", "self-centered"],
        related: ["compassion", "kindness", "charity", "humanitarianism"],
        translations: {
          de: ["altruistisch"],
          fr: ["altruiste"],
          es: ["altruista"],
          it: ["altruista"],
        },
      },
      amalgamate: {
        lexeme: "amalgamate",
        id: 4412195,
        definition:
          "To combine or unite to form one organization or structure.",
        example:
          "The two companies decided to amalgamate to increase their market share.",
        etymology:
          "From Latin 'amalgamare', meaning 'to mix with mercury', from 'amalgama' (a soft mass).",
        pronunciation: "dis-cern-ing",
        ipa: "/dɪˈsɜːnɪŋ/",
        partOfSpeech: "verb",
        date: "2025-09-19",
        synonyms: ["merge", "combine", "unite", "fuse", "integrate"],
        antonyms: ["separate", "divide", "split", "disconnect"],
        related: ["amalgamation", "consolidate", "blend", "incorporate"],
        translations: {
          de: ["vereinigen"],
          fr: ["amalgamer"],
          es: ["amalgamar"],
          it: ["amalgamare"],
        },
      },
      ambiguous: {
        lexeme: "ambiguous",
        id: 8297413,
        definition:
          "Open to more than one interpretation; not having one obvious meaning.",
        example:
          "The ending of the movie was ambiguous, leaving viewers to decide what really happened.",
        etymology:
          "From Latin 'ambiguus' (doubtful, uncertain), from 'ambigere' (to dispute, hesitate), from 'ambi-' (both) + 'agere' (to drive, lead).",
        pronunciation: "dis-com-fit",
        ipa: "/dɪsˈkʌmfɪt/",
        partOfSpeech: "adjective",
        date: "2025-08-14",
        synonyms: ["vague", "unclear", "equivocal", "cryptic"],
        antonyms: ["clear", "definite", "unambiguous", "explicit"],
        related: ["ambiguity", "ambivalence", "uncertainty"],
        translations: {
          de: ["mehrdeutig"],
          fr: ["ambigu"],
          es: ["ambiguo"],
          it: ["ambiguo"],
        },
      },
      ambivalent: {
        lexeme: "ambivalent",
        id: 5339293,
        definition:
          "Having mixed feelings or contradictory ideas about something or someone.",
        example:
          "She felt ambivalent about accepting the job offer because it required relocating.",
        etymology:
          "Early 20th century, from German 'ambivalent', from Latin 'ambi-' (both) + 'valentia' (strength).",
        pronunciation: "dis-par-ate",
        ipa: "/ˈdɪspərət/",
        partOfSpeech: "adjective",
        date: "2026-02-24",
        synonyms: ["conflicted", "uncertain", "unsure", "torn"],
        antonyms: ["certain", "decisive", "resolute", "unwavering"],
        related: ["indecisive", "equivocal", "doubtful", "wavering"],
        translations: {
          de: ["ambivalent"],
          fr: ["ambivalent"],
          es: ["ambivalente"],
          it: ["ambivalente"],
        },
      },
      ameliorate: {
        lexeme: "ameliorate",
        id: 4742802,
        definition: "To make something better or improve a situation.",
        example:
          "The new policies were designed to ameliorate the living conditions of the urban poor.",
        etymology:
          "From Latin 'ameliorare', meaning 'to make better', derived from 'melior' (better).",
        pronunciation: "dis-pas-sion-ate",
        ipa: "/dɪsˈpæʃənət/",
        partOfSpeech: "verb",
        date: "2025-09-11",
        synonyms: ["improve", "enhance", "better", "upgrade"],
        antonyms: ["worsen", "deteriorate", "aggravate"],
        related: ["improvement", "enhancement", "betterment"],
        translations: {
          de: ["verbessern"],
          fr: ["améliorer"],
          es: ["mejorar"],
          it: ["migliorare"],
        },
      },
      amicable: {
        lexeme: "amicable",
        id: 3600531,
        definition: "Characterized by friendliness and absence of discord.",
        example:
          "The two nations reached an amicable agreement on the border dispute.",
        etymology:
          "From Latin 'amicabilis', meaning 'friendly', derived from 'amicus' (friend).",
        pronunciation: "dis-pel",
        ipa: "/dɪˈspɛl/",
        partOfSpeech: "adjective",
        date: "2025-03-26",
        synonyms: ["friendly", "cordial", "harmonious", "peaceable"],
        antonyms: ["hostile", "antagonistic", "contentious"],
        related: ["amicability", "amicableness", "amity"],
        translations: {
          de: ["freundschaftlich"],
          fr: ["amical"],
          es: ["amistoso"],
          it: ["amichevole"],
        },
      },
      amorphous: {
        lexeme: "amorphous",
        id: 9986165,
        definition: "Lacking a definite form or clear shape.",
        example: "The amorphous blob of clay could be molded into any shape.",
        etymology:
          "From Greek 'amorphos' (without form), from 'a-' (without) + 'morphē' (form).",
        pronunciation: "dis-sem-ble",
        ipa: "/dɪˈsɛmbəl/",
        partOfSpeech: "adjective",
        date: "2025-09-28",
        synonyms: ["shapeless", "formless", "indistinct", "vague"],
        antonyms: ["defined", "structured", "distinct", "clear"],
        related: ["amorphously", "amorphousness", "amorphism"],
        translations: {
          de: ["amorph"],
          fr: ["amorphe"],
          es: ["amorfo"],
          it: ["amorfo"],
        },
      },
      anachronism: {
        lexeme: "anachronism",
        id: 5918420,
        definition:
          "A thing belonging or appropriate to a period other than that in which it exists, especially a thing that is conspicuously old-fashioned.",
        example: "The steam engine in the medieval castle was an anachronism.",
        etymology:
          "From Greek 'ana-' (against) + 'chronos' (time), via French 'anachronisme'.",
        pronunciation: "dis-sem-i-nate",
        ipa: "/dɪˈsɛmɪˌneɪt/",
        partOfSpeech: "noun",
        date: "2026-01-27",
        synonyms: ["misplacement", "chronological error", "incongruity"],
        antonyms: ["contemporaneity", "synchrony"],
        related: ["archaism", "outdated", "throwback"],
        translations: {
          de: ["Anachronismus"],
          fr: ["anachronisme"],
          es: ["anacronismo"],
          it: ["anacronismo"],
        },
      },
      analogous: {
        lexeme: "analogous",
        id: 6595391,
        definition:
          "Similar or comparable in certain respects, typically in a way that makes clearer the nature of the things compared.",
        example:
          "The wings of a bat and the arms of a human are analogous structures.",
        etymology:
          "From Latin 'analogus', from Greek 'analogos' (proportionate), from 'ana-' (according to) + 'logos' (ratio).",
        pronunciation: "dis-so-nance",
        ipa: "/ˈdɪsənəns/",
        partOfSpeech: "adjective",
        date: "2025-09-05",
        synonyms: ["similar", "comparable", "parallel", "corresponding"],
        antonyms: ["dissimilar", "unrelated", "different"],
        related: ["analogy", "analogue", "homologous"],
        translations: {
          de: ["analog"],
          fr: ["analogue"],
          es: ["análogo"],
          it: ["analogo"],
        },
      },
      anathema: {
        lexeme: "anathema",
        id: 8651538,
        definition:
          "Something or someone that is intensely disliked or loathed; a formal curse by a church.",
        example:
          "The idea of eating meat was anathema to the strict vegetarian.",
        etymology:
          "From Late Latin 'anathema' (excommunicated person, curse), from Greek 'anathema' (something devoted to evil, curse), from 'anatithenai' (to dedicate).",
        pronunciation: "dis-so-nant",
        ipa: "/ˈdɪsənənt/",
        partOfSpeech: "noun",
        date: "2025-06-15",
        synonyms: ["abomination", "detestation", "abhorrence"],
        antonyms: ["beloved", "darling", "favorite"],
        related: ["curse", "ban", "excommunication"],
        translations: {
          de: ["Fluch"],
          fr: ["anathème"],
          es: ["anatema"],
          it: ["anatema"],
        },
      },
      androit: {
        lexeme: "androit",
        id: 8713407,
        definition: "Skillful or clever in using the hands or mind; dexterous.",
        example: "She was adroit at solving complex puzzles quickly.",
        etymology:
          "From French 'adroit', meaning 'skillful', from the phrase 'à droit' ('according to right').",
        pronunciation: "dis-suade",
        ipa: "/dɪˈsweɪd/",
        partOfSpeech: "adjective",
        date: "2025-06-30",
        synonyms: ["dexterous", "skillful", "nimble", "clever", "handy"],
        antonyms: ["clumsy", "awkward", "inept", "unskillful"],
        related: ["agile", "proficient", "adept", "expert"],
        translations: {
          de: ["geschickt"],
          fr: ["adroit"],
          es: ["hábil"],
          it: ["abile"],
        },
      },
      animosity: {
        lexeme: "animosity",
        id: 3900843,
        definition: "Strong hostility or antagonism.",
        example:
          "The animosity between the two rival gangs led to frequent clashes.",
        etymology:
          "From Middle French 'animosite', from Latin 'animositas' (boldness, spirit), derived from 'animus' (mind, spirit).",
        pronunciation: "dis-tend",
        ipa: "/dɪˈstɛnd/",
        partOfSpeech: "noun",
        date: "2025-12-22",
        synonyms: ["hostility", "antagonism", "enmity", "hatred"],
        antonyms: ["friendship", "amity", "harmony", "affection"],
        related: ["resentment", "grudge", "rancor", "bitterness"],
        translations: {
          de: ["Feindseligkeit"],
          fr: ["animosité"],
          es: ["animosidad"],
          it: ["animosità"],
        },
      },
      anodyne: {
        lexeme: "anodyne",
        id: 6410330,
        definition:
          "Not likely to provoke dissent or offense; inoffensive, often deliberately so.",
        example:
          "The politician's speech was filled with anodyne statements to avoid controversy.",
        etymology:
          "From Latin 'anodynus', from Greek 'anōdynos' ('without pain'), from 'an-' ('without') + 'odynē' ('pain').",
        pronunciation: "di-vulge",
        ipa: "/dɪˈvʌldʒ/",
        partOfSpeech: "adjective",
        date: "2025-07-14",
        synonyms: ["inoffensive", "bland", "neutral", "harmless"],
        antonyms: ["provocative", "controversial", "offensive"],
        related: ["banal", "insipid", "unobjectionable"],
        translations: {
          de: ["harmlos"],
          fr: ["anodin"],
          es: ["anodino"],
          it: ["anodino"],
        },
      },
      anomalous: {
        lexeme: "anomalous",
        id: 5644585,
        definition: "Deviating from what is standard, normal, or expected.",
        example:
          "The scientist observed anomalous behavior in the experiment's results.",
        etymology:
          "From Greek 'anomalos' (uneven, irregular), from 'an-' (not) + 'omalos' (even).",
        pronunciation: "do-cile",
        ipa: "/ˈdaʊsaɪl/",
        partOfSpeech: "adjective",
        date: "2025-05-16",
        synonyms: ["abnormal", "irregular", "atypical", "unusual"],
        antonyms: ["normal", "typical", "regular", "standard"],
        related: ["anomaly", "aberration", "deviation"],
        translations: {
          de: ["anomal"],
          fr: ["anormal"],
          es: ["anómalo"],
          it: ["anomalo"],
        },
      },
      antediluvian: {
        lexeme: "antediluvian",
        id: 7725187,
        definition:
          "Extremely old or antiquated; belonging to the time before the biblical Flood.",
        example:
          "The professor's antediluvian views on gender roles were met with disbelief by the students.",
        etymology:
          "From Latin 'ante' (before) + 'diluvium' (flood), referring to the biblical Flood.",
        pronunciation: "dog-mat-ic",
        ipa: "/dɒɡˈmætɪk/",
        partOfSpeech: "adjective",
        date: "2025-05-07",
        synonyms: ["ancient", "archaic", "prehistoric", "obsolete"],
        antonyms: ["modern", "contemporary", "current", "up-to-date"],
        related: ["primordial", "timeworn", "venerable", "bygone"],
        translations: {
          de: ["vorsintflutlich"],
          fr: ["antédiluvien"],
          es: ["antediluviano"],
          it: ["antediluviano"],
        },
      },
      antipathy: {
        lexeme: "antipathy",
        id: 1996700,
        definition: "A deep-seated feeling of dislike or aversion.",
        example:
          "She felt a strong antipathy towards the new policy due to its unfair implications.",
        etymology:
          "From Greek 'antipatheia', from 'anti-' (against) + 'pathos' (feeling).",
        partOfSpeech: "noun",
        date: "2025-02-15",
        synonyms: ["aversion", "hostility", "animosity", "distaste"],
        antonyms: ["affinity", "fondness", "sympathy", "liking"],
        related: ["hatred", "repugnance", "disgust", "loathing"],
        translations: {
          de: ["Antipathie"],
          fr: ["antipathie"],
          es: ["antipatía"],
          it: ["antipatia"],
        },
      },
      antiquated: {
        lexeme: "antiquated",
        id: 9503259,
        definition: "Old-fashioned or outdated, no longer in current use.",
        example:
          "The antiquated computer system was replaced with modern technology.",
        etymology:
          "From Latin 'antiquatus', past participle of 'antiquare' (to make old), from 'antiquus' (old).",
        partOfSpeech: "adjective",
        date: "2025-09-30",
        synonyms: ["obsolete", "outdated", "archaic", "old-fashioned"],
        antonyms: ["modern", "current", "up-to-date", "contemporary"],
        related: ["vintage", "retro", "dated", "old"],
        translations: {
          de: ["veraltet"],
          fr: ["démodé"],
          es: ["anticuado"],
          it: ["antiquato"],
        },
      },
      antithesis: {
        lexeme: "antithesis",
        id: 7399750,
        definition:
          "The direct opposite of something; a contrast or opposition between two things.",
        example: "Love is the antithesis of selfishness.",
        etymology:
          "From Late Latin 'antithesis', from Greek 'antithesis' (opposition), from 'anti-' (against) + 'tithenai' (to place).",
        partOfSpeech: "noun",
        date: "2025-07-02",
        synonyms: ["opposite", "contrast", "reverse", "counter"],
        antonyms: ["same", "similarity", "agreement"],
        related: ["juxtaposition", "paradox", "contradiction", "dichotomy"],
        translations: {
          de: ["Antithese"],
          fr: ["antithèse"],
          es: ["antítesis"],
          it: ["antitesi"],
        },
      },
      apathy: {
        lexeme: "apathy",
        id: 4785391,
        definition: "Lack of interest, enthusiasm, or concern.",
        example:
          "His apathy towards the election results surprised his politically active friends.",
        etymology:
          "From Greek 'apatheia' (απάθεια), meaning 'without feeling', from 'a-' (without) + 'pathos' (feeling).",
        partOfSpeech: "noun",
        date: "2025-10-23",
        synonyms: ["indifference", "unconcern", "dispassion", "lethargy"],
        antonyms: ["enthusiasm", "passion", "concern", "interest"],
        related: ["emotion", "detachment", "stoicism", "numbness"],
        translations: {
          de: ["Apathie"],
          fr: ["apathie"],
          es: ["apatía"],
          it: ["apatia"],
        },
      },
      aphorism: {
        lexeme: "aphorism",
        id: 8167064,
        definition:
          "A concise statement of a principle or truth; a pithy observation.",
        example: '"Less is more" is a well-known aphorism in design.',
        etymology:
          "From Greek 'aphorismos' (definition), from 'aphorizein' (to define), from 'apo-' (from) + 'horizein' (to bound).",
        partOfSpeech: "noun",
        date: "2025-11-21",
        synonyms: ["maxim", "adage", "proverb", "saying", "axiom"],
        antonyms: ["rambling", "verbosity", "nonsense"],
        related: ["epigram", "dictum", "precept", "truism"],
        translations: {
          de: ["Aphorismus"],
          fr: ["aphorisme"],
          es: ["aforismo"],
          it: ["aforisma"],
        },
      },
      aplomb: {
        lexeme: "aplomb",
        id: 3575200,
        definition:
          "Self-confidence or assurance, especially in a demanding situation.",
        example: "She handled the difficult questions with great aplomb.",
        etymology:
          "From French 'aplomb' (literally 'perpendicularity'), from Old French 'a plomb' ('according to the plumb line'), based on Latin 'plumbum' ('lead').",
        partOfSpeech: "noun",
        date: "2025-04-24",
        synonyms: ["poise", "composure", "self-assurance", "confidence"],
        antonyms: ["nervousness", "uncertainty", "hesitation"],
        related: ["equanimity", "sangfroid", "steadiness"],
        translations: {
          de: ["Selbstsicherheit"],
          fr: ["aplomb"],
          es: ["aplomo"],
          it: ["aplomb"],
        },
      },
      apocryphal: {
        lexeme: "apocryphal",
        id: 6682307,
        definition:
          "Of doubtful authenticity, although widely circulated as being true.",
        example: "The story about the ghost in the old mansion is apocryphal.",
        etymology:
          "From Late Latin 'apocryphus' (hidden, spurious), from Greek 'apokryphos' (obscure), from 'apokryptein' (to hide away).",
        partOfSpeech: "adjective",
        date: "2025-03-06",
        synonyms: ["fictitious", "unverified", "questionable", "mythical"],
        antonyms: ["authentic", "verified", "factual", "genuine"],
        related: ["legendary", "dubious", "spurious", "fabricated"],
        translations: {
          de: ["apokryph"],
          fr: ["apocryphe"],
          es: ["apócrifo"],
          it: ["apocrifo"],
        },
      },
      apoplectic: {
        lexeme: "apoplectic",
        id: 8410313,
        definition: "Overcome with anger; extremely indignant.",
        example: "He was apoplectic when he discovered his car had been towed.",
        etymology:
          "From Late Latin 'apoplecticus', from Greek 'apoplēktikos', meaning 'struck down' (from 'apoplēssein', 'to strike down').",
        partOfSpeech: "adjective",
        date: "2026-04-04",
        synonyms: ["enraged", "furious", "incensed", "livid"],
        antonyms: ["calm", "composed", "serene"],
        related: ["rage", "outrage", "anger", "fury"],
        translations: {
          de: ["apoplektisch"],
          fr: ["apoplectique"],
          es: ["apopléjico"],
          it: ["apoplettico"],
        },
      },
      apposite: {
        lexeme: "apposite",
        id: 3390416,
        definition: "Highly appropriate or relevant to a particular situation.",
        example:
          "Her comments were apposite to the discussion about climate change.",
        etymology:
          "From Latin 'appositus', past participle of 'apponere' (to place near), from 'ad-' (to) + 'ponere' (to place).",
        partOfSpeech: "adjective",
        date: "2025-03-03",
        synonyms: ["pertinent", "relevant", "apt", "fitting", "suitable"],
        antonyms: ["irrelevant", "inappropriate", "unsuitable"],
        related: ["apropos", "germane", "applicable"],
        translations: {
          de: ["passend"],
          fr: ["approprié"],
          es: ["apropiado"],
          it: ["appropriato"],
        },
      },
      apprehensive: {
        lexeme: "apprehensive",
        id: 5613999,
        definition:
          "Anxious or fearful that something bad or unpleasant will happen.",
        example: "She felt apprehensive about the upcoming job interview.",
        etymology:
          "From Latin 'apprehendere' (to seize, grasp) + '-ive', via Old French 'apprehensif'.",
        partOfSpeech: "adjective",
        date: "2025-10-17",
        synonyms: ["anxious", "nervous", "worried", "uneasy"],
        antonyms: ["confident", "calm", "assured", "unconcerned"],
        related: ["fearful", "hesitant", "doubtful", "concerned"],
        translations: {
          de: ["besorgt"],
          fr: ["inquiet"],
          es: ["aprensivo"],
          it: ["apprensivo"],
        },
      },
      apropos: {
        lexeme: "apropos",
        id: 9710232,
        definition: "With reference to; concerning.",
        example:
          "Apropos of our earlier conversation, here's the document you requested.",
        etymology: "From French 'à propos', meaning 'to the purpose'.",
        partOfSpeech: "preposition",
        date: "2025-05-01",
        synonyms: ["regarding", "concerning", "respecting"],
        antonyms: ["irrelevant", "unrelated"],
        related: ["pertinent", "relevant", "applicable"],
        translations: {
          de: ["bezüglich"],
          fr: ["à propos"],
          es: ["a propósito"],
          it: ["a proposito"],
        },
      },
      arbitrary: {
        lexeme: "arbitrary",
        id: 910571,
        definition:
          "Based on random choice or personal whim, rather than any reason or system.",
        example:
          "The decision to paint the walls pink was completely arbitrary.",
        etymology:
          "From Middle English 'arbitrarie', from Latin 'arbitrarius' (depending on the will of an arbiter), from 'arbiter' (judge, supreme ruler).",
        partOfSpeech: "adjective",
        date: "2025-08-19",
        synonyms: ["random", "capricious", "whimsical", "unpredictable"],
        antonyms: ["rational", "reasoned", "systematic", "logical"],
        related: ["arbitrate", "arbitration", "arbiter"],
        translations: {
          de: ["willkürlich"],
          fr: ["arbitraire"],
          es: ["arbitrario"],
          it: ["arbitrario"],
        },
      },
      arcane: {
        lexeme: "arcane",
        id: 2461460,
        definition: "Understood by few; mysterious or secret.",
        example:
          "The ancient manuscript contained arcane symbols that puzzled historians.",
        etymology: "From Latin 'arcanus' (secret), from 'arca' (chest, box).",
        partOfSpeech: "adjective",
        date: "2025-07-22",
        synonyms: ["esoteric", "obscure", "cryptic", "recondite"],
        antonyms: ["common", "familiar", "simple", "clear"],
        related: ["mysterious", "hidden", "occult", "abstruse"],
        translations: {
          de: ["geheimnisvoll"],
          fr: ["arcane"],
          es: ["arcano"],
          it: ["arcano"],
        },
      },
      archetype: {
        lexeme: "archetype",
        id: 3195756,
        definition:
          "A very typical example of a certain person or thing; an original model or pattern.",
        example: "The hero's journey is a common archetype in literature.",
        etymology:
          "Mid 16th century: from Latin archetypum, from Greek arkhetupon 'something moulded first as a model', from arkhe- 'primitive' + tupos 'a model'.",
        partOfSpeech: "noun",
        date: "2025-08-21",
        synonyms: ["prototype", "model", "paradigm", "exemplar", "standard"],
        antonyms: ["anomaly", "aberration", "deviation"],
        related: ["stereotype", "template", "blueprint", "quintessence"],
        translations: {
          de: ["Archetyp"],
          fr: ["archétype"],
          es: ["arquetipo"],
          it: ["archetipo"],
        },
      },
      arduous: {
        lexeme: "arduous",
        id: 2251732,
        definition: "Requiring great effort; difficult and tiring.",
        example: "The climbers faced an arduous journey to the summit.",
        etymology: "From Latin 'arduus' meaning 'high, steep, difficult'.",
        partOfSpeech: "adjective",
        date: "2025-07-04",
        synonyms: ["strenuous", "laborious", "taxing", "demanding"],
        antonyms: ["easy", "effortless", "simple"],
        related: ["challenging", "grueling", "exhausting"],
        translations: {
          de: ["mühsam"],
          fr: ["ardu"],
          es: ["arduo"],
          it: ["arduo"],
        },
      },
      arrant: {
        lexeme: "arrant",
        id: 2293806,
        definition:
          "Complete, utter (used to emphasize the extent of something negative).",
        example: "That's arrant nonsense and you know it!",
        etymology:
          "Middle English, variant of 'errant' (wandering), from Old French 'errant', present participle of 'errer' (to wander). Over time, it evolved to mean 'notorious' or 'utter'.",
        partOfSpeech: "adjective",
        date: "2025-01-17",
        synonyms: ["utter", "absolute", "downright", "total"],
        antonyms: ["partial", "incomplete", "moderate"],
        related: ["egregious", "flagrant", "blatant"],
        translations: {
          de: ["völlig"],
          fr: ["pur et simple"],
          es: ["completo"],
          it: ["assoluto"],
        },
      },
      articulate: {
        lexeme: "articulate",
        id: 7991184,
        definition: "Expressing oneself clearly and effectively.",
        example:
          "She was able to articulate her thoughts on the matter with great clarity.",
        etymology:
          "From Latin 'articulatus', past participle of 'articulare' meaning 'to divide into joints, utter distinctly'.",
        partOfSpeech: "adjective",
        date: "2025-02-14",
        synonyms: ["eloquent", "fluent", "expressive"],
        antonyms: ["inarticulate", "mumbling", "unclear"],
        related: ["articulation", "articulately", "articulacy"],
        translations: {
          de: ["artikuliert"],
          fr: ["articulé"],
          es: ["articulado"],
          it: ["articolato"],
        },
      },
      ascertain: {
        lexeme: "ascertain",
        id: 9249927,
        definition: "To find out or learn with certainty.",
        example: "The detective worked to ascertain the truth about the crime.",
        etymology:
          "From Middle English 'ascertainen', from Old French 'acertener', based on Latin 'certus' (certain).",
        partOfSpeech: "verb",
        date: "2025-11-27",
        synonyms: ["determine", "verify", "discover", "confirm"],
        antonyms: ["guess", "assume", "suppose"],
        related: ["investigate", "establish", "prove"],
        translations: {
          de: ["feststellen"],
          fr: ["établir"],
          es: ["determinar"],
          it: ["accertare"],
        },
      },
      ascetic: {
        lexeme: "ascetic",
        id: 8474459,
        definition:
          "A person who practices severe self-discipline and abstains from indulgence, often for religious reasons.",
        example:
          "The ascetic monk lived in a bare cell, eating only bread and water.",
        etymology:
          "From Greek 'askētikos', meaning 'rigorously self-disciplined', from 'askētēs' (monk, hermit).",
        partOfSpeech: "noun",
        date: "2025-09-15",
        synonyms: ["hermit", "monk", "austerity practitioner", "recluse"],
        antonyms: ["hedonist", "pleasure-seeker", "indulgent"],
        related: ["austerity", "abstinence", "self-denial", "asceticism"],
        translations: {
          de: ["Asket"],
          fr: ["ascète"],
          es: ["asceta"],
          it: ["asceta"],
        },
      },
      asperity: {
        lexeme: "asperity",
        id: 7062995,
        definition: "Harshness or severity of tone, manner, or climate.",
        example: "The asperity of his criticism left her feeling disheartened.",
        etymology:
          "From Latin 'asperitas', meaning 'roughness', derived from 'asper' ('rough').",
        partOfSpeech: "noun",
        date: "2025-09-09",
        synonyms: ["harshness", "severity", "rigor", "acrimony"],
        antonyms: ["gentleness", "mildness", "softness"],
        related: ["acerbity", "bitterness", "sharpness"],
        translations: {
          de: ["Herbheit"],
          fr: ["âpreté"],
          es: ["aspereza"],
          it: ["asprezza"],
        },
      },
      assiduous: {
        lexeme: "assiduous",
        id: 408387,
        definition: "Showing great care, attention, and effort; diligent.",
        example:
          "She was assiduous in her studies, often working late into the night.",
        etymology:
          "From Latin 'assiduus', meaning 'constant, unremitting', from 'assidere' (to sit by or near).",
        partOfSpeech: "adjective",
        date: "2026-03-19",
        synonyms: [
          "diligent",
          "industrious",
          "persistent",
          "hardworking",
          "meticulous",
        ],
        antonyms: ["lazy", "negligent", "careless", "slack"],
        related: ["conscientious", "thorough", "painstaking", "dedicated"],
        translations: {
          de: ["fleißig"],
          fr: ["assidu"],
          es: ["asiduo"],
          it: ["assiduo"],
        },
      },
      assuage: {
        lexeme: "assuage",
        id: 3573237,
        definition: "To make an unpleasant feeling less intense.",
        example: "The apology did little to assuage her anger.",
        etymology:
          "From Old French 'assouagier', based on Latin 'assuaviare', from 'suavis' (sweet).",
        partOfSpeech: "verb",
        date: "2026-02-06",
        synonyms: ["alleviate", "mitigate", "relieve", "ease", "soothe"],
        antonyms: ["aggravate", "intensify", "worsen", "exacerbate"],
        related: ["comfort", "pacify", "calm", "appease", "mollify"],
        translations: {
          de: ["lindern"],
          fr: ["apaiser"],
          es: ["aliviar"],
          it: ["attenuare"],
        },
      },
      astute: {
        lexeme: "astute",
        id: 2545289,
        definition:
          "Having or showing an ability to accurately assess situations or people and turn this to one's advantage.",
        example:
          "Her astute observations about market trends helped the company avoid a financial crisis.",
        etymology:
          "From Latin 'astutus', meaning 'crafty, cunning', derived from 'astus' (craft, cunning).",
        partOfSpeech: "adjective",
        date: "2025-06-11",
        synonyms: ["shrewd", "perceptive", "sharp", "clever", "sagacious"],
        antonyms: ["naive", "gullible", "obtuse", "dense"],
        related: ["intelligent", "discerning", "insightful", "wise"],
        translations: {
          de: ["schlau"],
          fr: ["astucieux"],
          es: ["astuto"],
          it: ["astuto"],
        },
      },
      atavistic: {
        lexeme: "atavistic",
        id: 8263318,
        definition:
          "Relating to or characterized by reversion to something ancient or ancestral.",
        example:
          "His atavistic fear of snakes was a remnant of evolutionary survival instincts.",
        etymology:
          "From French 'atavisme', derived from Latin 'atavus' (ancestor), from 'at-' (beyond) + 'avus' (grandfather).",
        partOfSpeech: "adjective",
        date: "2025-08-01",
        synonyms: ["primitive", "ancestral", "archaic"],
        antonyms: ["modern", "progressive", "evolved"],
        related: ["instinctive", "hereditary", "throwback"],
        translations: {
          de: ["atavistisch"],
          fr: ["atavique"],
          es: ["atávico"],
          it: ["atavico"],
        },
      },
      audacious: {
        lexeme: "audacious",
        id: 164952,
        definition:
          "Showing a willingness to take bold risks; recklessly daring.",
        example:
          "Her audacious plan to climb the mountain alone impressed everyone.",
        etymology:
          "From Latin 'audax' (bold, daring), from 'audere' (to dare).",
        partOfSpeech: "adjective",
        date: "2025-12-01",
        synonyms: ["bold", "daring", "fearless", "brave", "intrepid"],
        antonyms: ["timid", "cautious", "cowardly", "fearful"],
        related: ["audacity", "audaciously", "reckless", "adventurous"],
        translations: {
          de: ["kühn"],
          fr: ["audacieux"],
          es: ["audaz"],
          it: ["audace"],
        },
      },
      augment: {
        lexeme: "augment",
        id: 3560281,
        definition: "To make something greater by adding to it; increase.",
        example: "She augmented her income by taking on freelance work.",
        etymology:
          "From Middle English 'augmenten', from Old French 'augmenter', from Latin 'augmentare' ('to increase'), from 'augere' ('to increase').",
        partOfSpeech: "verb",
        date: "2025-01-31",
        synonyms: ["increase", "expand", "enhance", "boost", "amplify"],
        antonyms: ["decrease", "diminish", "reduce", "lessen"],
        related: ["augmentation", "augmentative", "augmented"],
        translations: {
          de: ["vergrößern"],
          fr: ["augmenter"],
          es: ["aumentar"],
          it: ["aumentare"],
        },
      },
      auspicious: {
        lexeme: "auspicious",
        id: 1721396,
        definition: "Conducive to success; favorable.",
        example:
          "The clear sky was an auspicious sign for the outdoor wedding.",
        etymology:
          "From Latin 'auspicium' (divination by observing birds), from 'auspex' (bird observer).",
        partOfSpeech: "adjective",
        date: "2025-01-23",
        synonyms: ["favorable", "propitious", "promising", "optimistic"],
        antonyms: ["inauspicious", "unfavorable", "ominous"],
        related: ["auspices", "auspex", "omen", "portent"],
        translations: {
          de: ["vielversprechend"],
          fr: ["favorable"],
          es: ["propicio"],
          it: ["fausto"],
        },
      },
      austere: {
        lexeme: "austere",
        id: 8554444,
        definition:
          "Severe or strict in manner, attitude, or appearance; lacking adornment or luxury.",
        example:
          "The monastery's austere lifestyle required simplicity and discipline.",
        etymology:
          "From Old French 'austere', from Latin 'austerus' (harsh, severe), from Greek 'austēros' (bitter, harsh).",
        partOfSpeech: "adjective",
        date: "2025-12-23",
        synonyms: ["stern", "strict", "severe", "sober", "ascetic"],
        antonyms: ["indulgent", "luxurious", "ornate", "lavish"],
        related: ["asceticism", "rigor", "simplicity", "spartan"],
        translations: {
          de: ["streng"],
          fr: ["austère"],
          es: ["austero"],
          it: ["austero"],
        },
      },
      autonomous: {
        lexeme: "autonomous",
        id: 1298644,
        definition:
          "Having the freedom to govern itself or control its own affairs.",
        example:
          "The region became autonomous after years of political negotiations.",
        etymology:
          "From Greek 'autonomos' (auto- 'self' + nomos 'law'), meaning 'self-governing'.",
        partOfSpeech: "adjective",
        date: "2026-03-12",
        synonyms: ["independent", "self-governing", "sovereign"],
        antonyms: ["dependent", "subordinate", "controlled"],
        related: ["autonomy", "self-rule", "self-determination"],
        translations: {
          de: ["autonom"],
          fr: ["autonome"],
          es: ["autónomo"],
          it: ["autonomo"],
        },
      },
      avarice: {
        lexeme: "avarice",
        id: 5479236,
        definition: "Extreme greed for wealth or material gain.",
        example:
          "His avarice led him to exploit his workers for greater profits.",
        etymology:
          "From Old French 'avarice', from Latin 'avaritia' (greed), from 'avarus' (greedy).",
        partOfSpeech: "noun",
        date: "2025-05-30",
        synonyms: ["greed", "cupidity", "rapacity", "covetousness"],
        antonyms: ["generosity", "altruism", "philanthropy"],
        related: ["miserliness", "selfishness", "materialism"],
        translations: {
          de: ["Habsucht"],
          fr: ["avarice"],
          es: ["avaricia"],
          it: ["avarizia"],
        },
      },
      aver: {
        lexeme: "aver",
        id: 6879051,
        definition: "To assert or affirm with confidence.",
        example: "She averred that she had completed the task on time.",
        etymology:
          "From Old French 'averer', based on Latin 'ad-' (to) + 'verus' (true).",
        partOfSpeech: "verb",
        date: "2025-01-28",
        synonyms: ["assert", "declare", "affirm", "state"],
        antonyms: ["deny", "dispute", "contradict"],
        related: ["assertion", "affirmation", "declaration"],
        translations: {
          de: ["behaupten"],
          fr: ["affirmer"],
          es: ["afirmar"],
          it: ["affermare"],
        },
      },
      aversion: {
        lexeme: "aversion",
        id: 7659493,
        definition: "A strong dislike or disinclination towards something.",
        example:
          "She has an aversion to spicy food and avoids it at all costs.",
        etymology: "From Latin 'aversio(n-)', from 'avertere' (to turn away).",
        partOfSpeech: "noun",
        date: "2026-01-30",
        synonyms: ["dislike", "distaste", "antipathy", "repugnance"],
        antonyms: ["liking", "fondness", "affinity", "attraction"],
        related: ["hatred", "loathing", "reluctance", "avoidance"],
        translations: {
          de: ["Abneigung"],
          fr: ["aversion"],
          es: ["aversión"],
          it: ["avversione"],
        },
      },
      avid: {
        lexeme: "avid",
        id: 1584938,
        definition: "Having an intense enthusiasm or eagerness for something.",
        example: "She is an avid reader of science fiction novels.",
        etymology:
          "From Latin 'avidus' (eager, greedy), from 'avere' (to desire).",
        partOfSpeech: "adjective",
        date: "2025-12-11",
        synonyms: ["eager", "enthusiastic", "keen", "passionate"],
        antonyms: ["indifferent", "apathetic", "unenthusiastic"],
        related: ["zealous", "fervent", "dedicated"],
        translations: {
          de: ["begeistert"],
          fr: ["avide"],
          es: ["ávido"],
          it: ["avido"],
        },
      },
      axiom: {
        lexeme: "axiom",
        id: 2806073,
        definition:
          "A statement or proposition that is regarded as being self-evidently true.",
        example:
          "One of the key axioms in mathematics is that parallel lines never meet.",
        etymology:
          "From Greek 'axioma' meaning 'that which is thought worthy or fit' or 'a self-evident principle', from 'axios' (worthy).",
        partOfSpeech: "noun",
        date: "2025-12-13",
        synonyms: ["principle", "postulate", "maxim", "truism"],
        antonyms: ["paradox", "contradiction"],
        related: ["theorem", "corollary", "lemma", "dogma"],
        translations: {
          de: ["Axiom"],
          fr: ["axiome"],
          es: ["axioma"],
          it: ["assioma"],
        },
      },
      banal: {
        lexeme: "banal",
        id: 2571418,
        definition: "Lacking originality, freshness, or novelty; trite.",
        example:
          "The movie's plot was so banal that I could predict every twist.",
        etymology:
          "From French 'banal' (commonplace), originally referring to feudal services obligatory to a lord, from Old French 'ban' (proclamation).",
        partOfSpeech: "adjective",
        date: "2025-12-02",
        synonyms: ["clichéd", "hackneyed", "unoriginal", "commonplace"],
        antonyms: ["original", "fresh", "novel", "innovative"],
        related: ["trite", "mundane", "predictable", "stereotypical"],
        translations: {
          de: ["banal"],
          fr: ["banal"],
          es: ["banal"],
          it: ["banale"],
        },
      },
      beget: {
        lexeme: "beget",
        id: 4542932,
        definition: "To produce or cause to happen; to give rise to.",
        example: "The economic policies beget widespread prosperity.",
        etymology:
          "From Old English 'begietan', meaning 'to get, obtain'. Related to 'get'.",
        partOfSpeech: "verb",
        date: "2025-09-01",
        synonyms: ["generate", "produce", "engender", "spawn"],
        antonyms: ["prevent", "hinder", "stop"],
        related: ["create", "cause", "induce", "result in"],
        translations: {
          de: ["zeugen"],
          fr: ["engendrer"],
          es: ["engendrar"],
          it: ["generare"],
        },
      },
      belie: {
        lexeme: "belie",
        id: 2096950,
        definition:
          "To give a false impression of; to contradict or misrepresent.",
        example: "His calm demeanor belied the anxiety he felt inside.",
        etymology:
          "From Old English belēogan ('to deceive by lying'), from be- + lēogan ('to lie').",
        partOfSpeech: "verb",
        date: "2025-03-20",
        synonyms: ["misrepresent", "disguise", "mask", "conceal"],
        antonyms: ["reveal", "expose", "unmask", "disclose"],
        related: ["deceive", "contradict", "distort", "falsify"],
        translations: {
          de: ["widersprechen"],
          fr: ["démentir"],
          es: ["desmentir"],
          it: ["smentire"],
        },
      },
      bellicose: {
        lexeme: "bellicose",
        id: 9537953,
        definition: "Demonstrating aggression or willingness to fight.",
        example:
          "The leader's bellicose rhetoric escalated tensions between the two nations.",
        etymology:
          "From Latin 'bellicosus', meaning 'warlike', derived from 'bellum' (war).",
        partOfSpeech: "adjective",
        date: "2025-11-07",
        synonyms: ["aggressive", "belligerent", "combative", "warlike"],
        antonyms: ["peaceful", "pacific", "conciliatory", "amicable"],
        related: ["hostile", "militant", "pugnacious", "truculent"],
        translations: {
          de: ["kriegerisch"],
          fr: ["belliqueux"],
          es: ["belicoso"],
          it: ["bellicoso"],
        },
      },
      belligerent: {
        lexeme: "belligerent",
        id: 7133077,
        definition: "Hostile and aggressive; eager to fight.",
        example:
          "The belligerent tone of the debate made compromise impossible.",
        etymology:
          "From Latin 'belligerant-', present participle of 'belligerare' (to wage war), from 'bellum' (war) + 'gerere' (to wage).",
        partOfSpeech: "adjective",
        date: "2026-01-08",
        synonyms: [
          "combative",
          "aggressive",
          "hostile",
          "pugnacious",
          "contentious",
        ],
        antonyms: ["peaceful", "friendly", "cooperative", "conciliatory"],
        related: ["bellicose", "militant", "confrontational", "warlike"],
        translations: {
          de: ["streitsüchtig"],
          fr: ["belliqueux"],
          es: ["beligerante"],
          it: ["bellicoso"],
        },
      },
      benevolent: {
        lexeme: "benevolent",
        id: 2931176,
        definition: "Well meaning and kindly.",
        example: "The benevolent old man donated generously to the orphanage.",
        etymology:
          "From Latin 'benevolentem' (nominative 'benevolens'), meaning 'wishing well,' from 'bene' (well) + 'volens' (wishing).",
        partOfSpeech: "adjective",
        date: "2026-01-16",
        synonyms: [
          "kind",
          "compassionate",
          "charitable",
          "generous",
          "altruistic",
        ],
        antonyms: ["malevolent", "cruel", "selfish", "unkind"],
        related: ["benevolence", "beneficent", "philanthropic"],
        translations: {
          de: ["wohlwollend"],
          fr: ["bienveillant"],
          es: ["bondadoso"],
          it: ["benevolo"],
        },
      },
      benign: {
        lexeme: "benign",
        id: 3489319,
        definition: "Gentle and kind; not harmful in effect.",
        example:
          "The tumor was found to be benign, much to the patient's relief.",
        etymology:
          "From Latin 'benignus' (kind, good-natured), from 'bene' (well) + 'genus' (born).",
        partOfSpeech: "adjective",
        date: "2025-05-18",
        synonyms: ["kind", "gentle", "mild", "harmless"],
        antonyms: ["malignant", "harmful", "hostile"],
        related: ["benevolent", "benignity", "benignancy"],
        translations: {
          de: ["gutartig"],
          fr: ["bénin"],
          es: ["benigno"],
          it: ["benigno"],
        },
      },
      bequeath: {
        lexeme: "bequeath",
        id: 8559012,
        definition:
          "To leave or pass on personal property to someone after one's death, typically through a will.",
        example:
          "She decided to bequeath her entire estate to her favorite charity.",
        etymology:
          "From Old English 'becwethan', meaning 'to declare, give by will', composed of 'be-' (about) + 'cwethan' (to say).",
        partOfSpeech: "verb",
        date: "2026-02-10",
        synonyms: ["leave", "will", "hand down", "pass on"],
        antonyms: ["disinherit", "withhold"],
        related: ["inheritance", "legacy", "testament", "heirloom"],
        translations: {
          de: ["vermachen"],
          fr: ["léguer"],
          es: ["legar"],
          it: ["lasciare in eredità"],
        },
      },
      bifurcate: {
        lexeme: "bifurcate",
        id: 4450809,
        definition: "To divide into two branches or parts.",
        example:
          "The river bifurcates into two smaller streams near the village.",
        etymology:
          "From Latin 'bifurcatus', past participle of 'bifurcare' (to divide into two forks), from 'bi-' (two) + 'furca' (fork).",
        partOfSpeech: "verb",
        date: "2025-07-16",
        synonyms: ["split", "branch", "diverge", "fork"],
        antonyms: ["merge", "unite", "converge"],
        related: ["bifurcation", "ramify", "divide"],
        translations: {
          de: ["sich gabeln"],
          fr: ["bifurquer"],
          es: ["bifurcarse"],
          it: ["biforcarsi"],
        },
      },
      blithe: {
        lexeme: "blithe",
        id: 8094690,
        definition:
          "Showing a casual and cheerful indifference considered to be callous or improper.",
        example: "She had a blithe disregard for the rules.",
        etymology: "From Old English 'blīþe', meaning 'happy, gentle, kind'.",
        partOfSpeech: "adjective",
        date: "2025-10-03",
        synonyms: ["carefree", "lighthearted", "nonchalant"],
        antonyms: ["serious", "concerned", "somber"],
        related: ["cheerful", "joyful", "unconcerned"],
        translations: {
          de: ["unbekümmert"],
          fr: ["insouciant"],
          es: ["despreocupado"],
          it: ["spensierato"],
        },
      },
      bolster: {
        lexeme: "bolster",
        id: 3387247,
        definition: "To support, strengthen, or reinforce something.",
        example:
          "The new evidence will bolster the case against the defendant.",
        etymology:
          "From Old English 'bolster' (a cushion or support), from Proto-Germanic *bolstraz, related to *bolgiz (bag, swelling).",
        partOfSpeech: "verb",
        date: "2025-05-09",
        synonyms: ["strengthen", "reinforce", "support", "buttress", "prop up"],
        antonyms: ["weaken", "undermine", "sabotage", "hinder"],
        related: ["boost", "fortify", "uphold", "sustain"],
        translations: {
          de: ["stützen"],
          fr: ["renforcer"],
          es: ["reforzar"],
          it: ["rafforzare"],
        },
      },
      bombastic: {
        lexeme: "bombastic",
        id: 8368371,
        definition:
          "High-sounding but with little meaning; inflated; pretentious.",
        example:
          "The politician's bombastic speech was full of grandiose promises but lacked substance.",
        etymology:
          "From French 'bombastique', derived from 'bombace' (cotton padding), influenced by Latin 'bombax' (cotton). Originally referred to padded or inflated language.",
        partOfSpeech: "adjective",
        date: "2025-01-01",
        synonyms: ["pompous", "grandiloquent", "turgid", "overblown"],
        antonyms: ["modest", "unpretentious", "concise", "plain-spoken"],
        related: ["rhetoric", "verbose", "florid", "hyperbolic"],
        translations: {
          de: ["schwülstig"],
          fr: ["bombastique"],
          es: ["bombástico"],
          it: ["bombastico"],
        },
      },
      boon: {
        lexeme: "boon",
        id: 5247877,
        definition: "A thing that is helpful or beneficial.",
        example: "The rain was a boon to the farmers after the long drought.",
        etymology:
          "From Old Norse 'bón', meaning 'request, prayer', later evolving to mean 'a favor or benefit' in Middle English.",
        partOfSpeech: "noun",
        date: "2025-05-11",
        synonyms: ["blessing", "advantage", "gift", "benefit"],
        antonyms: ["curse", "disadvantage", "misfortune"],
        related: ["favor", "asset", "windfall", "godsend"],
        translations: {
          de: ["Segen"],
          fr: ["bénédiction"],
          es: ["bendición"],
          it: ["benedizione"],
        },
      },
      brevity: {
        lexeme: "brevity",
        id: 567857,
        definition: "The quality of being brief or concise in expression.",
        example: "The brevity of his speech left the audience wanting more.",
        etymology:
          "From Latin 'brevitas', meaning 'shortness', derived from 'brevis' (short).",
        partOfSpeech: "noun",
        date: "2025-08-16",
        synonyms: ["conciseness", "succinctness", "terseness", "pithiness"],
        antonyms: ["verbosity", "long-windedness", "prolixity"],
        related: ["concise", "short", "compact", "laconic"],
        translations: {
          de: ["Kürze"],
          fr: ["brièveté"],
          es: ["brevedad"],
          it: ["brevità"],
        },
      },
      bucolic: {
        lexeme: "bucolic",
        id: 8804795,
        definition:
          "Relating to the pleasant aspects of the countryside and country life.",
        example:
          "The artist painted a bucolic scene of shepherds tending their flocks in the rolling green hills.",
        etymology:
          "From Latin 'bucolicus', from Greek 'boukolikos' (pertaining to a herdsman), from 'boukolos' (herdsman).",
        partOfSpeech: "adjective",
        date: "2026-03-27",
        synonyms: ["pastoral", "rustic", "rural", "idyllic"],
        antonyms: ["urban", "metropolitan", "cosmopolitan"],
        related: ["agrarian", "countryside", "pastoral"],
        translations: {
          de: ["bukolisch"],
          fr: ["bucolique"],
          es: ["bucólico"],
          it: ["bucolico"],
        },
      },
      burgeon: {
        lexeme: "burgeon",
        id: 1025489,
        definition: "To grow or develop rapidly; flourish.",
        example: "The tech industry continues to burgeon with new innovations.",
        etymology:
          "From Middle English 'burjonen', from Old French 'borjoner', meaning 'to bud or sprout'.",
        partOfSpeech: "verb",
        date: "2025-02-05",
        synonyms: ["flourish", "thrive", "prosper", "expand", "bloom"],
        antonyms: ["decline", "wither", "shrink", "fade"],
        related: ["growth", "development", "proliferation", "boom"],
        translations: {
          de: ["aufblühen"],
          fr: ["prospérer"],
          es: ["florecer"],
          it: ["prosperare"],
        },
      },
      buttress: {
        lexeme: "buttress",
        id: 7893241,
        definition:
          "A projecting support of stone or brick built against a wall to strengthen or reinforce it.",
        example:
          "The ancient cathedral's walls were reinforced with massive buttresses to withstand the test of time.",
        etymology:
          "From Old French 'bouterez' (thrusting support), derived from 'buter' (to thrust), of Germanic origin.",
        partOfSpeech: "noun",
        date: "2025-04-03",
        synonyms: ["support", "prop", "brace", "reinforcement"],
        antonyms: ["weakness", "instability"],
        related: ["arch", "foundation", "pillar", "structure"],
        translations: {
          de: ["Strebepfeiler"],
          fr: ["contrefort"],
          es: ["contrafuerte"],
          it: ["contrafforte"],
        },
      },
      byzantine: {
        lexeme: "byzantine",
        id: 191674,
        definition:
          "Excessively complex or intricate, often to the point of being convoluted or difficult to understand.",
        example:
          "The company's byzantine bureaucracy made it nearly impossible to get approval for even the simplest requests.",
        etymology:
          "Derived from 'Byzantine,' referring to the Byzantine Empire (Eastern Roman Empire), known for its complex administrative and political systems.",
        partOfSpeech: "adjective",
        date: "2026-03-04",
        synonyms: [
          "convoluted",
          "complicated",
          "tangled",
          "labyrinthine",
          "involved",
        ],
        antonyms: ["simple", "straightforward", "clear", "uncomplicated"],
        related: ["intricate", "complex", "elaborate", "obscure"],
        translations: {
          de: ["byzantinisch"],
          fr: ["byzantin"],
          es: ["bizantino"],
          it: ["bizantino"],
        },
      },
      cacophony: {
        lexeme: "cacophony",
        id: 4605874,
        definition: "A harsh, discordant mixture of sounds.",
        example:
          "The cacophony of car horns and construction noise made it hard to concentrate.",
        etymology:
          "From Greek 'kakophonia', from 'kakos' (bad) + 'phone' (sound).",
        partOfSpeech: "noun",
        date: "2025-09-16",
        synonyms: ["discord", "din", "noise", "clamor"],
        antonyms: ["harmony", "melody", "euphony"],
        related: ["dissonance", "racket", "uproar"],
        translations: {
          de: ["Kakophonie"],
          fr: ["cacophonie"],
          es: ["cacofonía"],
          it: ["cacofonia"],
        },
      },
      cajole: {
        lexeme: "cajole",
        id: 2433837,
        definition:
          "To persuade someone to do something by sustained coaxing or flattery.",
        example:
          "She managed to cajole her brother into lending her the car for the weekend.",
        etymology:
          "From French 'cajoler', meaning 'to chatter, flatter', possibly of imitative origin.",
        partOfSpeech: "verb",
        date: "2025-09-13",
        synonyms: ["coax", "wheedle", "beguile", "flatter"],
        antonyms: ["bully", "intimidate", "force"],
        related: ["persuade", "entice", "manipulate"],
        translations: {
          de: ["schmeicheln"],
          fr: ["cajoler"],
          es: ["engatusar"],
          it: ["lusingare"],
        },
      },
      calamity: {
        lexeme: "calamity",
        id: 5843054,
        definition:
          "An event causing great and often sudden damage or distress; a disaster.",
        example: "The earthquake was a calamity that left thousands homeless.",
        etymology:
          "From Middle English 'calamite', from Old French, from Latin 'calamitas' meaning 'damage, loss, disaster'.",
        partOfSpeech: "noun",
        date: "2026-02-20",
        synonyms: ["disaster", "catastrophe", "tragedy", "misfortune"],
        antonyms: ["blessing", "fortune", "boon"],
        related: ["adversity", "havoc", "ruin", "devastation"],
        translations: {
          de: ["Katastrophe"],
          fr: ["calamité"],
          es: ["calamidad"],
          it: ["calamità"],
        },
      },
      callous: {
        lexeme: "callous",
        id: 9502100,
        definition:
          "Showing or having an insensitive and cruel disregard for others.",
        example:
          "His callous remarks about the victims' suffering shocked everyone.",
        etymology:
          "From Latin 'callosus' (hard-skinned), from 'callus' (hardened skin).",
        partOfSpeech: "adjective",
        date: "2026-01-03",
        synonyms: ["unfeeling", "heartless", "insensitive", "hardened"],
        antonyms: ["compassionate", "kind", "sympathetic", "tender"],
        related: ["indifferent", "ruthless", "cold-hearted", "unsympathetic"],
        translations: {
          de: ["gefühllos"],
          fr: ["insensible"],
          es: ["insensible"],
          it: ["insensibile"],
        },
      },
      candor: {
        lexeme: "candor",
        id: 3187433,
        definition:
          "The quality of being open and honest in expression; frankness.",
        example: "She appreciated his candor when he admitted his mistake.",
        etymology:
          "From Latin 'candor' (whiteness, purity, openness), from 'candere' (to shine, be white).",
        partOfSpeech: "noun",
        date: "2025-05-02",
        synonyms: ["frankness", "honesty", "directness", "sincerity"],
        antonyms: ["deceit", "dishonesty", "evasiveness", "guile"],
        related: [
          "transparency",
          "forthrightness",
          "bluntness",
          "authenticity",
        ],
        translations: {
          de: ["Offenheit"],
          fr: ["franchise"],
          es: ["franqueza"],
          it: ["franchezza"],
        },
      },
      capricious: {
        lexeme: "capricious",
        id: 490014,
        definition:
          "Given to sudden and unaccountable changes of mood or behavior.",
        example:
          "Her capricious nature made it difficult to predict her reactions.",
        etymology:
          "Early 17th century, from French 'capricieux', from Italian 'capriccioso', from 'capriccio' (whim, fancy), originally 'head with hair standing on end', later 'horror, sudden start', influenced by 'capra' (goat), from Latin 'caper' (goat).",
        partOfSpeech: "adjective",
        date: "2026-01-12",
        synonyms: ["fickle", "unpredictable", "whimsical", "mercurial"],
        antonyms: ["consistent", "steady", "predictable", "reliable"],
        related: ["volatile", "erratic", "impulsive"],
        translations: {
          de: ["launisch"],
          fr: ["capricieux"],
          es: ["caprichoso"],
          it: ["capriccioso"],
        },
      },
      castigate: {
        lexeme: "castigate",
        id: 3591533,
        definition: "To reprimand or criticize severely.",
        example: "The teacher castigated the student for cheating on the exam.",
        etymology:
          "From Latin 'castigare', meaning 'to correct, chastise', from 'castus' (pure) + 'agere' (to drive).",
        partOfSpeech: "verb",
        date: "2025-12-04",
        synonyms: ["rebuke", "scold", "chastise", "berate", "reprimand"],
        antonyms: ["praise", "commend", "applaud", "compliment"],
        related: ["punish", "discipline", "reprove", "condemn", "admonish"],
        translations: {
          de: ["rügen"],
          fr: ["réprimander"],
          es: ["reprender"],
          it: ["castigare"],
        },
      },
      catharsis: {
        lexeme: "catharsis",
        id: 9343925,
        definition:
          "The process of releasing, and thereby providing relief from, strong or repressed emotions.",
        example:
          "Watching the tragic play provided a catharsis for the audience, allowing them to release pent-up emotions.",
        etymology:
          "From Greek 'katharsis', meaning 'purification' or 'cleansing', derived from 'kathairein' (to purify).",
        partOfSpeech: "noun",
        date: "2025-05-05",
        synonyms: ["purgation", "release", "purification", "emotional release"],
        antonyms: ["repression", "suppression"],
        related: ["emotional", "healing", "cleansing", "psychology"],
        translations: {
          de: ["Katharsis"],
          fr: ["catharsis"],
          es: ["catarsis"],
          it: ["catarsi"],
        },
      },
      celerity: {
        lexeme: "celerity",
        id: 7077511,
        definition: "Swiftness or speed of movement or action.",
        example:
          "The emergency response team acted with remarkable celerity to evacuate the area.",
        etymology:
          "From Old French 'celerite', from Latin 'celeritas', meaning 'swiftness', derived from 'celer' (swift).",
        partOfSpeech: "noun",
        date: "2025-05-19",
        synonyms: ["swiftness", "speed", "rapidity", "quickness", "haste"],
        antonyms: ["slowness", "lethargy", "delay", "sluggishness"],
        related: ["velocity", "expedition", "alacrity", "promptness"],
        translations: {
          de: ["Schnelligkeit"],
          fr: ["célérité"],
          es: ["celeridad"],
          it: ["celerità"],
        },
      },
      censure: {
        lexeme: "censure",
        id: 546259,
        definition: "The expression of formal disapproval or severe criticism.",
        example:
          "The senator faced censure from his colleagues for his unethical behavior.",
        etymology:
          "From Latin 'censura', meaning 'judgment, opinion', from 'censor', an official who assessed conduct.",
        partOfSpeech: "noun",
        date: "2025-12-21",
        synonyms: ["condemnation", "rebuke", "reprimand", "criticism"],
        antonyms: ["praise", "approval", "commendation", "endorsement"],
        related: ["reproach", "denunciation", "disapproval", "admonishment"],
        translations: {
          de: ["Zensur"],
          fr: ["censure"],
          es: ["censura"],
          it: ["censura"],
        },
      },
      chagrin: {
        lexeme: "chagrin",
        id: 9007293,
        definition:
          "Distress or embarrassment at having failed or been humiliated.",
        example:
          "Much to his chagrin, he realized he had forgotten the report at home.",
        etymology:
          "From French 'chagrin', meaning 'sorrow', possibly from Turkish 'sağrı' (the back of a horse) via leather made from it, which was rough and caused discomfort.",
        partOfSpeech: "noun",
        date: "2025-11-30",
        synonyms: ["annoyance", "vexation", "irritation", "displeasure"],
        antonyms: ["delight", "joy", "pleasure", "satisfaction"],
        related: [
          "humiliation",
          "embarrassment",
          "frustration",
          "disappointment",
        ],
        translations: {
          de: ["Ärger"],
          fr: ["chagrin"],
          es: ["disgusto"],
          it: ["dispiacere"],
        },
      },
      charlatan: {
        lexeme: "charlatan",
        id: 8177379,
        definition:
          "A person falsely claiming to have a special knowledge or skill; a fraud.",
        example:
          "The self-proclaimed doctor was exposed as a charlatan when his treatments proved ineffective.",
        etymology:
          "From French 'charlatan', from Italian 'ciarlatano', possibly from 'ciarlare' (to chatter).",
        partOfSpeech: "noun",
        date: "2025-04-28",
        synonyms: ["impostor", "quack", "fraud", "fake", "swindler"],
        antonyms: ["expert", "professional", "genuine"],
        related: ["deception", "hoax", "con artist", "mountebank"],
        translations: {
          de: ["Scharlatan"],
          fr: ["charlatan"],
          es: ["charlatán"],
          it: ["ciarlatano"],
        },
      },
      chicanery: {
        lexeme: "chicanery",
        id: 1869894,
        definition:
          "The use of trickery or subterfuge to achieve a political, financial, or legal purpose.",
        example:
          "The lawyer was accused of chicanery when he manipulated the evidence to win the case.",
        etymology:
          "From French 'chicanerie', derived from 'chicaner' (to quibble), possibly of Germanic origin.",
        partOfSpeech: "noun",
        date: "2026-03-22",
        synonyms: ["deception", "trickery", "subterfuge", "duplicity"],
        antonyms: ["honesty", "fairness", "integrity"],
        related: ["guile", "fraud", "scheming", "artifice"],
        translations: {
          de: ["Trickserei"],
          fr: ["chicanerie"],
          es: ["chicanería"],
          it: ["inganno"],
        },
      },
      choleric: {
        lexeme: "choleric",
        id: 7741529,
        definition: "Easily angered; bad-tempered.",
        example: "His choleric outburst startled everyone in the meeting.",
        etymology:
          "From Middle English 'colerik', from Old French 'colerique', from Latin 'cholericus', from Greek 'kholerikos' (pertaining to bile, irascible), from 'kholē' (bile).",
        partOfSpeech: "adjective",
        date: "2025-10-21",
        synonyms: ["irritable", "hot-tempered", "quick-tempered", "testy"],
        antonyms: ["calm", "easygoing", "placid", "good-natured"],
        related: ["temper", "anger", "bile", "irascibility"],
        translations: {
          de: ["cholerisch"],
          fr: ["colérique"],
          es: ["colérico"],
          it: ["collerico"],
        },
      },
      churlish: {
        lexeme: "churlish",
        id: 8316540,
        definition:
          "Rude or ill-mannered; lacking in civility or graciousness.",
        example:
          "His churlish behavior at the dinner party offended several guests.",
        etymology:
          "From Old English 'ceorlisc', meaning 'of a churl' (a peasant or low-born person), which later evolved to imply boorishness.",
        partOfSpeech: "adjective",
        date: "2025-08-05",
        synonyms: ["boorish", "rude", "uncivil", "ill-mannered", "crass"],
        antonyms: ["polite", "courteous", "gracious", "refined", "gentlemanly"],
        related: ["surly", "gruff", "impolite", "discourteous", "ungracious"],
        translations: {
          de: ["flegelhaft"],
          fr: ["grossier"],
          es: ["grosero"],
          it: ["maleducato"],
        },
      },
      circumlocution: {
        lexeme: "circumlocution",
        id: 7049759,
        definition:
          "The use of many words where fewer would do, especially in a deliberate attempt to be vague or evasive.",
        example:
          "The politician's circumlocution avoided giving a direct answer to the question.",
        etymology:
          "From Latin 'circumlocutio', from 'circum-' (around) + 'loqui' (to speak).",
        partOfSpeech: "noun",
        date: "2026-02-17",
        synonyms: ["periphrasis", "verbosity", "indirectness", "wordiness"],
        antonyms: ["conciseness", "directness", "brevity", "succinctness"],
        related: ["euphemism", "ambiguity", "equivocation", "tautology"],
        translations: {
          de: ["Umschreibung"],
          fr: ["circonlocution"],
          es: ["circunlocución"],
          it: ["circonlocuzione"],
        },
      },
      circumspect: {
        lexeme: "circumspect",
        id: 1150135,
        definition: "Wary and unwilling to take risks; cautious.",
        example:
          "She was circumspect about sharing her personal information online.",
        etymology:
          "From Latin 'circumspectus', past participle of 'circumspicere' ('to look around'), from 'circum-' ('around') + 'specere' ('to look').",
        partOfSpeech: "adjective",
        date: "2025-01-12",
        synonyms: ["cautious", "prudent", "wary", "careful"],
        antonyms: ["reckless", "rash", "careless"],
        related: ["vigilant", "discreet", "judicious", "guarded"],
        translations: {
          de: ["umsichtig"],
          fr: ["circonspect"],
          es: ["circunspecto"],
          it: ["circospetto"],
        },
      },
      clairvoyant: {
        lexeme: "clairvoyant",
        id: 9711543,
        definition:
          "A person who claims to have the ability to perceive events in the future or beyond normal sensory contact.",
        example:
          "The clairvoyant predicted that the missing necklace would be found under the bed.",
        etymology:
          "From French 'clair' (clear) + 'voyant' (seeing), from Latin 'clarus' (clear) + 'vidēre' (to see).",
        partOfSpeech: "noun",
        date: "2026-02-09",
        synonyms: ["psychic", "seer", "fortune teller", "prophet", "visionary"],
        antonyms: ["skeptic", "realist", "nonbeliever"],
        related: [
          "intuition",
          "premonition",
          "divination",
          "extrasensory perception",
        ],
        translations: {
          de: ["Hellseher"],
          fr: ["clairvoyant"],
          es: ["clarividente"],
          it: ["chiaroveggente"],
        },
      },
      clandestine: {
        lexeme: "clandestine",
        id: 905810,
        definition:
          "Kept secret or done secretively, especially because illicit.",
        example: "The group held clandestine meetings to plan their protest.",
        etymology:
          "From Latin 'clandestinus', meaning 'secret', from 'clam' (secretly).",
        partOfSpeech: "adjective",
        date: "2026-04-07",
        synonyms: ["secret", "covert", "surreptitious", "undercover", "hidden"],
        antonyms: ["open", "overt", "public", "known"],
        related: ["stealthy", "furtive", "concealed", "unrevealed"],
        translations: {
          de: ["heimlich"],
          fr: ["clandestin"],
          es: ["clandestino"],
          it: ["clandestino"],
        },
      },
      clemency: {
        lexeme: "clemency",
        id: 6683194,
        definition:
          "Mercy or leniency, especially in the context of punishment or judgment.",
        example:
          "The governor granted clemency to the prisoner, reducing his sentence.",
        etymology:
          "From Latin 'clementia', meaning 'mildness' or 'gentleness', derived from 'clemens' (gentle, merciful).",
        partOfSpeech: "noun",
        date: "2025-07-24",
        synonyms: ["mercy", "leniency", "compassion", "forgiveness", "pardon"],
        antonyms: ["severity", "harshness", "cruelty", "ruthlessness"],
        related: ["reprieve", "amnesty", "grace", "humanity", "benevolence"],
        translations: {
          de: ["Gnade"],
          fr: ["clémence"],
          es: ["clemencia"],
          it: ["clemenza"],
        },
      },
      coalesce: {
        lexeme: "coalesce",
        id: 3640266,
        definition: "To come together to form one whole; to merge or unite.",
        example:
          "The two companies decided to coalesce their resources to tackle the project.",
        etymology:
          "From Latin 'coalescere', meaning 'to grow together', from 'co-' (together) + 'alescere' (to grow).",
        partOfSpeech: "verb",
        date: "2025-04-10",
        synonyms: ["merge", "unite", "combine", "fuse", "amalgamate"],
        antonyms: ["separate", "divide", "disperse", "disunite"],
        related: ["converge", "integrate", "consolidate", "blend"],
        translations: {
          de: ["verschmelzen"],
          fr: ["fusionner"],
          es: ["fusionarse"],
          it: ["coalescere"],
        },
      },
      coddle: {
        lexeme: "coddle",
        id: 7742910,
        definition: "To treat someone in an indulgent or overprotective way.",
        example:
          "She tends to coddle her children, rarely letting them face any challenges on their own.",
        etymology:
          "From Middle English 'codelen', possibly derived from 'codd', meaning 'warm drink' or 'broth', influenced by the idea of pampering like a delicate dish.",
        partOfSpeech: "verb",
        date: "2025-10-24",
        synonyms: ["pamper", "spoil", "indulge", "baby"],
        antonyms: ["neglect", "harden", "toughen", "discipline"],
        related: ["overprotect", "mollycoddle", "dote", "cosset"],
        translations: {
          de: ["verwöhnen"],
          fr: ["dorloter"],
          es: ["mimar"],
          it: ["vezzeggiare"],
        },
      },
      cogent: {
        lexeme: "cogent",
        id: 3689418,
        definition: "Clear, logical, and convincing.",
        example:
          "She presented a cogent argument that persuaded the committee to approve the proposal.",
        etymology:
          "From Latin 'cogent-', present participle of 'cogere' (to compel, gather together), from 'co-' (together) + 'agere' (to drive).",
        partOfSpeech: "adjective",
        date: "2025-12-29",
        synonyms: ["persuasive", "compelling", "convincing", "forceful"],
        antonyms: ["weak", "unconvincing", "implausible"],
        related: ["logical", "rational", "coherent", "valid"],
        translations: {
          de: ["überzeugend"],
          fr: ["convaincant"],
          es: ["convincente"],
          it: ["convincente"],
        },
      },
      coherent: {
        lexeme: "coherent",
        id: 7695254,
        definition: "Logical and consistent; clearly articulated.",
        example: "Her argument was coherent and well-supported by evidence.",
        etymology:
          "From Latin 'cohaerent-', present participle of 'cohaerere' (to stick together), from 'co-' (together) + 'haerere' (to stick).",
        partOfSpeech: "adjective",
        date: "2025-05-17",
        synonyms: ["logical", "consistent", "lucid", "rational"],
        antonyms: ["incoherent", "illogical", "confused"],
        related: ["coherence", "cohesion", "clarity"],
        translations: {
          de: ["kohärent"],
          fr: ["cohérent"],
          es: ["coherente"],
          it: ["coerente"],
        },
      },
      collusion: {
        lexeme: "collusion",
        id: 9610523,
        definition:
          "Secret or illegal cooperation or conspiracy, especially in order to cheat or deceive others.",
        example:
          "The two companies were accused of collusion to fix prices and eliminate competition.",
        etymology:
          "From Latin 'collusionem' (nominative 'collusio'), meaning 'a secret agreement,' from 'colludere' ('to play with, conspire'), combining 'com-' ('with') and 'ludere' ('to play').",
        partOfSpeech: "noun",
        date: "2025-02-27",
        synonyms: [
          "conspiracy",
          "connivance",
          "complicity",
          "intrigue",
          "scheming",
        ],
        antonyms: ["honesty", "fairness", "transparency", "independence"],
        related: [
          "fraud",
          "deception",
          "plot",
          "cooperation",
          "secret agreement",
        ],
        translations: {
          de: ["Absprache"],
          fr: ["collusion"],
          es: ["colusión"],
          it: ["collusione"],
        },
      },
      commensurate: {
        lexeme: "commensurate",
        id: 7477548,
        definition: "Corresponding in size, degree, or proportion; adequate.",
        example: "The punishment should be commensurate with the crime.",
        etymology:
          "From Latin 'commensuratus', past participle of 'commensurare' (to measure together), from 'com-' (together) + 'mensurare' (to measure).",
        partOfSpeech: "adjective",
        date: "2025-04-20",
        synonyms: [
          "proportional",
          "corresponding",
          "equivalent",
          "appropriate",
        ],
        antonyms: ["disproportionate", "inadequate", "unequal"],
        related: ["commensurable", "commensuration", "proportionate"],
        translations: {
          de: ["angemessen"],
          fr: ["commensurable"],
          es: ["proporcionado"],
          it: ["commisurato"],
        },
      },
      commiserate: {
        lexeme: "commiserate",
        id: 591440,
        definition: "To express sympathy or sorrow for someone's misfortune.",
        example:
          "After hearing about her friend's loss, she called to commiserate with her.",
        etymology:
          "From Latin 'commiserari', from 'com-' (with) + 'miserari' (to pity), from 'miser' (wretched).",
        partOfSpeech: "verb",
        date: "2025-04-13",
        synonyms: ["sympathize", "empathize", "console", "condole"],
        antonyms: ["disregard", "ignore", "celebrate"],
        related: ["compassion", "pity", "condolence", "solidarity"],
        translations: {
          de: ["mitfühlen"],
          fr: ["compatir"],
          es: ["compadecer"],
          it: ["commiserare"],
        },
      },
      compendium: {
        lexeme: "compendium",
        id: 7478168,
        definition:
          "A concise collection of information, often summarized from a larger work.",
        example:
          "The professor provided a compendium of key concepts for the final exam.",
        etymology:
          "From Latin 'compendium', meaning 'saving, gain, or shortening', from 'com-' (together) + 'pendere' (to weigh).",
        partOfSpeech: "noun",
        date: "2025-07-10",
        synonyms: ["summary", "digest", "abridgment", "synopsis"],
        antonyms: ["expansion", "elaboration", "full text"],
        related: ["compilation", "handbook", "manual", "anthology"],
        translations: {
          de: ["Kompaktwerk"],
          fr: ["compendium"],
          es: ["compendio"],
          it: ["compendio"],
        },
      },
      complacent: {
        lexeme: "complacent",
        id: 1853913,
        definition:
          "Showing smug or uncritical satisfaction with oneself or one's achievements.",
        example:
          "After winning the award, she became complacent and stopped putting in effort.",
        etymology:
          "From Latin 'complacēre' (to please greatly), from 'com-' (intensive) + 'placēre' (to please).",
        partOfSpeech: "adjective",
        date: "2025-07-26",
        synonyms: ["smug", "self-satisfied", "contented", "unconcerned"],
        antonyms: ["ambitious", "dissatisfied", "humble", "striving"],
        related: [
          "complacency",
          "satisfaction",
          "overconfidence",
          "indifference",
        ],
        translations: {
          de: ["selbstzufrieden"],
          fr: ["complaisant"],
          es: ["complaciente"],
          it: ["compiaciuto"],
        },
      },
      complaisant: {
        lexeme: "complaisant",
        id: 1787756,
        definition: "Willing to please others; obliging.",
        example:
          "She was complaisant and agreed to help with the project despite her busy schedule.",
        etymology:
          "From French 'complaisant', present participle of 'complaire' (to please), from Latin 'complacere' (to please greatly).",
        partOfSpeech: "adjective",
        date: "2025-10-05",
        synonyms: ["accommodating", "agreeable", "obliging", "amiable"],
        antonyms: ["stubborn", "uncooperative", "inflexible"],
        related: ["complacency", "complaisance", "pleasing"],
        translations: {
          de: ["entgegenkommend"],
          fr: ["complaisant"],
          es: ["complaciente"],
          it: ["comprensivo"],
        },
      },
      concur: {
        lexeme: "concur",
        id: 7479653,
        definition: "To agree or be of the same opinion.",
        example: "The committee members concur with the proposed changes.",
        etymology:
          "From Latin 'concurrere', meaning 'to run together, meet, agree' (con- 'together' + currere 'to run').",
        partOfSpeech: "verb",
        date: "2025-04-14",
        synonyms: ["agree", "accord", "harmonize", "assent"],
        antonyms: ["disagree", "dissent", "oppose"],
        related: ["consensus", "concurrence", "unanimity"],
        translations: {
          de: ["übereinstimmen"],
          fr: ["concorder"],
          es: ["coincidir"],
          it: ["concordare"],
        },
      },
      condone: {
        lexeme: "condone",
        id: 4343844,
        definition:
          "To overlook, forgive, or disregard an offense without protest or punishment.",
        example:
          "The teacher chose to condone the student's tardiness due to the heavy rain.",
        etymology:
          "From Latin 'condonare', meaning 'to give up, remit, or pardon', from 'con-' (altogether) + 'donare' (to give).",
        partOfSpeech: "verb",
        date: "2025-11-24",
        synonyms: ["forgive", "overlook", "excuse", "pardon", "ignore"],
        antonyms: ["condemn", "punish", "denounce", "censure", "disapprove"],
        related: ["tolerate", "allow", "accept", "endure", "permit"],
        translations: {
          de: ["verzeihen"],
          fr: ["tolérer"],
          es: ["condonar"],
          it: ["condonare"],
        },
      },
      confabulate: {
        lexeme: "confabulate",
        id: 1918658,
        definition: "To engage in conversation; to chat informally.",
        example:
          "The old friends would often confabulate over coffee about their shared memories.",
        etymology:
          "From Latin 'confabulari', meaning 'to converse', from 'con-' (together) + 'fabulari' (to talk).",
        partOfSpeech: "verb",
        date: "2026-03-01",
        synonyms: ["chat", "converse", "gossip", "chitchat"],
        antonyms: ["listen", "silence", "ignore"],
        related: ["discuss", "communicate", "natter"],
        translations: {
          de: ["plaudern"],
          fr: ["bavarder"],
          es: ["charlar"],
          it: ["chiacchierare"],
        },
      },
      conflagration: {
        lexeme: "conflagration",
        id: 6393339,
        definition: "A large, destructive fire that causes extensive damage.",
        example: "The conflagration consumed the entire forest within hours.",
        etymology:
          "From Latin 'conflagratio', from 'conflagrare' (to burn up), from 'com-' (intensive) + 'flagrare' (to burn).",
        partOfSpeech: "noun",
        date: "2025-05-23",
        synonyms: ["inferno", "blaze", "wildfire", "holocaust"],
        antonyms: ["extinguishment", "quenching"],
        related: ["fire", "combustion", "flames", "arson"],
        translations: {
          de: ["Feuersbrunst"],
          fr: ["conflagration"],
          es: ["conflagración"],
          it: ["conflagrazione"],
        },
      },
      conflate: {
        lexeme: "conflate",
        id: 632506,
        definition:
          "To combine two or more ideas, texts, or pieces of information into one.",
        example:
          "Critics accused the author of conflating historical facts with fictional elements in the novel.",
        etymology:
          "From Latin 'conflatus', past participle of 'conflare', meaning 'to blow together, fuse' (from 'com-' + 'flare', 'to blow').",
        partOfSpeech: "verb",
        date: "2026-02-02",
        synonyms: ["merge", "blend", "fuse", "amalgamate"],
        antonyms: ["separate", "distinguish", "differentiate"],
        related: ["confuse", "integrate", "unify"],
        translations: {
          de: ["zusammenführen"],
          fr: ["fusionner"],
          es: ["fusionar"],
          it: ["fondere"],
        },
      },
      confluence: {
        lexeme: "confluence",
        id: 1632456,
        definition:
          "The junction of two rivers, or the coming together of people or things.",
        example:
          "The confluence of the Mississippi and Missouri Rivers is a significant landmark.",
        etymology:
          "From Latin 'confluentia', meaning 'a flowing together', from 'con-' (together) + 'fluere' (to flow).",
        partOfSpeech: "noun",
        date: "2025-02-02",
        synonyms: ["convergence", "junction", "meeting", "merging"],
        antonyms: ["divergence", "separation"],
        related: ["conflux", "intersection", "amalgamation"],
        translations: {
          de: ["Zusammenfluss"],
          fr: ["confluence"],
          es: ["confluencia"],
          it: ["confluenza"],
        },
      },
      congenial: {
        lexeme: "congenial",
        id: 867143,
        definition:
          "Pleasant or agreeable because of a personality, qualities, or interests that are similar to one's own.",
        example:
          "She found the small town to be very congenial to her quiet lifestyle.",
        etymology:
          "From Latin 'congenialis', from 'con-' (together) + 'genialis' (pertaining to genius or natural disposition).",
        partOfSpeech: "adjective",
        date: "2026-01-23",
        synonyms: [
          "compatible",
          "harmonious",
          "agreeable",
          "pleasant",
          "amicable",
        ],
        antonyms: ["incompatible", "disagreeable", "unpleasant", "hostile"],
        related: ["genial", "affable", "convivial", "sociable"],
        translations: {
          de: ["angenehm, sympathisch"],
          fr: ["sympathique, agréable"],
          es: ["agradable, afín"],
          it: ["piacevole, congeniale"],
        },
      },
      conjecture: {
        lexeme: "conjecture",
        id: 9311788,
        definition:
          "An opinion or conclusion formed on the basis of incomplete information.",
        example:
          "Her conjecture about the missing documents turned out to be correct.",
        etymology:
          "From Latin 'conjectura', meaning 'inference, guess', from 'conicere' (to throw together, infer).",
        partOfSpeech: "noun",
        date: "2026-01-26",
        synonyms: ["guess", "speculation", "hypothesis", "supposition"],
        antonyms: ["fact", "certainty", "proof"],
        related: ["inference", "assumption", "theory", "presumption"],
        translations: {
          de: ["Vermutung"],
          fr: ["conjecture"],
          es: ["conjetura"],
          it: ["congettura"],
        },
      },
      conspicuous: {
        lexeme: "conspicuous",
        id: 2412018,
        definition: "Easily seen or noticed; standing out.",
        example: "Her bright red coat made her conspicuous in the crowd.",
        etymology:
          "From Latin 'conspicuus' (visible, striking), from 'conspicere' (to look at attentively).",
        partOfSpeech: "adjective",
        date: "2025-10-04",
        synonyms: ["noticeable", "prominent", "obvious", "striking"],
        antonyms: ["inconspicuous", "unnoticeable", "hidden"],
        related: ["visible", "distinct", "blatant", "overt"],
        translations: {
          de: ["auffällig"],
          fr: ["visible"],
          es: ["visible"],
          it: ["vistoso"],
        },
      },
      consummate: {
        lexeme: "consummate",
        id: 1598191,
        definition: "To complete or make perfect; to fulfill.",
        example:
          "After years of practice, she was able to consummate her skills as a pianist.",
        etymology:
          "From Latin 'consummatus', past participle of 'consummare' ('to sum up, finish'), from 'com-' ('together') + 'summa' ('sum, total').",
        partOfSpeech: "verb",
        date: "2025-08-17",
        synonyms: ["complete", "perfect", "accomplish", "achieve"],
        antonyms: ["begin", "start", "initiate", "ruin"],
        related: ["consummation", "consummatory", "consummately"],
        translations: {
          de: ["vollenden"],
          fr: ["parfaire"],
          es: ["consumar"],
          it: ["compiere"],
        },
      },
      contentious: {
        lexeme: "contentious",
        id: 6108467,
        definition: "Likely to cause disagreement or argument.",
        example: "The contentious debate over the new policy lasted for hours.",
        etymology:
          "From Latin 'contentiosus', meaning 'quarrelsome', derived from 'contentio' (strife, dispute).",
        partOfSpeech: "adjective",
        date: "2025-06-24",
        synonyms: [
          "controversial",
          "disputatious",
          "argumentative",
          "combative",
        ],
        antonyms: ["agreeable", "harmonious", "peaceful", "conciliatory"],
        related: ["debate", "conflict", "dispute", "strife"],
        translations: {
          de: ["streitig"],
          fr: ["contentieux"],
          es: ["controvertido"],
          it: ["contenzioso"],
        },
      },
      contrite: {
        lexeme: "contrite",
        id: 928636,
        definition:
          "Feeling or expressing remorse or penitence; affected by guilt.",
        example:
          "She was contrite after realizing her mistake and apologized sincerely.",
        etymology:
          "From Middle English 'contrit', from Old French 'contrit', from Latin 'contritus' (worn out, crushed, penitent), past participle of 'conterere' (to grind, crush, wear away).",
        partOfSpeech: "adjective",
        date: "2025-04-21",
        synonyms: ["remorseful", "repentant", "apologetic", "regretful"],
        antonyms: ["unrepentant", "defiant", "unapologetic"],
        related: ["guilt", "penitence", "atonement", "contrition"],
        translations: {
          de: ["reuevoll"],
          fr: ["contrition"],
          es: ["contrito"],
          it: ["contrito"],
        },
      },
      conundrum: {
        lexeme: "conundrum",
        id: 1988470,
        definition: "A confusing and difficult problem or question.",
        example:
          "The issue of climate change presents a conundrum for policymakers.",
        etymology:
          "Origin uncertain, possibly from Latin 'conandrum' (a thing to be attempted) or a playful alteration of an earlier term.",
        partOfSpeech: "noun",
        date: "2025-06-21",
        synonyms: ["puzzle", "riddle", "enigma", "dilemma"],
        antonyms: ["solution", "answer", "certainty"],
        related: ["paradox", "mystery", "quandary"],
        translations: {
          de: ["Rätsel"],
          fr: ["énigme"],
          es: ["acertijo"],
          it: ["enigma"],
        },
      },
      copacetic: {
        lexeme: "copacetic",
        id: 1246837,
        definition: "In excellent order; completely satisfactory.",
        example: "After the final adjustments, everything was copacetic.",
        etymology:
          "Origin uncertain; possibly from Creole French, African American Vernacular English, or Italian. First recorded in the early 20th century.",
        partOfSpeech: "adjective",
        date: "2026-01-28",
        synonyms: ["fine", "satisfactory", "okay", "acceptable"],
        antonyms: ["unsatisfactory", "unacceptable", "problematic"],
        related: ["harmonious", "agreeable", "pleasing"],
        translations: {
          de: ["einwandfrei"],
          fr: ["parfait"],
          es: ["perfecto"],
          it: ["perfetto"],
        },
      },
      copious: {
        lexeme: "copious",
        id: 687059,
        definition: "Abundant in supply or quantity.",
        example:
          "She took copious notes during the lecture to ensure she didn't miss any details.",
        etymology:
          "From Latin 'copiosus', meaning 'plentiful', from 'copia' (abundance).",
        partOfSpeech: "adjective",
        date: "2026-03-15",
        synonyms: ["abundant", "plentiful", "ample", "profuse", "bountiful"],
        antonyms: ["scarce", "meager", "sparse", "insufficient"],
        related: ["copiously", "copiousness"],
        translations: {
          de: ["reichlich"],
          fr: ["copieux"],
          es: ["copioso"],
          it: ["copioso"],
        },
      },
      coracity: {
        lexeme: "coracity",
        id: 9757990,
        definition:
          "A rare or obsolete term, possibly a misspelling or variant of 'coracity' meaning boldness or courage.",
        example: "His coracity in the face of danger inspired his comrades.",
        etymology:
          "Likely derived from Latin 'cor' (heart) or influenced by 'audacity'.",
        partOfSpeech: "noun",
        date: "2025-11-26",
        synonyms: ["boldness", "courage", "fearlessness"],
        antonyms: ["timidity", "cowardice", "fearfulness"],
        related: ["audacity", "bravery", "fortitude"],
        translations: {
          de: ["Kühnheit"],
          fr: ["audace"],
          es: ["audacia"],
          it: ["audacia"],
        },
      },
      cordial: {
        lexeme: "cordial",
        id: 3182091,
        definition: "Warm and friendly; showing sincere affection or kindness.",
        example:
          "Despite their past disagreements, they exchanged cordial greetings at the reunion.",
        etymology:
          "From Middle English 'cordial', from Old French, from Medieval Latin 'cordialis' (relating to the heart), from Latin 'cor' (heart).",
        partOfSpeech: "adjective",
        date: "2025-11-10",
        synonyms: ["friendly", "affable", "genial", "amiable"],
        antonyms: ["hostile", "unfriendly", "cold"],
        related: ["warmth", "sincerity", "hospitality"],
        translations: {
          de: ["herzlich"],
          fr: ["cordiale"],
          es: ["cordiale"],
          it: ["cordiale"],
        },
      },
      corroborate: {
        lexeme: "corroborate",
        id: 4012895,
        definition: "To confirm or support with evidence or authority.",
        example:
          "The witness was able to corroborate the suspect's alibi with a video recording.",
        etymology:
          "From Latin 'corroboratus', past participle of 'corroborare' (to strengthen), from 'com-' (together) + 'roborare' (to strengthen, from 'robur' meaning strength).",
        partOfSpeech: "verb",
        date: "2025-11-25",
        synonyms: [
          "confirm",
          "verify",
          "substantiate",
          "validate",
          "authenticate",
        ],
        antonyms: ["contradict", "deny", "disprove", "refute", "invalidate"],
        related: ["evidence", "testimony", "proof", "affirm", "endorse"],
        translations: {
          de: ["bestätigen"],
          fr: ["corroborer"],
          es: ["corroborar"],
          it: ["corroborare"],
        },
      },
      coterie: {
        lexeme: "coterie",
        id: 5704425,
        definition:
          "A small, exclusive group of people with shared interests or tastes.",
        example:
          "She was part of a literary coterie that met weekly to discuss new books.",
        etymology:
          "From French 'coterie', originally referring to an association of tenants, from Old French 'cote' (hut, cottage).",
        partOfSpeech: "noun",
        date: "2025-03-04",
        synonyms: ["clique", "circle", "set", "group"],
        antonyms: ["crowd", "public", "majority"],
        related: ["fraternity", "sorority", "guild", "fellowship"],
        translations: {
          de: ["Clique"],
          fr: ["coterie"],
          es: ["cotería"],
          it: ["cerchia"],
        },
      },
      craven: {
        lexeme: "craven",
        id: 512889,
        definition: "Lacking courage; contemptibly timid.",
        example:
          "The craven soldier deserted his comrades in the face of danger.",
        etymology:
          "Middle English cravant, from Old French crevant, present participle of crever 'to burst, die', from Latin crepare 'to crack, creak'.",
        partOfSpeech: "adjective",
        date: "2025-03-31",
        synonyms: ["cowardly", "spineless", "timid", "fearful"],
        antonyms: ["brave", "courageous", "bold", "fearless"],
        related: ["pusillanimous", "dastardly", "gutless"],
        translations: {
          de: ["feige"],
          fr: ["lâche"],
          es: ["cobarde"],
          it: ["vigliacco"],
        },
      },
      credulous: {
        lexeme: "credulous",
        id: 3487062,
        definition:
          "Having or showing too great a readiness to believe things.",
        example:
          "The credulous audience believed the magician's claims without question.",
        etymology:
          "From Latin 'credulus', meaning 'inclined to believe', from 'credere' (to believe).",
        partOfSpeech: "adjective",
        date: "2026-03-02",
        synonyms: ["gullible", "naive", "trusting", "unsuspecting"],
        antonyms: ["skeptical", "doubtful", "cynical", "disbelieving"],
        related: ["credulity", "credence", "incredulous"],
        translations: {
          de: ["leichtgläubig"],
          fr: ["crédule"],
          es: ["crédulo"],
          it: ["credulo"],
        },
      },
      cryptic: {
        lexeme: "cryptic",
        id: 2564695,
        definition: "Having a meaning that is mysterious or obscure.",
        example:
          "She gave me a cryptic smile that left me wondering what she was thinking.",
        etymology:
          "From Late Latin 'crypticus', from Greek 'kryptikos' (hidden, secret), from 'kryptos' (hidden).",
        partOfSpeech: "adjective",
        date: "2025-09-04",
        synonyms: [
          "enigmatic",
          "mysterious",
          "obscure",
          "puzzling",
          "ambiguous",
        ],
        antonyms: [
          "clear",
          "obvious",
          "straightforward",
          "transparent",
          "explicit",
        ],
        related: ["crypt", "encrypt", "decrypt", "cryptography"],
        translations: {
          de: ["kryptisch"],
          fr: ["énigmatique"],
          es: ["críptico"],
          it: ["criptico"],
        },
      },
      culpable: {
        lexeme: "culpable",
        id: 2349515,
        definition:
          "Deserving blame or censure for being wrong, evil, or harmful.",
        example:
          "The company was found culpable for the environmental damage caused by its negligence.",
        etymology:
          "From Middle English 'coupable', from Old French, from Latin 'culpabilis', from 'culpare' (to blame), from 'culpa' (fault, blame).",
        partOfSpeech: "adjective",
        date: "2025-01-20",
        synonyms: ["blameworthy", "guilty", "responsible", "accountable"],
        antonyms: ["innocent", "blameless", "irresponsible"],
        related: ["culpability", "culprit", "culpably"],
        translations: {
          de: ["schuldig"],
          fr: ["coupable"],
          es: ["culpable"],
          it: ["colpevole"],
        },
      },
      cupidity: {
        lexeme: "cupidity",
        id: 1208748,
        definition: "Greed for money or possessions.",
        example: "His cupidity led him to embezzle funds from the company.",
        etymology:
          "From Middle English 'cupidite', from Old French, from Latin 'cupiditas' (desire, passion), from 'cupidus' (eager, desirous).",
        partOfSpeech: "noun",
        date: "2026-02-28",
        synonyms: ["avarice", "greed", "rapacity", "covetousness"],
        antonyms: ["generosity", "altruism", "selflessness"],
        related: ["materialism", "acquisitiveness", "selfishness"],
        translations: {
          de: ["Habsucht"],
          fr: ["cupidité"],
          es: ["codicia"],
          it: ["cupidigia"],
        },
      },
      curmudgeon: {
        lexeme: "curmudgeon",
        id: 5383256,
        definition: "A bad-tempered or surly person, often old.",
        example: "The old curmudgeon yelled at the kids to get off his lawn.",
        etymology:
          "Mid 16th century: of unknown origin, possibly derived from 'cur' (a contemptible person) and 'mudgeon' (a variant of 'mudgin,' meaning grumbler).",
        partOfSpeech: "noun",
        date: "2026-03-28",
        synonyms: ["grouch", "misanthrope", "grump", "crank"],
        antonyms: ["optimist", "people person", "charmer"],
        related: ["cantankerous", "irascible", "peevish"],
        translations: {
          de: ["Mürrisch"],
          fr: ["grincheux"],
          es: ["gruñón"],
          it: ["burbero"],
        },
      },
      cursory: {
        lexeme: "cursory",
        id: 5357999,
        definition: "Performed with haste and without attention to detail.",
        example: "She gave the report a cursory glance before the meeting.",
        etymology:
          "From Latin 'cursorius' (of a runner), from 'currere' (to run).",
        partOfSpeech: "adjective",
        date: "2025-02-20",
        synonyms: ["superficial", "hasty", "perfunctory", "rapid"],
        antonyms: ["thorough", "detailed", "careful"],
        related: ["brief", "hurried", "summary"],
        translations: {
          de: ["flüchtig"],
          fr: ["superficiel"],
          es: ["superficial"],
          it: ["superficiale"],
        },
      },
      dauntless: {
        lexeme: "dauntless",
        id: 1703874,
        definition: "Fearless, resolute, and unable to be intimidated.",
        example:
          "The dauntless explorer ventured into the unknown jungle without hesitation.",
        etymology:
          "From Middle English 'dauntless', from 'daunten' (to tame, subdue) + '-less' (without), ultimately from Latin 'domitare' (to tame).",
        partOfSpeech: "adjective",
        date: "2025-03-24",
        synonyms: ["fearless", "intrepid", "undaunted", "bold", "courageous"],
        antonyms: ["timid", "fearful", "cowardly", "hesitant"],
        related: ["bravery", "valor", "audacity", "grit"],
        translations: {
          de: ["furchtlos"],
          fr: ["intrépide"],
          es: ["intrépido"],
          it: ["intrepido"],
        },
      },
      debacle: {
        lexeme: "debacle",
        id: 8126061,
        definition:
          "A sudden and complete failure or collapse, often resulting in a chaotic situation.",
        example:
          "The project turned into a debacle when the main system crashed during the final presentation.",
        etymology:
          "From French 'débâcle', meaning 'breaking up of ice on a river', derived from 'débâcler' (to unbar, to clear). Entered English in the early 19th century with the sense of a sudden disaster or collapse.",
        partOfSpeech: "noun",
        date: "2025-03-11",
        synonyms: ["fiasco", "disaster", "catastrophe", "collapse", "rout"],
        antonyms: ["success", "triumph", "victory", "achievement"],
        related: ["meltdown", "failure", "ruin", "downfall", "calamity"],
        translations: {
          de: ["Debakel"],
          fr: ["débâcle"],
          es: ["debacle"],
          it: ["disfatta"],
        },
      },
      debilitate: {
        lexeme: "debilitate",
        id: 6602787,
        definition: "To weaken or make feeble.",
        example:
          "The prolonged illness debilitated him, leaving him unable to perform daily tasks.",
        etymology:
          "From Latin 'debilitatus', past participle of 'debilitare', meaning 'to weaken', from 'debilis' (weak).",
        partOfSpeech: "verb",
        date: "2025-04-04",
        synonyms: ["weaken", "enfeeble", "sap", "enervate", "disable"],
        antonyms: ["strengthen", "invigorate", "fortify", "energize"],
        related: ["debilitating", "debility", "weakness", "fatigue"],
        translations: {
          de: ["schwächen"],
          fr: ["débiliter"],
          es: ["debilitar"],
          it: ["debilitare"],
        },
      },
      decadent: {
        lexeme: "decadent",
        id: 1680075,
        definition:
          "Characterized by or reflecting a state of moral or cultural decline, often associated with excessive indulgence in pleasure or luxury.",
        example:
          "The decadent lifestyle of the aristocracy contributed to the revolution.",
        etymology:
          "From French 'décadent', from Medieval Latin 'decadentia' ('a falling away'), based on Latin 'decadere' ('to fall away, decay').",
        partOfSpeech: "adjective",
        date: "2025-09-06",
        synonyms: ["dissolute", "degenerate", "self-indulgent", "hedonistic"],
        antonyms: ["virtuous", "ascetic", "restrained", "modest"],
        related: ["decadence", "decay", "corruption", "luxury"],
        translations: {
          de: ["dekadent"],
          fr: ["décadent"],
          es: ["decadente"],
          it: ["decadente"],
        },
      },
      decorum: {
        lexeme: "decorum",
        id: 9677585,
        definition: "Behavior in keeping with good taste and propriety.",
        example:
          "She conducted herself with great decorum during the formal dinner.",
        etymology:
          "From Latin 'decorum', meaning 'that which is proper', from 'decorus' (fitting, becoming).",
        partOfSpeech: "noun",
        date: "2025-11-08",
        synonyms: ["propriety", "etiquette", "politeness"],
        antonyms: ["impropriety", "rudeness", "indecorum"],
        related: ["dignity", "civility", "protocol"],
        translations: {
          de: ["Anstand"],
          fr: ["décorum"],
          es: ["decoro"],
          it: ["decoro"],
        },
      },
      deference: {
        lexeme: "deference",
        id: 7645516,
        definition: "Polite submission and respect.",
        example: "He addressed her with the deference due to a professor.",
        etymology:
          "From French 'déférence', from Latin 'deferre' (to carry down, yield).",
        partOfSpeech: "noun",
        date: "2025-07-23",
        synonyms: ["respect", "esteem", "courtesy", "reverence"],
        antonyms: ["disrespect", "defiance", "insolence"],
        related: ["submission", "compliance", "honor", "politeness"],
        translations: {
          de: ["Ehrerbietung"],
          fr: ["déférence"],
          es: ["deferencia"],
          it: ["deferenza"],
        },
      },
      defunct: {
        lexeme: "defunct",
        id: 3328734,
        definition: "No longer existing or functioning.",
        example: "The defunct company was once a leader in the tech industry.",
        etymology:
          "From Latin 'defunctus', past participle of 'defungi' (to finish, discharge).",
        partOfSpeech: "adjective",
        date: "2025-06-09",
        synonyms: ["extinct", "obsolete", "inoperative", "dead"],
        antonyms: ["active", "operational", "functioning", "existing"],
        related: ["defunction", "defunctive", "defunctness"],
        translations: {
          de: ["erloschen"],
          fr: ["défunt"],
          es: ["extinto"],
          it: ["defunto"],
        },
      },
      deleterious: {
        lexeme: "deleterious",
        id: 5612478,
        definition: "Causing harm or damage.",
        example:
          "The deleterious effects of smoking on health are well-documented.",
        etymology:
          "From Latin 'deleterius', meaning 'destructive', derived from Greek 'deleterios', from 'deleisthai' (to hurt).",
        partOfSpeech: "adjective",
        date: "2025-04-17",
        synonyms: [
          "harmful",
          "damaging",
          "destructive",
          "injurious",
          "detrimental",
        ],
        antonyms: ["beneficial", "helpful", "advantageous", "salutary"],
        related: ["toxic", "pernicious", "adverse", "noxious"],
        translations: {
          de: ["schädlich"],
          fr: ["nocif"],
          es: ["perjudicial"],
          it: ["dannoso"],
        },
      },
      demagogue: {
        lexeme: "demagogue",
        id: 8832260,
        definition:
          "A political leader who seeks support by appealing to popular desires and prejudices rather than by using rational argument.",
        example:
          "The demagogue stirred up the crowd with emotional speeches rather than presenting facts.",
        etymology:
          "From Greek 'dēmagōgos' (leader of the people), from 'dēmos' (people) + 'agōgos' (leading).",
        partOfSpeech: "noun",
        date: "2025-06-10",
        synonyms: ["rabble-rouser", "agitator", "firebrand"],
        antonyms: ["moderate", "peacemaker", "conciliator"],
        related: ["populist", "orator", "manipulator"],
        translations: {
          de: ["Demagoge"],
          fr: ["démagogue"],
          es: ["demagogo"],
          it: ["demagogo"],
        },
      },
      demur: {
        lexeme: "demur",
        id: 9595488,
        definition: "To raise objections or show reluctance.",
        example: "She demurred at the suggestion to work late again.",
        etymology:
          "From Old French 'demorer', meaning 'to delay', from Latin 'demorari' ('de-' + 'morari', 'to delay').",
        partOfSpeech: "verb",
        date: "2025-07-12",
        synonyms: ["object", "protest", "hesitate"],
        antonyms: ["agree", "consent", "accept"],
        related: ["objection", "hesitation", "reluctance"],
        translations: {
          de: ["Einwände erheben"],
          fr: ["objecter"],
          es: ["objetar"],
          it: ["obiettare"],
        },
      },
      denigrate: {
        lexeme: "denigrate",
        id: 2189973,
        definition:
          "To criticize unfairly; to belittle or disparage someone or something.",
        example:
          "She felt that her colleagues were trying to denigrate her achievements behind her back.",
        etymology:
          "From Latin 'denigratus', past participle of 'denigrare', meaning 'to blacken' or 'to defame', from 'de-' (completely) + 'nigrare' (to blacken), from 'niger' (black).",
        partOfSpeech: "verb",
        date: "2025-06-08",
        synonyms: ["disparage", "belittle", "malign", "defame", "slander"],
        antonyms: ["praise", "commend", "compliment", "laud", "extol"],
        related: ["criticize", "insult", "discredit", "vilify", "disrespect"],
        translations: {
          de: ["verunglimpfen"],
          fr: ["dénigrer"],
          es: ["denigrar"],
          it: ["denigrare"],
        },
      },
      depravity: {
        lexeme: "depravity",
        id: 5983109,
        definition: "Moral corruption or wickedness.",
        example: "The novel explores the depths of human depravity.",
        etymology:
          "From Latin 'depravare' (to distort, corrupt), via Old French 'depravité'.",
        partOfSpeech: "noun",
        date: "2025-03-27",
        synonyms: ["corruption", "degeneracy", "wickedness", "vice"],
        antonyms: ["virtue", "morality", "righteousness"],
        related: ["immorality", "debauchery", "sinfulness", "perversion"],
        translations: {
          de: ["Verderbtheit"],
          fr: ["dépravation"],
          es: ["depravación"],
          it: ["depravazione"],
        },
      },
      deride: {
        lexeme: "deride",
        id: 3617925,
        definition: "To express contempt for; ridicule.",
        example: "The critics derided the artist's latest work as amateurish.",
        etymology:
          "From Latin 'deridēre', meaning 'to laugh to scorn', from 'de-' (down) + 'ridēre' (to laugh).",
        partOfSpeech: "verb",
        date: "2025-05-31",
        synonyms: ["mock", "ridicule", "scoff", "jeer", "taunt"],
        antonyms: ["praise", "commend", "admire", "respect"],
        related: ["derision", "derisive", "mockery", "scorn"],
        translations: {
          de: ["verspotten"],
          fr: ["railler"],
          es: ["burlarse"],
          it: ["deridere"],
        },
      },
      despot: {
        lexeme: "despot",
        id: 9467367,
        definition:
          "A ruler or other person who holds absolute power, typically one who exercises it in a cruel or oppressive way.",
        example:
          "The despot ruled the country with an iron fist, suppressing any form of dissent.",
        etymology:
          "From Middle French 'despote', via Latin from Greek 'despotēs' meaning 'master, lord'.",
        partOfSpeech: "noun",
        date: "2026-02-04",
        synonyms: ["tyrant", "dictator", "autocrat", "oppressor"],
        antonyms: ["democrat", "liberator", "freedom fighter"],
        related: ["despotism", "authoritarian", "totalitarian", "autocracy"],
        translations: {
          de: ["Despot"],
          fr: ["despote"],
          es: ["déspota"],
          it: ["despota"],
        },
      },
      desultory: {
        lexeme: "desultory",
        id: 7925506,
        definition: "Lacking a plan, purpose, or enthusiasm; random.",
        example:
          "She made a desultory attempt at cleaning her room before giving up.",
        etymology:
          "From Latin 'desultorius' (superficial, hasty), from 'desultor' (a circus rider who jumps from horse to horse).",
        partOfSpeech: "adjective",
        date: "2026-03-13",
        synonyms: ["random", "haphazard", "aimless", "unmethodical"],
        antonyms: ["systematic", "methodical", "purposeful", "organized"],
        related: ["sporadic", "erratic", "unfocused", "casual"],
        translations: {
          de: ["planlos"],
          fr: ["désordonné"],
          es: ["desordenado"],
          it: ["sconnesso"],
        },
      },
      detritus: {
        lexeme: "detritus",
        id: 8987955,
        definition:
          "Loose material that results from disintegration or wearing away, such as rock fragments or organic debris.",
        example:
          "The forest floor was covered with detritus from the fallen leaves and branches.",
        etymology:
          "From Latin 'detritus', meaning 'a wearing away', from 'deterere' (to wear down).",
        partOfSpeech: "noun",
        date: "2025-08-11",
        synonyms: ["debris", "remains", "fragments", "waste"],
        antonyms: ["whole", "intact object"],
        related: ["sediment", "rubble", "scree", "organic matter"],
        translations: {
          de: ["Detritus"],
          fr: ["détritus"],
          es: ["detrito"],
          it: ["detrito"],
        },
      },
      dexterity: {
        lexeme: "dexterity",
        id: 7625123,
        definition: "Skill in performing tasks, especially with the hands.",
        example:
          "The surgeon's dexterity was evident during the delicate procedure.",
        etymology:
          "From Latin 'dexteritas', meaning 'right-handedness, skill', derived from 'dexter' (right, skillful).",
        partOfSpeech: "noun",
        date: "2025-03-29",
        synonyms: ["adroitness", "agility", "nimbleness", "skillfulness"],
        antonyms: ["clumsiness", "awkwardness", "ineptitude"],
        related: ["coordination", "finesse", "precision", "manual skill"],
        translations: {
          de: ["Geschicklichkeit"],
          fr: ["dextérité"],
          es: ["destreza"],
          it: ["destrezza"],
        },
      },
      dexterous: {
        lexeme: "dexterous",
        id: 6509956,
        definition: "Skillful with the hands or body; showing mental skill.",
        example: "The dexterous magician performed the trick flawlessly.",
        etymology:
          "From Latin 'dexter' (right, skillful) + English suffix '-ous'.",
        partOfSpeech: "adjective",
        date: "2025-06-01",
        synonyms: ["adroit", "nimble", "agile", "skillful"],
        antonyms: ["clumsy", "awkward", "inept"],
        related: ["ambidextrous", "manual dexterity", "hand-eye coordination"],
        translations: {
          de: ["geschickt"],
          fr: ["adroit"],
          es: ["diestro"],
          it: ["abile"],
        },
      },
      diaphanous: {
        lexeme: "diaphanous",
        id: 7023015,
        definition: "Light, delicate, and translucent.",
        example: "She wore a diaphanous gown that fluttered in the breeze.",
        etymology:
          "From Greek 'diaphanēs' (transparent), from 'dia-' (through) + 'phainein' (to show).",
        partOfSpeech: "adjective",
        date: "2025-12-24",
        synonyms: ["sheer", "transparent", "gauzy", "filmy", "see-through"],
        antonyms: ["opaque", "thick", "dense"],
        related: ["translucent", "ethereal", "airy", "delicate"],
        translations: {
          de: ["durchsichtig"],
          fr: ["diaphane"],
          es: ["diafano"],
          it: ["diafano"],
        },
      },
      diatribe: {
        lexeme: "diatribe",
        id: 4605702,
        definition:
          "A forceful and bitter verbal attack against someone or something.",
        example:
          "The politician launched into a diatribe against his opponents during the debate.",
        etymology:
          "From Latin 'diatriba', meaning 'learned discussion' or 'discourse', derived from Greek 'diatribē' (διατριβή), meaning 'pastime' or 'study'.",
        partOfSpeech: "noun",
        date: "2025-04-05",
        synonyms: ["tirade", "harangue", "rant", "invective", "denunciation"],
        antonyms: ["praise", "compliment", "commendation", "accolade"],
        related: [
          "criticism",
          "rebuke",
          "reproach",
          "condemnation",
          "fulmination",
        ],
        translations: {
          de: ["Schmährede"],
          fr: ["diatribe"],
          es: ["diatriba"],
          it: ["diatriba"],
        },
      },
      didactic: {
        lexeme: "didactic",
        id: 9598885,
        definition:
          "Intended to teach, particularly in having moral instruction as an ulterior motive.",
        example:
          "The novel's didactic tone made it clear that the author wanted to impart a lesson about honesty.",
        etymology:
          "From Greek 'didaktikos', meaning 'apt at teaching', from 'didasko' (to teach).",
        partOfSpeech: "adjective",
        date: "2025-12-19",
        synonyms: ["instructive", "educational", "pedagogical", "moralistic"],
        antonyms: ["uninformative", "unenlightening", "noneducational"],
        related: ["pedagogy", "teaching", "edification", "sermonizing"],
        translations: {
          de: ["didaktisch"],
          fr: ["didactique"],
          es: ["didáctico"],
          it: ["didattico"],
        },
      },
      diffident: {
        lexeme: "diffident",
        id: 3566669,
        definition: "Modest or shy due to a lack of self-confidence.",
        example:
          "She was diffident about speaking in public, often hesitating before sharing her thoughts.",
        etymology:
          "From Latin 'diffidere' (to distrust), from 'dis-' (not) + 'fidere' (to trust).",
        partOfSpeech: "adjective",
        date: "2026-03-10",
        synonyms: ["shy", "timid", "reserved", "self-effacing"],
        antonyms: ["confident", "bold", "assertive", "outgoing"],
        related: ["hesitant", "unassuming", "coy", "introverted"],
        translations: {
          de: ["schüchtern"],
          fr: ["timide"],
          es: ["tímido"],
          it: ["timido"],
        },
      },
      digress: {
        lexeme: "digress",
        id: 2679117,
        definition:
          "To deviate or wander away from the main topic or purpose in speaking or writing.",
        example:
          "During his lecture, the professor tended to digress into anecdotes about his travels.",
        etymology:
          "From Latin 'digressus', past participle of 'digredi' ('to step aside'), from 'dis-' ('apart') + 'gradi' ('to step, go').",
        partOfSpeech: "verb",
        date: "2025-08-02",
        synonyms: ["stray", "deviate", "diverge", "ramble", "wander"],
        antonyms: ["stay", "focus", "persist", "adhere"],
        related: ["digression", "tangent", "meander", "divagate"],
        translations: {
          de: ["abschweifen"],
          fr: ["divaguer"],
          es: ["divagar"],
          it: ["divagare"],
        },
      },
      dilatory: {
        lexeme: "dilatory",
        id: 9703407,
        definition: "Intended to cause delay.",
        example:
          "The senator's dilatory tactics prolonged the debate unnecessarily.",
        etymology:
          "From Latin 'dilatorius', meaning 'delaying', from 'dilator', 'delayer'.",
        partOfSpeech: "adjective",
        date: "2025-07-06",
        synonyms: ["slow", "procrastinating", "tardy", "sluggish"],
        antonyms: ["prompt", "expeditious", "swift", "timely"],
        related: ["delay", "procrastination", "stalling", "lingering"],
        translations: {
          de: ["verzögernd"],
          fr: ["dilatoire"],
          es: ["dilatorio"],
          it: ["dilatorio"],
        },
      },
      diligent: {
        lexeme: "diligent",
        id: 3847683,
        definition:
          "Showing care and conscientiousness in one's work or duties.",
        example:
          "She was diligent in her studies, often spending extra hours in the library.",
        etymology:
          "From Middle English 'diligent', from Old French 'diligent', from Latin 'diligent-' (stem of 'diligens'), present participle of 'diligere' meaning 'to love, esteem, take delight in'.",
        partOfSpeech: "adjective",
        date: "2025-11-13",
        synonyms: [
          "industrious",
          "assiduous",
          "meticulous",
          "painstaking",
          "hardworking",
        ],
        antonyms: ["lazy", "negligent", "careless", "slothful"],
        related: ["perseverance", "dedication", "thoroughness", "attention"],
        translations: {
          de: ["fleißig"],
          fr: ["diligent"],
          es: ["diligente"],
          it: ["diligente"],
        },
      },
      disabuse: {
        lexeme: "disabuse",
        id: 6107931,
        definition: "To free someone from a misconception or mistaken belief.",
        example:
          "She had to disabuse him of the notion that all politicians are corrupt.",
        etymology:
          "From French 'désabuser', from 'dés-' (dis-) + 'abuser' (to deceive).",
        partOfSpeech: "verb",
        date: "2026-04-06",
        synonyms: ["enlighten", "correct", "undeceive", "set straight"],
        antonyms: ["deceive", "mislead", "delude"],
        related: ["correct", "inform", "clarify"],
        translations: {
          de: ["aufklären"],
          fr: ["désabuser"],
          es: ["desengañar"],
          it: ["disilludere"],
        },
      },
      disaffected: {
        lexeme: "disaffected",
        id: 3267617,
        definition:
          "Dissatisfied with authority or a group to which one belongs, often leading to disloyalty.",
        example:
          "The disaffected employees formed a union to address their grievances.",
        etymology:
          "From the prefix 'dis-' (expressing reversal) + 'affected' (influenced or attached), originating in the early 17th century.",
        partOfSpeech: "adjective",
        date: "2025-07-19",
        synonyms: ["alienated", "estranged", "discontented", "rebellious"],
        antonyms: ["loyal", "content", "satisfied", "devoted"],
        related: [
          "disloyalty",
          "dissent",
          "dissatisfaction",
          "insubordination",
        ],
        translations: {
          de: ["unzufrieden"],
          fr: ["mécontent"],
          es: ["descontento"],
          it: ["scontento"],
        },
      },
      discern: {
        lexeme: "discern",
        id: 7189195,
        definition:
          "To perceive or recognize something clearly, especially with the senses or the mind.",
        example: "She could discern a faint light in the distance.",
        etymology:
          "From Middle English 'discernen', from Old French 'discerner', from Latin 'discernere' ('to separate, distinguish'), from 'dis-' ('apart') + 'cernere' ('to sift, perceive').",
        partOfSpeech: "verb",
        date: "2025-03-19",
        synonyms: [
          "perceive",
          "detect",
          "recognize",
          "distinguish",
          "identify",
        ],
        antonyms: ["overlook", "ignore", "miss", "confuse"],
        related: [
          "discernment",
          "discerning",
          "discernible",
          "observation",
          "insight",
        ],
        translations: {
          de: ["erkennen"],
          fr: ["discerner"],
          es: ["discernir"],
          it: ["discernere"],
        },
      },
      discerning: {
        lexeme: "discerning",
        id: 6298419,
        definition: "Having or showing good judgment or keen insight.",
        example: "Her discerning eye for detail made her an excellent editor.",
        etymology:
          "From Middle English 'discernen', from Old French 'discerner', from Latin 'discernere' (to separate, distinguish), from 'dis-' (apart) + 'cernere' (to sift).",
        partOfSpeech: "adjective",
        date: "2025-03-10",
        synonyms: ["perceptive", "astute", "shrewd", "discriminating"],
        antonyms: ["undiscriminating", "indiscriminate", "unobservant"],
        related: ["insightful", "judicious", "discretion", "acuity"],
        translations: {
          de: ["einsichtig"],
          fr: ["perspicace"],
          es: ["perspicaz"],
          it: ["perspicace"],
        },
      },
      discomfit: {
        lexeme: "discomfit",
        id: 3589547,
        definition: "To make someone feel uneasy or embarrassed.",
        example:
          "The unexpected question discomfited the speaker, causing him to stumble over his words.",
        etymology:
          "From Middle English 'discomfiten', from Old French 'desconfit', past participle of 'desconfire' (to defeat), based on Latin 'dis-' (expressing reversal) + 'conficere' (to put together, complete).",
        partOfSpeech: "verb",
        date: "2025-09-17",
        synonyms: ["embarrass", "abash", "fluster", "unnerve"],
        antonyms: ["comfort", "reassure", "encourage"],
        related: ["discomfort", "disconcert", "perturb"],
        translations: {
          de: ["verunsichern"],
          fr: ["déconcerter"],
          es: ["desconcertar"],
          it: ["sconcertare"],
        },
      },
      disparate: {
        lexeme: "disparate",
        id: 2884016,
        definition:
          "Fundamentally different or distinct in kind; not allowing comparison.",
        example:
          "The two theories are so disparate that they cannot be reconciled.",
        etymology:
          "From Latin 'disparatus', past participle of 'disparare' (to separate), from 'dis-' (apart) + 'parare' (to prepare).",
        partOfSpeech: "adjective",
        date: "2025-11-18",
        synonyms: ["different", "distinct", "dissimilar", "unrelated"],
        antonyms: ["similar", "alike", "comparable", "uniform"],
        related: ["disparity", "disparateness", "heterogeneous"],
        translations: {
          de: ["verschiedenartig"],
          fr: ["disparate"],
          es: ["dispar"],
          it: ["disparato"],
        },
      },
      dispassionate: {
        lexeme: "dispassionate",
        id: 4330178,
        definition: "Not influenced by strong emotion; impartial and calm.",
        example:
          "The judge remained dispassionate throughout the emotional trial.",
        etymology:
          "From the prefix 'dis-' (lack of) + 'passionate' (from Latin 'passionatus', meaning 'full of emotion').",
        partOfSpeech: "adjective",
        date: "2026-02-18",
        synonyms: ["impartial", "unbiased", "detached", "objective", "calm"],
        antonyms: [
          "passionate",
          "biased",
          "emotional",
          "partial",
          "subjective",
        ],
        related: ["composed", "stoic", "rational", "unemotional", "fair"],
        translations: {
          de: ["leidenschaftslos"],
          fr: ["impartial"],
          es: ["impasible"],
          it: ["spassionato"],
        },
      },
      dispel: {
        lexeme: "dispel",
        id: 628754,
        definition:
          "To make something, especially a feeling or belief, disappear or go away.",
        example:
          "The teacher's explanation helped dispel the students' confusion about the topic.",
        etymology:
          "From Latin 'dispellere', from 'dis-' (apart) + 'pellere' (to drive).",
        partOfSpeech: "verb",
        date: "2025-07-21",
        synonyms: ["dissipate", "banish", "eliminate", "scatter"],
        antonyms: ["engender", "foster", "create"],
        related: ["disperse", "dispelment", "dispel a myth"],
        translations: {
          de: ["vertreiben"],
          fr: ["dissiper"],
          es: ["disipar"],
          it: ["dissipare"],
        },
      },
      dissemble: {
        lexeme: "dissemble",
        id: 5067756,
        definition:
          "To conceal one's true motives, feelings, or beliefs under a false appearance.",
        example:
          "She tried to dissemble her disappointment with a forced smile.",
        etymology:
          "From Middle English 'dissimulen', from Old French 'dissimuler', from Latin 'dissimulare' ('to disguise, conceal'), from 'dis-' ('apart') + 'simulare' ('to pretend').",
        partOfSpeech: "verb",
        date: "2025-10-07",
        synonyms: ["feign", "pretend", "disguise", "mask", "conceal"],
        antonyms: ["reveal", "expose", "unmask", "disclose"],
        related: ["deceive", "mislead", "camouflage", "dissimulate"],
        translations: {
          de: ["verbergen"],
          fr: ["dissimuler"],
          es: ["disimular"],
          it: ["dissimulare"],
        },
      },
      disseminate: {
        lexeme: "disseminate",
        id: 9614181,
        definition:
          "To spread or disperse something, especially information, widely.",
        example:
          "The organization aims to disseminate knowledge about climate change through its workshops.",
        etymology:
          "From Latin 'disseminare', meaning 'to scatter seeds', from 'dis-' (apart) + 'seminare' (to sow).",
        partOfSpeech: "verb",
        date: "2025-08-30",
        synonyms: [
          "spread",
          "circulate",
          "propagate",
          "broadcast",
          "distribute",
        ],
        antonyms: ["suppress", "withhold", "conceal", "hide"],
        related: ["dissemination", "disseminator", "propagate", "circulate"],
        translations: {
          de: ["verbreiten"],
          fr: ["diffuser"],
          es: ["difundir"],
          it: ["diffondere"],
        },
      },
      dissonance: {
        lexeme: "dissonance",
        id: 2886645,
        definition:
          "A lack of harmony or agreement; a harsh combination of sounds.",
        example:
          "The dissonance between the violin and the piano created an unsettling effect.",
        etymology:
          "From Latin 'dissonantia', meaning 'disagreement' or 'discord', derived from 'dissonare' (to be out of tune).",
        partOfSpeech: "noun",
        date: "2025-08-26",
        synonyms: ["discord", "cacophony", "disharmony", "conflict"],
        antonyms: ["harmony", "concord", "agreement", "accord"],
        related: ["dissonant", "dissension", "discrepancy", "incongruity"],
        translations: {
          de: ["Dissonanz"],
          fr: ["dissonance"],
          es: ["disonancia"],
          it: ["dissonanza"],
        },
      },
      dissonant: {
        lexeme: "dissonant",
        id: 1916517,
        definition:
          "Lacking harmony or agreement; incongruous or harsh in sound.",
        example:
          "The dissonant chords in the music created a sense of tension.",
        etymology:
          "From Latin 'dissonant-', present participle of 'dissonare' (to be discordant), from 'dis-' (apart) + 'sonare' (to sound).",
        partOfSpeech: "adjective",
        date: "2025-11-22",
        synonyms: ["discordant", "inharmonious", "jarring", "cacophonous"],
        antonyms: ["harmonious", "melodious", "concordant"],
        related: ["dissonance", "discord", "clashing", "unmelodic"],
        translations: {
          de: ["dissonant"],
          fr: ["dissonant"],
          es: ["disonante"],
          it: ["dissonante"],
        },
      },
      dissuade: {
        lexeme: "dissuade",
        id: 3139644,
        definition:
          "To persuade someone not to take a particular course of action.",
        example:
          "She tried to dissuade him from quitting his job without another offer.",
        etymology:
          "From Latin 'dissuadere', from 'dis-' (away, apart) + 'suadere' (to advise, urge).",
        partOfSpeech: "verb",
        date: "2025-06-16",
        synonyms: ["discourage", "deter", "prevent"],
        antonyms: ["persuade", "encourage", "urge"],
        related: ["advise", "warn", "caution"],
        translations: {
          de: ["abraten"],
          fr: ["dissuader"],
          es: ["disuadir"],
          it: ["dissuadere"],
        },
      },
      distend: {
        lexeme: "distend",
        id: 2876321,
        definition: "To swell or cause to swell by pressure from inside.",
        example: "The balloon began to distend as more air was pumped into it.",
        etymology:
          "From Latin 'distendere', from 'dis-' (apart) + 'tendere' (to stretch).",
        partOfSpeech: "verb",
        date: "2025-04-25",
        synonyms: ["expand", "inflate", "dilate", "swell"],
        antonyms: ["shrink", "contract", "deflate"],
        related: ["bloat", "bulge", "enlarge"],
        translations: {
          de: ["ausdehnen"],
          fr: ["distendre"],
          es: ["distender"],
          it: ["distendere"],
        },
      },
      divulge: {
        lexeme: "divulge",
        id: 7809570,
        definition: "To make known (private or sensitive information).",
        example: "She refused to divulge the secret recipe.",
        etymology:
          "From Latin 'divulgare' (to publish, spread among the people), from 'dis-' (widely) + 'vulgare' (to make public).",
        partOfSpeech: "verb",
        date: "2025-09-12",
        synonyms: ["disclose", "reveal", "expose", "uncover"],
        antonyms: ["conceal", "hide", "suppress", "withhold"],
        related: ["confess", "leak", "betray", "broadcast"],
        translations: {
          de: ["preisgeben"],
          fr: ["divulguer"],
          es: ["divulgar"],
          it: ["divulgare"],
        },
      },
      docile: {
        lexeme: "docile",
        id: 6251435,
        definition: "Ready to accept control or instruction; submissive.",
        example: "The docile puppy quickly learned to follow commands.",
        etymology:
          "Late 15th century (in the sense 'apt or willing to learn'): from Latin docilis, from docere 'to teach'.",
        partOfSpeech: "adjective",
        date: "2025-11-02",
        synonyms: ["obedient", "compliant", "tame", "submissive", "manageable"],
        antonyms: ["stubborn", "rebellious", "defiant", "unruly", "headstrong"],
        related: ["tractable", "amenable", "pliant", "yielding"],
        translations: {
          de: ["fügsam"],
          fr: ["docile"],
          es: ["dócil"],
          it: ["docile"],
        },
      },
      dogmatic: {
        lexeme: "dogmatic",
        id: 4183587,
        definition:
          "Inclined to lay down principles as undeniably true, without consideration of evidence or the opinions of others.",
        example:
          "His dogmatic approach to the debate left no room for discussion or alternative viewpoints.",
        etymology:
          "From late Latin 'dogmaticus', from Greek 'dogmatikos' (pertaining to doctrines), from 'dogma' (opinion, belief).",
        partOfSpeech: "adjective",
        date: "2025-03-30",
        synonyms: ["opinionated", "doctrinaire", "authoritarian", "inflexible"],
        antonyms: ["open-minded", "flexible", "undogmatic", "receptive"],
        related: ["dogma", "doctrine", "rigid", "unyielding"],
        translations: {
          de: ["dogmatisch"],
          fr: ["dogmatique"],
          es: ["dogmático"],
          it: ["dogmatico"],
        },
      },
      dour: {
        lexeme: "dour",
        id: 369418,
        definition:
          "Stubbornly severe, stern, or gloomy in manner or appearance.",
        example:
          "The dour expression on his face made it clear he was not in the mood for jokes.",
        etymology:
          "From Middle English 'dour,' from Old French 'dur,' from Latin 'durus' meaning 'hard, harsh.'",
        partOfSpeech: "adjective",
        date: "2025-10-14",
        synonyms: ["stern", "grim", "severe", "unyielding"],
        antonyms: ["cheerful", "amiable", "friendly", "lighthearted"],
        related: ["austere", "forbidding", "morose", "sullen"],
        translations: {
          de: ["streng"],
          fr: ["austère"],
          es: ["austero"],
          it: ["severo"],
        },
      },
      dubious: {
        lexeme: "dubious",
        id: 8601383,
        definition: "Hesitating or doubting; not to be relied upon.",
        example:
          "She gave a dubious look when asked about the project's success.",
        etymology:
          "From Latin 'dubiosus', meaning 'doubtful', from 'dubium' (doubt).",
        partOfSpeech: "adjective",
        date: "2025-04-22",
        synonyms: ["doubtful", "uncertain", "skeptical", "questionable"],
        antonyms: ["certain", "confident", "trustworthy", "reliable"],
        related: ["dubiousness", "dubitably", "indubitable"],
        translations: {
          de: ["zweifelhaft"],
          fr: ["douteux"],
          es: ["dudoso"],
          it: ["dubbioso"],
        },
      },
      duplicity: {
        lexeme: "duplicity",
        id: 3613831,
        definition:
          "Deceitfulness in speech or conduct, as by speaking or acting in two different ways to different people concerning the same matter.",
        example:
          "His duplicity was revealed when he promised loyalty to both sides of the conflict.",
        etymology:
          "From Middle English 'duplicite', from Old French, from Late Latin 'duplicitas', from Latin 'duplex' (double).",
        partOfSpeech: "noun",
        date: "2025-08-03",
        synonyms: [
          "deceit",
          "deception",
          "fraud",
          "hypocrisy",
          "double-dealing",
        ],
        antonyms: ["honesty", "sincerity", "integrity", "candor"],
        related: ["duplicitous", "duplicate", "dualism", "two-facedness"],
        translations: {
          de: ["Doppelzüngigkeit"],
          fr: ["duplicité"],
          es: ["duplicidad"],
          it: ["doppiezza"],
        },
      },
      ebullient: {
        lexeme: "ebullient",
        id: 6638898,
        definition: "Cheerful and full of energy.",
        example: "Her ebullient personality made her the life of the party.",
        etymology:
          "From Latin 'ebullire' (to bubble up), from 'e-' (out) + 'bullire' (to boil).",
        partOfSpeech: "adjective",
        date: "2025-03-22",
        synonyms: ["exuberant", "enthusiastic", "vivacious", "lively"],
        antonyms: ["gloomy", "reserved", "apathetic", "lethargic"],
        related: ["effervescent", "animated", "buoyant", "jubilant"],
        translations: {
          de: ["überschwänglich"],
          fr: ["exubérant"],
          es: ["efervescente"],
          it: ["esuberante"],
        },
      },
      eccentric: {
        lexeme: "eccentric",
        id: 4017458,
        definition:
          "Deviating from the norm, especially in a whimsical or unconventional manner.",
        example: "The eccentric artist painted only with his toes.",
        etymology:
          "From Latin 'eccentricus', derived from Greek 'ekkentros' (ek-, 'out of' + kentron, 'center').",
        partOfSpeech: "adjective",
        date: "2025-04-15",
        synonyms: ["unconventional", "quirky", "odd", "peculiar"],
        antonyms: ["conventional", "ordinary", "normal"],
        related: ["idiosyncratic", "bizarre", "offbeat"],
        translations: {
          de: ["exzentrisch"],
          fr: ["excentrique"],
          es: ["excéntrico"],
          it: ["eccentrico"],
        },
      },
      eclectic: {
        lexeme: "eclectic",
        id: 1427539,
        definition:
          "Deriving ideas, style, or taste from a broad and diverse range of sources.",
        example:
          "Her eclectic taste in music ranges from classical to hip-hop.",
        etymology:
          "From Greek 'eklektikos', meaning 'selective', from 'eklegein' (to select).",
        partOfSpeech: "adjective",
        date: "2025-09-26",
        synonyms: ["diverse", "varied", "wide-ranging", "broad-based"],
        antonyms: ["uniform", "homogeneous", "narrow"],
        related: ["selective", "multifaceted", "inclusive"],
        translations: {
          de: ["eklektisch"],
          fr: ["éclectique"],
          es: ["ecléctico"],
          it: ["eclettico"],
        },
      },
      edify: {
        lexeme: "edify",
        id: 8690641,
        definition: "To instruct or improve someone morally or intellectually.",
        example:
          "The teacher sought to edify her students with lessons on ethics and critical thinking.",
        etymology:
          "From Middle English 'edifien', from Old French 'edifier', from Latin 'aedificare' (to build), from 'aedes' (building) + 'facere' (to make).",
        partOfSpeech: "verb",
        date: "2026-01-11",
        synonyms: ["enlighten", "educate", "instruct", "uplift"],
        antonyms: ["mislead", "deceive", "corrupt"],
        related: ["moralize", "cultivate", "enrich"],
        translations: {
          de: ["erbauen"],
          fr: ["édifier"],
          es: ["edificar"],
          it: ["edificare"],
        },
      },
      efface: {
        lexeme: "efface",
        id: 1784684,
        definition:
          "To erase or remove something completely; to make oneself inconspicuous.",
        example:
          "She tried to efface the memory of her mistake by focusing on her work.",
        etymology:
          "From Middle French 'effacer', from Old French 'esfacier', based on Latin 'ex-' (out) + 'facies' (face).",
        partOfSpeech: "verb",
        date: "2025-06-25",
        synonyms: ["erase", "obliterate", "expunge", "wipe out"],
        antonyms: ["highlight", "emphasize", "preserve"],
        related: ["delete", "remove", "cancel", "suppress"],
        translations: {
          de: ["auslöschen"],
          fr: ["effacer"],
          es: ["borrar"],
          it: ["cancellare"],
        },
      },
      effervescent: {
        lexeme: "effervescent",
        id: 5478909,
        definition: "Bubbly, lively, or vivacious.",
        example: "Her effervescent personality made her the life of the party.",
        etymology:
          "From Latin 'effervescere', meaning 'to boil up, foam', from 'ex-' (out) + 'fervescere' (to begin to boil).",
        partOfSpeech: "adjective",
        date: "2025-12-25",
        synonyms: ["bubbly", "vivacious", "animated", "exuberant"],
        antonyms: ["dull", "lifeless", "subdued", "flat"],
        related: ["effervescence", "sparkling", "energetic", "buoyant"],
        translations: {
          de: ["sprudelnd"],
          fr: ["effervescent"],
          es: ["efervescente"],
          it: ["effervescente"],
        },
      },
      efficacious: {
        lexeme: "efficacious",
        id: 3620493,
        definition: "Effective in producing a desired result.",
        example:
          "The new medicine proved to be highly efficacious in treating the symptoms.",
        etymology:
          "From Latin 'efficāx' (effective), from 'efficere' (to accomplish).",
        partOfSpeech: "adjective",
        date: "2025-08-08",
        synonyms: ["effective", "potent", "productive", "successful"],
        antonyms: ["ineffective", "useless", "futile"],
        related: ["efficacy", "efficiency", "effectiveness"],
        translations: {
          de: ["wirksam"],
          fr: ["efficace"],
          es: ["eficaz"],
          it: ["efficace"],
        },
      },
      effrontery: {
        lexeme: "effrontery",
        id: 9432902,
        definition: "Insolent or shameless boldness.",
        example:
          "She had the effrontery to ask for a raise after being late every day this week.",
        etymology:
          "From French 'effronterie', based on Latin 'effrons' (shameless), from 'ex-' (out) + 'frons' (forehead, face).",
        partOfSpeech: "noun",
        date: "2025-08-06",
        synonyms: ["audacity", "nerve", "gall", "impudence", "cheek"],
        antonyms: ["modesty", "shyness", "humility"],
        related: ["brazenness", "temerity", "presumption", "boldness"],
        translations: {
          de: ["Frechheit"],
          fr: ["effronterie"],
          es: ["desfachatez"],
          it: ["sfacciataggine"],
        },
      },
      egalitarian: {
        lexeme: "egalitarian",
        id: 5325734,
        definition:
          "Believing in or promoting equal rights and opportunities for all people.",
        example:
          "The organization promotes an egalitarian society where everyone has access to the same resources.",
        etymology:
          "From French 'égalitaire', derived from 'égalité' (equality), which comes from Latin 'aequalitas' (equality).",
        partOfSpeech: "adjective",
        date: "2025-08-13",
        synonyms: ["equal", "fair", "just", "democratic"],
        antonyms: ["elitist", "hierarchical", "discriminatory", "unequal"],
        related: ["equality", "equity", "social justice", "inclusivity"],
        translations: {
          de: ["egalitär"],
          fr: ["égalitaire"],
          es: ["igualitario"],
          it: ["egualitario"],
        },
      },
      egocentric: {
        lexeme: "egocentric",
        id: 3693093,
        definition:
          "Thinking only of oneself, without regard for the feelings or desires of others; self-centered.",
        example:
          "His egocentric behavior made it difficult for him to maintain friendships.",
        etymology:
          "From Latin 'ego' (I) + 'centricus' (centered), from Greek 'kentrikos' (pertaining to a center).",
        partOfSpeech: "adjective",
        date: "2026-02-26",
        synonyms: ["self-centered", "self-absorbed", "narcissistic", "selfish"],
        antonyms: ["altruistic", "selfless", "humble", "modest"],
        related: ["egoism", "egotism", "self-importance", "vanity"],
        translations: {
          de: ["egozentrisch"],
          fr: ["égocentrique"],
          es: ["egocéntrico"],
          it: ["egocentrico"],
        },
      },
      egregious: {
        lexeme: "egregious",
        id: 8149413,
        definition: "Outstandingly bad; shocking.",
        example:
          "The politician's egregious behavior during the debate cost him many supporters.",
        etymology:
          "From Latin 'egregius' (distinguished, eminent), from 'e-' (out) + 'grex' (flock). Originally meant 'remarkably good,' but shifted to negative meaning in the 16th century.",
        partOfSpeech: "adjective",
        date: "2025-07-30",
        synonyms: ["flagrant", "glaring", "atrocious", "outrageous"],
        antonyms: ["admirable", "commendable", "exemplary"],
        related: ["notorious", "blatant", "gross"],
        translations: {
          de: ["ungeheuerlich"],
          fr: ["flagrant"],
          es: ["flagrante"],
          it: ["flagrante"],
        },
      },
      elated: {
        lexeme: "elated",
        id: 3975396,
        definition: "Very happy or proud; jubilant; in high spirits.",
        example: "She was elated after receiving the news of her promotion.",
        etymology:
          "From Latin 'elatus', past participle of 'efferre' (to carry out, lift up), from 'ex-' (out) + 'ferre' (to carry).",
        partOfSpeech: "adjective",
        date: "2025-06-13",
        synonyms: ["ecstatic", "overjoyed", "thrilled", "exultant", "euphoric"],
        antonyms: [
          "depressed",
          "dejected",
          "disheartened",
          "downcast",
          "miserable",
        ],
        related: ["joyful", "gleeful", "delighted", "exhilarated", "jubilant"],
        translations: {
          de: ["begeistert"],
          fr: ["exalté"],
          es: ["eufórico"],
          it: ["esaltato"],
        },
      },
      eldritch: {
        lexeme: "eldritch",
        id: 9661893,
        definition:
          "Strange or unearthly in a way that inspires fear or unease.",
        example:
          "The eldritch glow of the abandoned lighthouse unnerved the sailors.",
        etymology:
          "Early 16th century, from Scots 'eldritch', possibly from Old English 'el-'(foreign) + 'rīċe' (realm).",
        partOfSpeech: "adjective",
        date: "2025-02-13",
        synonyms: ["eerie", "uncanny", "supernatural", "weird"],
        antonyms: ["ordinary", "mundane", "normal"],
        related: ["otherworldly", "haunting", "spooky", "macabre"],
        translations: {
          de: ["unheimlich"],
          fr: ["étrange et inquiétant"],
          es: ["sobrenatural y espeluznante"],
          it: ["misterioso e inquietante"],
        },
      },
      elucidate: {
        lexeme: "elucidate",
        id: 1426336,
        definition: "To make something clear; explain.",
        example:
          "The professor elucidated the complex theory with simple diagrams.",
        etymology:
          "From Latin 'elucidatus', past participle of 'elucidare' (to make clear), from 'e-' (out) + 'lucidus' (clear).",
        partOfSpeech: "verb",
        date: "2026-03-06",
        synonyms: ["clarify", "explain", "illuminate", "interpret"],
        antonyms: ["obscure", "confuse", "complicate"],
        related: ["explanation", "clarification", "understanding"],
        translations: {
          de: ["erläutern"],
          fr: ["élucider"],
          es: ["elucidar"],
          it: ["elucidare"],
        },
      },
      embellish: {
        lexeme: "embellish",
        id: 5585960,
        definition:
          "To make something more attractive by adding decorative details or features.",
        example: "She embellished her dress with lace and ribbons.",
        etymology:
          "From Old French 'embelliss-', stem of 'embellir', from Latin 'in-' (into) + 'bellus' (beautiful).",
        partOfSpeech: "verb",
        date: "2026-02-12",
        synonyms: ["decorate", "adorn", "enhance", "ornament"],
        antonyms: ["simplify", "strip", "plain"],
        related: ["embellishment", "decorative", "ornamental"],
        translations: {
          de: ["verschönern"],
          fr: ["embellir"],
          es: ["embellecer"],
          it: ["abbellire"],
        },
      },
      emollient: {
        lexeme: "emollient",
        id: 9548712,
        definition: "A substance that softens or soothes the skin.",
        example: "She applied an emollient cream to her dry hands.",
        etymology:
          "From Latin 'emollire', meaning 'to soften', from 'e-' (thoroughly) + 'mollire' (to soften).",
        partOfSpeech: "noun, adjective",
        date: "2025-09-21",
        synonyms: ["moisturizer", "soother", "balm", "lotion"],
        antonyms: ["irritant", "abrasive"],
        related: ["emollience", "softening", "hydrating"],
        translations: {
          de: ["Erweichungsmittel"],
          fr: ["émollient"],
          es: ["emoliente"],
          it: ["emolliente"],
        },
      },
      empathy: {
        lexeme: "empathy",
        id: 3874322,
        definition:
          "The ability to understand and share the feelings of another.",
        example:
          "She showed great empathy by listening patiently to her friend's problems.",
        etymology:
          "From the Greek 'empatheia' (em- 'in' + pathos 'feeling'), coined in the early 20th century as a translation of German 'Einfühlung'.",
        partOfSpeech: "noun",
        date: "2026-02-01",
        synonyms: ["compassion", "understanding", "sympathy"],
        antonyms: ["apathy", "indifference", "callousness"],
        related: ["emotional intelligence", "compassion", "kindness"],
        translations: {
          de: ["Empathie"],
          fr: ["empathie"],
          es: ["empatía"],
          it: ["empatia"],
        },
      },
      endemic: {
        lexeme: "endemic",
        id: 4663704,
        definition: "Native to or restricted to a certain area or region.",
        example: "The kangaroo is endemic to Australia.",
        etymology:
          "From French 'endémique', from Greek 'endēmos' (native), from 'en-' (in) + 'dēmos' (people).",
        partOfSpeech: "adjective",
        date: "2026-03-16",
        synonyms: ["native", "indigenous", "local"],
        antonyms: ["foreign", "introduced", "non-native"],
        related: ["epidemic", "pandemic", "indigenous"],
        translations: {
          de: ["endemisch"],
          fr: ["endémique"],
          es: ["endémico"],
          it: ["endemico"],
        },
      },
      enervate: {
        lexeme: "enervate",
        id: 3468840,
        definition: "To weaken or drain of energy.",
        example:
          "The intense heat enervated the hikers, leaving them too exhausted to continue.",
        etymology:
          "From Latin 'enervare' (to weaken), from 'e-' (out) + 'nervus' (sinew, strength).",
        partOfSpeech: "verb",
        date: "2025-02-25",
        synonyms: ["debilitate", "exhaust", "fatigue", "sap"],
        antonyms: ["invigorate", "energize", "strengthen"],
        related: ["languid", "listless", "weakened"],
        translations: {
          de: ["entnerven"],
          fr: ["énervé"],
          es: ["enervar"],
          it: ["enervare"],
        },
      },
      ennui: {
        lexeme: "ennui",
        id: 1263042,
        definition:
          "A feeling of listlessness and dissatisfaction arising from a lack of interest or excitement.",
        example: "After weeks of rain, she was overcome by a sense of ennui.",
        etymology:
          "From French 'ennui', meaning 'boredom', derived from Old French 'enuier' (to annoy), from Latin 'inodiare' (to make loathsome).",
        partOfSpeech: "noun",
        date: "2025-01-03",
        synonyms: ["boredom", "tedium", "listlessness", "weariness"],
        antonyms: ["excitement", "enthusiasm", "interest"],
        related: ["apathy", "melancholy", "doldrums"],
        translations: {
          de: ["Langeweile"],
          fr: ["ennui"],
          es: ["aburrimiento"],
          it: ["noia"],
        },
      },
      entreat: {
        lexeme: "entreat",
        id: 6292567,
        definition: "To ask someone earnestly or anxiously to do something.",
        example: "She entreated him to stay a little longer.",
        etymology:
          "From Middle English 'entreten', from Old French 'entraiter', based on Latin 'tractare' (to handle, manage).",
        partOfSpeech: "verb",
        date: "2025-12-27",
        synonyms: ["beg", "implore", "beseech", "plead", "petition"],
        antonyms: ["demand", "command", "order"],
        related: ["request", "appeal", "supplicate", "importune"],
        translations: {
          de: ["bitten"],
          fr: ["supplier"],
          es: ["suplicar"],
          it: ["supplicare"],
        },
      },
      ephemeral: {
        lexeme: "ephemeral",
        id: 1963951,
        definition: "Lasting for a very short time.",
        example:
          "The ephemeral beauty of the cherry blossoms reminds us of life's fleeting nature.",
        etymology:
          "From Greek 'ephēmeros' (lasting a day), from 'epi-' (upon) + 'hēmera' (day).",
        partOfSpeech: "adjective",
        date: "2025-09-27",
        synonyms: ["transient", "fleeting", "short-lived", "momentary"],
        antonyms: ["permanent", "eternal", "everlasting", "enduring"],
        related: ["ephemera", "ephemerality", "temporary", "impermanent"],
        translations: {
          de: ["vergänglich"],
          fr: ["éphémère"],
          es: ["efímero"],
          it: ["effimero"],
        },
      },
      epiphany: {
        lexeme: "epiphany",
        id: 4850097,
        definition:
          "A sudden realization or comprehension of the essence or meaning of something.",
        example:
          "After years of struggling with the problem, she had an epiphany and understood the solution immediately.",
        etymology:
          "From the Greek 'epiphaneia', meaning 'manifestation' or 'appearance', originally used to describe divine revelations.",
        partOfSpeech: "noun",
        date: "2025-03-08",
        synonyms: ["revelation", "insight", "realization", "awakening"],
        antonyms: ["confusion", "misunderstanding", "obliviousness"],
        related: ["enlightenment", "clarity", "discovery", "breakthrough"],
        translations: {
          de: ["Erleuchtung"],
          fr: ["épiphanie"],
          es: ["epifanía"],
          it: ["epifania"],
        },
      },
      eponym: {
        lexeme: "eponym",
        id: 7436245,
        definition:
          "A person after whom a discovery, invention, place, etc., is named or thought to be named.",
        example:
          "The word 'sandwich' is an eponym derived from the Earl of Sandwich, who is said to have invented the food item.",
        etymology:
          "From Greek 'epōnumos' (giving one's name to something), from 'epi-' (upon) + 'onoma' (name).",
        partOfSpeech: "noun",
        date: "2025-04-02",
        synonyms: ["namesake", "titular figure", "source of name"],
        antonyms: [],
        related: ["eponymous", "toponym", "anthroponym"],
        translations: {
          de: ["Namensgeber"],
          fr: ["éponyme"],
          es: ["epónimo"],
          it: ["eponimo"],
        },
      },
      eponymous: {
        lexeme: "eponymous",
        id: 8903381,
        definition:
          "Relating to or being the person or thing after which something is named.",
        example:
          "The eponymous hero of the novel 'Harry Potter' is a young wizard.",
        etymology:
          "From Greek 'epōnumos' (given as a name, giving one's name to something), from 'epi-' (upon) + 'onoma' (name).",
        partOfSpeech: "adjective",
        date: "2026-03-18",
        synonyms: ["namesake", "titular", "self-titled"],
        antonyms: ["anonymous", "unnamed"],
        related: ["onomastic", "nominative", "toponym"],
        translations: {
          de: ["eponym"],
          fr: ["éponyme"],
          es: ["epónimo"],
          it: ["eponimo"],
        },
      },
      equanimity: {
        lexeme: "equanimity",
        id: 5248783,
        definition:
          "Mental calmness, composure, and evenness of temper, especially in difficult situations.",
        example:
          "She faced the criticism with remarkable equanimity, never losing her cool.",
        etymology:
          "From Latin 'aequanimitas', from 'aequus' (equal) + 'animus' (mind, spirit).",
        partOfSpeech: "noun",
        date: "2025-07-29",
        synonyms: [
          "composure",
          "serenity",
          "poise",
          "calmness",
          "self-possession",
        ],
        antonyms: ["agitation", "anxiety", "nervousness", "discomposure"],
        related: [
          "stoicism",
          "imperturbability",
          "tranquility",
          "collectedness",
        ],
        translations: {
          de: ["Gelassenheit"],
          fr: ["équanimité"],
          es: ["ecuanimidad"],
          it: ["equanimità"],
        },
      },
      equivocate: {
        lexeme: "equivocate",
        id: 3628454,
        definition:
          "To use ambiguous or unclear expressions, often to mislead or avoid commitment.",
        example:
          "The politician chose to equivocate when asked about his stance on the controversial issue.",
        etymology:
          "From Late Latin 'equivocatus', past participle of 'equivocare', meaning 'to call by the same name', from Latin 'aequivocus' ('of equal voice, ambiguous').",
        partOfSpeech: "verb",
        date: "2025-03-28",
        synonyms: [
          "prevaricate",
          "hedge",
          "dodge",
          "evade",
          "beat around the bush",
        ],
        antonyms: ["declare", "assert", "affirm", "clarify"],
        related: ["ambiguity", "deception", "equivocation", "double-talk"],
        translations: {
          de: ["ausweichen"],
          fr: ["équivoquer"],
          es: ["equívoco"],
          it: ["equivocare"],
        },
      },
      erroneous: {
        lexeme: "erroneous",
        id: 1492397,
        definition: "Incorrect or mistaken.",
        example: "The report contained several erroneous conclusions.",
        etymology:
          "From Latin 'erroneus' (wandering, mistaken), from 'errare' (to wander, err).",
        partOfSpeech: "adjective",
        date: "2026-01-13",
        synonyms: ["incorrect", "wrong", "false", "inaccurate"],
        antonyms: ["correct", "accurate", "right"],
        related: ["error", "err", "fallacy"],
        translations: {
          de: ["fehlerhaft"],
          fr: ["erroné"],
          es: ["erróneo"],
          it: ["erroneo"],
        },
      },
      erudition: {
        lexeme: "erudition",
        id: 2077437,
        definition:
          "Extensive knowledge acquired chiefly from books; profound, often scholarly learning.",
        example:
          "Her erudition on medieval history was evident in her detailed lecture.",
        etymology:
          "From Latin 'eruditio', meaning 'instruction, learning', from 'erudire' (to instruct, polish), from 'e-' (out) + 'rudis' (rough, unskilled).",
        partOfSpeech: "noun",
        date: "2025-05-14",
        synonyms: [
          "scholarship",
          "learnedness",
          "knowledge",
          "wisdom",
          "education",
        ],
        antonyms: ["ignorance", "illiteracy", "unfamiliarity"],
        related: ["intellect", "pedantry", "literacy", "savant"],
        translations: {
          de: ["Gelehrsamkeit"],
          fr: ["érudition"],
          es: ["erudición"],
          it: ["erudizione"],
        },
      },
      eschew: {
        lexeme: "eschew",
        id: 6767854,
        definition: "To deliberately avoid or abstain from something.",
        example: "She chose to eschew social media to focus on her studies.",
        etymology:
          "From Middle English 'eschuen', from Old French 'eschiver', of Germanic origin; related to German 'scheuen' (to shun).",
        partOfSpeech: "verb",
        date: "2025-03-05",
        synonyms: ["avoid", "shun", "abstain", "steer clear of"],
        antonyms: ["embrace", "accept", "indulge"],
        related: ["abstain", "refrain", "forgo"],
        translations: {
          de: ["meiden"],
          fr: ["éviter"],
          es: ["evitar"],
          it: ["evitare"],
        },
      },
      esoteric: {
        lexeme: "esoteric",
        id: 680941,
        definition:
          "Intended for or likely to be understood by only a small number of people with specialized knowledge.",
        example:
          "The professor's lecture was so esoteric that only a few students could follow his arguments.",
        etymology:
          "From Greek 'esōterikos', meaning 'inner', derived from 'esōterō', comparative of 'esō', meaning 'within'.",
        partOfSpeech: "adjective",
        date: "2025-04-29",
        synonyms: ["arcane", "obscure", "abstruse", "recondite"],
        antonyms: ["common", "simple", "mainstream", "accessible"],
        related: ["mystical", "occult", "specialized", "elitist"],
        translations: {
          de: ["esoterisch"],
          fr: ["ésotérique"],
          es: ["esotérico"],
          it: ["esoterico"],
        },
      },
      evanescent: {
        lexeme: "evanescent",
        id: 6431175,
        definition: "Tending to vanish like vapor; fleeting or transient.",
        example: "The evanescent beauty of the sunset left us in awe.",
        etymology:
          "From Latin 'evanescere' (to vanish), from 'e-' (out) + 'vanescere' (to vanish).",
        partOfSpeech: "adjective",
        date: "2026-03-24",
        synonyms: ["fleeting", "transient", "ephemeral", "momentary"],
        antonyms: ["permanent", "enduring", "lasting", "eternal"],
        related: ["vanish", "fade", "disappear", "temporary"],
        translations: {
          de: ["flüchtig"],
          fr: ["évanescent"],
          es: ["evanescente"],
          it: ["evanescente"],
        },
      },
      exacerbate: {
        lexeme: "exacerbate",
        id: 3659777,
        definition:
          "To make a problem, bad situation, or negative feeling worse.",
        example:
          "The new policy only served to exacerbate the economic crisis.",
        etymology:
          "From Latin 'exacerbatus', past participle of 'exacerbare', meaning 'to provoke or irritate' ('ex-' = thoroughly + 'acerbus' = harsh).",
        partOfSpeech: "verb",
        date: "2025-09-25",
        synonyms: ["aggravate", "worsen", "intensify", "inflame"],
        antonyms: ["alleviate", "mitigate", "soothe", "improve"],
        related: ["irritate", "provoke", "heighten", "compound"],
        translations: {
          de: ["verschlimmern"],
          fr: ["exacerber"],
          es: ["exacerbar"],
          it: ["esacerbare"],
        },
      },
      exculpate: {
        lexeme: "exculpate",
        id: 4512166,
        definition:
          "To clear from alleged fault or guilt; to prove someone is not guilty.",
        example:
          "The new evidence helped to exculpate the defendant, leading to his acquittal.",
        etymology:
          "From Latin 'exculpatus', past participle of 'exculpare', meaning 'to free from blame' (ex- 'out of' + culpa 'blame').",
        partOfSpeech: "verb",
        date: "2026-03-23",
        synonyms: ["absolve", "acquit", "vindicate", "clear", "exonerate"],
        antonyms: ["incriminate", "accuse", "convict", "blame", "condemn"],
        related: ["innocence", "pardon", "justify", "defend", "vindication"],
        translations: {
          de: ["entlasten"],
          fr: ["disculper"],
          es: ["exculpar"],
          it: ["scagionare"],
        },
      },
      execrate: {
        lexeme: "execrate",
        id: 7964019,
        definition:
          "To feel or express great loathing for; to curse or denounce vehemently.",
        example: "The villagers would execrate the tyrant for his cruel deeds.",
        etymology:
          "From Latin 'execratus', past participle of 'execrari', meaning 'to curse' or 'to hate', from 'ex-' (out) + 'sacrare' (to consecrate, make sacred).",
        partOfSpeech: "verb",
        date: "2025-01-04",
        synonyms: ["abhor", "detest", "loathe", "despise", "abominate"],
        antonyms: ["admire", "adore", "cherish", "praise", "love"],
        related: ["curse", "denounce", "condemn", "revile", "vilify"],
        translations: {
          de: ["verabscheuen"],
          fr: ["exécrer"],
          es: ["execrar"],
          it: ["esecrare"],
        },
      },
      exert: {
        lexeme: "exert",
        id: 3268549,
        definition:
          "To apply or bring to bear (a force, influence, or quality).",
        example: "She had to exert all her strength to move the heavy box.",
        etymology:
          "From Latin 'exserere', meaning 'to thrust out', from 'ex-' (out) + 'serere' (to join, bind).",
        partOfSpeech: "verb",
        date: "2025-09-18",
        synonyms: ["apply", "employ", "wield", "exercise"],
        antonyms: ["relinquish", "withhold", "refrain"],
        related: ["effort", "force", "pressure", "strain"],
        translations: {
          de: ["ausüben"],
          fr: ["exercer"],
          es: ["ejercer"],
          it: ["esercitare"],
        },
      },
      exhort: {
        lexeme: "exhort",
        id: 1577020,
        definition: "To strongly encourage or urge someone to do something.",
        example:
          "The coach exhorted the team to give their best effort in the final game.",
        etymology:
          "From Latin 'exhortari', meaning 'to encourage, urge', from 'ex-' (thoroughly) + 'hortari' (to encourage).",
        partOfSpeech: "verb",
        date: "2025-04-23",
        synonyms: ["urge", "encourage", "press", "prod", "spur"],
        antonyms: ["discourage", "dissuade", "deter"],
        related: ["motivate", "inspire", "persuade", "advocate"],
        translations: {
          de: ["ermahnen"],
          fr: ["exhorter"],
          es: ["exhortar"],
          it: ["esortare"],
        },
      },
      exigen: {
        lexeme: "exigen",
        id: 9815074,
        definition: "To demand or require something as necessary or essential.",
        example: "The job exigens a high level of attention to detail.",
        etymology:
          "From Latin 'exigere', meaning 'to demand, require, or drive out', composed of 'ex-' (out) + 'agere' (to drive).",
        partOfSpeech: "verb",
        date: "2025-05-22",
        synonyms: ["demand", "require", "necessitate", "command", "insist"],
        antonyms: ["waive", "relinquish", "forgo", "abandon"],
        related: ["exigency", "exigent", "requirement", "demand"],
        translations: {
          de: ["fordern"],
          fr: ["exiger"],
          es: ["exigir"],
          it: ["esigere"],
        },
      },
      exigency: {
        lexeme: "exigency",
        id: 5336545,
        definition: "An urgent need or demand.",
        example: "The exigency of the situation required immediate action.",
        etymology:
          "From Latin 'exigentia' (demand, urgency), from 'exigere' (to demand, require).",
        partOfSpeech: "noun",
        date: "2026-01-02",
        synonyms: ["urgency", "necessity", "crisis", "emergency"],
        antonyms: ["nonurgency", "triviality", "insignificance"],
        related: ["demand", "pressure", "requirement", "imperative"],
        translations: {
          de: ["Dringlichkeit"],
          fr: ["urgence"],
          es: ["urgencia"],
          it: ["urgenza"],
        },
      },
      exonerate: {
        lexeme: "exonerate",
        id: 9423864,
        definition: "To absolve someone from blame for a fault or wrongdoing.",
        example:
          "The new evidence helped to exonerate the wrongly accused man.",
        etymology:
          "From Latin 'exonerare', meaning 'to unburden', from 'ex-' (out of) + 'onus' (burden).",
        partOfSpeech: "verb",
        date: "2025-10-19",
        synonyms: ["acquit", "clear", "absolve", "vindicate", "discharge"],
        antonyms: ["incriminate", "accuse", "blame", "condemn", "convict"],
        related: [
          "innocence",
          "pardon",
          "justify",
          "forgiveness",
          "vindication",
        ],
        translations: {
          de: ["freisprechen"],
          fr: ["disculper"],
          es: ["exonerar"],
          it: ["scagionare"],
        },
      },
      expedite: {
        lexeme: "expedite",
        id: 5807584,
        definition:
          "To make an action or process happen sooner or be accomplished more quickly.",
        example:
          "The manager asked the team to expedite the project to meet the new deadline.",
        etymology:
          "From Latin 'expeditus', past participle of 'expedire' meaning 'to set free, make ready'.",
        partOfSpeech: "verb",
        date: "2025-11-05",
        synonyms: ["accelerate", "hasten", "speed up", "facilitate"],
        antonyms: ["delay", "hinder", "slow down", "impede"],
        related: ["efficient", "prompt", "swift", "streamline"],
        translations: {
          de: ["beschleunigen"],
          fr: ["accélérer"],
          es: ["acelerar"],
          it: ["accelerare"],
        },
      },
      expunge: {
        lexeme: "expunge",
        id: 9848059,
        definition: "To erase or remove completely.",
        example:
          "The court ordered the records to be expunged after the case was dismissed.",
        etymology:
          "From Latin 'expungere', meaning 'to mark for deletion by dots', from 'ex-' (out) + 'pungere' (to prick).",
        partOfSpeech: "verb",
        date: "2025-08-27",
        synonyms: ["erase", "delete", "obliterate", "eliminate"],
        antonyms: ["retain", "keep", "preserve"],
        related: ["expunction", "expungement", "purge"],
        translations: {
          de: ["löschen"],
          fr: ["effacer"],
          es: ["borrar"],
          it: ["cancellare"],
        },
      },
      extant: {
        lexeme: "extant",
        id: 1932277,
        definition: "Still in existence; surviving.",
        example:
          "The extant manuscripts of the ancient text provide valuable insights into early literature.",
        etymology:
          "From Latin 'extant-', present participle of 'exstare' (to stand out, exist), from 'ex-' (out) + 'stare' (to stand).",
        partOfSpeech: "adjective",
        date: "2025-05-24",
        synonyms: ["existing", "remaining", "surviving"],
        antonyms: ["extinct", "nonexistent", "lost"],
        related: ["enduring", "persistent", "current"],
        translations: {
          de: ["vorhanden"],
          fr: ["existant"],
          es: ["existente"],
          it: ["esistente"],
        },
      },
      extol: {
        lexeme: "extol",
        id: 4987689,
        definition: "To praise highly; to laud.",
        example:
          "The critics extolled the director's innovative approach to storytelling.",
        etymology:
          "From Latin 'extollere', meaning 'to lift up, raise, or elevate', from 'ex-' (out) + 'tollere' (to lift).",
        partOfSpeech: "verb",
        date: "2026-02-15",
        synonyms: ["praise", "commend", "glorify", "acclaim", "applaud"],
        antonyms: ["criticize", "condemn", "denounce", "disparage", "belittle"],
        related: ["admire", "celebrate", "honor", "revere", "eulogize"],
        translations: {
          de: ["preisen"],
          fr: ["louer"],
          es: ["ensalzar"],
          it: ["esaltare"],
        },
      },
      extraneous: {
        lexeme: "extraneous",
        id: 314479,
        definition: "Irrelevant or unrelated to the subject being dealt with.",
        example:
          "The professor asked the student to remove extraneous details from the research paper.",
        etymology:
          "From Latin 'extraneus' meaning 'external' or 'foreign', derived from 'extra' (outside).",
        partOfSpeech: "adjective",
        date: "2025-12-16",
        synonyms: ["irrelevant", "unrelated", "superfluous", "peripheral"],
        antonyms: ["relevant", "pertinent", "germane", "central"],
        related: ["tangential", "incidental", "inessential", "nonessential"],
        translations: {
          de: ["fremd, irrelevant"],
          fr: ["extérieur, étranger"],
          es: ["ajeno, irrelevante"],
          it: ["estraneo, irrilevante"],
        },
      },
      extravagant: {
        lexeme: "extravagant",
        id: 8324175,
        definition:
          "Exceeding what is reasonable or appropriate; excessive or elaborate.",
        example:
          "She wore an extravagant gown covered in sequins to the party.",
        etymology:
          "From Middle English 'extravagant', borrowed from Old French 'extravagant', from Medieval Latin 'extravagantem' (wandering beyond), from Latin 'extra' (outside) + 'vagari' (to wander).",
        partOfSpeech: "adjective",
        date: "2026-02-07",
        synonyms: ["lavish", "excessive", "opulent", "over-the-top"],
        antonyms: ["frugal", "modest", "restrained", "simple"],
        related: ["luxurious", "ostentatious", "grandiose", "flamboyant"],
        translations: {
          de: ["extravagant"],
          fr: ["extravagant"],
          es: ["extravagante"],
          it: ["stravagante"],
        },
      },
      exultant: {
        lexeme: "exultant",
        id: 4469889,
        definition: "Feeling or showing great happiness or triumph.",
        example:
          "The team was exultant after their unexpected victory in the finals.",
        etymology:
          "From Latin 'exultant-', present participle of 'exultare' (to leap up, exult), from 'ex-' (out) + 'saltare' (to leap, frequentative of 'salire').",
        partOfSpeech: "adjective",
        date: "2025-02-06",
        synonyms: ["elated", "jubilant", "ecstatic", "triumphant", "joyful"],
        antonyms: ["dejected", "despondent", "downcast", "sorrowful"],
        related: ["exult", "exultation", "celebratory", "gleeful"],
        translations: {
          de: ["jubelnd"],
          fr: ["exultant"],
          es: ["exultante"],
          it: ["esultante"],
        },
      },
      facile: {
        lexeme: "facile",
        id: 6369460,
        definition: "Achieved without great effort; superficial.",
        example: "His facile explanation didn't convince anyone.",
        etymology:
          "From Middle French 'facile', from Latin 'facilis' (easy to do), from 'facere' (to do).",
        partOfSpeech: "adjective",
        date: "2026-02-05",
        synonyms: ["easy", "effortless", "glib", "simplistic"],
        antonyms: ["difficult", "arduous", "complex"],
        related: ["facilitate", "facility", "facilely"],
        translations: {
          de: ["leicht"],
          fr: ["facile"],
          es: ["fácil"],
          it: ["facile"],
        },
      },
      fallow: {
        lexeme: "fallow",
        id: 2581265,
        definition:
          "Left unseeded or uncultivated for a period of time to restore fertility.",
        example:
          "The farmer left the field fallow for a year to allow the soil to recover.",
        etymology:
          "From Old English 'fealgian', meaning to break up land for sowing, related to 'fealu' (pale, yellowish).",
        partOfSpeech: "adjective",
        date: "2026-01-29",
        synonyms: ["uncultivated", "unplanted", "idle", "resting"],
        antonyms: ["cultivated", "planted", "productive", "active"],
        related: ["arable", "barren", "dormant", "fertile"],
        translations: {
          de: ["brach"],
          fr: ["en jachère"],
          es: ["en barbecho"],
          it: ["a maggese"],
        },
      },
      farcical: {
        lexeme: "farcical",
        id: 1054862,
        definition: "Relating to or resembling farce; absurdly ridiculous.",
        example:
          "The play was a farcical take on political corruption, filled with exaggerated characters and ludicrous situations.",
        etymology:
          "From French 'farce' (comic interlude in a mystery play) + '-ical', influenced by Latin 'farcire' (to stuff).",
        partOfSpeech: "adjective",
        date: "2026-03-09",
        synonyms: ["ludicrous", "preposterous", "ridiculous", "absurd"],
        antonyms: ["serious", "solemn", "grave"],
        related: ["comedy", "satire", "buffoonery", "slapstick"],
        translations: {
          de: ["farcehaft"],
          fr: ["farcical"],
          es: ["farsesco"],
          it: ["farsesco"],
        },
      },
      fatuous: {
        lexeme: "fatuous",
        id: 7660227,
        definition: "Silly and pointless.",
        example:
          "His fatuous remarks during the meeting added nothing of value to the discussion.",
        etymology: "From Latin 'fatuus' (foolish, silly).",
        partOfSpeech: "adjective",
        date: "2026-02-11",
        synonyms: ["silly", "foolish", "inane", "idiotic"],
        antonyms: ["wise", "intelligent", "sensible"],
        related: ["absurd", "ridiculous", "nonsensical"],
        translations: {
          de: ["albern"],
          fr: ["stupide"],
          es: ["fatua"],
          it: ["fatua"],
        },
      },
      fecund: {
        lexeme: "fecund",
        id: 2183598,
        definition:
          "Producing or capable of producing an abundance of offspring or new growth; fertile.",
        example: "The fecund soil yielded a bountiful harvest.",
        etymology: "From Latin 'fecundus', meaning fruitful or fertile.",
        partOfSpeech: "adjective",
        date: "2025-09-07",
        synonyms: ["fertile", "productive", "fruitful", "prolific", "rich"],
        antonyms: ["barren", "sterile", "infertile", "unproductive"],
        related: ["fecundity", "fecundate", "fertility", "abundance"],
        translations: {
          de: ["fruchtbar"],
          fr: ["fécond"],
          es: ["fecundo"],
          it: ["fecondo"],
        },
      },
      feign: {
        lexeme: "feign",
        id: 8898444,
        definition: "To pretend or give a false appearance of something.",
        example: "She tried to feign indifference when she heard the news.",
        etymology:
          "From Middle English 'feinen', from Old French 'feindre', from Latin 'fingere' (to shape, invent, pretend).",
        partOfSpeech: "verb",
        date: "2026-03-20",
        synonyms: ["pretend", "simulate", "fake", "sham", "affect"],
        antonyms: ["be genuine", "be sincere", "reveal"],
        related: ["deceive", "dissemble", "masquerade", "bluff"],
        translations: {
          de: ["vortäuschen"],
          fr: ["feindre"],
          es: ["fingir"],
          it: ["fingere"],
        },
      },
      felicitous: {
        lexeme: "felicitous",
        id: 135706,
        definition:
          "Well-chosen or suited to the circumstances; pleasing and fortunate.",
        example: "Her felicitous remark lightened the mood of the entire room.",
        etymology:
          "From Latin 'felix, felic-' meaning 'happy, fortunate' + the suffix '-itous'.",
        partOfSpeech: "adjective",
        date: "2025-02-07",
        synonyms: ["apt", "appropriate", "fitting", "happy", "opportune"],
        antonyms: ["inappropriate", "unfortunate", "unsuitable", "ill-timed"],
        related: ["felicity", "felicitate", "fortunate", "graceful"],
        translations: {
          de: ["glücklich"],
          fr: ["heureux"],
          es: ["feliz"],
          it: ["felice"],
        },
      },
      felicity: {
        lexeme: "felicity",
        id: 3668815,
        definition:
          "Intense happiness or the ability to find appropriate expression.",
        example:
          "She wrote with such felicity that her words seemed to dance on the page.",
        etymology:
          "From Middle English 'felicite', from Old French 'felicité', from Latin 'felicitas' (happiness), from 'felix' (happy).",
        partOfSpeech: "noun",
        date: "2026-02-27",
        synonyms: ["joy", "bliss", "happiness", "delight"],
        antonyms: ["misery", "sorrow", "unhappiness"],
        related: ["euphoria", "contentment", "serenity"],
        translations: {
          de: ["Glückseligkeit"],
          fr: ["félicité"],
          es: ["felicidad"],
          it: ["felicità"],
        },
      },
      fervid: {
        lexeme: "fervid",
        id: 7997030,
        definition:
          "Intensely enthusiastic or passionate, especially to an excessive degree.",
        example:
          "The politician gave a fervid speech that ignited the crowd's emotions.",
        etymology:
          "From Latin 'fervidus', meaning 'glowing, burning, boiling', from 'fervēre' (to boil, glow).",
        partOfSpeech: "adjective",
        date: "2025-06-04",
        synonyms: ["ardent", "passionate", "vehement", "fiery"],
        antonyms: ["apathetic", "indifferent", "cool"],
        related: ["fervor", "fervency", "zealous"],
        translations: {
          de: ["leidenschaftlich"],
          fr: ["ardent"],
          es: ["ferviente"],
          it: ["fervido"],
        },
      },
      fervor: {
        lexeme: "fervor",
        id: 9934236,
        definition: "Intense and passionate feeling or enthusiasm.",
        example:
          "The crowd cheered with fervor as the team scored the winning goal.",
        etymology:
          "From Middle English 'fervour', from Old French 'fervor', from Latin 'fervor' (heat, passion), from 'fervēre' (to boil, glow).",
        partOfSpeech: "noun",
        date: "2025-07-11",
        synonyms: ["passion", "zeal", "ardor", "enthusiasm"],
        antonyms: ["apathy", "indifference", "coolness"],
        related: ["fervent", "fervency", "fervid"],
        translations: {
          de: ["Inbrunst"],
          fr: ["ferveur"],
          es: ["fervor"],
          it: ["fervore"],
        },
      },
      finesse: {
        lexeme: "finesse",
        id: 2481962,
        definition:
          "Skillful handling of a situation; delicate or artful management.",
        example:
          "She handled the negotiations with such finesse that both parties were satisfied.",
        etymology:
          "From Middle French 'finesse', meaning 'fineness, subtlety', derived from 'fin' ('fine, delicate').",
        partOfSpeech: "noun",
        date: "2025-10-11",
        synonyms: ["tact", "subtlety", "diplomacy", "adroitness"],
        antonyms: ["clumsiness", "ineptitude", "awkwardness"],
        related: ["grace", "precision", "skill", "artfulness"],
        translations: {
          de: ["Finesse"],
          fr: ["finesse"],
          es: ["fineza"],
          it: ["finezza"],
        },
      },
      flippant: {
        lexeme: "flippant",
        id: 9762267,
        definition: "Not showing a serious or respectful attitude.",
        example: "She gave a flippant response to the serious question.",
        etymology:
          "From the late 16th century, possibly from 'flip' (a variant of 'flap') + '-ant', influenced by 'flippen' (to jeer or mock).",
        partOfSpeech: "adjective",
        date: "2025-02-18",
        synonyms: ["frivolous", "glib", "disrespectful", "lighthearted"],
        antonyms: ["serious", "respectful", "earnest", "solemn"],
        related: ["flippancy", "flippantly", "sarcastic", "irreverent"],
        translations: {
          de: ["flapsig"],
          fr: ["léger"],
          es: ["frívolo"],
          it: ["frivolo"],
        },
      },
      florid: {
        lexeme: "florid",
        id: 5938238,
        definition:
          "Having a red or flushed complexion; elaborately or excessively intricate or complicated.",
        example:
          "His florid prose was filled with ornate descriptions and elaborate metaphors.",
        etymology:
          "From Latin 'floridus', meaning 'flowery, blooming', from 'flos' (flower).",
        partOfSpeech: "adjective",
        date: "2025-10-12",
        synonyms: ["ornate", "embellished", "flamboyant", "rubicund", "rosy"],
        antonyms: ["plain", "simple", "pale", "austere"],
        related: ["floridly", "floridness", "floridity"],
        translations: {
          de: ["blumig / rotgesichtig"],
          fr: ["fleuri / rubicond"],
          es: ["florido / rubicundo"],
          it: ["florido / rubicondo"],
        },
      },
      foible: {
        lexeme: "foible",
        id: 4223087,
        definition: "A minor weakness or eccentricity in someone's character.",
        example: "One of his foibles is his habit of humming while he works.",
        etymology:
          "From French 'foible', meaning 'weak point', derived from Old French 'feble' (weak), ultimately from Latin 'flebilis' (lamentable).",
        partOfSpeech: "noun",
        date: "2025-02-12",
        synonyms: ["quirk", "idiosyncrasy", "peculiarity", "weakness"],
        antonyms: ["strength", "virtue", "forte"],
        related: ["flaw", "imperfection", "eccentricity"],
        translations: {
          de: ["Schwäche"],
          fr: ["défaut"],
          es: ["debilidad"],
          it: ["debolezza"],
        },
      },
      fortuitous: {
        lexeme: "fortuitous",
        id: 1016145,
        definition: "Happening by chance rather than intention.",
        example:
          "The meeting was fortuitous, as we hadn't planned to see each other.",
        etymology:
          "From Latin 'fortuitus', meaning 'accidental', from 'fors' (chance).",
        partOfSpeech: "adjective",
        date: "2026-04-05",
        synonyms: ["accidental", "coincidental", "unplanned", "serendipitous"],
        antonyms: ["intentional", "planned", "deliberate"],
        related: ["random", "unexpected", "luck"],
        translations: {
          de: ["zufällig"],
          fr: ["fortuit"],
          es: ["fortuito"],
          it: ["fortuito"],
        },
      },
      fractious: {
        lexeme: "fractious",
        id: 4621677,
        definition: "Irritable and quarrelsome.",
        example: "The fractious toddler refused to take a nap.",
        etymology:
          "From Latin 'fractus' (broken) + '-ious', implying a tendency to break into disputes.",
        partOfSpeech: "adjective",
        date: "2025-06-26",
        synonyms: ["peevish", "cranky", "irritable", "testy"],
        antonyms: ["agreeable", "cooperative", "easygoing"],
        related: ["contentious", "unruly", "rebellious"],
        translations: {
          de: ["aufmüpfig"],
          fr: ["irascible"],
          es: ["quisquilloso"],
          it: ["irascibile"],
        },
      },
      fuligmous: {
        lexeme: "fuligmous",
        id: 7747798,
        definition:
          "Sooty or smoky in appearance; resembling or covered with soot.",
        example:
          "The fuligmous walls of the old factory bore witness to decades of industrial activity.",
        etymology:
          "From Latin 'fuliginosus,' meaning 'sooty,' derived from 'fuligo' (soot).",
        partOfSpeech: "adjective",
        date: "2025-02-10",
        synonyms: ["sooty", "smoky", "blackened", "grime-covered"],
        antonyms: ["clean", "pristine", "spotless"],
        related: ["smudged", "charred", "dirty", "smudgy"],
        translations: {
          de: ["rußig"],
          fr: ["fuligineux"],
          es: ["hollinoso"],
          it: ["fuligginoso"],
        },
      },
      garrulous: {
        lexeme: "garrulous",
        id: 5718784,
        definition: "Excessively talkative, especially about trivial matters.",
        example:
          "The garrulous old man kept the neighbors engaged with stories of his youth.",
        etymology:
          "From Latin 'garrulus' (talkative), derived from 'garrire' (to chatter).",
        partOfSpeech: "adjective",
        date: "2025-07-08",
        synonyms: ["talkative", "loquacious", "verbose", "chatty"],
        antonyms: ["taciturn", "reticent", "reserved", "laconic"],
        related: ["effusive", "voluble", "gabby", "long-winded"],
        translations: {
          de: ["geschwätzig"],
          fr: ["bavard"],
          es: ["locuaz"],
          it: ["loquace"],
        },
      },
      gauche: {
        lexeme: "gauche",
        id: 2104608,
        definition: "Lacking social grace or tact; awkward.",
        example:
          "His gauche comments at the dinner party made everyone uncomfortable.",
        etymology:
          "From French 'gauche', meaning 'left' or 'awkward', from gauchir 'to turn aside'.",
        partOfSpeech: "adjective",
        date: "2025-03-16",
        synonyms: ["awkward", "clumsy", "inept", "tactless"],
        antonyms: ["graceful", "polished", "suave", "tactful"],
        related: ["uncouth", "boorish", "maladroit"],
        translations: {
          de: ["taktlos"],
          fr: ["gauche"],
          es: ["torpe"],
          it: ["goffo"],
        },
      },
      germane: {
        lexeme: "germane",
        id: 5124807,
        definition: "Relevant or appropriate to a particular matter.",
        example: "The judge ruled that the evidence was germane to the case.",
        etymology:
          "From Latin 'germanus' (having the same parents, genuine), via Old French 'germain'.",
        partOfSpeech: "adjective",
        date: "2025-09-23",
        synonyms: ["relevant", "pertinent", "applicable"],
        antonyms: ["irrelevant", "unrelated", "extraneous"],
        related: ["connected", "appropriate", "fitting"],
        translations: {
          de: ["relevant"],
          fr: ["pertinent"],
          es: ["pertinente"],
          it: ["pertinente"],
        },
      },
      gluttonous: {
        lexeme: "gluttonous",
        id: 3512048,
        definition: "Excessively greedy or eager, especially in eating.",
        example:
          "The gluttonous feast left everyone feeling uncomfortably full.",
        etymology:
          "From Middle English 'glotonous', from Old French 'gloton', derived from Latin 'gluto' (glutton).",
        partOfSpeech: "adjective",
        date: "2025-07-15",
        synonyms: ["voracious", "ravenous", "insatiable", "greedy"],
        antonyms: ["abstemious", "moderate", "temperate"],
        related: ["glutton", "gluttony", "overindulgence"],
        translations: {
          de: ["gefräßig"],
          fr: ["glouton"],
          es: ["glotón"],
          it: ["goloso"],
        },
      },
      gregarious: {
        lexeme: "gregarious",
        id: 7560334,
        definition: "Fond of company; sociable.",
        example:
          "She was a gregarious child who loved playing with other kids.",
        etymology:
          "From Latin 'gregarius' (pertaining to a flock or herd), from 'grex' (flock).",
        partOfSpeech: "adjective",
        date: "2025-12-03",
        synonyms: ["sociable", "outgoing", "friendly", "affable"],
        antonyms: ["introverted", "reserved", "solitary", "unsociable"],
        related: ["extroverted", "convivial", "companionable"],
        translations: {
          de: ["gesellig"],
          fr: ["grégaire"],
          es: ["gregario"],
          it: ["gregario"],
        },
      },
      hackneyed: {
        lexeme: "hackneyed",
        id: 2598794,
        definition: "Overused and lacking originality; clichéd.",
        example:
          "The movie's plot was so hackneyed that I could predict every twist.",
        etymology:
          "From 'Hackney,' a London borough known for hired horses (implying overuse), later generalized to mean 'trite'.",
        partOfSpeech: "adjective",
        date: "2025-04-19",
        synonyms: ["clichéd", "trite", "banal", "stale"],
        antonyms: ["original", "fresh", "innovative"],
        related: ["overused", "unoriginal", "predictable"],
        translations: {
          de: ["abgedroschen"],
          fr: ["rebattu"],
          es: ["trillado"],
          it: ["banale"],
        },
      },
      hapless: {
        lexeme: "hapless",
        id: 9659867,
        definition: "Unfortunate or unlucky.",
        example: "The hapless traveler lost his way in the storm.",
        etymology:
          "From Middle English 'hap' (luck) + '-less' (without), meaning 'without luck'.",
        partOfSpeech: "adjective",
        date: "2025-07-03",
        synonyms: ["unfortunate", "luckless", "ill-fated", "wretched"],
        antonyms: ["fortunate", "lucky", "blessed"],
        related: ["misfortune", "adversity", "doomed"],
        translations: {
          de: ["unglücklich"],
          fr: ["malchanceux"],
          es: ["desafortunado"],
          it: ["sfortunato"],
        },
      },
      harangue: {
        lexeme: "harangue",
        id: 6714180,
        definition:
          "A lengthy and aggressive speech or lecture, often delivered in a critical or angry manner.",
        example:
          "The coach delivered a fiery harangue to the team after their lackluster performance.",
        etymology:
          "From Old French 'harangue', possibly from Old Italian 'aringa' (public speech), derived from Gothic *hriggō (assembly).",
        partOfSpeech: "noun",
        date: "2025-10-20",
        synonyms: ["tirade", "diatribe", "rant", "lecture"],
        antonyms: ["praise", "compliment", "accolade"],
        related: ["oration", "sermon", "address", "speech"],
        translations: {
          de: ["Tirade"],
          fr: ["harangue"],
          es: ["arenga"],
          it: ["arringa"],
        },
      },
      harbinger: {
        lexeme: "harbinger",
        id: 7134634,
        definition:
          "A person or thing that announces or signals the approach of another.",
        example: "The robin is often considered a harbinger of spring.",
        etymology:
          "Middle English 'herbenger', from Old French 'herbergier', meaning 'to provide lodging', from 'herberge' (lodging).",
        partOfSpeech: "noun",
        date: "2025-12-26",
        synonyms: ["forerunner", "precursor", "herald", "omen"],
        antonyms: ["follower", "successor"],
        related: ["announce", "signal", "indicator", "portent"],
        translations: {
          de: ["Vorbote"],
          fr: ["précurseur"],
          es: ["precursor"],
          it: ["precursore"],
        },
      },
      haughty: {
        lexeme: "haughty",
        id: 6776334,
        definition:
          "Having or showing an attitude of superiority and contempt for people or things perceived to be inferior.",
        example: "She gave him a haughty look and turned away.",
        etymology:
          "From Middle English 'hautein', from Old French 'hautain', derived from 'haut' (high), from Latin 'altus'.",
        partOfSpeech: "adjective",
        date: "2025-02-11",
        synonyms: [
          "arrogant",
          "disdainful",
          "supercilious",
          "snobbish",
          "proud",
        ],
        antonyms: ["humble", "modest", "meek", "unassuming"],
        related: ["condescending", "patronizing", "lofty", "imperious"],
        translations: {
          de: ["hochmütig"],
          fr: ["hautain"],
          es: ["altanero"],
          it: ["altezzoso"],
        },
      },
      hedonist: {
        lexeme: "hedonist",
        id: 5641214,
        definition:
          "A person who believes that pleasure is the most important thing in life.",
        example:
          "As a hedonist, he spent his days indulging in fine wines, gourmet foods, and luxurious vacations.",
        etymology:
          "From Greek 'hēdonē' (pleasure) + '-ist' (one who practices or is concerned with something).",
        partOfSpeech: "noun",
        date: "2026-02-23",
        synonyms: ["pleasure-seeker", "sensualist", "bon vivant", "epicurean"],
        antonyms: ["ascetic", "puritan", "stoic"],
        related: ["hedonism", "hedonic", "pleasure", "indulgence"],
        translations: {
          de: ["Hedonist"],
          fr: ["hédoniste"],
          es: ["hedonista"],
          it: ["edonista"],
        },
      },
      hiatus: {
        lexeme: "hiatus",
        id: 7109247,
        definition: "A pause or gap in a sequence, series, or process.",
        example:
          "After the final episode, the show went on a three-month hiatus before returning for its next season.",
        etymology:
          "From Latin 'hiatus' (opening, gap), from 'hiare' (to gape).",
        partOfSpeech: "noun",
        date: "2025-12-20",
        synonyms: ["break", "pause", "gap", "interruption", "respite"],
        antonyms: ["continuation", "continuity", "uninterruptedness"],
        related: ["interlude", "lull", "intermission", "recess"],
        translations: {
          de: ["Pause"],
          fr: ["hiatus"],
          es: ["hiato"],
          it: ["pausa"],
        },
      },
      hoary: {
        lexeme: "hoary",
        id: 4278236,
        definition: "Grayish white; ancient or venerable.",
        example: "The hoary old professor shared his wisdom with the students.",
        etymology:
          "From Old English 'hār' (gray, venerable), related to Old Norse 'hárr' (hoary, gray).",
        partOfSpeech: "adjective",
        date: "2025-10-09",
        synonyms: ["gray", "aged", "ancient", "venerable"],
        antonyms: ["young", "fresh", "new"],
        related: ["frosted", "grizzled", "timeworn"],
        translations: {
          de: ["ergraut, ehrwürdig"],
          fr: ["blanchâtre, vénérable"],
          es: ["cano, venerable"],
          it: ["canuto, venerabile"],
        },
      },
      hone: {
        lexeme: "hone",
        id: 3483682,
        definition: "To refine or perfect something over time.",
        example: "She honed her skills as a pianist through years of practice.",
        etymology:
          "From Old English 'hān', meaning 'stone', later evolving to mean 'to sharpen'.",
        partOfSpeech: "verb",
        date: "2025-11-16",
        synonyms: ["sharpen", "polish", "refine", "improve"],
        antonyms: ["dull", "blunt", "weaken"],
        related: ["practice", "training", "development"],
        translations: {
          de: ["schärfen"],
          fr: ["affûter"],
          es: ["afilar"],
          it: ["affilare"],
        },
      },
      hubris: {
        lexeme: "hubris",
        id: 9237866,
        definition:
          "Excessive pride or self-confidence, often leading to downfall.",
        example:
          "His hubris blinded him to the warnings of his advisors, resulting in a disastrous decision.",
        etymology: "From Greek 'hybris', meaning 'insolence' or 'outrage'.",
        partOfSpeech: "noun",
        date: "2026-01-21",
        synonyms: ["arrogance", "conceit", "overconfidence"],
        antonyms: ["humility", "modesty"],
        related: ["pride", "ego", "vanity"],
        translations: {
          de: ["Hybris"],
          fr: ["hubris"],
          es: ["hubris"],
          it: ["hybris"],
        },
      },
      iconoclast: {
        lexeme: "iconoclast",
        id: 8134819,
        definition:
          "A person who attacks or criticizes cherished beliefs or institutions.",
        example:
          "The artist was considered an iconoclast for challenging traditional painting techniques.",
        etymology:
          "From Late Latin 'iconoclastes', from Greek 'eikonoklastēs' (image breaker), from 'eikōn' (image) + 'klan' (to break).",
        partOfSpeech: "noun",
        date: "2025-04-06",
        synonyms: ["rebel", "heretic", "dissenter", "nonconformist"],
        antonyms: ["conformist", "traditionalist", "conservative"],
        related: ["radical", "maverick", "innovator", "skeptic"],
        translations: {
          de: ["Ikonoklast"],
          fr: ["iconoclaste"],
          es: ["iconoclasta"],
          it: ["iconoclasta"],
        },
      },
      idiosyncratic: {
        lexeme: "idiosyncratic",
        id: 449074,
        definition: "Peculiar or unique to an individual.",
        example:
          "Her idiosyncratic style of painting made her work instantly recognizable.",
        etymology:
          "From Greek 'idios' (one's own) + 'synkrasis' (temperament), via French 'idiosyncrasie'.",
        partOfSpeech: "adjective",
        date: "2026-02-21",
        synonyms: ["distinctive", "individualistic", "quirky", "unique"],
        antonyms: ["common", "generic", "typical", "conventional"],
        related: ["eccentric", "peculiar", "characteristic", "personal"],
        translations: {
          de: ["idiosynkratisch"],
          fr: ["idiosyncratique"],
          es: ["idiosincrático"],
          it: ["idiosincratico"],
        },
      },
      ignominious: {
        lexeme: "ignominious",
        id: 2191163,
        definition: "Deserving or causing public disgrace or shame.",
        example:
          "The team suffered an ignominious defeat in the championship game.",
        etymology:
          "From Latin 'ignominiosus', from 'ignominia' (disgrace), combining 'in-' (not) + 'nomen' (name, reputation).",
        partOfSpeech: "adjective",
        date: "2026-04-08",
        synonyms: ["shameful", "disgraceful", "humiliating", "degrading"],
        antonyms: ["honorable", "glorious", "admirable", "respectable"],
        related: ["ignominy", "disrepute", "infamy", "scandal"],
        translations: {
          de: ["schmachvoll"],
          fr: ["ignominieux"],
          es: ["ignominioso"],
          it: ["ignominioso"],
        },
      },
      illicit: {
        lexeme: "illicit",
        id: 3820578,
        definition: "Forbidden by law, rules, or custom.",
        example:
          "The police seized a large quantity of illicit drugs during the raid.",
        etymology:
          "From Latin 'illicitus', meaning 'not allowed', from 'in-' (not) + 'licitus' (allowed).",
        partOfSpeech: "adjective",
        date: "2026-01-04",
        synonyms: [
          "illegal",
          "unlawful",
          "prohibited",
          "unauthorized",
          "banned",
        ],
        antonyms: ["legal", "lawful", "permitted", "authorized", "licit"],
        related: ["crime", "contraband", "smuggling", "forbidden", "taboo"],
        translations: {
          de: ["unerlaubt"],
          fr: ["illicite"],
          es: ["ilícito"],
          it: ["illecito"],
        },
      },
      imbue: {
        lexeme: "imbue",
        id: 6058176,
        definition: "To inspire or permeate with a feeling or quality.",
        example:
          "The teacher sought to imbue her students with a love for learning.",
        etymology: "From Latin 'imbuere', meaning 'to moisten, steep, or dye'.",
        partOfSpeech: "verb",
        date: "2025-08-10",
        synonyms: ["infuse", "permeate", "saturate", "instill"],
        antonyms: ["drain", "deprive", "empty"],
        related: ["inspire", "engrain", "pervade", "animate"],
        translations: {
          de: ["durchdringen"],
          fr: ["imprégner"],
          es: ["imbuir"],
          it: ["imbevvere"],
        },
      },
      immutable: {
        lexeme: "immutable",
        id: 6513419,
        definition: "Unchanging over time or unable to be changed.",
        example: "The laws of physics are often considered immutable.",
        etymology:
          "From Latin 'immutabilis', from 'in-' (not) + 'mutabilis' (changeable).",
        partOfSpeech: "adjective",
        date: "2025-06-22",
        synonyms: ["unchangeable", "fixed", "permanent", "invariable"],
        antonyms: ["mutable", "changeable", "variable", "flexible"],
        related: ["eternal", "static", "unalterable", "indestructible"],
        translations: {
          de: ["unveränderlich"],
          fr: ["immuable"],
          es: ["inmutable"],
          it: ["immutabile"],
        },
      },
      imperious: {
        lexeme: "imperious",
        id: 8407048,
        definition:
          "Assuming power or authority without justification; arrogant and domineering.",
        example:
          "His imperious manner made it clear he expected everyone to follow his orders without question.",
        etymology:
          "From Latin 'imperiosus', meaning 'commanding, powerful', from 'imperium' (command, authority).",
        partOfSpeech: "adjective",
        date: "2025-01-26",
        synonyms: [
          "domineering",
          "authoritarian",
          "overbearing",
          "dictatorial",
          "haughty",
        ],
        antonyms: ["humble", "modest", "submissive", "unassuming"],
        related: ["arrogant", "bossy", "commanding", "tyrannical", "lordly"],
        translations: {
          de: ["herrschsüchtig"],
          fr: ["impérieux"],
          es: ["imperioso"],
          it: ["imperioso"],
        },
      },
      impetuous: {
        lexeme: "impetuous",
        id: 7058566,
        definition: "Acting or done quickly and without thought or care.",
        example:
          "Her impetuous decision to quit her job without another lined up left her in financial trouble.",
        etymology:
          "From Middle English, from Old French impetueux, from Late Latin impetuosus, from Latin impetus 'attack, impetus'.",
        partOfSpeech: "adjective",
        date: "2025-11-01",
        synonyms: ["impulsive", "rash", "reckless", "hasty"],
        antonyms: ["cautious", "deliberate", "thoughtful", "prudent"],
        related: ["impetuosity", "impetus", "impulse"],
        translations: {
          de: ["ungestüm"],
          fr: ["impétueux"],
          es: ["impetuoso"],
          it: ["impetuoso"],
        },
      },
      implacable: {
        lexeme: "implacable",
        id: 5378144,
        definition: "Unable to be appeased or pacified; relentless.",
        example: "The implacable enemy refused all offers of negotiation.",
        etymology:
          "From Latin 'implacabilis', from 'in-' (not) + 'placabilis' (placable, able to be appeased).",
        partOfSpeech: "adjective",
        date: "2025-01-27",
        synonyms: ["unrelenting", "merciless", "unyielding", "inexorable"],
        antonyms: ["placable", "forgiving", "lenient", "merciful"],
        related: ["relentless", "ruthless", "inflexible", "adamant"],
        translations: {
          de: ["unerbittlich"],
          fr: ["implacable"],
          es: ["implacable"],
          it: ["implacabile"],
        },
      },
      imprecation: {
        lexeme: "imprecation",
        id: 6190655,
        definition: "A spoken curse or invocation of evil upon someone.",
        example:
          "The old man muttered an imprecation under his breath as the thief ran away.",
        etymology:
          "From Latin 'imprecatio', from 'imprecari' (to invoke evil), from 'in-' (upon) + 'precari' (to pray).",
        partOfSpeech: "noun",
        date: "2026-02-19",
        synonyms: ["curse", "malediction", "anathema", "execration"],
        antonyms: ["blessing", "benediction", "praise"],
        related: ["oath", "swear", "damnation", "hex"],
        translations: {
          de: ["Fluch"],
          fr: ["imprécation"],
          es: ["imprecación"],
          it: ["imprecazione"],
        },
      },
      impudent: {
        lexeme: "impudent",
        id: 3636603,
        definition: "Not showing due respect; bold or shameless.",
        example:
          "The impudent student talked back to the teacher without any hesitation.",
        etymology:
          "From Latin 'impudens', meaning 'shameless', from 'in-' (not) + 'pudens' (modest, ashamed).",
        partOfSpeech: "adjective",
        date: "2025-05-26",
        synonyms: ["insolent", "brazen", "audacious", "cheeky"],
        antonyms: ["respectful", "modest", "polite"],
        related: ["impertinent", "disrespectful", "rude"],
        translations: {
          de: ["unverschämt"],
          fr: ["impudent"],
          es: ["impúdico"],
          it: ["impudente"],
        },
      },
      impugn: {
        lexeme: "impugn",
        id: 7408880,
        definition:
          "To challenge or call into question the truth or integrity of something.",
        example:
          "The lawyer sought to impugn the credibility of the witness during cross-examination.",
        etymology:
          "From Latin 'impugnare', meaning 'to attack', from 'in-' (against) + 'pugnare' (to fight).",
        partOfSpeech: "verb",
        date: "2026-03-11",
        synonyms: ["challenge", "dispute", "question", "contradict"],
        antonyms: ["support", "confirm", "uphold", "validate"],
        related: ["criticize", "oppose", "denounce", "discredit"],
        translations: {
          de: ["anzweifeln"],
          fr: ["contester"],
          es: ["impugnar"],
          it: ["contestare"],
        },
      },
      inchoate: {
        lexeme: "inchoate",
        id: 4539553,
        definition:
          "Just begun and so not fully formed or developed; rudimentary.",
        example:
          "Her inchoate ideas for the novel were still vague and unpolished.",
        etymology:
          "From Latin 'inchoatus', past participle of 'inchoare', meaning 'to begin'.",
        partOfSpeech: "adjective",
        date: "2025-03-25",
        synonyms: [
          "incipient",
          "nascent",
          "embryonic",
          "rudimentary",
          "undeveloped",
        ],
        antonyms: ["mature", "developed", "complete", "finished"],
        related: ["beginning", "initial", "formative", "preliminary"],
        translations: {
          de: ["unfertig"],
          fr: ["inchoatif"],
          es: ["incipiente"],
          it: ["incompiuto"],
        },
      },
      incipient: {
        lexeme: "incipient",
        id: 2677530,
        definition:
          "In the early stages of development; beginning to happen or develop.",
        example: "The incipient stages of the project showed great promise.",
        etymology:
          "From Latin 'incipiens', present participle of 'incipere' (to begin), from 'in-' (into) + 'capere' (to take).",
        partOfSpeech: "adjective",
        date: "2025-04-09",
        synonyms: ["nascent", "emerging", "budding", "embryonic"],
        antonyms: ["mature", "developed", "advanced"],
        related: ["initial", "rudimentary", "inchoate", "germinal"],
        translations: {
          de: ["beginnend"],
          fr: ["naissant"],
          es: ["incipiente"],
          it: ["incipiente"],
        },
      },
      incisive: {
        lexeme: "incisive",
        id: 1685382,
        definition:
          "Expressing an idea or opinion in a clear and direct manner that shows good understanding of what is important.",
        example:
          "Her incisive comments during the debate highlighted the flaws in the opponent's argument.",
        etymology:
          "From Latin 'incisivus', meaning 'cutting into', from 'incidere' (to cut into).",
        partOfSpeech: "adjective",
        date: "2025-04-18",
        synonyms: ["sharp", "keen", "penetrating", "perceptive", "astute"],
        antonyms: ["vague", "unclear", "obtuse", "superficial"],
        related: ["analytical", "insightful", "acute", "trenchant"],
        translations: {
          de: ["prägnant"],
          fr: ["incisif"],
          es: ["incisivo"],
          it: ["incisivo"],
        },
      },
      inclination: {
        lexeme: "inclination",
        id: 7105738,
        definition:
          "A tendency or preference towards a particular action or state.",
        example: "She has a natural inclination towards helping others.",
        etymology:
          "From Middle English 'inclinacioun', from Old French 'inclination', from Latin 'inclīnātiō' (a leaning, bending), from 'inclīnāre' (to bend, incline).",
        partOfSpeech: "noun",
        date: "2025-06-23",
        synonyms: [
          "tendency",
          "leaning",
          "predisposition",
          "propensity",
          "proclivity",
        ],
        antonyms: ["aversion", "disinclination", "reluctance"],
        related: ["preference", "bias", "affinity", "partiality"],
        translations: {
          de: ["Neigung"],
          fr: ["inclination"],
          es: ["inclinación"],
          it: ["inclinazione"],
        },
      },
      inculcate: {
        lexeme: "inculcate",
        id: 3296846,
        definition:
          "To instill an idea, attitude, or habit by persistent instruction.",
        example:
          "The teacher sought to inculcate a sense of discipline in her students.",
        etymology:
          "From Latin 'inculcatus', past participle of 'inculcare', meaning 'to tread in, impress by repetition' (from 'in-' + 'calcare' 'to tread').",
        partOfSpeech: "verb",
        date: "2025-06-07",
        synonyms: ["instill", "implant", "imbue", "indoctrinate"],
        antonyms: ["eradicate", "remove", "eliminate"],
        related: ["teach", "educate", "drill", "engrain"],
        translations: {
          de: ["einprägen"],
          fr: ["inculquer"],
          es: ["inculcar"],
          it: ["inculcare"],
        },
      },
      indefatigable: {
        lexeme: "indefatigable",
        id: 9422698,
        definition: "Persisting tirelessly; incapable of being fatigued.",
        example:
          "She was indefatigable in her efforts to improve the community.",
        etymology:
          "From Latin 'indefatigabilis', from 'in-' (not) + 'defatigare' (to tire out).",
        partOfSpeech: "adjective",
        date: "2025-05-25",
        synonyms: ["tireless", "untiring", "unflagging", "energetic"],
        antonyms: ["tired", "exhausted", "weary", "fatigued"],
        related: ["persevering", "determined", "relentless", "diligent"],
        translations: {
          de: ["unermüdlich"],
          fr: ["infatigable"],
          es: ["infatigable"],
          it: ["instancabile"],
        },
      },
      indigent: {
        lexeme: "indigent",
        id: 6661806,
        definition: "Lacking the necessities of life; extremely poor.",
        example: "The charity provides food and shelter for indigent families.",
        etymology:
          "From Latin 'indigentem' (needy), from 'indigere' (to need), from 'in-' (not) + 'egere' (to have, lack).",
        partOfSpeech: "adjective",
        date: "2025-09-08",
        synonyms: ["destitute", "impoverished", "needy", "penniless"],
        antonyms: ["affluent", "wealthy", "prosperous"],
        related: ["poverty", "deprivation", "hardship"],
        translations: {
          de: ["bedürftig"],
          fr: ["indigent"],
          es: ["indigente"],
          it: ["indigente"],
        },
      },
      indolent: {
        lexeme: "indolent",
        id: 1433169,
        definition: "Wanting to avoid activity or exertion; lazy.",
        example: "The indolent cat spent the entire day lounging in the sun.",
        etymology:
          "From Latin 'indolent-', meaning 'not feeling pain', from 'in-' (not) + 'dolere' (to suffer or feel pain). The sense evolved to imply avoidance of effort.",
        partOfSpeech: "adjective",
        date: "2025-01-07",
        synonyms: ["lazy", "slothful", "idle", "lethargic", "inactive"],
        antonyms: [
          "industrious",
          "energetic",
          "active",
          "diligent",
          "hardworking",
        ],
        related: ["languid", "listless", "apathetic", "torpid"],
        translations: {
          de: ["träge"],
          fr: ["indolent"],
          es: ["indolente"],
          it: ["indolente"],
        },
      },
      ineffable: {
        lexeme: "ineffable",
        id: 117536,
        definition:
          "Too great or extreme to be expressed or described in words.",
        example:
          "The beauty of the sunset was ineffable, leaving us speechless.",
        etymology:
          "From Latin 'ineffabilis', from 'in-' (not) + 'effabilis' (speakable), from 'effari' (to speak out).",
        partOfSpeech: "adjective",
        date: "2025-02-09",
        synonyms: [
          "indescribable",
          "unspeakable",
          "unutterable",
          "beyond words",
        ],
        antonyms: ["expressible", "describable", "utterable"],
        related: ["ineffably", "ineffability"],
        translations: {
          de: ["unaussprechlich"],
          fr: ["ineffable"],
          es: ["inefable"],
          it: ["ineffabile"],
        },
      },
      inexorable: {
        lexeme: "inexorable",
        id: 1725276,
        definition: "Impossible to stop or prevent; relentless.",
        example: "The inexorable march of time affects all living beings.",
        etymology:
          "From Latin 'inexorabilis', from 'in-' (not) + 'exorabilis' (able to be entreated).",
        partOfSpeech: "adjective",
        date: "2025-03-14",
        synonyms: ["relentless", "unavoidable", "unstoppable", "inevitable"],
        antonyms: ["flexible", "yielding", "stoppable"],
        related: ["inexorability", "inexorably", "implacable", "adamant"],
        translations: {
          de: ["unerbittlich"],
          fr: ["inexorable"],
          es: ["inexorable"],
          it: ["inesorabile"],
        },
      },
      infallible: {
        lexeme: "infallible",
        id: 1660235,
        definition: "Incapable of making mistakes or being wrong.",
        example:
          "The scientist was considered infallible in his field due to his impeccable track record.",
        etymology:
          "From Latin 'infallibilis', from 'in-' (not) + 'fallere' (to deceive, fail).",
        partOfSpeech: "adjective",
        date: "2025-12-08",
        synonyms: ["flawless", "perfect", "unerring", "impeccable"],
        antonyms: ["fallible", "imperfect", "erroneous", "faulty"],
        related: ["infallibility", "certainty", "accuracy", "reliability"],
        translations: {
          de: ["unfehlbar"],
          fr: ["infaillible"],
          es: ["infalible"],
          it: ["infallibile"],
        },
      },
      infamy: {
        lexeme: "infamy",
        id: 299724,
        definition: "The state of being well known for a bad quality or deed.",
        example: "The dictator's infamy spread far beyond his own country.",
        etymology: "From Latin 'infamia', from 'in-' (not) + 'fama' (fame).",
        partOfSpeech: "noun",
        date: "2025-10-13",
        synonyms: ["notoriety", "disgrace", "shame", "dishonor"],
        antonyms: ["fame", "honor", "glory", "renown"],
        related: ["scandal", "ignominy", "opprobrium", "disrepute"],
        translations: {
          de: ["Schande"],
          fr: ["infamie"],
          es: ["infamia"],
          it: ["infamia"],
        },
      },
      infatuated: {
        lexeme: "infatuated",
        id: 6855729,
        definition:
          "Having an intense but short-lived passion or admiration for someone or something.",
        example:
          "She was infatuated with the new artist, buying all his albums and posters.",
        etymology:
          "From Latin 'infatuatus', past participle of 'infatuare' (to make foolish), from 'in-' (into) + 'fatuus' (foolish).",
        partOfSpeech: "adjective",
        date: "2025-02-22",
        synonyms: ["besotted", "smitten", "enamored", "obsessed"],
        antonyms: ["indifferent", "disenchanted", "unimpressed"],
        related: ["crush", "passion", "adoration", "fascination"],
        translations: {
          de: ["vernarrt"],
          fr: ["entiché"],
          es: ["enamorado"],
          it: ["infatuato"],
        },
      },
      ingratiate: {
        lexeme: "ingratiate",
        id: 3400797,
        definition:
          "To bring oneself into favor with someone by flattering or trying to please them.",
        example:
          "He tried to ingratiate himself with the boss by complimenting her leadership skills.",
        etymology:
          "From Latin 'ingratiatus', past participle of 'ingratiari' (to gain favor), from 'in-' (in) + 'gratia' (favor).",
        partOfSpeech: "verb",
        date: "2025-08-18",
        synonyms: ["flatter", "fawn", "curry favor", "suck up", "brown-nose"],
        antonyms: ["alienate", "estrange", "offend", "displease"],
        related: ["sycophant", "obsequious", "toady", "grovel"],
        translations: {
          de: ["sich einschmeicheln"],
          fr: ["s'insinuer dans les bonnes grâces"],
          es: ["congraciarse"],
          it: ["ingraziarsi"],
        },
      },
      inimical: {
        lexeme: "inimical",
        id: 9831116,
        definition: "Unfriendly or hostile; harmful or adverse.",
        example: "The new regulations are inimical to small businesses.",
        etymology:
          "From Latin 'inimicus' (enemy), from 'in-' (not) + 'amicus' (friend).",
        partOfSpeech: "adjective",
        date: "2025-06-29",
        synonyms: ["hostile", "adverse", "antagonistic", "unfriendly"],
        antonyms: ["friendly", "favorable", "supportive", "beneficial"],
        related: ["hostility", "opposition", "harmful", "damaging"],
        translations: {
          de: ["feindlich"],
          fr: ["hostile"],
          es: ["hostil"],
          it: ["ostile"],
        },
      },
      insidious: {
        lexeme: "insidious",
        id: 8519011,
        definition:
          "Proceeding in a gradual, subtle way, but with harmful effects.",
        example:
          "The insidious spread of misinformation can undermine public trust.",
        etymology:
          "From Latin 'insidiosus' (deceitful, cunning), derived from 'insidiae' (ambush, plot).",
        partOfSpeech: "adjective",
        date: "2025-01-29",
        synonyms: ["stealthy", "sneaky", "pernicious", "treacherous"],
        antonyms: ["overt", "direct", "honest"],
        related: ["deceptive", "subtle", "corrosive"],
        translations: {
          de: ["hinterhältig"],
          fr: ["insidieux"],
          es: ["insidioso"],
          it: ["insidioso"],
        },
      },
      insipid: {
        lexeme: "insipid",
        id: 4292865,
        definition: "Lacking flavor, zest, or interest; dull.",
        example:
          "The soup was insipid, tasting like nothing more than warm water with a hint of salt.",
        etymology:
          "From Latin 'insipidus', from 'in-' (not) + 'sapidus' (tasty), from 'sapere' (to taste).",
        partOfSpeech: "adjective",
        date: "2025-05-15",
        synonyms: ["bland", "flat", "tasteless", "vapid", "uninteresting"],
        antonyms: ["flavorful", "zesty", "exciting", "interesting", "tasty"],
        related: ["monotonous", "tedious", "dull", "uninspiring"],
        translations: {
          de: ["fad"],
          fr: ["insipide"],
          es: ["insípido"],
          it: ["insipido"],
        },
      },
      intangible: {
        lexeme: "intangible",
        id: 7312019,
        definition:
          "Unable to be touched or grasped; not having physical presence.",
        example:
          "The concept of love is intangible, yet it profoundly affects our lives.",
        etymology:
          "From Latin 'intangibilis', from 'in-' (not) + 'tangere' (to touch).",
        partOfSpeech: "adjective",
        date: "2026-01-25",
        synonyms: ["imperceptible", "incorporeal", "abstract", "elusive"],
        antonyms: ["tangible", "concrete", "physical", "palpable"],
        related: ["ethereal", "immaterial", "unsubstantial"],
        translations: {
          de: ["unfassbar"],
          fr: ["intangible"],
          es: ["intangible"],
          it: ["intangibile"],
        },
      },
      intractable: {
        lexeme: "intractable",
        id: 6860877,
        definition: "Difficult to control or deal with; stubborn or unruly.",
        example: "The intractable child refused to follow any instructions.",
        etymology:
          "From Latin 'intractabilis', meaning 'not manageable', from 'in-' (not) + 'tractare' (to handle).",
        partOfSpeech: "adjective",
        date: "2025-08-25",
        synonyms: ["stubborn", "unmanageable", "obstinate", "recalcitrant"],
        antonyms: ["manageable", "compliant", "docile", "tractable"],
        related: ["unyielding", "inflexible", "headstrong", "defiant"],
        translations: {
          de: ["unbeugsam"],
          fr: ["intraitable"],
          es: ["intratable"],
          it: ["intrattabile"],
        },
      },
      intransigent: {
        lexeme: "intransigent",
        id: 1899860,
        definition:
          "Unwilling or refusing to change one's views or to agree about something.",
        example:
          "The intransigent negotiator refused to compromise on any of the terms.",
        etymology:
          "From Spanish 'intransigente', from Latin 'in-' (not) + 'transigere' (to come to an agreement).",
        partOfSpeech: "adjective",
        date: "2025-02-01",
        synonyms: ["unyielding", "adamant", "inflexible", "stubborn"],
        antonyms: ["flexible", "compromising", "yielding", "accommodating"],
        related: ["obstinate", "resolute", "rigid", "uncompromising"],
        translations: {
          de: ["unbeugsam"],
          fr: ["intransigeant"],
          es: ["intransigente"],
          it: ["intransigente"],
        },
      },
      intrepid: {
        lexeme: "intrepid",
        id: 9991668,
        definition:
          "Fearless; adventurous (often used for rhetorical or humorous effect).",
        example:
          "The intrepid explorer ventured into the uncharted jungle without hesitation.",
        etymology:
          "From Latin 'intrepidus', from 'in-' (not) + 'trepidus' (alarmed, anxious).",
        partOfSpeech: "adjective",
        date: "2025-03-17",
        synonyms: ["fearless", "bold", "brave", "courageous", "daring"],
        antonyms: ["timid", "fearful", "cowardly", "apprehensive"],
        related: ["audacious", "valiant", "heroic", "undaunted"],
        translations: {
          de: ["unerschrocken"],
          fr: ["intrépide"],
          es: ["intrépido"],
          it: ["intrepido"],
        },
      },
      inundate: {
        lexeme: "inundate",
        id: 3391867,
        definition:
          "To overwhelm with a large amount of something, especially water or information.",
        example:
          "The heavy rains inundated the city, causing widespread flooding.",
        etymology:
          "From Latin 'inundare', meaning 'to overflow', from 'in-' (into) + 'unda' (wave).",
        partOfSpeech: "verb",
        date: "2025-12-09",
        synonyms: ["flood", "overwhelm", "deluge", "swamp", "engulf"],
        antonyms: ["drain", "deplete", "dry", "clear"],
        related: ["overflow", "submerge", "saturate", "drown"],
        translations: {
          de: ["überfluten"],
          fr: ["inonder"],
          es: ["inundar"],
          it: ["inondare"],
        },
      },
      invective: {
        lexeme: "invective",
        id: 8487575,
        definition: "Insulting, abusive, or highly critical language.",
        example:
          "The politician responded to the accusations with a torrent of invective.",
        etymology:
          "From Latin 'invectivus' (abusive), from 'invehi' (to attack with words), from 'in-' (against) + 'vehi' (to carry).",
        partOfSpeech: "noun",
        date: "2025-11-09",
        synonyms: ["vituperation", "denunciation", "censure", "rebuke"],
        antonyms: ["praise", "compliment", "approval"],
        related: ["diatribe", "harangue", "tirade", "rant"],
        translations: {
          de: ["Schmährede"],
          fr: ["invective"],
          es: ["invectiva"],
          it: ["invettiva"],
        },
      },
      inveterate: {
        lexeme: "inveterate",
        id: 4720900,
        definition:
          "Having a particular habit, activity, or interest that is long-established and unlikely to change.",
        example:
          "He was an inveterate gambler, visiting the casino every weekend for decades.",
        etymology:
          "From Latin 'inveteratus', past participle of 'inveterare' (to make old), from 'in-' (in) + 'vetus' (old).",
        partOfSpeech: "adjective",
        date: "2025-09-02",
        synonyms: ["habitual", "chronic", "incorrigible", "confirmed"],
        antonyms: ["occasional", "sporadic", "temporary"],
        related: ["persistent", "entrenched", "deep-rooted"],
        translations: {
          de: ["eingefleischt"],
          fr: ["invétéré"],
          es: ["empedernido"],
          it: ["incallito"],
        },
      },
      irascible: {
        lexeme: "irascible",
        id: 5531682,
        definition: "Easily angered; prone to outbursts of temper.",
        example:
          "His irascible nature made it difficult for his colleagues to approach him with minor concerns.",
        etymology:
          "From Latin 'irascibilis', from 'irasci' (to grow angry), from 'ira' (anger).",
        partOfSpeech: "adjective",
        date: "2025-08-15",
        synonyms: ["hot-tempered", "testy", "quick-tempered", "choleric"],
        antonyms: ["calm", "easygoing", "placid", "good-natured"],
        related: ["irritable", "cantankerous", "peevish", "short-fused"],
        translations: {
          de: ["jähzornig"],
          fr: ["irascible"],
          es: ["irascible"],
          it: ["irascibile"],
        },
      },
      itinerant: {
        lexeme: "itinerant",
        id: 2701193,
        definition: "Traveling from place to place, especially for work.",
        example:
          "The itinerant preacher visited small towns to deliver sermons.",
        etymology:
          "From Late Latin 'itinerant-', present participle of 'itinerari' (to travel), from Latin 'iter' (journey).",
        partOfSpeech: "adjective",
        date: "2025-06-18",
        synonyms: ["nomadic", "peripatetic", "roving", "wandering"],
        antonyms: ["settled", "stationary", "fixed"],
        related: ["itinerary", "journey", "migratory"],
        translations: {
          de: ["umherziehend"],
          fr: ["itinérant"],
          es: ["itinerante"],
          it: ["itinerante"],
        },
      },
      jettison: {
        lexeme: "jettison",
        id: 2760423,
        definition:
          "To throw or drop something from a moving ship, aircraft, or vehicle, often to lighten the load.",
        example:
          "The crew had to jettison the cargo to prevent the plane from crashing.",
        etymology:
          "From Old French 'getaison' (a throwing), derived from Latin 'jactare' (to throw).",
        partOfSpeech: "verb",
        date: "2026-02-22",
        synonyms: ["discard", "dump", "eject", "cast off"],
        antonyms: ["retain", "keep", "hold"],
        related: ["abandon", "shed", "unload"],
        translations: {
          de: ["über Bord werfen"],
          fr: ["jeter par-dessus bord"],
          es: ["arrojar por la borda"],
          it: ["gettare a mare"],
        },
      },
      jocular: {
        lexeme: "jocular",
        id: 1339641,
        definition: "Given to or characterized by joking; humorous or playful.",
        example:
          "His jocular manner made everyone at the meeting feel at ease.",
        etymology:
          "From Latin 'jocularis', from 'joculus' (a little joke), diminutive of 'jocus' (joke).",
        partOfSpeech: "adjective",
        date: "2026-02-03",
        synonyms: ["humorous", "witty", "playful", "jesting", "facetious"],
        antonyms: ["serious", "solemn", "grave", "earnest"],
        related: ["joke", "jovial", "jocund", "banter"],
        translations: {
          de: ["scherzhaft"],
          fr: ["enjoué"],
          es: ["jocoso"],
          it: ["giocoso"],
        },
      },
      juxtapose: {
        lexeme: "juxtapose",
        id: 4197105,
        definition:
          "To place or deal with close together for contrasting effect.",
        example:
          "The exhibition juxtaposes Picasso's early drawings with his later works to show his artistic evolution.",
        etymology:
          "Mid 19th century: from French juxtaposer, from Latin juxta 'next' + French poser 'to place'.",
        partOfSpeech: "verb",
        date: "2025-07-31",
        synonyms: ["compare", "contrast", "collate"],
        antonyms: ["separate", "isolate"],
        related: ["juxtaposition", "alignment", "comparison"],
        translations: {
          de: ["nebeneinanderstellen"],
          fr: ["juxtaposer"],
          es: ["yuxtaponer"],
          it: ["giustapporre"],
        },
      },
      kaleidoscopic: {
        lexeme: "kaleidoscopic",
        id: 4706019,
        definition:
          "Exhibiting complex and changing patterns or colors, like a kaleidoscope.",
        example:
          "The festival was a kaleidoscopic display of costumes, music, and dance.",
        etymology:
          "Early 19th century: from Greek 'kalos' (beautiful) + 'eidos' (form) + 'skopein' (to look at) + -ic.",
        partOfSpeech: "adjective",
        date: "2025-06-03",
        synonyms: ["multicolored", "variegated", "prismatic", "colorful"],
        antonyms: ["monochromatic", "plain", "uniform"],
        related: ["kaleidoscope", "vibrant", "dazzling"],
        translations: {
          de: ["kaleidoskopisch"],
          fr: ["kaléidoscopique"],
          es: ["caleidoscópico"],
          it: ["caleidoscopico"],
        },
      },
      keen: {
        lexeme: "keen",
        id: 7011117,
        definition: "Having or showing eagerness or enthusiasm.",
        example: "She was keen to start her new project.",
        etymology:
          "From Old English 'cēne', meaning brave or bold, of Germanic origin.",
        partOfSpeech: "adjective",
        date: "2025-11-12",
        synonyms: ["eager", "enthusiastic", "ardent"],
        antonyms: ["indifferent", "apathetic", "unenthusiastic"],
        related: ["sharp", "acute", "intense"],
        translations: {
          de: ["eifrig"],
          fr: ["enthousiaste"],
          es: ["entusiasta"],
          it: ["entusiasta"],
        },
      },
      kinetic: {
        lexeme: "kinetic",
        id: 6708450,
        definition: "Relating to or resulting from motion.",
        example:
          "The kinetic energy of the moving car was calculated by the physicist.",
        etymology:
          "From Greek 'kinētikos', meaning 'of motion', from 'kinein' (to move).",
        partOfSpeech: "adjective",
        date: "2025-05-27",
        synonyms: ["dynamic", "active", "moving"],
        antonyms: ["static", "inactive", "stationary"],
        related: ["kinematics", "kinesthesia", "kineticism"],
        translations: {
          de: ["kinetisch"],
          fr: ["cinétique"],
          es: ["cinético"],
          it: ["cinetico"],
        },
      },
      knell: {
        lexeme: "knell",
        id: 6895633,
        definition:
          "The sound of a bell, especially when rung solemnly for a death or funeral.",
        example:
          "The church bells tolled a slow knell as the procession passed by.",
        etymology:
          "Old English 'cnyll', of Germanic origin; related to Dutch 'knal' (a loud noise) and German 'Knall' (a bang).",
        partOfSpeech: "noun",
        date: "2025-05-04",
        synonyms: ["toll", "peal", "chime", "ringing"],
        antonyms: ["silence", "hush"],
        related: ["death knell", "funeral bell", "mourning"],
        translations: {
          de: ["Totenglocke"],
          fr: ["glas"],
          es: ["toque de difuntos"],
          it: ["rintocco funebre"],
        },
      },
      kudos: {
        lexeme: "kudos",
        id: 6333926,
        definition: "Praise or honor for an achievement.",
        example:
          "She received kudos from her colleagues for completing the project ahead of schedule.",
        etymology:
          "From Greek 'kydos' (glory, fame), via British university slang in the early 19th century.",
        partOfSpeech: "noun",
        date: "2025-07-25",
        synonyms: ["praise", "accolades", "honor", "recognition", "applause"],
        antonyms: ["criticism", "blame", "disapproval"],
        related: ["prestige", "reputation", "admiration", "esteem"],
        translations: {
          de: ["Lob"],
          fr: ["éloges"],
          es: ["elogios"],
          it: ["elogi"],
        },
      },
      lachrymose: {
        lexeme: "lachrymose",
        id: 1595369,
        definition: "Tearful or given to weeping; inducing tears.",
        example:
          "The lachrymose widow could not stop crying during the funeral.",
        etymology: "From Latin 'lacrimosus', from 'lacrima' (tear).",
        partOfSpeech: "adjective",
        date: "2025-01-10",
        synonyms: ["tearful", "weepy", "mournful", "sad"],
        antonyms: ["cheerful", "joyful", "happy"],
        related: ["lachrymal", "lachrymation", "lachrymatory"],
        translations: {
          de: ["tränenreich"],
          fr: ["larmoyant"],
          es: ["lacrimoso"],
          it: ["lacrimoso"],
        },
      },
      laconic: {
        lexeme: "laconic",
        id: 8014348,
        definition:
          "Using very few words; concise to the point of seeming rude or mysterious.",
        example:
          "His laconic reply, 'Not now,' left us wondering about his true feelings.",
        etymology:
          "From Latin 'Laconicus', meaning 'Spartan', referring to the Spartans' reputation for brevity of speech.",
        partOfSpeech: "adjective",
        date: "2025-07-20",
        synonyms: ["terse", "succinct", "brief", "pithy", "curt"],
        antonyms: ["verbose", "wordy", "loquacious", "garrulous", "prolix"],
        related: ["concise", "economical", "reserved", "spartan", "abrupt"],
        translations: {
          de: ["lakonisch"],
          fr: ["laconique"],
          es: ["lacónico"],
          it: ["laconico"],
        },
      },
      languid: {
        lexeme: "languid",
        id: 4805364,
        definition: "Slow, relaxed, or lacking energy.",
        example:
          "She moved with a languid grace, as if every step required effort.",
        etymology:
          "From Latin 'languidus' (faint, weak), from 'languēre' (to be weak or faint).",
        partOfSpeech: "adjective",
        date: "2025-09-10",
        synonyms: ["lethargic", "listless", "sluggish", "torpid"],
        antonyms: ["energetic", "vigorous", "lively", "animated"],
        related: ["languor", "languish", "languorous"],
        translations: {
          de: ["träge"],
          fr: ["languide"],
          es: ["lánguido"],
          it: ["languido"],
        },
      },
      largess: {
        lexeme: "largess",
        id: 8337525,
        definition: "Generosity in bestowing money or gifts upon others.",
        example:
          "The philanthropist was known for his largess, donating millions to charity each year.",
        etymology:
          "From Old French 'largesse', from Latin 'largus' meaning 'abundant, generous'.",
        partOfSpeech: "noun",
        date: "2025-10-27",
        synonyms: ["generosity", "bounty", "munificence", "liberality"],
        antonyms: ["stinginess", "miserliness", "parsimony"],
        related: ["beneficence", "philanthropy", "altruism"],
        translations: {
          de: ["Freigebigkeit"],
          fr: ["largesse"],
          es: ["generosidad"],
          it: ["generosità"],
        },
      },
      laud: {
        lexeme: "laud",
        id: 3677695,
        definition: "To praise highly, especially in a public context.",
        example:
          "The critics lauded the director's latest film for its innovative storytelling.",
        etymology:
          "From Middle English 'lauden', from Old French 'lauder', from Latin 'laudare' (to praise), from 'laus' (praise).",
        partOfSpeech: "verb",
        date: "2025-10-25",
        synonyms: ["praise", "commend", "extol", "acclaim"],
        antonyms: ["criticize", "condemn", "denounce"],
        related: ["applaud", "admire", "celebrate", "honor"],
        translations: {
          de: ["loben"],
          fr: ["louer"],
          es: ["alabar"],
          it: ["lodare"],
        },
      },
      latent: {
        lexeme: "latent",
        id: 5547380,
        definition:
          "Existing but not yet developed or manifest; hidden or concealed.",
        example:
          "Her latent talent for painting was discovered when she attended an art class.",
        etymology:
          "From Latin 'latent-' (stem of 'latens'), present participle of 'latere' meaning 'to lie hidden'.",
        partOfSpeech: "adjective",
        date: "2025-09-03",
        synonyms: ["dormant", "quiescent", "undeveloped", "unrealized"],
        antonyms: ["active", "manifest", "apparent", "obvious"],
        related: ["potential", "hidden", "inactive", "concealed"],
        translations: {
          de: ["latent"],
          fr: ["latent"],
          es: ["latente"],
          it: ["latente"],
        },
      },
      lethargy: {
        lexeme: "lethargy",
        id: 1275771,
        definition: "A state of sluggishness, inactivity, or apathy.",
        example:
          "After the long meeting, a sense of lethargy settled over the team.",
        etymology:
          "From Middle English litargie, from Old French lethargie, from Latin lethargia, from Greek lēthargia (forgetfulness), from lēthargos (forgetful), from lēthē (forgetfulness).",
        partOfSpeech: "noun",
        date: "2025-05-13",
        synonyms: ["sluggishness", "languor", "torpor", "listlessness"],
        antonyms: ["energy", "vigor", "alertness", "liveliness"],
        related: ["fatigue", "apathy", "drowsiness", "indifference"],
        translations: {
          de: ["Lethargie"],
          fr: ["léthargie"],
          es: ["letargo"],
          it: ["letargia"],
        },
      },
      levity: {
        lexeme: "levity",
        id: 2261934,
        definition:
          "Lightness of manner or speech, especially when inappropriate; frivolity.",
        example:
          "The speaker's levity during the serious discussion was off-putting.",
        etymology:
          "From Latin 'levitas', meaning 'lightness', from 'levis' (light).",
        partOfSpeech: "noun",
        date: "2025-01-13",
        synonyms: ["frivolity", "lightheartedness", "flippancy"],
        antonyms: ["seriousness", "gravity", "solemnity"],
        related: ["humor", "wit", "playfulness"],
        translations: {
          de: ["Leichtsinn"],
          fr: ["légèreté"],
          es: ["ligereza"],
          it: ["leggerezza"],
        },
      },
      loquacious: {
        lexeme: "loquacious",
        id: 7992541,
        definition: "Tending to talk a great deal; talkative.",
        example:
          "The loquacious professor could lecture for hours without pausing.",
        etymology: "From Latin 'loquax' (talkative), from 'loqui' (to speak).",
        partOfSpeech: "adjective",
        date: "2026-01-22",
        synonyms: ["talkative", "garrulous", "verbose", "chatty"],
        antonyms: ["reticent", "taciturn", "quiet", "reserved"],
        related: ["eloquent", "voluble", "effusive", "communicative"],
        translations: {
          de: ["gesprächig"],
          fr: ["loquace"],
          es: ["locuaz"],
          it: ["loquace"],
        },
      },
      lucid: {
        lexeme: "lucid",
        id: 4463707,
        definition: "Clear and easy to understand; mentally sound.",
        example:
          "She gave a lucid explanation of the complex scientific theory.",
        etymology:
          "From Latin 'lucidus' (bright, clear), from 'lucere' (to shine).",
        partOfSpeech: "adjective",
        date: "2025-10-31",
        synonyms: ["clear", "coherent", "understandable", "transparent"],
        antonyms: ["confusing", "unclear", "obscure", "muddled"],
        related: ["lucidity", "elucidate", "pellucid"],
        translations: {
          de: ["klar"],
          fr: ["clair"],
          es: ["lúcido"],
          it: ["lucido"],
        },
      },
      lugubrious: {
        lexeme: "lugubrious",
        id: 4660434,
        definition: "Looking or sounding sad and dismal.",
        example:
          "The actor's lugubrious expression perfectly captured the melancholy of the scene.",
        etymology:
          "From Latin 'lugubris', meaning 'mournful', derived from 'lugere' (to mourn).",
        partOfSpeech: "adjective",
        date: "2025-05-20",
        synonyms: ["mournful", "doleful", "melancholy", "somber"],
        antonyms: ["cheerful", "joyful", "upbeat"],
        related: ["gloomy", "funereal", "woeful", "sorrowful"],
        translations: {
          de: ["düster"],
          fr: ["lugubre"],
          es: ["lúgubre"],
          it: ["lugubre"],
        },
      },
      luminous: {
        lexeme: "luminous",
        id: 3522704,
        definition: "emitting or reflecting light; shining; bright.",
        example:
          "The luminous glow of the fireflies illuminated the garden at night.",
        etymology: "From Latin 'luminosus', from 'lumen' meaning 'light'.",
        partOfSpeech: "adjective",
        date: "2026-03-17",
        synonyms: ["radiant", "glowing", "bright", "shining", "brilliant"],
        antonyms: ["dark", "dim", "dull", "obscure"],
        related: ["luminescence", "illuminate", "luminosity", "luminance"],
        translations: {
          de: ["leuchtend"],
          fr: ["lumineux"],
          es: ["luminoso"],
          it: ["luminoso"],
        },
      },
      magnanimous: {
        lexeme: "magnanimous",
        id: 5573793,
        definition:
          "Generous or forgiving, especially toward a rival or less powerful person.",
        example: "The magnanimous king pardoned his defeated enemies.",
        etymology:
          "From Latin 'magnanimus' (great-souled), from 'magnus' (great) + 'animus' (soul, spirit).",
        partOfSpeech: "adjective",
        date: "2025-02-19",
        synonyms: [
          "generous",
          "benevolent",
          "charitable",
          "noble",
          "altruistic",
        ],
        antonyms: ["petty", "vindictive", "spiteful", "selfish"],
        related: ["magnanimity", "gracious", "forgiving", "kindhearted"],
        translations: {
          de: ["großmütig"],
          fr: ["magnanime"],
          es: ["magnánimo"],
          it: ["magnanimo"],
        },
      },
      malediction: {
        lexeme: "malediction",
        id: 457739,
        definition: "A curse or the utterance of a curse.",
        example: "The witch pronounced a malediction upon the village.",
        etymology:
          "From Latin 'maledictio', from 'maledicere' (to speak evil of), combining 'male' (badly) and 'dicere' (to say).",
        partOfSpeech: "noun",
        date: "2026-01-15",
        synonyms: ["curse", "hex", "anathema", "imprecation"],
        antonyms: ["blessing", "benediction"],
        related: ["damnation", "execration", "denunciation"],
        translations: {
          de: ["Fluch"],
          fr: ["malédiction"],
          es: ["maldición"],
          it: ["maledizione"],
        },
      },
      malevolent: {
        lexeme: "malevolent",
        id: 6806160,
        definition: "Having or showing a wish to do evil to others.",
        example: "The malevolent dictator oppressed his people without mercy.",
        etymology:
          "From Latin 'malevolent-', from 'male' (badly) + 'volent-' (wishing), from 'velle' (to wish).",
        partOfSpeech: "adjective",
        date: "2025-05-06",
        synonyms: ["malicious", "spiteful", "evil", "wicked", "hostile"],
        antonyms: ["benevolent", "kind", "compassionate", "good-natured"],
        related: ["malice", "malign", "vindictive", "sinister"],
        translations: {
          de: ["bösartig"],
          fr: ["malveillant"],
          es: ["malévolo"],
          it: ["malevolo"],
        },
      },
      malfeasance: {
        lexeme: "malfeasance",
        id: 3315451,
        definition:
          "Wrongdoing or misconduct, especially by a public official.",
        example:
          "The mayor was accused of malfeasance for embezzling city funds.",
        etymology:
          "From Old French 'malfaisance', from 'mal-' (bad) + 'faisance' (doing, action), from Latin 'malefacere' (to do evil).",
        partOfSpeech: "noun",
        date: "2026-01-17",
        synonyms: ["misconduct", "wrongdoing", "corruption", "misbehavior"],
        antonyms: ["integrity", "probity", "honesty"],
        related: ["malfeasant", "malfeasantly", "nonfeasance", "misfeasance"],
        translations: {
          de: ["Missetat"],
          fr: ["malfaçon"],
          es: ["malfeasance"],
          it: ["misfatto"],
        },
      },
      malinger: {
        lexeme: "malinger",
        id: 858519,
        definition: "To pretend or exaggerate illness to avoid work or duty.",
        example:
          "He was suspected of malingering to skip his military service.",
        etymology:
          "From French 'malingre' (sickly, ailing), possibly from Old French 'mal' (bad) + 'haingre' (weak).",
        partOfSpeech: "verb",
        date: "2025-01-06",
        synonyms: ["shirk", "feign", "skive", "goldbrick"],
        antonyms: ["persevere", "endure", "work diligently"],
        related: ["malingerer", "shirking", "feigning"],
        translations: {
          de: ["krank stellen"],
          fr: ["simuler une maladie"],
          es: ["hacerse el enfermo"],
          it: ["fare il malato"],
        },
      },
      malleable: {
        lexeme: "malleable",
        id: 2721592,
        definition:
          "Capable of being shaped or formed, as by hammering or pressure; adaptable.",
        example:
          "Gold is a malleable metal that can be hammered into thin sheets.",
        etymology:
          "From Middle French 'malléable', from Medieval Latin 'malleabilis', from Latin 'malleare' (to hammer), from 'malleus' (hammer).",
        partOfSpeech: "adjective",
        date: "2026-03-21",
        synonyms: ["pliable", "ductile", "flexible", "adaptable"],
        antonyms: ["rigid", "inflexible", "unyielding"],
        related: ["moldable", "workable", "tractable"],
        translations: {
          de: ["formbar"],
          fr: ["malléable"],
          es: ["maleable"],
          it: ["malleabile"],
        },
      },
      matador: {
        lexeme: "matador",
        id: 4844057,
        definition:
          "A bullfighter who performs the final act of killing the bull in a bullfight.",
        example:
          "The matador gracefully dodged the bull's charge before delivering the final blow.",
        etymology:
          "From Spanish 'matador', meaning 'killer', derived from 'matar' (to kill), from Latin 'mactare' (to sacrifice, slaughter).",
        partOfSpeech: "noun",
        date: "2025-01-22",
        synonyms: ["torero", "bullfighter"],
        antonyms: ["pacifist"],
        related: ["bullfighting", "picador", "banderillero", "corrida"],
        translations: {
          de: ["Matador"],
          fr: ["matador"],
          es: ["matador"],
          it: ["matador"],
        },
      },
      maverick: {
        lexeme: "maverick",
        id: 2888979,
        definition:
          "An independent-minded person who does not conform to the norms or expectations of a group.",
        example:
          "She was a maverick in the tech industry, always pushing boundaries with her innovative ideas.",
        etymology:
          "Named after Samuel Maverick (1803–1870), a Texas rancher who refused to brand his cattle, leading unbranded livestock to be called 'mavericks.' Later extended to describe nonconformists.",
        partOfSpeech: "noun",
        date: "2025-07-18",
        synonyms: ["nonconformist", "individualist", "rebel", "free spirit"],
        antonyms: ["conformist", "traditionalist", "follower"],
        related: ["unconventional", "independent", "original"],
        translations: {
          de: ["Einzelgänger"],
          fr: ["franc-tireur"],
          es: ["inconformista"],
          it: ["anticonformista"],
        },
      },
      mawkish: {
        lexeme: "mawkish",
        id: 722041,
        definition:
          "Excessively sentimental or emotionally effusive in a way that feels insincere or cloying.",
        example:
          "The movie's mawkish ending, with its exaggerated tears and dramatic music, left some viewers rolling their eyes.",
        etymology:
          "From Middle English 'mawke' (maggot), influenced by 'mawk' (a slobbering or sickly sentiment). Originally implied a sickly, nauseating quality, later extended to overly sentimental expressions.",
        partOfSpeech: "adjective",
        date: "2026-03-14",
        synonyms: [
          "saccharine",
          "cloying",
          "maudlin",
          "schmaltzy",
          "sentimental",
        ],
        antonyms: ["unsentimental", "stoic", "restrained", "matter-of-fact"],
        related: ["treacly", "gushy", "overwrought", "lachrymose"],
        translations: {
          de: ["rührselig"],
          fr: ["mièvre"],
          es: ["empalagoso"],
          it: ["melenso"],
        },
      },
      maxim: {
        lexeme: "maxim",
        id: 7008389,
        definition:
          "A short, pithy statement expressing a general truth or rule of conduct.",
        example: '"Honesty is the best policy" is a well-known maxim.',
        etymology:
          "From Latin 'maxima' (greatest, largest), via French 'maxime'.",
        partOfSpeech: "noun",
        date: "2025-08-12",
        synonyms: ["aphorism", "adage", "proverb", "saying", "axiom"],
        antonyms: ["nonsense", "absurdity"],
        related: ["principle", "precept", "dictum", "motto"],
        translations: {
          de: ["Maxime"],
          fr: ["maxime"],
          es: ["máxima"],
          it: ["massima"],
        },
      },
      mendacious: {
        lexeme: "mendacious",
        id: 6903747,
        definition: "Not telling the truth; lying.",
        example: "The mendacious witness gave false testimony under oath.",
        etymology:
          "From Latin 'mendax' (lying, deceitful), from 'mendum' (fault, defect).",
        partOfSpeech: "adjective",
        date: "2026-02-08",
        synonyms: ["deceitful", "dishonest", "untruthful", "false"],
        antonyms: ["truthful", "honest", "sincere"],
        related: ["mendacity", "deception", "fabrication"],
        translations: {
          de: ["lügnerisch"],
          fr: ["menteur"],
          es: ["mentiroso"],
          it: ["mendace"],
        },
      },
      mendicant: {
        lexeme: "mendicant",
        id: 30591,
        definition:
          "A person who lives by begging, typically a member of a religious order.",
        example:
          "The mendicant friar traveled from village to village, relying on the charity of others for sustenance.",
        etymology:
          "From Latin 'mendicans', present participle of 'mendicare' (to beg), from 'mendicus' (beggar).",
        partOfSpeech: "noun",
        date: "2026-01-31",
        synonyms: ["beggar", "panhandler", "almsman"],
        antonyms: ["benefactor", "donor", "philanthropist"],
        related: ["ascetic", "friar", "monk", "charity", "poverty"],
        translations: {
          de: ["Bettler"],
          fr: ["mendiant"],
          es: ["mendigo"],
          it: ["mendicante"],
        },
      },
      mercurial: {
        lexeme: "mercurial",
        id: 2193492,
        definition:
          "subject to sudden or unpredictable changes of mood or mind.",
        example:
          "Her mercurial temperament made her difficult to work with at times.",
        etymology:
          "From Latin 'mercurialis' (pertaining to Mercury, the Roman god associated with speed and volatility), from 'Mercurius' (Mercury).",
        partOfSpeech: "adjective",
        date: "2026-04-02",
        synonyms: ["volatile", "capricious", "fickle", "unpredictable"],
        antonyms: ["steady", "consistent", "reliable", "stable"],
        related: ["erratic", "temperamental", "whimsical", "changeable"],
        translations: {
          de: ["wechselhaft"],
          fr: ["volatile"],
          es: ["voluble"],
          it: ["volubile"],
        },
      },
      metriocracy: {
        lexeme: "metriocracy",
        id: 2629287,
        definition: "A system or society where advancement is based on merit.",
        example:
          "The company prides itself on being a metriocracy, promoting employees based on their performance and skills rather than seniority.",
        etymology:
          "Derived from 'merit' (from Latin 'meritum', meaning 'desert, worth') + '-cracy' (from Greek '-kratia', meaning 'power, rule').",
        partOfSpeech: "noun",
        date: "2025-10-01",
        synonyms: ["meritocracy", "achievement-based system"],
        antonyms: ["nepotism", "cronyism", "favoritism"],
        related: ["merit", "equality", "fairness", "competence"],
        translations: {
          de: ["Leistungsgesellschaft"],
          fr: ["méritocratie"],
          es: ["meritocracia"],
          it: ["meritocrazia"],
        },
      },
      misanthrope: {
        lexeme: "misanthrope",
        id: 2039030,
        definition: "A person who dislikes or distrusts humankind.",
        example:
          "The old misanthrope refused to attend the community gathering, preferring solitude over social interaction.",
        etymology:
          "From Greek 'misanthrōpos', from 'misein' (to hate) + 'anthrōpos' (human being).",
        partOfSpeech: "noun",
        date: "2026-03-29",
        synonyms: ["cynic", "recluse", "hermit", "people-hater"],
        antonyms: ["philanthropist", "humanitarian", "altruist"],
        related: ["misanthropy", "misanthropic", "solitude", "pessimism"],
        translations: {
          de: ["Misanthrop"],
          fr: ["misanthrope"],
          es: ["misántropo"],
          it: ["misantropo"],
        },
      },
      mollify: {
        lexeme: "mollify",
        id: 9734063,
        definition: "To calm or soothe someone's anger or anxiety.",
        example:
          "The manager tried to mollify the upset customer by offering a full refund.",
        etymology:
          "From Middle French 'mollifier', from Latin 'mollificare' (to soften), from 'mollis' (soft) + 'facere' (to make).",
        partOfSpeech: "verb",
        date: "2025-02-16",
        synonyms: ["appease", "pacify", "placate", "soothe", "calm"],
        antonyms: ["aggravate", "provoke", "irritate", "enrage"],
        related: ["conciliate", "assuage", "alleviate", "mitigate"],
        translations: {
          de: ["besänftigen"],
          fr: ["apaiser"],
          es: ["aplacar"],
          it: ["placare"],
        },
      },
      morose: {
        lexeme: "morose",
        id: 1735873,
        definition: "Sullen and ill-tempered; gloomy.",
        example:
          "After losing the game, he became morose and refused to speak to anyone.",
        etymology:
          "From Latin 'morosus' (peevish, fretful), from 'mos' (custom, disposition).",
        partOfSpeech: "adjective",
        date: "2025-10-22",
        synonyms: ["sullen", "gloomy", "dour", "melancholy", "sulky"],
        antonyms: ["cheerful", "happy", "joyful", "upbeat"],
        related: ["morosely", "moroseness"],
        translations: {
          de: ["mürrisch"],
          fr: ["morose"],
          es: ["moroso"],
          it: ["moroso"],
        },
      },
      munificent: {
        lexeme: "munificent",
        id: 3242861,
        definition: "Very generous in giving or spending.",
        example: "The munificent donor contributed millions to the charity.",
        etymology:
          "From Latin 'munificent-', stem of 'munificus' (generous), from 'munus' (gift) + '-ficus' (making).",
        partOfSpeech: "adjective",
        date: "2025-03-09",
        synonyms: ["generous", "liberal", "bountiful", "lavish"],
        antonyms: ["stingy", "miserly", "tightfisted"],
        related: ["philanthropy", "benevolence", "largesse"],
        translations: {
          de: ["großzügig"],
          fr: ["munificent"],
          es: ["munífico"],
          it: ["munifico"],
        },
      },
      nadir: {
        lexeme: "nadir",
        id: 5648886,
        definition:
          "The lowest point in the fortunes of a person or organization.",
        example:
          "After losing his job and his home, he felt he had reached the nadir of his life.",
        etymology:
          "From Arabic 'naẓīr (as-samt)', meaning 'opposite (to the zenith)'.",
        partOfSpeech: "noun",
        date: "2025-11-06",
        synonyms: ["bottom", "lowest point", "rock bottom", "trough"],
        antonyms: ["zenith", "peak", "apex", "summit"],
        related: ["zenith", "perigee", "depth", "abyss"],
        translations: {
          de: ["Nadir"],
          fr: ["nadir"],
          es: ["nadir"],
          it: ["nadir"],
        },
      },
      nascent: {
        lexeme: "nascent",
        id: 6438722,
        definition:
          "Just coming into existence and beginning to display signs of future potential.",
        example:
          "The nascent technology showed promise but required further development.",
        etymology:
          "From Latin 'nascens', present participle of 'nasci' (to be born).",
        partOfSpeech: "adjective",
        date: "2025-07-28",
        synonyms: ["emerging", "budding", "incipient", "developing"],
        antonyms: ["mature", "established", "declining"],
        related: ["birth", "origin", "growth", "infancy"],
        translations: {
          de: ["entstehend"],
          fr: ["naissant"],
          es: ["naciente"],
          it: ["nascente"],
        },
      },
      nebbish: {
        lexeme: "nebbish",
        id: 6674720,
        definition: "A timid, meek, or ineffectual person.",
        example:
          "He was such a nebbish that he couldn't even speak up when his order was wrong.",
        etymology: "From Yiddish 'nebekh', meaning 'poor, unfortunate'.",
        partOfSpeech: "noun",
        date: "2025-08-07",
        synonyms: ["milquetoast", "pushover", "weakling"],
        antonyms: ["assertive", "bold", "confident"],
        related: ["timid", "meek", "ineffectual"],
        translations: {
          de: ["Schwächling"],
          fr: ["faible"],
          es: ["débil"],
          it: ["debole"],
        },
      },
      nebulous: {
        lexeme: "nebulous",
        id: 141333,
        definition: "Unclear, vague, or ill-defined.",
        example:
          "The company's goals for the next quarter were nebulous and lacked specific targets.",
        etymology:
          "From Latin 'nebulosus' (misty, cloudy), derived from 'nebula' (mist, cloud).",
        partOfSpeech: "adjective",
        date: "2025-01-14",
        synonyms: ["vague", "hazy", "indistinct", "ambiguous"],
        antonyms: ["clear", "precise", "distinct", "definite"],
        related: ["obscure", "murky", "fuzzy", "unclear"],
        translations: {
          de: ["nebulös"],
          fr: ["nébuleux"],
          es: ["nebuloso"],
          it: ["nebuloso"],
        },
      },
      nefarious: {
        lexeme: "nefarious",
        id: 1464637,
        definition: "Wicked or criminal in nature.",
        example:
          "The dictator's nefarious activities were finally exposed by the international press.",
        etymology:
          "From Latin 'nefarius,' meaning 'wicked, abominable,' derived from 'nefas' (crime, sin).",
        partOfSpeech: "adjective",
        date: "2025-10-10",
        synonyms: ["villainous", "heinous", "atrocious", "evil"],
        antonyms: ["virtuous", "noble", "righteous"],
        related: ["sinister", "malevolent", "diabolical"],
        translations: {
          de: ["verwerflich"],
          fr: ["néfaste"],
          es: ["nefasto"],
          it: ["nefasto"],
        },
      },
      neologism: {
        lexeme: "neologism",
        id: 3767342,
        definition:
          "A newly coined word or expression that may be in the process of entering common use but has not yet been fully accepted into mainstream language.",
        example:
          "The term 'blog' was once a neologism before becoming a standard part of the English lexicon.",
        etymology:
          "From French 'néologisme', from Greek 'neos' (new) + 'logos' (word, speech). First used in English in the late 18th century.",
        partOfSpeech: "noun",
        date: "2026-01-07",
        synonyms: ["coinage", "new word", "invention"],
        antonyms: ["archaism", "obsolete term"],
        related: ["lexicon", "terminology", "slang"],
        translations: {
          de: ["Neologismus"],
          fr: ["néologisme"],
          es: ["neologismo"],
          it: ["neologismo"],
        },
      },
      nihilism: {
        lexeme: "nihilism",
        id: 8779058,
        definition:
          "The rejection of all religious and moral principles, often in the belief that life is meaningless.",
        example:
          "His nihilism led him to dismiss both ethical values and societal norms.",
        etymology:
          "From Latin 'nihil' (nothing) + '-ism', first used in the early 19th century.",
        partOfSpeech: "noun",
        date: "2026-01-14",
        synonyms: ["skepticism", "cynicism", "pessimism"],
        antonyms: ["idealism", "optimism", "faith"],
        related: ["existentialism", "absurdism", "anomie"],
        translations: {
          de: ["Nihilismus"],
          fr: ["nihilisme"],
          es: ["nihilismo"],
          it: ["nichilismo"],
        },
      },
      nonchalant: {
        lexeme: "nonchalant",
        id: 4288922,
        definition:
          "Feeling or appearing casually calm and relaxed; not displaying anxiety, interest, or enthusiasm.",
        example:
          "She gave a nonchalant shrug when asked about the exam results.",
        etymology:
          "From French 'nonchalant', present participle of 'nonchaloir' (to disregard), from 'non-' (not) + 'chaloir' (to care), from Latin 'calēre' (to be warm, to care).",
        partOfSpeech: "adjective",
        date: "2025-10-18",
        synonyms: ["unconcerned", "indifferent", "apathetic", "cool", "casual"],
        antonyms: ["concerned", "anxious", "eager", "enthusiastic", "nervous"],
        related: ["detached", "aloof", "blasé", "composed", "laid-back"],
        translations: {
          de: ["nonchalant"],
          fr: ["nonchalant"],
          es: ["despreocupado"],
          it: ["nonchalant"],
        },
      },
      noxious: {
        lexeme: "noxious",
        id: 2392765,
        definition: "Harmful, poisonous, or very unpleasant.",
        example: "The noxious fumes from the factory made it hard to breathe.",
        etymology:
          "From Latin 'noxius', meaning 'hurtful, injurious', from 'noxa' (harm).",
        partOfSpeech: "adjective",
        date: "2026-02-16",
        synonyms: ["toxic", "harmful", "poisonous", "deadly", "destructive"],
        antonyms: ["harmless", "beneficial", "innocuous", "safe"],
        related: ["noxiousness", "noxiously", "pernicious", "deleterious"],
        translations: {
          de: ["schädlich"],
          fr: ["nocif"],
          es: ["nocivo"],
          it: ["nocivo"],
        },
      },
      obdurate: {
        lexeme: "obdurate",
        id: 4261742,
        definition:
          "Stubbornly refusing to change one's opinion or course of action.",
        example:
          "Despite the evidence, he remained obdurate in his refusal to admit the mistake.",
        etymology:
          "From Latin 'obduratus', past participle of 'obdurare' (to harden), from 'ob-' (against) + 'durus' (hard).",
        partOfSpeech: "adjective",
        date: "2025-09-22",
        synonyms: ["stubborn", "unyielding", "inflexible", "adamant"],
        antonyms: ["flexible", "yielding", "compliant", "amenable"],
        related: ["obstinate", "intransigent", "resolute", "dogged"],
        translations: {
          de: ["hartnäckig"],
          fr: ["obstiné"],
          es: ["obstinado"],
          it: ["ostinato"],
        },
      },
      obfuscate: {
        lexeme: "obfuscate",
        id: 7874931,
        definition:
          "To deliberately make something unclear or difficult to understand.",
        example:
          "The politician tried to obfuscate the details of the scandal during the press conference.",
        etymology:
          "From Latin 'obfuscare', meaning 'to darken', from 'ob-' (over) + 'fuscare' (to darken).",
        partOfSpeech: "verb",
        date: "2026-03-25",
        synonyms: ["confuse", "bewilder", "muddle", "cloud"],
        antonyms: ["clarify", "illuminate", "explain", "elucidate"],
        related: ["obfuscation", "obfuscatory", "ambiguous", "equivocate"],
        translations: {
          de: ["verschleiern"],
          fr: ["obscurcir"],
          es: ["ofuscar"],
          it: ["offuscare"],
        },
      },
      obsequious: {
        lexeme: "obsequious",
        id: 3435735,
        definition: "Excessively eager to please or obey others; servile.",
        example:
          "The obsequious waiter fawned over the celebrity, hoping for a generous tip.",
        etymology:
          "From Latin 'obsequiosus' (compliant), from 'obsequium' (compliance), derived from 'obsequi' (to comply with).",
        partOfSpeech: "adjective",
        date: "2026-02-14",
        synonyms: [
          "servile",
          "subservient",
          "fawning",
          "sycophantic",
          "toadying",
        ],
        antonyms: ["assertive", "independent", "defiant", "rebellious"],
        related: ["ingratiating", "groveling", "deferential", "unctuous"],
        translations: {
          de: ["unterwürfig"],
          fr: ["obséquieux"],
          es: ["obsequioso"],
          it: ["ossequioso"],
        },
      },
      obstreperous: {
        lexeme: "obstreperous",
        id: 8076741,
        definition: "Noisy and difficult to control.",
        example:
          "The obstreperous crowd refused to quiet down despite the speaker's pleas.",
        etymology:
          "From Latin 'obstreperus' (clamorous), from 'ob-' (against) + 'strepere' (to make a noise).",
        partOfSpeech: "adjective",
        date: "2025-12-28",
        synonyms: ["boisterous", "rowdy", "unruly", "rambunctious"],
        antonyms: ["quiet", "docile", "subdued", "compliant"],
        related: ["vociferous", "clamorous", "tumultuous"],
        translations: {
          de: ["aufmüpfig"],
          fr: ["tapageur"],
          es: ["estridente"],
          it: ["chiassoso"],
        },
      },
      obtuse: {
        lexeme: "obtuse",
        id: 3925084,
        definition: "Annoyingly insensitive or slow to understand.",
        example:
          "The obtuse student kept asking questions that had already been answered.",
        etymology:
          "From Latin 'obtusus' (blunted, dull), past participle of 'obtundere' (to beat against, blunt).",
        partOfSpeech: "adjective",
        date: "2025-07-27",
        synonyms: ["dense", "slow-witted", "dim", "unperceptive"],
        antonyms: ["sharp", "astute", "perceptive", "quick-witted"],
        related: ["stupid", "ignorant", "unintelligent", "thickheaded"],
        translations: {
          de: ["stumpfsinnig"],
          fr: ["obtus"],
          es: ["obtuso"],
          it: ["ottuso"],
        },
      },
      odious: {
        lexeme: "odious",
        id: 6143136,
        definition: "Extremely unpleasant; repulsive.",
        example:
          "The odious smell from the garbage made everyone leave the room.",
        etymology:
          "From Middle English odious, from Old French odieus, from Latin odiōsus (hateful), from odium (hatred).",
        partOfSpeech: "adjective",
        date: "2025-01-18",
        synonyms: [
          "repulsive",
          "disgusting",
          "loathsome",
          "abhorrent",
          "detestable",
        ],
        antonyms: ["delightful", "pleasant", "agreeable", "charming"],
        related: ["odium", "hatred", "revulsion", "abomination"],
        translations: {
          de: ["abscheulich"],
          fr: ["odieux"],
          es: ["odioso"],
          it: ["odioso"],
        },
      },
      officious: {
        lexeme: "officious",
        id: 6212790,
        definition:
          "Asserting authority or interfering in a pushy or intrusive way, especially in matters not one's concern.",
        example:
          "The officious manager kept micromanaging tasks that were clearly outside his responsibilities.",
        etymology:
          "From Latin 'officiosus' (dutiful, obliging), from 'officium' (duty, service). The negative connotation developed in English by the late 16th century.",
        partOfSpeech: "adjective",
        date: "2026-01-10",
        synonyms: ["meddlesome", "intrusive", "overbearing", "bossy"],
        antonyms: ["unobtrusive", "discreet", "modest"],
        related: ["officiousness", "officiously", "interference"],
        translations: {
          de: ["aufdringlich"],
          fr: ["officieux (in this context: importun)"],
          es: ["oficioso (in this context: entrometido)"],
          it: ["invadente"],
        },
      },
      onerous: {
        lexeme: "onerous",
        id: 2118902,
        definition:
          "Involving a great deal of effort, trouble, or difficulty; burdensome.",
        example:
          "The new regulations placed an onerous burden on small businesses.",
        etymology:
          "From Middle English 'onerous', from Old French 'onereus', from Latin 'onerosus' (burdensome), from 'onus' (burden).",
        partOfSpeech: "adjective",
        date: "2025-06-17",
        synonyms: [
          "burdensome",
          "oppressive",
          "taxing",
          "demanding",
          "arduous",
        ],
        antonyms: ["easy", "light", "effortless", "manageable", "simple"],
        related: ["laborious", "strenuous", "heavy", "weighty", "difficult"],
        translations: {
          de: ["beschwerlich"],
          fr: ["lourd"],
          es: ["oneroso"],
          it: ["oneroso"],
        },
      },
      ostentatious: {
        lexeme: "ostentatious",
        id: 3632793,
        definition: "Designed to impress or attract notice; flashy or showy.",
        example:
          "Her ostentatious display of wealth included a gold-plated sports car and diamond-encrusted watch.",
        etymology:
          "From Latin 'ostentātiōsus', from 'ostentātiō' (display, showing off), derived from 'ostentāre' (to display).",
        partOfSpeech: "adjective",
        date: "2026-03-30",
        synonyms: ["flamboyant", "gaudy", "pretentious", "extravagant"],
        antonyms: ["modest", "unassuming", "plain", "restrained"],
        related: ["showy", "conspicuous", "theatrical", "over-the-top"],
        translations: {
          de: ["auffällig"],
          fr: ["ostentatoire"],
          es: ["ostentoso"],
          it: ["ostentato"],
        },
      },
      palliate: {
        lexeme: "palliate",
        id: 9006459,
        definition:
          "To make less severe or intense without addressing the underlying cause.",
        example:
          "The doctor prescribed painkillers to palliate the patient's symptoms while waiting for test results.",
        etymology:
          "From Latin 'palliatus' (cloaked, covered), from 'pallium' (cloak).",
        partOfSpeech: "verb",
        date: "2025-06-28",
        synonyms: ["alleviate", "mitigate", "ease", "soothe"],
        antonyms: ["aggravate", "worsen", "intensify"],
        related: ["palliative", "relief", "comfort"],
        translations: {
          de: ["lindern"],
          fr: ["pallier"],
          es: ["paliar"],
          it: ["palliativo"],
        },
      },
      pandemonium: {
        lexeme: "pandemonium",
        id: 7315106,
        definition: "Wild and noisy disorder or confusion; uproar.",
        example:
          "The announcement caused pandemonium in the stadium as fans cheered wildly.",
        etymology:
          "Coined by John Milton in 'Paradise Lost' (1667), from Greek 'pan-' (all) + Late Latin 'daemonium' (demon), meaning 'place of all demons'.",
        partOfSpeech: "noun",
        date: "2025-04-27",
        synonyms: ["chaos", "bedlam", "tumult", "uproar", "mayhem"],
        antonyms: ["order", "calm", "peace", "tranquility", "serenity"],
        related: ["commotion", "turmoil", "havoc", "anarchy", "disarray"],
        translations: {
          de: ["Pandämonium"],
          fr: ["pandémonium"],
          es: ["pandemonio"],
          it: ["pandemonio"],
        },
      },
      pander: {
        lexeme: "pander",
        id: 4642306,
        definition:
          "To gratify or indulge (an immoral or distasteful desire or habit).",
        example:
          "The tabloid newspaper pandered to the public's fascination with celebrity scandals.",
        etymology:
          "From Middle English 'pandare', derived from the name of Pandarus, a character in Chaucer's 'Troilus and Criseyde' who acted as a go-between for the lovers.",
        partOfSpeech: "verb",
        date: "2025-12-17",
        synonyms: ["indulge", "cater", "gratify", "appease"],
        antonyms: ["deny", "refuse", "resist", "oppose"],
        related: ["exploit", "manipulate", "appease", "enable"],
        translations: {
          de: ["nachgeben"],
          fr: ["se plier aux désirs"],
          es: ["complacer"],
          it: ["assecondare"],
        },
      },
      paragon: {
        lexeme: "paragon",
        id: 5501593,
        definition:
          "A model of excellence or perfection; a person or thing regarded as a perfect example of a particular quality.",
        example: "She was considered a paragon of virtue by her peers.",
        etymology:
          "From Middle French 'paragon', from Italian 'paragone' (meaning 'touchstone, comparison'), from Byzantine Greek 'parakonē' (meaning 'whetstone').",
        partOfSpeech: "noun",
        date: "2025-12-05",
        synonyms: ["epitome", "ideal", "quintessence", "archetype", "model"],
        antonyms: ["flaw", "imperfection", "mediocrity"],
        related: ["exemplar", "standard", "benchmark", "prototype"],
        translations: {
          de: ["Vorbild"],
          fr: ["parangon"],
          es: ["dechado"],
          it: ["modello"],
        },
      },
      pariah: {
        lexeme: "pariah",
        id: 5818461,
        definition:
          "An outcast; someone who is despised or rejected by society.",
        example:
          "After the scandal, he became a pariah in the business community.",
        etymology:
          "From Tamil 'paṟaiyar' (plural of 'paṟaiyan', meaning 'drummer'), referring to a low caste in southern India. The term was later generalized to mean an outcast in English.",
        partOfSpeech: "noun",
        date: "2025-06-02",
        synonyms: ["outcast", "exile", "leper", "untouchable"],
        antonyms: ["insider", "member", "belonger"],
        related: ["ostracism", "stigma", "rejection"],
        translations: {
          de: ["Paria"],
          fr: ["paria"],
          es: ["paria"],
          it: ["paria"],
        },
      },
      parse: {
        lexeme: "parse",
        id: 3060776,
        definition:
          "To analyze or break down a sentence or other sequence of words into its component parts, describing their syntactic roles.",
        example:
          "The linguist will parse the sentence to identify the subject and predicate.",
        etymology:
          "From Middle English 'parsen', from Old French 'parser', from Latin 'pars' (part).",
        partOfSpeech: "verb",
        date: "2026-02-13",
        synonyms: ["analyze", "deconstruct", "dissect", "interpret"],
        antonyms: ["combine", "synthesize", "unite"],
        related: ["grammar", "syntax", "linguistics", "analysis"],
        translations: {
          de: ["analysieren"],
          fr: ["analyser"],
          es: ["analizar"],
          it: ["analizzare"],
        },
      },
      parsimony: {
        lexeme: "parsimony",
        id: 3519498,
        definition: "Extreme unwillingness to spend money or use resources.",
        example: "Her parsimony meant she reused tea bags to save money.",
        etymology:
          "From Latin 'parsimonia' (frugality), from 'parcere' (to spare).",
        partOfSpeech: "noun",
        date: "2026-02-25",
        synonyms: ["frugality", "stinginess", "thrift", "penny-pinching"],
        antonyms: ["generosity", "extravagance", "lavishness"],
        related: ["economy", "austerity", "miserliness"],
        translations: {
          de: ["Sparsamkeit"],
          fr: ["parcimonie"],
          es: ["parsimonia"],
          it: ["parsimonia"],
        },
      },
      partisan: {
        lexeme: "partisan",
        id: 9450601,
        definition: "A strong supporter of a party, cause, or person.",
        example:
          "She was a partisan of the environmental movement, attending every rally and protest.",
        etymology:
          "From French 'partisan', from Italian 'partigiano', derived from 'parte' (part, faction).",
        partOfSpeech: "noun",
        date: "2025-10-28",
        synonyms: ["supporter", "advocate", "follower", "champion"],
        antonyms: ["opponent", "critic", "adversary"],
        related: ["loyalist", "devotee", "zealot", "ally"],
        translations: {
          de: ["Parteigänger"],
          fr: ["partisan"],
          es: ["partidario"],
          it: ["partigiano"],
        },
      },
      paucity: {
        lexeme: "paucity",
        id: 8289566,
        definition:
          "The presence of something in only small or insufficient quantities or amounts; scarcity.",
        example: "There is a paucity of evidence to support the claim.",
        etymology:
          "Late Middle English from Old French 'paucite' or Latin 'paucitas', from 'paucus' meaning 'few'.",
        partOfSpeech: "noun",
        date: "2025-04-16",
        synonyms: ["scarcity", "dearth", "shortage", "lack", "insufficiency"],
        antonyms: ["abundance", "plenty", "surplus", "excess"],
        related: ["scarcity", "deficiency", "shortfall", "meagerness"],
        translations: {
          de: ["Knappheit"],
          fr: ["pénurie"],
          es: ["escasez"],
          it: ["scarsità"],
        },
      },
      pejorative: {
        lexeme: "pejorative",
        id: 2329653,
        definition: "Expressing contempt or disapproval.",
        example:
          "The term 'politician' is sometimes used in a pejorative sense to imply dishonesty.",
        etymology:
          "From French 'péjoratif', from Latin 'pejorare' (to make worse), from 'pejor' (worse).",
        partOfSpeech: "adjective",
        date: "2025-06-06",
        synonyms: ["derogatory", "disparaging", "demeaning", "deprecatory"],
        antonyms: ["complimentary", "laudatory", "praising", "approving"],
        related: ["insult", "slur", "offensive", "negative"],
        translations: {
          de: ["abwertend"],
          fr: ["péjoratif"],
          es: ["peyorativo"],
          it: ["peggiorativo"],
        },
      },
      penchant: {
        lexeme: "penchant",
        id: 6621562,
        definition:
          "A strong or habitual liking for something or tendency to do something.",
        example: "She has a penchant for wearing bright colors.",
        etymology:
          "From French 'penchant', present participle of 'pencher' (to incline), from Latin 'pendere' (to weigh, hang).",
        partOfSpeech: "noun",
        date: "2025-02-28",
        synonyms: ["inclination", "predilection", "proclivity", "affinity"],
        antonyms: ["aversion", "disinclination", "dislike"],
        related: ["preference", "tendency", "leaning", "fondness"],
        translations: {
          de: ["Vorliebe"],
          fr: ["penchant"],
          es: ["inclinación"],
          it: ["predilezione"],
        },
      },
      penurious: {
        lexeme: "penurious",
        id: 4406111,
        definition: "Extremely poor; poverty-stricken.",
        example:
          "The penurious family struggled to afford even the most basic necessities.",
        etymology:
          "From Latin 'penuria' (want, need) + '-ous' (suffix forming adjectives).",
        partOfSpeech: "adjective",
        date: "2025-03-01",
        synonyms: ["destitute", "impoverished", "indigent", "needy"],
        antonyms: ["wealthy", "affluent", "prosperous"],
        related: ["poverty", "frugal", "miserly"],
        translations: {
          de: ["arm"],
          fr: ["misérable"],
          es: ["pobre"],
          it: ["povero"],
        },
      },
      perfidious: {
        lexeme: "perfidious",
        id: 2598430,
        definition: "Deceitful and untrustworthy.",
        example: "The perfidious ally betrayed the secret plans to the enemy.",
        etymology:
          "From Latin 'perfidiosus' (treacherous), derived from 'perfidia' (faithlessness).",
        partOfSpeech: "adjective",
        date: "2025-05-08",
        synonyms: ["treacherous", "disloyal", "faithless", "deceitful"],
        antonyms: ["loyal", "faithful", "trustworthy"],
        related: ["betrayal", "treachery", "duplicity"],
        translations: {
          de: ["perfide"],
          fr: ["perfide"],
          es: ["pérfido"],
          it: ["perfido"],
        },
      },
      perfunctory: {
        lexeme: "perfunctory",
        id: 9757969,
        definition:
          "Done without real interest, attention, or effort; carried out with a minimum of effort.",
        example:
          "She gave a perfunctory nod to acknowledge his presence but didn't engage in conversation.",
        etymology:
          "From Late Latin 'perfunctorius', meaning 'careless, negligent', from Latin 'perfunctus' (past participle of 'perfungi' – 'to perform, discharge').",
        partOfSpeech: "adjective",
        date: "2025-09-20",
        synonyms: [
          "cursory",
          "superficial",
          "mechanical",
          "automatic",
          "routine",
        ],
        antonyms: [
          "thorough",
          "careful",
          "meticulous",
          "attentive",
          "detailed",
        ],
        related: [
          "indifferent",
          "apathetic",
          "uninterested",
          "half-hearted",
          "obligatory",
        ],
        translations: {
          de: ["oberflächlich"],
          fr: ["superficiel"],
          es: ["superficial"],
          it: ["superficiale"],
        },
      },
      permeate: {
        lexeme: "permeate",
        id: 857036,
        definition: "To spread or diffuse through every part of something.",
        example: "The smell of fresh coffee permeated the entire house.",
        etymology:
          "From Latin 'permeatus', past participle of 'permeare' (to pass through), from 'per-' (through) + 'meare' (to go, pass).",
        partOfSpeech: "verb",
        date: "2025-02-24",
        synonyms: ["infuse", "penetrate", "saturate", "pervade"],
        antonyms: ["block", "hinder", "repel"],
        related: ["diffuse", "imbue", "soak", "filter"],
        translations: {
          de: ["durchdringen"],
          fr: ["imprégner"],
          es: ["impregnar"],
          it: ["permeare"],
        },
      },
      pernicious: {
        lexeme: "pernicious",
        id: 6220779,
        definition:
          "Having a harmful effect, especially in a gradual or subtle way.",
        example:
          "The pernicious influence of social media on self-esteem is well-documented.",
        etymology:
          "From Latin 'perniciosus' (destructive), from 'pernicies' (ruin, destruction), from 'per-' (thoroughly) + 'nex' (death).",
        partOfSpeech: "adjective",
        date: "2025-01-11",
        synonyms: [
          "destructive",
          "harmful",
          "deleterious",
          "injurious",
          "noxious",
        ],
        antonyms: ["beneficial", "harmless", "innocuous", "salutary"],
        related: ["insidious", "malignant", "toxic", "corrosive", "virulent"],
        translations: {
          de: ["schädlich"],
          fr: ["pernicieux"],
          es: ["pernicioso"],
          it: ["pernicioso"],
        },
      },
      perspicacious: {
        lexeme: "perspicacious",
        id: 3708850,
        definition:
          "Having a ready insight into and understanding of things; mentally sharp or perceptive.",
        example:
          "Her perspicacious observations about human behavior made her an excellent psychologist.",
        etymology:
          "From Latin 'perspicax, perspicac-' meaning 'sharp-sighted', from 'perspicere' (to look through, see clearly).",
        partOfSpeech: "adjective",
        date: "2025-01-02",
        synonyms: ["perceptive", "discerning", "astute", "shrewd", "keen"],
        antonyms: ["obtuse", "dull", "unobservant", "ignorant"],
        related: ["perspicacity", "perspicuity", "insightful", "sagacious"],
        translations: {
          de: ["scharfsinnig"],
          fr: ["perspicace"],
          es: ["perspicaz"],
          it: ["perspicace"],
        },
      },
      petulant: {
        lexeme: "petulant",
        id: 7401159,
        definition: "childishly sulky or bad-tempered",
        example: "She became petulant when her request was denied.",
        etymology:
          "From Middle French 'petulant', from Latin 'petulant-' (stem of 'petulans'), meaning 'wanton, insolent'.",
        partOfSpeech: "adjective",
        date: "2025-08-22",
        synonyms: ["peevish", "irritable", "fretful", "pouty"],
        antonyms: ["patient", "good-natured", "cheerful"],
        related: ["sulky", "moody", "grumpy", "testy"],
        translations: {
          de: ["gereizt"],
          fr: ["capricieux"],
          es: ["malhumorado"],
          it: ["petulante"],
        },
      },
      phlegmatic: {
        lexeme: "phlegmatic",
        id: 9668791,
        definition: "Having an unemotional and calm disposition.",
        example:
          "Despite the chaos around him, he remained phlegmatic and composed.",
        etymology:
          "From Old French 'fleumatique', from Late Latin 'phlegmaticus', from Greek 'phlegmatikos' (pertaining to phlegm).",
        partOfSpeech: "adjective",
        date: "2025-09-14",
        synonyms: ["stoic", "unflappable", "composed", "impassive"],
        antonyms: ["emotional", "excitable", "volatile", "fiery"],
        related: ["calm", "collected", "placid", "indifferent"],
        translations: {
          de: ["phlegmatisch"],
          fr: ["flegmatique"],
          es: ["flemático"],
          it: ["flemmatico"],
        },
      },
      placate: {
        lexeme: "placate",
        id: 1980082,
        definition: "To make someone less angry or hostile.",
        example:
          "The manager tried to placate the upset customer by offering a refund.",
        etymology:
          "From Latin 'placatus', past participle of 'placare' (to calm, soothe).",
        partOfSpeech: "verb",
        date: "2025-12-10",
        synonyms: ["appease", "pacify", "mollify", "soothe", "calm"],
        antonyms: ["anger", "enrage", "provoke", "aggravate", "irritate"],
        related: ["conciliate", "assuage", "alleviate", "reconcile"],
        translations: {
          de: ["besänftigen"],
          fr: ["apaiser"],
          es: ["aplacar"],
          it: ["placare"],
        },
      },
      platitude: {
        lexeme: "platitude",
        id: 1029561,
        definition:
          "A remark or statement, especially one with a moral content, that has been used too often to be interesting or thoughtful.",
        example:
          "She offered the usual platitude about how hard work always pays off.",
        etymology: "Early 19th century: from French, from plat ‘flat’.",
        partOfSpeech: "noun",
        date: "2025-02-26",
        synonyms: ["cliché", "banality", "truism", "commonplace"],
        antonyms: ["originality", "innovation", "freshness"],
        related: ["clichéd", "hackneyed", "trite", "prosaic"],
        translations: {
          de: ["Platitüde"],
          fr: ["platitude"],
          es: ["perogrullada"],
          it: ["luogo comune"],
        },
      },
      poignant: {
        lexeme: "poignant",
        id: 1197795,
        definition: "Evoking a keen sense of sadness or regret; deeply moving.",
        example:
          "The poignant scene of the old man reminiscing about his youth brought tears to the audience's eyes.",
        etymology:
          "From Middle French 'poignant', present participle of 'poindre' (to prick, sting), from Latin 'pungere' (to prick).",
        partOfSpeech: "adjective",
        date: "2025-08-28",
        synonyms: ["touching", "heartrending", "moving", "emotional"],
        antonyms: ["unemotional", "indifferent", "unaffecting"],
        related: ["bittersweet", "melancholy", "nostalgic"],
        translations: {
          de: ["ergreifend"],
          fr: ["poignant"],
          es: ["conmovedor"],
          it: ["commovente"],
        },
      },
      polemical: {
        lexeme: "polemical",
        id: 9115736,
        definition:
          "Relating to or involving strongly critical, controversial, or disputatious writing or speech.",
        example:
          "The article was highly polemical, attacking the government's policies with sharp criticism.",
        etymology: "From Greek 'polemikos' (warlike), from 'polemos' (war).",
        partOfSpeech: "adjective",
        date: "2026-03-05",
        synonyms: [
          "controversial",
          "contentious",
          "argumentative",
          "disputatious",
        ],
        antonyms: ["conciliatory", "peaceful", "agreeable"],
        related: ["debate", "criticism", "rhetoric", "dispute"],
        translations: {
          de: ["polemisch"],
          fr: ["polémique"],
          es: ["polémico"],
          it: ["polemico"],
        },
      },
      ponderous: {
        lexeme: "ponderous",
        id: 6804974,
        definition:
          "Slow and clumsy because of great weight; dull or laborious.",
        example:
          "The ponderous elephant moved slowly through the dense jungle.",
        etymology:
          "From Middle English 'ponderous', from Latin 'ponderosus' (weighty), from 'pondus' (weight).",
        partOfSpeech: "adjective",
        date: "2025-12-12",
        synonyms: ["heavy", "lumbering", "bulky", "cumbersome", "leaden"],
        antonyms: ["light", "nimble", "graceful", "agile"],
        related: ["ponder", "ponderously", "ponderousness"],
        translations: {
          de: ["schwerfällig"],
          fr: ["pesant"],
          es: ["pesado"],
          it: ["pesante"],
        },
      },
      portent: {
        lexeme: "portent",
        id: 7329228,
        definition:
          "A sign or warning that something, especially something momentous or calamitous, is likely to happen.",
        example: "The dark clouds were seen as a portent of the coming storm.",
        etymology:
          "From Latin 'portentum', meaning 'omen, sign', from 'portendere' (to indicate, foretell).",
        partOfSpeech: "noun",
        date: "2025-10-30",
        synonyms: ["omen", "sign", "warning", "forewarning", "augury"],
        antonyms: ["aftermath", "result", "consequence"],
        related: ["prognostication", "harbinger", "premonition", "prophecy"],
        translations: {
          de: ["Omen"],
          fr: ["présage"],
          es: ["presagio"],
          it: ["presagio"],
        },
      },
      postulate: {
        lexeme: "postulate",
        id: 3411826,
        definition:
          "To suggest or assume the existence, fact, or truth of something as a basis for reasoning, discussion, or belief.",
        example:
          "Einstein postulated that the speed of light is constant in all inertial frames of reference.",
        etymology:
          "From Latin 'postulātus', past participle of 'postulāre' (to demand, claim), possibly from 'poscere' (to ask urgently).",
        partOfSpeech: "verb",
        date: "2026-01-05",
        synonyms: ["assume", "presume", "hypothesize", "suppose"],
        antonyms: ["prove", "disprove", "verify"],
        related: ["axiom", "theorem", "premise", "conjecture"],
        translations: {
          de: ["postulieren"],
          fr: ["postuler"],
          es: ["postular"],
          it: ["postulare"],
        },
      },
      pragmatic: {
        lexeme: "pragmatic",
        id: 6084404,
        definition:
          "Dealing with things sensibly and realistically in a way that is based on practical rather than theoretical considerations.",
        example:
          "Her pragmatic approach to problem-solving helped the team meet the deadline.",
        etymology:
          "From Late Latin pragmaticus, from Greek pragmatikos ('fit for business, active'), from pragma ('deed, act').",
        partOfSpeech: "adjective",
        date: "2025-11-28",
        synonyms: ["practical", "realistic", "down-to-earth", "sensible"],
        antonyms: ["idealistic", "impractical", "unrealistic"],
        related: ["pragmatism", "pragmatist"],
        translations: {
          de: ["pragmatisch"],
          fr: ["pragmatique"],
          es: ["pragmático"],
          it: ["pragmatico"],
        },
      },
      precipice: {
        lexeme: "precipice",
        id: 1460591,
        definition:
          "A very steep or overhanging face of a rock, cliff, or mountain.",
        example:
          "The hikers stood at the edge of the precipice, gazing down at the valley below.",
        etymology:
          "From Latin 'praecipitium' (steep place, headlong fall), from 'praeceps' (headlong).",
        partOfSpeech: "noun",
        date: "2025-01-24",
        synonyms: ["cliff", "bluff", "crag", "escarpment", "sheer drop"],
        antonyms: ["plain", "plateau", "flatland"],
        related: ["abyss", "chasm", "drop-off", "ledge", "steep"],
        translations: {
          de: ["Abgrund"],
          fr: ["précipice"],
          es: ["precipicio"],
          it: ["precipizio"],
        },
      },
      preclude: {
        lexeme: "preclude",
        id: 5202152,
        definition:
          "To prevent something from happening or make it impossible.",
        example: "The heavy rain precluded any chance of a picnic.",
        etymology:
          "From Latin 'praecludere', meaning 'to shut off' (prae- 'before' + claudere 'to close').",
        partOfSpeech: "verb",
        date: "2025-03-21",
        synonyms: ["prevent", "prohibit", "hinder", "obstruct", "rule out"],
        antonyms: ["allow", "permit", "enable", "facilitate"],
        related: ["exclude", "forestall", "avert", "thwart"],
        translations: {
          de: ["ausschließen"],
          fr: ["empêcher"],
          es: ["impedir"],
          it: ["impedire"],
        },
      },
      precocious: {
        lexeme: "precocious",
        id: 274775,
        definition:
          "Having developed certain abilities or inclinations at an earlier age than usual.",
        example: "The precocious child was reading novels by the age of five.",
        etymology:
          "From Latin 'praecox' (genitive 'praecocis'), meaning 'early ripening', from 'prae-' (before) + 'coquere' (to cook, ripen).",
        partOfSpeech: "adjective",
        date: "2025-11-29",
        synonyms: ["advanced", "gifted", "talented", "mature"],
        antonyms: ["slow", "backward", "delayed"],
        related: ["prodigy", "genius", "early bloomer"],
        translations: {
          de: ["frühreif"],
          fr: ["précoce"],
          es: ["precoz"],
          it: ["precoce"],
        },
      },
      predicate: {
        lexeme: "predicate",
        id: 1552889,
        definition:
          "The part of a sentence or clause that expresses what is said about the subject.",
        example:
          "In the sentence 'The cat is sleeping,' 'is sleeping' is the predicate.",
        etymology:
          "From Latin 'praedicatum,' meaning 'thing declared,' from 'praedicare' (to proclaim).",
        partOfSpeech: "noun",
        date: "2025-07-01",
        synonyms: ["assertion", "declaration", "statement"],
        antonyms: ["subject"],
        related: ["verb", "clause", "grammar", "proposition"],
        translations: {
          de: ["Prädikat"],
          fr: ["prédicat"],
          es: ["predicado"],
          it: ["predicato"],
        },
      },
      prescient: {
        lexeme: "prescient",
        id: 667014,
        definition:
          "Having knowledge of events before they take place; foresight.",
        example:
          "Her prescient warning about the economic downturn was initially ignored.",
        etymology:
          "From Latin 'praescient-', present participle of 'praescire' (to know beforehand), from 'prae-' (before) + 'scire' (to know).",
        partOfSpeech: "adjective",
        date: "2025-08-24",
        synonyms: ["prophetic", "clairvoyant", "foresighted", "visionary"],
        antonyms: ["unperceptive", "shortsighted", "unaware"],
        related: ["foresight", "premonition", "intuition", "anticipation"],
        translations: {
          de: ["vorausschauend"],
          fr: ["prévoyant"],
          es: ["previsor"],
          it: ["preveggente"],
        },
      },
      prevaricate: {
        lexeme: "prevaricate",
        id: 7884081,
        definition:
          "To speak or act in an evasive way; to avoid telling the truth directly.",
        example:
          "When questioned about the missing funds, the official began to prevaricate, giving vague and unclear answers.",
        etymology:
          "From Latin 'praevaricari', meaning 'to walk crookedly, to deviate', from 'prae-' (before) + 'varicare' (to straddle).",
        partOfSpeech: "verb",
        date: "2025-02-03",
        synonyms: ["equivocate", "hedge", "beat around the bush", "dodge"],
        antonyms: ["confess", "declare", "assert", "affirm"],
        related: ["evasion", "deception", "ambiguity", "duplicity"],
        translations: {
          de: ["ausweichen"],
          fr: ["prévariquer"],
          es: ["prevaricar"],
          it: ["prevaricare"],
        },
      },
      proclivity: {
        lexeme: "proclivity",
        id: 2885446,
        definition: "A natural or habitual inclination or tendency.",
        example:
          "She has a proclivity for starting projects but rarely finishes them.",
        etymology:
          "From Latin 'proclivitas', meaning 'inclination' or 'tendency', from 'proclivis' ('inclined').",
        partOfSpeech: "noun",
        date: "2025-12-18",
        synonyms: [
          "tendency",
          "inclination",
          "predisposition",
          "penchant",
          "propensity",
        ],
        antonyms: ["aversion", "disinclination", "reluctance"],
        related: ["preference", "leaning", "bias", "affinity"],
        translations: {
          de: ["Neigung"],
          fr: ["propension"],
          es: ["proclividad"],
          it: ["propensione"],
        },
      },
      profligate: {
        lexeme: "profligate",
        id: 7592628,
        definition:
          "recklessly extravagant or wasteful in the use of resources.",
        example:
          "The profligate spending of the company's funds led to its eventual bankruptcy.",
        etymology:
          "From Latin 'profligatus' (ruined, abandoned), past participle of 'profligare' (to strike down, ruin), from 'pro-' (forward) + 'fligere' (to strike).",
        partOfSpeech: "adjective",
        date: "2025-12-06",
        synonyms: ["wasteful", "extravagant", "spendthrift", "prodigal"],
        antonyms: ["frugal", "thrifty", "economical", "prudent"],
        related: ["dissolute", "reckless", "improvident", "lavish"],
        translations: {
          de: ["verschwenderisch"],
          fr: ["prodigue"],
          es: ["pródigo"],
          it: ["prodigo"],
        },
      },
      profound: {
        lexeme: "profound",
        id: 8106211,
        definition:
          "Having deep meaning or significance; very great or intense.",
        example:
          "Her profound understanding of the subject impressed everyone in the room.",
        etymology:
          "From Old French 'profond', from Latin 'profundus' ('deep'), from 'pro-' ('forward') + 'fundus' ('bottom').",
        partOfSpeech: "adjective",
        date: "2025-04-01",
        synonyms: ["deep", "intense", "thoughtful", "philosophical"],
        antonyms: ["superficial", "shallow", "trivial"],
        related: ["depth", "insight", "wisdom", "meaningful"],
        translations: {
          de: ["tiefgründig"],
          fr: ["profond"],
          es: ["profundo"],
          it: ["profondo"],
        },
      },
      profusion: {
        lexeme: "profusion",
        id: 432163,
        definition: "An abundance or large quantity of something.",
        example: "The garden was a profusion of colors in the spring.",
        etymology:
          "From Latin 'profusio', meaning 'a pouring forth', from 'profundere' (to pour out).",
        partOfSpeech: "noun",
        date: "2025-01-08",
        synonyms: ["abundance", "plenty", "wealth", "copiousness"],
        antonyms: ["scarcity", "lack", "dearth", "paucity"],
        related: ["exuberance", "lavishness", "overflow", "bounty"],
        translations: {
          de: ["Fülle"],
          fr: ["profusion"],
          es: ["profusión"],
          it: ["profusione"],
        },
      },
      progeny: {
        lexeme: "progeny",
        id: 4607797,
        definition:
          "The descendants or offspring of a person, animal, or plant.",
        example: "The champion racehorse's progeny also excelled on the track.",
        etymology:
          "From Latin 'progenies', from 'pro-' (forward) + 'gignere' (to beget).",
        partOfSpeech: "noun",
        date: "2025-11-04",
        synonyms: ["offspring", "descendants", "children", "heirs", "seed"],
        antonyms: ["ancestor", "forebear", "progenitor"],
        related: ["lineage", "posterity", "family", "successors"],
        translations: {
          de: ["Nachkommen"],
          fr: ["progéniture"],
          es: ["progenie"],
          it: ["progenie"],
        },
      },
      prolific: {
        lexeme: "prolific",
        id: 6598710,
        definition:
          "Producing much fruit, foliage, or many offspring; highly productive or creative.",
        example: "The prolific author published three novels in a single year.",
        etymology:
          "From Latin 'prolificus', meaning 'fruitful' or 'generative', derived from 'proles' (offspring) + 'facere' (to make).",
        partOfSpeech: "adjective",
        date: "2025-05-21",
        synonyms: ["productive", "fertile", "fruitful", "creative", "abundant"],
        antonyms: ["barren", "unproductive", "sterile", "infertile"],
        related: ["fecund", "generative", "copious", "proliferate"],
        translations: {
          de: ["produktiv"],
          fr: ["prolifique"],
          es: ["prolífico"],
          it: ["prolifico"],
        },
      },
      prosaic: {
        lexeme: "prosaic",
        id: 4888420,
        definition: "Lacking poetic beauty; dull and unimaginative.",
        example:
          "His prosaic description of the sunset failed to capture its beauty.",
        etymology: "From Latin 'prosaicus' (in prose), from 'prosa' (prose).",
        partOfSpeech: "adjective",
        date: "2025-07-13",
        synonyms: ["unimaginative", "mundane", "ordinary", "pedestrian"],
        antonyms: ["poetic", "imaginative", "inspired", "vivid"],
        related: ["prose", "banal", "commonplace"],
        translations: {
          de: ["prosaisch"],
          fr: ["prosaïque"],
          es: ["prosaico"],
          it: ["prosaico"],
        },
      },
      proselytize: {
        lexeme: "proselytize",
        id: 6733394,
        definition:
          "To convert or attempt to convert someone from one religion, belief, or opinion to another.",
        example:
          "The missionary traveled to distant lands to proselytize and spread his faith.",
        etymology:
          "From Late Latin 'proselytus' (meaning 'convert'), from Greek 'prosēlytos' (meaning 'stranger, convert'), from 'proserchomai' (meaning 'to come to').",
        partOfSpeech: "verb",
        date: "2025-04-30",
        synonyms: ["convert", "evangelize", "preach", "recruit"],
        antonyms: ["dissuade", "deter", "discourage"],
        related: ["missionary", "propagate", "indoctrinate", "persuade"],
        translations: {
          de: ["missionieren"],
          fr: ["prosélytiser"],
          es: ["proselitizar"],
          it: ["proselitizzare"],
        },
      },
      protean: {
        lexeme: "protean",
        id: 9426077,
        definition:
          "Highly variable or adaptable; able to change frequently or easily.",
        example:
          "Her protean talent allowed her to excel in acting, singing, and dancing.",
        etymology:
          "From Greek 'Proteus', a sea god in mythology who could change his shape at will.",
        partOfSpeech: "adjective",
        date: "2025-08-09",
        synonyms: ["versatile", "adaptable", "changeable", "mutable"],
        antonyms: ["inflexible", "rigid", "unchanging"],
        related: ["transformative", "chameleonic", "variable"],
        translations: {
          de: ["proteisch"],
          fr: ["protéiforme"],
          es: ["proteico"],
          it: ["proteiforme"],
        },
      },
      prudence: {
        lexeme: "prudence",
        id: 2151185,
        definition:
          "The quality of being cautious and sensible in decision-making, especially to avoid unnecessary risks.",
        example:
          "She exercised prudence by saving a portion of her salary every month.",
        etymology:
          "From Old French 'prudence' (14th c.), from Latin 'prudentia' (foresight, wisdom), from 'prudens' (contraction of 'providens'—foreseeing).",
        partOfSpeech: "noun",
        date: "2025-08-23",
        synonyms: ["wisdom", "caution", "judiciousness", "circumspection"],
        antonyms: ["recklessness", "imprudence", "folly"],
        related: ["discretion", "foresight", "thrift", "vigilance"],
        translations: {
          de: ["Umsicht"],
          fr: ["prudence"],
          es: ["prudencia"],
          it: ["prudenza"],
        },
      },
      pulchritude: {
        lexeme: "pulchritude",
        id: 9829270,
        definition: "Physical beauty or attractiveness.",
        example: "The pulchritude of the sunset left everyone in awe.",
        etymology:
          "From Latin 'pulchritūdō' (beauty), derived from 'pulcher' (beautiful).",
        partOfSpeech: "noun",
        date: "2025-09-24",
        synonyms: ["beauty", "loveliness", "attractiveness", "comeliness"],
        antonyms: ["ugliness", "plainness", "homeliness"],
        related: ["aesthetics", "grace", "elegance", "charm"],
        translations: {
          de: ["Schönheit"],
          fr: ["beauté"],
          es: ["belleza"],
          it: ["bellezza"],
        },
      },
      quagmire: {
        lexeme: "quagmire",
        id: 6801172,
        definition:
          "A soft, boggy area of land that gives way underfoot; a difficult or precarious situation.",
        example:
          "The political scandal became a quagmire from which the senator couldn't escape.",
        etymology:
          "From Middle English 'quagmire', combining 'quag' (meaning 'shake' or 'bog') + 'mire' (meaning 'swamp').",
        partOfSpeech: "noun",
        date: "2025-10-26",
        synonyms: ["bog", "marsh", "swamp", "predicament", "dilemma"],
        antonyms: ["solid ground", "firm footing", "solution", "resolution"],
        related: ["morass", "quicksand", "entanglement", "imbroglio"],
        translations: {
          de: ["Sumpf"],
          fr: ["bourbier"],
          es: ["atolladero"],
          it: ["pantano"],
        },
      },
      querulous: {
        lexeme: "querulous",
        id: 2130354,
        definition: "Complaining in a petulant or whining manner.",
        example:
          "The querulous tone of his voice made it clear he was not satisfied with the service.",
        etymology:
          "From Latin 'querulus' (complaining), from 'queri' (to complain).",
        partOfSpeech: "adjective",
        date: "2025-11-23",
        synonyms: ["peevish", "fretful", "whiny", "grumbling"],
        antonyms: ["content", "cheerful", "satisfied"],
        related: ["complaint", "petulant", "irritable"],
        translations: {
          de: ["nörgelnd"],
          fr: ["querelleur"],
          es: ["quejumbroso"],
          it: ["querulo"],
        },
      },
      quixotic: {
        lexeme: "quixotic",
        id: 2485524,
        definition:
          "Exceedingly idealistic; unrealistic and impractical, often in pursuit of noble goals.",
        example:
          "His quixotic quest to end world hunger was admirable but ultimately unachievable.",
        etymology:
          "Derived from the character Don Quixote in Miguel de Cervantes' novel, symbolizing impractical idealism.",
        partOfSpeech: "adjective",
        date: "2025-04-11",
        synonyms: ["idealistic", "visionary", "utopian", "romantic"],
        antonyms: ["pragmatic", "realistic", "practical"],
        related: ["chivalrous", "fanciful", "dreamy"],
        translations: {
          de: ["quijotisch"],
          fr: ["quichottesque"],
          es: ["quijotesco"],
          it: ["chisciottesco"],
        },
      },
      quorum: {
        lexeme: "quorum",
        id: 7533422,
        definition:
          "The minimum number of members of an assembly or society that must be present at any of its meetings to make the proceedings of that meeting valid.",
        example:
          "The board meeting could not proceed as they failed to achieve a quorum.",
        etymology:
          "From Latin 'quorum', genitive plural of 'qui' (who), originally used in commissions to indicate the minimum number of members required.",
        partOfSpeech: "noun",
        date: "2026-01-09",
        synonyms: ["minimum", "requirement", "threshold"],
        antonyms: ["absence", "lack"],
        related: ["majority", "consensus", "attendance"],
        translations: {
          de: ["Quorum"],
          fr: ["quorum"],
          es: ["quórum"],
          it: ["quorum"],
        },
      },
      quotidian: {
        lexeme: "quotidian",
        id: 8156407,
        definition: "Occurring every day; commonplace or ordinary.",
        example:
          "The quotidian tasks of cooking and cleaning can become monotonous.",
        etymology:
          "From Middle English 'cotidian,' from Old French 'cotidien,' from Latin 'quotidianus,' from 'quotidie' (every day).",
        partOfSpeech: "adjective",
        date: "2025-03-18",
        synonyms: ["daily", "routine", "mundane", "everyday"],
        antonyms: ["extraordinary", "rare", "unusual"],
        related: ["habitual", "regular", "frequent", "commonplace"],
        translations: {
          de: ["alltäglich"],
          fr: ["quotidien"],
          es: ["cotidiano"],
          it: ["quotidiano"],
        },
      },
      rancor: {
        lexeme: "rancor",
        id: 1200290,
        definition: "Bitter, long-lasting resentment or ill will.",
        example:
          "Despite years of separation, the rancor between the two former friends was still palpable.",
        etymology:
          "From Middle English 'rancour', from Old French 'rancor', from Latin 'rancor' (rancidity, bitterness), from 'rancere' (to stink, be rancid).",
        partOfSpeech: "noun",
        date: "2025-07-07",
        synonyms: ["bitterness", "animosity", "hostility", "malice", "spite"],
        antonyms: ["amity", "friendship", "goodwill", "harmony"],
        related: ["resentment", "grudge", "enmity", "hatred"],
        translations: {
          de: ["Groll"],
          fr: ["rancœur"],
          es: ["rencor"],
          it: ["rancore"],
        },
      },
      recalcitrant: {
        lexeme: "recalcitrant",
        id: 9743285,
        definition: "Stubbornly resistant to authority or control.",
        example:
          "The recalcitrant student refused to follow the teacher's instructions.",
        etymology:
          "From Latin 'recalcitrant-', the present participle of 'recalcitrare' (to kick back), from 're-' (back) + 'calcitrare' (to kick), from 'calx' (heel).",
        partOfSpeech: "adjective",
        date: "2026-01-01",
        synonyms: ["defiant", "uncooperative", "obstinate", "intractable"],
        antonyms: ["compliant", "obedient", "docile", "amenable"],
        related: ["stubborn", "rebellious", "headstrong", "unyielding"],
        translations: {
          de: ["widerspenstig"],
          fr: ["récalcitrant"],
          es: ["recalcitrante"],
          it: ["recalcitrante"],
        },
      },
      recondite: {
        lexeme: "recondite",
        id: 3448555,
        definition: "Not easily understood; abstruse or obscure.",
        example:
          "The professor's lecture on quantum mechanics was so recondite that most students left confused.",
        etymology:
          "From Latin 'reconditus', past participle of 'recondere' (to conceal), from 're-' (back) + 'condere' (to put together, store).",
        partOfSpeech: "adjective",
        date: "2025-09-29",
        synonyms: ["abstruse", "arcane", "esoteric", "obscure", "profound"],
        antonyms: ["clear", "simple", "straightforward", "obvious"],
        related: ["complex", "cryptic", "enigmatic", "intricate", "perplexing"],
        translations: {
          de: ["abstrus"],
          fr: ["recondite"],
          es: ["recóndito"],
          it: ["recondito"],
        },
      },
      redolent: {
        lexeme: "redolent",
        id: 6611010,
        definition:
          "Strongly reminiscent or suggestive of something; fragrant or sweet-smelling.",
        example:
          "The kitchen was redolent with the aroma of freshly baked bread.",
        etymology:
          "From Middle English, from Old French 'redolent', from Latin 'redolent-', present participle of 'redolere' (to emit a smell), from 're-' (expressing intensive force) + 'olere' (to smell).",
        partOfSpeech: "adjective",
        date: "2025-01-19",
        synonyms: ["aromatic", "fragrant", "suggestive", "evocative"],
        antonyms: ["odorless", "unfragrant", "unremindful"],
        related: ["scent", "perfume", "reminiscent", "nostalgic"],
        translations: {
          de: ["duftend"],
          fr: ["odorant"],
          es: ["fragante"],
          it: ["profumato"],
        },
      },
      refractory: {
        lexeme: "refractory",
        id: 855101,
        definition:
          "Resistant to control or authority; stubbornly disobedient.",
        example:
          "The refractory student refused to follow the teacher's instructions.",
        etymology:
          "From Latin 'refractarius', meaning 'stubborn', from 'refringere' (to break open).",
        partOfSpeech: "adjective",
        date: "2026-03-03",
        synonyms: ["stubborn", "recalcitrant", "unruly", "defiant"],
        antonyms: ["obedient", "compliant", "docile", "submissive"],
        related: ["rebellious", "headstrong", "intractable", "obstinate"],
        translations: {
          de: ["widerspenstig"],
          fr: ["réfractaire"],
          es: ["rebelde"],
          it: ["refrattario"],
        },
      },
      refute: {
        lexeme: "refute",
        id: 8720491,
        definition:
          "To prove a statement or theory to be wrong or false; to deny the truth of something.",
        example:
          "The scientist was able to refute the hypothesis with solid experimental evidence.",
        etymology:
          "From Latin 'refutare', meaning 'to repel, disprove', from 're-' (back) + 'futare' (to beat).",
        partOfSpeech: "verb",
        date: "2025-07-05",
        synonyms: ["disprove", "rebut", "deny", "contradict", "discredit"],
        antonyms: ["confirm", "support", "validate", "prove", "agree"],
        related: ["debunk", "counter", "challenge", "oppose", "negate"],
        translations: {
          de: ["widerlegen"],
          fr: ["réfuter"],
          es: ["refutar"],
          it: ["confutare"],
        },
      },
      relegate: {
        lexeme: "relegate",
        id: 173545,
        definition:
          "To assign to an inferior position, rank, or condition; to banish or send away.",
        example:
          "After the scandal, the manager was relegated to a less prominent role within the company.",
        etymology:
          "From Latin 'relegatus', past participle of 'relegare' (to send away, banish), from 're-' (back) + 'legare' (to send).",
        partOfSpeech: "verb",
        date: "2025-12-07",
        synonyms: ["demote", "downgrade", "banish", "exile"],
        antonyms: ["promote", "elevate", "advance"],
        related: ["delegate", "degrade", "displace"],
        translations: {
          de: ["verbannen"],
          fr: ["reléguer"],
          es: ["relegar"],
          it: ["relegare"],
        },
      },
      remonstrate: {
        lexeme: "remonstrate",
        id: 5898338,
        definition:
          "To protest, object, or argue against something in a forceful or earnest manner.",
        example:
          "She remonstrated with her boss about the unfair treatment of her colleagues.",
        etymology:
          "From Latin 'remonstrare', meaning 'to demonstrate or show again', from 're-' (again) + 'monstrare' (to show).",
        partOfSpeech: "verb",
        date: "2025-03-12",
        synonyms: ["protest", "object", "complain", "argue", "expostulate"],
        antonyms: ["agree", "accept", "acquiesce", "concur"],
        related: ["protestation", "objection", "complaint", "dissent"],
        translations: {
          de: ["protestieren"],
          fr: ["réprimander"],
          es: ["protestar"],
          it: ["rimostrare"],
        },
      },
      replete: {
        lexeme: "replete",
        id: 4411749,
        definition: "Filled or well-supplied with something.",
        example: "The library was replete with rare manuscripts.",
        etymology:
          "From Latin 'repletus', past participle of 'replere' (to fill up), from 're-' (again) + 'plere' (to fill).",
        partOfSpeech: "adjective",
        date: "2025-06-27",
        synonyms: ["full", "abundant", "overflowing", "stocked"],
        antonyms: ["empty", "devoid", "lacking"],
        related: ["satiate", "satisfy", "plentiful"],
        translations: {
          de: ["gefüllt"],
          fr: ["rempli"],
          es: ["repleto"],
          it: ["pieno"],
        },
      },
      reprobate: {
        lexeme: "reprobate",
        id: 7376577,
        definition: "A person who is morally unprincipled or wicked.",
        example:
          "The old man was known in the village as a reprobate, often cheating others in business deals.",
        etymology:
          "From Latin 'reprobatus', past participle of 'reprobare' (to disapprove), from 're-' (back) + 'probare' (to test, approve).",
        partOfSpeech: "noun",
        date: "2025-05-29",
        synonyms: ["scoundrel", "rogue", "villain", "miscreant"],
        antonyms: ["saint", "paragon", "virtuous person"],
        related: ["degenerate", "wayward", "unprincipled", "immoral"],
        translations: {
          de: ["Verworfen"],
          fr: ["réprouvé"],
          es: ["réprobo"],
          it: ["reprobo"],
        },
      },
      reprove: {
        lexeme: "reprove",
        id: 2628458,
        definition:
          "To express disapproval or criticism of someone's behavior.",
        example:
          "The teacher reproved the student for talking during the lecture.",
        etymology:
          "From Middle English 'reproven', from Old French 'reprover', from Latin 'reprobare' (to disapprove, reject), from 're-' (back) + 'probare' (to test, approve).",
        partOfSpeech: "verb",
        date: "2025-06-20",
        synonyms: ["rebuke", "scold", "chide", "admonish", "reprimand"],
        antonyms: ["praise", "commend", "approve", "applaud"],
        related: ["criticize", "disapprove", "censure", "condemn"],
        translations: {
          de: ["tadeln"],
          fr: ["réprimander"],
          es: ["reprochar"],
          it: ["rimproverare"],
        },
      },
      repudiate: {
        lexeme: "repudiate",
        id: 4939710,
        definition: "To refuse to accept or be associated with; to reject.",
        example:
          "The government issued a statement to repudiate the claims made by the opposition.",
        etymology:
          "From Latin 'repudiare', meaning 'to reject, divorce', from 'repudium' (divorce, rejection).",
        partOfSpeech: "verb",
        date: "2026-03-31",
        synonyms: ["reject", "renounce", "disown", "disavow", "deny"],
        antonyms: ["accept", "embrace", "acknowledge", "adopt"],
        related: ["repudiation", "repudiative", "repudiator"],
        translations: {
          de: ["ablehnen"],
          fr: ["répudier"],
          es: ["repudiar"],
          it: ["ripudiare"],
        },
      },
      rescind: {
        lexeme: "rescind",
        id: 2079798,
        definition: "To revoke, cancel, or repeal a law, order, or agreement.",
        example:
          "The company decided to rescind the controversial policy after public backlash.",
        etymology:
          "From Latin 'rescindere', meaning 'to cut off, annul', from 're-' (back) + 'scindere' (to cut).",
        partOfSpeech: "verb",
        date: "2025-12-31",
        synonyms: ["revoke", "repeal", "cancel", "annul", "void"],
        antonyms: ["enact", "uphold", "validate", "confirm"],
        related: ["abrogate", "retract", "withdraw", "nullify"],
        translations: {
          de: ["aufheben"],
          fr: ["révoquer"],
          es: ["rescindir"],
          it: ["rescindere"],
        },
      },
      respite: {
        lexeme: "respite",
        id: 4348961,
        definition:
          "A short period of rest or relief from something difficult or unpleasant.",
        example: "The rain provided a brief respite from the summer heat.",
        etymology:
          "From Old French 'respit', from Latin 'respectus' (refuge, consideration), from 'respicere' (to look back at, regard).",
        partOfSpeech: "noun",
        date: "2025-12-14",
        synonyms: ["break", "pause", "intermission", "hiatus", "lull"],
        antonyms: ["continuation", "persistence", "resumption"],
        related: ["relief", "reprieve", "breather", "rest"],
        translations: {
          de: ["Atempause"],
          fr: ["répit"],
          es: ["respiro"],
          it: ["tregua"],
        },
      },
      resplendent: {
        lexeme: "resplendent",
        id: 8725455,
        definition:
          "Shining brilliantly; gleaming; splendid or dazzling in appearance.",
        example:
          "The queen entered the hall in a resplendent gown adorned with jewels.",
        etymology:
          "From Latin 'resplendere', meaning 'to shine brightly', from 're-' (intensive) + 'splendere' (to shine).",
        partOfSpeech: "adjective",
        date: "2025-06-19",
        synonyms: ["radiant", "glorious", "brilliant", "dazzling", "lustrous"],
        antonyms: ["dull", "dim", "lackluster", "drab"],
        related: ["splendid", "luminous", "effulgent", "shimmering"],
        translations: {
          de: ["glänzend"],
          fr: ["resplendissant"],
          es: ["resplandeciente"],
          it: ["risplendente"],
        },
      },
      restive: {
        lexeme: "restive",
        id: 3416475,
        definition:
          "Unable to remain still, silent, or submissive, especially due to impatience or dissatisfaction.",
        example:
          "The crowd grew restive as the delayed concert showed no signs of starting.",
        etymology:
          "From Old French 'restif' (resisting movement, stubborn), from Latin 'restare' (to remain standing).",
        partOfSpeech: "adjective",
        date: "2025-01-05",
        synonyms: ["impatient", "fidgety", "agitated", "unruly"],
        antonyms: ["calm", "patient", "compliant", "docile"],
        related: ["restless", "rebellious", "defiant", "uneasy"],
        translations: {
          de: ["unruhig"],
          fr: ["rétif"],
          es: ["inquieto"],
          it: ["irrequieto"],
        },
      },
      reticent: {
        lexeme: "reticent",
        id: 2202590,
        definition: "Not revealing one's thoughts or feelings readily.",
        example:
          "She was reticent about her past, preferring to keep her personal life private.",
        etymology:
          "From Latin 'reticent-' (stem of 'reticens'), present participle of 'reticere' (to keep silent), from 're-' (expressing intensive force) + 'tacere' (to be silent).",
        partOfSpeech: "adjective",
        date: "2025-02-17",
        synonyms: ["reserved", "taciturn", "uncommunicative", "tight-lipped"],
        antonyms: ["talkative", "outspoken", "expressive", "loquacious"],
        related: ["guarded", "secretive", "withdrawn", "introverted"],
        translations: {
          de: ["zurückhaltend"],
          fr: ["réticent"],
          es: ["reticente"],
          it: ["reticente"],
        },
      },
      ribald: {
        lexeme: "ribald",
        id: 3582362,
        definition:
          "Referring to coarse or vulgar humor, often in a sexual context.",
        example:
          "The comedian's ribald jokes had the audience both shocked and laughing.",
        etymology:
          "From Middle English 'ribald', from Old French 'ribaut', meaning a rogue or lewd person, possibly of Germanic origin.",
        partOfSpeech: "adjective",
        date: "2025-04-07",
        synonyms: ["lewd", "vulgar", "bawdy", "obscene", "indecent"],
        antonyms: ["decent", "modest", "proper", "refined"],
        related: ["raunchy", "salacious", "risqué", "off-color"],
        translations: {
          de: ["derb"],
          fr: ["grivois"],
          es: ["obsceno"],
          it: ["osceno"],
        },
      },
      ruminate: {
        lexeme: "ruminate",
        id: 3257259,
        definition: "To think deeply about something; to meditate or reflect.",
        example:
          "She would often ruminate on the complexities of human nature.",
        etymology:
          "From Latin 'ruminatus', past participle of 'ruminari', meaning 'to chew the cud' or 'to ponder', from 'rumen' (throat, gullet).",
        partOfSpeech: "verb",
        date: "2025-06-14",
        synonyms: ["ponder", "meditate", "reflect", "contemplate", "mull over"],
        antonyms: ["ignore", "disregard", "overlook"],
        related: ["cogitate", "deliberate", "brood", "consider"],
        translations: {
          de: ["nachdenken"],
          fr: ["ruminer"],
          es: ["rumiar"],
          it: ["rimuginare"],
        },
      },
      sagacious: {
        lexeme: "sagacious",
        id: 5243390,
        definition:
          "Having or showing keen mental discernment and good judgment; wise or shrewd.",
        example:
          "The sagacious investor predicted the market crash before it happened.",
        etymology:
          "From Latin 'sagax' (keen-scented, discerning) + '-acious' (tending to). Entered English in the early 17th century.",
        partOfSpeech: "adjective",
        date: "2025-02-04",
        synonyms: ["wise", "shrewd", "astute", "perceptive", "discerning"],
        antonyms: ["foolish", "unwise", "naive", "obtuse"],
        related: ["sagacity", "insightful", "prudent", "judicious"],
        translations: {
          de: ["scharfsinnig"],
          fr: ["sagace"],
          es: ["sagaz"],
          it: ["sagace"],
        },
      },
      silted: {
        lexeme: "silted",
        id: 8499115,
        definition:
          "Filled or blocked with silt, a fine sediment deposited by water.",
        example:
          "The river's delta became silted over time, reducing its depth.",
        etymology:
          "From Middle English 'silten', related to 'silt', of Scandinavian origin; akin to Norwegian 'sylt' (mud).",
        partOfSpeech: "adjective",
        date: "2025-07-09",
        synonyms: ["clogged", "choked", "sedimented", "blocked"],
        antonyms: ["clear", "unblocked", "free-flowing"],
        related: ["silt", "sediment", "deposit", "alluvium"],
        translations: {
          de: ["verschlammt"],
          fr: ["envasé"],
          es: ["enlodado"],
          it: ["insabbiato"],
        },
      },
      superannulate: {
        lexeme: "superannulate",
        id: 6175246,
        definition: "To retire or pension off due to old age or long service.",
        example:
          "The company policy was to superannulate employees once they reached the age of 65.",
        etymology:
          "From Latin 'super-' (over, above) + 'annus' (year), implying 'beyond the years'.",
        partOfSpeech: "verb",
        date: "2025-08-29",
        synonyms: ["retire", "pension off", "decommission"],
        antonyms: ["hire", "employ", "enlist"],
        related: ["superannuation", "retirement", "pension"],
        translations: {
          de: ["pensionieren"],
          fr: ["mettre à la retraite"],
          es: ["jubilar"],
          it: ["pensionare"],
        },
      },
      tyranny: {
        lexeme: "tyranny",
        id: 9127614,
        definition: "Cruel and oppressive government or rule.",
        example: "The people rebelled against the tyranny of the dictator.",
        etymology:
          "From Middle English 'tirannie', from Old French 'tyrannie', based on Latin 'tyrannia' (rule by a tyrant), from Greek 'tyrannos' (absolute ruler).",
        partOfSpeech: "noun",
        date: "2025-10-29",
        synonyms: ["despotism", "dictatorship", "oppression", "autocracy"],
        antonyms: ["democracy", "freedom", "liberty", "self-governance"],
        related: [
          "authoritarianism",
          "totalitarianism",
          "absolutism",
          "domination",
        ],
        translations: {
          de: ["Tyrannei"],
          fr: ["tyrannie"],
          es: ["tiranía"],
          it: ["tirannia"],
        },
      },
      ubiqutous: {
        lexeme: "ubiqutous",
        id: 5477143,
        definition: "Present, appearing, or found everywhere.",
        example: "Smartphones have become ubiquitous in modern society.",
        etymology:
          "From Latin 'ubique' (everywhere) + '-ous' (suffix forming adjectives).",
        partOfSpeech: "adjective",
        date: "2025-06-12",
        synonyms: ["omnipresent", "pervasive", "universal"],
        antonyms: ["rare", "scarce", "uncommon"],
        related: ["prevalence", "ubiquity", "widespread"],
        translations: {
          de: ["allgegenwärtig"],
          fr: ["ubiquitaire"],
          es: ["ubicuo"],
          it: ["onnipresente"],
        },
      },
      unseemly: {
        lexeme: "unseemly",
        id: 4785612,
        definition: "Not proper or appropriate; unbecoming.",
        example:
          "His unseemly behavior at the formal dinner embarrassed everyone.",
        etymology:
          "From Middle English 'unsemely', from 'un-' (not) + 'semely' (fitting, proper).",
        partOfSpeech: "adjective",
        date: "2025-11-20",
        synonyms: ["inappropriate", "improper", "indecorous", "unbecoming"],
        antonyms: ["proper", "appropriate", "seemly", "decorous"],
        related: ["indecent", "tasteless", "offensive", "rude"],
        translations: {
          de: ["unpassend"],
          fr: ["inconvenant"],
          es: ["inapropiado"],
          it: ["sconveniente"],
        },
      },
      vacuous: {
        lexeme: "vacuous",
        id: 70291,
        definition: "Lacking intelligence, substance, or meaning; empty.",
        example:
          "The politician's vacuous speech failed to address any real issues.",
        etymology: "From Latin 'vacuus' meaning 'empty' or 'void'.",
        partOfSpeech: "adjective",
        date: "2025-11-17",
        synonyms: ["empty", "blank", "hollow", "mindless", "inane"],
        antonyms: ["intelligent", "meaningful", "substantial", "thoughtful"],
        related: ["vacuum", "vacancy", "void", "insubstantial"],
        translations: {
          de: ["leer"],
          fr: ["vide"],
          es: ["vacío"],
          it: ["vuoto"],
        },
      },
      valorous: {
        lexeme: "valorous",
        id: 6785887,
        definition: "Showing or having courage, especially in battle.",
        example: "The valorous knight charged into battle without fear.",
        etymology:
          "From Middle English 'valorous', from Old French 'valeureux', based on Latin 'valor' (value, worth, courage).",
        partOfSpeech: "adjective",
        date: "2025-07-17",
        synonyms: ["brave", "courageous", "heroic", "gallant", "fearless"],
        antonyms: ["cowardly", "timid", "fearful"],
        related: ["valor", "bravery", "fortitude", "daring"],
        translations: {
          de: ["tapfer"],
          fr: ["vaillant"],
          es: ["valeroso"],
          it: ["valoroso"],
        },
      },
      valediction: {
        lexeme: "valediction",
        id: 612928,
        definition:
          "A farewell or goodbye, especially in the form of a speech or statement.",
        example:
          "The professor's valediction at the graduation ceremony moved many students to tears.",
        etymology:
          "From Latin 'valedictio', meaning 'a saying farewell', from 'vale' (farewell) + 'dicere' (to say).",
        partOfSpeech: "noun",
        date: "2025-10-08",
        synonyms: ["farewell", "goodbye", "parting words", "send-off"],
        antonyms: ["greeting", "welcome", "salutation"],
        related: ["valedictorian", "valedictory", "leave-taking", "adieu"],
        translations: {
          de: ["Abschiedsrede"],
          fr: ["adieu"],
          es: ["despedida"],
          it: ["commiato"],
        },
      },
      verbiage: {
        lexeme: "verbiage",
        id: 2404583,
        definition:
          "Excessive or unnecessary use of words in speech or writing.",
        example:
          "The contract was filled with legal verbiage that made it hard to understand.",
        etymology:
          "From French 'verbiage', from 'verbe' (word), from Latin 'verbum' (word).",
        partOfSpeech: "noun",
        date: "2025-04-12",
        synonyms: ["wordiness", "verbosity", "prolixity", "loquacity"],
        antonyms: ["conciseness", "succinctness", "brevity"],
        related: ["jargon", "rhetoric", "circumlocution"],
        translations: {
          de: ["Wortschwall"],
          fr: ["verbiage"],
          es: ["verbosidad"],
          it: ["verbosità"],
        },
      },
      verbose: {
        lexeme: "verbose",
        id: 9153814,
        definition: "Using or containing more words than necessary; wordy.",
        example:
          "The professor's verbose explanation made the simple concept confusing.",
        etymology:
          "From Latin 'verbosus' (full of words), from 'verbum' (word).",
        partOfSpeech: "adjective",
        date: "2025-03-02",
        synonyms: ["wordy", "long-winded", "prolix", "loquacious"],
        antonyms: ["concise", "succinct", "terse", "laconic"],
        related: ["verbose", "verbosity", "verbiage", "circumlocution"],
        translations: {
          de: ["wortreich"],
          fr: ["verbeux"],
          es: ["verboso"],
          it: ["verboso"],
        },
      },
      vicarious: {
        lexeme: "vicarious",
        id: 1333671,
        definition:
          "Experienced through the feelings or actions of another person.",
        example: "She lived vicariously through her daughter's achievements.",
        etymology:
          "From Latin 'vicarius', meaning 'substitute' or 'deputy', via English in the 17th century.",
        partOfSpeech: "adjective",
        date: "2026-03-08",
        synonyms: ["indirect", "secondhand", "substituted"],
        antonyms: ["direct", "firsthand", "personal"],
        related: ["empathy", "proxy", "surrogate"],
        translations: {
          de: ["stellvertretend"],
          fr: ["par procuration"],
          es: ["indirecto"],
          it: ["indiretto"],
        },
      },
      vocation: {
        lexeme: "vocation",
        id: 4482434,
        definition:
          "A strong feeling of suitability for a particular career or occupation.",
        example:
          "Teaching was more than just a job for her; it was her vocation.",
        etymology:
          "From Latin 'vocatio', meaning 'a calling', from 'vocare' (to call).",
        partOfSpeech: "noun",
        date: "2025-11-15",
        synonyms: ["calling", "profession", "occupation", "career"],
        antonyms: ["avocation", "hobby", "pastime"],
        related: ["mission", "purpose", "work", "employment"],
        translations: {
          de: ["Berufung"],
          fr: ["vocation"],
          es: ["vocación"],
          it: ["vocazione"],
        },
      },
      voracious: {
        lexeme: "voracious",
        id: 6629947,
        definition:
          "Having a very eager approach to an activity, especially eating or reading.",
        example: "She is a voracious reader, finishing several books a week.",
        etymology:
          "From Latin 'vorax, vorac-' (devouring), from 'vorare' (to devour).",
        partOfSpeech: "adjective",
        date: "2025-03-15",
        synonyms: ["insatiable", "ravenous", "gluttonous", "greedy"],
        antonyms: ["indifferent", "moderate", "apathetic"],
        related: ["devour", "consuming", "hungry", "avid"],
        translations: {
          de: ["unersättlich"],
          fr: ["vorace"],
          es: ["voraz"],
          it: ["vorace"],
        },
      },
      weild: {
        lexeme: "weild",
        id: 8554755,
        definition: "To hold and use (a weapon or tool) effectively.",
        example: "The knight knew how to wield his sword with great skill.",
        etymology:
          "From Old English 'wieldan', meaning 'to govern, control, possess'.",
        partOfSpeech: "verb",
        date: "2025-12-15",
        synonyms: ["brandish", "handle", "manipulate", "swing"],
        antonyms: ["relinquish", "surrender"],
        related: ["control", "command", "employ", "utilize"],
        translations: {
          de: ["führen"],
          fr: ["manier"],
          es: ["manejar"],
          it: ["brandire"],
        },
      },
      depute: {
        lexeme: "depute",
        id: 5108608,
        definition:
          "To appoint or assign someone to perform a task or duty on behalf of another.",
        example:
          "The manager decided to depute the responsibility of handling client complaints to her assistant.",
        etymology:
          "From Middle English 'deputen', from Old French 'deputer', from Latin 'deputare' (to allot, assign), from 'de-' (down) + 'putare' (to consider, think).",
        partOfSpeech: "verb",
        date: "2025-01-30",
        synonyms: ["delegate", "assign", "appoint", "commission", "entrust"],
        antonyms: ["retain", "withhold", "keep"],
        related: ["deputy", "deputation", "delegation", "authorize"],
        translations: {
          de: ["beauftragen"],
          fr: ["déléguer"],
          es: ["delegar"],
          it: ["delegare"],
        },
      },
      spright: {
        lexeme: "spright",
        id: 7324559,
        definition:
          "A small or lively person or creature, often used to describe someone with a lively or spirited nature.",
        example:
          "The old man was a spright despite his age, dancing with energy at the festival.",
        etymology:
          "From Middle English 'spright', variant of 'sprite', from Old French 'esprit', from Latin 'spiritus' meaning 'breath, spirit'.",
        partOfSpeech: "noun",
        date: "2025-03-07",
        synonyms: ["sprite", "elf", "fairy", "imp", "puck"],
        antonyms: ["giant", "ogre", "goliath"],
        related: ["spirit", "liveliness", "energy", "vigor"],
        translations: {
          de: ["Kobold"],
          fr: ["lutin"],
          es: ["duende"],
          it: ["folletto"],
        },
      },
      unctuous: {
        lexeme: "unctuous",
        id: 92207,
        definition: "Excessively flattering or ingratiating; oily.",
        example:
          "The salesman's unctuous manner made the customers suspicious of his intentions.",
        etymology:
          "From Middle English, from Old French 'unctueus', from Latin 'unctus' (anointed), past participle of 'unguere' (to anoint).",
        partOfSpeech: "adjective",
        date: "2025-05-12",
        synonyms: ["sycophantic", "fawning", "oily", "slick", "smarmy"],
        antonyms: ["genuine", "sincere", "blunt", "direct"],
        related: ["obsequious", "ingratiating", "hypocritical", "insincere"],
        translations: {
          de: "schmierig",
          fr: "onctueux",
          es: "untuoso",
          it: "untuoso",
        },
      },
      languishment: {
        lexeme: "languishment",
        id: 5527731,
        definition: "The state of being languid; a lack of energy or vitality.",
        example:
          "After weeks of illness, she was in a state of languishment, barely able to leave her bed.",
        etymology:
          "From Middle French 'languissement', from 'languir' (to languish) + '-ment' (suffix forming nouns).",
        partOfSpeech: "noun",
        date: "2025-04-26",
        synonyms: ["lassitude", "lethargy", "listlessness"],
        antonyms: ["vigor", "energy", "vitality"],
        related: ["languid", "languish", "languor"],
        translations: {
          de: "Erschlaffung",
          fr: "languissement",
          es: "languidez",
          it: "languore",
        },
      },
    };

    const wordMap: Word[] = Object.values(data)
      .map((val) => parseWord(val))
      .filter((w) => w !== undefined);

    setData(wordMap);
  }, [parseWord]);

  const getWordByDate = useCallback(
    (date: Date): Word | undefined => {
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
      return (
        Object.values(data).find((value) => {
          return value.date === formattedDate;
        }) ?? undefined
      );
    },
    [data],
  );

  async function getStartDate(): Promise<Date> {
    // const req = await fetch("/api/WORD_A_DAY/data?query=getstartdate");
    // const data = await req.json();
    // if (!req.ok) {
    //   throw new Error(
    //     "Unknown Error occurred. Cannot determine the start date.",
    //   );
    // }

    const data = { year: 2025, month: 1, day: 1 };

    const YYYY = data["year"];
    const MM = data["month"];
    const DD = data["day"];

    if (!YYYY || !MM || !DD) {
      throw new Error(
        "Undefined or illegal values for Year, Month, and/or Day",
      );
    }

    const date = new Date();
    date.setFullYear(YYYY);
    date.setMonth(MM);
    date.setDate(DD);

    return date;
  }

  useEffect(() => {
    fetchWords()
      .then(() => {})
      .catch((err) => {
        console.error(err);
      });

    // Get start date
    if (!startDate) {
      getStartDate()
        .then((date: Date) => {
          setStartDate(date);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [startDate, fetchWords]);

  const value = {
    data,
    setData,
    startDate,
    getWordByDate,
    getNGrams,
    fetchWords,
  };

  return <WordContext.Provider value={value}>{children}</WordContext.Provider>;
}

// useWord hook to access WordContext
export const useWord = (): WordManager => {
  const context = useContext(WordContext);

  if (!context) {
    throw new Error("useWord must be used within a WordProvider");
  }

  return context;
};

export function formatDate(date: Date): string {
  const YYYY = date.getFullYear().toString();
  const MM = (date.getMonth() + 1).toString().padStart(2, "0");
  const DD = date.getDate().toString().padStart(2, "0");

  return `${MM}-${DD}-${YYYY}`;
}

export function DateOverlay({ date }: { date?: string }) {
  if (!date) {
    return null;
  }
  return (
    <View>
      <Text>{date}</Text>
    </View>
  );
}

export function Title({ text }: { text: string }) {
  return <Text style={styles.title as TextStyle}>{text}</Text>;
}

export function Divider() {
  return <View style={styles.divider as ViewStyle}></View>;
}

export interface WordWidgetProps {
  word?: Word;
}

function Lexeme({ lexeme }: { lexeme: string | null }) {
  if (!lexeme) {
    return null;
  }

  return <Text style={styles.lexeme as TextStyle}>« {lexeme} »</Text>;
}

function IPA({ ipa }: { ipa: string | null }) {
  if (!ipa) {
    return null;
  }

  return <Text>{ipa}</Text>;
}

function Definition({
  definition,
  partOfSpeech,
}: {
  definition: string | null;
  partOfSpeech: string | null;
}) {
  if (!definition) {
    return null;
  }

  return (
    <Text style={styles.definition as TextStyle}>
      ({partOfSpeech}): {definition}
    </Text>
  );
}

function Example({ example }: { example: string | null }) {
  if (!example) {
    return null;
  }

  return <Text style={styles.example as TextStyle}>{example}</Text>;
}

export function Etymology({ etymology }: { etymology: string | null }) {
  if (!etymology) {
    return null;
  }

  return (
    <View style={styles.widget as ViewStyle}>
      <Title text="📚 Etymology" />
      <Text style={styles.text}>{etymology}</Text>
    </View>
  );
}

function Synonyms({ synonyms }: { synonyms: string[] | null }) {
  if (!synonyms) {
    return null;
  }

  return (
    <View style={[styles.widget as ViewStyle, { flex: 0.5 }]}>
      <Title text="🟰 Synonyms" />
      <Text style={styles.text}>{synonyms?.join(", ")}</Text>
    </View>
  );
}

function Antonyms({ antonyms }: { antonyms: string[] | null }) {
  if (!antonyms) {
    return null;
  }

  return (
    <View style={[styles.widget as ViewStyle, { flex: 0.5 }]}>
      <Title text="🆚 Antonyms" />
      <Text style={styles.text}>{antonyms?.join(", ")}</Text>
    </View>
  );
}

function RelatedWords({ relatedWords }: { relatedWords: string[] | null }) {
  if (!relatedWords) {
    return null;
  }

  return (
    <View style={styles.widget as ViewStyle}>
      <Title text="Related Words" />
      <Text style={styles.text}>{relatedWords?.join(", ")}</Text>
    </View>
  );
}

function Translations({
  translations,
}: {
  translations: Record<string, string[]> | null;
}) {
  const [keys, setKeys] = useState<string[]>([]);
  useEffect(() => {
    setKeys(Object.keys(translations ?? {}));
  }, [translations]);

  if (!translations) {
    return null;
  }

  return (
    <View style={styles.widget as ViewStyle}>
      <Title text="🌍 Translations" />
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 0.5 }}>
          {keys.slice(0, Math.floor(keys.length / 2)).map((lang, i) => (
            <Text key={i} style={styles.text}>
              <Text style={styles.text_mono}>{lang}</Text>:{" "}
              {translations[lang].join(", ")}
            </Text>
          ))}
        </View>
        <View style={{ flex: 0.5 }}>
          {keys.slice(Math.floor(keys.length / 2)).map((lang, i) => (
            <Text key={i} style={styles.text}>
              <Text style={styles.text_mono}>{lang}</Text>:{" "}
              {translations[lang].join(", ")}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
}

export function OverviewCard({ word }: WordWidgetProps) {
  const [dateString, setDateString] = useState<string | null>(null);

  const [lexeme, setLexeme] = useState<string | null>(null);
  const [partOfSpeech, setPartOfSpeech] = useState<string | null>(null);
  const [definition, setDefinition] = useState<string | null>(null);
  const [example, setExample] = useState<string | null>(null);
  const [ipa, setIPA] = useState<string | null>(null);
  const [etymology, setEtymology] = useState<string | null>(null);
  const [synonyms, setSynonyms] = useState<string[] | null>(null);
  const [antonyms, setAntonyms] = useState<string[] | null>(null);
  const [relatedWords, setRelatedWords] = useState<string[] | null>(null);
  const [translations, setTranslations] = useState<Record<
    string,
    string[]
  > | null>(null);

  useEffect(() => {
    if (!word) {
      setDateString(null);
      setLexeme(null);
      setPartOfSpeech(null);
      setDefinition(null);
      setExample(null);
      setEtymology(null);
      setSynonyms(null);
      setIPA(null);
      setAntonyms(null);
      setRelatedWords(null);
      setTranslations(null);
    } else {
      setDateString(word.date);
      setLexeme(word.lexeme);
      setPartOfSpeech(word.partOfSpeech);
      setDefinition(word.definition);
      setExample(word.example);
      setEtymology(word.etymology);
      setSynonyms(word.synonyms);
      setIPA(word.ipa ?? null);
      setAntonyms(word.antonyms);
      setRelatedWords(word.related);
      setTranslations(word.translations);
    }
  }, [word]);

  if (!word) {
    return <Text>no Word.</Text>;
  }

  return (
    <View style={styles.container as ViewStyle}>
      <View style={{ position: "absolute", top: 32 }}>
        <DateOverlay date={dateString ?? undefined} />
      </View>
      <View style={{ width: "100%" }}>
        <Lexeme lexeme={lexeme} />
        <IPA ipa={ipa} />
        <Definition definition={definition} partOfSpeech={partOfSpeech} />
        <Example example={example} />
      </View>
      {/* <Divider />
      <View style={{ width: "100%", gap: 12 }}>
        <Etymology etymology={etymology} />
        <View style={styles.splitWidget}>
          <Synonyms synonyms={synonyms} />
          <Antonyms antonyms={antonyms} />
        </View>
        <RelatedWords relatedWords={relatedWords} />
        <Translations translations={translations} />
      </View> */}
    </View>
  );
}

export function HorizontalWordFeed({
  date,
  setDate,
}: {
  date: Date;
  setDate: (d: Date) => void;
}) {
  const [data, setData] = useState<[Word, Date][] | null>(null);
  useEffect(() => {
    setDate(new Date());
    setData([]);
  }, [date, setDate]);

  if (!data) {
    return null;
  }

  return <View></View>;
}

const GRAY_200 = "#e5e7eb";
const GRAY_900 = "#111827"; // Almost black - ideal for headings
const GRAY_800 = "#1F2937"; // Strong body text
// const GRAY_700 = "#374151"; // Balanced body or subtitles
// const GRAY_600 = "#4B5563"; // Secondary text
// const GRAY_500 = "#6B7280"; // Muted/tertiary text
// const GRAY_400 = "#9CA3AF"; // Subtle
// const GRAY_300 = "#D1D5DB"; // Very subtle (e.g., placeholders)

// const SHADOW = "rgba(0, 0, 0, 0.05)";

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "white",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  },
  widget: {
    // border: `1px solid ${GRAY_200}`,
    // padding: 8,
    // borderRadius: 8,
    gap: 4,
    marginBottom: 24,
    // boxShadow: `0 0 8px ${SHADOW}`,
  },
  title: {
    fontWeight: 600,
    marginVertical: 4,
    fontFamily: "BaskervvilleSC",
    color: GRAY_900,
    textAlign: "center",
    fontSize: 16,
  },
  lexeme: {
    textAlign: "center",
    marginVertical: 32,
    fontSize: 32,
    fontFamily: "Baskervville",
    color: GRAY_800,
  },
  divider: {
    width: "80%",
    height: 1,
    borderRadius: 999,
    backgroundColor: GRAY_200,
    marginTop: 32,
    marginBottom: 32,
    marginLeft: "auto",
    marginRight: "auto",
  },
  definition: {
    fontFamily: "Urbanist",
    textAlign: "justify",
  },
  example: {
    fontFamily: "UrbanistItalic",
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    padding: 2,
    fontSize: 13,
    maxWidth: 400,
    marginHorizontal: "auto",
    marginTop: 12,
    textAlign: "center",
  },
  splitWidget: { flexDirection: "row", flexGrow: 1, width: "100%", gap: 12 },
  text: {
    fontFamily: "Urbanist",
    color: GRAY_800,
  },
  text_mono: {
    fontFamily: "BaskervvilleSC",
  },
});
