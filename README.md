# Hacker News Feed Web Application

## 概要

URL: https://7ma.github.io/hacker-news-react-typescript-app/

[WealthPark様が公開したフロントエンドコーディングテスト](https://note.com/takahirofujii/n/n7e559422cc66)を解いてみました。

記事にもありますが、課題は「Hacker NewsのAPIを利用して、newsのリストを実装すること」とのことなので、試しに解答例として作ってみました。

HackerNewsのAPIについてはこちら：https://github.com/HackerNews/API

---

## 要件

記事で公開されている要件や制限を抜粋します。

**課題制限**：
- react(preact可)の利用は必須, next.jsやcreate-react-appなどを利用することも可
- typescriptの利用は必須
- UIライブラリは使用しないこと(material designや、他社のui componentなど)、css framework(tailwindやstyled-componentsなど)を利用することは可

**UI要件**：
- APIでデータの取得が完了するまでの間、Loading Animationまたはicnを表示すること
- 初回ロードでは100件のデータを表示すること
- 後はデザインのラフ画に従い実装(ただし、デザインは比較的自由度高い

**任意要件**：
- Infinite scrolling または pagenation
- Performanceの追求
- 綺麗なUI

---

## 要件チェックリスト

まずは課題解答として、上記要件に対して達成状況及び考え方をチェックリストとコメントのセットの形でメモしておきます。

### 課題制限

- [x] **react(preact可)の利用は必須, next.jsやcreate-react-appなどを利用することも可**

ここはcreate-react-appを使ってreactプロジェクトを立ち上げました。

なぜcreate-react-appを使うというと、今回の課題はSPA寄りなので、手軽にreactプロジェクトを作れるcreate-react-appにしました。

preact自体は馴染んでいないので、選択肢から外していました。

- [x] **typescriptの利用は必須**

言うまでもなく、typescriptを利用しています。右側の`Languages`で一目瞭然ですね。

ちなみにcreate-react-appを使ってtypescript利用のReactプロジェクトを立ち上げることができます。
```shell
npx create-react-app my-app --template typescript
```

- [x] **UIライブラリは使用しないこと(material designや、他社のui componentなど)、css framework(tailwindやstyled-componentsなど)を利用することは可**

レスポンシブデザインなどを簡単に実装できるtailwindを利用しています。

CSSを書く経験が浅いので、「使えるものは使う」ということにしました。

styled-componentsに関しては、CSS in JSは比較的に慣れていないので使いませんでした。今後はチャレンジしてみたいです。

### UI要件

- [x] **APIでデータの取得が完了するまでの間、Loading Animationまたはicnを表示すること**

こちらはAPIからの初回読み込みだけでなく、後出するInfinite scrollingにも使えるように、ダミーのNews ItemをLoading Animationとして実装しました（というか、自作しました）。

<img width="605" alt="スクリーンショット 2024-05-06 8 52 02" src="https://github.com/7mA/hacker-news-react-typescript-app/assets/22639121/c958da19-bb30-41a5-b024-f86aa427ab55">

良くも悪くも自作したものなので、実はLoading Animationとして[コンポーネント](https://github.com/7mA/hacker-news-react-typescript-app/blob/master/src/components/NewsFeedLoading.tsx)を作って、さらにその中のDummy News Itemはまた[子コンポーネント](https://github.com/7mA/hacker-news-react-typescript-app/blob/master/src/components/NewsFeedLoadingItem.tsx)として作っていました。（大事なPulseエフェクトは[tailwind](https://tailwindcss.com/docs/animation#pulse)から拝借しました）

Dummy News Itemが3つあるので、コンポーネントにしたいんですよね・・でもやはり微妙な感じがするかもしれません。「自作をやめたらどうですか？」みたいな気持ちになりました。

- [x] **初回ロードでは100件のデータを表示すること**

正直これは随分悩んでいました。

なぜかというと、今回使うHacker News APIでは、News情報一覧みたいなAPIがなくて、News ID一覧APIとIDで引くNews詳細APIしかありません。

初回ロードで100件を出すということは、少なくともID一覧APIを1回、詳細APIを100回叩く必要があります。これだけの回数でAPIを非同期で叩くことは、WEBアプリには災難的です。任意要件にもPerformance追求があるのをさておき、エンジニアとしても内容表示まで5秒以上待たされるシチュエーションは本能的に耐えられません。

そもそも初回ロードの件数はファーストビューの2倍くらい（今回は20〜30件くらい）をカバーできればOKだと思うので、おそらく実務では一番近い道はPdMに「初回表示件数を減らせないかな」と相談することかと思うのですが・・今回は課題なので従うしかありません。

本題に戻りますが、さすがに100件を全部取得し終わることを待つことはナシなので、[妥協案](https://github.com/7mA/hacker-news-react-typescript-app/blob/master/src/server/useFetchData.ts#L51-L59)として20件ずつを取得して表示することにしました。一見Infinite scrollingとは似ているかもしれませんが、Infinite scrollingとは違うところは、20件ずつの間にsentinelRef表示のような条件を挟まずに、20件を取得し終わったらすぐに次の20件を取得し始めることです。

これによって、初めから100件を表示することではないのですが、初回ロード自体は一貫して進むので、要件に満たせているのではないかと思います。その同時に、1回目の20件がロードできたらファーストビューに中身が埋まりますので、待たされる感もだいぶ解消されます。

- [ ] **後はデザインのラフ画に従い実装(ただし、デザインは比較的自由度高い**

実は記事でラフ画が公開されていないので、従えているかどうかはわかっていません。ただデザインは比較的自由度が高いとのことなので、今回はこだわりがなくシンプルに作りました。

### 任意要件

- [x] **Infinite scrolling または pagenation**

すでに何度か言及しましたが、今回は[Infinite scrolling](https://github.com/7mA/hacker-news-react-typescript-app/blob/master/src/server/useFetchData.ts#L61-L82)を採用しています。

リスト末尾にある[sentinelRef](https://github.com/7mA/hacker-news-react-typescript-app/blob/master/src/components/NewsFeedContainer.tsx#L15)の表示をトリガーにしています。

- [x] **Performanceの追求**

自分の開発環境はWeb Vitals計測ツールを利用しているので、今回に限らずにCore Web Vitalsの数字を常に目にします。

今回会った一番大きなパフォーマンス課題はやはり詳細APIの呼び出しに時間がかかりすぎて、News List ItemのLCP (Largest Contentful Paint) が5000ms以上で大きすぎてユーザを待たされる問題でした。ただ、前述した分割ロードを導入することで、ファーストビューの範囲内に時間がかかって描画する要素がなくなったので改善されております。

そのほかには特に改善すべきの指標がありません。

<img width="334" alt="スクリーンショット 2024-05-06 10 02 57" src="https://github.com/7mA/hacker-news-react-typescript-app/assets/22639121/bf891388-dc3b-4a36-be73-2bf2dbe242ec">

- [ ] **綺麗なUI**

これは主観的な要件だと思うのでなんとも言えないと思います。ただし、自分自身はデザイン得意ではなくデザイン要素はほとんどtailwindから取ってきたものなので、おそらくデザイナー並みの腕がなければ満たすことがないと思います。

---

## その他の工夫ポイント

### メモ化の利用

今回はInfinite scrollingを導入しているので、News Listが更新するたびに、Listコンポーネントだけではなく、その中のItemコンポーネントも再レンダリングされます。（Core Web Vitalsは特に悪い数値が出ていませんでしたが）初期描画の100件を含めて大勢のコンポーネントがしばしば再レンダリングすることは勿体無いです。

これを回避すべく、ユニークなIDを持つItemコンポーネントにReact.memoを利用します。
