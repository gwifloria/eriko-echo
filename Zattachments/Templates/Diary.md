---
tags:
  - dailynote
date: <% tp.date.now(“YYYY-MM-DD”) %>
cssclasses:
  - cards
  - cards-cols-3
---

### Capture

<br>%% %%

```dataviewjs
const {Daily, Research} = customJS
Daily.display(dv, Research)
```

### TaskList

```dataviewjs
dv.taskList(
  dv.pages('"Projects" or "Events" or "Literature" or "BTemp" or "Courses" or "Amap/Todo List" or "Amap/Inbox"')
    .file.tasks
    .where(t =>{
      const today = dv.current().date;  // 获取当前页面的 `date` 字段
      // 筛选今日完成的任务
      return (t.completed && dv.compare(t.completed, today) == 0) ||
      // 筛选今日到期的任务
      (t.due && dv.compare(t.due, today) == 0) ||
      // 筛选今日创建的任务
      (dv.compare(t.ctime, today) == 0)
    })
)
```

<br>%% %%
