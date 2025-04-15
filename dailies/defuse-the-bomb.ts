// Difficulty: Medium
// Complexity: O(n^3)
// Link: https://leetcode.com/problems/count-good-triplets/submissions/1606679654/?envType=daily-question&envId=2025-04-14

function countGoodTriplets(
  arr: number[],
  a: number,
  b: number,
  c: number
): number {
  let triplets = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      for (let k = 0; k < arr.length; k++) {
        if (
          Math.abs(arr[i] - arr[j]) <= a &&
          Math.abs(arr[j] - arr[k]) <= b &&
          Math.abs(arr[i] - arr[k]) <= c &&
          i < j &&
          j < k
        ) {
          triplets++;
        }
      }
    }
  }

  return triplets;
}

console.log(countGoodTriplets([3, 0, 1, 1, 9, 7], 7, 2, 3));
