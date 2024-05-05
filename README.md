# Hacker　News　Feed Web Application

## 概要

[WealthPark様が公開したフロントエンドコーディングテスト](https://note.com/takahirofujii/n/n7e559422cc66)を解いてみました。

記事にもありますが、課題は「Hacker NewsのAPIを利用して、newsのリストを実装すること」とのことなので、試しに解答例として作ってみました。

HackerNewsのAPIについてはこちら：https://github.com/HackerNews/API

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

## 要件チェックリスト

まずは課題解答として、上記要件に対して達成状況及び考え方をチェックリストとコメントのセットの形でメモしておきます。

### 課題制限

- [x] react(preact可)の利用は必須, next.jsやcreate-react-appなどを利用することも可

ここはcreate-react-appを使ってreactプロジェクトを立ち上げました。

なぜcreate-react-appを使うというと、今回の課題はSPA寄りなので、手軽にreactプロジェクトを作れるcreate-react-appにしました。

preact自体は馴染んでいないので、選択肢から外していました。

- [x] typescriptの利用は必須

言うまでもなく、typescriptを利用しています。右側の`Languages`で一目瞭然ですね。

ちなみにcreate-react-appを使ってtypescript利用のReactプロジェクトを立ち上げることができます。
```shell
npx create-react-app my-app --template typescript
```

