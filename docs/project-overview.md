# プロジェクト概要

最終更新: 2026-11-02（HEAD: 13f6b88 / アプリ版 1.0.80, iOS build 91, Android versionCode 100）

## 目的

このリポジトリは Expo / React Native 製のモバイルアプリ「ガチ有能AI助手」です。iOS / Android 向けに、チャット UI を中心として以下の AI 生成機能を提供します。

- Gemini によるテキストチャットと画像付き質問
- Cohere Command 系モデルによる第三者視点の追加回答
- 複数モデルを選べる画像生成
- 生成画像からの動画生成
- 歌生成
- 音声付き短尺動画生成
- 画像タグ生成
- 広告表示、寄付課金、レビュー中の機能制御

## 技術スタック

- Expo SDK `58`（`expo@^58.0.22`。SDK 58 から expo-* パッケージのバージョンも `58.x` に統一）
- React `19.3.0` / React Native `0.88.1`（New Architecture のみ）
- React Navigation v7（stack / drawer / bottom-tabs）
- Redux Toolkit 2 / React Redux 9
- `react-native-gifted-chat` 3.x によるチャット UI（3.x は maintenance mode。後継は `@kesha-antonov/react-native-chat`）
- RevenueCat `react-native-purchases` 10.x による寄付課金（11.x は RevenueCat が「Expo アプリは 10.x に留まる」よう案内しているため据え置き）
- Google Mobile Ads / AdMob（`react-native-google-mobile-ads` 17.x、Expo config plugin で設定）
- Firebase Firestore（`firebase` 12.x。13.x は Node >= 24.12 が必要なため据え置き）
- アイコンは `@expo/vector-icons`（`react-native-vector-icons` から移行済み）
- AsyncStorage + `react-native-storage`
- EAS Build / EAS Update

## 起動とビルド

主なコマンドは `package.json` と `README.md` にあります。

```sh
yarn start
yarn ios
yarn android
yarn web
yarn lint       # ESLint 9 flat config (eslint.config.js: eslint-config-expo + prettier)
yarn lint:fix
yarn test       # jest-expo + jest 30
```

`npx expo-doctor` は 2026-11-02 時点で 20/20 パスします。依存を足すときは SDK 管理パッケージなら `npx expo install <pkg>` を使ってください（`react-native-purchases` のように SDK 管理外のものは `expo install` が最新メジャーを入れてしまうので、バージョンを明示する）。

EAS は `eas.json` で `development` / `preview` / `production` の 3 プロファイルを定義しています。OTA 更新は `development` / `internal` / `production` チャンネルを使います。

## エントリーポイント

起動経路は次の通りです。

```text
App.js
-> src/index.js
-> src/App.js
-> src/routes/Routes.js
-> src/routes/navigation/Navigation.js
-> src/routes/navigation/rootStack/RootStack.js
-> src/routes/navigation/stacks/HomeStacks.js
-> src/scenes/chat/Chat.js
```

`src/App.js` はアセットのプリロード、Redux Provider、UserContext、AdContext、Popup Menu Provider、RevenueCat 初期化を行います。`src/routes/Routes.js` は Redux の `app.checked` を見てローディング画面かメイン画面を切り替えます。

## 画面構成

- `src/scenes/loading/Loading.js`: 初期化画面。Google Sheet 由来のリモート設定取得、メモ/ダークモード設定読み込み、ATT 許可要求、Redux 認証状態更新を行います。
- `src/scenes/chat/Chat.js`: メイン画面。チャット、画像添付、画像生成、歌生成、音声生成、動画生成、タグ生成の中心です。
- `src/scenes/chat/Settings/Settings.js`: 画像生成モデルごとのネガティブプロンプト設定画面です。Bottom Sheet で開きます。
- `src/scenes/donate/Donate.js`: 寄付画面。RevenueCat の Offering 表示、ユーザーメモ、広告を含みます。

## チャット機能の流れ

`src/scenes/chat/Chat.js` は `messages` の先頭メッセージを監視し、ユーザー入力や現在のモードに応じて生成処理を分岐します。

- 通常チャット: `generateChatMessage()` を呼び、Gemini へ会話履歴を送信します。
- 第三者視点モード: Gemini の返信後、`generateCommandRMessage()` を呼び、Cohere に追加意見を生成させます。
- 画像生成モード: `generateImageFromZeroGPU()` を呼び、Cloud Run 上の画像生成 API へ送信します。
- 歌生成モード: `generateSong()` を呼び、外部 song API の生成完了をポーリングします。
- 音声生成モード: `generateVoice()` を呼び、Yahoo かな変換 API と Chupa Voice API を使います。
- 画像添付: 通常チャットでは Gemini Vision に画像を渡します。DeepDanbooru 機能が有効な場合はタグ生成もできます。

入力文字数上限は `src/scenes/chat/functions.js` の `calculateMessageMaxLength()` で制御されています。

## AI / 外部 API 連携

主要な連携先は以下です。

- Gemini (`gemini-3.5-flash-lite`、コスト重視。品質重視なら `gemini-3.8-flash`): `src/utils/textGenerate.js` の `generateChatMessage()`。モデル名は同ファイル冒頭の `geminiModel` 定数に集約。キーは Google Sheet の `geminiKey` で、`x-goog-api-key` ヘッダーで送る
- Cohere (`command-a-03-2025`): `src/utils/textGenerate.js` の `generateCommandRMessage()`
- Hugging Face Inference API: `src/utils/textGenerate.js` の `generateImage()`。現在のメイン経路ではなく、ZeroGPU 経路が使われています。
- Cloud Run 画像生成 API: `src/utils/textGenerate.js` の `generateImageFromZeroGPU()` と `src/config.js` の `zeroGPUUrls`。20 個のエンドポイントからリクエスト毎にランダムに 1 つ選びます（負荷分散）。モデルは `imageModelData` の `modelName` で指定します。
- Vidu (`vidu2.0`, img2video 720p): `src/utils/videoFunctions.js` の `createVideo()`。画像を Imgur に上げてから渡し、`getVideo()` でポーリング（最大 30 回 × 20 秒）。`createVideo_old` / `getVideo_old` は旧 Novita AI 経路で未使用です。
- Imgur: `src/utils/uploadFunctions.js` の `uploadImgur()` / `uploadImageImgur()`
- imgbb: `src/utils/uploadFunctions.js` の `uploadFunction()`
- song API: `src/utils/songGenerate.js`
- Yahoo Furigana API: `src/utils/voiceGenerate.js` の `convertText()`
- Chupa Voice API: `src/utils/voiceGenerate.js`
- Google Sheets API: `src/contexts/UserContext.js` の `getReviewStatus()`
- Firebase Firestore: `src/utils/uploadFunctions.js` の `saveFirestore()`

## リモート設定

`src/contexts/UserContext.js` が Google Sheet からリモート設定を取得します。`src/config.js` の `googleSheetUrl` が参照先です。

取得した値は主に以下に使われます。

- `geminiKey`: Gemini API キー
- `imgbbKey`: imgbb アップロードキー
- `song`: 歌生成機能の有効化
- `video`: 動画生成機能の有効化
- `deepdanbooru`: タグ生成機能の有効化
- `noAdWord`: ユーザーメモと一致した場合に画像閲覧時広告をスキップ
- `nowReview`: iOS 審査中の build number。`src/config.js` の `iosBuildNumber` と一致すると審査中扱い
- `androidVersionCode_1`: Android 審査中の versionCode。`src/config.js` の `androidVersionCode` と一致すると審査中扱い（2026-06 に列名が `androidVersionCode` から変更されました）

`isReview` が `true` のとき、画像生成モデル一覧や設定画面、音声/タグなど一部機能が制限されます。

`isReview` の初期値は `true` です（2026-06 変更）。Sheet の取得に成功し、どちらの条件にも一致しない場合だけ `false` になります。つまり Sheet 取得失敗時は安全側（審査モード）に倒れます。

## 画像生成モデル

画像生成モデル定義は `src/imageModelData.js` に集約されています（47 定義、うち `enable: true` は 10 個: ANIMAGINE, waiREALCN🐴, 7thAnimeXLPony🐴, PVCRealistic, JuggernautXL, NovaAnimeXL, WaiNSFWIllustrious, ShiitakeMix, MatureRitual, PMP）。各モデルは以下の情報を持ちます。

- 表示ラベル
- `sequence`: UI 選択値
- `negativePromptKey`: AsyncStorage 保存キー
- Hugging Face URL
- Cloud Run 側へ渡す `modelName`
- 有効フラグ
- 推奨ネガティブプロンプト

モデルを追加する場合は、少なくとも以下を合わせて更新する必要があります。

- `src/imageModelData.js`
- `src/utils/textGenerate.js` の `selectImageAPI()`
- `src/scenes/chat/Chat.js` の negative prompt state / props
- `src/scenes/chat/DrawButton/DrawButton.js`
- `src/scenes/chat/Settings/Settings.js`

現在はモデル追加時に複数ファイルへ手作業で追記する構造です。変更漏れが起きやすいので注意してください。

## 広告と課金

AdMob は `src/contexts/AdContext.js` と `src/components/MyAdmob.js` が担当します。画像サムネイルを開く際、`src/scenes/chat/RenderImage.js` が `AdContext.showAd()` を呼びます。`userMemo === noAdWord` の場合は広告を表示せず画像を開きます。

寄付課金は `src/App.js` で RevenueCat を初期化し、`src/scenes/donate/Donation.js` で Offering を取得して購入します。API キーは `src/openaiKeys.js` の `iapKey` から読みます。

## ローカル保存

`src/utils/storage.js` は AsyncStorage ベースの `react-native-storage` インスタンスを提供します。主な保存対象は以下です。

- ユーザーメモ: `userMemo`
- ダークモード設定: `isDarkMode`
- 各画像生成モデルのネガティブプロンプト

画像や動画の保存は `expo-media-library` を使い、生成動画や音声動画の一時ファイルは `expo-file-system/legacy` に保存します。

## 秘匿ファイルと環境前提

`src/openaiKeys.js` は `.gitignore` 対象で、このリポジトリには含まれていません。ローカル実行には少なくとも以下の export が必要です。

- `googleSheetKey`
- `palmKey`
- `CO_API_KEY`
- `huggingFaceKey`
- `songBaseUrl`
- `yahooKey`
- `novitaaiKey`
- `viduKey`
- `iapKey`

2026-11-02 時点の作業ツリーには `src/openaiKeys.js` と `src/firebase.js` が両方存在します（どちらも `.gitignore` 対象）。クリーン環境で実行する場合は Firebase 設定ファイルの有無を確認してください。

## 設定ファイル

- `app.json`: Expo アプリ名、bundle id / package、バージョン、権限、Expo Updates 設定を定義します。AdMob App ID は `plugins` の `react-native-google-mobile-ads` エントリ、スプラッシュは `expo-splash-screen` エントリで設定します（旧トップレベルの `react-native-google-mobile-ads` / `splash` / `privacy` / `packagerOpts` キーは SDK 58 のスキーマで不可のため削除済み）。
- `src/config.js`: アプリ内バージョン、審査判定用 build number / version code、外部 API URL、Cloud Run エンドポイントを定義します。
- `babel.config.js`: Expo preset、`react-native-worklets/plugin`、`module-resolver` alias を定義します。
- `metro.config.js`: `.cjs` asset extension を追加します。
- `eslint.config.js`: ESLint 9 flat config。`eslint-config-expo` + Prettier。ESLint 10 は eslint-config-expo 配下のプラグインが未対応なので 9 系。既存コードは Prettier 未適用のため `yarn lint` は大量の `prettier/prettier` エラーを出します（未整形のまま）。

バージョン更新時は `app.json` と `src/config.js` の値を合わせる必要があります。

## リリース手順（慣例）

1. `app.json` の `version` / `ios.buildNumber` / `android.versionCode` を上げる
2. `src/config.js` の `versionName` / `iosBuildNumber` / `androidVersionCode` を同じ値に合わせる
3. `eas build --profile production --platform ios|android`（コマンドは `README.md`）
4. ストア審査に出す際は Google Sheet の `nowReview` / `androidVersionCode_1` を審査対象の番号にする。審査通過後は別の値に戻して機能制限を解除する
5. JS のみの修正は `eas update --channel production` で OTA 配信可能（`runtimeVersion` の互換に注意）

コミットメッセージは慣例的に `master` のみで、履歴から変更意図は読み取れません。変更理由はこのドキュメントや PR 説明に残すのが望ましいです。

## テスト状況

`.github/workflows/main.yml` は `sub` ブランチ push 時に Node 12 / `expo publish` を実行する古い設定で、現行の EAS 運用とは合っておらず実質使われていません。`codeql-analysis.yml` もあります。

`__tests__/app.test.js` は Redux ストア / slice のスモークテストです（`react-test-renderer` は React 19 で非推奨のため削除）。外部 API や主要生成フローのユニットテストはありません。RTK 2 の依存（immer 等）は ESM のみなので、`package.json` の `jest.transformIgnorePatterns` に追加しています。

## 変更時の注意点

- `src/scenes/chat/Chat.js` は状態と副作用が集中しているため、モード追加や生成フロー変更では既存モードのリセット条件を確認してください。
- `messages` の `useEffect` が生成処理のトリガーなので、bot メッセージ追加が意図しない再実行を起こさないか確認してください。
- 画像モデル関連は `Chat.js` / `textGenerate.js` / `Settings.js` / `DrawButton.js` に重複定義があり、追加・削除時に同期が必要です。
- 審査中制御は `isReview` に依存します。ストア審査に関係する UI 変更では Google Sheet の値と `src/config.js` の build number / version code を確認してください。
- 外部 API キーの一部は Google Sheet 経由、一部は `src/openaiKeys.js` 経由です。実行できない場合はまずキーとリモート設定を疑ってください。
- `src/config.js` には Imgur client secret が平文で入っています。公開範囲や運用上の扱いに注意してください。
- Firebase の `saveFirestore()` は動画生成後の情報保存に使われますが、失敗しても生成フロー自体は止めません。

## SDK 58 アップグレード時の注意（2026-11-02）

- `expo-media-library` はルート import が新しいオブジェクト指向 API になり、旧 `saveToLibraryAsync` 等は実行時に throw します。本アプリは `expo-media-library/legacy` から import しています。
- `expo-file-system` も旧 API は `expo-file-system/legacy` から import しています。
- gifted-chat 3 では `placeholder` / `maxInputLength` は `textInputProps` に、`keyboardShouldPersistTaps` は `listProps` に移動し、`alwaysShowSend` → `isSendButtonAlwaysVisible`、`onPress` / `onLongPress` → `onPressMessage` / `onLongPressMessage` に変わりました。`renderComposer` に渡る props は `{ text, textInputProps }` のみです（`CustomComposer.js` 参照）。
- AdMob は `Loading.js` で ATT の結果を待ってから `mobileAds().initialize()` を明示的に呼んでいます。
- `runtimeVersion` は `appVersion` ポリシーです。ネイティブ依存が変わったので、新しいバイナリは必ず `version` を上げてからビルドしてください。同じバージョンのまま `eas update` すると、SDK 54 の既存バイナリに SDK 58 の JS が配信されてクラッシュします。
- `yarn.lock` を段階的に更新すると yarn classic のホイスティングが崩れて Babel が `_lruCache is not a constructor` で落ちることがあります。その場合は `rm -rf node_modules && yarn install`。

## 既存ドキュメント

- `README.md`: EAS build / update コマンドとプライバシーポリシー URL
- `docs/ja.md`: 日本語プライバシーポリシー
- `docs/project-overview.md`: このファイル。開発者・別セッション向けの実装概要
