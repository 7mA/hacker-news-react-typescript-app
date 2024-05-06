# Hacker News Feed Web Application

## 概要

URL: https://7ma.github.io/hacker-news-react-typescript-app/

[WealthPark様が公開したフロントエンドコーディングテスト](https://note.com/takahirofujii/n/n7e559422cc66)を解いてみました。

記事にもありますが、課題は「Hacker NewsのAPIを利用して、newsのリストを実装すること」とのことなので、試しに解答例として作ってみました。

HackerNewsのAPIについてはこちら：https://github.com/HackerNews/API

---

## 要件

記事に公開されている要件や制限を抜粋します。

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

良くも悪くも自作したものなので、実はLoading Animationとして[コンポーネント](https://github.com/7mA/hacker-news-react-typescript-app/blob/master/src/components/NewsFeedLoading.tsx)を作って、さらにその中のDummy News Itemはまた[子コンポーネント](https://github.com/7mA/hacker-news-react-typescript-app/blob/master/src/components/NewsFeedLoadingItem.tsx)として作っていました。（大事なPulseエフェクトはtailwindから拝借しました）

Dummy News Itemが3つあるので、コンポーネントにしたいんですよね・・でもやはり微妙な感じがするかもしれません。「自作をやめたらどうですか？」みたいな気持ちになりました。

- [x] **初回ロードでは100件のデータを表示すること**

正直これは随分悩んでいました。

なぜかというと、今回使うHacker News APIでは、News情報一覧みたいなAPIがなくて、News ID一覧APIとIDで引くNews詳細APIしかありません。

初回ロードで100件を出すということは、少なくともID一覧APIを1回、詳細APIを100回叩く必要があります。これだけの回数でAPIを非同期で叩くことは、WEBアプリには災難的です。任意要件にもPerformance追求があるのをさておき、エンジニアとしてもこのような5秒以上待たされるシチュエーションは本能的に耐えられません。

そもそも初回ロードの件数はファーストビューの2倍くらい（今回は20〜30件くらい）をカバーできればOKだと思うので、おそらく本番では一番近い道はPdMに「初回表示件数を減らせないかな」と相談することかと思うのですが・・今回は課題なので従うしかありません。

