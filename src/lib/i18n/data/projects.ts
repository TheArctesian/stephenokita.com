import type { LocaleCode } from '$lib/stores/locale';

// Client-side translation overlay for DATABASE-backed project titles/descriptions.
// Keyed by the project's numeric `id`. en-GB / en-US carry no overrides, so they
// render the original English DB text; zh-Hant / zh-Hans supply translations.
// A missing id or field falls back to the original. Titles are translated only
// for descriptive names (brand/domain/product names keep their original form).
type Fields = { title?: string; description?: string };
type Overlay = Partial<Record<LocaleCode, Fields>>;

const projectOverrides: Record<number, Overlay> = {
  6: {
    "zh-Hant": { description: "一個網站，收錄了所有中文部首，也用來放我做的可列印 PDF。" },
    "zh-Hans": { description: "一个网站，收录了所有中文部首，也用来放我做的可打印 PDF。" }
  },
  7: {
    "zh-Hant": { description: "一個用來產生深入又有趣問題的 app，讓你更了解你的朋友。" },
    "zh-Hans": { description: "一个用来生成深入又有趣问题的 app，让你更了解你的朋友。" }
  },
  8: {
    "zh-Hant": { title: "我的地圖", description: "一個把我去過的世界各地地方視覺化的工具。原本想做成一個地理部落格，不過那部分我還沒完成。" },
    "zh-Hans": { title: "我的地图", description: "一个把我去过的世界各地地方可视化的工具。本来想做成一个地理博客，不过那部分我还没完成。" }
  },
  9: {
    "zh-Hant": { description: "一個把我看過的書、玩過的遊戲和看過的電影視覺化的蠢工具。這意味著我得去爬 Goodreads、Steam 和 Letterboxd 的資料。現在已經過時了，應該用 GitHub Action 拉資料進來讓它保持更新。" },
    "zh-Hans": { description: "一个把我看过的书、玩过的游戏和看过的电影可视化的蠢工具。这意味着我得去爬 Goodreads、Steam 和 Letterboxd 的数据。现在已经过时了，应该用 GitHub Action 拉数据进来让它保持更新。" }
  },
  10: {
    "zh-Hant": { description: "我個人在 Unix 系統上的設定檔。" },
    "zh-Hans": { description: "我个人在 Unix 系统上的配置文件。" }
  },
  11: {
    "zh-Hant": { description: "你現在正在看的這個網站。" },
    "zh-Hans": { description: "你现在正在看的这个网站。" }
  },
  12: {
    "zh-Hant": { description: "我哥的網站，他人很好，我忘了買聖誕禮物給他，所以聖誕夜早上花了時間幫他做了這個。做得挺爛的，但他好像挺喜歡。" },
    "zh-Hans": { description: "我哥的网站，他人很好，我忘了买圣诞礼物给他，所以圣诞夜早上花了时间帮他做了这个。做得挺烂的，但他好像挺喜欢。" }
  },
  13: {
    "zh-Hant": { description: "我個人的「首頁」，也就是我開新分頁時會跳出來的那頁。我在 qutebrowser、Firefox 和 Brave 之間換來換去，但這個一直跟著我。它非常好用，尤其配上 vimium，我就不用手動打進搜尋欄。我是個程式設計師，天生就是被訓練成偷懶的。" },
    "zh-Hans": { description: "我个人的「首页」，也就是我打开新标签页时会跳出来的那页。我在 qutebrowser、Firefox 和 Brave 之间换来换去，但这个一直跟着我。它非常好用，尤其配上 vimium，我就不用手动打进搜索栏。我是个程序员，天生就是被训练成偷懒的。" }
  },
  14: {
    "zh-Hant": { description: "我做的或正在維護的一系列 TI-84 應用程式合集。" },
    "zh-Hans": { description: "我做的或正在维护的一系列 TI-84 应用程序合集。" }
  },
  15: {
    "zh-Hant": { title: "加密貨幣捐款", description: "一系列與不同區塊鏈支付系統互動的程式碼片段。目的是讓捐款變得簡單。" },
    "zh-Hans": { title: "加密货币捐款", description: "一系列与不同区块链支付系统交互的代码片段。目的是让捐款变得简单。" }
  },
  16: {
    "zh-Hant": { description: "我為 Houdini（一款 3D 模擬軟體）寫的程序化生成腳本。我用它來做 3D 模型和模擬，純粹好玩。" },
    "zh-Hans": { description: "我为 Houdini（一款 3D 仿真软件）写的程序化生成脚本。我用它来做 3D 模型和仿真，纯粹好玩。" }
  },
  17: {
    "zh-Hant": { title: "Tech & Justice Lab - Berkeley", description: "打造技術以推動種族平權、減少監禁，並促進刑事司法體系的透明度。" },
    "zh-Hans": { title: "Tech & Justice Lab - Berkeley", description: "打造技术以推动种族平权、减少监禁，并促进刑事司法体系的透明度。" }
  },
  18: {
    "zh-Hant": { title: "Political Computer Science - Berkeley", description: "Launched 是一家行銷科技公司，協助 B2B 客戶開發的各個環節。我做全端，處理伺服器問題、API 整合、資料庫架構，以及前端設計與實作。" },
    "zh-Hans": { title: "Political Computer Science - Berkeley", description: "Launched 是一家营销科技公司，协助 B2B 客户开发的各个环节。我做全栈，处理服务器问题、API 集成、数据库架构，以及前端设计与实现。" }
  },
  19: {
    "zh-Hant": { description: "Launched 是一家行銷科技公司，協助 B2B 客戶開發的各個環節。我做全端，處理伺服器問題、API 整合、資料庫架構，以及前端設計與實作。" },
    "zh-Hans": { description: "Launched 是一家营销科技公司，协助 B2B 客户开发的各个环节。我做全栈，处理服务器问题、API 集成、数据库架构，以及前端设计与实现。" }
  },
  20: {
    "zh-Hant": { description: "第一次真正接觸業界的網頁開發。做了一些很酷的網頁動畫，也學會了怎麼用 CMS。這家公司後來還邀我回去做了幾次關於加密貨幣的演講，並帶我認識了香港的新創圈。" },
    "zh-Hans": { description: "第一次真正接触业界的网页开发。做了一些很酷的网页动画，也学会了怎么用 CMS。这家公司后来还邀我回去做了几次关于加密货币的演讲，并带我认识了香港的创业圈。" }
  },
  21: {
    "zh-Hant": { description: "這是一個我很感興趣的 dApp，所以我加入了他們的 DAO 幫忙。我負責前端、協助智能合約，也做客戶開發。這個專案跟許多野心勃勃的 dApp 一樣，難逃供應面的老問題，現在已經幾乎一文不值了。專案的目標是把碳權代幣化，我很喜歡這個想法，因為它是在對抗企業的漂綠行為，而非只做表面改變，同時建立一個以碳勞動為基礎的新經濟。想像一種貨幣不建立在金本位或中央銀行之上，而是建立在你對世界課稅的多寡上，這實在既大膽又有趣。管理結構完全民主、去中心化，可惜終究還是敗給了錢。" },
    "zh-Hans": { description: "这是一个我很感兴趣的 dApp，所以我加入了他们的 DAO 帮忙。我负责前端、协助智能合约，也做客户开发。这个项目跟许多野心勃勃的 dApp 一样，难逃供应面的老问题，现在已经几乎一文不值了。项目的目标是把碳权代币化，我很喜欢这个想法，因为它是在对抗企业的漂绿行为，而非只做表面改变，同时建立一个以碳劳动为基础的新经济。想象一种货币不建立在金本位或中央银行之上，而是建立在你对世界征税的多寡上，这实在既大胆又有趣。管理结构完全民主、去中心化，可惜终究还是败给了钱。" }
  },
  22: {
    "zh-Hant": { description: "這是我和 PCS Berkeley 一起做的 app。這個 app 讓使用者填一份問卷，然後自動幫他們報名所有符合資格的福利計畫。做起來很有趣。爬取和整理政府的索引資料幾乎是不可能的任務，而要讓問卷本身能在前面題目已使後面題目失去意義時自動跳過，也很困難。這是我在 PCS 的第一個專案，能做這個我真的很開心。" },
    "zh-Hans": { description: "这是我和 PCS Berkeley 一起做的 app。这个 app 让用户填一份问卷，然后自动帮他们报名所有符合资格的福利计划。做起来很有趣。爬取和整理政府的索引数据几乎是不可能的任务，而要让问卷本身能在前面题目已使后面题目失去意义时自动跳过，也很困难。这是我在 PCS 的第一个项目，能做这个我真的很开心。" }
  },
  23: {
    "zh-Hant": { description: "我第一份 web3 工作。當網頁開發者，學到了 web3/defi 的正式生產開發環境。Trueflation 是一個另類的通膨追蹤工具，原本要做成穩定幣，後來變成只是一個帶治理代幣的通膨預言機。Trusted Node 則是一個質押池聚合器，為 POS 幣種提供面向消費者的質押池。" },
    "zh-Hans": { description: "我第一份 web3 工作。当网页开发者，学到了 web3/defi 的正式生产开发环境。Trueflation 是一个另类的通胀追踪工具，本来要做成稳定币，后来变成只是一个带治理代币的通胀预言机。Trusted Node 则是一个质押池聚合器，为 POS 币种提供面向消费者的质押池。" }
  },
  24: {
    "zh-Hant": { description: "Voiijer 是一個支援多模態貼文的社群媒體 app。它的定位是探險家的社群媒體，讓他們可以創作關於自己旅程的故事。我做了這個 app 的登陸頁，並在技術棧和區塊鏈／數位資產策略上提供建議。人都很好。" },
    "zh-Hans": { description: "Voiijer 是一个支持多模态帖子的社交媒体 app。它的定位是探险家的社交媒体，让他们可以创作关于自己旅程的故事。我做了这个 app 的落地页，并在技术栈和区块链／数字资产策略上提供建议。人都很好。" }
  },
  25: {
    "zh-Hant": { description: "為我學校 Flexi 時段（相當於中學的 OH 自習時段）做的排程中心。學校原本用一個 Google 試算表來安排 Flexi 時段，每到 Flexi 時間、一千名學生同時登入時就會當機。這個 app 讓學生能輕鬆查看自己的 Flexi 排程並做調整。我已經不再託管它，也不再持有那個網域，現在應該是學校在託管（我想）。連結指向的是 GitHub。這個還有第二個版本，我用一個叫 flexi2 的 Go 伺服器把整個後端換掉了。" },
    "zh-Hans": { description: "为我学校 Flexi 时段（相当于中学的 OH 自习时段）做的排程中心。学校本来用一个 Google 表格来安排 Flexi 时段，每到 Flexi 时间、一千名学生同时登入时就会崩溃。这个 app 让学生能轻松查看自己的 Flexi 排程并做调整。我已经不再托管它，也不再持有那个域名，现在应该是学校在托管（我想）。链接指向的是 GitHub。这个还有第二个版本，我用一个叫 flexi2 的 Go 服务器把整个后端换掉了。" }
  },
  26: {
    "zh-Hant": { title: "25a 讀書遊戲", description: "另一個以 tablequestions 為基礎做的遊戲，這個專為 Berkeley 的 25a 期末考設計。我和幾個朋友玩這個來確認我們真的懂古代哲學。這其實是一種披著生產力外衣的拖延方式。它一開始是我朋友的挑戰，說我不可能在 30 分鐘內做出一個讀書遊戲並上線，結果我大概花了 45 分鐘。" },
    "zh-Hans": { title: "25a 学习游戏", description: "另一个以 tablequestions 为基础做的游戏，这个专为 Berkeley 的 25a 期末考设计。我和几个朋友玩这个来确认我们真的懂古代哲学。这其实是一种披着生产力外衣的拖延方式。它一开始是我朋友的挑战，说我不可能在 30 分钟内做出一个学习游戏并上线，结果我大概花了 45 分钟。" }
  },
  27: {
    "zh-Hant": { title: "IB 心理學 Articulate", description: "讀書卡片，後來變成一個以 Articulate 為基礎的線上遊戲，用於 IB 心理學。它是以我另一個 tablequestion 為基礎，把題目和功能改成符合 IB 心理學課綱。我後來也不再託管它，因為太貴了，但程式碼還在。" },
    "zh-Hans": { title: "IB 心理学 Articulate", description: "学习卡片，后来变成一个以 Articulate 为基础的在线游戏，用于 IB 心理学。它是以我另一个 tablequestion 为基础，把题目和功能改成符合 IB 心理学课纲。我后来也不再托管它，因为太贵了，但代码还在。" }
  },
  28: {
    "zh-Hant": { description: "這是我寫數學 IA（IB 專題）所需的程式碼。我找不到最終報告了，但它的靈感來自 Marx 和 Henry George 對馬爾薩斯人口論的歸納式反駁。我想用演繹的方式去分析它並建模其變化，報告某種程度上顯示馬爾薩斯是對的——資源（GDP）可以用等差數列建模，而人口用等比數列建模。我記得我算出來的馬爾薩斯臨界點（兩條線的交點）大約落在 2100 年代初期，這在直覺上也對得上。" },
    "zh-Hans": { description: "这是我写数学 IA（IB 项目）所需的代码。我找不到最终报告了，但它的灵感来自 Marx 和 Henry George 对马尔萨斯人口论的归纳式反驳。我想用演绎的方式去分析它并建模其变化，报告某种程度上显示马尔萨斯是对的——资源（GDP）可以用等差数列建模，而人口用等比数列建模。我记得我算出来的马尔萨斯临界点（两条线的交点）大约落在 2100 年代初期，这在直觉上也对得上。" }
  },
  29: {
    "zh-Hant": { description: "我正在寫的一篇研究論文的程式碼，主題是：比特幣的價格在多大程度上受到股票市場走勢的左右？" },
    "zh-Hans": { description: "我正在写的一篇研究论文的代码，主题是：比特币的价格在多大程度上受到股票市场走势的左右？" }
  },
  30: {
    "zh-Hant": { title: "PowerSchool 行事曆 app", description: "這是用來把我中學的 PowerSchool 課表匯入 Google 日曆的工具。原本是別人做的，我負責維護。我一開始對它做滲透測試，發現了一堆漏洞並修補了。目前這個專案是什麼狀態我就不清楚了。" },
    "zh-Hans": { title: "PowerSchool 日历 app", description: "这是用来把我中学的 PowerSchool 课表导入 Google 日历的工具。本来是别人做的，我负责维护。我一开始对它做渗透测试，发现了一堆漏洞并修补了。目前这个项目是什么状态我就不清楚了。" }
  },
  31: {
    "zh-Hant": { description: "Revision Village 是一個很受歡迎的 IB 資源，收錄了歷屆試題和評分標準，但很貴。而關於散布歷屆試題的法律規定相當嚴格，所以我們做了這個校內網站，讓所有學生都能拿到歷屆試題。我們用了一些 OCR 和 NLP，依每次考試的主題來抽取題目和評分標準。這個網站現在也已經下線了。" },
    "zh-Hans": { description: "Revision Village 是一个很受欢迎的 IB 资源，收录了历届试题和评分标准，但很贵。而关于散布历届试题的法律规定相当严格，所以我们做了这个校内网站，让所有学生都能拿到历届试题。我们用了一些 OCR 和 NLP，依每次考试的主题来抽取题目和评分标准。这个网站现在也已经下线了。" }
  },
  32: {
    "zh-Hant": { title: "Cubesat 光譜分析", description: "這是我們參加 HKU Cubesat 競賽的作品程式碼。我們設計並製作了一顆迷你衛星，用光譜分析法來分析臭氧的化學組成。當這顆 cubesat 繞地球運行時，會把資訊回傳到我們在 HKU 架設的伺服器，讓我們能追蹤排放和污染程度。我們沒得獎，但能做外太空的網路連線和電機工程還是挺好玩的。我們有七個人的團隊，但真正在做事的其實只有兩個人。有個趣事：贏得人氣獎（依 Instagram 按讚數決定）的作品是一顆會把骨灰送上太空的衛星。那顆衛星做得很好，但他們不知怎麼沒考慮到牛頓第三定律——骨灰釋放時，會把裝著許多其他 cubesat 的衛星整個推離軌道。" },
    "zh-Hans": { title: "Cubesat 光谱分析", description: "这是我们参加 HKU Cubesat 竞赛的作品代码。我们设计并制作了一颗迷你卫星，用光谱分析法来分析臭氧的化学组成。当这颗 cubesat 绕地球运行时，会把信息回传到我们在 HKU 架设的服务器，让我们能追踪排放和污染程度。我们没得奖，但能做外太空的网络连线和电气工程还是挺好玩的。我们有七个人的团队，但真正在做事的其实只有两个人。有个趣事：赢得人气奖（依 Instagram 点赞数决定）的作品是一颗会把骨灰送上太空的卫星。那颗卫星做得很好，但他们不知怎么没考虑到牛顿第三定律——骨灰释放时，会把装着许多其他 cubesat 的卫星整个推离轨道。" }
  },
  33: {
    "zh-Hant": { description: "又一個學校專案，用來安排上學的共乘。我們學校在山頂上，所以全部 3000 名教職員和學生都得經過同一條塞車的路才能上去。這問題越來越嚴重，早上要花 30 分鐘才能上到一座走路只要 20 分鐘的山。這是一個讓家長建立共乘群組的 app，是仿照 Uber 做的，還帶聊天功能。連結的這個是 Svelte + Firebase 版本，我另外也做了一個 Java（Android）Spring Boot 版本，放在我的 GitHub 上。這個現在也不再託管了。" },
    "zh-Hans": { description: "又一个学校项目，用来安排上学的拼车。我们学校在山顶上，所以全部 3000 名教职员和学生都得经过同一条堵车的路才能上去。这问题越来越严重，早上要花 30 分钟才能上到一座走路只要 20 分钟的山。这是一个让家长建立拼车群组的 app，是仿照 Uber 做的，还带聊天功能。链接的这个是 Svelte + Firebase 版本，我另外也做了一个 Java（Android）Spring Boot 版本，放在我的 GitHub 上。这个现在也不再托管了。" }
  },
  34: {
    "zh-Hant": { description: "我上 IBM 量子運算課程的筆記和專案。這挺酷的，因為在 qiskit（IBM 的量子函式庫）裡連 hello world 都超級難。" },
    "zh-Hans": { description: "我上 IBM 量子计算课程的笔记和项目。这挺酷的，因为在 qiskit（IBM 的量子库）里连 hello world 都超级难。" }
  },
  35: {
    "zh-Hant": { description: "一個學校專案，用來取代我們餐廳原本的點餐系統。它是為那種大螢幕的 Android 裝置做的。做起來很好玩，現在也不再託管了。" },
    "zh-Hans": { description: "一个学校项目，用来取代我们餐厅本来的点餐系统。它是为那种大屏幕的 Android 设备做的。做起来很好玩，现在也不再托管了。" }
  },
  36: {
    "zh-Hant": { title: "Scheme (Lisp) 直譯器，CS61A", description: "一個用 Python 寫的簡易 Scheme 直譯器。這是個很有趣的專案，讓我理解程式語言的內部運作，以及如何解析和執行程式碼。這是為了 Berkeley 的 CS61A 課程做的。網站連結裡有沒有專案細節，得看你是什麼時候看的。他們的存檔網站只對 Berkeley 學生開放，而我個人的作業無法分享（免得別人在之後學期做這專案時抄襲）。這個真的很難，我花了很多時間，但能玩程式的直譯以及 lisp（scheme）還是很有意思。" },
    "zh-Hans": { title: "Scheme (Lisp) 解释器，CS61A", description: "一个用 Python 写的简易 Scheme 解释器。这是个很有趣的项目，让我理解编程语言的内部运作，以及如何解析和执行代码。这是为了 Berkeley 的 CS61A 课程做的。网站链接里有没有项目细节，得看你是什么时候看的。他们的存档网站只对 Berkeley 学生开放，而我个人的作业无法分享（免得别人在之后学期做这项目时抄袭）。这个真的很难，我花了很多时间，但能玩程序的解释以及 lisp（scheme）还是很有意思。" }
  },
  37: {
    "zh-Hant": { title: "世界生成——為 CS61B 自製的遊戲引擎", description: "在 Java 中設計並實作了一個 2D 程序化世界生成引擎，運用圖論演算法來創造彼此相連的環境。開發了一套系統，把房間表示為圖結構中的頂點、走廊表示為邊，並運用深度優先搜尋和最小生成樹等演算法，確保產生的佈局完全連通、適合探索。專案特色包括依使用者提供的種子做偽隨機生成、互動遊戲機制，以及帶抬頭顯示器（HUD）的自訂渲染系統。以穩健的架構打造，支援狀態持久化、確定性行為，並透過圖遍歷演算法驗證房間連通性，確保每個生成的世界都是連貫、可通行的空間。（這段是 LLM 生成的）" },
    "zh-Hans": { title: "世界生成——为 CS61B 自制的游戏引擎", description: "在 Java 中设计并实现了一个 2D 程序化世界生成引擎，运用图论算法来创造彼此相连的环境。开发了一套系统，把房间表示为图结构中的顶点、走廊表示为边，并运用深度优先搜索和最小生成树等算法，确保生成的布局完全连通、适合探索。项目特色包括依用户提供的种子做伪随机生成、交互游戏机制，以及带抬头显示器（HUD）的自定义渲染系统。以稳健的架构打造，支持状态持久化、确定性行为，并通过图遍历算法验证房间连通性，确保每个生成的世界都是连贯、可通行的空间。（这段是 LLM 生成的）" }
  },
  38: {
    "zh-Hant": { description: "我和幾個朋友做的網站，讓開發中國家的老師和學生能夠連結起來。這是我們參加兩場 Microsoft x UN 黑客松的作品，而且都得獎了。" },
    "zh-Hans": { description: "我和几个朋友做的网站，让发展中国家的老师和学生能够连接起来。这是我们参加两场 Microsoft x UN 黑客松的作品，而且都得奖了。" }
  },
  39: {
    "zh-Hant": { title: "中文部首表", description: "一份風格化的中文部首表，附上發音、繁體與簡體寫法以及翻譯。" },
    "zh-Hans": { title: "中文部首表", description: "一份风格化的中文部首表，附上发音、繁体与简体写法以及翻译。" }
  },
  41: {
    "zh-Hant": { description: "一個給 Python 用、以陣列為基礎的 CSV 解析器。" },
    "zh-Hans": { description: "一个给 Python 用、以数组为基础的 CSV 解析器。" }
  },
  42: {
    "zh-Hant": { title: "Voxel 重新網格化", description: "一個用 C 和 Rust 寫的程式，把網格轉換成體素（Voxel），以便整合進沙盒。" },
    "zh-Hans": { title: "Voxel 重新网格化", description: "一个用 C 和 Rust 写的程序，把网格转换成体素（Voxel），以便集成进沙盒。" }
  },
  43: {
    "zh-Hant": { title: "React 白板", description: "一個用 React 實作的白板。" },
    "zh-Hans": { title: "React 白板", description: "一个用 React 实现的白板。" }
  },
  44: {
    "zh-Hant": { title: "Useless Gaps", description: "一個 GNOME Shell 擴充套件，為平鋪和最大化的視窗加上美觀的間隙。" },
    "zh-Hans": { title: "Useless Gaps", description: "一个 GNOME Shell 扩展，为平铺和最大化的窗口加上美观的间隙。" }
  },
  45: {
    "zh-Hant": { description: "xmonad 的核心，一個小巧但功能完整、符合 ICCCM 標準的平鋪式視窗管理器。" },
    "zh-Hans": { description: "xmonad 的核心，一个小巧但功能完整、符合 ICCCM 标准的平铺式窗口管理器。" }
  },
  46: {
    "zh-Hant": { description: "一個簡單、不綁定 CSS 的 Svelte 3 倒數計時元件，只有 1 個相依套件。" },
    "zh-Hans": { description: "一个简单、不绑定 CSS 的 Svelte 3 倒计时组件，只有 1 个依赖包。" }
  },
  47: {
    "zh-Hant": { description: "一個用 Nim 寫的系統資訊工具（類似 Neofetch）。" },
    "zh-Hans": { description: "一个用 Nim 写的系统信息工具（类似 Neofetch）。" }
  },
  48: {
    "zh-Hant": { description: "一個輕量的 TUI 登入管理器，為 Linux 和 BSD 提供主控台 UI。" },
    "zh-Hans": { description: "一个轻量的 TUI 登录管理器，为 Linux 和 BSD 提供控制台 UI。" }
  },
  49: {
    "zh-Hant": { description: "一個用 Rust 寫的可擴充平鋪式視窗管理器，遵循 KISS 和 Unix 哲學。" },
    "zh-Hans": { description: "一个用 Rust 写的可扩展平铺式窗口管理器，遵循 KISS 和 Unix 哲学。" }
  },
  50: {
    "zh-Hant": { description: "一個懶人用的 git 工具，用來自動化常用的 git 指令。" },
    "zh-Hans": { description: "一个懒人用的 git 工具，用来自动化常用的 git 命令。" }
  },
  51: {
    "zh-Hant": { title: "UC 投資", description: "我和朋友做的一個網站，用來把 UC 捐贈基金的組成視覺化。我們用 UC 捐贈基金的資料做了一個網站，呈現基金的組成和報酬。我們還做了一個工具，讓你能查看基金的報酬。" },
    "zh-Hans": { title: "UC 投资", description: "我和朋友做的一个网站，用来把 UC 捐赠基金的组成可视化。我们用 UC 捐赠基金的数据做了一个网站，呈现基金的组成和回报。我们还做了一个工具，让你能查看基金的回报。" }
  },
  52: {
    "zh-Hant": { title: "RJA 工具 - Tech & Justice Lab", description: "一個我和朋友正在打造的 AI 工具，用來幫公設辯護人自動化 RJA 案件的訴訟工作。RJA 對案件的訴訟有特定要求，我們做了一個工具來梳理公設辯護人提供的文件，並與類似案件做比對，好讓他們的工作更輕鬆。" },
    "zh-Hans": { title: "RJA 工具 - Tech & Justice Lab", description: "一个我和朋友正在打造的 AI 工具，用来帮公设辩护人自动化 RJA 案件的诉讼工作。RJA 对案件的诉讼有特定要求，我们做了一个工具来梳理公设辩护人提供的文件，并与类似案件做比对，好让他们的工作更轻松。" }
  },
  53: {
    "zh-Hant": { title: "CPDA - Tech & Justice Lab", description: "加州公設辯護人協會（California Public Defenders Association）來找我們，說他們的動議庫（供公設辯護人在法庭上使用的資源集）無法搜尋。那只是一堆 Dropbox 檔案，有 178 種不同的檔案格式。我和朋友用語意搜尋做了一個網站，讓他們能快速找到需要的資源。" },
    "zh-Hans": { title: "CPDA - Tech & Justice Lab", description: "加州公设辩护人协会（California Public Defenders Association）来找我们，说他们的动议库（供公设辩护人在法庭上使用的资源集）无法搜索。那只是一堆 Dropbox 文件，有 178 种不同的文件格式。我和朋友用语义搜索做了一个网站，让他们能快速找到需要的资源。" }
  },
  54: {
    "zh-Hant": { description: "我第一次嘗試做加密貨幣西洋棋 dapp。這遊戲原本想做成 chess.com，但加上加密貨幣下注。我好幾年沒碰它了，但如果你 clone 下來跑，它還是能動。總有一天得把它上線。" },
    "zh-Hans": { description: "我第一次尝试做加密货币国际象棋 dapp。这游戏本来想做成 chess.com，但加上加密货币下注。我好几年没碰它了，但如果你 clone 下来跑，它还是能动。总有一天得把它上线。" }
  },
  55: {
    "zh-Hant": { description: "在 USC 上完一門 3D 設計課後，教授叫我就儘管把東西發出去。這是我在 game jam 以外做的第一個「遊戲」。" },
    "zh-Hans": { description: "在 USC 上完一门 3D 设计课后，教授叫我就尽管把东西发出去。这是我在 game jam 以外做的第一个「游戏」。" }
  },
  56: {
    "zh-Hant": { description: "我一直開玩笑說需要一個助理或自己的分身，我媽說那就訓練一個 AI 吧。我一開始沒當回事，但某次夜遊回來後，我覺得試試看應該很好玩。於是我用 ollama 和 langchain 幫自己做了一個個人聊天機器人。方法都在 GitHub 上，所以你也可以幫自己做一個複製版。" },
    "zh-Hans": { description: "我一直开玩笑说需要一个助理或自己的分身，我妈说那就训练一个 AI 吧。我一开始没当回事，但某次夜游回来后，我觉得试试看应该很好玩。于是我用 ollama 和 langchain 帮自己做了一个个人聊天机器人。方法都在 GitHub 上，所以你也可以帮自己做一个复制版。" }
  },
  57: {
    "zh-Hant": { title: "Readme - PCS", description: "Political Computer Science 的部落格，用來向世界宣布我們在做什麼。" },
    "zh-Hans": { title: "Readme - PCS", description: "Political Computer Science 的博客，用来向世界宣布我们在做什么。" }
  },
  58: {
    "zh-Hant": { title: "道德資本主義", description: "一個我做的交易機器人，因為我很窮、想賺點錢，但想用善良的方式賺。可以說是為香檳社會主義者做的財富管理吧。另外，我讀了一堆 Nick Land 之後也嚇壞了，想做點什麼讓自己還能對世界抱有希望。" },
    "zh-Hans": { title: "道德资本主义", description: "一个我做的交易机器人，因为我很穷、想赚点钱，但想用善良的方式赚。可以说是为香槟社会主义者做的财富管理吧。另外，我读了一堆 Nick Land 之后也吓坏了，想做点什么让自己还能对世界抱有希望。" }
  },
  59: {
    "zh-Hant": { description: "一個有主見的 NixOS 發行版，專注於開發者生產力和系統可重現性。" },
    "zh-Hans": { description: "一个有主见的 NixOS 发行版，专注于开发者生产力和系统可重现性。" }
  },
  60: {
    "zh-Hant": { title: "UC 投資 - 薪資工具", description: "一個互動式工具，用來分析整個 UC 系統的員工薪資與薪酬資料。" },
    "zh-Hans": { title: "UC 投资 - 薪资工具", description: "一个交互式工具，用来分析整个 UC 系统的员工薪资与薪酬数据。" }
  },
  61: {
    "zh-Hant": { title: "UC 投資 - BDS 工具", description: "一個工具，用來追蹤和分析 UC 的投資與 BDS（抵制、撤資、制裁）標準之間的關係。" },
    "zh-Hans": { title: "UC 投资 - BDS 工具", description: "一个工具，用来追踪和分析 UC 的投资与 BDS（抵制、撤资、制裁）标准之间的关系。" }
  },
  62: {
    "zh-Hant": { title: "Tech & Justice Lab - Berkeley", description: "打造技術以推動種族平權、減少監禁，並促進刑事司法體系的透明度。" },
    "zh-Hans": { title: "Tech & Justice Lab - Berkeley", description: "打造技术以推动种族平权、减少监禁，并促进刑事司法体系的透明度。" }
  },
  63: {
    "zh-Hant": { title: "Political Computer Science - Berkeley", description: "Launched 是一家行銷科技公司，協助 B2B 客戶開發的各個環節。我做全端，處理伺服器問題、API 整合、資料庫架構，以及前端設計與實作。" },
    "zh-Hans": { title: "Political Computer Science - Berkeley", description: "Launched 是一家营销科技公司，协助 B2B 客户开发的各个环节。我做全栈，处理服务器问题、API 集成、数据库架构，以及前端设计与实现。" }
  },
  64: {
    "zh-Hant": { description: "Launched 是一家行銷科技公司，協助 B2B 客戶開發的各個環節。我做全端，處理伺服器問題、API 整合、資料庫架構，以及前端設計與實作。" },
    "zh-Hans": { description: "Launched 是一家营销科技公司，协助 B2B 客户开发的各个环节。我做全栈，处理服务器问题、API 集成、数据库架构，以及前端设计与实现。" }
  },
  65: {
    "zh-Hant": { description: "第一次真正接觸業界的網頁開發。做了一些很酷的網頁動畫，也學會了怎麼用 CMS。這家公司後來還邀我回去做了幾次關於加密貨幣的演講，並帶我認識了香港的新創圈。" },
    "zh-Hans": { description: "第一次真正接触业界的网页开发。做了一些很酷的网页动画，也学会了怎么用 CMS。这家公司后来还邀我回去做了几次关于加密货币的演讲，并带我认识了香港的创业圈。" }
  },
  66: {
    "zh-Hant": { description: "這是一個我很感興趣的 dApp，所以我加入了他們的 DAO 幫忙。我負責前端、協助智能合約，也做客戶開發。這個專案跟許多野心勃勃的 dApp 一樣，難逃供應面的老問題，現在已經幾乎一文不值了。專案的目標是把碳權代幣化，我很喜歡這個想法，因為它是在對抗企業的漂綠行為，而非只做表面改變，同時建立一個以碳勞動為基礎的新經濟。想像一種貨幣不建立在金本位或中央銀行之上，而是建立在你對世界課稅的多寡上，這實在既大膽又有趣。管理結構完全民主、去中心化，可惜終究還是敗給了錢。" },
    "zh-Hans": { description: "这是一个我很感兴趣的 dApp，所以我加入了他们的 DAO 帮忙。我负责前端、协助智能合约，也做客户开发。这个项目跟许多野心勃勃的 dApp 一样，难逃供应面的老问题，现在已经几乎一文不值了。项目的目标是把碳权代币化，我很喜欢这个想法，因为它是在对抗企业的漂绿行为，而非只做表面改变，同时建立一个以碳劳动为基础的新经济。想象一种货币不建立在金本位或中央银行之上，而是建立在你对世界征税的多寡上，这实在既大胆又有趣。管理结构完全民主、去中心化，可惜终究还是败给了钱。" }
  },
  67: {
    "zh-Hant": { description: "這是我和 PCS Berkeley 一起做的 app。這個 app 讓使用者填一份問卷，然後自動幫他們報名所有符合資格的福利計畫。做起來很有趣。爬取和整理政府的索引資料幾乎是不可能的任務，而要讓問卷本身能在前面題目已使後面題目失去意義時自動跳過，也很困難。這是我在 PCS 的第一個專案，能做這個我真的很開心。" },
    "zh-Hans": { description: "这是我和 PCS Berkeley 一起做的 app。这个 app 让用户填一份问卷，然后自动帮他们报名所有符合资格的福利计划。做起来很有趣。爬取和整理政府的索引数据几乎是不可能的任务，而要让问卷本身能在前面题目已使后面题目失去意义时自动跳过，也很困难。这是我在 PCS 的第一个项目，能做这个我真的很开心。" }
  },
  68: {
    "zh-Hant": { description: "我第一份 web3 工作。當網頁開發者，學到了 web3/defi 的正式生產開發環境。Trueflation 是一個另類的通膨追蹤工具，原本要做成穩定幣，後來變成只是一個帶治理代幣的通膨預言機。Trusted Node 則是一個質押池聚合器，為 POS 幣種提供面向消費者的質押池。" },
    "zh-Hans": { description: "我第一份 web3 工作。当网页开发者，学到了 web3/defi 的正式生产开发环境。Trueflation 是一个另类的通胀追踪工具，本来要做成稳定币，后来变成只是一个带治理代币的通胀预言机。Trusted Node 则是一个质押池聚合器，为 POS 币种提供面向消费者的质押池。" }
  },
  69: {
    "zh-Hant": { description: "Voiijer 是一個支援多模態貼文的社群媒體 app。它的定位是探險家的社群媒體，讓他們可以創作關於自己旅程的故事。我做了這個 app 的登陸頁，並在技術棧和區塊鏈／數位資產策略上提供建議。人都很好。" },
    "zh-Hans": { description: "Voiijer 是一个支持多模态帖子的社交媒体 app。它的定位是探险家的社交媒体，让他们可以创作关于自己旅程的故事。我做了这个 app 的落地页，并在技术栈和区块链／数字资产策略上提供建议。人都很好。" }
  },
  70: {
    "zh-Hant": { title: "Aura Care Health", description: "一個醫療科技平台，提供創新的照護解決方案和病患管理系統。" },
    "zh-Hans": { title: "Aura Care Health", description: "一个医疗科技平台，提供创新的护理解决方案和患者管理系统。" }
  },
  71: {
    "zh-Hant": { description: "一個網頁 app，用 Floyd-Steinberg 演算法把你的圖片轉換成 Nord 配色。是為我的 hyprland 設定做的。" },
    "zh-Hans": { description: "一个网页 app，用 Floyd-Steinberg 算法把你的图片转换成 Nord 配色。是为我的 hyprland 配置做的。" }
  },
};

// Single responsibility: localise a project title, falling back to the original.
export function localizeProjectTitle(id: number, fallback: string, locale: LocaleCode): string {
  return projectOverrides[id]?.[locale]?.title ?? fallback;
}

// Single responsibility: localise a project description, falling back to the original.
export function localizeProjectDescription(
  id: number,
  fallback: string,
  locale: LocaleCode
): string {
  return projectOverrides[id]?.[locale]?.description ?? fallback;
}
