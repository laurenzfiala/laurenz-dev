import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';
import { Post } from './persistence/post';

const baseDir = path.normalize(
  path.join(import.meta.dirname, '../../dist/laurenz-dev/browser/api'),
);
const dbPath = path.normalize(path.join(import.meta.dirname, '../../data.sqlite'));

const db = new sqlite3.Database(dbPath);

try {
  db.all('SELECT * from posts', (err, data) => {
    if (err) throw err;

    if (!fs.existsSync(baseDir)) {
      fs.mkdirSync(baseDir, { recursive: true });
    }

    console.log(data);

    fs.writeFileSync(
      path.join(baseDir, 'posts.json'),
      JSON.stringify({
        posts: (data as Post[]).map((post) => ({
          id: post.id,
          title: post.title,
          contentPreview: post.content,
        })),
      }),
    );
  });
} finally {
  db.close();
}
