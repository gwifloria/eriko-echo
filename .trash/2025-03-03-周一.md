---
tags:
  - dailynote
date: <% tp.date.now("YYYY-MM-DD") %>
cssclasses:
  - cards
  - cards-cols-3
---

### Capture

<br>%% %%

<!-- ```dataviewjs
const {Daily, Research} = customJS
Daily.display(dv, Research)
``` -->

<br>%% %%

### TaskList

```dataviewjs
dv.taskList(
  dv.pages('"Projects" or "Events" or "Literature" or "Blist" or "Courses" or "Amap/Todo List" or "Amap/Inbox"')
    .file.tasks
    .where(t =>{
      const today = dv.current().date;  // 获取当前页面的 `date` 字段
      // 筛选今日完成的任务
      return (t.completed && dv.compare(t.completed, today) == 0) ||
      // 筛选今日到期的任务
      (t.due && dv.compare(t.due, today) == 0) ||
      // 筛选今日创建的任务
      (dv.compare(t.mtime, dv.date("YYYY-MM-DD")) == 0)
    })
)
```

<br>%% %%

### NoteList

%% ### ReadList

```dataview
TABLE comment AS Comments, join(file.etags, "<br />") AS Tags
FROM "Literature/Notes" or "Events"
WHERE file.name[0] = "@"
WHERE file.tags[0] != "#unread"
WHERE file.mtime>=date(<% tp.date.now("YYYY-MM-DD") %>) AND file.mtime<date(<% tp.date.now("YYYY-MM-DD", 1) %>)
SORT file.mtime desc
```

<br> 
 %%
