class Daily {
  ReadingFolder = "Literature/Notes";
  DiaryDailyFolder = "Diary/Daily";
  WeeklyFolder = `Diary/Weekly`;
  setup(dv, R) {
    this.dv = dv;
    this.processTitle = function (p) {
      if (p.file.path.startsWith(this.ReadingFolder)) {
        return R.title(p) + ` (${p.year})`;
      } else {
        return p.file.link;
      }
    };

    this.processLink = function (links) {
      return links;
    };

    this.calDay = function (d, f = "YYYY/YYYY-MM-DD_ddd") {
      return window
        .moment(dv.current().file.day.plus({ days: d }).toString())
        .format(f);
    };

    this.unique = function unique(arr) {
      arr = arr.array();
      for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
          if (arr[i].display == arr[j].display) {
            arr.splice(j, 1);
            j--;
          }
        }
      }
      return arr;
    };
    this.isToday = function () {
      const TomorrowHour = 6;
      return (
        dv.current().file.name ==
        window
          .moment(dv.date("now").plus({ hour: -TomorrowHour }).toString())
          .format("YYYY-MM-DD_ddd")
      );
    };
  }

  display(dv, R) {
    this.setup(dv, R);
    this.render_toggl_track();
  }

  render_yesterdayNotes(dv, offset = 0) {
    // 昨日新建笔记
    let title = `🏗️ 当日新建`;
    if (offset == -1) {
      title = `🧲 昨日新建`;
    }
    function timeSinceCreationInDays(p) {
      return dv.current().file.day.plus({ days: offset }).ts == p.file.cday.ts;
    }

    var lastNotes = dv
      .pages(`-"${this.DiaryDailyFolder}"`)
      .filter((p) => timeSinceCreationInDays(p));
    if (lastNotes.length) {
      // && lastNotes.length < 50
      dv.table(
        [title, "📩 Inlinks"],
        lastNotes.map((p) => [
          this.processTitle(p),
          this.processLink(p.file.inlinks),
        ])
      );
    }
  }

  render_todayDiaryInLastYears(dv) {
    // 去年今日日记
    const WeeklyFolder = this.WeeklyFolder;
    function findWeek(p) {
      let f = p.file;
      let weekFilePath = `"${WeeklyFolder}/${f.day.year}-${
        f.day.weekNumber + 1
      }W"`;
      // return weekFilePath;
      let week = dv.pages(weekFilePath);
      return week.file.link.first();
    }

    function titleInPast(p) {
      let title = p.file.link;
      if (p.file.day.year > dv.current().file.day.year) {
        title = `~~[[${p.file.name}]]~~`;
      }
      if (p.title) {
        title += `: ` + p.title;
      }
      return title;
    }
    const DiaryDailyFolder = this.DiaryDailyFolder;
    var todayDiaryInLastYears = dv
      .pages(`"${DiaryDailyFolder}" and #日记`)
      .where(
        (p) =>
          p.file.day.day === dv.current().file.day.day &&
          p.file.day.month === dv.current().file.day.month &&
          p.file.day.year != dv.current().file.day.year
      );
    if (todayDiaryInLastYears.length) {
      dv.table(
        [`💭 往年今日`, "🔗 OutLinks", "📩 InLinks", "🧘 周课"],
        todayDiaryInLastYears
          .sort((p) => p.file.day)
          .map((p) => [
            titleInPast(p),
            this.unique(p.file.outlinks.where((l) => l.path.endsWith(".md"))),
            // p.file.outlinks.where((l) => l.path.endsWith(".md")),
            p.file.inlinks,
            findWeek(p),
          ])
      );
    }
  }

  render_todayNotesInLastYears(dv) {
    // 去年今日笔记
    var todayNotesInLastYears = dv
      .pages(`-"${this.DiaryDailyFolder}"`)
      .where(
        (p) =>
          p.file.cday.day === dv.current().day &&
          p.file.cday.month === dv.current().month
      );
    if (todayNotesInLastYears.length) {
      dv.table(
        [`📜 去年笔记`, "OutLinks"],
        todayNotesInLastYears
          .sort((p) => p.file.cday)
          .map((p) => [p.file.link, p.file.outlinks])
      );
    }
  }

  render_todayCreateAndModify(dv) {
    const current = dv.current().file;
    if (this.isToday()) {
      function selectToday(day) {
        return (
          day.day === current.day.day &&
          day.month === current.day.month &&
          day.year === current.day.year
        );
      }

      // 今日创建
      var todayCreateNotes = dv
        .pages(``)
        .where((p) => selectToday(p.file.cday))
        .where((p) => p.file.name != current.name) // 今日日记当然是今日创建的，不必展示。
        .sort((p) => p.file.cday);

      //  今日修改
      var calDay = this.calDay;
      function filter(p) {
        return !(
          p.file.name == current.name ||
          p.file.name == calDay(-1, "YYYY-MM-DD_ddd") ||
          selectToday(p.file.cday)
        );
      }
      const ReadingFolder = this.ReadingFolder;
      function setName(p) {
        if (p.file.path.startsWith(ReadingFolder)) {
          if (p.alias) {
            return `[[${p.file.name}|${p.alias}]]`;
          }
          return `[[${p.file.name}]]`;
        }
        return p.file.link;
      }
      var todayModifyNotes = dv
        .pages(``)
        .where((p) => selectToday(p.file.mday))
        .where((p) => filter(p))
        .sort((p) => p.file.mtime, "desc");

      if (todayCreateNotes.length || todayModifyNotes.length) {
        dv.paragraph("");
        dv.el("center", "\\* \\* \\* 👇 𝓽𝓸𝓭𝓪𝔂 👇 * * *");
        dv.paragraph("");
        // 𝓪  𝓫  𝓬  𝓭  𝓮  𝓯  𝓰  𝓱  𝓲  𝓳  𝓴  𝓵  𝓶  𝓷  𝓸  𝓹  𝓺  𝓻  𝓼  𝓽  𝓾  𝓿  𝔀  𝔁  𝔂  𝔃
      }

      if (todayCreateNotes.length) {
        dv.table(
          [`🍀 今日新建`, "📩 Inlinks"],
          todayCreateNotes.map((p) => [
            this.processTitle(p),
            this.processLink(p.file.inlinks),
          ])
        );
      }

      const MaxModifyNotes = 50;

      if (todayModifyNotes.length) {
        let content = todayModifyNotes
          .map((p) => setName(p))
          .array()
          .slice(0, MaxModifyNotes)
          .join(" | ");
        dv.el("p", `**今日编辑 (${todayModifyNotes.length})：** ${content}`, {
          cls: "",
          attr: { style: "line-height:1.5;" },
        });
      }
    }
  }

  render_toggl_track() {
    const dv = this.dv;
    const current = dv.current();
    const day = this.calDay(0, "YYYY-MM-DD");

    let code = [
      "```toggl",
      "SUMMARY",
      `from ${day} to ${day}`,
      `SORT DESC`,
      `TITLE "Time Track"`,
      "```",
    ];

    if (current.togglIncludeProjects) {
      let projects = current.togglIncludeProjects
        .map((p) => `"${p}"`)
        .join(", ");
      let projects_string = current.togglIncludeProjects.join(", ");

      code = code.concat([]);
    }

    dv.span(code.join("\n"));
  }
}
