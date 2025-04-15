// Difficulty: Easy
// Complexity: O(n)
// Link: https://leetcode.com/problems/defuse-the-bomb/?envType=daily-question&envId=2025-04-15

function decrypt(code: number[], k: number): number[] {
  let ans = new Array(code.length).fill(0);

  if (k == 0) {
    return ans;
  }

  let start = 1;
  let end = k;
  let sum = 0;

  if (k < 0) {
    start = code.length - Math.abs(k);
    end = code.length - 1;
  }

  for (let i = start; i <= end; i++) {
    sum += code[i];
  }

  for (let i = 0; i < code.length; i++) {
    ans[i] = sum;
    sum -= code[start % code.length];
    sum += code[(end + 1) % code.length];
    start++;
    end++;
  }

  return ans;
}

console.log(decrypt([2, 4, 9, 3], -2));
