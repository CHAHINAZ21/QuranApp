const surahs = [
  {
    "number": 1,
    "nameEnglish": "Al-Faatiha",
    "nameArabic": "ٱلفاتحة",
    "type": "MECCAN",
    "verses": 7
  },
  {
    "number": 2,
    "nameEnglish": "Al-Baqara",
    "nameArabic": "البقرة",
    "type": "MEDINAN",
    "verses": 286
  },
  {
    "number": 3,
    "nameEnglish": "Aal-i-Imraan",
    "nameArabic": "آل عمۡران",
    "type": "MEDINAN",
    "verses": 200
  },
  {
    "number": 4,
    "nameEnglish": "An-Nisaa",
    "nameArabic": "النساء",
    "type": "MEDINAN",
    "verses": 176
  },
  {
    "number": 5,
    "nameEnglish": "Al-Maaida",
    "nameArabic": "المائـدة",
    "type": "MEDINAN",
    "verses": 120
  },
  {
    "number": 6,
    "nameEnglish": "Al-An'aam",
    "nameArabic": "الأنۡعام",
    "type": "MECCAN",
    "verses": 165
  },
  {
    "number": 7,
    "nameEnglish": "Al-A'raaf",
    "nameArabic": "الأعۡراف",
    "type": "MECCAN",
    "verses": 206
  },
  {
    "number": 8,
    "nameEnglish": "Al-Anfaal",
    "nameArabic": "الأنفال",
    "type": "MEDINAN",
    "verses": 75
  },
  {
    "number": 9,
    "nameEnglish": "At-Tawba",
    "nameArabic": "التوۡبة",
    "type": "MEDINAN",
    "verses": 129
  },
  {
    "number": 10,
    "nameEnglish": "Yunus",
    "nameArabic": "يونس",
    "type": "MECCAN",
    "verses": 109
  },
  {
    "number": 11,
    "nameEnglish": "Hud",
    "nameArabic": "هود",
    "type": "MECCAN",
    "verses": 123
  },
  {
    "number": 12,
    "nameEnglish": "Yusuf",
    "nameArabic": "يوسف",
    "type": "MECCAN",
    "verses": 111
  },
  {
    "number": 13,
    "nameEnglish": "Ar-Ra'd",
    "nameArabic": "الرعۡد",
    "type": "MEDINAN",
    "verses": 43
  },
  {
    "number": 14,
    "nameEnglish": "Ibrahim",
    "nameArabic": "إبۡراهيم",
    "type": "MECCAN",
    "verses": 52
  },
  {
    "number": 15,
    "nameEnglish": "Al-Hijr",
    "nameArabic": "الحجۡر",
    "type": "MECCAN",
    "verses": 99
  },
  {
    "number": 16,
    "nameEnglish": "An-Nahl",
    "nameArabic": "النحۡل",
    "type": "MECCAN",
    "verses": 128
  },
  {
    "number": 17,
    "nameEnglish": "Al-Israa",
    "nameArabic": "الإسۡراء",
    "type": "MECCAN",
    "verses": 111
  },
  {
    "number": 18,
    "nameEnglish": "Al-Kahf",
    "nameArabic": "الكهۡف",
    "type": "MECCAN",
    "verses": 110
  },
  {
    "number": 19,
    "nameEnglish": "Maryam",
    "nameArabic": "مرۡيم",
    "type": "MECCAN",
    "verses": 98
  },
  {
    "number": 20,
    "nameEnglish": "Taa-Haa",
    "nameArabic": "طه",
    "type": "MECCAN",
    "verses": 135
  },
  {
    "number": 21,
    "nameEnglish": "Al-Anbiyaa",
    "nameArabic": "الأنبياء",
    "type": "MECCAN",
    "verses": 112
  },
  {
    "number": 22,
    "nameEnglish": "Al-Hajj",
    "nameArabic": "الحج",
    "type": "MEDINAN",
    "verses": 78
  },
  {
    "number": 23,
    "nameEnglish": "Al-Muminoon",
    "nameArabic": "المؤۡمنون",
    "type": "MECCAN",
    "verses": 118
  },
  {
    "number": 24,
    "nameEnglish": "An-Noor",
    "nameArabic": "النور",
    "type": "MEDINAN",
    "verses": 64
  },
  {
    "number": 25,
    "nameEnglish": "Al-Furqaan",
    "nameArabic": "الفرۡقان",
    "type": "MECCAN",
    "verses": 77
  },
  {
    "number": 26,
    "nameEnglish": "Ash-Shu'araa",
    "nameArabic": "الشعراء",
    "type": "MECCAN",
    "verses": 227
  },
  {
    "number": 27,
    "nameEnglish": "An-Naml",
    "nameArabic": "النمۡل",
    "type": "MECCAN",
    "verses": 93
  },
  {
    "number": 28,
    "nameEnglish": "Al-Qasas",
    "nameArabic": "القصص",
    "type": "MECCAN",
    "verses": 88
  },
  {
    "number": 29,
    "nameEnglish": "Al-Ankaboot",
    "nameArabic": "العنكبوت",
    "type": "MECCAN",
    "verses": 69
  },
  {
    "number": 30,
    "nameEnglish": "Ar-Room",
    "nameArabic": "الروم",
    "type": "MECCAN",
    "verses": 60
  },
  {
    "number": 31,
    "nameEnglish": "Luqman",
    "nameArabic": "لقۡمان",
    "type": "MECCAN",
    "verses": 34
  },
  {
    "number": 32,
    "nameEnglish": "As-Sajda",
    "nameArabic": "السجۡدة",
    "type": "MECCAN",
    "verses": 30
  },
  {
    "number": 33,
    "nameEnglish": "Al-Ahzaab",
    "nameArabic": "الأحۡزاب",
    "type": "MEDINAN",
    "verses": 73
  },
  {
    "number": 34,
    "nameEnglish": "Saba",
    "nameArabic": "سبإ",
    "type": "MECCAN",
    "verses": 54
  },
  {
    "number": 35,
    "nameEnglish": "Faatir",
    "nameArabic": "فاطر",
    "type": "MECCAN",
    "verses": 45
  },
  {
    "number": 36,
    "nameEnglish": "Yaseen",
    "nameArabic": "يسٓ",
    "type": "MECCAN",
    "verses": 83
  },
  {
    "number": 37,
    "nameEnglish": "As-Saaffaat",
    "nameArabic": "الصافات",
    "type": "MECCAN",
    "verses": 182
  },
  {
    "number": 38,
    "nameEnglish": "Saad",
    "nameArabic": "صٓ",
    "type": "MECCAN",
    "verses": 88
  },
  {
    "number": 39,
    "nameEnglish": "Az-Zumar",
    "nameArabic": "الزمر",
    "type": "MECCAN",
    "verses": 75
  },
  {
    "number": 40,
    "nameEnglish": "Ghafir",
    "nameArabic": "غافر",
    "type": "MECCAN",
    "verses": 85
  },
  {
    "number": 41,
    "nameEnglish": "Fussilat",
    "nameArabic": "فصلتۡ",
    "type": "MECCAN",
    "verses": 54
  },
  {
    "number": 42,
    "nameEnglish": "Ash-Shura",
    "nameArabic": "الشورىٰ",
    "type": "MECCAN",
    "verses": 53
  },
  {
    "number": 43,
    "nameEnglish": "Az-Zukhruf",
    "nameArabic": "الزخۡرف",
    "type": "MECCAN",
    "verses": 89
  },
  {
    "number": 44,
    "nameEnglish": "Ad-Dukhaan",
    "nameArabic": "الدخان",
    "type": "MECCAN",
    "verses": 59
  },
  {
    "number": 45,
    "nameEnglish": "Al-Jaathiya",
    "nameArabic": "الجاثية",
    "type": "MECCAN",
    "verses": 37
  },
  {
    "number": 46,
    "nameEnglish": "Al-Ahqaf",
    "nameArabic": "الأحۡقاف",
    "type": "MECCAN",
    "verses": 35
  },
  {
    "number": 47,
    "nameEnglish": "Muhammad",
    "nameArabic": "محمد",
    "type": "MEDINAN",
    "verses": 38
  },
  {
    "number": 48,
    "nameEnglish": "Al-Fath",
    "nameArabic": "الفتۡح",
    "type": "MEDINAN",
    "verses": 29
  },
  {
    "number": 49,
    "nameEnglish": "Al-Hujuraat",
    "nameArabic": "الحجرات",
    "type": "MEDINAN",
    "verses": 18
  },
  {
    "number": 50,
    "nameEnglish": "Qaaf",
    "nameArabic": "قٓ",
    "type": "MECCAN",
    "verses": 45
  },
  {
    "number": 51,
    "nameEnglish": "Adh-Dhaariyat",
    "nameArabic": "الذاريات",
    "type": "MECCAN",
    "verses": 60
  },
  {
    "number": 52,
    "nameEnglish": "At-Tur",
    "nameArabic": "الطور",
    "type": "MECCAN",
    "verses": 49
  },
  {
    "number": 53,
    "nameEnglish": "An-Najm",
    "nameArabic": "النجۡم",
    "type": "MECCAN",
    "verses": 62
  },
  {
    "number": 54,
    "nameEnglish": "Al-Qamar",
    "nameArabic": "القمر",
    "type": "MECCAN",
    "verses": 55
  },
  {
    "number": 55,
    "nameEnglish": "Ar-Rahmaan",
    "nameArabic": "الرحۡمٰن",
    "type": "MEDINAN",
    "verses": 78
  },
  {
    "number": 56,
    "nameEnglish": "Al-Waaqia",
    "nameArabic": "الواقعة",
    "type": "MECCAN",
    "verses": 96
  },
  {
    "number": 57,
    "nameEnglish": "Al-Hadid",
    "nameArabic": "الحديد",
    "type": "MEDINAN",
    "verses": 29
  },
  {
    "number": 58,
    "nameEnglish": "Al-Mujaadila",
    "nameArabic": "المجادلة",
    "type": "MEDINAN",
    "verses": 22
  },
  {
    "number": 59,
    "nameEnglish": "Al-Hashr",
    "nameArabic": "الحشۡر",
    "type": "MEDINAN",
    "verses": 24
  },
  {
    "number": 60,
    "nameEnglish": "Al-Mumtahana",
    "nameArabic": "الممۡتحنة",
    "type": "MEDINAN",
    "verses": 13
  },
  {
    "number": 61,
    "nameEnglish": "As-Saff",
    "nameArabic": "الصف",
    "type": "MEDINAN",
    "verses": 14
  },
  {
    "number": 62,
    "nameEnglish": "Al-Jumu'a",
    "nameArabic": "الجمعة",
    "type": "MEDINAN",
    "verses": 11
  },
  {
    "number": 63,
    "nameEnglish": "Al-Munaafiqoon",
    "nameArabic": "المنافقون",
    "type": "MEDINAN",
    "verses": 11
  },
  {
    "number": 64,
    "nameEnglish": "At-Taghaabun",
    "nameArabic": "التغابن",
    "type": "MEDINAN",
    "verses": 18
  },
  {
    "number": 65,
    "nameEnglish": "At-Talaaq",
    "nameArabic": "الطلاق",
    "type": "MEDINAN",
    "verses": 12
  },
  {
    "number": 66,
    "nameEnglish": "At-Tahrim",
    "nameArabic": "التحۡريم",
    "type": "MEDINAN",
    "verses": 12
  },
  {
    "number": 67,
    "nameEnglish": "Al-Mulk",
    "nameArabic": "الملۡك",
    "type": "MECCAN",
    "verses": 30
  },
  {
    "number": 68,
    "nameEnglish": "Al-Qalam",
    "nameArabic": "القلم",
    "type": "MECCAN",
    "verses": 52
  },
  {
    "number": 69,
    "nameEnglish": "Al-Haaqqa",
    "nameArabic": "الحاقة",
    "type": "MECCAN",
    "verses": 52
  },
  {
    "number": 70,
    "nameEnglish": "Al-Ma'aarij",
    "nameArabic": "المعارج",
    "type": "MECCAN",
    "verses": 44
  },
  {
    "number": 71,
    "nameEnglish": "Nooh",
    "nameArabic": "نوح",
    "type": "MECCAN",
    "verses": 28
  },
  {
    "number": 72,
    "nameEnglish": "Al-Jinn",
    "nameArabic": "الجن",
    "type": "MECCAN",
    "verses": 28
  },
  {
    "number": 73,
    "nameEnglish": "Al-Muzzammil",
    "nameArabic": "المزمل",
    "type": "MECCAN",
    "verses": 20
  },
  {
    "number": 74,
    "nameEnglish": "Al-Muddaththir",
    "nameArabic": "المدثر",
    "type": "MECCAN",
    "verses": 56
  },
  {
    "number": 75,
    "nameEnglish": "Al-Qiyaama",
    "nameArabic": "القيامة",
    "type": "MECCAN",
    "verses": 40
  },
  {
    "number": 76,
    "nameEnglish": "Al-Insaan",
    "nameArabic": "الإنسان",
    "type": "MEDINAN",
    "verses": 31
  },
  {
    "number": 77,
    "nameEnglish": "Al-Mursalaat",
    "nameArabic": "المرۡسلات",
    "type": "MECCAN",
    "verses": 50
  },
  {
    "number": 78,
    "nameEnglish": "An-Naba",
    "nameArabic": "النبإ",
    "type": "MECCAN",
    "verses": 40
  },
  {
    "number": 79,
    "nameEnglish": "An-Naazi'aat",
    "nameArabic": "النازعات",
    "type": "MECCAN",
    "verses": 46
  },
  {
    "number": 80,
    "nameEnglish": "Abasa",
    "nameArabic": "عبس",
    "type": "MECCAN",
    "verses": 42
  },
  {
    "number": 81,
    "nameEnglish": "At-Takwir",
    "nameArabic": "التكۡوير",
    "type": "MECCAN",
    "verses": 29
  },
  {
    "number": 82,
    "nameEnglish": "Al-Infitaar",
    "nameArabic": "الانفطار",
    "type": "MECCAN",
    "verses": 19
  },
  {
    "number": 83,
    "nameEnglish": "Al-Mutaffifin",
    "nameArabic": "المطففين",
    "type": "MECCAN",
    "verses": 36
  },
  {
    "number": 84,
    "nameEnglish": "Al-Inshiqaaq",
    "nameArabic": "الانشقاق",
    "type": "MECCAN",
    "verses": 25
  },
  {
    "number": 85,
    "nameEnglish": "Al-Burooj",
    "nameArabic": "البروج",
    "type": "MECCAN",
    "verses": 22
  },
  {
    "number": 86,
    "nameEnglish": "At-Taariq",
    "nameArabic": "الطارق",
    "type": "MECCAN",
    "verses": 17
  },
  {
    "number": 87,
    "nameEnglish": "Al-A'laa",
    "nameArabic": "الأعۡلىٰ",
    "type": "MECCAN",
    "verses": 19
  },
  {
    "number": 88,
    "nameEnglish": "Al-Ghaashiya",
    "nameArabic": "الغاشية",
    "type": "MECCAN",
    "verses": 26
  },
  {
    "number": 89,
    "nameEnglish": "Al-Fajr",
    "nameArabic": "الفجۡر",
    "type": "MECCAN",
    "verses": 30
  },
  {
    "number": 90,
    "nameEnglish": "Al-Balad",
    "nameArabic": "البلد",
    "type": "MECCAN",
    "verses": 20
  },
  {
    "number": 91,
    "nameEnglish": "Ash-Shams",
    "nameArabic": "الشمۡس",
    "type": "MECCAN",
    "verses": 15
  },
  {
    "number": 92,
    "nameEnglish": "Al-Lail",
    "nameArabic": "الليۡل",
    "type": "MECCAN",
    "verses": 21
  },
  {
    "number": 93,
    "nameEnglish": "Ad-Dhuhaa",
    "nameArabic": "الضحىٰ",
    "type": "MECCAN",
    "verses": 11
  },
  {
    "number": 94,
    "nameEnglish": "Ash-Sharh",
    "nameArabic": "الشرۡح",
    "type": "MECCAN",
    "verses": 8
  },
  {
    "number": 95,
    "nameEnglish": "At-Tin",
    "nameArabic": "التين",
    "type": "MECCAN",
    "verses": 8
  },
  {
    "number": 96,
    "nameEnglish": "Al-Alaq",
    "nameArabic": "العلق",
    "type": "MECCAN",
    "verses": 19
  },
  {
    "number": 97,
    "nameEnglish": "Al-Qadr",
    "nameArabic": "القدۡر",
    "type": "MECCAN",
    "verses": 5
  },
  {
    "number": 98,
    "nameEnglish": "Al-Bayyina",
    "nameArabic": "البينة",
    "type": "MEDINAN",
    "verses": 8
  },
  {
    "number": 99,
    "nameEnglish": "Az-Zalzala",
    "nameArabic": "الزلۡزلة",
    "type": "MEDINAN",
    "verses": 8
  },
  {
    "number": 100,
    "nameEnglish": "Al-Aadiyaat",
    "nameArabic": "العاديات",
    "type": "MECCAN",
    "verses": 11
  },
  {
    "number": 101,
    "nameEnglish": "Al-Qaari'a",
    "nameArabic": "القارعة",
    "type": "MECCAN",
    "verses": 11
  },
  {
    "number": 102,
    "nameEnglish": "At-Takaathur",
    "nameArabic": "التكاثر",
    "type": "MECCAN",
    "verses": 8
  },
  {
    "number": 103,
    "nameEnglish": "Al-Asr",
    "nameArabic": "العصۡر",
    "type": "MECCAN",
    "verses": 3
  },
  {
    "number": 104,
    "nameEnglish": "Al-Humaza",
    "nameArabic": "الهمزة",
    "type": "MECCAN",
    "verses": 9
  },
  {
    "number": 105,
    "nameEnglish": "Al-Fil",
    "nameArabic": "الفيل",
    "type": "MECCAN",
    "verses": 5
  },
  {
    "number": 106,
    "nameEnglish": "Quraish",
    "nameArabic": "قريۡش",
    "type": "MECCAN",
    "verses": 4
  },
  {
    "number": 107,
    "nameEnglish": "Al-Maa'un",
    "nameArabic": "الماعون",
    "type": "MECCAN",
    "verses": 7
  },
  {
    "number": 108,
    "nameEnglish": "Al-Kawthar",
    "nameArabic": "الكوۡثر",
    "type": "MECCAN",
    "verses": 3
  },
  {
    "number": 109,
    "nameEnglish": "Al-Kaafiroon",
    "nameArabic": "الكافرون",
    "type": "MECCAN",
    "verses": 6
  },
  {
    "number": 110,
    "nameEnglish": "An-Nasr",
    "nameArabic": "النصۡر",
    "type": "MEDINAN",
    "verses": 3
  },
  {
    "number": 111,
    "nameEnglish": "Al-Masad",
    "nameArabic": "المسد",
    "type": "MECCAN",
    "verses": 5
  },
  {
    "number": 112,
    "nameEnglish": "Al-Ikhlaas",
    "nameArabic": "الإخۡلاص",
    "type": "MECCAN",
    "verses": 4
  },
  {
    "number": 113,
    "nameEnglish": "Al-Falaq",
    "nameArabic": "الفلق",
    "type": "MECCAN",
    "verses": 5
  },
  {
    "number": 114,
    "nameEnglish": "An-Naas",
    "nameArabic": "الناس",
    "type": "MECCAN",
    "verses": 6
  }
];

export default surahs;
