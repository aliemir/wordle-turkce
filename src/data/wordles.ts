const Wordles = [
  { madde: "eşarp", anlam: "Başörtüsü" },
  { madde: "şahsi", anlam: "Kişisel" },
  { madde: "bahar", anlam: "İlkbahar" },
  { madde: "yaylı", anlam: "Yayı olan" },
  { madde: "kolaj", anlam: "Kesyap" },
  {
    madde: "çerez",
    anlam: "Asıl yemekten sayılmayan, peynir, zeytin vb. yiyecekler",
  },
  { madde: "övünç", anlam: "Övünme" },
  {
    madde: "topik",
    anlam: "Tahin, nohut, patates ve soğanla yapılan meze",
  },
  { madde: "öteki", anlam: "Diğeri, öbürü" },
  { madde: "simya", anlam: "Alşimi" },
  { madde: "sefir", anlam: "Elçi" },
  { madde: "ayvaz", anlam: "Koca, erkek, eş" },
  {
    madde: "coşku",
    anlam:
      "Genellikle büyük bir istekle ortaya çıkan geçici hayranlık veya heyecan durumu",
  },
  {
    madde: "albay",
    anlam:
      "Rütbesi yarbay ile tuğgeneral arasında bulunan ve asıl görevi alay komutanlığı olan üstsubay, miralay",
  },
  {
    madde: "zorba",
    anlam:
      "Gücüne güvenerek hükmü altında bulunanlara söz hakkı ve davranış özgürlüğü tanımayan (kimse), müstebit, mütegallibe, despot, diktatör",
  },
  {
    madde: "değer",
    anlam:
      "Bir şeyin önemini belirlemeye yarayan soyut ölçü, bir şeyin değdiği karşılık, kıymet",
  },
  {
    madde: "kovan",
    anlam: "Fişeğin kapsül, barut ve kurşun taşıyan yuva bölümü, kapçık",
  },
  {
    madde: "türlü",
    anlam: "Çok çeşitli özellikleri olan, çeşit çeşit, muhtelif",
  },
  { madde: "çomak", anlam: "Ucu topuzlu değnek" },
  { madde: "beste", anlam: "Bir müzik eserini oluşturan ezgilerin bütünü" },
  {
    madde: "kışla",
    anlam: "Askerlerin toplu olarak barındıkları yapılar bütünü",
  },
  { madde: "delik", anlam: "Dar, küçük açıklık" },
  {
    madde: "alaza",
    anlam: "Dökülen tohumlarla ertesi yıl kendiliğinden çıkan tahıl, soğan vb",
  },
  { madde: "tumba", anlam: "Altüst etme, altüst olma" },
  {
    madde: "mezra",
    anlam: "Ekime elverişli, ekilecek tarla veya yer, ekenek",
  },
  {
    madde: "yorum",
    anlam:
      "Bir yazının veya bir sözün, anlaşılması güç yönlerini açıklayarak aydınlığa kavuşturma, tefsir",
  },
  { madde: "hasım", anlam: "Düşman, yağı" },
  { madde: "nesih", anlam: "Kaldırma, hükümsüz bırakma" },
  { madde: "zigon", anlam: "İç içe geçen sehpa, zigon sehpa" },
  {
    madde: "işlev",
    anlam:
      "Bir nesne veya bir kimsenin gördüğü iş, iş görme yetisi, görev, fonksiyon",
  },
  {
    madde: "balon",
    anlam:
      "Isıtılmış hava veya havadan daha hafif bir gazla doldurulan, atmosferde uçabilen, küre biçiminde araç",
  },
  { madde: "çorak", anlam: "Verimli olmayan (toprak)" },
  {
    madde: "rulet",
    anlam:
      "Bir bilyenin, dönmekte bulunan derin tepside yazılı numaralarından ve siyah ile kırmızı renklerden birinin üzerinde durmasıyla kazananı belirten kumar aracı ve bununla oynanan kumar",
  },
  {
    madde: "güreş",
    anlam:
      "Belli kurallar içinde, güç kullanarak iki kişinin türlü oyunlarla birbirinin sırtını yere getirmeye çalışması",
  },
  { madde: "torul", anlam: "Gümüşhane iline bağlı ilçelerden biri" },
  { madde: "samsa", anlam: "Baklavaya benzeyen bir tür hamur tatlısı" },
  {
    madde: "hamla",
    anlam: "Küreklerin bir kez suya daldırılıp çıkarılması",
  },
  {
    madde: "maden",
    anlam:
      "Yer kabuğunun bazı bölgelerinde çeşitli iç ve dış doğal etkenlerle oluşan, ekonomik yönden değer taşıyan mineral",
  },
  {
    madde: "doğan",
    anlam:
      "Kartalgillerden, sırtı kül rengi ve enine çizgili, küçük kuş, fare vb. ile beslenen ve alıştırılarak kuş avında kullanılan yırtıcı bir kuş (Falco peregrinus)",
  },
  { madde: "araka", anlam: "İri taneli bezelye" },
  { madde: "moruk", anlam: "Gençlere göre yaşlı anne, baba" },
  {
    madde: "şehir",
    anlam:
      "Nüfusunun çoğu ticaret, sanayi, hizmet veya yönetimle ilgili işlerle uğraşan, genellikle tarımsal etkinliklerin olmadığı yerleşim alanı, kent, site",
  },
  {
    madde: "tanrı",
    anlam:
      "Çok tanrıcılıkta var olduğuna inanılan insanüstü varlıklardan her biri, ilah",
  },
  {
    madde: "armut",
    anlam:
      "Gülgillerden, çiçekleri beyaz, Türkiye'nin her yerinde yetişen bir ağaç (Pirus communis)",
  },
  { madde: "tamam", anlam: "Bütün, tüm" },
  {
    madde: "katık",
    anlam:
      "Ekmekle karın doyurmak gerektiğinde, ekmeğe katılan peynir, zeytin, helva vb. yiyecek",
  },
  { madde: "tırıs", anlam: "Atın kısa adımlarla hızlı yürüyüşü" },
  {
    madde: "varil",
    anlam:
      "Çoğunlukla sıvı maddeleri koymak için kullanılan, metalden yapılmış, silindir biçiminde, üstü kapalı kap",
  },
  {
    madde: "forsa",
    anlam: "Gemilerde kürek çeken tutsak veya hükümlü kimse",
  },
  {
    madde: "peron",
    anlam:
      "Otobüs terminallerinde aracın yanaştığı, yolcuların inip binmesine yarayan bölüm",
  },
  {
    madde: "pençe",
    anlam: "Yırtıcı hayvanların ön ayaklarının parmaklarıyla tırnakları",
  },
  { madde: "sürüm", anlam: "Bir ticaret malının satılır olması, revaç" },
  {
    madde: "tarla",
    anlam: "Tarıma elverişli olan, sınırlı ve belirli toprak parçası",
  },
  {
    madde: "takke",
    anlam:
      "İnce kumaştan dikilmiş veya ipten örülmüş, çoğunlukla yarım küre biçiminde başlık",
  },
  { madde: "zaten", anlam: "Doğrusu, doğrusunu isterseniz, esasen, zati" },
  {
    madde: "sonuç",
    anlam: "Bir olayın doğurduğu başka bir olay veya durum, netice",
  },
  {
    madde: "komşu",
    anlam: "Konutları yakın olan kimselerin birbirine göre aldıkları ad",
  },
  { madde: "camia", anlam: "Topluluk, zümre" },
  {
    madde: "elips",
    anlam:
      "Bütün noktalarının belirli iki ayrı noktaya olan uzaklıklarının toplamı birbirine denk olan kapalı eğri",
  },
  { madde: "hesap", anlam: "Aritmetik" },
  {
    madde: "aleni",
    anlam: "Açık, ortada, meydanda, herkesin içinde yapılan",
  },
  {
    madde: "anten",
    anlam:
      "Boşlukta yayılan elektromanyetik dalgaları toplayarak bu dalgaların transmisyon hatları içerisinde yayılmasını sağlayan cihaz",
  },
  { madde: "endam", anlam: "Vücut, beden, boy bos" },
  {
    madde: "paket",
    anlam:
      "İçinde bir veya birçok şey bulunan, kâğıda sarılarak veya kutuya konularak bağlanmış, elde taşınacak büyüklükte nesne",
  },
  { madde: "bünye", anlam: "Vücut yapısı" },
  { madde: "havza", anlam: "Bölge, mıntıka" },
  { madde: "çatal", anlam: "İki veya daha çok kola ayrılan değnek" },
  { madde: "maden", anlam: "Elâzığ iline bağlı ilçelerden biri" },
  { madde: "eksik", anlam: "Bir bölümü olmayan, noksan, natamam" },
  { madde: "ibrik", anlam: "Su koymaya yarayan kulplu, emzikli kap" },
  {
    madde: "şaman",
    anlam:
      "Şamanlıkta büyü yapan, gelecekten haber verdiğine, ruhlarla ilişki kurarak hastalıkları iyileştirdiğine inanılan kimse, kam",
  },
  {
    madde: "köken",
    anlam: "Bir şeyin çıktığı, dayandığı temel, biçim, neden veya yer, menşe",
  },
  {
    madde: "üzgün",
    anlam: "Üzülmüş, üzüntü duymuş, mahzun, melul, meyus, mükedder",
  },
  {
    madde: "ölçüt",
    anlam:
      "Bir yargıya varmak veya değer vermek için başvurulan ilke, kıstas, mısdak, kriter",
  },
  { madde: "çatma", anlam: "Çatmak işi" },
  {
    madde: "fulya",
    anlam:
      "Nergisgillerden, soğan köklü bir bitki, zerrin (Narcissus jonquilla)",
  },
  { madde: "lazım", anlam: "Gerek, gerekli" },
  { madde: "bizce", anlam: "Bize göre, bizim düşüncemizce" },
  {
    madde: "küskü",
    anlam:
      "Taşa veya duvara delik açmak için kullanılan uzun, ağır ve bir ucu sivri demir",
  },
  { madde: "rejim", anlam: "Yönetme, düzenleme biçimi, düzen" },
  {
    madde: "sakal",
    anlam: "Yetişkin erkeklerde yanak ve alt çenede çıkan kılların tümü",
  },
  {
    madde: "kabız",
    anlam:
      "Dışkılama sıklığının azalması veya zor ve ağrılı dışkılama, peklik, kabızlık, ishal karşıtı",
  },
  {
    madde: "heybe",
    anlam:
      "At, eşek vb. binek hayvanlarının eyeri üzerine geçirilen veya omuzda taşınan, içine öteberi koymaya yarayan, kilim veya halıdan yapılmış iki gözlü torba",
  },
  {
    madde: "totem",
    anlam:
      "İlkel toplumlarda topluluğun ondan türediği sanılan ve kutsal sayılan hayvan, ağaç, rüzgâr vb. herhangi bir doğal nesne, ongun(II)",
  },
];

export default Wordles;
