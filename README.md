# Fashionista

Fashionista は、天気に基づいた適切な服装を提案する AI アプリケーションです。このアプリケーションは、Google Gemini を活用して天気に応じた最適なコーディネートを提案し、Google Search API で関連画像を表示します。また、ユーザー認証機能も備えています。

## デモ

<!-- [デプロイ済みアプリケーションはこちらからアクセスできます]( <ここにデプロイしたURLを張り付ける> ) -->

## 製作者

-  [kondai24](https://github.com/kondai24)
-  [ryolingo](https://github.com/ryolingo)
-  [ahiru401066](https://github.com/ahiru401066)
-  [MiinaDoi](https://github.com/MiinaDoi)

## 機能概要

-  **天気情報取得**: 今日の天気情報を自動で取得し、現在の気候に適した服装を判断します。
-  **服装提案**: Google Gemini を活用し、取得した天気情報をもとに、適切な服装を AI が提案します。
-  **画像表示**: 提案された服装にマッチする画像を Google Search API で検索し、表示します。
-  **ユーザー認証**: ログイン機能を実装し、ユーザーごとに服装提案をカスタマイズします。

## 使用技術

-  **Next.js**: React ベースのフレームワーク
-  **Firebase**: 認証と Firestore データベースとして使用
-  **Google Gemini**: AI を使った服装提案
-  **Google Search API**: 提案服装の関連画像を表示
