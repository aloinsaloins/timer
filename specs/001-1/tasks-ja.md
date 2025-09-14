# タスク: 親との残り時間可視化タイマー

**入力**: `/specs/001-1/` からの設計ドキュメント
**前提条件**: plan.md（必須）、research.md、data-model.md、contracts/

## 実行フロー (main)
```
1. 機能ディレクトリからplan.mdを読み込む
   → 見つからない場合: エラー "実装計画が見つかりません"
   → 抽出: 技術スタック、ライブラリ、構造
2. オプションの設計ドキュメントを読み込む:
   → data-model.md: エンティティを抽出 → モデルタスク
   → contracts/: 各ファイル → 契約テストタスク
   → research.md: 決定事項を抽出 → セットアップタスク
3. カテゴリ別にタスクを生成:
   → セットアップ: プロジェクト初期化、依存関係、リンティング
   → テスト: 契約テスト、統合テスト
   → コア: モデル、サービス、CLIコマンド
   → 統合: DB、ミドルウェア、ログ
   → 仕上げ: 単体テスト、パフォーマンス、ドキュメント
4. タスクルールを適用:
   → 異なるファイル = 並列用に[P]をマーク
   → 同じファイル = 順次（[P]なし）
   → 実装前のテスト（TDD）
5. タスクに連番を付ける（T001、T002...）
6. 依存関係グラフを生成
7. 並列実行例を作成
8. タスクの完全性を検証:
   → すべての契約にテストがあるか？
   → すべてのエンティティにモデルがあるか？
   → すべてのエンドポイントが実装されているか？
9. 戻り値: 成功（タスク実行準備完了）
```

## フォーマット: `[ID] [P?] 説明`
- **[P]**: 並列実行可能（異なるファイル、依存関係なし）
- 説明には正確なファイルパスを含める

## パス規約
- **Webアプリ**: `backend/src/`、`frontend/src/`
- 以下のパスはすべてplan.mdのWebアプリケーション構造に従う

## フェーズ 3.1: セットアップ
- [ ] T001 plan.mdに従ってbackend/とfrontend/ディレクトリでプロジェクト構造を作成
- [ ] T002 Node.js 20.xとExpress.jsでバックエンドTypeScriptプロジェクトを初期化
- [ ] T003 ViteとTypeScript 5.xでフロントエンドReact 18プロジェクトを初期化
- [ ] T004 [P] backend/jest.config.jsでバックエンドテスト用のJestを設定
- [ ] T005 [P] frontend/vite.config.tsでフロントエンドテスト用のVitestを設定
- [ ] T006 [P] 両プロジェクト用のESLintとPrettierをセットアップ
- [ ] T007 フロントエンド/バックエンド共有用のbackend/src/models/types.tsに共有型を作成

## フェーズ 3.2: テストファースト（TDD）⚠️ 3.3の前に必ず完了
**重要: これらのテストは実装の前に必ず書かれ、必ず失敗しなければならない**

### 契約テスト（contracts/api-spec.yamlから）
- [ ] T008 [P] backend/tests/contract/test_calculate_post.tsでPOST /api/calculateの契約テスト
- [ ] T009 [P] backend/tests/contract/test_life_expectancy_get.tsでGET /api/life-expectancyの契約テスト
- [ ] T010 [P] backend/tests/contract/test_preferences_get.tsでGET /api/preferencesの契約テスト
- [ ] T011 [P] backend/tests/contract/test_preferences_post.tsでPOST /api/preferencesの契約テスト

### 統合テスト（quickstart.mdシナリオから）
- [ ] T012 [P] 統合テスト: backend/tests/integration/test_first_time_setup.tsで両親での初回ユーザーセットアップ
- [ ] T013 [P] 統合テスト: backend/tests/integration/test_exceeding_life_expectancy.tsで平均寿命を超える親
- [ ] T014 [P] 統合テスト: backend/tests/integration/test_age_buffer.tsで年齢バッファ調整
- [ ] T015 [P] 統合テスト: backend/tests/integration/test_single_parent.tsで片親エントリ
- [ ] T016 [P] フロントエンドコンポーネントテスト: frontend/tests/components/test_parent_input.tsxでParentInputフォーム検証
- [ ] T017 [P] フロントエンドコンポーネントテスト: frontend/tests/components/test_time_display.tsxでTimeDisplay可視化

## フェーズ 3.3: コア実装（テストが失敗した後のみ）

### ライブラリ（コアビジネスロジック）
- [ ] T018 [P] backend/src/lib/time-calculator/index.tsにcalculateRemainingTime関数でtime-calculatorライブラリを作成
- [ ] T019 [P] backend/src/lib/time-calculator/cli.tsにtime-calculator CLIを作成
- [ ] T020 [P] backend/src/lib/life-expectancy/index.tsに2023年厚生労働省データでlife-expectancyライブラリを作成
- [ ] T021 [P] backend/src/lib/life-expectancy/cli.tsにlife-expectancy CLIを作成

### バックエンドモデル（data-model.mdエンティティから）
- [ ] T022 [P] backend/src/models/parent.tsにParentモデルインターフェース
- [ ] T023 [P] backend/src/models/visitation-pattern.tsにVisitationPatternモデルインターフェース
- [ ] T024 [P] backend/src/models/time-calculation.tsにTimeCalculationモデルインターフェース
- [ ] T025 [P] backend/src/models/user-preferences.tsにUserPreferencesモデルインターフェース
- [ ] T026 [P] backend/src/models/life-expectancy-data.tsにLifeExpectancyDataモデルインターフェース

### バックエンドサービス
- [ ] T027 time-calculatorライブラリを使用してbackend/src/services/calculation-service.tsにCalculationServiceを作成
- [ ] T028 life-expectancyライブラリを使用してbackend/src/services/life-expectancy-service.tsにLifeExpectancyServiceを作成
- [ ] T029 ローカルストレージ用にbackend/src/services/preferences-service.tsにPreferencesServiceを作成

### バックエンドAPIエンドポイント（contracts/api-spec.yamlから）
- [ ] T030 backend/src/api/calculate.tsにPOST /api/calculateエンドポイントを実装
- [ ] T031 backend/src/api/life-expectancy.tsにGET /api/life-expectancyエンドポイントを実装
- [ ] T032 backend/src/api/preferences.tsにGET /api/preferencesエンドポイントを実装
- [ ] T033 backend/src/api/preferences.tsにPOST /api/preferencesエンドポイントを実装
- [ ] T034 backend/src/app.tsにExpressルーターとミドルウェアをセットアップ

### フロントエンドコンポーネント
- [ ] T035 [P] frontend/src/components/ParentInput.tsxにParentInputコンポーネントを作成
- [ ] T036 [P] frontend/src/components/VisitPatternInput.tsxにVisitPatternInputコンポーネントを作成
- [ ] T037 [P] frontend/src/components/TimeDisplay.tsxにTimeDisplayコンポーネントを作成
- [ ] T038 [P] frontend/src/components/Settings.tsxにSettingsコンポーネントを作成
- [ ] T039 frontend/src/App.tsxにReact ContextでAppコンポーネントを作成

### フロントエンドサービス
- [ ] T040 [P] frontend/src/services/api-client.tsにAPIクライアントサービスを作成
- [ ] T041 [P] frontend/src/services/calculation-service.tsに計算サービスを作成
- [ ] T042 [P] frontend/src/services/storage-service.tsにローカルストレージサービスを作成

### フロントエンド状態管理
- [ ] T043 frontend/src/contexts/AppContext.tsxにuseReducerでAppContextを作成
- [ ] T044 frontend/src/contexts/calculation-reducer.tsに計算リデューサーを作成
- [ ] T045 frontend/src/contexts/preferences-reducer.tsに設定リデューサーを作成

## フェーズ 3.4: 統合
- [ ] T046 backend/src/middleware/cors.tsにCORSミドルウェアをセットアップ
- [ ] T047 backend/src/middleware/logging.tsにリクエスト/レスポンスログミドルウェアを追加
- [ ] T048 backend/src/middleware/validation.tsに入力検証ミドルウェアを追加
- [ ] T049 backend/src/middleware/error-handler.tsにエラーハンドリングミドルウェアをセットアップ
- [ ] T050 frontend/src/i18n/config.tsにreact-i18nextでi18nを設定
- [ ] T051 [P] frontend/src/i18n/locales/ja.jsonに日本語翻訳を作成
- [ ] T052 [P] frontend/src/i18n/locales/en.jsonに英語翻訳を作成
- [ ] T053 frontend/src/routes.tsxにReact Routerでフロントエンドルーティングをセットアップ
- [ ] T054 frontend/src/styles/にTailwindでレスポンシブCSSを実装

## フェーズ 3.5: 仕上げ
- [ ] T055 [P] backend/src/lib/time-calculator/__tests__/でtime-calculator関数の単体テスト
- [ ] T056 [P] backend/src/lib/life-expectancy/__tests__/でlife-expectancy関数の単体テスト
- [ ] T057 [P] backend/tests/unit/test_validation.tsで検証ロジックの単体テスト
- [ ] T058 パフォーマンステスト: backend/tests/performance/で<100ms計算時間を確保
- [ ] T059 E2Eテスト: tests/e2e/test_complete_flow.tsで完全なユーザーフロー
- [ ] T060 [P] 両プロジェクトにTypeScript strictモードチェックを追加
- [ ] T061 [P] フロントエンドコンポーネントにアクセシビリティ（WCAG 2.1 AA）準拠を追加
- [ ] T062 すべてのquickstart.md検証シナリオを実行
- [ ] T063 CLAUDE.mdを実装詳細で更新

## 依存関係
- セットアップ（T001-T007）を最初に完了
- 実装（T018-T045）の前にテスト（T008-T017）
- サービス（T027-T029）の前にライブラリ（T018-T021）
- サービスの前にモデル（T022-T026）
- エンドポイント（T030-T034）の前にサービス
- フロントエンドAPI統合（T040）の前にバックエンド
- コンポーネント（T035-T039）はバックエンドと並列可能
- コア実装後に統合（T046-T054）
- 最後に仕上げ（T055-T063）

## 並列実行例

### セットアップフェーズ
```bash
# T004-T006を一緒に起動（異なるプロジェクト）:
タスク: "backend/jest.config.jsでバックエンドテスト用のJestを設定"
タスク: "frontend/vite.config.tsでフロントエンドテスト用のVitestを設定"
タスク: "両プロジェクト用のESLintとPrettierをセットアップ"
```

### テストフェーズ（TDD）
```bash
# すべての契約テストT008-T011を一緒に起動:
タスク: "backend/tests/contract/test_calculate_post.tsでPOST /api/calculateの契約テスト"
タスク: "backend/tests/contract/test_life_expectancy_get.tsでGET /api/life-expectancyの契約テスト"
タスク: "backend/tests/contract/test_preferences_get.tsでGET /api/preferencesの契約テスト"
タスク: "backend/tests/contract/test_preferences_post.tsでPOST /api/preferencesの契約テスト"

# すべての統合テストT012-T017を一緒に起動:
タスク: "統合テスト: 両親での初回ユーザーセットアップ"
タスク: "統合テスト: 平均寿命を超える親"
タスク: "統合テスト: 年齢バッファ調整"
タスク: "統合テスト: 片親エントリ"
タスク: "フロントエンドコンポーネントテスト: ParentInputフォーム検証"
タスク: "フロントエンドコンポーネントテスト: TimeDisplay可視化"
```

### コア実装フェーズ
```bash
# ライブラリT018-T021を一緒に起動:
タスク: "calculateRemainingTime関数でtime-calculatorライブラリを作成"
タスク: "time-calculator CLIを作成"
タスク: "2023年厚生労働省データでlife-expectancyライブラリを作成"
タスク: "life-expectancy CLIを作成"

# すべてのモデルT022-T026を一緒に起動:
タスク: "backend/src/models/parent.tsにParentモデルインターフェース"
タスク: "backend/src/models/visitation-pattern.tsにVisitationPatternモデルインターフェース"
タスク: "backend/src/models/time-calculation.tsにTimeCalculationモデルインターフェース"
タスク: "backend/src/models/user-preferences.tsにUserPreferencesモデルインターフェース"
タスク: "backend/src/models/life-expectancy-data.tsにLifeExpectancyDataモデルインターフェース"

# フロントエンドコンポーネントT035-T038を一緒に起動:
タスク: "ParentInputコンポーネントを作成"
タスク: "VisitPatternInputコンポーネントを作成"
タスク: "TimeDisplayコンポーネントを作成"
タスク: "Settingsコンポーネントを作成"
```

## 備考
- [P]タスクは異なるファイルで動作し、同時に実行可能
- 重要: 実装前にすべてのテストが失敗することを確認（TDDのREDフェーズ）
- 各タスクが正常に完了した後にコミット
- GREENフェーズを確認するために継続的にテストを実行
- 年齢バッファのデフォルトは0、0-10年で調整可能
- 公式厚生労働省2023年データを使用: 男性81.09、女性87.14

## 検証チェックリスト
*ゲート: 実行前に合格必須*

- [x] すべての4つのAPIエンドポイントに契約テストがある（T008-T011）
- [x] すべての5つのエンティティにモデルタスクがある（T022-T026）
- [x] すべての6つのquickstartシナリオにテストがある（T012-T017）
- [x] すべてのテストが実装前に来る（T018-T045の前にT008-T017）
- [x] 並列タスクは異なるファイルで動作
- [x] 各タスクは正確なファイルパスを指定
- [x] [P]タスクは同じファイルを変更しない

---
*設計ドキュメントから生成されたタスク。実行準備完了。*
*合計タスク: 63*
*推定完了時間: 並列実行で2-3日*