// Difficulty: Easy
// Complexity: O(n)
// https://leetcode.com/problems/can-place-flowers/submissions/1606408934/?envType=study-plan-v2&envId=leetcode-75

function canPlaceFlowers(flowerbed: number[], n: number): boolean {
  let count = 0;
  for (let ind = 0; ind < flowerbed.length; ind++) {
    if (
      (flowerbed[ind - 1] === 0 || flowerbed[ind - 1] === undefined) &&
      flowerbed[ind] === 0 &&
      (flowerbed[ind + 1] === 0 || flowerbed[ind + 1] === undefined)
    ) {
      flowerbed[ind] = 1;
      count++;
    }
  }

  return n <= count;
}

console.log(canPlaceFlowers([1, 0, 0, 0, 1, 0, 0], 2));
