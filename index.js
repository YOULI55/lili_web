// abcade

// [a]bcade
// [ab]cade
// [abc]ade
// 滑动窗口的重点，当前s[i] == 'a'，检查画的窗口内有没有 'a'，
// 如果有，滑动窗口的左边界就一直向右移动，直到没有'a'为止
// a[bc]ade => a[bca]de
// a[bcad]e
// a[bcade]