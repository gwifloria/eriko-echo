---
tags:
  - weeklynote
cssclasses:
  - cards
date: <% tp.date.now("YYYY-MM-DD") %>
---

## 📝 本周总结

（在这里写下本周的总结）

## 📌 重要事件

（记录重要的事情）

## 🗂 上周的笔记

```dataview
TABLE file.name AS "Diary"
FROM ""
WHERE file.mtime >= date(today) - dur(7 days)
  AND file.mtime < date(today)
SORT file.mtime desc
```
