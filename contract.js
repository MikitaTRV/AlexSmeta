const STORAGE_KEY = "alexsmeta.contracts.v1";
const SITE_VERSION = "1.0.1";

const MONTH_NUM = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

const MONTHS = {
  января: "января",
  январь: "января",
  февраля: "февраля",
  февраль: "февраля",
  марта: "марта",
  март: "марта",
  апреля: "апреля",
  апрель: "апреля",
  мая: "мая",
  май: "мая",
  июня: "июня",
  июнь: "июня",
  июля: "июля",
  июль: "июля",
  августа: "августа",
  август: "августа",
  сентября: "сентября",
  сентябрь: "сентября",
  октября: "октября",
  октябрь: "октября",
  ноября: "ноября",
  ноябрь: "ноября",
  декабря: "декабря",
  декабрь: "декабря",
};

const CONTRACT_FIELDS = [
  [/^(номер договора|номер)$/, "number"],
  [/^город$/, "city"],
  [/^(дата договора|дата заключения|дата)$/, "date"],
  [/^(тип исполнителя|тип|форма|статус)$/, "template"],
  [/^(процент вознаграждения|размер вознаграждения|вознаграждение|процент|комиссия)$/, "percent"],
  [/^(число отчета|дата отчета|отчет до|отчет)$/, "reportDay"],
  [/^(число выплаты|дата выплаты|выплата до|срок выплаты|выплата|оплата)$/, "payDay"],
  [/^(действует до|дата окончания|срок действия|окончание|срок до|срок)$/, "endDate"],
  [/^(срок уведомления|уведомление за|уведомление|расторжение)$/, "noticeDays"],
];

const PARTY_FIELDS = [
  [/^фио(\/наименование)?$/, "name"],
  [/^(наименование|название|имя|организация|компания)$/, "name"],
  [/^унп$/, "unp"],
  [/^адрес$/, "address"],
  [/^(телефон|тел)$/, "phone"],
  [/^(email|e-mail|почта|электронная почта)$/, "email"],
  [/^(банк|банковские реквизиты|реквизиты|расчетный счет)$/, "bank"],
  [/^(паспорт|паспортные данные)$/, "passport"],
];

const FIELD_LABELS = {
  number: "номер",
  city: "город",
  date: "дата",
  template: "тип исполнителя",
  percent: "процент",
  reportDay: "число отчёта",
  payDay: "число выплаты",
  endDate: "срок действия",
  noticeDays: "срок уведомления",
  "customer.name": "заказчик",
  "customer.unp": "УНП заказчика",
  "customer.address": "адрес заказчика",
  "customer.phone": "телефон заказчика",
  "customer.email": "email заказчика",
  "customer.bank": "банк заказчика",
  "executor.name": "исполнитель",
  "executor.unp": "УНП исполнителя",
  "executor.passport": "паспорт",
  "executor.address": "адрес исполнителя",
  "executor.phone": "телефон исполнителя",
  "executor.email": "email исполнителя",
  "executor.bank": "банк исполнителя",
};

const PASTE_GUIDE = `Номер:
Город:
Дата: дд.мм.гггг
Тип: ИП или НПД

Процент:
Отчёт: число месяца
Выплата: число месяца
Действует до: дд.мм.гггг
Уведомление: дней

Заказчик
ФИО / наименование:
УНП:
Адрес:
Телефон:
Email:
Банковские реквизиты:

Исполнитель
ФИО:
УНП:
Паспорт: для самозанятого
Адрес:
Телефон:
Email:
Банковские реквизиты:`;

const PASTE_SAMPLE = `Номер: 12
Город: Минск
Дата: 30.09.2026
Тип: ИП

Процент: 10
Отчёт: 5
Выплата: 10
Действует до: 31.12.2026
Уведомление: 14

Заказчик
ФИО / наименование: ООО «Ромашка»
УНП: 193000001
Адрес: г. Минск, ул. Примерная, 1
Телефон: +375 29 000-00-00
Email: client@example.com
Банковские реквизиты: р/с BY00ALFA30120000000000000000, ЗАО «Альфа-Банк», БИК ALFABY2X

Исполнитель
ФИО: Иван Иванов
УНП: 123456789
Паспорт: MP1234567
Адрес: г. Минск, ул. Ленина, 2-3
Телефон: +375 33 000-00-00
Email: ivan@example.com
Банковские реквизиты: р/с BY11BPSB30120000000000000000, ОАО «БПС-Сбербанк», БИК BPSBBY2X`;

const CLAUSES = [
  "1. Предмет договора",
  "1.1. Исполнитель обязуется по заданию Заказчика оказывать рекламные, маркетинговые и услуги по продвижению товаров, услуг, бренда, интернет-магазина, аккаунтов и иных объектов деятельности Заказчика, а Заказчик обязуется принимать оказанные услуги и выплачивать Исполнителю вознаграждение.",
  "1.2. Исполнитель вправе осуществлять продвижение товаров и услуг, привлечение потенциальных покупателей, создание и размещение рекламных материалов, публикаций, обзоров и рекомендаций, продвижение посредством социальных сетей и иных интернет-площадок, использование промокодов, реферальных ссылок и иных инструментов отслеживания продаж.",
  "1.3. Исполнитель самостоятельно определяет способы, последовательность и методы оказания услуг, если иное не согласовано Сторонами.",
  "1.4. Размер вознаграждения, рекламируемые товары, промокоды, ссылки и способы отслеживания продаж могут согласовываться в настоящем Договоре, приложениях, электронной почте или согласованных мессенджерах.",
  "1.5. Электронная переписка признаётся надлежащим способом согласования рабочих условий, если из неё однозначно следует содержание договорённости.",
  "2. Права и обязанности Исполнителя",
  "2.1. Исполнитель обязуется добросовестно оказывать согласованные услуги, использовать согласованные способы идентификации привлечённых покупателей, предоставлять необходимую информацию о проведённых рекламных мероприятиях и соблюдать конфиденциальность.",
  "2.2. Исполнитель вправе самостоятельно выбирать способы продвижения; получать необходимую информацию и материалы; запрашивать сведения о количестве и стоимости привлечённых продаж; использовать собственные рекламные площадки и аккаунты; приостанавливать продвижение при нарушении порядка выплаты вознаграждения или непредоставлении необходимой информации.",
  "3. Права и обязанности Заказчика",
  "3.1. Заказчик обязуется предоставлять достоверную информацию о товарах и услугах, цены, характеристики, наличие и условия продажи; предоставлять промокоды, реферальные ссылки и иные инструменты отслеживания; своевременно предоставлять информацию о продажах; не изменять без уведомления Исполнителя способы отслеживания, если это препятствует определению привлечённых продаж; своевременно выплачивать вознаграждение.",
  "3.2. Заказчик вправе получать информацию о продвижении, предлагать товары или услуги для продвижения и требовать прекращения использования отдельных рекламных материалов.",
  "4. Вознаграждение Исполнителя",
  "4.1. Вознаграждение Исполнителя устанавливается исключительно в виде процента от стоимости продаж, привлечённых в результате оказания услуг. Фиксированная плата за услуги по настоящему Договору не устанавливается.",
  "4.2. Размер вознаграждения составляет {{percent}} от стоимости соответствующих продаж.",
  "4.3. Привлечённой продажей считается продажа покупателю, совершённая с использованием предоставленного Исполнителем промокода, реферальной ссылки либо иного согласованного способа идентификации.",
  "4.4. Вознаграждение рассчитывается исходя из фактически оплаченной покупателем суммы.",
  "4.5. Отменённые и полностью возвращённые заказы, а также возвращённые покупателю суммы, в расчёт не включаются.",
  "4.6. При частичном возврате вознаграждение пересчитывается пропорционально фактически сохранённой Заказчиком сумме.",
  "4.7. Если вознаграждение уже выплачено, а заказ впоследствии возвращён, соответствующая сумма учитывается при следующем расчёте.",
  "4.8. Каждый согласованный способ отслеживания является основанием для отнесения продажи к привлечённым Исполнителем.",
  "5. Учёт и подтверждение продаж",
  "5.1. Заказчик обязан вести учёт продаж, совершённых с использованием предоставленных Исполнителем инструментов отслеживания.",
  "5.2. Не позднее {{reportDay}} числа месяца, следующего за расчётным, Заказчик предоставляет Исполнителю информацию о количестве привлечённых продаж, их стоимости, возвратах и отменах и итоговой сумме для расчёта вознаграждения.",
  "5.3. По требованию Исполнителя Заказчик предоставляет сведения, позволяющие проверить правильность расчёта вознаграждения, без раскрытия персональных данных покупателей сверх необходимого.",
  "5.4. Данные автоматизированных систем отслеживания продаж могут использоваться для расчёта вознаграждения.",
  "5.5. Заказчик не вправе умышленно скрывать, удалять или изменять сведения о продажах, совершённых с использованием инструментов Исполнителя.",
  "6. Порядок выплаты вознаграждения",
  "6.1. Расчётным периодом является календарный месяц, если Стороны не согласовали иной период.",
  "6.2. Вознаграждение выплачивается не позднее {{payDay}} числа месяца, следующего за расчётным.",
  "6.3. Выплата производится на банковский счёт Исполнителя либо иным способом, не противоречащим законодательству Республики Беларусь.",
  "6.4. Исполнитель самостоятельно исполняет налоговые обязательства в соответствии с законодательством Республики Беларусь.",
  "7. Результаты продвижения",
  "7.1. Исполнитель не гарантирует определённое количество продаж, заказов, заявок, подписчиков, просмотров, охватов или иной конкретный коммерческий результат.",
  "7.2. Вознаграждение зависит от фактического количества и стоимости привлечённых продаж.",
  "7.3. Результативность может зависеть от цены, качества и характеристик товаров или услуг, спроса, наличия товара, условий доставки, репутации Заказчика, сезонности, действий конкурентов, алгоритмов социальных сетей и иных обстоятельств, не зависящих от Исполнителя.",
  "7.4. Исполнитель не несёт ответственности за невозможность продажи вследствие отсутствия товара, изменения цен, прекращения работы сайта или аккаунта Заказчика, технических проблем либо иных обстоятельств, возникших не по вине Исполнителя.",
  "8. Интеллектуальная собственность",
  "8.1. Если Исполнитель создаёт рекламные тексты, изображения, видео, дизайн или иные материалы, порядок передачи прав на их использование определяется Сторонами отдельно.",
  "8.2. Если иное не согласовано, после полной выплаты вознаграждения Заказчик получает право использовать созданные специально для него материалы в целях продвижения собственной деятельности.",
  "8.3. Исполнитель вправе использовать созданные им материалы в портфолио, если Заказчик письменно не запретил такое использование.",
  "9. Ответственность сторон",
  "9.1. Стороны несут ответственность в соответствии с законодательством Республики Беларусь и настоящим Договором.",
  "9.2. Заказчик отвечает за достоверность информации о товарах и услугах и их законность.",
  "9.3. Исполнитель не отвечает за последствия использования недостоверной информации, предоставленной Заказчиком.",
  "9.4. Исполнитель не отвечает за блокировку, изменение алгоритмов или прекращение работы сторонних сервисов, если это произошло не по его вине.",
  "10. Срок действия и расторжение",
  "10.1. Договор вступает в силу с момента подписания и действует до {{endDate}}",
  "10.2. Каждая Сторона вправе досрочно расторгнуть Договор, уведомив другую Сторону не менее чем за {{noticeDays}} календарных дней.",
  "10.3. При прекращении Договора Заказчик обязан выплатить вознаграждение за продажи, совершённые до даты прекращения, а также за продажи, привлечённые Исполнителем до даты прекращения, но оплаченные покупателями после неё, если продажа подтверждается согласованным инструментом отслеживания.",
  "10.4. После прекращения Договора Заказчик обязан сохранить сведения, необходимые для определения таких продаж.",
  "11. Конфиденциальность",
  "11.1. Стороны обязуются не разглашать третьим лицам конфиденциальную информацию, полученную в связи с исполнением Договора.",
  "11.2. Информация, находящаяся в открытом доступе, конфиденциальной не считается.",
  "12. Электронное взаимодействие",
  "12.1. Стороны признают юридически значимым обмен информацией посредством электронной почты и согласованных мессенджеров.",
  "12.2. Размер процента, рекламируемые товары, промокоды, ссылки и иные рабочие условия могут согласовываться посредством электронной переписки.",
  "12.3. Сообщения с согласованных номеров телефонов и адресов электронной почты признаются направленными соответствующей Стороной, если не доказано иное.",
  "13. Разрешение споров",
  "13.1. Стороны стремятся разрешать споры путём переговоров.",
  "13.2. При невозможности урегулирования спор разрешается в порядке, установленном законодательством Республики Беларусь.",
  "14. Реквизиты и подписи сторон",
];

const FORM_SECTIONS = [
  {
    title: "Договор",
    fields: [
      { path: "number", label: "Номер" },
      { path: "city", label: "Город" },
      { path: "date", label: "Дата", placeholder: "30.09.2026" },
      { path: "percent", label: "Процент, %" },
      { path: "reportDay", label: "Отчёт, число месяца" },
      { path: "payDay", label: "Выплата, число месяца" },
      { path: "endDate", label: "Действует до", placeholder: "31.12.2026" },
      { path: "noticeDays", label: "Уведомление, дней" },
    ],
  },
  {
    title: "Заказчик",
    fields: [
      { path: "customer.name", label: "ФИО / наименование", wide: true },
      { path: "customer.unp", label: "УНП" },
      { path: "customer.phone", label: "Телефон" },
      { path: "customer.email", label: "Email", wide: true },
      { path: "customer.address", label: "Адрес", wide: true },
      { path: "customer.bank", label: "Банковские реквизиты", wide: true, multiline: true },
    ],
  },
  {
    title: "Исполнитель",
    fields: [
      { path: "executor.name", label: "ФИО", wide: true },
      { path: "executor.unp", label: "УНП" },
      { path: "executor.passport", label: "Паспорт", wide: true, npdOnly: true },
      { path: "executor.phone", label: "Телефон" },
      { path: "executor.email", label: "Email", wide: true },
      { path: "executor.address", label: "Адрес", wide: true },
      { path: "executor.bank", label: "Банковские реквизиты", wide: true, multiline: true },
    ],
  },
];

function uid() {
  return `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

function escapeHtml(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function escapeAttr(s) {
  return escapeHtml(s).replace(/`/g, "&#96;");
}

function qs(sel, root = document) {
  const node = root.querySelector(sel);
  if (!node) throw new Error(`Не найден элемент: ${sel}`);
  return node;
}

function storageGet(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function storageSet(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Safari private / quota
  }
}

function fmtDate(ts) {
  const d = new Date(ts);
  return `${d.toLocaleDateString("ru-RU")} ${d.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}`;
}

function emptyParty() {
  return { name: "", unp: "", passport: "", address: "", phone: "", email: "", bank: "" };
}

function makeEmptyContract() {
  return {
    id: uid(),
    updatedAt: Date.now(),
    template: "npd",
    number: "",
    city: "",
    date: "",
    percent: "",
    reportDay: "",
    payDay: "",
    endDate: "",
    noticeDays: "",
    customer: emptyParty(),
    executor: emptyParty(),
    sourceFileName: "",
    sourceParagraphs: [],
    sourceNote: "",
  };
}

function normalizeParty(p) {
  const src = p && typeof p === "object" ? p : {};
  return {
    name: String(src.name ?? ""),
    unp: String(src.unp ?? ""),
    passport: String(src.passport ?? ""),
    address: String(src.address ?? ""),
    phone: String(src.phone ?? ""),
    email: String(src.email ?? ""),
    bank: String(src.bank ?? ""),
  };
}

function normalizeContract(c) {
  const template = c?.template === "ip" ? "ip" : "npd";
  return {
    id: c?.id ?? uid(),
    updatedAt: c?.updatedAt ?? Date.now(),
    template,
    number: String(c?.number ?? ""),
    city: String(c?.city ?? ""),
    date: String(c?.date ?? ""),
    percent: String(c?.percent ?? ""),
    reportDay: String(c?.reportDay ?? ""),
    payDay: String(c?.payDay ?? ""),
    endDate: String(c?.endDate ?? ""),
    noticeDays: String(c?.noticeDays ?? ""),
    customer: normalizeParty(c?.customer),
    executor: normalizeParty(c?.executor),
    sourceFileName: String(c?.sourceFileName ?? ""),
    sourceParagraphs: Array.isArray(c?.sourceParagraphs) ? c.sourceParagraphs.map((p) => String(p)).filter((p) => p.trim()) : [],
    sourceNote: String(c?.sourceNote ?? ""),
  };
}

function loadState() {
  try {
    const raw = storageGet(STORAGE_KEY);
    if (!raw) return { contracts: [], selectedId: null };
    const parsed = JSON.parse(raw);
    const contracts = Array.isArray(parsed?.contracts) ? parsed.contracts.map(normalizeContract) : [];
    const selectedId = contracts.some((c) => c.id === parsed?.selectedId) ? parsed.selectedId : contracts[0]?.id ?? null;
    return { contracts, selectedId };
  } catch {
    return { contracts: [], selectedId: null };
  }
}

function saveState(state) {
  storageSet(STORAGE_KEY, JSON.stringify(state));
}

function contractTitle(c) {
  const num = String(c?.number ?? "").trim();
  const who = String(c?.customer?.name ?? "").trim();
  if (num && who) return `Договор № ${num} — ${who}`;
  if (num) return `Договор № ${num}`;
  if (who) return who;
  return "Новый договор";
}

function templateLabel(template) {
  return template === "ip" ? "ИП" : "Самозанятый";
}

function getPath(obj, path) {
  return path.split(".").reduce((o, key) => (o == null ? "" : o[key]), obj) ?? "";
}

function setPath(obj, path, value) {
  const keys = path.split(".");
  let cur = obj;
  for (let i = 0; i < keys.length - 1; i += 1) {
    if (!cur[keys[i]] || typeof cur[keys[i]] !== "object") cur[keys[i]] = {};
    cur = cur[keys[i]];
  }
  cur[keys[keys.length - 1]] = value;
}

function normKey(s) {
  return String(s ?? "")
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/[«»"“”]/g, "")
    .replace(/\s*\/\s*/g, "/")
    .replace(/[.:]+$/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function splitKeyValue(line) {
  const colon = line.match(/^([^:]{1,80}):\s*(.*)$/);
  if (colon) return { key: colon[1].trim(), value: colon[2].trim() };
  const dash = line.match(/^(.{1,80}?)\s+[—–-]\s+(.*)$/);
  if (dash) return { key: dash[1].trim(), value: dash[2].trim() };
  return null;
}

function splitLooseLabel(line) {
  const m = line.match(/^(унп|телефон|тел\.?|адрес|паспорт|email|e-mail|почта|процент|город|номер)\s+(.+)$/i);
  if (!m) return null;
  return { key: m[1], value: m[2].trim() };
}

function partyFieldOf(key) {
  const k = normKey(key);
  for (const [re, field] of PARTY_FIELDS) {
    if (re.test(k)) return field;
  }
  return null;
}

function matchContractField(key) {
  const k = normKey(key);
  for (const [re, field] of CONTRACT_FIELDS) {
    if (re.test(k)) return field;
  }
  return null;
}

function splitScope(key) {
  const k = normKey(key);
  const pref = k.match(/^(?:реквизиты\s+)?(заказчика?|исполнителя?)\s+(.+)$/);
  if (pref) {
    return {
      scope: pref[1].startsWith("заказчик") ? "customer" : "executor",
      rest: pref[2],
    };
  }
  const suf = k.match(/^(.+?)\s+(заказчика|исполнителя)$/);
  if (suf) {
    return {
      scope: suf[2].startsWith("заказчик") ? "customer" : "executor",
      rest: suf[1],
    };
  }
  if (/^(?:реквизиты\s+)?заказчик$/.test(k)) return { scope: "customer", rest: "" };
  if (/^(?:реквизиты\s+)?исполнитель$/.test(k)) return { scope: "executor", rest: "" };
  return { scope: null, rest: k };
}

function parseTemplateValue(value) {
  const s = normKey(value);
  if (!s) return null;
  if (/нпд|самозан|профессиональн|физлиц|физическ/.test(s)) return "npd";
  if (/(^|\s)ип($|\s)|индивидуальн|предпринимател/.test(s)) return "ip";
  return null;
}

function stripExecutorTitle(name) {
  const m = String(name).trim().match(/^(ип|индивидуальный предприниматель)\s+(.+)$/i);
  if (!m) return { template: null, name: String(name).trim() };
  return { template: "ip", name: m[2].trim() };
}

function cleanPercent(value) {
  const m = String(value).match(/\d+(?:[.,]\d+)?/);
  return m ? m[0] : "";
}

function cleanInt(value) {
  const m = String(value).match(/\d{1,3}/);
  return m ? String(Number(m[0])) : "";
}

function cleanCity(value) {
  return String(value)
    .replace(/^город\s+/i, "")
    .replace(/^г\.\s*/i, "")
    .trim();
}

function cleanNumber(value) {
  return String(value)
    .replace(/^№\s*/, "")
    .replace(/^договор\s*/i, "")
    .trim();
}

function extractDateToken(value) {
  const m = String(value).match(/\d{1,2}[./]\d{1,2}[./]\d{2,4}|\d{1,2}\s+[а-яё]+\s+\d{2,4}/i);
  return m ? m[0] : String(value).trim();
}

function classifyTerm(value) {
  if (parseDate(value) || /\d{1,2}[./]\d{1,2}/.test(value) || /январ|феврал|март|апрел|ма[йя]|июн|июл|август|сентябр|октябр|ноябр|декабр/i.test(value)) {
    return "endDate";
  }
  return "noticeDays";
}

function looksPacked(value) {
  return value.includes(",") && /унп|e-?mail|@|адрес|телефон|тел\.?|паспорт|банк|реквизит/i.test(value);
}

function splitPackedParty(value) {
  const chunks = String(value).split(
    /\s*,\s*(?=(?:банковские реквизиты|реквизиты|телефон|паспорт|адрес|унп|e-mail|email|почта|тел\.?|банк)(?:\s|:|$))/i
  );
  const result = {};
  chunks.forEach((chunk, index) => {
    const piece = chunk.trim();
    if (!piece) return;
    const kv = splitKeyValue(piece) || splitLooseLabel(piece);
    if (kv) {
      const field = partyFieldOf(kv.key);
      if (field) {
        result[field] = kv.value;
        return;
      }
    }
    if (index === 0 && !result.name) result.name = piece;
  });
  return result;
}

function parseDate(raw) {
  const s = String(raw ?? "")
    .trim()
    .replace(/[«»"]/g, "")
    .replace(/\s+/g, " ");
  if (!s) return null;
  let m = s.match(/(\d{1,2})[./](\d{1,2})[./](\d{2,4})/);
  if (m) return dateParts(m[1], MONTH_NUM[Number(m[2]) - 1], m[3]);
  m = s.match(/(\d{1,2})\s+([а-яё]+)\s+(\d{2,4})/i);
  if (m) {
    const month = MONTHS[m[2].toLowerCase().replace(/ё/g, "е")];
    if (month) return dateParts(m[1], month, m[3]);
  }
  return null;
}

function dateParts(day, month, year) {
  if (!month) return null;
  const d = Number(day);
  if (!Number.isFinite(d) || d < 1 || d > 31) return null;
  let y = String(year);
  if (y.length === 2) y = String(2000 + Number(y));
  return { day: String(d), month, year: y };
}

function parseContractPaste(text) {
  const patch = {
    number: "",
    city: "",
    date: "",
    template: "",
    percent: "",
    reportDay: "",
    payDay: "",
    endDate: "",
    noticeDays: "",
    customer: emptyParty(),
    executor: emptyParty(),
  };
  const filled = [];
  let section = "contract";
  let last = null;

  function write(path, value, mode = "set") {
    let next = String(value ?? "").trim();
    if (!next) return;
    if (mode === "append") {
      const cur = String(getPath(patch, path) ?? "").trim();
      if (cur) next = `${cur}\n${next}`;
    }
    setPath(patch, path, next);
    const label = FIELD_LABELS[path];
    if (label && !filled.includes(label)) filled.push(label);
    last = { path, multiline: /(address|bank|passport)$/.test(path) };
  }

  function applyContract(field, key, value) {
    if (field === "template") {
      const template = parseTemplateValue(value);
      if (template) write("template", template);
      return;
    }
    let target = field;
    if (normKey(key) === "срок") target = classifyTerm(value);
    if (target === "percent") write("percent", cleanPercent(value));
    else if (target === "reportDay" || target === "payDay" || target === "noticeDays") write(target, cleanInt(value));
    else if (target === "date" || target === "endDate") write(target, extractDateToken(value));
    else if (target === "city") write("city", cleanCity(value));
    else if (target === "number") write("number", cleanNumber(value));
    else write(target, value);
  }

  function applyParty(scope, field, value, unpacked = false) {
    const path = `${scope}.${field}`;
    if (field === "name" && !unpacked && looksPacked(value)) {
      const packed = splitPackedParty(value);
      const entries = Object.entries(packed);
      const separated = entries.some(([packedField]) => packedField !== "name");
      if (separated) {
        entries.forEach(([packedField, packedValue]) => applyParty(scope, packedField, packedValue, true));
        return;
      }
    }
    if (field === "name" && scope === "executor") {
      const stripped = stripExecutorTitle(value);
      if (stripped.template) write("template", stripped.template);
      write(path, stripped.name);
      return;
    }
    const existing = String(getPath(patch, path) ?? "").trim();
    const multiline = field === "address" || field === "bank" || field === "passport";
    write(path, value, multiline && existing ? "append" : "set");
  }

  function tryBare(line) {
    let m = line.match(/^договор\s*№\s*(.+)$/i);
    if (m) {
      write("number", cleanNumber(m[1]));
      return true;
    }
    m = line.match(/^г\.?\s+(.{2,40})$/i);
    if (m && !/:/.test(m[1])) {
      write("city", cleanCity(m[1]));
      return true;
    }
    if (/^\d+(?:[.,]\d+)?\s*%$/.test(line)) {
      write("percent", cleanPercent(line));
      return true;
    }
    if (section === "customer" || section === "executor") {
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(line)) {
        write(`${section}.email`, line);
        return true;
      }
      if (/^\+?\d[\d\s()-]{8,}$/.test(line)) {
        write(`${section}.phone`, line.trim());
        return true;
      }
      if (/^\d{9}$/.test(line)) {
        write(`${section}.unp`, line);
        return true;
      }
    }
    return false;
  }

  String(text ?? "")
    .replace(/\r/g, "")
    .split("\n")
    .forEach((raw) => {
      const line = raw.trim();
      if (!line || /^[-—=_]{3,}$/.test(line)) return;
      const bareScope = splitScope(line);
      if ((bareScope.scope === "customer" || bareScope.scope === "executor") && !bareScope.rest && !line.includes(":")) {
        section = bareScope.scope;
        last = null;
        return;
      }
      if (/^(договор|условия)$/.test(normKey(line))) {
        section = "contract";
        last = null;
        return;
      }
      const kv = splitKeyValue(line) || splitLooseLabel(line);
      if (!kv) {
        if (tryBare(line)) return;
        if (last?.multiline) write(last.path, line, "append");
        return;
      }

      const scoped = splitScope(kv.key);
      if (!kv.value && (scoped.scope === "customer" || scoped.scope === "executor") && !scoped.rest) {
        section = scoped.scope;
        last = null;
        return;
      }
      if (!kv.value && /^(договор|условия)$/.test(normKey(kv.key))) {
        section = "contract";
        last = null;
        return;
      }

      const contractField = matchContractField(scoped.rest || kv.key);
      const prefixedParty = scoped.scope && (scoped.rest ? partyFieldOf(scoped.rest) : "name");
      if (contractField && !prefixedParty) {
        applyContract(contractField, kv.key, kv.value);
        return;
      }

      if (scoped.scope) section = scoped.scope;
      const field = scoped.rest ? partyFieldOf(scoped.rest) : scoped.scope ? "name" : partyFieldOf(kv.key);
      const scope = scoped.scope || (section === "customer" || section === "executor" ? section : null);
      if (field === "passport" && !scope) {
        applyParty("executor", "passport", kv.value);
        return;
      }
      if (field && scope) {
        applyParty(scope, field, kv.value);
        return;
      }
      if (last?.multiline) write(last.path, line, "append");
    });

  return { patch, filled };
}

function applyPatch(draft, patch) {
  ["number", "city", "date", "template", "percent", "reportDay", "payDay", "endDate", "noticeDays"].forEach((key) => {
    if (patch[key]) draft[key] = patch[key];
  });
  ["customer", "executor"].forEach((scope) => {
    Object.entries(patch[scope]).forEach(([key, value]) => {
      if (value) draft[scope][key] = value;
    });
  });
}

function missingLabels(contract) {
  const items = [
    ["number", "номер"],
    ["city", "город"],
    ["date", "дата"],
    ["percent", "процент"],
    ["reportDay", "число отчёта"],
    ["payDay", "число выплаты"],
    ["endDate", "срок действия"],
    ["noticeDays", "срок уведомления"],
    ["customer.name", "заказчик"],
    ["customer.unp", "УНП заказчика"],
    ["executor.name", "исполнитель"],
    ["executor.unp", "УНП исполнителя"],
  ];
  if (contract.template !== "ip") items.push(["executor.passport", "паспорт"]);
  return items.filter(([path]) => !String(getPath(contract, path) ?? "").trim()).map(([, label]) => label);
}

function fill(value, placeholder = "__________") {
  const v = String(value ?? "").trim();
  if (!v) return `<span class="blank">${escapeHtml(placeholder)}</span>`;
  return `<span class="filled">${escapeHtml(v)}</span>`;
}

function dateHtml(raw) {
  const parsed = parseDate(raw);
  if (!parsed) {
    if (String(raw ?? "").trim()) return `${fill(String(raw).trim())}`;
    return `«${fill("", "___")}» ${fill("", "__________")} 20${fill("", "__")} г.`;
  }
  return `«${fill(parsed.day, "___")}» ${fill(parsed.month, "__________")} ${fill(parsed.year, "20__")} г.`;
}

function tokenHtml(name, contract) {
  if (name === "percent") return `${fill(contract.percent, "_____")} %`;
  if (name === "reportDay" || name === "payDay" || name === "noticeDays") return fill(contract[name], "___");
  if (name === "endDate") return dateHtml(contract.endDate);
  return "";
}

function renderClause(text, contract) {
  return text
    .split(/(\{\{[a-zA-Z]+\}\})/)
    .map((part) => {
      const token = part.match(/^\{\{([a-zA-Z]+)\}\}$/);
      if (!token) return escapeHtml(part);
      return tokenHtml(token[1], contract);
    })
    .join("");
}

function isHeading(text) {
  return /^\d+\.\s+\D/.test(text);
}

function preambleHtml(contract) {
  const customer = fill(contract.customer.name);
  const executor = fill(contract.executor.name);
  if (contract.template === "ip") {
    return `${customer}, именуемый в дальнейшем «Заказчик», с одной стороны, и Индивидуальный предприниматель ${executor}, УНП ${fill(contract.executor.unp)}, именуемый в дальнейшем «Исполнитель», с другой стороны, совместно именуемые «Стороны», заключили настоящий Договор.`;
  }
  return `${customer}, именуемый в дальнейшем «Заказчик», с одной стороны, и ${executor}, паспорт: ${fill(contract.executor.passport)}, УНП: ${fill(contract.executor.unp)}, применяющий специальный налоговый режим «Налог на профессиональный доход», именуемый в дальнейшем «Исполнитель», с другой стороны, совместно именуемые «Стороны», заключили настоящий Договор.`;
}

function partyRequisites(title, lines) {
  return `<div class="req-col"><p class="clause clause-h">${title}</p>${lines.map((line) => `<p class="clause">${line}</p>`).join("")}</div>`;
}

function requisitesHtml(contract) {
  const customer = contract.customer;
  const executor = contract.executor;
  const customerCol = partyRequisites("ЗАКАЗЧИК", [
    `ФИО / наименование: ${fill(customer.name)}`,
    `УНП: ${fill(customer.unp)}`,
    `Адрес: ${fill(customer.address)}`,
    `Телефон: ${fill(customer.phone)}`,
    `E-mail: ${fill(customer.email)}`,
    `Банковские реквизиты: ${fill(customer.bank)}`,
    `Подпись: ${fill("", "_________________________")}`,
  ]);
  const executorLines =
    contract.template === "ip"
      ? [
          `ИП ${fill(executor.name)}`,
          `УНП: ${fill(executor.unp)}`,
          `Адрес: ${fill(executor.address)}`,
          `Телефон: ${fill(executor.phone)}`,
          `E-mail: ${fill(executor.email)}`,
          `Банковские реквизиты: ${fill(executor.bank)}`,
          `Подпись: ${fill("", "_________________________")}`,
        ]
      : [
          `ФИО: ${fill(executor.name)}`,
          `УНП: ${fill(executor.unp)}`,
          `Паспорт: ${fill(executor.passport)}`,
          `Адрес: ${fill(executor.address)}`,
          `Телефон: ${fill(executor.phone)}`,
          `E-mail: ${fill(executor.email)}`,
          `Банковские реквизиты: ${fill(executor.bank)}`,
          "Налоговый режим: налог на профессиональный доход",
          `Подпись: ${fill("", "_________________________")}`,
        ];
  return `<div class="req-grid">${customerCol}${partyRequisites("ИСПОЛНИТЕЛЬ", executorLines)}</div>`;
}

const W_NS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";

function markValue(value) {
  const v = String(value ?? "").trim();
  if (!v) return "";
  return `\u0001${v}\u0002`;
}

function subBlank(text, re, value, label, ctx, whole) {
  const token = markValue(value);
  if (!token) return text;
  const probe = new RegExp(re.source, re.flags);
  if (!probe.test(text)) return text;
  if (!ctx.labels.includes(label)) ctx.labels.push(label);
  return text.replace(new RegExp(re.source, re.flags), (match, prefix) => {
    if (typeof prefix === "string" && match.startsWith(prefix)) return prefix + token;
    if (whole) return token;
    return match.replace(/_{2,}/, token);
  });
}

function plainDate(raw) {
  const parsed = parseDate(raw);
  if (!parsed) return String(raw ?? "").trim();
  return `«${parsed.day}» ${parsed.month} ${parsed.year}`;
}

function splitContracts(paragraphs) {
  const parts = [];
  let current = [];
  paragraphs.forEach((paragraph) => {
    if (/^ДОГОВОР\s*№/i.test(paragraph.trim()) && current.length) {
      parts.push(current);
      current = [paragraph];
      return;
    }
    current.push(paragraph);
  });
  if (current.length) parts.push(current);
  return parts;
}

function partKind(paragraphs) {
  const text = paragraphs.join("\n").toLowerCase().replace(/ё/g, "е");
  const ip = /индивидуальн[а-я]* предприниматель/.test(text);
  const npd = /профессиональн[а-я]* доход/.test(text);
  if (ip && !npd) return "ip";
  if (npd && !ip) return "npd";
  return "unknown";
}

function choosePart(parts, template) {
  if (!parts.length) return [];
  if (parts.length === 1) return parts[0];
  const match = parts.find((part) => partKind(part) === template);
  return match || parts[0];
}

function updateSection(text, section) {
  const line = text.trim();
  if (/^заказчик$/i.test(line)) return "customer";
  if (/^исполнитель$/i.test(line)) return "executor";
  if (/^договор\s*№/i.test(line) || /^реквизиты/i.test(line) || /^\d+\.\s+\S/.test(line)) return null;
  return section;
}

function fillLabeledLine(text, section, contract, ctx) {
  if (section !== "customer" && section !== "executor") return text;
  const party = contract[section];
  const who = section === "customer" ? "заказчика" : "исполнителя";
  const rows = [
    [/^(ФИО(?:\s*\/\s*наименование)?\s*:\s*)_{2,}/i, party.name, section === "customer" ? "заказчик" : "исполнитель"],
    [/^(ИП\s+)_{2,}/i, party.name, "исполнитель"],
    [/^(УНП\s*:\s*)_{2,}/i, party.unp, `УНП ${who}`],
    [/^(Паспорт\s*:\s*)_{2,}/i, party.passport, "паспорт"],
    [/^(Адрес\s*:\s*)_{2,}/i, party.address, `адрес ${who}`],
    [/^(Телефон\s*:\s*)_{2,}/i, party.phone, `телефон ${who}`],
    [/^(E-?mail\s*:\s*)_{2,}/i, party.email, `email ${who}`],
    [/^(Банковские реквизиты\s*:\s*)_{2,}/i, party.bank, `банк ${who}`],
  ];
  return rows.reduce((line, [re, value, label]) => subBlank(line, re, value, label, ctx), text);
}

function fillKnownPhrases(text, contract, ctx, section) {
  let s = text;
  s = subBlank(s, /ДОГОВОР\s*№\s*_{2,}/i, contract.number, "номер", ctx);
  s = subBlank(s, /(г\.\s*)_{2,}/, contract.city, "город", ctx);
  if (/действует до/i.test(s)) s = subBlank(s, /«_{1,}»\s*_{2,}\s*20_{1,}/, plainDate(contract.endDate), "срок действия", ctx, true);
  else s = subBlank(s, /«_{1,}»\s*_{2,}\s*20_{1,}/, plainDate(contract.date), "дата", ctx, true);
  s = subBlank(s, /_{2,}\s*%/, contract.percent, "процент", ctx);
  if (/выплачивается/i.test(s)) s = subBlank(s, /не позднее\s+_{2,}\s+числа/i, contract.payDay, "число выплаты", ctx);
  else s = subBlank(s, /не позднее\s+_{2,}\s+числа/i, contract.reportDay, "число отчёта", ctx);
  s = subBlank(s, /за\s+_{2,}\s+календарн/i, contract.noticeDays, "срок уведомления", ctx);
  s = subBlank(s, /_{3,}(?=,\s*именуем[а-яё]*\s+в дальнейшем «Заказчик»)/i, contract.customer.name, "заказчик", ctx);
  s = subBlank(s, /Индивидуальный предприниматель\s+_{3,}/i, contract.executor.name, "исполнитель", ctx);
  s = subBlank(s, /_{3,}(?=,\s*паспорт\s*:)/i, contract.executor.name, "исполнитель", ctx);
  s = subBlank(s, /(паспорт\s*:\s*)_{2,}/i, contract.executor.passport, "паспорт", ctx);
  if (!section) s = subBlank(s, /(УНП:?\s*)_{2,}/i, contract.executor.unp, "УНП исполнителя", ctx);
  return s;
}

function fillParagraphs(paragraphs, contract) {
  const ctx = { labels: [] };
  let section = null;
  const filled = paragraphs.map((paragraph) => {
    const heading = /^(заказчик|исполнитель)$/i.test(paragraph.trim());
    section = updateSection(paragraph, section);
    if (heading) return paragraph;
    const labeled = fillLabeledLine(paragraph, section, contract, ctx);
    return fillKnownPhrases(labeled, contract, ctx, section);
  });
  return { paragraphs: filled, labels: ctx.labels };
}

function activeSourceParagraphs(contract) {
  return choosePart(splitContracts(contract.sourceParagraphs || []), contract.template);
}

function sourceStatus(contract) {
  const all = contract.sourceParagraphs || [];
  if (!all.length) return "";
  const parts = splitContracts(all);
  const { labels } = fillParagraphs(activeSourceParagraphs(contract), contract);
  const bits = [`Файл «${contract.sourceFileName || "без имени"}»: ${all.length} абзацев.`];
  if (parts.length > 1) bits.push(`Показан вариант «${templateLabel(contract.template)}» из ${parts.length}.`);
  if (labels.length) bits.push(`Подставлено: ${labels.join(", ")}.`);
  else bits.push("В прочитанном тексте пока нечего подставить. Заполните поле и нажмите «Заполнить договор».");
  return bits.join(" ");
}

function textToHtml(text) {
  return String(text)
    .split(/\u0001([\s\S]*?)\u0002/)
    .map((part, index) => (index % 2 === 1 ? `<span class="filled">${escapeHtml(part)}</span>` : escapeHtml(part)))
    .join("");
}

function plainParagraph(text) {
  return String(text).replace(/\u0001([\s\S]*?)\u0002/g, "$1").trim();
}

function extractedParagraphClass(text) {
  const plain = plainParagraph(text);
  if (/^ДОГОВОР\s*№/i.test(plain)) return "contract-title";
  if (/^возмездного оказания/i.test(plain)) return "contract-subtitle";
  if (/^г\.\s+\S/i.test(plain) && /20\d{2}/.test(plain)) return "contract-place-date";
  if (/^\d+\.\s+\D/.test(plain) || /^(заказчик|исполнитель)$/i.test(plain)) return "clause clause-h";
  return "clause";
}

function placeDateHtml(paragraph) {
  const parts = String(paragraph).split(/\s{2,}/).filter((part) => part.trim());
  if (parts.length < 2) return textToHtml(paragraph);
  const date = parts.pop();
  return `<span>${textToHtml(parts.join(" "))}</span><span class="contract-date">${textToHtml(date)}</span>`;
}

function extractedBodyHtml(contract) {
  const { paragraphs } = fillParagraphs(activeSourceParagraphs(contract), contract);
  return paragraphs
    .map((paragraph) => {
      const cls = extractedParagraphClass(paragraph);
      const inner = cls === "contract-place-date" ? placeDateHtml(paragraph) : textToHtml(paragraph);
      return `<p class="${cls}">${inner}</p>`;
    })
    .join("");
}

function isWordNode(node, name) {
  if (!node || node.nodeType !== 1) return false;
  if (node.localName !== name) return false;
  return node.namespaceURI === W_NS || node.tagName === `w:${name}` || node.tagName === name;
}

function docxParagraphText(paragraph) {
  let out = "";
  const walk = (node, inside) => {
    if (inside && isWordNode(node, "p")) return;
    if (isWordNode(node, "del")) return;
    if (isWordNode(node, "t")) out += node.textContent || "";
    else if (isWordNode(node, "tab")) out += " ";
    else if (isWordNode(node, "br") || isWordNode(node, "cr")) out += "\n";
    Array.from(node.childNodes || []).forEach((child) => walk(child, true));
  };
  walk(paragraph, false);
  return out.replace(/[ \t]+\n/g, "\n").trim();
}

async function extractDocxParagraphs(buffer) {
  if (typeof JSZip === "undefined") {
    throw new Error("Библиотека Word не загрузилась. Проверьте интернет и обновите страницу.");
  }
  const zip = await JSZip.loadAsync(buffer);
  const entry = zip.file("word/document.xml");
  if (!entry) throw new Error("В файле Word нет текста документа.");
  const xml = await entry.async("string");
  const doc = new DOMParser().parseFromString(xml, "application/xml");
  if (doc.querySelector("parsererror")) throw new Error("Файл Word повреждён, текст не прочитан.");
  const paragraphs = [];
  Array.from(doc.getElementsByTagName("*"))
    .filter((node) => isWordNode(node, "p"))
    .forEach((paragraph) => {
      docxParagraphText(paragraph)
        .split(/\n+/)
        .map((line) => line.trim())
        .filter(Boolean)
        .forEach((line) => paragraphs.push(line));
    });
  return paragraphs;
}

function ensurePdfJs() {
  const lib = window.pdfjsLib;
  if (!lib) throw new Error("Библиотека PDF не загрузилась. Проверьте интернет и обновите страницу.");
  if (!lib.GlobalWorkerOptions.workerSrc) {
    lib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
  }
  return lib;
}

async function extractPdfParagraphs(buffer) {
  const lib = ensurePdfJs();
  const pdf = await lib.getDocument({ data: new Uint8Array(buffer) }).promise;
  const rows = [];
  for (let pageNo = 1; pageNo <= pdf.numPages; pageNo += 1) {
    const page = await pdf.getPage(pageNo);
    const content = await page.getTextContent();
    const grouped = new Map();
    content.items.forEach((item) => {
      if (!item.str || !item.str.trim()) return;
      const y = Math.round(item.transform[5]);
      const bucket = grouped.get(y) || [];
      bucket.push({ x: item.transform[4], str: item.str });
      grouped.set(y, bucket);
    });
    const ys = [...grouped.keys()].sort((a, b) => b - a);
    let prevY = null;
    ys.forEach((y) => {
      const line = grouped
        .get(y)
        .sort((a, b) => a.x - b.x)
        .map((part) => part.str)
        .join("")
        .replace(/\s+/g, " ")
        .trim();
      if (!line) return;
      rows.push({ line, gap: prevY == null ? 40 : prevY - y });
      prevY = y;
    });
    rows.push({ line: "", gap: 80 });
  }
  const paragraphs = [];
  let buf = "";
  rows.forEach(({ line, gap }) => {
    if (!line) {
      if (buf) paragraphs.push(buf);
      buf = "";
      return;
    }
    const startsNew = !buf || gap > 18 || /^(ДОГОВОР|г\.|\d+\.\d+\.|\d+\.\s)/.test(line);
    if (startsNew) {
      if (buf) paragraphs.push(buf);
      buf = line;
      return;
    }
    buf += ` ${line}`;
  });
  if (buf) paragraphs.push(buf);
  return paragraphs;
}

async function readContractFile(file) {
  const name = file.name || "файл";
  const lower = name.toLowerCase();
  if (lower.endsWith(".doc")) {
    return { error: "Старый формат .doc не читается. Сохраните документ как .docx." };
  }
  const isDocx = lower.endsWith(".docx");
  const isPdf = lower.endsWith(".pdf");
  if (!isDocx && !isPdf) {
    return { error: "Можно загрузить только Word (.docx) или PDF." };
  }
  const buffer = await file.arrayBuffer();
  let paragraphs = [];
  try {
    paragraphs = isDocx ? await extractDocxParagraphs(buffer) : await extractPdfParagraphs(buffer);
  } catch (err) {
    const fallback = isPdf
      ? "PDF не удалось прочитать. Если это скан или фото, текста в нём нет."
      : "Файл Word не удалось прочитать.";
    return { error: err instanceof Error && /Библиотека|повреждён|нет текста/.test(err.message) ? err.message : fallback };
  }
  const letters = paragraphs.join("").replace(/\s/g, "").length;
  if (!paragraphs.length || letters < 20) {
    return {
      error: isPdf
        ? "В PDF нет текста, который можно извлечь. Похоже, это скан или фото."
        : "В файле Word не нашлось текста.",
    };
  }
  return { name, paragraphs, note: "" };
}

function contractBodyHtml(contract) {
  if (Array.isArray(contract.sourceParagraphs) && contract.sourceParagraphs.length) return extractedBodyHtml(contract);
  const clauses = CLAUSES.map((text) => {
    const cls = isHeading(text) ? "clause clause-h" : "clause";
    return `<p class="${cls}">${renderClause(text, contract)}</p>`;
  }).join("");
  return `
    <h1 class="contract-title">ДОГОВОР № ${fill(contract.number, "___")}</h1>
    <p class="contract-subtitle">ВОЗМЕЗДНОГО ОКАЗАНИЯ РЕКЛАМНЫХ И МАРКЕТИНГОВЫХ УСЛУГ</p>
    <div class="contract-meta">
      <div>г. ${fill(contract.city, "____________")}</div>
      <div>${dateHtml(contract.date)}</div>
    </div>
    <p class="clause">${preambleHtml(contract)}</p>
    ${clauses}
    ${requisitesHtml(contract)}
  `;
}

function editorHtml(draft, pasteText, report) {
  const reportClass = report?.kind ? `parse-report is-${report.kind}` : "parse-report";
  const sections = FORM_SECTIONS.map((section) => {
    const fields = section.fields
      .filter((field) => !field.npdOnly || draft.template !== "ip")
      .map((field) => {
        const value = getPath(draft, field.path);
        const wide = field.wide ? " span-2" : "";
        const control = field.multiline
          ? `<textarea data-action="field" data-path="${escapeAttr(field.path)}" rows="2">${escapeHtml(value)}</textarea>`
          : `<input data-action="field" data-path="${escapeAttr(field.path)}" type="text" value="${escapeAttr(value)}" placeholder="${escapeAttr(field.placeholder ?? "")}" />`;
        return `<label class="${wide.trim()}">${escapeHtml(field.label)}${control}</label>`;
      })
      .join("");
    return `<div class="form-section"><h2>${escapeHtml(section.title)}</h2><div class="field-grid">${fields}</div></div>`;
  }).join("");
  const note =
    draft.template === "ip"
      ? "В тексте договора исполнитель указан как индивидуальный предприниматель."
      : "В тексте договора исполнитель указан как плательщик налога на профессиональный доход. Нужен паспорт.";
  return `
    <div class="paste-panel">
      <h2>Вставьте данные</h2>
      <p class="paste-hint">Серым показаны все нужные поля. Вставьте свои данные поверх — подсказка скроется. Уже заполненное в договоре не стирается, если этого поля нет в тексте.</p>
      <div class="paste-field${String(pasteText).trim() ? " has-value" : ""}">
        <pre class="paste-ghost" aria-hidden="true">${escapeHtml(PASTE_GUIDE)}</pre>
        <textarea data-action="paste-text">${escapeHtml(pasteText)}</textarea>
      </div>
      <div class="paste-actions">
        <button class="btn btn-primary" type="button" data-action="apply-paste">Заполнить договор</button>
        <button class="btn" type="button" data-action="insert-sample">Образец</button>
      </div>
      <div class="upload-row">
        <label class="btn">
          Загрузить Word или PDF
          <input class="file-input" type="file" accept=".docx,.pdf,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" data-action="upload-file" />
        </label>
        ${draft.sourceParagraphs?.length ? `<button class="btn" type="button" data-action="clear-source">Убрать файл</button>` : ""}
      </div>
      <p class="paste-hint">Берётся только текст, который можно прочитать в Word (.docx) или PDF. Скан и фото не подойдут. Из прочитанного собирается новый договор, а данные из поля встают в подписанные пустые места.</p>
      <p class="${reportClass}" data-slot="parse-report">${escapeHtml(report?.text ?? "")}</p>
    </div>
    <nav class="page-tabs" role="tablist" aria-label="Тип исполнителя">
      <button class="page-tab ${draft.template !== "ip" ? "is-active" : ""}" type="button" data-action="set-template" data-template="npd">Самозанятый</button>
      <button class="page-tab ${draft.template === "ip" ? "is-active" : ""}" type="button" data-action="set-template" data-template="ip">ИП</button>
    </nav>
    <p class="template-note">${escapeHtml(note)}</p>
    ${sections}
  `;
}

function paintPaper(view) {
  const missing = qs('[data-slot="missing"]');
  const source = qs('[data-slot="source-note"]');
  const gaps = missingLabels(view);
  if (gaps.length) {
    missing.hidden = false;
    missing.textContent = `Осталось заполнить: ${gaps.join(", ")}.`;
  } else {
    missing.hidden = true;
    missing.textContent = "";
  }
  const status = sourceStatus(view);
  source.hidden = !status;
  source.textContent = status;
  qs('[data-slot="paper"]').innerHTML = contractBodyHtml(view);
}

function selectedContract(state) {
  return state.contracts.find((c) => c.id === state.selectedId) ?? null;
}

function render(state, ui) {
  const list = qs('[data-slot="contract-list"]');
  const empty = qs('[data-slot="empty-state"]');
  const doc = qs('[data-slot="doc"]');
  const title = qs('[data-slot="topbar-title"]');
  const editor = qs('[data-slot="editor"]');
  const paper = qs('[data-slot="paper"]');
  const missing = qs('[data-slot="missing"]');
  const version = qs('[data-slot="site-version"]');
  version.textContent = SITE_VERSION;

  const sorted = [...state.contracts].sort((a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0));
  list.innerHTML = "";
  sorted.forEach((contract) => {
    const item = document.createElement("div");
    item.className = `estimate-item ${contract.id === state.selectedId ? "active" : ""}`;
    item.dataset.action = "select-contract";
    item.dataset.id = contract.id;
    item.innerHTML = `
      <div class="name">${escapeHtml(contractTitle(contract))}</div>
      <div class="date">${escapeHtml(templateLabel(contract.template))} · ${escapeHtml(fmtDate(contract.updatedAt))}</div>
    `;
    list.append(item);
  });

  const current = selectedContract(state);
  if (!current) {
    empty.style.display = "flex";
    doc.style.display = "none";
    title.textContent = "Договор";
    return;
  }

  empty.style.display = "none";
  doc.style.display = "block";
  const view = ui.editing && ui.draft ? ui.draft : current;
  title.textContent = contractTitle(view);

  const editing = Boolean(ui.editing && ui.draft);
  qs('[data-action="edit-enter"]', doc).style.display = editing ? "none" : "";
  qs('[data-action="edit-save"]', doc).style.display = editing ? "" : "none";
  qs('[data-action="edit-cancel"]', doc).style.display = editing ? "" : "none";
  editor.innerHTML = editing ? editorHtml(ui.draft, ui.pasteText, ui.report) : "";
  editor.hidden = !editing;

  paintPaper(view);

  if (ui.focusPaste) {
    const area = editor.querySelector('[data-action="paste-text"]');
    if (area) area.focus();
    ui.focusPaste = false;
  }
}

function pdfFilename(contract) {
  const base = contractTitle(contract).replace(/[\\/:*?"<>|]+/g, " ").replace(/\s+/g, " ").trim();
  return `${base || "Договор"}.pdf`;
}

function canSharePdfFile() {
  if (!navigator.share || !navigator.canShare) return false;
  try {
    const probe = new File([""], "probe.pdf", { type: "application/pdf" });
    return navigator.canShare({ files: [probe] });
  } catch {
    return false;
  }
}

function updatePdfShareButtonVisibility() {
  const btn = document.querySelector('[data-slot="pdf-share-btn"]');
  if (!btn) return;
  btn.style.display = canSharePdfFile() ? "inline-flex" : "none";
}

async function createPdfBlob(contract) {
  if (typeof window.html2pdf !== "function") {
    throw new Error("Библиотека PDF не загрузилась. Проверьте интернет и обновите страницу.");
  }
  const el = document.createElement("div");
  el.className = "contract-paper contract-pdf";
  el.innerHTML = contractBodyHtml(contract);
  const host = document.createElement("div");
  host.className = "pdf-export-host";
  host.setAttribute("aria-hidden", "true");
  host.append(el);
  document.body.append(host);
  try {
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    return await window
      .html2pdf()
      .set({
        margin: [12, 12, 12, 12],
        filename: pdfFilename(contract),
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, backgroundColor: "#ffffff", width: 720, windowWidth: 720 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["css", "legacy"], avoid: [".clause", ".req-col"] },
      })
      .from(el)
      .outputPdf("blob");
  } finally {
    host.remove();
  }
}

function downloadPdfBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  a.style.display = "none";
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
}

function setPdfButtonsBusy(busy) {
  document.querySelectorAll('[data-action="pdf-download"], [data-action="pdf-share"]').forEach((btn) => {
    btn.classList.toggle("is-busy", busy);
    btn.disabled = busy;
  });
}

function openSidebar() {
  document.getElementById("sidebar")?.classList.add("open");
}

function closeSidebar() {
  document.getElementById("sidebar")?.classList.remove("open");
}

function main() {
  let state = loadState();
  let ui = { editing: false, draft: null, pasteText: "", report: null, focusPaste: false };

  function rerender() {
    render(state, ui);
    updatePdfShareButtonVisibility();
  }

  function persistDraft() {
    if (!ui.editing || !ui.draft) return;
    const saved = normalizeContract({ ...ui.draft, updatedAt: Date.now() });
    ui.draft = saved;
    const idx = state.contracts.findIndex((c) => c.id === saved.id);
    if (idx >= 0) state.contracts[idx] = saved;
    saveState(state);
  }

  function enterEdit(contract, focusPaste = false) {
    ui = {
      editing: true,
      draft: structuredClone(normalizeContract(contract)),
      pasteText: "",
      report: null,
      focusPaste,
    };
    rerender();
  }

  rerender();

  document.addEventListener("click", (e) => {
    const t = e.target;
    if (!(t instanceof Element)) return;
    const actionEl = t.closest("[data-action]");
    if (!(actionEl instanceof HTMLElement)) return;
    const action = actionEl.dataset.action;

    if (action === "toggle-sidebar") {
      openSidebar();
      return;
    }
    if (action === "close-sidebar") {
      closeSidebar();
      return;
    }
    if (action === "refresh") {
      ui = { editing: false, draft: null, pasteText: "", report: null, focusPaste: false };
      state = loadState();
      rerender();
      return;
    }
    if (action === "new-contract") {
      const contract = makeEmptyContract();
      state.contracts.unshift(contract);
      state.selectedId = contract.id;
      saveState(state);
      enterEdit(contract, true);
      closeSidebar();
      return;
    }
    if (action === "select-contract") {
      const id = actionEl.dataset.id;
      if (!id) return;
      state.selectedId = id;
      ui = { editing: false, draft: null, pasteText: "", report: null, focusPaste: false };
      saveState(state);
      rerender();
      closeSidebar();
      return;
    }
    if (action === "edit-enter") {
      const current = selectedContract(state);
      if (current) enterEdit(current, true);
      return;
    }
    if (action === "edit-cancel") {
      ui = { editing: false, draft: null, pasteText: "", report: null, focusPaste: false };
      rerender();
      return;
    }
    if (action === "edit-save") {
      persistDraft();
      ui = { editing: false, draft: null, pasteText: "", report: null, focusPaste: false };
      rerender();
      return;
    }
    if (action === "delete-contract") {
      const current = selectedContract(state);
      if (!current) return;
      const ok = confirm("Удалить этот договор? Это действие нельзя отменить.");
      if (!ok) return;
      state.contracts = state.contracts.filter((c) => c.id !== current.id);
      state.selectedId = state.contracts[0]?.id ?? null;
      ui = { editing: false, draft: null, pasteText: "", report: null, focusPaste: false };
      saveState(state);
      rerender();
      return;
    }
    if (action === "set-template") {
      if (!ui.editing || !ui.draft) return;
      const template = actionEl.dataset.template === "ip" ? "ip" : "npd";
      ui.draft.template = template;
      rerender();
      return;
    }
    if (action === "clear-source") {
      if (!ui.editing || !ui.draft) return;
      ui.draft.sourceParagraphs = [];
      ui.draft.sourceFileName = "";
      ui.draft.sourceNote = "";
      ui.report = { kind: "ok", text: "Файл убран. Снова показан стандартный договор." };
      rerender();
      return;
    }
    if (action === "insert-sample") {
      ui.pasteText = PASTE_SAMPLE;
      ui.report = null;
      rerender();
      return;
    }
    if (action === "apply-paste") {
      if (!ui.editing || !ui.draft) return;
      const area = document.querySelector('[data-action="paste-text"]');
      if (area instanceof HTMLTextAreaElement) ui.pasteText = area.value;
      const { patch, filled } = parseContractPaste(ui.pasteText);
      if (!filled.length) {
        ui.report = {
          kind: "bad",
          text: "Не удалось распознать поля. Нужны строки вида «Город: Минск» и блоки «Заказчик» / «Исполнитель».",
        };
        rerender();
        return;
      }
      applyPatch(ui.draft, patch);
      persistDraft();
      const gaps = missingLabels(ui.draft);
      ui.report = {
        kind: gaps.length ? "warn" : "ok",
        text: gaps.length
          ? `Заполнено: ${filled.join(", ")}. Не заполнено: ${gaps.join(", ")}.`
          : `Заполнено: ${filled.join(", ")}.`,
      };
      rerender();
      qs('[data-slot="paper"]').scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (action === "pdf-download" || action === "pdf-share") {
      const current = ui.editing && ui.draft ? ui.draft : selectedContract(state);
      if (!current) return;
      if (ui.editing) persistDraft();
      setPdfButtonsBusy(true);
      createPdfBlob(current)
        .then(async (blob) => {
          if (action === "pdf-share") {
            const file = new File([blob], pdfFilename(current), { type: "application/pdf" });
            if (navigator.share && (!navigator.canShare || navigator.canShare({ files: [file] }))) {
              await navigator.share({ files: [file] });
              return;
            }
          }
          downloadPdfBlob(blob, pdfFilename(current));
        })
        .catch((err) => {
          alert(err instanceof Error ? err.message : "Не удалось сделать PDF.");
        })
        .finally(() => setPdfButtonsBusy(false));
    }
  });

  document.addEventListener("input", (e) => {
    const t = e.target;
    if (!(t instanceof HTMLInputElement) && !(t instanceof HTMLTextAreaElement)) return;
    if (!ui.editing || !ui.draft) return;
    if (t.dataset.action === "paste-text") {
      ui.pasteText = t.value;
      const field = t.closest(".paste-field");
      const has = Boolean(t.value.trim());
      field?.classList.toggle("has-value", has);
      if (has) {
        t.style.height = "auto";
        t.style.height = `${t.scrollHeight}px`;
      } else {
        t.style.height = "";
      }
      return;
    }
    if (t.dataset.action !== "field" || !t.dataset.path) return;
    setPath(ui.draft, t.dataset.path, t.value);
    qs('[data-slot="topbar-title"]').textContent = contractTitle(ui.draft);
    paintPaper(ui.draft);
  });

  document.addEventListener("change", (e) => {
    const t = e.target;
    if (!(t instanceof HTMLInputElement) || t.dataset.action !== "upload-file") return;
    const file = t.files && t.files[0];
    t.value = "";
    if (!file || !ui.editing || !ui.draft) return;
    ui.report = { kind: "warn", text: "Читаю файл…" };
    rerender();
    readContractFile(file)
      .then((result) => {
        if (!ui.editing || !ui.draft) return;
        if (result.error) {
          ui.report = { kind: "bad", text: result.error };
          rerender();
          return;
        }
        ui.draft.sourceParagraphs = result.paragraphs;
        ui.draft.sourceFileName = result.name;
        ui.draft.sourceNote = result.note;
        ui.report = { kind: "ok", text: `Прочитан файл «${result.name}».` };
        persistDraft();
        rerender();
        qs('[data-slot="paper"]').scrollIntoView({ behavior: "smooth", block: "start" });
      })
      .catch((err) => {
        ui.report = { kind: "bad", text: err instanceof Error ? err.message : "Не удалось прочитать файл." };
        rerender();
      });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" || (!e.metaKey && !e.ctrlKey)) return;
    const t = e.target;
    if (!(t instanceof HTMLTextAreaElement) || t.dataset.action !== "paste-text") return;
    e.preventDefault();
    document.querySelector('[data-action="apply-paste"]')?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  const sidebar = document.getElementById("sidebar");
  if (sidebar) {
    sidebar.addEventListener("click", (e) => {
      if (!sidebar.classList.contains("open")) return;
      if (e.target === sidebar) closeSidebar();
    });
  }
}

if (typeof document !== "undefined") main();
