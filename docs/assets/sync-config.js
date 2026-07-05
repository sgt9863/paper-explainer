/* Supabase 接続設定。
   url と anonKey を入れると「ログイン＋全端末同期」が有効になります。
   未設定（空のまま）なら、従来どおり localStorage だけで動作します（ログインUIは出ません）。

   ここに書く anonKey は「公開用」の匿名キーで、行レベルセキュリティ(RLS)で
   各ユーザーが自分のデータしか読めないよう保護されます。公開リポジトリに置いて問題ありません。
   （秘密の service_role キーは絶対にここへ入れないこと。） */
window.PAPER_SYNC_CONFIG = {
  url: "https://hngvmvofpfypwkhjnmig.supabase.co",
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhuZ3Ztdm9mcGZ5cHdraGpubWlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMwNDg2ODcsImV4cCI6MjA5ODYyNDY4N30.FHDP0kMnj9zwH8VKARVWSMIEJ0TM3Tlc3Dc1cHjwXmQ"
};
