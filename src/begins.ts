const begins = [
  "最初に「現在創世中」の言葉だけがあった……",
  "世界が始まる前、世界には始まりすらなかった……",
  "神は言われた。「始まりあれ！」すると始まりがあった……",
  "一説では、とあるURLにアクセスしたことによりこの世界は生まれたという……",
  "一説では、とあるリンクを踏んだことによりこの世界は生まれたという……",
  "一説では、とあるQRコードをスキャンしたことによりこの世界は生まれたという……",
  "スキャンありがとうございます。只今、この名刺の持ち主を生成しています……",
  "スキャンありがとうございます。只今、この名刺の持ち主が存在する世界を生成して既存の世界と交換しています……",
  "スキャンありがとうございます。只今、この名刺が来た元の世界からの召喚を行なっています……",
];

const chooseRandom = <T>(data: T[]) => {
  const arrayIndex = Math.floor(Math.random() * data.length);
  return data[arrayIndex];
};

export const chooseBegin = (): string => {
  return chooseRandom(begins);
}
