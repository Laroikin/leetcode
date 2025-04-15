import { ArcElement, Chart, DoughnutController } from 'chart.js';
import { createCanvas } from '@napi-rs/canvas';
import { readdir } from 'node:fs/promises';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const directories = ['dailies', 'leetcode-75'];

let difficultySet = new Map<string, number>()
  .set('Easy', 0)
  .set('Hard', 0)
  .set('Medium', 0);

for (const dir of directories) {
  const dirPath = `./${dir}`;
  const files = await readdir(dirPath);

  for (const file of files) {
    const fileContents = await Bun.file(path.join(dirPath, file)).text();

    const match = fileContents.match(/Difficulty:\s*(Easy|Medium|Hard)/i);

    if (match) {
      const difficulty = match[1];
      const keyExists = difficultySet.has(difficulty);

      difficultySet.set(
        difficulty,
        keyExists ? difficultySet.get(difficulty)! + 1 : 1
      );
    }
  }
}

const entries = [...difficultySet.entries()].sort((a, b) =>
  a[0].localeCompare(b[0])
);

console.log(entries);

Chart.register([DoughnutController, ArcElement]);

const data = {
  labels: entries.map(a => a[0]),
  datasets: [
    {
      data: entries.map(a => a[1]),
      backgroundColor: [
        'rgb(28, 186, 186)',
        'rgb(246, 55, 55)',
        'rgb(255, 183, 0)'
      ]
    }
  ]
};

const canvas = createCanvas(400, 300);
const chart = new Chart(canvas as any, {
  type: 'doughnut',
  data,
  options: {
    plugins: {
      legend: {
        position: 'chartArea'
      },
      title: {
        display: true,
        text: 'Problems by difficulty'
      }
    }
  }
});

const pngBuffer = await canvas.encode('png');
await Bun.write('./.stats/chart.png', pngBuffer);

chart.destroy();

const readmePath = './README.md';
let readmeData = await readFile(readmePath, 'utf8');

// Update difficulty counts in README
for (const diff of difficultySet.keys()) {
  const count = difficultySet.get(diff) || 0;
  console.log(count);
  const regex = new RegExp(`(- \\*\\*${diff}:\\*\\* )\\d+( problems)`, 'i');
  readmeData = readmeData.replace(regex, `$1${count}$2`);
}

console.log(readmeData);

await writeFile(readmePath, readmeData);
