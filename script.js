const displayMap = {
    // 種族對照
    'miqote': '貓魅族',
    'aura': '敖龍族',
    'viera': '維埃拉族',
    'elezen': '精靈族',
    'hyur': '人族',
};

/**
 * ============================================================
 * 👑 NOCTIS - 旗艦版全域腳本 (Ver 3.0)
 * ============================================================
 */

// --- 1. 全域資料庫 ---
const staffDatabase = [
    { 
        id: 'inu', category: 'manager', image: 'Image/1.png', serviceType: 'midnight', name: 'Inu',
        race: 'miqote', height: '165cm', tags: ['可愛', '色氣', '腹黑', '傲嬌'],
        motto: '「NOCTIS 的夜晚，由我為您守護。」',
        story: ' 關於店長 Inu 的長篇背景故事...寫在這裡就不會重覆了。',
        rpStyle: '鏡像 / 輕 / 中', sexualPref: 'MALE', rolePref: 'Bottom / Submissive', filterRoles: ['BOTTOM'],
        kinks: '親吻，Spanking，項圈，言語羞辱', limits: '血腥、排泄物'
    },
    { id: 'enki', category: 'support', name: '恩奇', role: 'RECEPTIONIST/ 接待員', image: 'Image/1.png' },
    { id: 'eating', category: 'support', name: 'E', role: 'RECEPTIONIST/ 接待員', image: 'Image/1.png' },
    { id: 'laio', category: 'support', name: '燎', role: 'BARTENDER / 調酒師', image: 'Image/1.png' },
    { id: 'miko', category: 'support', name: '咪子', role: 'BARTENDER / 調酒師', image: 'Image/1.png' },
    { id: 'jian', category: 'support', name: '蒔健', role: 'DEALER / 荷官', image: 'Image/1.png' },
    // --- 公關陣容 (Host) ---
    { 
        id: 'aly', category: 'host', image: 'Image/1.png', serviceType: 'standard', name: '艾里',
        race: 'miqote', height: '160cm', tags: ['溫柔', '紳士', '神秘'],
        motto: '「每一次心意相通的瞬間都是如此珍貴，<br>我無法將其當作偶然而視而不見。」',
        story: ' 雲遊四海的吟遊詩人，流連於不同男人的溫柔鄉之中。\n\n廣大的心胸如星海一般遼闊，是爲每一位戀人都能擁有一顆專屬的星星。 \n\n透過將每一段緣份寫成詩歌以獲得更強大的力量，並將每一個令人銘記的瞬間永恆的傳唱下去。 \n\n像風一樣隨遇而安、也像風一樣無法被抓住，沒有真正的屬於誰、卻也可以同時屬於任何人，是女士最可靠的情感支柱、是男士心頭上的一點硃砂痣。 \n\n對貓魅族男性有著不可抗拒的迷戀，對其他種族男性則是友善的喜愛。 \n\n為了能夠再次踏上旅行而來到NOCTIS打工，聽聞店長是貓男又更不想離開了。 \n\n討厭任何不紳士的行為，路見不平會拔弓嚴逞。',
        rpStyle: '鏡像', sexualPref: 'Male', rolePref: 'Top', filterRoles: ['TOP'],
        kinks: 'N/A', limits: '全裸、排泄、非人、血腥暴力、言詞羞辱'
    },
    { 
        id: 'andda', category: 'host', image: 'Image/1.png', serviceType: 'midnight', name: '安怛',
        race: 'aura', height: '217cm', tags: ['隨心所欲', '色氣', '慵懶'],
        motto: '「甜心，你願意和我一起做夢嗎？」', rpStyle: '鏡像', sexualPref: 'Any', rolePref: 'Top', filterRoles: ['TOP'],
        story: '很小便離開了家鄉和部族，跟著父親輾轉流浪各地。 \n\n和父親旅行至烏爾達哈，落腳當地的旅店，由於某種原因選擇留在當地的鬥技場，以舞劍術維生，過著放蕩且縱慾的日子。 \n\n在龍蛇混雜的環境裡因為抽過太多奇奇怪怪的東西，有時候會流鼻血。 ',
        kinks: '體格差、牙印、寫字、口球、瀕死', limits: '排泄物'
    },
    { 
        id: 'baichai', category: 'host', image: 'Image/1.png', serviceType: 'midnight', name: '白柴小狗狗',
        race: 'miqote', height: '173cm', tags: ['溫柔', '強勢', '色氣'],
        motto: '「與其死在戰鬥，不如讓我死在你懷裡。」', rpStyle: '中', sexualPref: 'Any', rolePref: 'Switch, Submissive', filterRoles: ['SWITCH'],
        story: '離開部族後輾轉來到水晶都，本以為只是暫時停留，卻在夜晚被這座城市徹底吞沒。\n\n光影變成情緒的延伸；音樂低頻在地面與身體之間來回震盪，像是某種被放大的心跳。他第一次踏入酒館時，站在邊緣觀察人群笑聲、靠近、試探與退開，在節奏裡反覆交錯。\n\n他很快察覺到自己對這些變化異常敏銳，甚至能預判情緒的流動，在哪個瞬間有人會轉身、誰會在音樂高點失去防備。 \n\n久而久之，他不再只是觀察者，而開始介入那股流動之中。站在燈影與人群之間，用距離、眼神與節奏細微地改變氛圍，讓空氣變得更慢，或更危險；讓某些人靠近，也讓某些人無法離開。\n\n他不屬於任何固定位置，卻總在關鍵時刻出現，像一段無法被抓住的旋律。對他而言，這不只是享樂，而是一種確認自我存在的方式，在混亂與曖昧之中，他終於找到了屬於自己的節拍。 ',
        kinks: '項圈、窒息、受控制', limits: '血腥、污穢、過度貶低'
    },
    { 
        id: 'cyan', category: 'host', image: 'Image/1.png', serviceType: 'standard', name: '賽安',
        race: 'miqote', height: '174cm', tags: ['中立', '溫順', '隱性佔有慾'],
        motto: '「你希望我怎麼對你，我就會怎麼對你。」', rpStyle: '鏡像', sexualPref: 'Any', rolePref: 'Switch', filterRoles: ['SWITCH'],
        story: '被遺棄於薩納蘭沙漠的貓魅族幼子，自幼由拉拉菲爾遊牧商隊收養長大。\n\n由於養母投資失利背負高額債務，為了減輕家裡負擔，他年少便在大城市各處工作，熟悉金錢與權勢運作的規則。 \n\n他明白想改變命運必須握住資源，夜店對他而言是一條更快累積資本與人脈的道路。',
        kinks: 'Softcore、寸止、Spanking、權利關係', limits: ' R18G、未成年、蕩婦羞辱、非合意劇情、拉拉菲爾族、魯加族'
    },
    { 
        id: 'esmee', category: 'host', image: 'Image/1.png', serviceType: 'standard', name: '斯咪',
        race: 'miqote', height: '159.2cm', tags: ['小惡魔', '悠哉', '求知慾'],
        motto: '「真沒辦法，像你這樣弱～弱的人，就讓我來服務吧♥」', rpStyle: '鏡像', sexualPref: 'Any', rolePref: 'Bottom, Submissive', filterRoles: ['BOTTOM'],
        story: '來自格里達尼亞邊境的某個小聚落，性格其實不壞，因為聚落裡的長者與主事人都是女性，所以會對其保有一定程度的尊重。\n但對於有興趣的人總是會忍不住的想調侃或玩弄一下。\n老是拐著彎說話，反而不擅長應對直球反應。 \n\n生長的聚落在靈災後急需金錢所以隻身來到海霧村，開始接觸與前半生守規矩過活相反的日子。\n\n對城市的夜晚感到好奇而意外加入Noctis。\n大多時候喜歡觀察人群與衣著時尚，似乎也喜歡照顧人。',
        kinks: '輕度壓迫或請託', limits: '髒髒的東西'
    },
    { 
        id: 'heersen', category: 'host', image: 'Image/1.png', serviceType: 'standard', name: '赫爾森',
        race: 'aura', height: '185cm', tags: ['寡言', '騎士道', '從屬'],
        motto: '「今夜，您想如何折服一名騎士？<br>那身優雅的束縛，將只為一人卸下。」', rpStyle: '中 / 重', sexualPref: 'Any', rolePref: 'Top, Submissive', filterRoles: ['TOP'],
        story: '翠水鄉的居民，離開故鄉後在黃金港結識大方的傭兵雇主，追隨其輾轉於東西方，在傭兵契約結束後在艾奧傑亞開始冒險者的旅途。\n\n為了生活便利在艾奧傑亞另外取了赫爾森這個名字，實際上另有真名。\n他將過往在黃金港輾轉流離的歲月，妥帖地藏在得體的禮節之下。\n\n他平時是沈默寡言的，彷彿只敢趁著夜色從指尖流露出一絲熾熱。\n低垂的眼眸，彷彿在無聲地渴求一份比契約更沈重的牽絆。',
        kinks: 'Deep/Story/Kanshu/Beloved', limits: 'R-18G相關'
    },
    { 
        id: 'leier', category: 'host', image: 'Image/1.png', serviceType: 'standard', name: '伊斯雷爾',
        race: 'miqote', height: '173cm', tags: ['陽光', '熱情', '直率', '心思細膩'],
        motto: '「眼觀八方財，心繫一人憂。」', rpStyle: '輕 / 中', sexualPref: 'Male', rolePref: 'Bottom', filterRoles: ['BOTTOM'],
        story: '出身於遠東之國，自幼無雙親在黃金港的街頭長大，長大後受到了烏爾達哈商會的漢考克賞識，成為了黃金港的港口商人，因熱愛助人，久而久之成為港口的「萬事屋」。 \n\n某天在港口認識了某位光之戰士，受到了光之戰士旅途故事的影響，為了拓展眼界及幫助更多人，與商會的漢考克先生道別後，揹起了行李，朝向大海的另一端展開了「NEW FOUND ADVENTURE」。 ',
        kinks: '體溫差，氣(香)味', limits: '拉拉菲爾族，血腥，bdsm'
    },
    { 
        id: 'longting', category: 'host', image: 'Image/1.png', serviceType: 'midnight', name: '龍霆',
        race: 'miqote', height: '174cm', tags: ['開朗', '活潑', '熱情'],
        motto: '「你剛剛在看我吧！我不介意你再多靠近我一些喔？」', rpStyle: '重', sexualPref: 'Male (Standard/Midnight)<br>Female (Standard Only)', rolePref: 'Top', filterRoles: ['TOP'],
        story: '來自遠東之國的貓魅族男性，無論何時都笑咪咪的，會親切地對待身邊所有人，但那好像只是表面上。 \n\n本職為商人，以及某家按摩店的店長，喜歡與各式各樣帥氣的男性交流，特別是敖龍族，稍不留神可能就會被他拐進不為人知的小角落。 ',
        kinks: '道具、強制、調教、控制', limits: '搶走主導權、排泄物、血腥、魯加族'
    },
    { 
        id: 'maogao', category: 'host', image: 'Image/1.png', serviceType: 'standard', name: '貓糕',
        race: 'miqote', height: '159cm', tags: ['溫柔', '天然', '慢熱', '反差'],
        motto: '「不用逞強，我會在這裡陪你。」', rpStyle: '鏡像 / 輕 / 中', sexualPref: 'Male', rolePref: 'Bottom, Soft Dom', filterRoles: ['BOTTOM'],
        story: '目前為 Vespera 旗下的員工，同時經營著一間只對熟人開放的畫室。 不擅長與人相處，個性略顯怕生，多半時間只是安靜地待在一旁觀察著。 \n只有在察覺到誰感到低落或孤單時，才會悄然靠近，輕輕陪在身邊。 \n\n唯有在熟識的人面前，才會露出任性、甚至有些驕縱的一面。 \n但——平時溫和待人的他，若被觸碰到某個開關的話，似乎會變得……不太一樣？ ',
        kinks: '無', limits: '無'
    },
    { 
        id: 'saiyi', category: 'host', image: 'Image/1.png', serviceType: 'midnight', name: '賽伊',
        race: 'viera', height: '172cm', tags: ['溫柔', '色氣', '神秘', '調皮'],
        motto: '「我本來應該站在後面…但如果沒有人往前，那就換我來。」', rpStyle: '鏡像 / 重', sexualPref: 'Male (Standard/Midnight)<br>Female (Standard Only)', rolePref: 'Switch', filterRoles: ['SWITCH'],
        story: ' 賽伊出身於守護森林的山林之民，族人遵循嚴格傳統——不離開、不干涉，只負責守護與療癒。 \n\n自小被培養為冷靜敏銳的守護者，直到戰火蔓延至邊境，他親眼目睹死亡發生，族人卻選擇袖手旁觀。 \n那一刻，他違背傳統，選擇出手。 \n在「留下遵守規則」與「離開失去一切」之間，賽伊選擇了後者，踏上旅途。 \n\n他以學者之姿在後方支援，提供情報與治療；必要時，也會以龍騎士之姿站上前線，果斷出手。 \n\n某次休假時，他遇見了一位吟遊詩人。 \n歌聲與節奏讓他第一次真正放鬆下來， 也讓他開始思考—— 守護，或許不只是戰鬥。 \n從那之後，他不只學會守護，也開始學著讓人安心。 \n\n在與「Inu」相遇後，他來到夜之場所「NOCTIS」，成為店員—— 在光影與人心之間，繼續用自己的方式守護他人。 ',
        kinks: '撩人語氣、稱呼變化、慢慢靠近的過程', limits: '拉拉菲爾族'
    },
    { 
        id: 'selfor', category: 'host', image: 'Image/1.png', serviceType: 'standard', name: '瑟歐菲爾',
        race: 'viera', height: '183.8cm (不包含耳朵)', tags: ['溫和', '敏銳', '略帶疏離感的優雅'],
        motto: '「旅途教會我如何忍受孤獨，卻沒教我如何在黑夜裡，<br>拒絕一個同樣寂寞的靈魂。」', rpStyle: '鏡像 / 輕', sexualPref: 'Any', rolePref: 'Switch', filterRoles: ['SWITCH'],
        story: '出生於森林的維艾拉族，是一名浪跡於世界各地的旅人。因為長年的漂泊而習慣了孤獨，也練就了感受他人情緒的敏銳直覺。\n\n為了籌措下一段旅程的旅費而在 NOCTIS 暫時停駐。\n\n不擅長花言巧語，有時說話帶著些許拘謹的迂迴，溫和卻不易深交。對他而言，這裡只是漫長旅途中的一個驛站，他並不尋求歸宿，只願在離去前的每一場相遇中，為那些同樣寂寞的人提供一絲能驅散寒冷的溫暖。',
        kinks: '西裝/制服、修長的手指、動物耳朵、近距離的氣味嗅聞', limits: '深吻、血腥 、不對等關係。'
    },
    { 
        id: 'silas', category: 'host', image: 'Image/1.png', serviceType: 'standard', name: 'Silas',
        race: 'hyur', height: '178cm', tags: ['溫柔', '小笨蛋', '大狗系', '反差感', '純愛'],
        motto: '「沒關係，你可以慢慢說，我會一直在這裡聽。」', rpStyle: '鏡像 / 輕', sexualPref: 'Male', rolePref: 'Switch, Soft Dom', filterRoles: ['SWITCH'],
        story: '出生於森林之中的青年，從小習慣被樹影與風聲包圍，對世界各地的故事與森林外面的世界抱有憧憬。\n\n曾經執著於變強，在冒險的路途中經歷了各種悲歡離合、失去、挫折與成長。 \n今晚的他比起英雄，更是一個願意停下腳步聽眼前的你說話的人。 \n\n看似穩重可靠，熟了之後卻會露出有點笨拙又可愛的一面。',
        kinks: '無', limits: 'ERP、血腥、排泄、極端暴力、未成年、非合意行為、羞辱、獵奇內容'
    },
    { 
        id: 'tuzhi', category: 'host', image: 'Image/1.png', serviceType: 'midnight', name: '兔紙不吃紙',
        race: 'viera', height: '186.5cm', tags: ['直球', '隨性', '無厘頭'],
        motto: '「如果你覺得有點熱，我可以幫你降溫一下，<br>但等一下想打人的時候，還請你手下留情（輕笑）。」', rpStyle: '輕', sexualPref: 'Any', rolePref: 'Switch', filterRoles: ['SWITCH'],
        story: '為了蒐集笑話而在某間酒吧打工，在這期間認識了許許多多不同的人們，與其中某些人締交了深刻的情誼成為了家人，在領養了許多小孩後，為了賺錢而在尋找不同店的打工機會。\n\n終於在因緣際會之下看見了NOCTIS的傳單——— \n黑色的長靴慢悠悠地踏在走向貓咖的路上，維艾拉的長耳微微的晃動著，轉頭一瞥見到了店長張貼的招募，隱藏在面具之下的嘴角微微上揚著\n「欸……公關嗎？好像……挺有意思的。」\n帶著一抹耐人尋味的笑容推開了店門走向店長\n\n「請問，這裡有收不想當人的人嗎？」 ',
        kinks: '制服', limits: '兒童、血腥、排泄物'
    },
    { 
        id: 'uighur', category: 'host', image: 'Image/1.png', serviceType: 'midnight', name: '維梧爾',
        race: 'miqote', height: '180cm', tags: ['紳士', '悶騷'],
        motto: '「燈火闌珊處，此刻，我的心對你不再掩藏。」', rpStyle: '鏡像 / 中', sexualPref: 'Male', rolePref: 'Top', filterRoles: ['TOP'],
        story: '他隱身在人群與燈火之間。 \n細框眼鏡後的目光溫和而專注。在酒館裡常常遇見他的身影，輕抿一口威士忌，閱讀那屬於艾奧傑亞的篇章，他對香氛也有些講究，乾淨而不張揚的禮節紳士。 \n\n生於利姆薩·羅敏薩，為了尋找詩歌與生命意義而走上了旅途，外表年輕的他卻擁有者沉著的老靈魂。 \n沉著背後似乎帶著秘密，讓人不知不覺渴望探索。 \n\n等你起身離開時，大概也不會立刻察覺—— 只是過了一段時間，你想起在那金絲眼鏡下炙熱的眼眸。',
        kinks: '輕BDSM、氣味', limits: '獵奇、排泄、逆位'
    },
    { 
        id: 'saltedfish', category: 'host', image: 'Image/1.png', serviceType: 'standard', name: '鹹魚',
        race: 'hyur', height: '200cm', tags: ['沉穩', '溫柔', '神祕'],
        motto: '「別怕，星辰的指引或許冷冽，但我的手心並非如此……靠近點。」', rpStyle: '輕', sexualPref: 'Any', rolePref: 'Switch', filterRoles: ['SWITCH'],
        story: '出身於北境的高地之民，擁有著足以令人屏息的精實體魄與寬闊背影。\n\n曾遠赴薩雷安深造神秘學，在那裡習得瞭解星辰與靈魂波長的技法。\n\n結束深造後，他平日裡深居簡出，專研命運的盈虧與月相。\n唯有在特定的深夜，才會出現在店內，為尋求指引的旅人撥開迷霧。 ',
        kinks: '體型差、眼鏡', limits: '血腥'
    },
    { 
        id: 'yanluo', category: 'host', image: 'Image/1.png', serviceType: 'midnight', name: '閻羅',
        race: 'elezen', height: '209cm', tags: ['斯文敗類', '強烈佔有慾', '危險神祕'],
        motto: '「不用緊張，在這裡，我只帶走你的寂寞。」', rpStyle: '鏡像', sexualPref: 'Any', rolePref: 'Switch', filterRoles: ['SWITCH'],
        story: ' 他從有記憶以來就在伊修加爾德成長，身為孤兒的他被異端審問局收留，也被培養成「清道夫」，一雙手沾滿鮮血。 \n\n在一次違抗審問局的命令，被追殺的時候，他苟延殘喘、身負重傷地來到利姆薩．羅敏薩，他被一位不知名的恩人救下，身體復原後，已不見恩人的蹤影。 \n\n如今的他換上筆挺的西裝，隱藏在高級俱樂部中擔任接待。\n一邊替客人沒收寂寞，一邊在黑夜中無聲地等待那個或許永遠不會出現的救命恩人。 ',
        kinks: '胸腰癖好、支配、言語羞辱、感官刺激', limits: '不接待魯加族的客人、血腥獵奇、排泄物、客人自虐 '
    },
    { 
        id: 'elenos', category: 'host', image: 'Image/1.png', serviceType: 'standard', name: '伊萊諾斯',
        race: 'viera', height: '188.5cm', tags: ['斯文', '溫柔', '悶騷', '表裡不一', '佔有慾強'],
        motto: ' 「哪一面的我才是真正的我，這問題有很重要嗎？」', rpStyle: '鏡像', sexualPref: 'ANY', rolePref: 'Switch, Soft Dom', filterRoles: ['SWITCH'],
        story: '伊萊諾斯是在伊修加爾德郊外的雪地裡被撿到的孤兒，發現他的是一位年邁的神職人員。\n他在修道院的圖書室裡長大，與書本和窗台上的花為伴，自神學院畢業後本應走上神職之路，卻在養父過世後離開了那座終年積雪的城市。 \n\n遊歷四方期間，他以兼職偶像的身分在小型場地獻唱。\n\n被問起為何總是忙碌於各式各樣的工作之中，他總笑著說是為了籌措團體的活動資金——只是熟識的人偶爾會疑惑，他似乎並不缺錢，真正的目的也從未有人探得。 \n\n在俱樂部裡，他始終蒙著眼睛，被指認身分時只是溫和地搖頭否認。\n對於席間的歡笑言談，他總像隔著一層薄霧般置身事外。\n雖然溫柔，卻極少展現自己真正的心情。',
        kinks: '體溫差、耳朵敏感點、言語誘導 / 低語調教、束縛、鎖骨/後頸標記、邊緣控制、隱藏的佔有慾、蒙眼。', limits: '未成年、血腥/重傷害、排泄物、強制非自願、羞辱性人格貶低、硌獅族、魯加族、拉拉菲爾族'
    }
];

// --- 2. 核心渲染函數 ---

function createStaffCard(staff, container) {
    if (!staff || !container) return;
    const card = document.createElement('div');
    card.className = `staff-card type-${staff.serviceType}`;
    
    card.dataset.type = staff.serviceType;
    card.dataset.race = staff.race;
    card.dataset.role = staff.filterRoles ? staff.filterRoles.join(',') : staff.rolePref;

    card.innerHTML = `
        <div class="cast-img-wrapper"><img src="${staff.image}" alt="${staff.name}"></div>
        <div class="staff-info">
            <h3 class="name">${staff.name}</h3>
        </div>
    `;
    card.addEventListener('click', () => { window.location.href = `profile.html?id=${staff.id}`; });
    container.appendChild(card);
}

function applyFilters() {
    const typeValue = document.getElementById('filter-type').value;
    const raceValue = document.getElementById('filter-race').value;
    const roleValue = document.getElementById('filter-role').value;
    const cards = document.querySelectorAll('.host-grid .staff-card');
    
    cards.forEach(card => {
        const matchType = (typeValue === 'all' || card.dataset.type === typeValue);
        const matchRace = (raceValue === 'all' || card.dataset.race === raceValue);
        const matchRole = (roleValue === 'all' || card.dataset.role.includes(roleValue));
        card.style.display = (matchType && matchRace && matchRole) ? 'block' : 'none';
        card.classList.remove('dynamic-center');
    });

    const visibleCards = Array.from(cards).filter(c => c.style.display !== 'none');
    if (visibleCards.length % 4 === 1) {
        visibleCards[visibleCards.length - 1].classList.add('dynamic-center');
    }
}

function renderProfile(id) {
    const staff = staffDatabase.find(s => s.id === id);
    const container = document.getElementById('profile-content');
    if (!staff || !container) return;

    const backLink = (staff.category === 'manager' || staff.category === 'support') ? 'members.html' : 'staff.html';
    const hosts = staffDatabase.filter(s => s.category === 'host');
    const currentIndex = hosts.findIndex(s => s.id === id);
    const prevHost = hosts[currentIndex - 1];
    const nextHost = hosts[currentIndex + 1];
    const raceMap = { 'miqote': '貓魅族', 'aura': '敖龍族', 'viera': '維埃拉族', 'elezen': '精靈族', 'hyur': '人族' };

    container.innerHTML = `
        <div class="profile-visual">
            <div class="back-nav"><a href="${backLink}" class="back-btn">← 回到目錄</a></div>
            <div class="profile-img-box"><img src="${staff.image}" alt="${staff.name}"></div>
            <div class="motto-box">" ${staff.motto || '在 Noctis，尋找你的唯一。'} "</div>
            ${staff.category === 'host' ? `
            <div class="profile-pagination">
                ${prevHost ? `<a href="profile.html?id=${prevHost.id}" class="nav-arrow">◀ PREV</a>` : '<span class="nav-spacer"></span>'}
                <span class="nav-divider">|</span>
                ${nextHost ? `<a href="profile.html?id=${nextHost.id}" class="nav-arrow">NEXT ▶</a>` : '<span class="nav-spacer"></span>'}
            </div>` : ''}
        </div>
        <div class="profile-info">
            <h1>${staff.name}</h1>
            <div class="profile-tags">
                ${staff.tags.map(tag => `<span class="tag-neon">${tag}</span>`).join('')}
            </div>
            <div class="stats-grid">
                <div class="stat-item"><label>種族 / RACE</label><span>${raceMap[staff.race] || staff.race}</span></div>
                <div class="stat-item"><label>身高 / HEIGHT</label><span>${staff.height}</span></div>
                <div class="stat-item"><label>性向偏好 / SEXUAL PREF</label><span>${staff.sexualPref || 'ANY'}</span></div>
                <div class="stat-item"><label>角色屬性 / ROLE PREF</label><span>${staff.rolePref}</span></div>
                <div class="stat-item"><label>互動風格 / RP STYLE</label><span>${staff.rpStyle}</span></div>
            </div>
            <div class="profile-bio">
                <h3 class="bio-title">背景故事 / BIOGRAPHY</h3>
                <div class="bio-text">${staff.story || '身世暫不公開...'}</div>
            </div>
            <div class="service-details-v2">
                <div class="guide-card standard">
                    <div class="card-header">
                        <span class="gold-mark">※</span><span class="service-icon" style="margin-right: 8px;">🍷</span>
                        <h3>STANDARD <span style="font-size: 0.85rem; color: #aaa; margin-left: 8px; letter-spacing: 2px;">微醺邂逅</span></h3>
                    </div>
                    <div class="card-content">
                        <p>預設包含輕微調情與親暱互動。<br>若偏好友誼向或僅需要聊天陪伴，請於預約時勾選「不需要調情」。</p>
                    </div>
                </div>
                ${staff.serviceType === 'midnight' ? `
                <div class="guide-card midnight">
                    <div class="card-header">
                        <span class="gold-mark">※</span><span class="service-icon" style="margin-right: 8px;">🌙</span>
                        <h3>MIDNIGHT <span style="font-size: 0.85rem; color: #b86bff; margin-left: 8px; letter-spacing: 2px;">深夜沉浸</span> <span class="r18-tag">R18</span></h3>
                    </div>
                    <div class="card-content">
                        <p><b>KINKS:</b> ${staff.kinks}<br><b>LIMITS:</b> ${staff.limits}</p>
                        <p class="freedom-note">即使預約 Midnight，您仍可隨心選擇僅享受 Standard 服務。</p>
                        <p class="room-notice">※ 此服務涉及深度感官沉浸內容，必須同時預約私密房間。</p>
                    </div>
                </div>` : ''}
            </div>
        </div>
    `;
}

function renderMembersPage() {
    const managerGrid = document.getElementById('grid-manager');
    const supportGrid = document.getElementById('grid-support');
    if (!managerGrid || !supportGrid) return;

    managerGrid.innerHTML = '';
    supportGrid.innerHTML = '';

    const managers = staffDatabase.filter(s => s.category === 'manager');
    managers.forEach(manager => {
        const card = document.createElement('div');
        card.className = `staff-card boss-card`; 
        card.innerHTML = `
            <div class="cast-img-wrapper"><img src="${manager.image}" alt="${manager.name}"></div>
            <div class="staff-info">
                <span class="boss-rank">${manager.role || 'Owner / 店長'}</span>
                <h3 class="name">${manager.name}</h3>
            </div>
        `;

        let pressTimer;
        let isLongPress = false;
        const startPress = () => {
            isLongPress = false;
            card.style.transform = "scale(0.95)";
            pressTimer = window.setTimeout(() => {
                isLongPress = true;
                window.location.href = `profile.html?id=${manager.id}`;
            }, 1000); 
        };
        const resetPress = () => { clearTimeout(pressTimer); card.style.transform = "scale(1)"; };

        card.addEventListener('mousedown', startPress);
        card.addEventListener('mouseup', resetPress);
        card.addEventListener('mouseleave', resetPress);
        card.addEventListener('touchstart', startPress);
        card.addEventListener('touchend', resetPress);
        managerGrid.appendChild(card);
    });

    const supports = staffDatabase.filter(s => s.category === 'support');
    supports.forEach(support => {
        const card = document.createElement('div');
        card.className = `staff-card type-standard`; 
        card.innerHTML = `
            <div class="cast-img-wrapper"><img src="${support.image}" alt="${support.name}"></div>
            <div class="staff-info">
                <span class="rank" style="color:#8a2be2; font-size:0.7rem;">${support.role || 'STAFF'}</span>
                <h3 class="name">${support.name}</h3>
            </div>
        `;
        supportGrid.appendChild(card);
    });
}

// --- 3. 頁面初始化邏輯 ---
document.addEventListener('DOMContentLoaded', () => {
    // A. 根據當前頁面，執行對應的渲染 (解決空白頁面問題)
    const currentPath = window.location.pathname.toLowerCase();
    if (currentPath.includes('members.html')) {
        renderMembersPage();
    } else if (currentPath.includes('profile.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        if (id) renderProfile(id);
    }

    // B. 渲染大廳公關
    const gridHost = document.getElementById('grid-host');
    if (gridHost) {
        const hosts = staffDatabase.filter(s => s.category === 'host');
        hosts.forEach(host => createStaffCard(host, gridHost));
    }

    // C. 綁定按鈕監聽器
    document.getElementById('filter-type')?.addEventListener('change', applyFilters);
    document.getElementById('filter-race')?.addEventListener('change', applyFilters);
    document.getElementById('filter-role')?.addEventListener('change', applyFilters);
    document.querySelector('.close-secret')?.addEventListener('click', () => {
        document.getElementById('secret-menu-overlay').style.display = 'none';
    });

    // D. 核心系統變數
    const bgMusic = document.getElementById('bg-music');
    const enterBtn = document.getElementById('enter-btn');
    const curtain = document.getElementById('noctis-curtain');
    const mainContent = document.getElementById('noctis-main');
    const bgmControlBtn = document.getElementById('bgm-control');
    const bgmStatusText = document.getElementById('bgm-status');

    // E. 輪播圖片邏輯函數
    function initHeroSlider() {
        const slides = document.querySelectorAll('.hero-slider .slide');
        if (slides.length === 0) return;
        let currentSlide = 0;
        setInterval(() => {
            const prevSlide = currentSlide;
            slides[prevSlide].classList.remove('active');
            slides[prevSlide].classList.add('exit');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
            setTimeout(() => slides[prevSlide].classList.remove('exit'), 1200);
        }, 4000);
    }

    // F. BGM 開關切換邏輯
    if (bgmControlBtn && bgMusic) {
        bgmControlBtn.addEventListener('click', () => {
            if (bgMusic.paused) {
                bgMusic.play();
                if (bgmStatusText) bgmStatusText.innerText = 'BGM: ON';
                bgmControlBtn.classList.remove('muted');
            } else {
                bgMusic.pause();
                if (bgmStatusText) bgmStatusText.innerText = 'BGM: OFF';
                bgmControlBtn.classList.add('muted');
            }
        });
    }

    // G. 入口啟動邏輯 (NOCTIS Welcome 展開版)
    if (enterBtn && mainContent) {
        enterBtn.addEventListener('click', () => {
            const overlay = document.getElementById('age-verify-overlay');
            if (overlay) overlay.style.display = 'flex';

            const confirmBtn = document.getElementById('verify-confirm');
            if (confirmBtn) {
                confirmBtn.onclick = () => {
                    // 1. 年齡窗淡出
                    overlay.style.transition = 'opacity 0.5s ease';
                    overlay.style.opacity = '0';

                    // 2. 紀錄身分並播音樂
                    sessionStorage.setItem('noctisEntered', 'true');
                    if (bgMusic) {
                        bgMusic.currentTime = 52;
                        bgMusic.volume = 0.01;
                        bgMusic.play().catch(e => console.log("音樂播放被阻擋：", e));
                    }

                    setTimeout(() => {
                        overlay.style.display = 'none'; // 隱藏年齡窗
                        if (curtain) curtain.style.display = 'none'; // 💥 確保舊版布幕絕對不會擋路

                        // 3. Welcome 展開框上場
                        const welcomeGate = document.getElementById('welcome-gate');
                        if (welcomeGate) welcomeGate.style.display = 'flex';
                        
                        setTimeout(() => {
                            const welcomeBox = document.querySelector('.welcome-box');
                            if (welcomeBox) welcomeBox.classList.add('expand');
                            
                            // 4. 欣賞展開動畫 2.5 秒後，切換到主網頁
                            setTimeout(() => {
                                if (welcomeGate) {
                                    welcomeGate.style.transition = 'opacity 1s ease';
                                    welcomeGate.style.opacity = '0'; 
                                }
                                
                                // 💥 瞬間準備好主網頁 (恢復 Flexbox 置中)
                                mainContent.style.display = 'flex'; 
                                if (typeof initHeroSlider === "function") initHeroSlider(); 
                                
                                setTimeout(() => {
                                    if (welcomeGate) welcomeGate.style.display = 'none';
                                }, 1000);

                            }, 2500); 
                        }, 100);
                    }, 500); 
                };
            }

            // 處理「離開」按鈕
            const cancelBtn = document.getElementById('verify-cancel');
            const deniedOverlay = document.getElementById('age-denied-overlay');
            if (cancelBtn && deniedOverlay) {
                cancelBtn.onclick = () => {
                    overlay.style.display = 'none';
                    deniedOverlay.style.display = 'flex';
                };
            }

            const deniedCloseBtn = document.getElementById('denied-close');
            if (deniedCloseBtn) {
                deniedCloseBtn.onclick = () => {
                    deniedOverlay.style.display = 'none';
                };
            }
        });
    }

    // H. 檢查 Session 自動跳過動畫
    if (sessionStorage.getItem('noctisEntered') === 'true') {
        if (curtain) curtain.style.display = 'none';
        
        // 💥 如果是首頁，直接用 flex 顯示以維持置中
        if (mainContent) {
            mainContent.style.display = 'flex';
            initHeroSlider(); 
        }
        
        if (bgMusic) {
            bgMusic.currentTime = 52;
            bgMusic.volume = 0.01;
            bgMusic.play().catch(() => console.log("等待用戶點擊以播放音樂"));
        }
    }
});