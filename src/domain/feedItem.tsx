/**
 * 各項目の詳細情報です。
 */
interface FeedItem {
    /** 作者 */
    by: string;
  
    /** コメント数 */
    descendants: number;
  
    /** ID */
    id: number;
  
    /** ポイント */
    score: number;
  
    /** 投稿時間（UnixTime） */
    time: number;
  
    /** タイトル */
    title: string;
  
    /** URL */
    url: string;
}

export default FeedItem;