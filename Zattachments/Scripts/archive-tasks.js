const fs = require("fs");

// 读取 "Todo List" 文件内容
const { resolve } = require("path");

const todoPath = resolve("./Amap/Todo List.md");

const workListPath = resolve("./Amap/Work List.md");

function dealFile(err, toDoData) {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  // 使用换行符分割文本，并筛选出各自的任务行
  const toDoLines = toDoData
    .split("\n")
    .filter((line) => line.trim().startsWith("- [x]"));
  const notlines = toDoData
    .split("\n")
    .filter(
      (line) =>
        !(line.trim().startsWith("- [x]") || line.trim().startsWith("!"))
    );

  fs.writeFile(todoPath, "", (err) => {
    if (err) {
      console.error("清空文件失败:", todoPath, err);
    } else {
      console.log("成功清空文件:", todoPath);
    }
  });

  // 将已完成的任务写入 "Inbox" 文件
  const completedTasksContent = "\n" + toDoLines.join("\n");
  fs.appendFile(
    resolve("./Amap/Inbox.md"),
    completedTasksContent,
    "utf8",
    (err) => {
      if (err) {
        console.error("Error writing file:", err);
        return;
      }
      console.log('Completed tasks moved to "Inbox" successfully!');
    }
  );

  // 将未完成的任务写回原文件
  // 这里路径要修改！！
  const newData = notlines.join("\n");
  fs.writeFile(todoPath, newData, "utf8", (err) => {
    if (err) {
      console.error("Error writing file:", err);
      return;
    }
    console.log('Uncompleted tasks written back to "Todo List" successfully!');
  });
}
fs.readFile(todoPath, "utf8", (err, toDoData) => dealFile(err, toDoData));

module.exports = async (params) => {
  console.log("finished running");
};
