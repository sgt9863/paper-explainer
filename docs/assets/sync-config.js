/* Supabase 接続設定。
   url と anonKey を入れると「ログイン＋全端末同期」が有効になります。
   未設定（空のまま）なら、従来どおり localStorage だけで動作します（ログインUIは出ません）。

   ここに書く anonKey は「公開用」の匿名キーで、行レベルセキュリティ(RLS)で
   各ユーザーが自分のデータしか読めないよう保護されます。公開リポジトリに置いて問題ありません。
   （秘密の service_role キーは絶対にここへ入れないこと。） */
window.PAPER_SYNC_CONFIG = {
  url: "",      // 例: https://xxxxxxxx.supabase.co
  anonKey: ""   // 例: eyJhbGciOiJIuzI1NiIsInR5cCI6...（公開 anon キー）
};
