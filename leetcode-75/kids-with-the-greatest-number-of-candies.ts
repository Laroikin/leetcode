// Difficulty: Easy
// Complexity: O(n)
// Link: https://leetcode.com/problems/kids-with-the-greatest-number-of-candies/?envType=study-plan-v2&envId=leetcode-75

function kidsWithCandies(candies: number[], extraCandies: number): boolean[] {
  const greatest = candies.toSorted((a, b) => a - b)[0];
  const res: boolean[] = [];

  for (let candy of candies) {
    res.push(candy + extraCandies >= greatest ? true : false);
  }

  return res;
}
